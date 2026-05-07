import { ProjectCaseStudyCard } from '../components/site/ProjectCaseStudyCard'
import { ButtonLink, PageIntro, SiteSection, SurfaceCard } from '../components/site/ui'
import { bodyClass, finePrintClass } from '../components/site/styles'
import type { ProjectSummary } from '../types/site'

interface ProjectsPageProps {
  projects: ProjectSummary[]
}

const FEATURED_ORDER = [
  'cloud_resume_infra — AWS Resume Platform',
  'k8s-platform-lab — Self-Hosted Kubernetes Platform',
]

const SECONDARY_ORDER = [
  'devops_platform — Self-Hosted DevOps Platform',
  'Restaurant Deals — MERN Marketplace',
  'achille.tech — Developer Portfolio',
  'Global PACS — Hybrid Cloud Medical Imaging',
  'Mercedes-Benz DMS — Pipeline Modernization',
]

function orderBy(projects: ProjectSummary[], order: string[]): ProjectSummary[] {
  return order
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is ProjectSummary => project !== undefined)
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const featuredProjects = orderBy(projects, FEATURED_ORDER)
  const secondaryProjects = orderBy(projects, SECONDARY_ORDER)

  return (
    <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
      <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
        <PageIntro
          description="A focused set of AWS, Kubernetes, CI/CD, and full-stack delivery work, presented with compact proof and clear outcomes."
          eyebrow="Projects"
          size="page"
          title="Selected work with clear delivery outcomes."
        />

        <SurfaceCard className="flex flex-col gap-3" padding="compact" tone="subdued">
          <p className={finePrintClass}>Featured focus</p>
          <p className={bodyClass}>
            Serverless AWS resume infrastructure and k8s-platform-lab.
          </p>
        </SurfaceCard>
      </div>

      <div className="reveal stagger-2 mt-10 grid gap-5">
        {featuredProjects.length ? (
          <ProjectCaseStudyCard layout="full" project={featuredProjects[0]} />
        ) : null}

        {featuredProjects.slice(1).map((project) => (
          <ProjectCaseStudyCard key={project.title} layout="full" project={project} />
        ))}
      </div>

      {secondaryProjects.length ? (
        <div className="reveal mt-14 space-y-6">
          <PageIntro
            description="Additional work remains available for deeper review without competing with the homepage narrative."
            eyebrow="Additional work"
            size="section"
            title="More delivery context."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {secondaryProjects.map((project) => (
              <ProjectCaseStudyCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10 grid gap-3 sm:flex sm:flex-wrap">
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
    </SiteSection>
  )
}
