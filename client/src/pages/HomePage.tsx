import { ApiStatusBadge } from '../components/site/ApiStatusBadge'
import { ProjectCaseStudyCard } from '../components/site/ProjectCaseStudyCard'
import {
  BodyCopy,
  ButtonLink,
  Eyebrow,
  PageIntro,
  SiteSection,
  SurfaceCard,
  Tag,
  TextLink,
} from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
} from '../components/site/styles'
import { highlightMetrics, nextBuildSteps } from '../features/portfolio/content'
import type {
  ApiHealth,
  ApiState,
  ProfileContent,
  ProjectSummary,
  Testimonial,
} from '../types/site'

interface HomePageProps {
  apiState: ApiState
  health: ApiHealth | null
  profile: ProfileContent
  projects: ProjectSummary[]
  testimonials: Testimonial[]
}

const coreFocus = [
  'CI/CD and release engineering',
  'Infrastructure automation',
  'Cloud operations',
  'Platform reliability',
  'Full-stack application development',
]

export function HomePage({
  apiState,
  health,
  profile,
  projects,
  testimonials,
}: HomePageProps) {
  const featuredProjects = projects.filter((project) => project.featured)
  const leadProject = featuredProjects[0] ?? projects[0]
  const supportingProjects = projects
    .filter((project) => project.title !== leadProject?.title)
    .slice(0, 2)
  const visibleTestimonials = testimonials.slice(0, 3)
  const emailLabel = profile.links.email.replace(/^mailto:/, '')

  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
          <SurfaceCard
            className="relative overflow-hidden"
            padding="roomy"
            tone="accent"
          >
            <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top_right,rgba(31,79,132,0.16),transparent_55%)]" />

            <div className="relative flex h-full flex-col gap-8">
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{profile.location}</Eyebrow>
                <ApiStatusBadge health={health} state={apiState} />
              </div>

              <div className="space-y-6">
                <h1
                  className={cx(
                    headingClasses.display,
                    'max-w-[10ch] text-[clamp(2.35rem,4.2vw,4rem)] leading-[0.99] tracking-[-0.045em]',
                  )}
                >
                  DevOps engineer for teams that need cleaner delivery, stronger
                  automation, and steadier production support.
                </h1>

                <p className="max-w-3xl text-[1.08rem] leading-8 text-slate-700 sm:text-[1.12rem]">
                  {profile.summary}
                </p>

                <BodyCopy className="max-w-3xl">{profile.intro}</BodyCopy>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink download href={profile.links.resume}>
                  Download resume
                </ButtonLink>
                <ButtonLink href="/projects" variant="secondary">
                  View projects
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Contact me
                </ButtonLink>
              </div>

              <div className="grid gap-4 border-t border-slate-200/80 pt-6 sm:grid-cols-2 xl:grid-cols-4">
                {highlightMetrics.map((item) => (
                  <div
                    className="rounded-[24px] border border-slate-200/80 bg-white/[0.78] p-4"
                    key={item.label}
                  >
                    <p className={finePrintClass}>{item.label}</p>
                    <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-ink">
                      {item.value}
                    </p>
                    <p className={cx(bodyClass, 'mt-2 text-sm')}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>

          <div className="grid gap-6">
            <SurfaceCard className="flex flex-col gap-6">
              <div className="space-y-3">
                <Eyebrow>What teams rely on</Eyebrow>
                <h2 className={headingClasses.card}>
                  Structured delivery work across cloud, pipelines, and production
                  support.
                </h2>
              </div>

              <ul className="grid gap-3">
                {profile.strengths.slice(0, 4).map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className={bodyClass}>{item}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>

            <SurfaceCard className="flex flex-col gap-6" tone="subdued">
              <div className="space-y-3">
                <Eyebrow>Credentials</Eyebrow>
                <h2 className={headingClasses.card}>
                  AWS-certified with delivery experience across AWS, Azure, and GCP.
                </h2>
              </div>

              <ul className="grid gap-3">
                {profile.certifications.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className={bodyClass}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2.5">
                {coreFocus.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="flex flex-col gap-4" padding="compact">
              <p className={finePrintClass}>Current build focus</p>
              <ul className="grid gap-3">
                {nextBuildSteps.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className={bodyClass}>{item}</span>
                  </li>
                ))}
              </ul>
              <p className={metaClass}>{profile.availability}</p>
            </SurfaceCard>
          </div>
        </div>
      </SiteSection>

      <SiteSection>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <PageIntro
            description="These summaries stay close to the real work: deployment workflows, infrastructure automation, containers, troubleshooting, and the operating result."
            eyebrow="Selected work"
            size="section"
            title="Delivery work with a clear technical story."
          />

          <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
            <p className={finePrintClass}>What this highlights</p>
            <ul className="grid gap-3">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                <span className={bodyClass}>How the delivery problem was framed.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                <span className={bodyClass}>Which tools were used and why they mattered.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                <span className={bodyClass}>The operational result without inflated claims.</span>
              </li>
            </ul>
          </SurfaceCard>
        </div>

        <div className="mt-10 grid gap-6">
          {leadProject ? <ProjectCaseStudyCard layout="full" project={leadProject} /> : null}

          {supportingProjects.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {supportingProjects.map((project) => (
                <ProjectCaseStudyCard key={project.title} project={project} />
              ))}
            </div>
          ) : null}
        </div>
      </SiteSection>

      <SiteSection>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <SurfaceCard className="flex flex-col gap-8">
            <div className="space-y-4">
              <Eyebrow>Feedback</Eyebrow>
              <h2 className={headingClasses.section}>
                What collaborators tend to mention first.
              </h2>
              <BodyCopy className="max-w-2xl">
                The recurring themes are structured delivery work, calm production
                support, and communication that stays useful when releases get messy.
              </BodyCopy>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {visibleTestimonials.map((testimonial, index) => (
                <blockquote
                  className={cx(
                    'rounded-[26px] border border-slate-200/80 bg-slate-50/[0.78] p-6',
                    index === 0 && 'lg:row-span-2',
                  )}
                  key={testimonial.quote}
                >
                  <p className="text-[1.02rem] leading-8 text-slate-700">
                    "{testimonial.quote}"
                  </p>
                  <footer className="mt-6 space-y-1">
                    <p className="text-sm font-semibold text-ink">{testimonial.author}</p>
                    <p className={metaClass}>
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="flex flex-col justify-between gap-8" tone="subdued">
            <div className="space-y-4">
              <Eyebrow>Contact</Eyebrow>
              <h2 className={headingClasses.card}>
                Reach me for roles, interviews, or delivery conversations.
              </h2>
              <BodyCopy>{profile.availability}</BodyCopy>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5">
                <p className={finePrintClass}>Email</p>
                <a
                  className="mt-2 block text-base font-semibold text-ink transition hover:text-accent-deep"
                  href={profile.links.email}
                >
                  {emailLabel}
                </a>
              </div>

              <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5">
                <p className={finePrintClass}>LinkedIn</p>
                <a
                  className="mt-2 block text-base font-semibold text-ink transition hover:text-accent-deep"
                  href={profile.links.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  linkedin.com/in/ali-achille-traore
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact">Start a conversation</ButtonLink>
              <TextLink href="/about">Read the full profile</TextLink>
            </div>
          </SurfaceCard>
        </div>
      </SiteSection>
    </>
  )
}
