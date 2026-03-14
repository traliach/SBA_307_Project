import type { ProfileContent } from '../../types/content.js'

export const profile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer',
  location: 'Newark, NJ',
  availability: 'Open to DevOps, platform engineering, and cloud automation roles',
  summary:
    'DevOps engineer with over six years of experience across AWS, Azure, and GCP, focused on CI/CD, infrastructure automation, cloud operations, and delivery reliability.',
  intro:
    'This API module is the first step in moving the portfolio from static HTML into structured, reusable content that can later be persisted in MongoDB.',
  about:
    'I focus on taking unstable delivery processes and turning them into reliable systems teams can trust. My recent work spans enterprise CI/CD pipelines, GCP migration and automation efforts, Kubernetes-based workflows, and hands-on operational support across cloud environments.',
  certifications: [
    'AWS Certified DevOps Engineer - Professional',
    'AWS Certified Cloud Practitioner',
    'Google IT Support Specialization',
  ],
  strengths: [
    'CI/CD pipeline design and optimization across Jenkins, GitLab CI/CD, CircleCI, and Azure DevOps.',
    'Infrastructure automation with Terraform, CloudFormation, ARM, and Ansible.',
    'Cloud delivery across AWS, Azure, and GCP with a bias toward repeatable operational systems.',
    'Production troubleshooting, reliability improvement, and cross-functional delivery support.',
  ],
  timeline: [
    {
      title: 'DevOps Engineer, Dominion Systems',
      period: 'August 2018 - Present',
      detail:
        'Led CI/CD improvements, cloud delivery work, and infrastructure automation projects across AWS and GCP, including build and deployment improvements measured at roughly 30%.',
    },
    {
      title: 'AWS Cloud Engineer, Dominion Systems',
      period: 'June 2017 - July 2018',
      detail:
        'Supported AWS infrastructure operations, cloud networking, database administration, and production change work focused on stability and operational efficiency.',
    },
    {
      title: 'Software Engineering Growth Track',
      period: 'Current',
      detail:
        'Expanding into full-stack application delivery through modern TypeScript tooling while building on an operations and cloud engineering foundation.',
    },
  ],
  links: {
    email: 'mailto:ali.achille.traore@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ali-achille-traore',
    resume: '/ali-achille-traore-resume.txt',
  },
}
