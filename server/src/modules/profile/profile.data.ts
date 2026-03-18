import type { ProfileContent } from '../../types/content.js'

export const profile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer',
  location: 'Newark, NJ',
  availability:
    'Open to DevOps, platform engineering, cloud automation, and software engineering opportunities.',
  summary:
    'AWS-certified DevOps engineer with hands-on work across CI/CD, infrastructure automation, cloud delivery, and production support in AWS, Azure, and GCP. I focus on making deployment paths clearer, environments easier to operate, and releases more dependable.',
  intro:
    'I am extending that foundation into full-stack software engineering with React, TypeScript, Express, and MongoDB, applying the same emphasis on maintainable systems and disciplined delivery.',
  about:
    'I work on the parts of engineering teams notice most when they break: deployment pipelines, cloud environments, release handoffs, and production support. My background is in DevOps and cloud delivery across AWS, Azure, and GCP, with an emphasis on automation, troubleshooting, and operating systems that stay predictable under pressure.',
  certifications: [
    'AWS Certified DevOps Engineer - Professional',
    'AWS Certified Cloud Practitioner',
    'Google IT Support Specialization',
  ],
  strengths: [
    'CI/CD pipeline design and optimization',
    'Infrastructure as code with Terraform and related tooling',
    'Cloud delivery across AWS, Azure, and GCP',
    'Production troubleshooting and operational support',
    'Cross-functional collaboration between engineering and operations',
  ],
  timeline: [
    {
      title: 'DevOps Engineer, Dominion Systems',
      period: 'August 2018 - Present',
      detail:
        'Supported CI/CD workflows, infrastructure automation, and delivery operations across AWS and GCP engagements.',
    },
    {
      title: 'AWS Cloud Engineer, Dominion Systems',
      period: 'June 2017 - July 2018',
      detail:
        'Handled AWS infrastructure operations, networking, database administration, and production change work.',
    },
    {
      title: 'Full-Stack Engineering Growth',
      period: 'Current',
      detail:
        'Building React, TypeScript, Express, and MongoDB applications on top of a DevOps foundation.',
    },
  ],
  links: {
    email: 'mailto:ali.achille.traore@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ali-achille-traore',
    resume: '/ali-achille-traore-resume.txt',
  },
}
