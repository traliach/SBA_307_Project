import type {
  ApiHealth,
  ContactSubmissionInput,
  ContactSubmissionResult,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  Testimonial,
  TestimonialSubmissionInput,
  TestimonialSubmissionResult,
} from '../types/site'
import { withApiBase } from './apiBase'

const REQUEST_TIMEOUT_MS = 8000

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms`)
    }

    throw error
  } finally {
    window.clearTimeout(timeoutId)
  }
}

async function parseJson<T>(response: Response, context: string): Promise<T> {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    const bodyPreview = (await response.text().catch(() => '')).slice(0, 200)
    console.error(
      `[api] ${context} returned non-JSON content-type "${contentType}"`,
      bodyPreview,
    )
    throw new Error('Expected JSON response from API')
  }

  try {
    return (await response.json()) as T
  } catch (error) {
    console.error(`[api] ${context} returned invalid JSON`, error)
    throw new Error('Invalid JSON response from API')
  }
}

async function readJson<T>(path: string): Promise<T> {
  const requestPath = withApiBase(path)
  console.info(`[api] GET ${requestPath}`)
  const response = await fetchWithTimeout(requestPath)

  if (!response.ok) {
    console.error(`[api] GET ${requestPath} failed with status ${response.status}`)
    throw new Error(`Request failed: ${response.status}`)
  }

  console.info(`[api] GET ${requestPath} ok`)
  return parseJson<T>(response, `GET ${requestPath}`)
}

function extractErrorMessage(errorBody: unknown, fallback: string) {
  if (errorBody && typeof errorBody === 'object' && 'message' in errorBody) {
    const message = errorBody.message

    if (typeof message === 'string' && message.trim()) {
      return message
    }
  }

  return fallback
}

export function fetchHealth() {
  return readJson<ApiHealth>('/api/health')
}

export function fetchProfile() {
  return readJson<ProfileContent>('/api/profile')
}

export function fetchProjects() {
  return readJson<ProjectSummary[]>('/api/projects')
}

export function fetchSkills() {
  return readJson<SkillGroup[]>('/api/skills')
}

export function fetchTestimonials() {
  return readJson<Testimonial[]>('/api/testimonials')
}

export async function submitContact(payload: ContactSubmissionInput) {
  const requestPath = withApiBase('/api/contact')
  console.info(`[api] POST ${requestPath}`)
  const response = await fetchWithTimeout(requestPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string }
      | null

    console.error(`[api] POST ${requestPath} failed with status ${response.status}`)
    throw new Error(
      extractErrorMessage(errorBody, `Request failed: ${response.status}`),
    )
  }

  console.info(`[api] POST ${requestPath} ok`)
  return parseJson<ContactSubmissionResult>(response, `POST ${requestPath}`)
}

export async function submitTestimonial(payload: TestimonialSubmissionInput) {
  const requestPath = withApiBase('/api/testimonials')
  console.info(`[api] POST ${requestPath}`)
  const response = await fetchWithTimeout(requestPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string }
      | null

    console.error(`[api] POST ${requestPath} failed with status ${response.status}`)
    throw new Error(
      extractErrorMessage(errorBody, `Request failed: ${response.status}`),
    )
  }

  console.info(`[api] POST ${requestPath} ok`)
  return parseJson<TestimonialSubmissionResult>(
    response,
    `POST ${requestPath}`,
  )
}
