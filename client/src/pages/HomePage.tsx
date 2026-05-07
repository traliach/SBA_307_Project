import { lazy, Suspense } from 'react'
import { ApiStatusBadge } from '../components/site/ApiStatusBadge'
import { JsonLd } from '../components/site/JsonLd'
import { ProjectCaseStudyCard } from '../components/site/ProjectCaseStudyCard'
import { FeaturedCaseStudy } from '../components/work/FeaturedCaseStudy'
import {
  ButtonLink,
  CtaBand,
  Eyebrow,
  KpiStrip,
  PageIntro,
  SiteSection,
  SurfaceCard,
  TrustChips,
} from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
} from '../components/site/styles'
import type {
  ApiHealth,
  ApiState,
  ProfileContent,
  ProjectSummary,
  Testimonial,
} from '../types/site'
import { createPersonJsonLd } from '../utils/seo'

const HeroOpsVisual = lazy(() => import('../components/home/HeroOpsVisual'))

interface HomePageProps {
  apiState: ApiState
  health: ApiHealth | null
  profile: ProfileContent
  projects: ProjectSummary[]
  testimonials: Testimonial[]
}

const TRUST_ITEMS = [
  'Terraform',
  'Docker',
  'Kubernetes',
  'GitHub Actions',
  'AWS',
  'ArgoCD',
  'Prometheus',
  'TypeScript',
]

const FEATURED_PROJECT_TITLES = [
  'cloud_resume_infra — AWS Resume Platform',
  'k8s-platform-lab — Self-Hosted Kubernetes Platform',
  'devops_platform — Self-Hosted DevOps Platform',
]

const PROOF_ITEMS = [
  {
    label: 'Cloud foundation',
    value: 'Terraform + AWS',
    detail: 'Infrastructure workflows documented through live portfolio labs.',
  },
  {
    label: 'Release systems',
    value: 'CI/CD gates',
    detail: 'Build, validation, audit, and deploy checks treated as product quality.',
  },
  {
    label: 'Platform operations',
    value: 'GitOps + SLOs',
    detail: 'Kubernetes and observability work shown through project proof.',
  },
  {
    label: 'Application delivery',
    value: 'React + Node',
    detail: 'Full-stack systems shipped with API, auth, data, and deployment paths.',
  },
]

const CAPABILITIES = [
  {
    title: 'Platform engineering',
    summary: 'Design the internal delivery path so teams can deploy, observe, and recover with less guesswork.',
    tools: ['Kubernetes', 'GitOps', 'SLOs'],
  },
  {
    title: 'CI/CD modernization',
    summary: 'Turn fragile manual release steps into reviewed, repeatable pipelines with useful quality gates.',
    tools: ['GitHub Actions', 'Jenkins', 'Audit gates'],
  },
  {
    title: 'Cloud infrastructure',
    summary: 'Build AWS foundations with clear network, compute, IAM, and environment boundaries.',
    tools: ['AWS', 'Terraform', 'IAM'],
  },
  {
    title: 'Kubernetes enablement',
    summary: 'Make container platforms easier to deploy, monitor, and hand off without hiding the operational details.',
    tools: ['EKS', 'k3s', 'Helm'],
  },
  {
    title: 'Cloud cost control',
    summary: 'Review resource shape, automation, and environment usage before cost problems become permanent habits.',
    tools: ['FinOps', 'Rightsizing', 'Cost review'],
  },
  {
    title: 'Observability',
    summary: 'Add the signals teams need for triage: metrics, logs, health checks, and deploy visibility.',
    tools: ['Prometheus', 'Grafana', 'CloudWatch'],
  },
  {
    title: 'Full-stack delivery',
    summary: 'Ship React and Node applications with deployment, API, data, and operational paths considered together.',
    tools: ['React', 'Express', 'MongoDB'],
  },
]

const WORKFLOW_STEPS = [
  {
    title: 'Assess',
    detail: 'Map release friction, cloud posture, failure modes, and handoff gaps.',
  },
  {
    title: 'Design',
    detail: 'Choose the shortest architecture path that improves reliability without creating ceremony.',
  },
  {
    title: 'Automate',
    detail: 'Codify infrastructure, pipelines, checks, and repeatable operational steps.',
  },
  {
    title: 'Harden',
    detail: 'Add security, rollback, observability, and documentation where the system needs it.',
  },
  {
    title: 'Operate',
    detail: 'Leave teams with clear signals, runbooks, and a platform they can keep improving.',
  },
]

function getFeaturedProjects(projects: ProjectSummary[]) {
  return FEATURED_PROJECT_TITLES
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is ProjectSummary => project !== undefined)
}

