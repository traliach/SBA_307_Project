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

      {featuredProjects.length ? (
        <div className="reveal stagger-2 mt-10 grid gap-6">
          {featuredProjects.map((project) => (
            <ProjectCaseStudyCard key={project.title} layout="full" project={project} />
          ))}
        </div>
      ) : null}

      {additionalProjects.length ? (
        <div className="reveal stagger-3 mt-14 space-y-6">
          <PageIntro
            description="More examples of automation, platform support, and operational improvement work."
            eyebrow="Additional work"
            size="section"
            title="Further platform and automation projects."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {additionalProjects.map((project) => (
              <ProjectCaseStudyCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-14 flex flex-wrap gap-3">
        <ButtonLink href="/contact">Discuss a role or project</ButtonLink>
        <ButtonLink download href="/ali-achille-traore-resume.txt" variant="secondary">
          Download resume
        </ButtonLink>
      </div>
    </SiteSection>
  )
}
