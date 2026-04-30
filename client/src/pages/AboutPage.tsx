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
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/resume" target="_blank" rel="noreferrer">
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
            <SurfaceCard className="flex flex-col gap-5" tone="subdued">
              <p className={finePrintClass}>Certifications</p>
              <ul className="grid gap-3">
                {profile.certifications.map((item) => {
                  const url = certificationLinks[item]
                  return (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warm" />
                      {url ? (
                        <a className={bodyClass} href={url} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                          {item}
                        </a>
                      ) : (
                        <span className={bodyClass}>{item}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </SurfaceCard>
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal">
          <SurfaceCard className="flex flex-col gap-6" tone="subdued">
            <div className="space-y-4">
              <Eyebrow>Core strengths</Eyebrow>
              <h2 className={headingClasses.card}>Where I add the most leverage.</h2>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
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
