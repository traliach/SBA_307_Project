import type { ProjectSummary } from '../../types/content.js'

export const projects: ProjectSummary[] = [
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
      'Provisioned 20 AWS resources with Terraform (S3, CloudFront, ACM, Lambda, DynamoDB, API Gateway, IAM). Python Lambda handles atomic visitor count increments with mocked unit tests. GitHub Actions runs Terraform, Lambda tests, and frontend build in parallel on every PR — deploys on merge to main.',
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
      '~30-minute RTO validated live: dr-timer.sh automates full rebuild from terraform apply through 21/21 checks — tested after a real terraform destroy.',
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
      'Stand up a self-hosted DevOps platform that covers the full delivery lifecycle — infrastructure provisioning, server configuration, CI/CD pipeline, containerized deployment, and live observability — in one cohesive system.',
    solution:
      'Terraform provisions EC2 with VPC, Elastic IP, and IAM for SSM access. Ansible configures Docker, swap, firewall, and deploy user. Docker Compose runs Jenkins, Prometheus, and Grafana. Jenkins pipeline builds the Manga Hub React app, pushes the image to GHCR, and redeploys the container on EC2 — all in ~60 seconds.',
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
