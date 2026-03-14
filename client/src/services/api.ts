import type {
  ApiHealth,
  ContactSubmissionInput,
  ContactSubmissionResult,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
} from '../types/site'

async function readJson<T>(path: string): Promise<T> {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

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

export async function submitContact(payload: ContactSubmissionInput) {
  const response = await fetch('/api/contact', {
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

    throw new Error(errorBody?.message ?? `Request failed: ${response.status}`)
  }

  return (await response.json()) as ContactSubmissionResult
}
