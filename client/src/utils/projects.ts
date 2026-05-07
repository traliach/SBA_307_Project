import type { ProjectSummary } from '../types/site'

export const workFilters = [
  { label: 'All', value: 'all' },
  { label: 'AWS', value: 'aws' },
  { label: 'Kubernetes', value: 'kubernetes' },
  { label: 'CI/CD', value: 'ci-cd' },
  { label: 'Terraform', value: 'terraform' },
  { label: 'Observability', value: 'observability' },
  { label: 'Full-stack', value: 'full-stack' },
] as const

export type WorkFilter = (typeof workFilters)[number]['value']

const PROFESSIONAL_TITLES = new Set([
  'Enterprise Kubernetes Platform Modernization',
  'AWS Cloud Infrastructure Automation and Optimization',
])

export function createProjectSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/—/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getProjectPath(project: ProjectSummary) {
  return `/work/${createProjectSlug(project.title)}`
}

export function getProjectDisplayTitle(project: ProjectSummary) {
  if (project.title === 'cloud_resume_infra — AWS Resume Platform') {
    return 'Serverless Resume Platform on AWS'
  }

  if (project.title === 'k8s-platform-lab — Self-Hosted Kubernetes Platform') {
    return 'Self-Hosted Kubernetes Platform'
  }

  if (project.title === 'devops_platform — Self-Hosted DevOps Platform') {
    return 'Self-Hosted DevOps Platform'
  }

  return project.title
}

export function findProjectBySlug(projects: ProjectSummary[], slug: string) {
  return projects.find((project) => createProjectSlug(project.title) === slug)
}

export function getProjectCategory(project: ProjectSummary): string {
  if (PROFESSIONAL_TITLES.has(project.title)) return 'Professional work'
  if (project.title.includes('cloud_resume')) return 'Cloud resume challenge'
  if (project.title.includes('k8s') || project.title.includes('Kubernetes')) return 'Kubernetes platform'
  if (project.title.includes('devops_platform')) return 'DevOps platform'
  if (project.title.includes('MERN') || project.title.includes('Portfolio')) return 'Full-stack delivery'

  return getProjectDomain(project)
}

export function getProjectDomain(project: ProjectSummary) {
  const text = `${project.title} ${project.summary} ${project.stack.join(' ')}`.toLowerCase()

  if (text.includes('kubernetes') || text.includes('k3s') || text.includes('eks')) {
    return 'Kubernetes'
  }

  if (text.includes('terraform') || text.includes('aws')) {
    return 'Cloud infrastructure'
  }

  if (text.includes('react') || text.includes('full-stack') || text.includes('mern')) {
    return 'Full-stack'
  }

  return 'Delivery systems'
}

export function getProjectTags(project: ProjectSummary) {
  const tags = new Set<string>()
  const text = `${project.title} ${project.summary} ${project.stack.join(' ')}`.toLowerCase()

  if (text.includes('aws') || text.includes('cloudfront') || text.includes('lambda')) {
    tags.add('AWS')
  }
  if (text.includes('kubernetes') || text.includes('k3s') || text.includes('eks')) {
    tags.add('Kubernetes')
  }
  if (text.includes('terraform')) tags.add('Terraform')
  if (text.includes('github actions') || text.includes('jenkins') || text.includes('ci/cd')) {
    tags.add('CI/CD')
  }
  if (text.includes('prometheus') || text.includes('grafana') || text.includes('cloudwatch')) {
    tags.add('Observability')
  }
  if (text.includes('react') || text.includes('node') || text.includes('express')) {
    tags.add('Full-stack')
  }

  return Array.from(tags)
}

export function matchesWorkFilter(project: ProjectSummary, filter: WorkFilter) {
  if (filter === 'all') return true

  const tags = getProjectTags(project).map((tag) =>
    tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
  )

  return tags.some((tag) => tag === filter)
}

export function getRelatedProjects(projects: ProjectSummary[], current: ProjectSummary) {
  const currentTags = new Set(getProjectTags(current))

  return projects
    .filter((project) => project.title !== current.title)
    .map((project) => ({
      project,
      score: getProjectTags(project).filter((tag) => currentTags.has(tag)).length,
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((item) => item.project)
}
