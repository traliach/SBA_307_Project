import type { ProjectSummary } from '../../types/content.js'

export const projects: ProjectSummary[] = [
  {
    title: 'Hilton Cloud Delivery',
    timeframe: '2021-2022',
    role: 'DevOps Engineer',
    featured: true,
    summary:
      'Supported GCP delivery automation with Jenkins, Terraform, Docker, and Kubernetes to make infrastructure and application releases more repeatable.',
    challenge:
      'Infrastructure changes and container releases needed a cleaner, more consistent path from build to deployment.',
    solution:
      'Used Jenkins to standardize delivery steps, managed environment changes with Terraform, and tightened the handoff into container deployment workflows.',
    stack: ['GCP', 'Jenkins', 'Terraform', 'Docker', 'Kubernetes'],
    metrics: [
      { label: 'Environment', value: 'GCP' },
      { label: 'Delivery', value: 'Jenkins' },
      { label: 'Focus', value: 'Terraform' },
    ],
    outcomes: [
      'Standardized infrastructure changes across delivery environments.',
      'Made container releases easier to repeat and troubleshoot.',
      'Improved deployment reliability through more consistent automation.',
    ],
  },
  {
    title: 'Mercedes-Benz DMS Modernization',
    timeframe: '2023-2024',
    role: 'DevOps Engineer',
    featured: true,
    summary:
      'Improved CI/CD, artifact handling, and environment support across Jenkins, Azure DevOps, Docker, Ansible, and Kubernetes.',
    challenge:
      'Release workflows needed better consistency, clearer artifact handling, and stronger day-to-day support when deployments failed.',
    solution:
      'Refined CI/CD flows, improved release handling, and used container and automation tooling to stabilize routine delivery work.',
    stack: ['Jenkins', 'Azure DevOps', 'Docker', 'Ansible', 'Kubernetes'],
    metrics: [
      { label: 'Toolchain', value: 'Jenkins + Azure DevOps' },
      { label: 'Delivery', value: 'Containers' },
      { label: 'Focus', value: 'Operational stability' },
    ],
    outcomes: [
      'Reduced manual friction in release work.',
      'Improved troubleshooting around build and deployment failures.',
      'Strengthened overall delivery confidence and environment stability.',
    ],
  },
  {
    title: 'Kubeflow Workflow Automation',
    timeframe: 'Dominion Systems engagement',
    role: 'Platform / DevOps Engineer',
    featured: false,
    summary:
      'Automated Kubernetes-based Kubeflow workflows to make machine learning delivery and support work easier to operate.',
    challenge:
      'Machine learning workloads needed a more repeatable way to orchestrate pipeline runs and support them in production.',
    solution:
      'Integrated Kubeflow into Kubernetes workflows and supported the operational tooling around those pipelines.',
    stack: ['Kubeflow', 'Kubernetes', 'Python', 'Bash', 'Prometheus'],
    metrics: [
      { label: 'Platform', value: 'Kubernetes' },
      { label: 'Workflow', value: 'Kubeflow' },
      { label: 'Support', value: 'ML operations' },
    ],
    outcomes: [
      'Made machine learning workflows easier to deploy and scale.',
      'Improved day-to-day support around Kubernetes-based analytics delivery.',
      'Added structure to operational workflows that had previously been more manual.',
    ],
  },
]
