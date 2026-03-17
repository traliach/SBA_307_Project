import type {
  AdminContactResponse,
  AdminContactSubmission,
  AdminLoginResult,
  AdminProject,
  AdminSession,
  AdminSkillGroup,
  AdminTestimonial,
  ContactSubmissionStatus,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  Testimonial,
  TestimonialModerationStatus,
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
      `[admin-api] ${context} returned non-JSON content-type "${contentType}"`,
      bodyPreview,
    )
    throw new Error('Expected JSON response from admin API')
  }

  try {
    return (await response.json()) as T
  } catch (error) {
    console.error(`[admin-api] ${context} returned invalid JSON`, error)
    throw new Error('Invalid JSON response from admin API')
  }
}

function buildHeaders(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

function extractApiErrorMessage(errorBody: unknown, fallback: string) {
  if (!errorBody || typeof errorBody !== 'object') {
    return fallback
  }

  if (
    'message' in errorBody &&
    typeof errorBody.message === 'string' &&
    errorBody.message.trim()
  ) {
    return errorBody.message
  }

  if (
    'issues' in errorBody &&
    errorBody.issues &&
    typeof errorBody.issues === 'object' &&
    'fieldErrors' in errorBody.issues &&
    errorBody.issues.fieldErrors &&
    typeof errorBody.issues.fieldErrors === 'object'
  ) {
    const fieldErrors = Object.values(errorBody.issues.fieldErrors)
      .flat()
      .filter((value): value is string => typeof value === 'string' && Boolean(value))

    if (fieldErrors[0]) {
      return fieldErrors[0]
    }
  }

  return fallback
}

async function requestJson<T>(
  path: string,
  init?: RequestInit,
  token?: string,
) {
  const requestPath = withApiBase(path)
  console.info(`[admin-api] ${init?.method ?? 'GET'} ${requestPath}`)
  const response = await fetchWithTimeout(requestPath, {
    ...init,
    headers: {
      ...buildHeaders(token),
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string; issues?: unknown }
      | null

    console.error(
      `[admin-api] ${init?.method ?? 'GET'} ${requestPath} failed with status ${response.status}`,
    )

    if (response.status === 401) {
      throw new Error(extractApiErrorMessage(errorBody, 'Admin session expired.'))
    }

    throw new Error(
      extractApiErrorMessage(errorBody, `Request failed: ${response.status}`),
    )
  }

  return parseJson<T>(response, `${init?.method ?? 'GET'} ${requestPath}`)
}

export function loginAdmin(email: string, password: string, mfaCode?: string) {
  return requestJson<AdminLoginResult>(
    '/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password, ...(mfaCode ? { mfaCode } : {}) }),
    },
  )
}

export function fetchAdminSession(token: string) {
  return requestJson<AdminSession>('/api/auth/session', undefined, token)
}

export function fetchAdminProfile(token: string) {
  return requestJson<ProfileContent>('/api/admin/profile', undefined, token)
}

export function saveAdminProfile(token: string, payload: ProfileContent) {
  return requestJson<ProfileContent>(
    '/api/admin/profile',
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    },
    token,
  )
}

export function fetchAdminProjects(token: string) {
  return requestJson<AdminProject[]>('/api/admin/projects', undefined, token)
}

export function createAdminProject(token: string, payload: ProjectSummary) {
  return requestJson<AdminProject>(
    '/api/admin/projects',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    token,
  )
}

export function updateAdminProject(
  token: string,
  id: string,
  payload: ProjectSummary,
) {
  return requestJson<AdminProject>(
    `/api/admin/projects/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    },
    token,
  )
}

export function deleteAdminProject(token: string, id: string) {
  return requestJson<{ id: string; message: string }>(
    `/api/admin/projects/${id}`,
    {
      method: 'DELETE',
    },
    token,
  )
}

export function reorderAdminProjects(token: string, ids: string[]) {
  return requestJson<AdminProject[]>(
    '/api/admin/projects/reorder',
    {
      method: 'PATCH',
      body: JSON.stringify({ ids }),
    },
    token,
  )
}

export function fetchAdminSkills(token: string) {
  return requestJson<AdminSkillGroup[]>('/api/admin/skills', undefined, token)
}

export function createAdminSkillGroup(token: string, payload: SkillGroup) {
  return requestJson<AdminSkillGroup>(
    '/api/admin/skills',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    token,
  )
}

export function updateAdminSkillGroup(
  token: string,
  id: string,
  payload: SkillGroup,
) {
  return requestJson<AdminSkillGroup>(
    `/api/admin/skills/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    },
    token,
  )
}

export function deleteAdminSkillGroup(token: string, id: string) {
  return requestJson<{ id: string; message: string }>(
    `/api/admin/skills/${id}`,
    {
      method: 'DELETE',
    },
    token,
  )
}

export function reorderAdminSkillGroups(token: string, ids: string[]) {
  return requestJson<AdminSkillGroup[]>(
    '/api/admin/skills/reorder',
    {
      method: 'PATCH',
      body: JSON.stringify({ ids }),
    },
    token,
  )
}

export function fetchAdminTestimonials(token: string) {
  return requestJson<AdminTestimonial[]>(
    '/api/admin/testimonials',
    undefined,
    token,
  )
}

export function createAdminTestimonial(token: string, payload: Testimonial) {
  return requestJson<AdminTestimonial>(
    '/api/admin/testimonials',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    token,
  )
}

export function updateAdminTestimonial(
  token: string,
  id: string,
  payload: Testimonial,
) {
  return requestJson<AdminTestimonial>(
    `/api/admin/testimonials/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    },
    token,
  )
}

export function updateAdminTestimonialStatus(
  token: string,
  id: string,
  status: TestimonialModerationStatus,
) {
  return requestJson<AdminTestimonial>(
    `/api/admin/testimonials/${id}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    },
    token,
  )
}

export function deleteAdminTestimonial(token: string, id: string) {
  return requestJson<{ id: string; message: string }>(
    `/api/admin/testimonials/${id}`,
    {
      method: 'DELETE',
    },
    token,
  )
}

export function reorderAdminTestimonials(token: string, ids: string[]) {
  return requestJson<AdminTestimonial[]>(
    '/api/admin/testimonials/reorder',
    {
      method: 'PATCH',
      body: JSON.stringify({ ids }),
    },
    token,
  )
}

export function fetchAdminContacts(token: string) {
  return requestJson<AdminContactResponse>('/api/admin/contact', undefined, token)
}

export function updateAdminContactStatus(
  token: string,
  id: string,
  status: ContactSubmissionStatus,
) {
  return requestJson<AdminContactSubmission>(
    `/api/admin/contact/${id}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    },
    token,
  )
}
