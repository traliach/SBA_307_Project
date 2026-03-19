import { PageIntro, SiteSection, SurfaceCard, Tag } from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
} from '../components/site/styles'
import type { SkillGroup } from '../types/site'

interface SkillsPageProps {
  skills: SkillGroup[]
}

const skillSpanClasses = [
  'xl:col-span-7',
  'xl:col-span-5',
  'xl:col-span-5',
  'xl:col-span-7',
  'xl:col-span-7',
  'xl:col-span-5',
]

const skillTones: Array<'default' | 'subdued' | 'accent' | 'warm'> = [
  'accent',
  'subdued',
  'default',
  'subdued',
  'warm',
  'default',
]

export function SkillsPage({ skills }: SkillsPageProps) {
  return (
    <SiteSection className="pt-12 sm:pt-16 lg:pt-20">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <PageIntro
          description="This is grouped around the kinds of work teams actually hire for: cloud platforms, CI/CD, infrastructure as code, containers, support, and application delivery."
          eyebrow="Skills"
          size="page"
          title="Breadth across cloud delivery, automation, platform operations, and application work."
        />

        <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
          <p className={finePrintClass}>How this page is organized</p>
          <p className={bodyClass}>
            The goal here is clarity. Each group maps to a distinct slice of
            engineering work rather than dumping tools into a single list.
          </p>
        </SurfaceCard>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-12">
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

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </SurfaceCard>
        ))}
      </div>
    </SiteSection>
  )
}
