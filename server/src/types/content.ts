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

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

export interface ContactSubmissionInput {
  name: string
  email: string
  inquiryType: string
  message: string
}

export interface ContactSubmission extends ContactSubmissionInput {
  id: string
  receivedAt: string
}
