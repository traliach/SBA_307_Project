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
    'Newark-based DevOps Engineer and Full-Stack Developer with 5+ years designing cloud infrastructure, CI/CD pipelines, Kubernetes platforms, observability systems, and production React/Node applications.',
  intro:
    'I help teams build calmer release systems: AWS and Azure infrastructure with Terraform, GitHub Actions and Jenkins pipelines, Kubernetes platforms, observability, DevSecOps checks, and full-stack applications with React, TypeScript, Node.js, and MongoDB.',
  about:
    'I work on the systems teams depend on when releases, infrastructure, or production support need to be reliable: CI/CD pipelines, AWS and Azure infrastructure, Kubernetes deployments, observability, DevSecOps controls, automation, and application delivery. At Teledyne Technologies Inc, I support DevOps delivery across AWS, Kubernetes, Terraform, GitHub Actions, Jenkins, observability, and security-minded release workflows. Before that, I worked as an AWS Cloud Engineer at Creative Newtech Ltd, automating infrastructure and improving cloud operations across AWS environments.',
  certifications: [
    'AWS Certified DevOps Engineer – Professional',
    'AWS Certified Cloud Practitioner',
    'IBM Software Engineering Essentials',
    'Google IT Support Professional Certificate',
  ],
  strengths: [
    'Cloud infrastructure across AWS, Azure, and GCP services with FinOps and cost optimization practices',
    'CI/CD modernization with Jenkins, GitHub Actions, GitLab CI/CD, Azure DevOps, blue-green releases, and canary releases',
    'Kubernetes operations with EKS, AKS, GKE, Helm, Kustomize, ArgoCD, FluxCD, and service mesh patterns',
    'DevSecOps practices with SAST, DAST, SCA, Trivy, Aqua, IAM/RBAC, secrets management, and compliance support',
    'Observability with Prometheus, Grafana, ELK, OpenTelemetry, Splunk, Datadog, New Relic, and CloudWatch',
    'Automation and full-stack delivery with Python, Bash, React, TypeScript, Node.js, Express, MongoDB, and PostgreSQL',
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
    resume: '/ali-achille-traore-resume.pdf',
  },
}
