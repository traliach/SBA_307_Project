import { useMemo, useState } from 'react'
import { ProjectCaseStudyCard } from '../components/site/ProjectCaseStudyCard'
import {
  ButtonLink,
  CtaBand,
  KpiStrip,
  PageIntro,
  SiteSection,
  SurfaceCard,
  TrustChips,
} from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
} from '../components/site/styles'
import type { ProjectSummary } from '../types/site'
import {
  getProjectCategory,
  getProjectDomain,
  matchesWorkFilter,
  type WorkFilter,
  workFilters,
} from '../utils/projects'

interface WorkIndexPageProps {
  projects: ProjectSummary[]
}

const PRIORITY_TITLES = [
  'cloud_resume_infra — AWS Resume Platform',
  'k8s-platform-lab — Self-Hosted Kubernetes Platform',
  'devops_platform — Self-Hosted DevOps Platform',
  'Enterprise Kubernetes Platform Modernization',
]

const INDEX_METRICS = [
  {
    label: 'Primary themes',
    value: 'Cloud + DevOps',
    detail: 'AWS, Terraform, Kubernetes, CI/CD, and observability.',
  },
  {
    label: 'Delivery proof',
    value: 'Case studies',
    detail: 'Each project keeps challenge, solution, metrics, stack, and outcomes together.',
  },
  {
    label: 'Application layer',
    value: 'React + Node',
    detail: 'Full-stack work is shown with deployment and operating context.',
  },
  {
    label: 'Reliability lens',
    value: 'Release safety',
    detail: 'Projects emphasize automation, checks, monitoring, and handoff clarity.',
  },
]

function getPriority(project: ProjectSummary) {
  const priorityIndex = PRIORITY_TITLES.indexOf(project.title)

  if (priorityIndex >= 0) return priorityIndex
  return project.featured ? PRIORITY_TITLES.length + 1 : PRIORITY_TITLES.length + 10
}

function orderProjects(projects: ProjectSummary[]) {
  return [...projects].sort((left, right) => getPriority(left) - getPriority(right))
}

export function WorkIndexPage({ projects }: WorkIndexPageProps) {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('all')

  const orderedProjects = useMemo(() => orderProjects(projects), [projects])
  const visibleProjects = orderedProjects.filter((project) =>
    matchesWorkFilter(project, activeFilter),
  )
  const featuredProject = orderedProjects[0]
  const domains = Array.from(new Set(orderedProjects.map(getProjectDomain))).slice(0, 6)

  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <PageIntro
            description="A case study library for cloud infrastructure, Kubernetes platforms, CI/CD modernization, observability, and full-stack systems with deployment context."
            eyebrow="Work"
            size="page"
            title="Project proof for safer releases and stronger cloud foundations."
          />

          <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
            <p className={finePrintClass}>Work index</p>
            <p className={bodyClass}>
              {projects.length} case studies organized by delivery domain, toolchain,
              and reliability outcome.
            </p>
            <TrustChips items={domains} />
          </SurfaceCard>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <KpiStrip className="reveal" items={INDEX_METRICS} />
      </SiteSection>

      {featuredProject ? (
        <SiteSection className="pt-0" id="featured" tone="compact">
          <div className="reveal grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="space-y-4">
              <p className={finePrintClass}>Featured case study</p>
              <h2 className={headingClasses.section}>{getProjectCategory(featuredProject)}</h2>
              <p className={bodyClass}>
                Start here for a compact view of the delivery pattern, then filter
                the full library below.
              </p>
            </div>
            <ProjectCaseStudyCard layout="full" project={featuredProject} />
          </div>
        </SiteSection>
      ) : null}

      <SiteSection className="pt-0" id="case-studies">
        <div className="reveal grid gap-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <PageIntro
              description="Filter by the implementation area you want to inspect. The project pages keep challenge, solution, stack, metrics, and outcomes in one place."
              eyebrow="Case studies"
              size="section"
              title="Browse by delivery focus."
            />

            <p className={metaClass}>
              Showing {visibleProjects.length} of {orderedProjects.length}
            </p>
          </div>

          <div
            aria-label="Work filters"
            className="flex gap-2 overflow-x-auto pb-1"
            role="toolbar"
          >
            {workFilters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter.value}
                className={cx(
                  'whitespace-nowrap rounded-md border px-3 py-2 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-focus/20',
                  activeFilter === filter.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-surface text-text-muted hover:border-accent/40 hover:text-text',
                )}
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {visibleProjects.map((project) => (
              <ProjectCaseStudyCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <CtaBand
          actions={
            <>
              <ButtonLink href="/services" variant="secondary">
                View services
              </ButtonLink>
              <ButtonLink className="text-white hover:text-white" href="/contact#request" variant="ghost">
                Request a call
              </ButtonLink>
            </>
          }
          description="Bring the release, infrastructure, or platform problem you are trying to make more predictable."
          title="Need this kind of delivery support on your own stack?"
        />
      </SiteSection>
    </>
  )
}
