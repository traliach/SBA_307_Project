import { ProjectCaseStudyCard } from '../components/site/ProjectCaseStudyCard'
import {
  ArchitectureDiagram,
  ButtonLink,
  CtaBand,
  KpiStrip,
  PageIntro,
  PipelineDiagram,
  SiteSection,
  SurfaceCard,
  Tag,
  TrustChips,
} from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
  textLinkClass,
} from '../components/site/styles'
import type { ProjectSummary } from '../types/site'
import {
  findProjectBySlug,
  getProjectCategory,
  getProjectDisplayTitle,
  getProjectDomain,
  getProjectTags,
  getRelatedProjects,
} from '../utils/projects'
import { NotFoundPage } from './NotFoundPage'

interface WorkDetailPageProps {
  projects: ProjectSummary[]
  slug: string
}

function getArchitectureNodes(project: ProjectSummary) {
  const preferred = project.stack.filter((item) =>
    /aws|terraform|kubernetes|k3s|eks|argocd|github actions|jenkins|react|node|express|mongodb|prometheus|grafana|cloudfront|lambda|dynamodb/i.test(
      item,
    ),
  )

  return (preferred.length ? preferred : project.stack).slice(0, 4)
}

function getPipelineSteps(project: ProjectSummary) {
  const stackText = project.stack.join(' ').toLowerCase()

  if (stackText.includes('terraform')) {
    return ['Plan', 'Validate', 'Apply', 'Deploy', 'Observe']
  }

  if (stackText.includes('kubernetes') || stackText.includes('argocd')) {
    return ['Build', 'Package', 'Sync', 'Health', 'Observe']
  }

  return ['Plan', 'Build', 'Test', 'Deploy', 'Monitor']
}

function ExternalActions({ project }: { project: ProjectSummary }) {
  if (!project.repoUrl && !project.liveUrl) return null

  return (
    <div className="grid gap-3 sm:flex sm:flex-wrap">
      {project.repoUrl ? (
        <ButtonLink
          className="w-full sm:w-auto"
          href={project.repoUrl}
          rel="noreferrer"
          target="_blank"
          variant="secondary"
        >
          View repository
        </ButtonLink>
      ) : null}
      {project.liveUrl ? (
        <ButtonLink
          className="w-full sm:w-auto"
          href={project.liveUrl}
          rel="noreferrer"
          target="_blank"
          variant="secondary"
        >
          View live project
        </ButtonLink>
      ) : null}
    </div>
  )
}

export function WorkDetailPage({ projects, slug }: WorkDetailPageProps) {
  const project = findProjectBySlug(projects, slug)

  if (!project) return <NotFoundPage />

  const relatedProjects = getRelatedProjects(projects, project)
  const displayTitle = getProjectDisplayTitle(project)
  const tags = getProjectTags(project)

  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div className="space-y-6">
            <a className={textLinkClass} href="/work">
              Back to work
            </a>

            <PageIntro
              description={project.summary}
              eyebrow={getProjectCategory(project)}
              size="page"
              title={displayTitle}
            />

            <div className="flex flex-wrap gap-2">
              <Tag>{project.timeframe}</Tag>
              <Tag>{project.role}</Tag>
              <Tag>{getProjectDomain(project)}</Tag>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href="/contact">
                Discuss similar work
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/services" variant="secondary">
                View services
              </ButtonLink>
            </div>
          </div>

          <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
            <p className={finePrintClass}>Project snapshot</p>
            <div className="grid gap-3">
              <div>
                <p className={finePrintClass}>Role</p>
                <p className={metaClass}>{project.role}</p>
              </div>
              <div>
                <p className={finePrintClass}>Timeline</p>
                <p className={metaClass}>{project.timeframe}</p>
              </div>
              <div>
                <p className={finePrintClass}>Domain</p>
                <p className={metaClass}>{getProjectDomain(project)}</p>
              </div>
            </div>
            <TrustChips items={tags.length ? tags : project.stack.slice(0, 4)} />
          </SurfaceCard>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <KpiStrip
          className="reveal"
          items={project.metrics.map((metric) => ({
            label: metric.label,
            value: metric.value,
          }))}
        />
      </SiteSection>

      <SiteSection>
        <div className="reveal grid gap-5 lg:grid-cols-3">
          {[
            ['Challenge', project.challenge],
            ['Solution', project.solution],
          ].map(([label, content]) => (
            <SurfaceCard className="flex h-full flex-col gap-3 lg:col-span-1" key={label}>
              <p className={finePrintClass}>{label}</p>
              <p className={bodyClass}>{content}</p>
            </SurfaceCard>
          ))}

          <SurfaceCard className="flex h-full flex-col gap-4 lg:col-span-1">
            <p className={finePrintClass}>Outcomes</p>
            <ul className="grid gap-3">
              {project.outcomes.map((outcome) => (
                <li className="flex gap-3" key={outcome}>
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span className={bodyClass}>{outcome}</span>
                </li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <SurfaceCard className="flex flex-col gap-5">
            <div className="space-y-3">
              <p className={finePrintClass}>Implementation map</p>
              <h2 className={headingClasses.section}>System shape and delivery path.</h2>
              <p className={bodyClass}>
                The diagram summarizes the main tools and platform pieces in the
                case study without replacing the project details above.
              </p>
            </div>

            <ArchitectureDiagram
              nodes={getArchitectureNodes(project)}
              title={`${displayTitle} architecture`}
            />
          </SurfaceCard>

          <SurfaceCard className="flex flex-col gap-5">
            <div className="space-y-3">
              <p className={finePrintClass}>Release flow</p>
              <h2 className={headingClasses.section}>From change to operating signal.</h2>
              <p className={bodyClass}>
                The delivery model is shown as a compact pipeline so the release
                and validation pattern is easy to scan.
              </p>
            </div>

            <PipelineDiagram steps={getPipelineSteps(project)} />
          </SurfaceCard>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <p className={finePrintClass}>Stack</p>
            <h2 className={headingClasses.section}>Tools used in the work.</h2>
            <p className={bodyClass}>
              Stack tags reflect the project record and stay close to the actual
              implementation notes.
            </p>
            <ExternalActions project={project} />
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Tag className="bg-surface" key={item}>
                {item}
              </Tag>
            ))}
          </div>
        </div>
      </SiteSection>

      {relatedProjects.length ? (
        <SiteSection>
          <div className="reveal grid gap-6">
            <PageIntro
              description="Related case studies with overlapping cloud, platform, release, or full-stack delivery themes."
              eyebrow="Related work"
              size="section"
              title="Continue through nearby delivery patterns."
            />

            <div className={cx('grid gap-5', relatedProjects.length > 1 && 'lg:grid-cols-3')}>
              {relatedProjects.map((relatedProject) => (
                <ProjectCaseStudyCard key={relatedProject.title} project={relatedProject} />
              ))}
            </div>
          </div>
        </SiteSection>
      ) : null}

      <SiteSection tone="compact">
        <CtaBand
          actions={
            <>
              <ButtonLink href="/contact" variant="secondary">
                Book a call
              </ButtonLink>
              <ButtonLink className="text-white hover:text-white" href="/work" variant="ghost">
                View all work
              </ButtonLink>
            </>
          }
          description="Use this project as a reference point for the release, cloud, platform, or full-stack system you want to improve."
          title="Want to talk through a similar delivery problem?"
        />
      </SiteSection>
    </>
  )
}
