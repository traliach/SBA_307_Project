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
  'IBM Software Engineering Essentials': 'https://www.credly.com/users/ali-achille-traore',
  'Google IT Support Professional Certificate': 'https://www.credly.com/badges/a4afd99a-9bd5-44af-a5bd-ebe2b5e1bbc4',
}

export const fallbackProfile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer & Full-Stack Software Engineer',
  location: 'Newark, NJ',
  currentEmployer: 'Teledyne Technologies Inc',
  availability: '',
  summary:
    'DevOps engineer with 5+ years designing, automating, and optimizing cloud-native infrastructure across AWS and Azure. Expertise in Kubernetes, Docker, Terraform, and CI/CD pipelines — plus full-stack delivery with React, TypeScript, and Node.js shipped to production.',
  intro:
    'My portfolio spans both disciplines: cloud and IaC projects (Terraform-provisioned AWS infrastructure, self-hosted Kubernetes on EC2, Jenkins + Ansible platforms) and full-stack applications (MERN marketplace, medical imaging system, this site).',
  about:
    "I work on the parts engineering teams notice most when they break: CI/CD pipelines, cloud infrastructure, and production deployments. My portfolio projects go deeper than most: cloud_resume_infra provisions 20 AWS resources with Terraform at $0.00/month actual cost; k8s-platform-lab runs a self-hosted k3s cluster on EC2 with ArgoCD GitOps, 21/21 health checks passing, and ~30-minute RTO validated live; devops_platform combines Terraform, Ansible, Jenkins, and Docker Compose into a full delivery platform with no open SSH port.",
  certifications: [
    'AWS Certified DevOps Engineer – Professional',
    'AWS Certified Cloud Practitioner',
    'IBM Software Engineering Essentials',
    'Google IT Support Professional Certificate',
  ],
  strengths: [
    'CI/CD pipeline design and optimization — GitHub Actions, Jenkins, GitLab CI/CD, and Azure DevOps',
    'Infrastructure as Code — Terraform modules, remote state, and multi-environment provisioning on AWS and Azure',
    'Kubernetes cluster operations — EKS, Helm, Kustomize, ArgoCD GitOps, and self-hosted k3s',
    'DevSecOps — security scanning (SAST/DAST, Trivy) and secrets management embedded in delivery pipelines',
    'Full-stack delivery — React, TypeScript, Node.js, Express, MongoDB, and PostgreSQL',
  ],
  timeline: [],
  links: {
    email: 'mailto:t.achille.tech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/achille-traore',
    github: 'https://github.com/traliach',
    resume: '/ali-achille-traore-resume.txt',
  },
}

export const highlightMetrics: Highlight[] = [
  {
    label: 'AWS resources',
    value: '20',
    detail: 'cloud_resume_infra provisions 20 AWS resources with Terraform — $0.00/month actual cost verified via Cost Explorer.',
  },
  {
    label: 'Platform checks',
    value: '21 / 21',
    detail: 'k8s-platform-lab automated health checks — k3s cluster with ArgoCD, Prometheus, and Grafana all passing.',
  },
  {
    label: 'Pipeline time',
    value: '~60 sec',
    detail: 'devops_platform end-to-end CI/CD: Checkout → Build → Docker → Push GHCR → Deploy in ~60 seconds.',
  },
  {
    label: 'Certifications',
    value: '4 active',
    detail: 'AWS DevOps Engineer Professional, AWS Cloud Practitioner, IBM Software Engineering Essentials, Google IT Support Professional.',
  },
]

