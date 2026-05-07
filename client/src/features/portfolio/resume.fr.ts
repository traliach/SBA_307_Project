// French resume content — review and adjust phrasing as needed.
import type { ProfileContent } from '../../types/site'

export const profileFr: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'Ingénieur DevOps et Développeur Full Stack',
  location: 'Newark, NJ',
  currentEmployer: 'Teledyne Technologies Inc',
  previousEmployer: 'Creative Newtech Ltd',
  education: 'BS Software Engineering (en cours), Arizona State University',
  availability:
    "Ouvert aux postes DevOps, à l'ingénierie plateforme et aux collaborations freelance cloud ou full stack.",
  summary:
    "Ingénieur DevOps et développeur full stack basé à Newark, NJ, avec plus de 5 ans d'expérience dans l'infrastructure cloud, les pipelines CI/CD, Kubernetes et les applications React/Node en production.",
  intro:
    "J'aide les équipes à rendre les livraisons plus calmes : infrastructure AWS avec Terraform, pipelines GitHub Actions et Jenkins, plateformes Kubernetes, observabilité, et applications full stack avec React, TypeScript, Node.js et MongoDB.",
  about:
    "Je travaille sur les systèmes dont les équipes dépendent pour des livraisons fiables : pipelines CI/CD, infrastructure AWS, déploiements Kubernetes, observabilité et support applicatif. Chez Teledyne Technologies Inc, je contribue à la livraison DevOps autour d'AWS, Kubernetes, Terraform, GitHub Actions, Jenkins, l'observabilité et les workflows de déploiement sécurisés. Avant cela, j'ai travaillé comme AWS Cloud Engineer chez Creative Newtech Ltd, en automatisant l'infrastructure et les opérations cloud AWS.",
  certifications: [
    'AWS Certified DevOps Engineer – Professional',
    'AWS Certified Cloud Practitioner',
    'IBM Software Engineering Essentials',
    'Google IT Support Professional Certificate',
  ],
  strengths: [
    'Conception et optimisation de pipelines CI/CD (Jenkins, Azure DevOps, GitHub Actions)',
    "Infrastructure as Code à grande échelle, avec plus de 50 composants automatisés via Terraform et Ansible",
    'Exploitation de Kubernetes et OpenShift sur plus de 10 clusters en production',
    'Observabilité et gestion des incidents (Prometheus, Grafana, Kibana)',
    'Développement full stack : React, TypeScript, Node.js, Express, MongoDB, PostgreSQL',
  ],
  timeline: [
    {
      title: 'Ingénieur DevOps, Teledyne Technologies Inc',
      period: 'Sept 2024 - Présent',
      detail:
        "Livraison DevOps cloud-native autour d'AWS, Kubernetes, Terraform, CI/CD, observabilité et workflows de déploiement sécurisés à Newark, NJ.",
    },
    {
      title: 'Ingénieur Cloud AWS, Creative Newtech Ltd',
      period: 'Juin 2020 - Août 2024',
      detail:
        "Conception et exploitation d'infrastructures AWS avec EC2, S3, RDS, VPC, IAM, CloudWatch, Terraform, Jenkins, GitLab CI/CD, Docker et Kubernetes.",
    },
    {
      title: 'Software Engineering, Arizona State University',
      period: 'En cours',
      detail:
        "BS Software Engineering en cours, avec application directe aux projets cloud, DevOps et full stack.",
    },
  ],
  links: {
    email: 'mailto:t.achille.tech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/achille-traore',
    github: 'https://github.com/traliach',
    resume: '/resume',
  },
}

export const skillsFr = [
  { eyebrow: 'Cloud', items: ['AWS EC2', 'S3', 'RDS', 'EKS', 'Lambda', 'VPC', 'IAM', 'CloudWatch', 'Azure VM', 'AKS', 'App Services', 'VNet', 'Key Vault', 'GCP Compute Engine', 'GKE', 'Cloud Storage', 'FinOps'] },
  { eyebrow: 'CI/CD', items: ['Jenkins', 'GitHub Actions', 'GitLab CI/CD', 'Azure DevOps Pipelines', 'Blue-green deployments', 'Canary releases', 'JFrog', 'SonarQube', 'GHCR'] },
  { eyebrow: 'Kubernetes', items: ['Docker', 'Kubernetes', 'EKS', 'AKS', 'GKE', 'k3s', 'Helm', 'Kustomize', 'ArgoCD', 'FluxCD', 'OpenShift', 'Istio', 'Linkerd'] },
  { eyebrow: 'IaC et automatisation', items: ['Terraform modules', 'Remote state', 'Workspaces', 'CloudFormation', 'Pulumi', 'ARM Templates', 'Ansible', 'Python', 'Bash'] },
  { eyebrow: 'Observabilité', items: ['Prometheus', 'Grafana', 'ELK Stack', 'OpenTelemetry', 'Splunk', 'Datadog', 'New Relic', 'CloudWatch', 'Linux'] },
  { eyebrow: 'DevSecOps', items: ['SAST', 'DAST', 'SCA', 'Trivy', 'Aqua', 'HashiCorp Vault', 'AWS Secrets Manager', 'IAM', 'RBAC', 'SOC 2', 'ISO 27001'] },
  { eyebrow: 'Architecture cloud-native', items: ['Microservices', 'Serverless', 'Event-driven architecture', 'API Gateway', 'Distributed systems', 'Hybrid cloud', 'Multi-cloud', 'Networking'] },
  { eyebrow: 'Langages', items: ['Python', 'Bash', 'TypeScript', 'JavaScript'] },
  { eyebrow: 'Backend et API', items: ['Node.js', 'Express', 'API REST', 'Authentification JWT', 'Zod', 'Stripe'] },
  { eyebrow: 'Frontend', items: ['React', 'React Router', 'Redux Toolkit', 'Tailwind CSS', 'Vite'] },
  { eyebrow: 'Bases de données', items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'DynamoDB', 'RDS / Aurora', 'Redshift'] },
]

