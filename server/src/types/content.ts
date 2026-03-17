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

export type TestimonialModerationStatus =
  | 'pending'
  | 'approved'
  | 'rejected'

export interface AdminTestimonial extends Testimonial {
  status: TestimonialModerationStatus
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
