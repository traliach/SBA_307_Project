import { ApiStatusBadge } from '../components/site/ApiStatusBadge'
import { ProjectCaseStudyCard } from '../components/site/ProjectCaseStudyCard'
import {
  BodyCopy,
  ButtonLink,
  Eyebrow,
  PageIntro,
  SiteSection,
  SurfaceCard,
  TextLink,
} from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
} from '../components/site/styles'
import { certificationLinks, highlightMetrics } from '../features/portfolio/content'
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

const FEATURED_PROJECT_TITLES = [
  'cloud_resume_infra — AWS Resume Platform',
  'k8s-platform-lab — Self-Hosted Kubernetes Platform',
]

const serviceFocus = [
  'CI/CD modernization for teams with slow or fragile releases.',
  'AWS infrastructure and Terraform workflows that are easier to repeat.',
  'Kubernetes, GitOps, and observability systems built for production handoffs.',
  'Full-stack React and Node applications with clear deployment paths.',
]

function CertificationGrid({ certifications }: { certifications: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {certifications.map((item) => {
        const url = certificationLinks[item]

        return (
          <a
            className="rounded-lg border border-line/70 bg-white p-4 transition duration-200 hover:border-accent/40 hover:text-accent-deep dark:border-white/[0.08] dark:bg-[#161920]"
            href={url ?? '#'}
            key={item}
            rel={url ? 'noreferrer' : undefined}
            target={url ? '_blank' : undefined}
          >
            <p className={finePrintClass}>Certification</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-ink dark:text-gray-100">
              {item}
            </p>
          </a>
        )
      })}
    </div>
  )
}

export function HomePage({
  apiState,
  health,
  profile,
  projects,
}: HomePageProps) {
  const featuredProjects = FEATURED_PROJECT_TITLES
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is ProjectSummary => project !== undefined)
  const emailLabel = profile.links.email.replace(/^mailto:/, '')

  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-start">
          <div className="min-w-0 space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>{profile.location}</Eyebrow>
              <span className="rounded-md border border-line/70 bg-white px-3 py-1.5 text-xs font-semibold text-muted">
                {profile.currentEmployer ?? 'Teledyne Technologies Inc'}
              </span>
              <ApiStatusBadge health={health} state={apiState} />
            </div>

            <div className="space-y-5">
              <h1 className={headingClasses.display}>
                Ali Achille Traore builds reliable cloud platforms and full-stack
                systems.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg dark:text-gray-400">
                DevOps Engineer at Teledyne Technologies Inc in Newark, NJ, with
                5+ years across AWS, Kubernetes, Terraform, CI/CD, and production
                React/Node applications.
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href="/contact">
                Contact me
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/projects" variant="secondary">
                View selected work
              </ButtonLink>
              <ButtonLink
                className="w-full sm:w-auto"
                href="/resume"
                rel="noreferrer"
                target="_blank"
                variant="ghost"
              >
                Resume
              </ButtonLink>
            </div>

            <div className="grid gap-3 border-t border-line/70 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {highlightMetrics.map((item) => (
                <div className="rounded-lg border border-line/70 bg-white p-4" key={item.label}>
                  <p className={finePrintClass}>{item.label}</p>
                  <p className="mt-2 font-display text-lg font-semibold text-ink dark:text-gray-100">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <SurfaceCard className="flex flex-col gap-5" padding="compact">
              <div className="space-y-3">
                <Eyebrow>Proof</Eyebrow>
                <h2 className={headingClasses.card}>
                  AWS-certified delivery across cloud, pipelines, and production
                  support.
                </h2>
              </div>
              <CertificationGrid certifications={profile.certifications} />
            </SurfaceCard>

            <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
              <p className={finePrintClass}>Current focus</p>
              <ul className="grid gap-3">
                {serviceFocus.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span className={bodyClass}>{item}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          </div>
        </div>
      </SiteSection>

      <SiteSection>
        <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <PageIntro
            description="Focused infrastructure projects that show Terraform, Lambda/DynamoDB, Kubernetes, GitOps, CI validation, and operational checks."
            eyebrow="Selected work"
            size="section"
            title="DevOps projects with clear infrastructure proof."
          />

          <SurfaceCard className="flex flex-col gap-3" padding="compact" tone="subdued">
            <p className={finePrintClass}>Priority</p>
            <p className={bodyClass}>
              Serverless AWS resume infrastructure and a self-hosted Kubernetes
              platform are the homepage focus.
            </p>
          </SurfaceCard>
        </div>

        <div className="reveal stagger-2 mt-8 grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCaseStudyCard key={project.title} project={project} />
          ))}
        </div>
      </SiteSection>

      <SiteSection>
        <div className="reveal grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <SurfaceCard className="flex flex-col gap-5" tone="warm">
            <div className="space-y-4">
              <Eyebrow>About</Eyebrow>
              <h2 className={headingClasses.section}>
                Practical DevOps work across infrastructure, delivery, and support.
              </h2>
              <BodyCopy>
                I focus on the parts of engineering that need to keep working
                after handoff: repeatable infrastructure, reliable pipelines,
                useful monitoring, and clear production operations.
              </BodyCopy>
            </div>
            <TextLink href="/about">Read the full profile</TextLink>
          </SurfaceCard>

          <SurfaceCard className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <Eyebrow>Contact</Eyebrow>
              <h2 className={headingClasses.section}>
                Reach out for roles, interviews, or delivery work.
              </h2>
              <p className={cx(bodyClass, 'max-w-2xl')}>
                I am open to DevOps and platform engineering roles, cloud
                modernization work, and full-stack projects where reliability and
                clear handoffs matter.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-line/70 bg-surface-tinted p-4">
                <p className={finePrintClass}>Email</p>
                <a
                  className="mt-2 block break-words text-sm font-semibold text-ink transition hover:text-accent-deep"
                  href={profile.links.email}
                >
                  {emailLabel}
                </a>
              </div>
              <div className="rounded-lg border border-line/70 bg-surface-tinted p-4">
                <p className={finePrintClass}>LinkedIn</p>
                <a
                  className="mt-2 block break-words text-sm font-semibold text-ink transition hover:text-accent-deep"
                  href={profile.links.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  {profile.links.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href="/contact">
                Start a conversation
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
        </div>
      </SiteSection>
    </>
  )
}