export function HomePage({
  apiState,
  health,
  profile,
  projects,
}: HomePageProps) {
  const featuredProjects = getFeaturedProjects(projects)
  const primaryFeaturedProject = featuredProjects[0]
  const supportingFeaturedProjects = featuredProjects.slice(1)

  return (
    <>
      <JsonLd data={createPersonJsonLd(profile)} />

      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)] lg:items-center">
          <div className="min-w-0 space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>{profile.location}</Eyebrow>
              <span className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-muted">
                {profile.currentEmployer ?? 'Teledyne Technologies Inc'}
              </span>
              <ApiStatusBadge health={health} state={apiState} />
            </div>

            <div className="space-y-5">
              <h1 className={headingClasses.display}>
                Build safer releases, stronger cloud foundations, and fewer
                production surprises.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
                DevOps Engineer and full-stack builder focused on CI/CD,
                infrastructure automation, Kubernetes operations, observability,
                and production React/Node systems.
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href="/work">
                View work
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
              <ButtonLink
                className="w-full sm:w-auto"
                href={profile.links.resume}
                rel="noreferrer"
                target="_blank"
                variant="ghost"
              >
                Resume
              </ButtonLink>
            </div>

            <TrustChips items={TRUST_ITEMS} />
          </div>

          <Suspense
            fallback={
              <SurfaceCard className="min-h-[420px] animate-pulse" tone="accent">
                <p className={finePrintClass}>Loading release visual</p>
              </SurfaceCard>
            }
          >
            <HeroOpsVisual />
          </Suspense>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <KpiStrip className="reveal" items={PROOF_ITEMS} />
      </SiteSection>

      <SiteSection>
        <div className="reveal grid gap-8">
          <PageIntro
            description="Capability areas are framed around practical reliability outcomes: clearer releases, repeatable environments, safer handoffs, and production systems that are easier to troubleshoot."
            eyebrow="Capabilities"
            size="section"
            title="DevOps support for the systems teams depend on."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <SurfaceCard
                className="flex h-full flex-col gap-5 transition duration-200 hover:border-accent/40 hover:shadow-card-hover"
                key={capability.title}
                padding="compact"
              >
                <div className="space-y-3">
                  <p className={finePrintClass}>Capability</p>
                  <h2 className={headingClasses.card}>{capability.title}</h2>
                  <p className={bodyClass}>{capability.summary}</p>
                </div>
                <TrustChips className="mt-auto" items={capability.tools} />
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection>
        <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <PageIntro
            description="Selected projects show the implementation shape behind the positioning: IaC, CI/CD, Kubernetes, observability, and application delivery."
            eyebrow="Selected work"
            size="section"
            title="Project proof with real delivery systems."
          />

          <SurfaceCard className="flex flex-col gap-3" padding="compact" tone="subdued">
            <p className={finePrintClass}>Proof standard</p>
            <p className={bodyClass}>
              Claims are tied to live projects, repositories, architecture choices,
              or documented operational checks.
            </p>
          </SurfaceCard>
        </div>

        {primaryFeaturedProject ? (
          <div className="reveal stagger-2 mt-8 grid gap-6">
            <FeaturedCaseStudy project={primaryFeaturedProject} />

            {supportingFeaturedProjects.length ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {supportingFeaturedProjects.map((project) => (
                  <ProjectCaseStudyCard key={project.title} project={project} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </SiteSection>

      <SiteSection>
        <div className="reveal grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <Eyebrow>How I work</Eyebrow>
            <h2 className={headingClasses.section}>
              Start with the risk, then automate the path out.
            </h2>
            <p className={bodyClass}>
              The goal is not more dashboards or process. It is a clearer
              release path, fewer unclear failures, and systems that are easier
              to operate after the first handoff.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {WORKFLOW_STEPS.map((step, index) => (
              <SurfaceCard className="relative flex flex-col gap-4" key={step.title} padding="compact">
                <span className="font-mono text-sm font-semibold text-accent-deep">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-semibold text-text">
                    {step.title}
                  </h3>
                  <p className={cx(bodyClass, 'text-sm')}>{step.detail}</p>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection>
        <CtaBand
          actions={
            <>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
              <ButtonLink className="text-white hover:text-white" href="/contact" variant="ghost">
                Talk through current stack
              </ButtonLink>
            </>
          }
          description="Share the release, cloud, reliability, or full-stack delivery problem you are trying to make less fragile."
          title="Need a delivery platform that scales with your team?"
        />
      </SiteSection>
    </>
  )
}
