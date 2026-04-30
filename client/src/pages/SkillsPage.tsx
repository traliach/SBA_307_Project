import { PageIntro, SiteSection, SurfaceCard } from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
} from '../components/site/styles'
import type { SkillGroup } from '../types/site'

interface SkillsPageProps {
  skills: SkillGroup[]
}

const skillSpanClasses = [
  'xl:col-span-7',  // 1. Cloud and IaC
  'xl:col-span-5',  // 2. CI/CD and delivery
  'xl:col-span-6',  // 3. Containers and orchestration
  'xl:col-span-6',  // 4. DevSecOps and security
  'xl:col-span-7',  // 5. Observability and operations
  'xl:col-span-5',  // 6. Languages
  'xl:col-span-7',  // 7. Backend and APIs
  'xl:col-span-5',  // 8. Frontend
  'xl:col-span-12', // 9. Databases (full width)
]

const skillTones: Array<'default' | 'subdued' | 'accent' | 'warm'> = [
  'accent',   // 1. Cloud and IaC
  'warm',     // 2. CI/CD and delivery
  'accent',   // 3. Containers and orchestration
  'subdued',  // 4. DevSecOps and security
  'subdued',  // 5. Observability and operations
  'default',  // 6. Languages
  'default',  // 7. Backend and APIs
  'subdued',  // 8. Frontend
  'subdued',  // 9. Databases
]

export function SkillsPage({ skills }: SkillsPageProps) {
  return (
    <SiteSection className="pt-12 sm:pt-16 lg:pt-20">
      <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <PageIntro
          description="Organized around the disciplines teams hire for: cloud platforms, CI/CD, infrastructure as code, containers, observability, and application delivery."
          eyebrow="Skills"
          size="section"
          title="Technical depth across cloud infrastructure, platforms, automation, and delivery."
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
            <div className="space-y-3">
              <p className={finePrintClass}>{group.eyebrow}</p>
              <h2 className={headingClasses.card}>{group.title}</h2>
              <p className={bodyClass}>{group.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-line/70 bg-white/70 px-3 py-1.5 text-[0.75rem] font-medium text-ink transition-colors duration-200 hover:border-accent/25 hover:text-accent-deep dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-300 dark:hover:border-amber-400/30 dark:hover:text-amber-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </SurfaceCard>
        ))}
      </div>
    </SiteSection>
  )
}
