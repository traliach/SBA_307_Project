import type { ProfileContent } from '../../types/content.js'

export const profile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer & Full-Stack Software Engineer',
  location: 'Remote / Hybrid / On-site (US-wide)',
  availability:
    'Open to DevOps, platform engineering, and full-stack software engineering roles.',
  summary:
    'Software/platform engineer with a deep DevOps background building automation, delivery pipelines, and scalable runtime platforms. Delivered measurable improvements in release speed, reliability, and developer productivity across cloud-native systems on AWS, Azure, and GCP.',
  intro:
    'Expanding into full-stack product delivery — shipping React/TypeScript frontends and Node.js/Express APIs — while bringing the same operational discipline to application code.',
  about:
    "I work on the parts engineering teams notice most when they break: CI/CD pipelines, cloud environments, release handoffs, and production support. Seven years at Dominion Systems have covered Jenkins, Azure DevOps, Terraform, Kubernetes, OpenShift, and observability tooling (Prometheus, Grafana, Kibana), alongside hands-on AWS infrastructure and database operations. More recently I've been shipping full-stack applications — MERN-stack marketplaces, containerized Rails platforms, and medical imaging systems — closing the loop between deployment automation and the applications running on top of it.",
  certifications: [
    'AWS Certified DevOps Engineer – Professional',
    'AWS Certified Cloud Practitioner',
    'Google IT Support Professional Certificate',
  ],
  strengths: [
    'CI/CD pipeline design and optimization (Jenkins, Azure DevOps, GitHub Actions)',
    'Infrastructure as code at scale — 50+ components automated with Terraform and Ansible',
    'Kubernetes and OpenShift cluster operations across 10+ production clusters',
    'Observability and incident response (Prometheus, Grafana, Kibana)',
    'Full-stack delivery: React, TypeScript, Node.js, Express, MongoDB, PostgreSQL',
  ],
  timeline: [
    {
      title: 'DevOps Engineer, Dominion Systems',
      period: 'August 2018 – Present',
      detail:
        'Improved CI/CD pipelines (Jenkins, Azure DevOps), cutting build/deploy time by ~30% and sustaining ~99.9% uptime across 10+ Kubernetes/OpenShift clusters. Automated 50+ infrastructure components with Terraform and Ansible.',
    },
    {
      title: 'AWS Cloud Engineer, Dominion Systems',
      period: 'June 2017 – July 2018',
      detail:
        'AWS infrastructure operations — CloudFormation, CodePipeline, API Gateway, RDS, DynamoDB, Aurora, Transit Gateway, and hybrid connectivity.',
    },
    {
      title: 'Full-Stack & AI-Native Development',
      period: '2025 – Present',
      detail:
        'Per Scholas Software Engineer / AI-Native track — intensive program in full-stack and AI-integrated development covering React, TypeScript, Node.js, and cloud-native patterns.',
    },
  ],
  links: {
    email: 'mailto:t.achille.tech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/achille-traore',
    github: 'https://github.com/traliach',
    resume: '/ali-achille-traore-resume.txt',
  },
}
