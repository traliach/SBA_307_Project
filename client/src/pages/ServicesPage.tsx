import { useState } from 'react'
import {
  ButtonLink,
  FaqAccordion,
  PageIntro,
  SiteSection,
  SubNav,
  SurfaceCard,
  TrustChips,
} from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
} from '../components/site/styles'

type ServiceFilter = 'all' | 'platform' | 'delivery' | 'security' | 'cost' | 'reliability' | 'full-stack'

interface ServiceModule {
  id: string
  title: string
  filter: ServiceFilter
  problem: string
  outcomes: string[]
  deliverables: string[]
  tools: string[]
  bestFor: string
}

const serviceFilters: Array<{ label: string; value: ServiceFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Platform', value: 'platform' },
  { label: 'Delivery', value: 'delivery' },
  { label: 'Security', value: 'security' },
  { label: 'Cost', value: 'cost' },
  { label: 'Reliability', value: 'reliability' },
  { label: 'Full-stack', value: 'full-stack' },
]

const services: ServiceModule[] = [
  {
    id: 'devops-consulting',
    title: 'DevOps Consulting',
    filter: 'platform',
    problem: 'Delivery systems are slow, fragile, or unclear across environments.',
    outcomes: ['Release path documented', 'Operational risks prioritized', 'Short implementation plan'],
    deliverables: ['Current-state review', 'Risk register', 'Delivery roadmap'],
    tools: ['AWS', 'Terraform', 'GitHub Actions', 'Kubernetes'],
    bestFor: 'Teams that need a practical outside review before making platform changes.',
  },
  {
    id: 'ci-cd-modernization',
    title: 'CI/CD Modernization',
    filter: 'delivery',
    problem: 'Manual releases, missing checks, or inconsistent pipeline behavior slow teams down.',
    outcomes: ['Repeatable build path', 'Clear quality gates', 'Safer rollback workflow'],
    deliverables: ['Pipeline design', 'Workflow implementation', 'Runbook notes'],
    tools: ['GitHub Actions', 'Jenkins', 'GitLab CI/CD', 'npm audit'],
    bestFor: 'Teams with fragile release steps or inconsistent review gates.',
  },
  {
    id: 'terraform-iac',
    title: 'IaC with Terraform',
    filter: 'platform',
    problem: 'Cloud resources drift because environments are still managed by hand.',
    outcomes: ['Repeatable environments', 'Clear state boundaries', 'Reviewable infra changes'],
    deliverables: ['Terraform modules', 'Remote-state guidance', 'Environment workflow'],
    tools: ['Terraform', 'AWS', 'IAM', 'S3'],
    bestFor: 'Teams moving from manual console work to reviewed infrastructure changes.',
  },
  {
    id: 'aws-cloud-infrastructure',
    title: 'Cloud Infrastructure on AWS',
    filter: 'platform',
    problem: 'AWS foundations need clearer boundaries for compute, networking, IAM, and operations.',
    outcomes: ['Cleaner account layout', 'Safer access patterns', 'More predictable deployments'],
    deliverables: ['AWS architecture review', 'Implementation plan', 'Operational checklist'],
    tools: ['EC2', 'S3', 'RDS', 'VPC', 'IAM', 'CloudWatch'],
    bestFor: 'Teams that need reliable AWS foundations before scaling delivery.',
  },
  {
    id: 'docker-containerization',
    title: 'Docker & Containerization',
    filter: 'delivery',
    problem: 'Applications behave differently across developer, test, and deployment environments.',
    outcomes: ['Consistent runtime shape', 'Cleaner deployment artifact', 'Easier local reproduction'],
    deliverables: ['Dockerfile review', 'Compose setup', 'Image build workflow'],
    tools: ['Docker', 'Docker Compose', 'GHCR', 'Nginx'],
    bestFor: 'Application teams preparing services for repeatable deployment.',
  },
  {
    id: 'kubernetes-enablement',
    title: 'Kubernetes Enablement',
    filter: 'reliability',
    problem: 'Cluster delivery works, but rollout, observability, and handoff patterns are inconsistent.',
    outcomes: ['Clear deployment model', 'Health and rollout checks', 'Platform runbook'],
    deliverables: ['Manifest review', 'Helm/Kustomize guidance', 'GitOps workflow'],
    tools: ['Kubernetes', 'EKS', 'k3s', 'Helm', 'ArgoCD'],
    bestFor: 'Teams adopting Kubernetes or stabilizing an existing cluster workflow.',
  },
  {
    id: 'monitoring-observability',
    title: 'Monitoring & Observability',
    filter: 'reliability',
    problem: 'Incidents are harder to diagnose because signals are missing or disconnected.',
    outcomes: ['Useful service health view', 'Actionable alerts', 'Faster triage path'],
    deliverables: ['Metric plan', 'Dashboard layout', 'Alert review'],
    tools: ['Prometheus', 'Grafana', 'CloudWatch', 'ELK'],
    bestFor: 'Teams that need fewer blind spots during deploys and incidents.',
  },
  {
    id: 'security-secrets',
    title: 'Security & Secrets Management',
    filter: 'security',
    problem: 'Secrets, permissions, or pipeline checks are not consistently managed.',
    outcomes: ['Reduced credential exposure', 'Clearer IAM/RBAC', 'Pipeline security gates'],
    deliverables: ['Secrets review', 'Access-control recommendations', 'Scan integration'],
    tools: ['IAM', 'RBAC', 'Trivy', 'Vault', 'AWS Secrets Manager'],
    bestFor: 'Teams tightening release security without redesigning the whole stack.',
  },
  {
    id: 'full-stack-development',
    title: 'Full-Stack Web Application Development',
    filter: 'full-stack',
    problem: 'Product work needs both application delivery and production deployment thinking.',
    outcomes: ['Production-ready UI/API path', 'Typed client-server contracts', 'Deployable app workflow'],
    deliverables: ['React UI', 'Express API', 'Data model', 'Deployment notes'],
    tools: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    bestFor: 'Teams that need application features shipped with operational care.',
  },
  {
    id: 'deployment-automation',
    title: 'Deployment Automation',
    filter: 'delivery',
    problem: 'Deployments require too many manual steps or depend on tribal knowledge.',
    outcomes: ['One-command release path', 'Visible deployment status', 'Documented rollback'],
    deliverables: ['Deployment workflow', 'Status checks', 'Rollback runbook'],
    tools: ['GitHub Actions', 'Render', 'Vercel', 'Docker', 'SSH/SSM'],
    bestFor: 'Teams that need faster releases without losing review and rollback control.',
  },
]

