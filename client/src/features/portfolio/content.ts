import type {
  ContactItem,
  ContactSubmissionInput,
  ContactTopic,
  Highlight,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  Testimonial,
} from '../../types/site'

export const fallbackProfile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer',
  location: 'Newark, NJ',
  availability: 'Open to DevOps, platform engineering, and cloud automation roles',
  summary:
    'DevOps engineer with over six years of experience across AWS, Azure, and GCP, focused on CI/CD, infrastructure automation, cloud operations, and delivery reliability.',
  intro:
    'This React client is the first step in moving the portfolio from static pages into a typed full-stack platform backed by an API.',
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

export const highlightMetrics: Highlight[] = [
  {
    label: 'Experience',
    value: '6+ years',
    detail: 'Delivery, CI/CD, cloud infrastructure, and operational automation.',
  },
  {
    label: 'Deployment speed',
    value: '30%',
    detail: 'Measured reduction in build and deployment times from pipeline improvements.',
  },
  {
    label: 'Infra automation',
    value: '50+',
    detail: 'Infrastructure components automated with ARM, Terraform, and Ansible workflows.',
  },
  {
    label: 'Security audits',
    value: '15+',
    detail: 'Security and monitoring improvements across production environments.',
  },
]

export const projectSummaries: ProjectSummary[] = [
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
    value: 'ali.achille.traore@gmail.com',
    href: 'mailto:ali.achille.traore@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ali-achille-traore',
    href: 'https://www.linkedin.com/in/ali-achille-traore',
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

export const nextBuildSteps = [
  'Replace static HTML sections with routed React pages.',
  'Move content into API-managed profile, projects, skills, and testimonials modules.',
  'Connect the contact experience to a persisted submission flow.',
]
