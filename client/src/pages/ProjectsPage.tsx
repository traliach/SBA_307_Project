import { ProjectsSection } from '../components/home/ProjectsSection'
import type { ProjectSummary } from '../types/site'

interface ProjectsPageProps {
  projects: ProjectSummary[]
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  return <ProjectsSection projects={projects} />
}
