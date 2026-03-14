import type { ProfileContent } from '../../types/content.js'

export const profile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer',
  location: 'Newark, NJ',
  summary:
    'DevOps engineer with over six years of experience across AWS, Azure, and GCP, focused on CI/CD, infrastructure automation, cloud operations, and delivery reliability.',
  intro:
    'This API module is the first step in moving the portfolio from static HTML into structured, reusable content that can later be persisted in MongoDB.',
  certifications: [
    'AWS Certified DevOps Engineer - Professional',
    'AWS Certified Cloud Practitioner',
    'Google IT Support Specialization',
  ],
  links: {
    email: 'mailto:ali.achille.traore@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ali-achille-traore',
  },
}
