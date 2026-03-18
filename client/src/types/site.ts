export type ApiState = 'loading' | 'online' | 'offline'
export type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
export type AdminAuthState = 'checking' | 'signed_out' | 'signing_in' | 'signed_in'

export interface ApiHealth {
  service: string
  status: string
  timestamp: string
}

export interface ProfileContent {
  name: string
  title: string
  location: string
  availability: string
  summary: string
  intro: string
  about: string
  certifications: string[]
  strengths: string[]
  timeline: Array<{
    title: string
    period: string
    detail: string
  }>
  links: {
    email: string
    linkedin: string
    resume: string
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
  role: string
  featured: boolean
  summary: string
  challenge: string
  solution: string
  stack: string[]
  metrics: Array<{
    label: string
    value: string
  }>
  outcomes: string[]
}

export interface SkillGroup {
  eyebrow: string
  title: string
  description: string
  items: string[]
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

export type TestimonialModerationStatus = 'pending' | 'approved' | 'rejected'
export type TestimonialSource = 'seed' | 'public' | 'admin'

export interface ContactItem {
  label: string
  value: string
  href?: string
}

export interface ContactTopic {
  value: string
  label: string
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

export interface TestimonialSubmissionInput extends Testimonial {
  email: string
}

export interface TestimonialSubmissionResult {
  id: string
  message: string
  receivedAt: string
}

export type ContactSubmissionStatus =
  | 'new'
  | 'reviewed'
  | 'replied'
  | 'archived'

export interface AdminSession {
  authenticated: boolean
  admin: {
    email: string
    role: 'admin'
  } | null
  mfaEnabled: boolean
  mfaRecoveryEnabled?: boolean
}

export interface AdminLoginResult {
  token: string
  expiresIn: string
  mfaEnabled: boolean
  mfaRecoveryEnabled?: boolean
}

export interface AdminProject extends ProjectSummary {
  id: string
  order: number
}

export interface AdminSkillGroup extends SkillGroup {
  id: string
  order: number
}

export interface AdminTestimonial extends Testimonial {
  id: string
  order: number
  email: string
  submittedAt: string
  status: TestimonialModerationStatus
  source: TestimonialSource
}

export interface AdminContactSubmission extends ContactSubmissionInput {
  id: string
  receivedAt: string
  status: ContactSubmissionStatus
}

export interface AdminContactResponse {
  count: number
  latest: AdminContactSubmission | null
  items: AdminContactSubmission[]
}
