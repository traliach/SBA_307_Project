// Self-assessed proficiency levels (1 = Familiar → 5 = Expert).
// Adjust any entry to reflect your actual depth.
export const skillLevels: Record<string, number> = {
  // Languages
  TypeScript: 4,
  JavaScript: 4,
  Python: 3,
  Ruby: 2,

  // Frontend
  React: 4,
  'React Router': 3,
  'Redux Toolkit': 3,
  'Tailwind CSS': 4,
  Vite: 3,

  // Backend and APIs
  'Node.js': 4,
  Express: 4,
  'REST APIs': 4,
  'JWT Authentication': 3,
  Zod: 3,
  Stripe: 3,

  // Databases
  MongoDB: 4,
  Mongoose: 3,
  PostgreSQL: 3,
  DynamoDB: 3,
  'RDS / Aurora': 3,
  Redshift: 2,

  // CI/CD and delivery
  'GitHub Actions': 4,
  Jenkins: 5,
  'Azure DevOps': 5,
  'Docker Compose': 4,
  JFrog: 3,
  SonarQube: 3,

  // Cloud and IaC
  'AWS (S3, CloudFront, CodePipeline, API Gateway)': 5,
  Terraform: 5,
  CloudFormation: 4,
  Ansible: 4,
  Azure: 3,
  GCP: 2,

  // Containers and orchestration
  Docker: 5,
  Kubernetes: 5,
  OpenShift: 4,

  // Observability and operations
  Prometheus: 4,
  Grafana: 4,
  Kibana: 3,
  CloudWatch: 3,
  Linux: 5,
}

export const levelLabels: Record<number, string> = {
  1: 'Familiar',
  2: 'Working',
  3: 'Proficient',
  4: 'Advanced',
  5: 'Expert',
}
