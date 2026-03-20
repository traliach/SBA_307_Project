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
  title: 'Software / Platform Engineer · AWS DevOps Pro',
  location: 'Remote / Hybrid / On-site (US-wide)',
  availability:
    'EAD — authorized to work in the US. Open to DevOps, platform engineering, and full-stack software engineering roles.',
  summary:
    'Software/platform engineer with a deep DevOps background building automation, delivery pipelines, and scalable runtime platforms. Delivered measurable improvements in release speed, reliability, and developer productivity across cloud-native systems on AWS, Azure, and GCP.',
  intro:
    'Expanding into full-stack product delivery — shipping React/TypeScript frontends and Node.js/Express APIs — while bringing the same operational discipline to application code.',
  about:
    'I work on the parts engineering teams notice most when they break: CI/CD pipelines, cloud environments, release handoffs, and production support. Seven years at Dominion Systems have covered Jenkins, Azure DevOps, Terraform, Kubernetes, OpenShift, and observability tooling (Prometheus, Grafana, Kibana), alongside hands-on AWS infrastructure and database operations. More recently I\'ve been shipping full-stack applications — MERN-stack marketplaces, containerized Rails platforms, and medical imaging systems — closing the loop between deployment automation and the applications running on top of it.',
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
        'Per Scholas Software Engineer / AI-Native program. Shipped MERN-stack marketplace, containerized Rails platform, and cloud-hosted medical imaging system.',
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
    label: 'Deploy time',
    value: '~30% faster',
    detail: 'CI/CD pipeline improvements (Jenkins, Azure DevOps) cut build and deploy time by approximately 30%.',
  },
  {
    label: 'Infra automated',
    value: '50+ components',
    detail: 'Terraform and Ansible automation across 50+ infrastructure components, reducing deployment time by ~40%.',
  },
  {
    label: 'Cluster uptime',
    value: '~99.9%',
    detail: 'Sustained across 10+ Kubernetes/OpenShift clusters via standardized manifests and runbooks.',
  },
  {
    label: 'Incidents reduced',
    value: '~50% fewer',
    detail: '15+ security audits and remediation cycles cut security incidents by approximately 50%.',
  },
]

export const projectSummaries: ProjectSummary[] = [
  {
    title: 'Restaurant Deals — MERN Marketplace',
    timeframe: '2026',
    role: 'Full-Stack Developer',
    featured: true,
    summary:
      'Full-stack marketplace with Customer, Owner, and Admin role flows — JWT auth, RBAC, deal lifecycle workflow, Stripe payments, and an AI chat assistant powered by Groq.',
    challenge:
      'Build a production-quality marketplace where restaurant owners submit deals, admins review and publish them, and customers can browse, filter, and purchase — all with proper role isolation and workflow enforcement.',
    solution:
      'Designed a REST API with Express + TypeScript enforcing a Draft → Submitted → Published/Rejected lifecycle. MongoDB schemas and indexes support a public feed, admin queue, and owner portal. React 19 SPA with Redux Toolkit, Stripe Elements, and a floating Groq-powered AI chat widget that translates natural language into deal filters.',
    stack: ['MongoDB', 'Express', 'React 19', 'Node.js', 'TypeScript', 'Redux Toolkit', 'Stripe', 'Groq API', 'Tailwind CSS v4'],
    metrics: [
      { label: 'Roles', value: '3 (Customer / Owner / Admin)' },
      { label: 'Auth', value: 'JWT + RBAC' },
      { label: 'Payments', value: 'Stripe' },
    ],
    outcomes: [
      'Server-enforced deal status workflow with admin review queue and owner portal.',
      'AI chat widget converts plain-language queries into live deal filters.',
      'Shopping cart with localStorage persistence, order history, and Stripe checkout.',
    ],
  },
  {
    title: 'Global PACS — Hybrid Cloud Medical Imaging',
    timeframe: 'Jul – Nov 2025',
    role: 'Lead Engineer',
    featured: true,
    summary:
      'Dual-site Orthanc PACS deployment with Docker Compose, PostgreSQL, and S3/Wasabi object storage — production-grade medical imaging infrastructure built and operated from scratch.',
    challenge:
      'Stand up a reliable, dual-site medical imaging system integrating local and cloud PACS nodes with shared object storage, and document every storage, networking, and database failure for repeatable remediation.',
    solution:
      'Composed the full stack with Docker Compose (Orthanc, PostgreSQL, S3/Wasabi). Wrote Python automation for environment validation and initialization. Captured every troubleshooting path in structured runbooks.',
    stack: ['Docker Compose', 'Orthanc PACS', 'PostgreSQL', 'S3 / Wasabi', 'Python'],
    metrics: [
      { label: 'Architecture', value: 'Dual-site (local + cloud)' },
      { label: 'Storage', value: 'S3 / Wasabi' },
      { label: 'Automation', value: 'Python' },
    ],
    outcomes: [
      'Operational dual-site PACS with shared S3-compatible object storage.',
      'Python scripts reduced manual setup steps and enforced consistent initialization.',
      'Runbooks documented every failure mode for repeatable remediation.',
    ],
  },
  {
    title: 'Mercedes-Benz DMS — Pipeline Modernization',
    timeframe: '2023 – 2024',
    role: 'DevOps Engineer',
    featured: false,
    summary:
      'Delivered Jenkins and Azure DevOps pipelines, Docker/Ansible/Kubernetes automation, and JFrog artifact workflows — improving deployment efficiency by ~30% and cutting vulnerabilities by ~15%.',
    challenge:
      'Release workflows lacked consistency, artifact handling was fragile, and security controls inside the pipeline were insufficient for an enterprise delivery cadence.',
    solution:
      'Rebuilt CI/CD flows across Jenkins and Azure DevOps, introduced Docker and Ansible automation, tightened Kubernetes deployment practices, and hardened artifact promotion with JFrog.',
    stack: ['Jenkins', 'Azure DevOps', 'Docker', 'Ansible', 'Kubernetes', 'JFrog'],
    metrics: [
      { label: 'Deploy efficiency', value: '~30% improvement' },
      { label: 'Automation', value: '~20% gain' },
      { label: 'Vulnerabilities', value: '~15% reduction' },
    ],
    outcomes: [
      'CI/CD pipelines improved deployment efficiency and code reuse by ~30%.',
      'Docker, Ansible, and Kubernetes automation cut manual effort by ~20%.',
      'Pipeline security controls reduced vulnerabilities by ~15%.',
    ],
  },
]

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
    value: 'Remote / Hybrid / On-site (US-wide)',
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
