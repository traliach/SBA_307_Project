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
]
