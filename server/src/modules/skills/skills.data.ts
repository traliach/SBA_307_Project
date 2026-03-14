import type { SkillGroup } from '../../types/content.js'

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: 'Cloud',
    title: 'Platforms & Services',
    description:
      'Multi-cloud delivery across AWS, Azure, and GCP with hands-on compute, identity, and operations experience.',
    items: ['AWS', 'Azure', 'GCP', 'Compute Engine', 'Cloud Storage', 'IAM'],
  },
  {
    eyebrow: 'Delivery',
    title: 'CI/CD & Quality',
    description:
      'Release pipelines and quality tooling used to improve deployment speed, repeatability, and confidence.',
    items: ['Jenkins', 'GitLab CI/CD', 'CircleCI', 'Azure DevOps', 'Maven', 'SonarQube', 'Nexus'],
  },
  {
    eyebrow: 'Platform',
    title: 'Containers & IaC',
    description:
      'Container orchestration and infrastructure automation used to keep environments consistent and scalable.',
    items: ['Docker', 'Kubernetes', 'OpenShift', 'Terraform', 'CloudFormation', 'ARM', 'Ansible'],
  },
]
