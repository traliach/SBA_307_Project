import { ProjectCaseStudyCard } from '../components/site/ProjectCaseStudyCard'
import { ButtonLink, PageIntro, SiteSection, SurfaceCard } from '../components/site/ui'
import { bodyClass, finePrintClass } from '../components/site/styles'
import type { ProjectSummary } from '../types/site'

interface ProjectsPageProps {
  projects: ProjectSummary[]
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const orderedProjects = [...projects].sort((left, right) => {
    if (left.featured === right.featured) {
      return 0
    }

    return left.featured ? -1 : 1
  })

  const featuredProjects = orderedProjects.filter((project) => project.featured)
  const additionalProjects = orderedProjects.filter((project) => !project.featured)

  return (
    <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <PageIntro
          description="These case studies stay grounded in the delivery problem, the implementation choices, and the practical operating result."
          eyebrow="Projects"
          size="page"
          title="Project work presented with the delivery context still intact."
        />

        <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
          <p className={finePrintClass}>What these cards emphasize</p>
          <ul className="grid gap-3">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
              <span className={bodyClass}>Delivery workflow and environment context.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
              <span className={bodyClass}>Tooling choices that shaped the work.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
              <span className={bodyClass}>Operational improvements without padded metrics.</span>
            </li>
          </ul>
        </SurfaceCard>
      </div>

      {featuredProjects.length ? (
        <div className="mt-10 grid gap-6">
          {featuredProjects.map((project) => (
            <ProjectCaseStudyCard key={project.title} layout="full" project={project} />
          ))}
        </div>
      ) : null}

      {additionalProjects.length ? (
        <div className="mt-12 space-y-6">
          <PageIntro
            description="Additional project work that reinforces the same strengths in automation, platform support, and operational clarity."
            eyebrow="Additional work"
            size="section"
            title="More platform and workflow delivery work."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {additionalProjects.map((project) => (
              <ProjectCaseStudyCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-12 flex flex-wrap gap-3">
        <ButtonLink href="/contact">Discuss a role or project</ButtonLink>
        <ButtonLink download href="/ali-achille-traore-resume.txt" variant="secondary">
          Download resume
        </ButtonLink>
      </div>
    </SiteSection>
  )
}
