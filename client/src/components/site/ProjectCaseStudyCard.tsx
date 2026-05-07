import type { ProjectSummary } from '../../types/site'
import {
  getProjectCategory,
  getProjectDisplayTitle,
  getProjectPath,
} from '../../utils/projects'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
  metricBadgeClass,
} from './styles'
import { SurfaceCard, Tag } from './ui'

interface ProjectCaseStudyCardProps {
  project: ProjectSummary
  layout?: 'full' | 'stacked'
}

function getVisualLabel(title: string): string {
  if (title.includes('k8s')) return 'Demonstrates'
  if (title.includes('cloud_resume')) return 'Demonstrates'
  if (title.includes('Portfolio')) return 'Portfolio system'
  return 'Demonstrates'
}

function getPositioning(project: ProjectSummary): string {
  if (project.title === 'cloud_resume_infra — AWS Resume Platform') {
    return 'Terraform-managed AWS infrastructure, serverless API, and CI/CD deployment.'
  }

  if (project.title.includes('k8s-platform-lab')) {
    return 'Kubernetes lab with GitOps, monitoring, and health checks.'
  }

  return project.summary
}

function getVisualItems(project: ProjectSummary): string[] {
  if (project.title === 'cloud_resume_infra — AWS Resume Platform') {
    return ['Terraform IaC', 'S3 + CloudFront', 'Lambda + DynamoDB', 'GitHub Actions']
  }

  if (project.title.includes('k8s-platform-lab')) {
    return ['k3s on EC2', 'ArgoCD GitOps', 'Prometheus/Grafana', 'Terraform']
  }

  if (project.title.includes('devops_platform')) {
    return ['Jenkins CI/CD', 'Ansible', 'Docker Compose', 'Prometheus']
  }

  return project.stack.slice(0, 4)
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3.5 1H1v10h10V8.5M11 1H6.5M11 1v4.5M11 1L5.5 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function ProjectLinks({
  caseStudyPath,
  liveUrl,
  repoUrl,
}: {
  caseStudyPath: string
  liveUrl?: string
  repoUrl?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        className="inline-flex items-center gap-1.5 rounded-md border border-transparent bg-primary px-3 py-1.5 text-xs font-semibold text-white transition duration-200 hover:bg-primary/90"
        href={caseStudyPath}
      >
        Case study
      </a>
      {repoUrl ? (
        <a
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 text-xs font-semibold text-muted transition duration-200 hover:border-accent/30 hover:text-accent-deep"
          href={repoUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLinkIcon />
          Repo
        </a>
      ) : null}
      {liveUrl ? (
        <a
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 text-xs font-semibold text-muted transition duration-200 hover:border-accent/30 hover:text-accent-deep"
          href={liveUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLinkIcon />
          Live
        </a>
      ) : null}
    </div>
  )
}

function ProjectVisual({ project }: { project: ProjectSummary }) {
  const visualItems = getVisualItems(project)

  return (
    <div className="min-h-[118px] overflow-hidden rounded-lg border border-line/70 bg-surface-tinted p-3.5">
      <div className="flex h-full flex-col justify-between gap-6">
        <p className={cx(finePrintClass, 'leading-5')}>{getVisualLabel(project.title)}</p>

        <div className="flex flex-wrap gap-2">
          {visualItems.map((item) => (
            <div
              className="min-w-0 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold leading-4 text-ink"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectCaseStudyCard({
  layout = 'stacked',
  project,
}: ProjectCaseStudyCardProps) {
  const isFeaturedLayout = layout === 'full'
  const displayTitle = getProjectDisplayTitle(project)
  const visibleOutcomes = isFeaturedLayout ? project.outcomes.slice(0, 2) : []
  const primaryMetric = project.metrics[0]
  const summary = isFeaturedLayout ? project.summary : getPositioning(project)
  const caseStudyPath = getProjectPath(project)

  return (
    <SurfaceCard
      className={cx(
        'group h-full max-w-full overflow-hidden transition duration-200 hover:border-accent/40',
        isFeaturedLayout && 'border-accent/25',
      )}
      padding="compact"
      tone="default"
    >
      <div
        className={cx(
          'grid h-full gap-5',
          isFeaturedLayout && 'lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start',
        )}
      >
        <ProjectVisual project={project} />

        <div className="flex min-w-0 flex-col gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-accent/20 bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-deep">
                {getProjectCategory(project)}
              </span>
              <span className={metaClass}>{project.timeframe}</span>
            </div>
            <h2
              className={
                isFeaturedLayout
                  ? headingClasses.section
                  : 'font-display text-[1.35rem] font-semibold leading-snug tracking-normal text-ink dark:text-gray-100'
              }
            >
              {displayTitle}
            </h2>
            <p className={metaClass}>{project.role}</p>
          </div>

          <p className={cx(bodyClass, !isFeaturedLayout && 'line-clamp-2')}>
            {summary}
          </p>

          {isFeaturedLayout ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {project.metrics.slice(0, 3).map((metric) => (
                <div className={metricBadgeClass} key={metric.label}>
                  <p className={finePrintClass}>{metric.label}</p>
                  <p className="mt-1 break-words text-sm font-semibold leading-6 text-ink">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          ) : primaryMetric ? (
            <div className="rounded-lg border border-line/70 bg-white px-3.5 py-3 dark:border-white/[0.08] dark:bg-[#161920]">
              <p className={finePrintClass}>{primaryMetric.label}</p>
              <p className="mt-1 break-words text-sm font-semibold leading-6 text-ink">
                {primaryMetric.value}
              </p>
            </div>
          ) : null}

          {visibleOutcomes.length ? (
            <ul className="grid gap-2">
              {visibleOutcomes.map((item) => (
                <li className="flex gap-3" key={item}>
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span className={bodyClass}>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto space-y-4 border-t border-line/70 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, isFeaturedLayout ? 9 : 4).map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
            <ProjectLinks
              caseStudyPath={caseStudyPath}
              repoUrl={project.repoUrl}
              liveUrl={project.liveUrl}
            />
          </div>
        </div>
      </div>
    </SurfaceCard>
  )
}
