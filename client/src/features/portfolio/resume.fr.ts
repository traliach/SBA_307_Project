// French resume content — review and adjust phrasing as needed.
import type { ProfileContent } from '../../types/site'

export const profileFr: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'Ingénieur DevOps & Développeur Full-Stack',
  location: 'Télétravail / Hybride / Sur site (États-Unis)',
  availability:
    'Ouvert aux postes en ingénierie DevOps, infrastructure cloud et développement full-stack.',
  summary:
    "Ingénieur plateforme avec une solide expérience DevOps dans la création d'automatisations, de pipelines de livraison et de plateformes cloud évolutives. Améliorations mesurables de la vitesse de déploiement, de la fiabilité et de la productivité des équipes d'ingénierie sur AWS, Azure et GCP.",
  intro:
    "En expansion vers la livraison full-stack — applications React/TypeScript et APIs Node.js/Express — en apportant la même rigueur opérationnelle au code applicatif.",
  about: '',
  certifications: [
    'AWS Certified DevOps Engineer – Professional',
    'AWS Certified Cloud Practitioner',
    'Google IT Support Professional Certificate',
  ],
  strengths: [
    'Conception et optimisation de pipelines CI/CD (Jenkins, Azure DevOps, GitHub Actions)',
    "Infrastructure as code à grande échelle — 50+ composants automatisés avec Terraform et Ansible",
    'Opérations Kubernetes et OpenShift sur 10+ clusters en production',
    'Observabilité et gestion des incidents (Prometheus, Grafana, Kibana)',
    'Livraison full-stack : React, TypeScript, Node.js, Express, MongoDB, PostgreSQL',
  ],
  timeline: [
    {
      title: 'Ingénieur DevOps, Dominion Systems',
      period: 'Août 2018 – Présent',
      detail:
        "Amélioration des pipelines CI/CD (Jenkins, Azure DevOps), réduction du temps de build/déploiement de ~30% et maintien d'une disponibilité ~99,9% sur 10+ clusters Kubernetes/OpenShift. Automatisation de 50+ composants d'infrastructure avec Terraform et Ansible.",
    },
    {
      title: 'Ingénieur Cloud AWS, Dominion Systems',
      period: 'Juin 2017 – Juillet 2018',
      detail:
        "Opérations d'infrastructure AWS — CloudFormation, CodePipeline, API Gateway, RDS, DynamoDB, Aurora, Transit Gateway et connectivité hybride.",
    },
    {
      title: 'Développement Full-Stack & IA',
      period: '2025 – Présent',
      detail:
        "Parcours Software Engineer / AI-Native chez Per Scholas — programme intensif couvrant le développement full-stack et l'intégration IA : React, TypeScript, Node.js et patterns cloud-native.",
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
  { eyebrow: 'Langages', items: ['TypeScript', 'JavaScript', 'Python', 'Ruby'] },
  { eyebrow: 'Frontend', items: ['React', 'React Router', 'Redux Toolkit', 'Tailwind CSS', 'Vite'] },
  { eyebrow: 'Backend et API', items: ['Node.js', 'Express', 'API REST', 'Auth JWT', 'Zod', 'Stripe'] },
  { eyebrow: 'Bases de données', items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'DynamoDB', 'RDS / Aurora', 'Redshift'] },
  { eyebrow: 'CI/CD et livraison', items: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Docker Compose', 'JFrog', 'SonarQube'] },
  { eyebrow: 'Cloud et IaC', items: ['AWS (S3, CloudFront, CodePipeline, API Gateway)', 'Terraform', 'CloudFormation', 'Ansible', 'Azure', 'GCP'] },
  { eyebrow: 'Conteneurs et orchestration', items: ['Docker', 'Kubernetes', 'OpenShift', 'Docker Compose'] },
  { eyebrow: 'Observabilité et opérations', items: ['Prometheus', 'Grafana', 'Kibana', 'CloudWatch', 'Linux'] },
]

export const projectsFr = [
  {
    title: 'Restaurant Deals — Marketplace MERN',
    role: 'Développeur Full-Stack',
    timeframe: '2026',
    stack: ['MongoDB', 'Express', 'React 19', 'Node.js', 'TypeScript', 'Redux Toolkit', 'Stripe', 'Groq API', 'Tailwind CSS v4'],
    outcomes: [
      "Workflow de validation des offres côté serveur avec file d'approbation admin et portail propriétaire.",
      "Widget IA convertissant des requêtes en langage naturel en filtres d'offres en temps réel.",
      'Panier avec persistance localStorage, historique de commandes et paiement Stripe.',
    ],
    featured: true,
  },
  {
    title: 'achille.tech — Portfolio Développeur',
    role: 'Développeur Full-Stack & DevOps',
    timeframe: '2025 – 2026',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Terraform', 'GitHub Actions', 'Render', 'Vercel'],
    outcomes: [
      "Pipeline CI/CD parallèle (4 jobs) bloquant le déploiement sur le build serveur, le build client et l'audit de sécurité.",
      "Infrastructure provisionnée avec Terraform — un seul commande pour déployer ou supprimer l'ensemble de la stack.",
      "CV PDF généré depuis les données live — mise en page 2 pages avec sidebar navy et bascule EN/FR.",
    ],
    featured: true,
  },
  {
    title: 'Global PACS — Imagerie Médicale Hybride',
    role: 'Ingénieur principal',
    timeframe: 'Juil – Nov 2025',
    stack: ['Docker Compose', 'Orthanc PACS', 'PostgreSQL', 'S3 / Wasabi', 'Python'],
    outcomes: [
      'Système PACS dual-site opérationnel avec stockage objet S3 partagé.',
      "Scripts Python réduisant les étapes de configuration et garantissant une initialisation cohérente.",
      'Runbooks documentant chaque mode de panne pour une remédiation reproductible.',
    ],
    featured: true,
  },
]
