// French resume content — review and adjust phrasing as needed.
import type { ProfileContent } from '../../types/site'

export const profileFr: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'Ingénieur DevOps et Développeur Full Stack',
  location: 'Télétravail / Hybride / Sur site (États-Unis)',
  availability:
    "Ouvert aux postes en ingénierie DevOps, infrastructure cloud et développement full stack.",
  summary:
    "Ingénieur plateforme et DevOps avec plus de 8 ans d'expérience dans la conception de pipelines CI/CD, d'infrastructures cloud et de plateformes Kubernetes — avec une composante full stack en production (React/TypeScript, Node.js/Express).",
  intro:
    "Mon portfolio couvre les deux disciplines : projets cloud et IaC (infrastructure AWS provisionnée avec Terraform, Kubernetes auto-hébergé sur EC2, plateformes Jenkins + Ansible) et applications full stack (marketplace MERN, système d'imagerie médicale, ce site).",
  about:
    "Je travaille sur les parties de l'infrastructure que les équipes remarquent le plus quand elles tombent en panne : pipelines CI/CD, environnements cloud, handoffs de livraison et support en production. Huit ans chez Dominion Systems m'ont permis de couvrir Jenkins, Azure DevOps, Terraform, Kubernetes, OpenShift et les outils d'observabilité (Prometheus, Grafana, Kibana), ainsi que des opérations AWS et base de données en conditions réelles. Mes projets récents vont plus loin : cloud_resume_infra provisionne 20 ressources AWS avec Terraform et expose un compteur serverless en production sur resume.achille.tech ; k8s-platform-lab fait tourner un cluster k3s sur EC2 avec ArgoCD GitOps, Prometheus et Grafana, 21/21 contrôles de santé validés ; devops_platform combine Terraform, Ansible, Jenkins et Docker Compose avec accès SSM sans clé SSH. En parallèle, je livre des applications full stack — une marketplace MERN avec Stripe et IA, un système d'imagerie médicale dual-site, et ce portfolio.",
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
      title: 'Ingénieur DevOps, Dominion Systems',
      period: 'Août 2018 – Présent',
      detail:
        "Résolution de pipelines Jenkins défaillants, réduction des dépenses cloud de 500 à 2 000 $/mois via des audits Cost Explorer, élimination des risques de déplacement latéral en consolidant les rôles IAM selon le principe du moindre privilège, réduction du provisionnement d'un nouvel environnement client de ~30 minutes à moins de 5 minutes avec Terraform + Ansible + Bash, et résolution d'incidents CrashLoopBackOff via kubectl sur 10+ clusters Kubernetes/OpenShift.",
    },
    {
      title: 'Ingénierie plateforme indépendante',
      period: '2025 – 2026',
      detail:
        "Trois projets d'infrastructure de niveau production : cloud_resume_infra (20 ressources AWS via Terraform, 0,00 $/mois, en ligne sur resume.achille.tech), k8s-platform-lab (k3s sur EC2 avec ArgoCD GitOps, 21/21 contrôles de santé, RTO ~30 min validé), et devops_platform (pipeline Jenkins ~46 secondes, JCasC, Ansible Vault, accès SSM sans port SSH ouvert).",
    },
    {
      title: 'Ingénieur Cloud AWS, Dominion Systems',
      period: 'Juin 2017 – Juillet 2018',
      detail:
        "Amélioration de l'efficacité de livraison d'infrastructure de ~25 % en migrant vers CloudFormation, CodePipeline, CodeBuild et CodeCommit. Augmentation du taux d'utilisation EC2 de ~20 % grâce au dimensionnement adaptatif et à l'auto-scaling. Taux de réussite de 100 % aux audits de sécurité avec IAM au moindre privilège et réseau hybride via Transit Gateway.",
    },
    {
      title: 'Développement Full Stack et IA',
      period: '2025 – Présent',
      detail:
        "Formation AI-Native Software Engineering chez Per Scholas — livraison d'applications MERN full stack : une marketplace à 3 rôles (Stripe, Groq IA, RBAC) et cette plateforme portfolio (React 19, Node.js, MongoDB Atlas, Terraform, pipeline CI/CD en 4 jobs).",
    },
  ],
  links: {
    email: 'mailto:t.achille.tech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/achille-traore',
    github: 'https://github.com/traliach',
    resume: '/ali-achille-traore-resume.txt',
  },
}

export const skillsFr = [
  { eyebrow: 'Cloud et IaC', items: ['AWS', 'Terraform', 'CloudFormation', 'Ansible', 'Azure', 'GCP'] },
  { eyebrow: 'CI/CD et livraison', items: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Docker Compose', 'JFrog', 'SonarQube', 'GHCR'] },
  { eyebrow: 'Conteneurs et orchestration', items: ['Docker', 'Kubernetes', 'k3s', 'ArgoCD', 'Helm', 'OpenShift', 'Docker Compose'] },
  { eyebrow: 'Observabilité et opérations', items: ['Prometheus', 'Grafana', 'Kibana', 'CloudWatch', 'Linux'] },
  { eyebrow: 'Langages', items: ['TypeScript', 'JavaScript', 'Python', 'Ruby'] },
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
