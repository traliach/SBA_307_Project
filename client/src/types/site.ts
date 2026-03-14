export type ApiState = 'loading' | 'online' | 'offline'

export interface ApiHealth {
  service: string
  status: string
  timestamp: string
}

export interface ProfileContent {
  name: string
  title: string
  location: string
  summary: string
  intro: string
  certifications: string[]
  links: {
    email: string
    linkedin: string
  }
}

export interface Highlight {
  label: string
  value: string
  detail: string
}

export interface ProjectSummary {
  title: string
  timeframe: string
  summary: string
  stack: string[]
  outcomes: string[]
}

export interface SkillGroup {
  eyebrow: string
  title: string
  description: string
  items: string[]
}

export interface ContactItem {
  label: string
  value: string
  href?: string
}

export interface ContactSubmissionInput {
  name: string
  email: string
  inquiryType: string
  message: string
}

export interface ContactSubmissionResult {
  id: string
  message: string
  receivedAt: string
}
