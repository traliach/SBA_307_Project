import type { ReactNode } from 'react'
import type { ProjectSummary } from '../../types/site'
import {
  createProjectSlug,
  getProjectCategory,
  getProjectDisplayTitle,
  getProjectDomain,
  getProjectPath,
  getProjectTags,
} from '../../utils/projects'
import { cx, finePrintClass, headingClasses, metaClass } from '../site/styles'
import { Tag } from '../site/ui'

interface FeaturedCaseStudyProps {
  project: ProjectSummary
  hideSectionLabel?: boolean
}

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function getArchitectureNodes(project: ProjectSummary) {
  const preferred = project.stack.filter((item) =>
    /aws|terraform|kubernetes|k3s|eks|argocd|github actions|jenkins|react|node|express|mongodb|prometheus|grafana|cloudfront|lambda|dynamodb|docker/i.test(
      item,
    ),
  )

  return (preferred.length ? preferred : project.stack).slice(0, 5)
}

function splitOutcome(outcome: string) {
  const [lead, ...rest] = outcome.split(/\s[—-]\s/)

  if (rest.length === 0 || lead.length > 90) {
    return { body: outcome, lead: '' }
  }

  return { lead, body: rest.join(' - ') }
}

function Sidebar({ project }: { project: ProjectSummary }) {
  const hasLiveProject = Boolean(project.liveUrl)

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      {hasLiveProject ? (
        <div
          aria-live="polite"
          className="mb-4 inline-flex items-center gap-2 rounded-md border border-success/35 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success"
          role="status"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-success motion-safe:animate-pulse"
          />
          Live project
        </div>
      ) : null}

      <p className="font-display text-xl font-semibold leading-snug text-text">
        {getProjectDisplayTitle(project)}
      </p>

      {project.liveUrl ? (
        <a
          className="mt-3 inline-flex break-all font-mono text-xs font-semibold text-accent-deep underline-offset-4 hover:underline"
          href={project.liveUrl}
          rel="noreferrer"
          target="_blank"
        >
          {stripProtocol(project.liveUrl)}
        </a>
      ) : null}

      <dl className="mt-5 grid gap-3 border-t border-border pt-5">
        <MetaRow label="Role" value={project.role} />
        <MetaRow label="Timeline" value={project.timeframe} />
        <MetaRow label="Focus" value={getProjectDomain(project)} />
      </dl>
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className={finePrintClass}>{label}</dt>
      <dd className="mt-1 text-sm font-semibold leading-6 text-text">{value}</dd>
    </div>
  )
}

function ArchitecturePreview({ nodes }: { nodes: string[] }) {
  if (nodes.length === 0) return null

  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <p className={finePrintClass}>System path</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {nodes.map((node, index) => (
          <div className="flex min-w-0 flex-wrap items-center gap-2" key={`${node}-${index}`}>
            <span className="max-w-full rounded-lg border border-border bg-elevated px-3 py-2 text-sm font-semibold leading-5 text-text sm:max-w-[12rem]">
              {node}
            </span>
            {index < nodes.length - 1 ? (
              <span aria-hidden className="text-sm font-semibold text-text-muted">
                -
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function MetricsGrid({ project }: { project: ProjectSummary }) {
  const metrics = project.metrics.slice(0, 3)

  if (metrics.length === 0) return null

  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div className="rounded-lg border border-border bg-elevated p-4" key={metric.label}>
          <dt className={finePrintClass}>{metric.label}</dt>
          <dd className="mt-2 break-words font-mono text-2xl font-semibold leading-none text-text">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function OutcomesList({ project }: { project: ProjectSummary }) {
  const outcomes = project.outcomes.slice(0, 3)

  if (outcomes.length === 0) return null

  return (
    <ol className="grid gap-3">
      {outcomes.map((outcome, index) => {
        const parsed = splitOutcome(outcome)

        return (
          <li className="grid grid-cols-[1.75rem_1fr] gap-3" key={outcome}>
            <span
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-soft font-mono text-xs font-semibold text-accent-deep"
            >
              {index + 1}
            </span>
            <p className="text-sm leading-7 text-text-muted">
              {parsed.lead ? (
                <>
                  <span className="font-semibold text-text">{parsed.lead}</span>{' '}
                </>
              ) : null}
              {parsed.body}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

function CtaLink({
  children,
  external,
  href,
  variant = 'secondary',
}: {
  children: ReactNode
  external?: boolean
  href: string
  variant?: 'primary' | 'secondary'
}) {
  return (
    <a
      className={cx(
        'inline-flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-focus/20',
        variant === 'primary'
          ? 'border-transparent bg-primary text-white hover:bg-primary/90'
          : 'border-border bg-surface text-text hover:border-accent/40 hover:text-accent-deep',
      )}
      href={href}
      rel={external ? 'noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      {children}
    </a>
  )
}

export function FeaturedCaseStudy({
  hideSectionLabel = false,
  project,
}: FeaturedCaseStudyProps) {
  const titleId = `featured-${createProjectSlug(project.title)}-title`
  const architectureNodes = getArchitectureNodes(project)
  const tags = getProjectTags(project)
  const visibleTags = tags.length ? tags : project.stack.slice(0, 6)

  return (
    <section aria-labelledby={titleId} className="w-full">
      {!hideSectionLabel ? (
        <div className="mb-5 flex flex-wrap items-center gap-2.5">
          <span aria-hidden className="h-px w-7 bg-accent/50" />
          <span className={finePrintClass}>
            Featured project · {getProjectCategory(project)}
          </span>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar project={project} />

        <article className="relative overflow-hidden rounded-lg border border-accent/25 bg-surface p-5 shadow-panel sm:p-6 lg:p-8">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <p className={metaClass}>{getProjectCategory(project)}</p>
              <h2 className={headingClasses.section} id={titleId}>
                {getProjectDisplayTitle(project)}
              </h2>
              <p className="max-w-3xl text-base leading-8 text-text-muted">
                {project.summary}
              </p>
            </div>

            <ArchitecturePreview nodes={architectureNodes} />
            <MetricsGrid project={project} />
            <OutcomesList project={project} />

            <div className="flex flex-wrap gap-2 border-t border-border pt-5">
              {visibleTags.slice(0, 8).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <CtaLink href={getProjectPath(project)} variant="primary">
                Read case study
              </CtaLink>
              {project.liveUrl ? (
                <CtaLink external href={project.liveUrl}>
                  View live project
                </CtaLink>
              ) : null}
              {project.repoUrl ? (
                <CtaLink external href={project.repoUrl}>
                  View repository
                </CtaLink>
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
