import type { ProjectSummary } from '../../types/content.js'

export const projects: ProjectSummary[] = [
  {
    title: 'Hilton Cloud Delivery Project',
    timeframe: '2021-2022',
    summary:
      'GCP delivery work centered on Jenkins-driven deployment automation, Terraform-managed infrastructure, and container reliability.',
    stack: ['GCP', 'Jenkins', 'Terraform', 'Docker', 'Kubernetes'],
    outcomes: [
      'Improved deployment efficiency by 30%.',
      'Increased automation efficiency by 20%.',
      'Raised deployment reliability by 25% with customized Kubernetes manifests.',
    ],
  },
  {
    title: 'Mercedes-Benz DMS Modernization',
    timeframe: '2023-2024',
    summary:
      'Modernized build, deployment, and troubleshooting flows with stronger CI/CD, artifact management, and server reliability work.',
    stack: ['Jenkins', 'Azure DevOps', 'Docker', 'Ansible', 'Kubernetes'],
    outcomes: [
      'Improved deployment efficiency by 30%.',
      'Reduced vulnerabilities by 15%.',
      'Boosted application availability and performance by 30%.',
    ],
  },
  {
    title: 'Kubeflow Workflow Automation',
    timeframe: 'Dominion Systems',
    summary:
      'Integrated Kubeflow on Kubernetes to automate ML pipeline steps and improve analytics platform scalability.',
    stack: ['Kubeflow', 'Kubernetes', 'Python', 'Bash', 'Prometheus'],
    outcomes: [
      'Automated ML workflow deployment and scaling.',
      'Supported SRE operations for ML data workflows.',
      'Reduced time-to-market for predictive and analytics features.',
    ],
  },
]
