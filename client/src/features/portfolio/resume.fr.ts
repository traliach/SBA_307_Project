// French resume content — review and adjust phrasing as needed.
import type { ProfileContent } from '../../types/site'

export const profileFr: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'Ingénieur DevOps et Développeur Full Stack',
  location: 'Télétravail / Hybride / Sur site (États-Unis)',
  availability:
    "Ouvert aux postes en ingénierie DevOps, infrastructure cloud et développement full stack.",
  summary:
    "Ingénieur plateforme avec une solide expérience DevOps dans la conception d'automatisations, de pipelines de livraison et de plateformes cloud évolutives. A généré des gains mesurables en vitesse de déploiement, en fiabilité et en productivité pour des équipes d'ingénierie sur AWS, Azure et GCP.",
  intro:
    "Élargit aujourd'hui son périmètre au développement full stack, avec des applications React/TypeScript et des API Node.js/Express, en appliquant la même rigueur opérationnelle au code applicatif.",
  about: '',
  certifications: [
    'AWS Certified DevOps Engineer - Professional',
    'AWS Certified Cloud Practitioner',
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
      period: 'Août 2018 - Présent',
      detail:
        "Optimisation des pipelines CI/CD (Jenkins, Azure DevOps), avec une réduction d'environ 30 % du temps de build et de déploiement, tout en maintenant une disponibilité d'environ 99,9 % sur plus de 10 clusters Kubernetes/OpenShift. Automatisation de plus de 50 composants d'infrastructure avec Terraform et Ansible.",
    },
    {
      title: 'Ingénieur Cloud AWS, Dominion Systems',
      period: 'Juin 2017 - Juillet 2018',
      detail:
        "Exploitation d'infrastructures AWS avec CloudFormation, CodePipeline, API Gateway, RDS, DynamoDB, Aurora, Transit Gateway et connectivité hybride.",
    },
    {
      title: 'Développement Full Stack et IA',
      period: '2025 - Présent',
      detail:
        "Formation intensive Software Engineer / AI-Native chez Per Scholas, axée sur le développement full stack et l'intégration de l'IA : React, TypeScript, Node.js et architectures cloud native.",
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
  { eyebrow: 'Backend et API', items: ['Node.js', 'Express', 'API REST', 'Authentification JWT', 'Zod', 'Stripe'] },
  { eyebrow: 'Bases de données', items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'DynamoDB', 'RDS / Aurora', 'Redshift'] },
  { eyebrow: 'CI/CD et livraison', items: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Docker Compose', 'JFrog', 'SonarQube'] },
  { eyebrow: 'Cloud et IaC', items: ['AWS (S3, CloudFront, CodePipeline, API Gateway)', 'Terraform', 'CloudFormation', 'Ansible', 'Azure', 'GCP'] },
  { eyebrow: 'Conteneurs et orchestration', items: ['Docker', 'Kubernetes', 'OpenShift', 'Docker Compose'] },
  { eyebrow: 'Observabilité et opérations', items: ['Prometheus', 'Grafana', 'Kibana', 'CloudWatch', 'Linux'] },
]

export const projectsFr = [
  {
    title: 'Restaurant Deals, marketplace MERN',
    role: 'Développeur Full Stack',
    timeframe: '2026',
    stack: ['MongoDB', 'Express', 'React 19', 'Node.js', 'TypeScript', 'Redux Toolkit', 'Stripe', 'Groq API', 'Tailwind CSS v4'],
    outcomes: [
      "Workflow de validation des offres côté serveur, avec file d'approbation administrateur et portail propriétaire.",
      "Widget IA convertissant des requêtes en langage naturel en filtres d'offres en temps réel.",
      'Panier avec persistance via localStorage, historique des commandes et paiement Stripe.',
    ],
    featured: true,
  },
  {
    title: 'achille.tech, portfolio développeur',
    role: 'Développeur Full Stack et DevOps',
    timeframe: '2025 - 2026',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Terraform', 'GitHub Actions', 'Render', 'Vercel'],
    outcomes: [
      "Pipeline CI/CD parallèle (4 jobs) bloquant le déploiement en cas d'échec du build serveur, du build client ou de l'audit de sécurité.",
      "Infrastructure provisionnée avec Terraform, avec une seule commande pour déployer ou supprimer l'ensemble de la stack.",
      'CV PDF généré à partir des données en direct, avec mise en page sur 2 pages, barre latérale bleu marine et bascule EN/FR.',
    ],
    featured: true,
  },
  {
    title: 'Global PACS, imagerie médicale hybride',
    role: 'Ingénieur principal',
    timeframe: 'Juil. - Nov. 2025',
    stack: ['Docker Compose', 'Orthanc PACS', 'PostgreSQL', 'S3 / Wasabi', 'Python'],
    outcomes: [
      'Mise en place d’un système PACS bi-site opérationnel avec stockage objet S3 partagé.',
      "Scripts Python réduisant les étapes de configuration et garantissant une initialisation cohérente.",
      'Runbooks documentant chaque mode de panne pour une remédiation reproductible.',
    ],
    featured: true,
  },
]
