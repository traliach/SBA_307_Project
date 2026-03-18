import type { SkillGroup } from '../../types/content.js'

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: 'Cloud platforms',
    title: 'AWS, Azure, and GCP',
    description:
      'Hands-on delivery and support work across major cloud environments, with a bias toward stable deployment patterns and operational clarity.',
    items: ['AWS', 'Azure', 'GCP', 'IAM', 'Compute', 'Storage'],
  },
  {
    eyebrow: 'CI/CD and automation',
    title: 'Release workflows that hold up in production',
    description:
      'Pipeline tooling and automation used to reduce manual release steps and make delivery easier to trust under pressure.',
    items: ['Jenkins', 'GitLab CI/CD', 'CircleCI', 'Azure DevOps', 'Maven', 'SonarQube'],
  },
  {
    eyebrow: 'Infrastructure as code',
    title: 'Repeatable environment delivery',
    description:
      'Infrastructure automation focused on consistency, change control, and easier handoff between engineering and operations.',
    items: ['Terraform', 'CloudFormation', 'ARM', 'Ansible'],
  },
  {
    eyebrow: 'Containers and orchestration',
    title: 'Containerized platform operations',
    description:
      'Container build and orchestration tooling used to support modern deployment workflows and platform reliability.',
    items: ['Docker', 'Kubernetes', 'OpenShift', 'Kubeflow'],
  },
  {
    eyebrow: 'Backend / full-stack',
    title: 'Application work with an infrastructure mindset',
    description:
      'Application development that connects front-end, API, and data-layer decisions back to delivery and maintainability concerns.',
    items: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    eyebrow: 'Operations',
    title: 'Troubleshooting, monitoring, and support',
    description:
      'Operational support focused on diagnosing failures, improving visibility, and keeping release workflows moving.',
    items: ['Prometheus', 'Production support', 'Release validation', 'Incident troubleshooting'],
  },
]