export const projectsFr = [
  {
    // Title must match the EN lookup key used in ResumePage.tsx
    title: 'k8s-platform-lab — Self-Hosted Kubernetes Platform',
    role: 'Ingénieur DevOps',
    timeframe: '2025 – 2026',
    stack: ['Kubernetes', 'k3s', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'Terraform', 'AWS EC2', 'GitHub Actions', 'Docker', 'Node.js'],
    outcomes: [
      '21/21 contrôles de santé automatisés via verify-cluster.sh — cluster k3s avec 5 applications ArgoCD Synced + Healthy, politiques réseau sur 3 namespaces, PDB enforcing minAvailable: 1.',
      'RTO ~30 minutes validé en conditions réelles : dr-timer.sh automatise la reconstruction complète depuis terraform apply jusqu\'aux 21/21 contrôles — testé le 2026-04-13 après un vrai terraform destroy.',
      'Pipeline CI (helm lint + kubectl dry-run + terraform validate) vert sur chaque PR ; 6 ADR ; v1.0.0 publié avec image Docker poussée sur GHCR.',
    ],
    featured: true,
  },
  {
    title: 'cloud_resume_infra — AWS Resume Platform',
    role: 'Ingénieur DevOps',
    timeframe: '2025',
    stack: ['Terraform', 'AWS', 'S3', 'CloudFront', 'Lambda', 'DynamoDB', 'API Gateway', 'ACM', 'Python', 'GitHub Actions'],
    outcomes: [
      '20 ressources AWS provisionnées par Terraform sans aucun clic console ; rôle IAM Lambda limité à GetItem + UpdateItem sur un seul ARN de table ; 4/4 tests unitaires réussis ; en ligne sur resume.achille.tech.',
      '0,00 $ de coût mensuel réel vérifié via AWS Cost Explorer — tous les services dans la tranche gratuite.',
      '3 alarmes CloudWatch actives : taux d\'erreur via metric math, durée p95 > 3s et limitations — avec abonnement SNS email confirmé.',
    ],
    featured: true,
  },
  {
    title: 'devops_platform — Self-Hosted DevOps Platform',
    role: 'Ingénieur DevOps',
    timeframe: '2025 – 2026',
    stack: ['Terraform', 'Ansible', 'Jenkins', 'Docker Compose', 'Prometheus', 'Grafana', 'AWS EC2', 'GitHub Actions', 'React', 'Nginx', 'GHCR'],
    outcomes: [
      'Pipeline CI/CD end-to-end en ~46 secondes (Checkout → Build → Docker Build → Push GHCR → Deploy) — 4 règles d\'alerte Prometheus vérifiées en action, dont une alerte JenkinsDown déclenchée en direct.',
      '0 secret commis dans git : Ansible Vault AES256 chiffre tous les identifiants ; Ansible écrit un .env root:root 600 au moment du déploiement.',
      'Plateforme entière reproductible depuis un seul make deploy sur une instance EC2 fraîchement provisionnée — Jenkins via JCasC, dashboards Grafana en tant que code, zéro configuration manuelle.',
    ],
    featured: true,
  },
  {
    title: 'Restaurant Deals — MERN Marketplace',
    role: 'Développeur Full Stack',
    timeframe: '2026',
    stack: ['MongoDB', 'Express', 'React 19', 'Node.js', 'TypeScript', 'Redux Toolkit', 'Stripe', 'Groq API', 'Tailwind CSS v4'],
    outcomes: [
      'Workflow de validation des offres côté serveur avec file d\'approbation administrateur et portail propriétaire.',
      'Widget IA convertissant des requêtes en langage naturel en filtres d\'offres en temps réel.',
      'Panier avec persistance via localStorage, historique des commandes et paiement Stripe.',
    ],
    featured: true,
  },
]
