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
