import type { ProfileContent } from '../../types/content.js'

export const profile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer and Full-Stack Developer',
  location: 'Newark, NJ',
  currentEmployer: 'Teledyne Technologies Inc',
  previousEmployer: 'Creative Newtech Ltd',
  education: 'BS Software Engineering (In Progress), Arizona State University',
  availability:
    'Open to DevOps engineering roles, platform engineering work, and freelance cloud or full-stack delivery conversations.',
  summary:
    'Newark-based DevOps Engineer and Full-Stack Developer with 5+ years designing cloud infrastructure, CI/CD pipelines, Kubernetes platforms, and production React/Node applications.',
  intro:
    'I help teams build calmer release systems: AWS infrastructure with Terraform, GitHub Actions and Jenkins pipelines, Kubernetes platforms, observability, and full-stack applications with React, TypeScript, Node.js, and MongoDB.',
  about:
    'I work on the systems teams depend on when releases, infrastructure, or production support need to be reliable: CI/CD pipelines, AWS infrastructure, Kubernetes deployments, observability, and application delivery. At Teledyne Technologies Inc, I support DevOps delivery across AWS, Kubernetes, Terraform, GitHub Actions, Jenkins, observability, and security-minded release workflows. Before that, I worked as an AWS Cloud Engineer at Creative Newtech Ltd, automating infrastructure and improving cloud operations across AWS environments.',
  certifications: [
    'AWS Certified DevOps Engineer – Professional',
    'AWS Certified Cloud Practitioner',
    'IBM Software Engineering Essentials',
    'Google IT Support Professional Certificate',
  ],
  strengths: [
    'CI/CD modernization with GitHub Actions, Jenkins, GitLab CI/CD, and Azure DevOps',
    'Infrastructure as Code with Terraform, remote state, and repeatable AWS environments',
    'Kubernetes operations with EKS, Helm, Kustomize, ArgoCD GitOps, and self-hosted k3s',
    'DevSecOps practices with pipeline scanning, IAM/RBAC, and secrets-aware delivery',
    'Full-stack delivery with React, TypeScript, Node.js, Express, MongoDB, and PostgreSQL',
  ],
  timeline: [
    {
      title: 'DevOps Engineer, Teledyne Technologies Inc',
      period: 'Sept 2024 - Present',
      detail:
        'Supporting cloud-native DevOps delivery across AWS, Kubernetes, Terraform, CI/CD automation, observability, and secure production deployment workflows in Newark, NJ.',
    },
    {
      title: 'AWS Cloud Engineer, Creative Newtech Ltd',
      period: 'June 2020 - Aug 2024',
      detail:
        'Designed and operated AWS infrastructure across EC2, S3, RDS, VPC, IAM, CloudWatch, Terraform, Jenkins, GitLab CI/CD, Docker, and Kubernetes-backed delivery workflows.',
    },
    {
      title: 'Software Engineering, Arizona State University',
      period: 'In progress',
      detail:
        'Continuing a BS in Software Engineering while applying cloud, DevOps, and full-stack systems work in production and portfolio projects.',
    },
  ],
  links: {
    email: 'mailto:t.achille.tech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/achille-traore',
    github: 'https://github.com/traliach',
    resume: '/ali-achille-traore-resume.txt',
  },
}
