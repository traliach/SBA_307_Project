import type { ProjectSummary } from '../../types/site'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
  metricBadgeClass,
} from './styles'
import { Eyebrow, SurfaceCard, Tag } from './ui'

interface ProjectCaseStudyCardProps {
  project: ProjectSummary
  layout?: 'full' | 'stacked'
}

export function ProjectCaseStudyCard({
  project,
  layout = 'stacked',
}: ProjectCaseStudyCardProps) {
  const isFeaturedLayout = layout === 'full'
  const visibleOutcomes = isFeaturedLayout ? project.outcomes : project.outcomes.slice(0, 2)

  return (
    <SurfaceCard
      padding={isFeaturedLayout ? 'roomy' : 'default'}
      tone={isFeaturedLayout ? 'accent' : 'default'}
      className={cx(
        'group h-full transition duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-[0_42px_100px_-58px_rgba(15,23,42,0.38)]',
      )}
    >
      {isFeaturedLayout ? (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(290px,0.75fr)]">
          <div className="flex flex-col gap-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-4">
                <Eyebrow>{project.featured ? 'Featured project' : 'Selected project'}</Eyebrow>
                <div className="space-y-3">
                  <h2 className={headingClasses.section}>{project.title}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className={metaClass}>{project.role}</p>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <p className={metaClass}>{project.timeframe}</p>
                  </div>
                </div>
              </div>
              <Tag className="border-accent/[0.15] bg-white/70 text-accent-deep">
                {project.timeframe}
              </Tag>
            </div>

            <p className="max-w-3xl text-[1.08rem] leading-8 text-slate-700">
              {project.summary}
            </p>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[26px] border border-slate-200/80 bg-white/[0.72] p-5 sm:p-6">
                <p className={finePrintClass}>Delivery need</p>
                <p className={cx(bodyClass, 'mt-3 text-slate-700')}>{project.challenge}</p>
              </div>
              <div className="rounded-[26px] border border-slate-200/80 bg-white/[0.72] p-5 sm:p-6">
                <p className={finePrintClass}>Execution</p>
                <p className={cx(bodyClass, 'mt-3 text-slate-700')}>{project.solution}</p>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-5 rounded-[28px] border border-slate-200/80 bg-white/[0.74] p-5 sm:p-6">
            <div className="space-y-3">
              <p className={finePrintClass}>Delivery profile</p>
              <div className="grid gap-3">
                {project.metrics.map((metric) => (
                  <div className={metricBadgeClass} key={metric.label}>
                    <p className={finePrintClass}>{metric.label}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className={finePrintClass}>Operational result</p>
              <ul className="grid gap-3">
                {visibleOutcomes.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className={bodyClass}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className={finePrintClass}>Stack</p>
              <div className="flex flex-wrap gap-2.5">
                {project.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <Eyebrow>Project</Eyebrow>
                <div className="space-y-2">
                  <h2 className={headingClasses.card}>{project.title}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className={metaClass}>{project.role}</p>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <p className={metaClass}>{project.timeframe}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.metrics.slice(0, 2).map((metric) => (
                  <Tag className="bg-slate-50 text-slate-600" key={metric.label}>
                    {metric.value}
                  </Tag>
                ))}
              </div>
            </div>

            <p className="text-base leading-8 text-slate-700">{project.summary}</p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/[0.78] p-5">
              <p className={finePrintClass}>Delivery need</p>
              <p className={cx(bodyClass, 'mt-3')}>{project.challenge}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.88fr)]">
              <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/[0.78] p-5">
                <p className={finePrintClass}>Execution</p>
                <p className={cx(bodyClass, 'mt-3')}>{project.solution}</p>
              </div>

              <div className="rounded-[24px] border border-slate-200/80 bg-white/[0.88] p-5">
                <p className={finePrintClass}>Operational result</p>
                <ul className="mt-3 grid gap-3">
                  {visibleOutcomes.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className={bodyClass}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 border-t border-slate-200/80 pt-5">
            {project.stack.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
      )}
    </SurfaceCard>
  )
}
