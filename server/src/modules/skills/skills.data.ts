import type { SkillGroup } from '../../types/content.js'

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: 'Cloud platforms',
    title: 'AWS, Azure, GCP, and FinOps',
    description:
      'Cloud infrastructure across AWS, Azure, and GCP with multi-cloud, hybrid architecture, and cost optimization practices.',
    items: ['AWS EC2', 'S3', 'RDS', 'EKS', 'Lambda', 'VPC', 'IAM', 'CloudWatch', 'Azure VM', 'AKS', 'App Services', 'VNet', 'Key Vault', 'GCP Compute Engine', 'GKE', 'Cloud Storage', 'FinOps'],
  },
  {
    eyebrow: 'CI/CD and delivery',
    title: 'Pipeline automation and release strategies',
    description:
      'Pipeline tooling and release practices covering continuous integration, delivery, artifact management, and progressive rollout patterns.',
    items: ['Jenkins', 'GitHub Actions', 'GitLab CI/CD', 'Azure DevOps Pipelines', 'Pipeline design', 'Pipeline automation', 'Blue-green deployments', 'Canary releases', 'Continuous delivery', 'JFrog', 'SonarQube', 'GHCR'],
  },
  {
    eyebrow: 'Containers and orchestration',
    title: 'Kubernetes, Helm, GitOps, and service mesh',
    description:
      'Container build, cluster operations, and GitOps delivery workflows across managed and self-hosted Kubernetes environments.',
    items: ['Docker', 'Kubernetes', 'EKS', 'AKS', 'GKE', 'k3s', 'Helm', 'Kustomize', 'ArgoCD', 'FluxCD', 'OpenShift', 'Istio', 'Linkerd', 'Container lifecycle management'],
  },
  {
    eyebrow: 'Infrastructure as Code',
    title: 'Terraform modules, state, and configuration automation',
    description:
      'Repeatable infrastructure provisioning, configuration management, and automation scripting across cloud environments.',
    items: ['Terraform modules', 'Remote state', 'Workspaces', 'CloudFormation', 'Pulumi', 'ARM Templates', 'Ansible', 'Python automation', 'Bash scripting', 'Configuration drift management'],
  },
  {
    eyebrow: 'Observability and operations',
    title: 'Metrics, logs, tracing, and incident visibility',
    description:
      'Monitoring, alerting, and log management tooling enabling proactive incident detection and performance visibility.',
    items: ['Prometheus', 'Grafana', 'ELK Stack', 'Elasticsearch', 'Logstash', 'Kibana', 'OpenTelemetry', 'Splunk', 'Datadog', 'New Relic', 'CloudWatch', 'Metrics and alerting', 'Log management'],
  },
  {
    eyebrow: 'DevSecOps and security',
    title: 'Pipeline security, secrets, and compliance support',
    description:
      'Vulnerability scanning, secrets management, and compliance practices integrated into CI/CD workflows and cloud environments.',
    items: ['SAST', 'DAST', 'SCA', 'Trivy', 'Aqua', 'HashiCorp Vault', 'AWS Secrets Manager', 'IAM', 'RBAC', 'Vulnerability management', 'SOC 2', 'ISO 27001'],
  },
  {
    eyebrow: 'Cloud-native architecture',
    title: 'Microservices, serverless, and distributed systems',
    description:
      'Architecture practices for cloud-native systems, APIs, event-driven workloads, and reliable platform operations.',
    items: ['Microservices', 'Serverless computing', 'Event-driven architecture', 'API Gateway', 'Distributed systems', 'Hybrid cloud architecture', 'Multi-cloud strategy', 'Linux', 'Networking'],
  },
  {
    eyebrow: 'Languages',
    title: 'Python, Bash, TypeScript, and JavaScript',
    description:
      'Primary languages used across full-stack applications, DevOps automation scripts, and infrastructure tooling.',
    items: ['Python', 'Bash', 'TypeScript', 'JavaScript'],
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
