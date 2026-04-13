import { PageIntro, SiteSection, SurfaceCard } from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
} from '../components/site/styles'
import { levelLabels, skillLevels } from '../features/portfolio/skillLevels'
import type { SkillGroup } from '../types/site'

interface SkillsPageProps {
  skills: SkillGroup[]
}

const skillSpanClasses = [
  'xl:col-span-7', // 1. Cloud and IaC
  'xl:col-span-5', // 2. CI/CD and delivery
  'xl:col-span-6', // 3. Containers and orchestration
  'xl:col-span-6', // 4. Observability and operations
  'xl:col-span-5', // 5. Languages
  'xl:col-span-7', // 6. Backend and APIs
  'xl:col-span-5', // 7. Frontend
  'xl:col-span-7', // 8. Databases
]

const skillTones: Array<'default' | 'subdued' | 'accent' | 'warm'> = [
  'accent',   // 1. Cloud and IaC
  'warm',     // 2. CI/CD and delivery
  'accent',   // 3. Containers and orchestration
  'subdued',  // 4. Observability and operations
  'default',  // 5. Languages
  'default',  // 6. Backend and APIs
  'subdued',  // 7. Frontend
  'subdued',  // 8. Databases
]

export function SkillsPage({ skills }: SkillsPageProps) {
  return (
    <SiteSection className="pt-12 sm:pt-16 lg:pt-20">
      <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <PageIntro
          description="Organized around the disciplines teams hire for: cloud platforms, CI/CD, infrastructure as code, containers, observability, and application delivery."
          eyebrow="Skills"
          size="page"
          title="Technical depth across cloud, automation, platforms, and full-stack development."
        />

        <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
          <p className={finePrintClass}>At a glance</p>
          <p className={bodyClass}>
            Hands-on across the full delivery stack — from writing Terraform and
            building pipelines to shipping application features and keeping
            production systems observable.
          </p>
        </SurfaceCard>
      </div>

      <div className="reveal stagger-2 mt-10 grid gap-6 xl:grid-cols-12">
        {skills.map((group, index) => (
          <SurfaceCard
            className={cx(
              'flex h-full flex-col gap-6 transition duration-200 hover:shadow-card-hover',
              skillSpanClasses[index] ?? 'xl:col-span-6',
            )}
            key={group.title}
            tone={skillTones[index] ?? 'default'}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <p className={finePrintClass}>{group.eyebrow}</p>
                <h2 className={headingClasses.card}>{group.title}</h2>
                <p className={bodyClass}>{group.description}</p>
              </div>

              <p className={cx(metaClass, 'whitespace-nowrap')}>{group.items.length} tools / topics</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {group.items.map((item) => {
                const level = skillLevels[item] ?? 3
                return (
                  <div key={item} className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[0.82rem] font-medium text-ink dark:text-gray-200">{item}</span>
                      <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-wide text-muted dark:text-gray-500">
                        {levelLabels[level]}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(level / 5) * 100}%`,
                          background: 'linear-gradient(90deg, #4338ca, #818cf8)',
                          transition: 'width 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </SurfaceCard>
        ))}
      </div>
    </SiteSection>
  )
}
