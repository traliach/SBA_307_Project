import type {
  ApiHealth,
  ContactSubmissionInput,
  ContactSubmissionResult,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  Testimonial,
} from '../types/site'

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

async function readJson<T>(path: string): Promise<T> {
  console.info(`[api] GET ${path}`)
  const response = await fetchWithTimeout(path)

  if (!response.ok) {
    console.error(`[api] GET ${path} failed with status ${response.status}`)
    throw new Error(`Request failed: ${response.status}`)
  }

  console.info(`[api] GET ${path} ok`)
  return (await response.json()) as T
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
  console.info('[api] POST /api/contact')
  const response = await fetchWithTimeout('/api/contact', {
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

    console.error(`[api] POST /api/contact failed with status ${response.status}`)
    throw new Error(errorBody?.message ?? `Request failed: ${response.status}`)
  }

  console.info('[api] POST /api/contact ok')
  return (await response.json()) as ContactSubmissionResult
}