export const projectSummaries: ProjectSummary[] = [
  {
    title: 'Enterprise Kubernetes Platform Modernization',
    timeframe: 'Sept 2024 – Present',
    role: 'DevOps Engineer',
    featured: true,
    summary:
      'Transformed manual deployment processes into a fully automated, cloud-native Kubernetes platform on AWS EKS — 50+ microservices, GitOps delivery with ArgoCD, CI/CD with GitHub Actions and Jenkins, and full observability with Prometheus, Grafana, and ELK.',
    challenge:
      'Legacy deployment processes were manual and inconsistent across dev, staging, and production environments — limiting release velocity, creating configuration drift, and leaving security vulnerabilities undetected until late in the lifecycle.',
    solution:
      'Deployed AWS EKS clusters across multiple availability zones with Terraform IaC. Implemented GitOps with ArgoCD, automated CI/CD with GitHub Actions and Jenkins, configured HPA for dynamic scaling, embedded Trivy and SAST/DAST scanning into pipelines, and delivered centralized observability with Prometheus, Grafana, and the ELK stack.',
    stack: ['AWS EKS', 'Kubernetes', 'Terraform', 'Docker', 'Helm', 'Kustomize', 'ArgoCD', 'GitHub Actions', 'Jenkins', 'Prometheus', 'Grafana', 'ELK Stack', 'Trivy', 'IAM / RBAC'],
    metrics: [
      { label: 'System uptime', value: '99.9%' },
      { label: 'Deployment time', value: '−40%' },
      { label: 'Infrastructure costs', value: '−25%' },
      { label: 'Config drift', value: '−45%' },
    ],
    outcomes: [
      '99.9% uptime achieved — EKS clusters across multiple AZs with HPA auto-scaling handling 50+ microservices.',
      'Deployment time cut by 40% — release cadence moved from weekly to daily through automated CI/CD and GitOps workflows.',
      'Infrastructure costs reduced by 25% via FinOps rightsizing; incident detection time improved by 35% through ELK centralized logging.',
    ],
    repoUrl: '',
    liveUrl: '',
  },
  {
    title: 'AWS Cloud Infrastructure Automation and Optimization',
    timeframe: 'June 2020 – Aug 2024',
    role: 'AWS Cloud Engineer',
    featured: true,
    summary:
      'Transformed manually managed AWS environments into fully automated, cost-optimized infrastructure using Terraform IaC — EC2, S3, RDS, VPC across multiple AZs — with Jenkins and GitLab CI/CD pipelines and CloudWatch/Prometheus/Grafana observability.',
    challenge:
      'Manual infrastructure provisioning caused inconsistent environments, high operational overhead, inflated cloud costs, and insufficient visibility into system performance and security posture.',
    solution:
      'Implemented Terraform modules with remote state management for repeatable multi-environment provisioning. Built CI/CD pipelines with Jenkins and GitLab CI/CD. Configured CloudWatch, Prometheus, and Grafana for observability. Applied IAM least-privilege policies and secrets management. Used FinOps rightsizing to eliminate over-provisioned resources.',
    stack: ['AWS EC2', 'AWS S3', 'AWS RDS', 'VPC', 'IAM', 'CloudWatch', 'ELB', 'Terraform', 'Jenkins', 'GitLab CI/CD', 'Docker', 'Prometheus', 'Grafana'],
    metrics: [
      { label: 'System uptime', value: '99.8%' },
      { label: 'Deployment time', value: '−50%' },
      { label: 'Cloud costs', value: '−20%' },
      { label: 'Manual config effort', value: '−70%' },
    ],
    outcomes: [
      'Deployment time reduced by 50% — Terraform automation and CI/CD pipelines eliminated over 70% of manual configuration steps.',
      '99.8% uptime maintained across production environments with multi-AZ architecture and load-balanced traffic distribution.',
      'Cloud infrastructure costs reduced by 20% through FinOps rightsizing; improved incident detection time with CloudWatch and Prometheus alerting.',
    ],
    repoUrl: '',
    liveUrl: '',
  },
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
    repoUrl: 'https://github.com/traliach/restaurant-deals-web',
    liveUrl: 'https://perscholascapstoneaat.netlify.app',
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
    repoUrl: '',
    liveUrl: '',
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
    repoUrl: 'https://github.com/traliach/achille.dev',
    liveUrl: 'https://achille.tech',
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
    repoUrl: '',
    liveUrl: '',
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
      '20 AWS resources provisioned by Terraform with zero console clicks; Lambda IAM role scoped to GetItem + UpdateItem on a single table ARN; 4/4 unit tests passing; live at resume.achille.tech.',
      '$0.00 actual monthly cost verified via AWS Cost Explorer — all services within free tier.',
      '3 CloudWatch alarms active: error rate via metric math, p95 duration > 3s, and throttles — with confirmed SNS email subscription.',
    ],
    repoUrl: 'https://github.com/traliach/cloud_resume_infra',
    liveUrl: 'https://resume.achille.tech',
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
      '21/21 automated health checks passing via verify-cluster.sh — k3s cluster with 5 ArgoCD-managed apps Synced + Healthy, network policies on 3 namespaces, PDB enforcing minAvailable: 1.',
      '~30-minute RTO validated live: dr-timer.sh automates full rebuild from terraform apply through 21/21 checks — tested on 2026-04-13 after a real terraform destroy.',
      'CI pipeline (helm lint + kubectl dry-run + terraform validate) green on every PR; 6 Architecture Decision Records; v1.0.0 released with Docker image pushed to GHCR.',
    ],
    repoUrl: 'https://github.com/traliach/k8s-platform-lab',
    liveUrl: '',
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
      '~46-second end-to-end CI/CD pipeline (Checkout → Build → Docker Build → Push GHCR → Deploy) — 4 Prometheus alerting rules verified firing including a live JenkinsDown alert.',
      '0 secrets committed to git: Ansible Vault AES256 encrypts all credentials; Ansible writes a root:root 600 .env at deploy time.',
      'Entire platform reproducible from a single make deploy on a fresh Terraform-provisioned EC2 instance — Jenkins via JCasC, Grafana dashboards from code, zero manual UI setup.',
    ],
    repoUrl: 'https://github.com/traliach/devops_platform',
    liveUrl: '',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: 'Cloud and IaC',
    title: 'AWS, Terraform, and multi-cloud infrastructure',
    description:
      'Infrastructure as code and cloud delivery across AWS, Azure, and GCP — provisioning, configuration management, and cost optimization.',
    items: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation', 'Pulumi', 'Ansible', 'FinOps'],
  },
  {
    eyebrow: 'CI/CD and delivery',
    title: 'Release workflows that hold up in production',
    description:
      'Pipeline tooling covering continuous integration, delivery, and artifact management across multiple platforms.',
    items: ['GitHub Actions', 'Jenkins', 'GitLab CI/CD', 'Azure DevOps', 'Docker Compose', 'JFrog', 'SonarQube'],
  },
  {
    eyebrow: 'Containers and orchestration',
    title: 'Kubernetes, Helm, and GitOps',
    description:
      'Container build, cluster operations, and GitOps delivery workflows across managed and self-hosted Kubernetes environments.',
    items: ['Docker', 'Kubernetes', 'k3s', 'Helm', 'Kustomize', 'ArgoCD', 'FluxCD', 'OpenShift'],
  },
  {
    eyebrow: 'DevSecOps and security',
    title: 'Security tooling embedded in delivery pipelines',
    description:
      'Vulnerability scanning, secrets management, and compliance practices integrated into CI/CD workflows and cloud environments.',
    items: ['Trivy', 'Aqua', 'SAST / DAST', 'HashiCorp Vault', 'AWS Secrets Manager', 'IAM and RBAC'],
  },
  {
    eyebrow: 'Observability and operations',
    title: 'Prometheus, Grafana, and ELK Stack',
    description:
      'Monitoring, alerting, and log management tooling enabling proactive incident detection and performance visibility.',
    items: ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch', 'OpenTelemetry', 'Datadog', 'New Relic'],
  },
  {
    eyebrow: 'Languages',
    title: 'TypeScript, Python, JavaScript, Bash',
    description:
      'Primary languages used across full-stack applications, infrastructure automation scripts, and DevOps tooling.',
    items: ['TypeScript', 'JavaScript', 'Python', 'Bash'],
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
  { value: 'devops-role', label: 'Platform engineering or DevOps consultation' },
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

