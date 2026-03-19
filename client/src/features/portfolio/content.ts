import type {
  ContactItem,
  ContactSubmissionInput,
  ContactTopic,
  Highlight,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  Testimonial,
  TestimonialSubmissionInput,
} from '../../types/site'

export const fallbackProfile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer',
  location: 'Newark, NJ',
  availability:
    'Open to DevOps, platform engineering, cloud infrastructure, and full-stack software engineering roles.',
  summary:
    'AWS-certified DevOps engineer with hands-on work across CI/CD, infrastructure automation, cloud delivery, and production support in AWS, Azure, and GCP. I focus on making deployment paths clearer, environments easier to operate, and releases more dependable.',
  intro:
    'Currently expanding into full-stack software engineering with React, TypeScript, Express, and MongoDB — bringing the same discipline around maintainability and structured delivery to application work.',
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
    email: 'mailto:t.achille.tech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/achille-traore',
    resume: '/ali-achille-traore-resume.txt',
  },
}

export const highlightMetrics: Highlight[] = [
  {
    label: 'Certification',
    value: 'AWS-certified',
    detail: 'Professional-level AWS certification backed by day-to-day delivery work.',
  },
  {
    label: 'Platforms',
    value: 'AWS, Azure, GCP',
    detail: 'Multi-cloud experience across delivery, support, and environment automation.',
  },
  {
    label: 'Core focus',
    value: 'CI/CD + IaC',
    detail: 'Release engineering, Terraform-led automation, and repeatable deployment workflows.',
  },
  {
    label: 'Engineering range',
    value: 'Ops-minded full stack',
    detail: 'Application development in React, TypeScript, Express, and MongoDB grounded in operational thinking.',
  },
]

export const projectSummaries: ProjectSummary[] = [
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

export const testimonialQuotes: Testimonial[] = [
  {
    quote:
      'Ali brought structure to our delivery process and consistently removed friction from CI/CD workflows that had slowed the team down for months.',
    author: 'Program Delivery Lead',
    role: 'Delivery Manager',
    company: 'Hilton',
  },
  {
    quote:
      'He was the engineer people trusted when deployments became high-risk. His troubleshooting was fast, methodical, and grounded in production reality.',
    author: 'Platform Engineering Partner',
    role: 'Senior DevOps Engineer',
    company: 'Mercedes-Benz',
  },
  {
    quote:
      'Ali translated infrastructure needs into repeatable automation and helped the broader team operate Kubernetes environments with much more confidence.',
    author: 'Analytics Platform Stakeholder',
    role: 'Technical Product Owner',
    company: 'Dominion Systems',
  },
]

export const contactItems: ContactItem[] = [
  {
    label: 'Email',
    value: 't.achille.tech@gmail.com',
    href: 'mailto:t.achille.tech@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/achille-traore',
    href: 'https://www.linkedin.com/in/achille-traore',
  },
  {
    label: 'GitHub',
    value: 'github.com/traliach',
    href: 'https://github.com/traliach',
  },
  {
    label: 'Location',
    value: 'Newark, NJ',
  },
]

export function createInitialContactForm(): ContactSubmissionInput {
  return {
    name: '',
    email: '',
    inquiryType: 'devops-role',
    message: '',
  }
}

export const contactTopics: ContactTopic[] = [
  { value: 'devops-role', label: 'DevOps role or interview conversation' },
  { value: 'ci-cd-modernization', label: 'CI/CD modernization' },
  { value: 'cloud-migration', label: 'Cloud migration or infrastructure as code' },
  { value: 'platform-reliability', label: 'Containers, Kubernetes, or platform reliability' },
  { value: 'software-engineering', label: 'Software engineering collaboration' },
]

export function createInitialTestimonialForm(): TestimonialSubmissionInput {
  return {
    author: '',
    email: '',
    role: '',
    company: '',
    quote: '',
  }
}

export const nextBuildSteps = [
  'Cloud-native architecture and container orchestration at scale',
  'Platform engineering with deeper Kubernetes and observability focus',
  'Full-stack product delivery from API design through deployment',
]
