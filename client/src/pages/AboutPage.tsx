import { ButtonLink, Eyebrow, SiteSection, SurfaceCard } from '../components/site/ui'
import {
  bodyClass,
  finePrintClass,
  headingClasses,
  metaClass,
} from '../components/site/styles'
import { certificationLinks } from '../features/portfolio/content'
import type { ProfileContent } from '../types/site'

interface AboutPageProps {
  profile: ProfileContent
}

function FactCard({
  label,
  value,
}: {
  label: string
  value: string | undefined
}) {
  if (!value) return null

  return (
    <div className="rounded-lg border border-line/70 bg-white p-4">
      <p className={finePrintClass}>{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-ink">{value}</p>
    </div>
  )
}

export function AboutPage({ profile }: AboutPageProps) {
  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <SurfaceCard className="flex flex-col gap-8" padding="roomy">
            <div className="space-y-5">
              <Eyebrow>About</Eyebrow>
              <h1 className={headingClasses.page}>
                DevOps engineering focused on reliable infrastructure and
                calmer releases.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
                {profile.about}
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href="/contact">
                Contact me
              </ButtonLink>
              <ButtonLink
                className="w-full sm:w-auto"
                href="/resume"
                rel="noreferrer"
                target="_blank"
                variant="secondary"
              >
                Download resume
              </ButtonLink>
            </div>
          </SurfaceCard>

          <div className="grid gap-4">
            <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
              <p className={finePrintClass}>Snapshot</p>
              <FactCard label="Current role" value={profile.currentEmployer} />
              <FactCard label="Previous role" value={profile.previousEmployer} />
              <FactCard label="Education" value={profile.education} />
              <FactCard label="Location" value={profile.location} />
            </SurfaceCard>

            <SurfaceCard className="flex flex-col gap-4" padding="compact">
              <p className={finePrintClass}>Certifications</p>
              <div className="grid gap-3">
                {profile.certifications.map((item) => {
                  const url = certificationLinks[item]

                  return (
                    <a
                      className="rounded-lg border border-line/70 bg-surface-tinted p-4 text-sm font-semibold leading-6 text-ink transition hover:border-accent/40 hover:text-accent-deep"
                      href={url ?? '#'}
                      key={item}
                      rel={url ? 'noreferrer' : undefined}
                      target={url ? '_blank' : undefined}
                    >
                      {item}
                    </a>
                  )
                })}
              </div>
            </SurfaceCard>
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="space-y-4">
            <Eyebrow>Experience</Eyebrow>
            <h2 className={headingClasses.section}>The path so far.</h2>
          </div>

          <div className="grid gap-4">
            {profile.timeline.map((item) => (
              <SurfaceCard className="flex flex-col gap-3" key={`${item.title}-${item.period}`} padding="compact">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={headingClasses.card}>{item.title}</h3>
                  <p className={metaClass}>{item.period}</p>
                </div>
                <p className={bodyClass}>{item.detail}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal">
          <SurfaceCard className="flex flex-col gap-5" tone="subdued">
            <div className="space-y-3">
              <Eyebrow>Core strengths</Eyebrow>
              <h2 className={headingClasses.section}>Where I add the most leverage.</h2>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {profile.strengths.map((item) => (
                <li className="rounded-lg border border-line/70 bg-white p-4" key={item}>
                  <p className={metaClass}>Capability</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-ink">{item}</p>
                </li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </SiteSection>
    </>
  )
}
