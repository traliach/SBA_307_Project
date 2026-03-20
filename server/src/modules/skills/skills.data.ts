import type { SkillGroup } from '../../types/content.js'

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: 'Languages',
    title: 'TypeScript, JavaScript, Python, Ruby',
    description:
      'Primary languages used across full-stack applications, DevOps automation scripts, and infrastructure tooling.',
    items: ['TypeScript', 'JavaScript', 'Python', 'Ruby'],
  },
  {
    eyebrow: 'Frontend',
    title: 'React and modern UI tooling',
    description:
      'Client-side development with component-based architecture, state management, and utility-first styling.',
    items: ['React', 'React Router', 'Redux Toolkit', 'Tailwind CSS', 'Vite'],
  },
  {
    eyebrow: 'Backend and APIs',
    title: 'Node.js, Express, and REST API design',
    description:
      'Server-side application development with structured API design, authentication, and role-based access control.',
    items: ['Node.js', 'Express', 'REST APIs', 'JWT Authentication', 'Zod', 'Stripe'],
  },
  {
    eyebrow: 'Databases',
    title: 'MongoDB, PostgreSQL, and cloud-managed stores',
    description:
      'Data modeling, schema design, and query optimization across document and relational databases.',
    items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'DynamoDB', 'RDS / Aurora', 'Redshift'],
  },
  {
    eyebrow: 'CI/CD and delivery',
    title: 'Release workflows that hold up in production',
    description:
      'Pipeline tooling used to reduce manual release steps and cut build/deploy time by ~30% in production.',
    items: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Docker Compose', 'JFrog', 'SonarQube'],
  },
  {
    eyebrow: 'Cloud and IaC',
    title: 'AWS, Terraform, and multi-cloud infrastructure',
    description:
      'Infrastructure as code and cloud delivery across AWS, Azure, and GCP — 50+ components automated with Terraform and Ansible.',
    items: ['AWS (S3, CloudFront, CodePipeline, API Gateway)', 'Terraform', 'CloudFormation', 'Ansible', 'Azure', 'GCP'],
  },
  {
    eyebrow: 'Containers and orchestration',
    title: 'Kubernetes, OpenShift, and Docker',
    description:
      'Container build and cluster operations sustaining ~99.9% uptime across 10+ Kubernetes and OpenShift environments.',
    items: ['Docker', 'Kubernetes', 'OpenShift', 'Docker Compose'],
  },
  {
    eyebrow: 'Observability and operations',
    title: 'Prometheus, Grafana, and Kibana',
    description:
      'Monitoring and incident response tooling that improved detection time by ~25% and cut resolution time by ~35%.',
    items: ['Prometheus', 'Grafana', 'Kibana', 'CloudWatch', 'Linux'],
  },
]