const matrixRows = [
  ['Manual or inconsistent releases', 'CI/CD path with build, audit, deploy, and verify gates'],
  ['Cloud resources drifting across environments', 'Terraform workflow with reviewed infrastructure changes'],
  ['Kubernetes rollout uncertainty', 'GitOps and rollout checks with clear operational handoff'],
  ['Incidents are hard to triage', 'Dashboards and alerts tied to service health and deploy events'],
]

export function ServicesPage() {
  const [filter, setFilter] = useState<ServiceFilter>('all')
  const visibleServices =
    filter === 'all' ? services : services.filter((service) => service.filter === filter)

  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="grid gap-8">
          <PageIntro
            description="Practical DevOps support for teams that need better delivery systems, repeatable cloud foundations, and production workflows that are easier to operate."
            eyebrow="Services"
            size="page"
            title="Capabilities for safer releases and stronger platforms."
          />

          <SubNav
            items={[
              { href: '#devops-consulting', label: 'Platform' },
              { href: '#ci-cd-modernization', label: 'Delivery' },
              { href: '#security-secrets', label: 'Security' },
              { href: '#monitoring-observability', label: 'Reliability' },
              { href: '#full-stack-development', label: 'Full-Stack' },
            ]}
          />

          <div
            aria-label="Service filters"
            className="flex flex-wrap gap-2"
            role="toolbar"
          >
            {serviceFilters.map((item) => (
              <button
                aria-pressed={filter === item.value}
                className={cx(
                  'rounded-md border border-border px-3 py-2 text-sm font-semibold text-text-muted transition hover:border-accent/40 hover:text-accent-deep',
                  filter === item.value && 'border-primary bg-primary text-white hover:text-white',
                )}
                key={item.value}
                onClick={() => setFilter(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection id="platform" tone="compact">
        <div className="grid gap-5">
          {visibleServices.map((service) => (
            <SurfaceCard
              className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              id={service.id}
              key={service.id}
              padding="roomy"
            >
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className={finePrintClass}>Best for</p>
                  <p className={bodyClass}>{service.bestFor}</p>
                </div>
                <div className="space-y-3">
                  <h2 className={headingClasses.section}>{service.title}</h2>
                  <p className="text-base leading-8 text-text-muted">{service.problem}</p>
                </div>
                <ButtonLink className="w-full sm:w-auto" href="/contact">
                  Request scope
                </ButtonLink>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div className="space-y-3">
                  <p className={finePrintClass}>Outcomes</p>
                  <ul className="grid gap-2">
                    {service.outcomes.map((item) => (
                      <li className={bodyClass} key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className={finePrintClass}>Deliverables</p>
                  <ul className="grid gap-2">
                    {service.deliverables.map((item) => (
                      <li className={bodyClass} key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className={finePrintClass}>Engagement</p>
                  <ul className="grid gap-2">
                    {['Audit', 'Implementation', 'Managed support'].map((item) => (
                      <li className={bodyClass} key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-3">
                  <TrustChips items={service.tools} />
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <SurfaceCard>
            <p className={finePrintClass}>Comparison matrix</p>
            <h2 className={cx(headingClasses.section, 'mt-3')}>
              When the service fits.
            </h2>
          </SurfaceCard>
          <SurfaceCard padding="flush">
            <div className="divide-y divide-border">
              {matrixRows.map(([need, success]) => (
                <div className="grid gap-3 p-5 md:grid-cols-2" key={need}>
                  <div>
                    <p className={finePrintClass}>When you need this</p>
                    <p className="mt-2 text-sm leading-6 text-text">{need}</p>
                  </div>
                  <div>
                    <p className={finePrintClass}>What success looks like</p>
                    <p className="mt-2 text-sm leading-6 text-text">{success}</p>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <FaqAccordion
          items={[
            {
              question: 'How does a consultation usually start?',
              answer:
                'Start with a short scope conversation. I review the current stack, the release or reliability problem, timeline, and what outcome would make the work useful.',
            },
            {
              question: 'Do you use fixed pricing?',
              answer:
                'Not by default. Pricing depends on the work, risk, timeline, and level of involvement, so the first step is understanding the scope before quoting anything.',
            },
            {
              question: 'What should the first message include?',
              answer:
                'Share the current stack, the release or reliability problem, the timeline, and the outcome you need first.',
            },
          ]}
        />
      </SiteSection>
    </>
  )
}
