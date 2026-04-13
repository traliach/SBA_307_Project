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

// Credly badge links — keyed by exact cert name (both EN dash and hyphen variants).
export const certificationLinks: Record<string, string> = {
  'AWS Certified DevOps Engineer – Professional': 'https://www.credly.com/badges/cf4257f0-c48c-4ac9-9e40-aa39af363975',
  'AWS Certified DevOps Engineer - Professional': 'https://www.credly.com/badges/cf4257f0-c48c-4ac9-9e40-aa39af363975',
  'AWS Certified Cloud Practitioner': 'https://www.credly.com/badges/3b65cf67-1576-42ef-a926-fda8366c88bb',
  'Google IT Support Professional Certificate': 'https://www.credly.com/badges/a4afd99a-9bd5-44af-a5bd-ebe2b5e1bbc4',
}

export const fallbackProfile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer & Full-Stack Software Engineer',
  location: 'Remote / Hybrid / On-site (US-wide)',
  availability:
    'EAD — authorized to work in the US. Open to DevOps, platform engineering, and full-stack software engineering roles.',
  summary:
    'Platform and DevOps engineer with 7+ years building CI/CD pipelines, cloud infrastructure, and Kubernetes platforms — plus a full-stack track shipping React/TypeScript frontends and Node.js/Express APIs into production.',
  intro:
    'My portfolio spans both disciplines: cloud and IaC projects (Terraform-provisioned AWS infrastructure, self-hosted Kubernetes on EC2, Jenkins + Ansible platforms) and full-stack applications (MERN marketplace, medical imaging system, this site).',
  about:
    "I work on the parts engineering teams notice most when they break: CI/CD pipelines, cloud environments, release handoffs, and production support. Seven years at Dominion Systems have covered Jenkins, Azure DevOps, Terraform, Kubernetes, OpenShift, and observability tooling (Prometheus, Grafana, Kibana), alongside hands-on AWS infrastructure and database operations. My recent infrastructure projects go deeper: cloud_resume_infra provisions 20 AWS resources with Terraform and runs a live serverless visitor counter at resume.achille.tech; k8s-platform-lab runs a self-hosted k3s cluster on EC2 with ArgoCD GitOps, Prometheus, and Grafana; devops_platform combines Terraform, Ansible, Jenkins, and Docker Compose into a full delivery platform with SSM access and no open SSH port. Alongside that I ship full-stack applications — a MERN marketplace with Stripe and AI chat, a dual-site medical imaging system, and this portfolio — closing the loop between the platform and the applications running on top of it.",
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
      title: 'Independent Platform Engineering',
      period: '2025 – 2026',
      detail:
        'Built three production-grade infrastructure projects independently: cloud_resume_infra (20 AWS resources via Terraform, live at resume.achille.tech), k8s-platform-lab (self-hosted k3s cluster on EC2 with ArgoCD GitOps and Prometheus/Grafana), and devops_platform (Terraform + Ansible + Jenkins + Docker Compose, SSM access, no open SSH).',
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
        'Per Scholas Software Engineer / AI-Native track — intensive program in full-stack and AI-integrated development covering React, TypeScript, Node.js, and cloud-native patterns.',
    },
  ],
  links: {
    email: 'mailto:t.achille.tech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/achille-traore',
    github: 'https://github.com/traliach',
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
    title: 'achille.tech — Developer Portfolio',
    timeframe: '2025 – 2026',
    role: 'Full-Stack Developer & DevOps',
    featured: true,
    summary:
      'Production-grade portfolio platform built end-to-end: React 19 SPA, Express API, MongoDB Atlas, Terraform-provisioned infrastructure, and a GitHub Actions CI/CD pipeline deploying to Render and Vercel.',
    challenge:
      'Design a portfolio that demonstrates full-stack and DevOps competency as a single live system — not just screenshots, but a real deployment with quality gates, observability, and infrastructure as code.',
    solution:
      'React 19 + TypeScript frontend on Vercel, Node.js/Express API on Render, MongoDB Atlas provisioned with Terraform. Four-job GitHub Actions pipeline (server build, client lint/build, security audit, deploy) gates every push to main. Includes a print-optimized two-page PDF resume, dark mode with smooth CSS transitions, and a bilingual EN/FR toggle.',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Vite', 'Terraform', 'GitHub Actions', 'Render', 'Vercel'],
    metrics: [
      { label: 'CI jobs', value: '4 (build · lint · audit · deploy)' },
      { label: 'Infra', value: 'Terraform + MongoDB Atlas' },
      { label: 'Hosting', value: 'Render + Vercel' },
    ],
    outcomes: [
      'Parallel CI/CD pipeline gates deployment on server build, client build, and security audit.',
      'Terraform provisions MongoDB Atlas cluster; one command stands up or tears down the full stack.',
      'PDF resume rendered from live data — two-page print layout with navy sidebar and EN/FR toggle.',
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
  {
    title: 'cloud_resume_infra — AWS Resume Platform',
    timeframe: '2025',
    role: 'DevOps Engineer',
    featured: true,
    summary:
      'Production-grade static resume site on AWS — S3, CloudFront, Lambda visitor counter, DynamoDB, API Gateway, ACM — all 20 resources provisioned with Terraform and deployed via GitHub Actions CI/CD.',
    challenge:
      'Build a fully automated cloud resume platform with zero manual console steps — every AWS resource defined as code, a live serverless visitor counter, and a CI/CD pipeline that validates and deploys on every push.',
    solution:
      'Provisioned 20 AWS resources with Terraform (S3, CloudFront, ACM, Lambda, DynamoDB, API Gateway, IAM). Python Lambda handles atomic visitor count increments with unit tests. GitHub Actions runs Terraform, Lambda tests, and frontend build in parallel on every PR — deploys on merge to main.',
    stack: ['Terraform', 'AWS', 'S3', 'CloudFront', 'Lambda', 'DynamoDB', 'API Gateway', 'ACM', 'Python', 'GitHub Actions'],
    metrics: [
      { label: 'AWS Resources', value: '20' },
      { label: 'Lambda Tests', value: '4 passing' },
      { label: 'Actual Cost', value: '$0.00 / month' },
    ],
    outcomes: [
      'Live at resume.achille.tech — HTTPS via CloudFront + ACM, S3 fully private behind OAC.',
      'Atomic Lambda visitor counter with least-privilege IAM and CORS scoped to origin.',
      'Three CloudWatch alarms monitor Lambda error rate, p95 duration, and throttles.',
    ],
  },
  {
    title: 'k8s-platform-lab — Self-Hosted Kubernetes Platform',
    timeframe: '2025 – 2026',
    role: 'DevOps Engineer',
    featured: true,
    summary:
      'Self-hosted Kubernetes platform on AWS EC2 — k3s cluster, ArgoCD GitOps App-of-Apps, Prometheus + Grafana observability, Node.js sample app with HPA, all provisioned with Terraform.',
    challenge:
      'Build a production-representative Kubernetes platform from scratch on a single EC2 instance — GitOps delivery, Helm-managed releases, live observability, and a real deployed application — without a managed cloud cluster.',
    solution:
      'Terraform provisions an EC2 t3.medium with VPC and firewall. k3s runs the cluster. ArgoCD App-of-Apps pattern auto-syncs all workloads on every push to main. kube-prometheus-stack delivers Prometheus and Grafana. Node.js sample app exposes /health and /metrics with HPA and Traefik ingress.',
    stack: ['Kubernetes', 'k3s', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'Terraform', 'AWS EC2', 'GitHub Actions', 'Docker', 'Node.js'],
    metrics: [
      { label: 'GitOps', value: 'ArgoCD App-of-Apps' },
      { label: 'Platform checks', value: '21 / 21 passing' },
      { label: 'Observability', value: 'Prometheus + Grafana' },
    ],
    outcomes: [
      'Push to main auto-syncs all workloads to the cluster via ArgoCD — no manual kubectl apply.',
      'Custom Grafana dashboard tracks live sample app metrics scraped by Prometheus.',
      'verify-cluster.sh runs 21 end-to-end platform health checks in a single command.',
    ],
  },
  {
    title: 'devops_platform — Self-Hosted DevOps Platform',
    timeframe: '2025 – 2026',
    role: 'DevOps Engineer',
    featured: true,
    summary:
      'End-to-end DevOps platform on AWS EC2 — Jenkins CI/CD, Prometheus, Grafana, and a React app deployed via Docker Compose, provisioned with Terraform, configured with Ansible, no SSH key required.',
    challenge:
      'Stand up a self-hosted DevOps platform covering the full delivery lifecycle — infrastructure provisioning, server configuration, CI/CD pipeline, containerized deployment, and live observability — in one cohesive system.',
    solution:
      'Terraform provisions EC2 with VPC, Elastic IP, and IAM for SSM access. Ansible configures Docker, swap, firewall, and deploy user. Docker Compose runs Jenkins, Prometheus, and Grafana. Jenkins pipeline builds the React app, pushes the image to GHCR, and redeploys on EC2 in ~60 seconds.',
    stack: ['Terraform', 'Ansible', 'Jenkins', 'Docker Compose', 'Prometheus', 'Grafana', 'AWS EC2', 'GitHub Actions', 'React', 'Nginx', 'GHCR'],
    metrics: [
      { label: 'Pipeline time', value: '~60 seconds' },
      { label: 'Access method', value: 'AWS SSM (no SSH)' },
      { label: 'Jenkins config', value: 'JCasC (fully as code)' },
    ],
    outcomes: [
      'Every push triggers a full build, GHCR push, and EC2 redeploy via Jenkins in ~60 seconds.',
      'Jenkins configured entirely as code with JCasC — no manual UI setup.',
      'EC2 access via AWS SSM Session Manager — no open port 22, no SSH key.',
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: 'Cloud and IaC',
    title: 'AWS, Terraform, and multi-cloud infrastructure',
    description:
      'Infrastructure as code and cloud delivery across AWS, Azure, and GCP — 50+ components automated with Terraform and Ansible.',
    items: ['AWS (S3, CloudFront, CodePipeline, API Gateway)', 'Terraform', 'CloudFormation', 'Ansible', 'Azure', 'GCP'],
  },
  {
    eyebrow: 'CI/CD and delivery',
    title: 'Release workflows that hold up in production',
    description:
      'Pipeline tooling used to reduce manual release steps and cut build/deploy time by ~30% in production.',
    items: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Docker Compose', 'JFrog', 'SonarQube', 'GHCR'],
  },
  {
    eyebrow: 'Containers and orchestration',
    title: 'Kubernetes, OpenShift, and Docker',
    description:
      'Container build and cluster operations sustaining ~99.9% uptime across 10+ Kubernetes and OpenShift environments.',
    items: ['Docker', 'Kubernetes', 'k3s', 'ArgoCD', 'Helm', 'OpenShift', 'Docker Compose'],
  },
  {
    eyebrow: 'Observability and operations',
    title: 'Prometheus, Grafana, and Kibana',
    description:
      'Monitoring and incident response tooling that improved detection time by ~25% and cut resolution time by ~35%.',
    items: ['Prometheus', 'Grafana', 'Kibana', 'CloudWatch', 'Linux'],
  },
  {
    eyebrow: 'Languages',
    title: 'TypeScript, JavaScript, Python, Ruby',
    description:
      'Primary languages used across full-stack applications, DevOps automation scripts, and infrastructure tooling.',
    items: ['TypeScript', 'JavaScript', 'Python', 'Ruby'],
  },
  {
    eyebrow: 'Backend and APIs',
    title: 'Node.js, Express, and REST API design',
    description:
      'Server-side application development with structured API design, authentication, and role-based access control.',
    items: ['Node.js', 'Express', 'REST APIs', 'JWT Authentication', 'Zod', 'Stripe'],
  },
  {
    eyebrow: 'Frontend',
    title: 'React and modern UI tooling',
    description:
      'Client-side development with component-based architecture, state management, and utility-first styling.',
    items: ['React', 'React Router', 'Redux Toolkit', 'Tailwind CSS', 'Vite'],
  },
  {
    eyebrow: 'Databases',
    title: 'MongoDB, PostgreSQL, and cloud-managed stores',
    description:
      'Data modeling, schema design, and query optimization across document and relational databases.',
    items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'DynamoDB', 'RDS / Aurora', 'Redshift'],
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

