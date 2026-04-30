import { ProjectCaseStudyCard } from '../components/site/ProjectCaseStudyCard'
import { ButtonLink, PageIntro, SiteSection, SurfaceCard } from '../components/site/ui'
import { bodyClass, finePrintClass } from '../components/site/styles'
import type { ProjectSummary } from '../types/site'

interface ProjectsPageProps {
  projects: ProjectSummary[]
}

const PROFESSIONAL_TITLES = new Set([
  'Enterprise Kubernetes Platform Modernization',
  'AWS Cloud Infrastructure Automation and Optimization',
])

const DEVOPS_TITLES = new Set([
  'cloud_resume_infra — AWS Resume Platform',
  'k8s-platform-lab — Self-Hosted Kubernetes Platform',
  'devops_platform — Self-Hosted DevOps Platform',
  'Global PACS — Hybrid Cloud Medical Imaging',
  'Mercedes-Benz DMS — Pipeline Modernization',
])

const FULLSTACK_TITLES = new Set([
  'Restaurant Deals — MERN Marketplace',
  'achille.tech — Developer Portfolio',
])

const PROFESSIONAL_ORDER = [
  'Enterprise Kubernetes Platform Modernization',
  'AWS Cloud Infrastructure Automation and Optimization',
]

// Preserve intentional display order within each category
const DEVOPS_ORDER = [
  'k8s-platform-lab — Self-Hosted Kubernetes Platform',
  'cloud_resume_infra — AWS Resume Platform',
  'devops_platform — Self-Hosted DevOps Platform',
  'Global PACS — Hybrid Cloud Medical Imaging',
  'Mercedes-Benz DMS — Pipeline Modernization',
]

const FULLSTACK_ORDER = [
  'Restaurant Deals — MERN Marketplace',
  'achille.tech — Developer Portfolio',
]

function orderBy(projects: ProjectSummary[], order: string[]): ProjectSummary[] {
  return order
    .map((title) => projects.find((p) => p.title === title))
    .filter((p): p is ProjectSummary => p !== undefined)
}

function CategorySection({
  eyebrow,
  title,
  description,
  projects,
}: {
  eyebrow: string
  title: string
  description: string
  projects: ProjectSummary[]
}) {
  if (projects.length === 0) return null
  const [lead, ...rest] = projects
  return (
    <div className="reveal stagger-2 mt-14 space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <PageIntro eyebrow={eyebrow} size="section" title={title} description={description} />
      </div>
      <div className="mt-6 grid gap-6">
        <ProjectCaseStudyCard layout="full" project={lead} />
        {rest.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {rest.map((project) => (
              <ProjectCaseStudyCard key={project.title} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const professionalProjects = orderBy(
    projects.filter((p) => PROFESSIONAL_TITLES.has(p.title)),
    PROFESSIONAL_ORDER,
  )
  const devopsProjects = orderBy(
    projects.filter((p) => DEVOPS_TITLES.has(p.title)),
    DEVOPS_ORDER,
  )
  const fullstackProjects = orderBy(
    projects.filter((p) => FULLSTACK_TITLES.has(p.title)),
    FULLSTACK_ORDER,
  )

  return (
    <SiteSection className="pt-12 sm:pt-16 lg:pt-20">
      <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <PageIntro
          description="Each case study covers the challenge, the technical approach, and the operating result."
          eyebrow="Projects"
          size="page"
          title="Engineering work grounded in real delivery outcomes."
        />

        <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
          <p className={finePrintClass}>What to look for</p>
          <ul className="grid gap-3">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span className={bodyClass}>The delivery challenge and environment context.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span className={bodyClass}>Specific tooling decisions and trade-offs.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span className={bodyClass}>Honest, measurable operating improvements.</span>
            </li>
          </ul>
        </SurfaceCard>
      </div>

      <CategorySection
        eyebrow="Professional Work"
        title="Production engineering at scale."
        description="Enterprise infrastructure and platform projects — Kubernetes modernization, cloud automation, and DevOps transformation delivered in professional environments."
        projects={professionalProjects}
      />

      <CategorySection
        eyebrow="DevOps / Cloud / IaC"
        title="Infrastructure, platform, and automation engineering."
        description="Kubernetes platforms, cloud infrastructure as code, CI/CD systems, and observability — projects that demonstrate production-grade DevOps depth."
        projects={devopsProjects}
      />

      <CategorySection
        eyebrow="Full-Stack Applications"
        title="Product delivery from API to UI."
        description="End-to-end application projects spanning REST APIs, React frontends, role-based auth, payments, and AI integration."
        projects={fullstackProjects}
      />

      <div className="mt-14 flex flex-wrap gap-3">
        <ButtonLink href="/contact">Start a conversation</ButtonLink>
        <ButtonLink href="/resume" target="_blank" rel="noreferrer" variant="secondary">
          Download resume
        </ButtonLink>
      </div>
    </SiteSection>
  )
}
