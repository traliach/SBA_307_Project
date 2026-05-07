export interface ProfileContent {
  name: string
  title: string
  location: string
  currentEmployer?: string
  previousEmployer?: string
  education?: string
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
    github: string
    resume: string
  }
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
  repoUrl?: string
  liveUrl?: string
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

export type TestimonialModerationStatus =
  | 'pending'
  | 'approved'
  | 'rejected'

export type TestimonialSource = 'seed' | 'public' | 'admin'

export interface TestimonialSubmissionInput extends Testimonial {
  email: string
}

export interface TestimonialSubmissionResult {
  id: string
  message: string
  receivedAt: string
}

export interface AdminTestimonial extends Testimonial {
  email: string
  submittedAt: string
  status: TestimonialModerationStatus
  source: TestimonialSource
}

export interface ContactSubmissionInput {
  name: string
  email: string
  inquiryType: string
  message: string
}

export type ContactSubmissionStatus =
  | 'new'
  | 'reviewed'
  | 'replied'
  | 'archived'

export interface ContactSubmission extends ContactSubmissionInput {
  id: string
  receivedAt: string
  status: ContactSubmissionStatus
}
