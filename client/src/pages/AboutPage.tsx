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
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
          <SurfaceCard padding="roomy" tone="accent">
            <div className="flex h-full flex-col gap-8">
              <div className="space-y-5">
                <Eyebrow>About</Eyebrow>
                <div className="space-y-5">
                  <h1 className={headingClasses.page}>
                    Cloud, automation, and delivery engineering with a practical
                    builder mindset.
                  </h1>
                  <p className="max-w-3xl text-[1.06rem] leading-8 text-slate-700">
                    {profile.about}
                  </p>
                  <p className={bodyClass}>
                    Alongside DevOps and platform engineering, I have been building
                    deeper full-stack experience through React, TypeScript, Express,
                    and MongoDB. That gives me a broader view of how application
                    delivery decisions and infrastructure decisions affect each other.
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
              <p className={finePrintClass}>Current focus</p>
              <h2 className={headingClasses.card}>
                Delivery engineering with a wider software perspective.
              </h2>
              <p className={bodyClass}>{profile.intro}</p>
            </SurfaceCard>

            <SurfaceCard className="flex flex-col gap-5" tone="subdued">
              <p className={finePrintClass}>Certifications</p>
              <ul className="grid gap-3">
                {profile.certifications.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
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
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <SurfaceCard className="flex flex-col gap-8">
            <div className="space-y-4">
              <Eyebrow>Experience</Eyebrow>
              <h2 className={headingClasses.section}>
                Experience in sequence, with the delivery context still visible.
              </h2>
            </div>

            <div className="grid gap-6">
              {profile.timeline.map((item) => (
                <div
                  className="border-l border-slate-200/80 pl-5"
                  key={`${item.title}-${item.period}`}
                >
                  <p className={finePrintClass}>{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-ink">
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
                  className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5"
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
