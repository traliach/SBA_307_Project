import { ButtonLink, Eyebrow, SiteSection, SurfaceCard } from '../components/site/ui'
import {
  bodyClass,
  finePrintClass,
  headingClasses,
  metaClass,
} from '../components/site/styles'
import type { ProfileContent } from '../types/site'

interface AboutPageProps {
  profile: ProfileContent
}

export function AboutPage({ profile }: AboutPageProps) {
  return (
    <>
      <SiteSection className="pt-12 sm:pt-16 lg:pt-20">
        <div className="reveal grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
          <SurfaceCard padding="roomy" tone="accent">
            <div className="flex h-full flex-col gap-10">
              <div className="space-y-6">
                <Eyebrow>About</Eyebrow>
                <div className="space-y-5">
                  <h1 className={headingClasses.page}>
                    Cloud, automation, and delivery engineering with a practical
                    builder mindset.
                  </h1>
                  <p className="max-w-3xl text-[1.05rem] leading-8 text-muted sm:text-lg">
                    {profile.about}
                  </p>
                  <p className={bodyClass}>
                    In parallel with DevOps work, I have been building full-stack
                    applications with React, TypeScript, Express, and MongoDB —
                    strengthening the connection between how software is built and how
                    it gets delivered.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink download href={profile.links.resume}>
                  Download resume
                </ButtonLink>
                <ButtonLink
                  href={profile.links.linkedin}
                  rel="noreferrer"
                  target="_blank"
                  variant="secondary"
                >
                  View LinkedIn
                </ButtonLink>
              </div>
            </div>
          </SurfaceCard>

          <div className="grid gap-6">
            <SurfaceCard className="flex flex-col gap-5">
              <p className={finePrintClass}>Career direction</p>
              <h2 className={headingClasses.card}>
                Bridging DevOps and full-stack software engineering.
              </h2>
              <p className={bodyClass}>{profile.intro}</p>
            </SurfaceCard>

            <SurfaceCard className="flex flex-col gap-5" tone="subdued">
              <p className={finePrintClass}>Certifications</p>
              <ul className="grid gap-3">
                {profile.certifications.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warm" />
                    <span className={bodyClass}>{item}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>

            <SurfaceCard className="flex flex-col gap-4" padding="compact">
              <p className={finePrintClass}>Availability</p>
              <p className={bodyClass}>{profile.availability}</p>
            </SurfaceCard>
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <SurfaceCard className="flex flex-col gap-8">
            <div className="space-y-5">
              <Eyebrow>Experience</Eyebrow>
              <h2 className={headingClasses.section}>
                Professional timeline.
              </h2>
            </div>

            <div className="grid gap-6">
              {profile.timeline.map((item) => (
                <div
                  className="relative border-l-2 border-accent/15 pl-6"
                  key={`${item.title}-${item.period}`}
                >
                  <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full border-2 border-accent bg-white" />
                  <p className={finePrintClass}>{item.period}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className={bodyClass + ' mt-3'}>{item.detail}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="flex flex-col gap-6" tone="subdued">
            <div className="space-y-4">
              <Eyebrow>Core strengths</Eyebrow>
              <h2 className={headingClasses.card}>Where I add the most leverage.</h2>
            </div>

            <ul className="grid gap-4">
              {profile.strengths.map((item) => (
                <li
                  className="rounded-2xl border border-line/60 bg-white p-5 transition duration-200 hover:shadow-soft"
                  key={item}
                >
                  <p className={metaClass}>Capability</p>
                  <p className="mt-2 text-base font-semibold leading-7 text-ink">{item}</p>
                </li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </SiteSection>
    </>
  )
}
