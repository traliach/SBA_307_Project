import type { BlogArticle } from '../content/blog'
import type { ProfileContent, ProjectSummary } from '../types/site'
import { getProjectDisplayTitle, getProjectPath } from './projects'

export const siteUrl = 'https://achille.tech'
export const defaultOgImagePath = '/og-image.png'

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function getDefaultOgImageUrl() {
  return absoluteUrl(defaultOgImagePath)
}

export function createPersonJsonLd(profile: ProfileContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
      addressCountry: 'US',
    },
    email: profile.links.email.replace(/^mailto:/, ''),
    sameAs: [profile.links.github, profile.links.linkedin],
    url: siteUrl,
    knowsAbout: [
      'DevOps',
      'Site Reliability Engineering',
      'AWS',
      'Terraform',
      'Kubernetes',
      'CI/CD',
      'Observability',
      'Full-stack development',
    ],
  }
}

export function createBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function createProjectBreadcrumbJsonLd(project: ProjectSummary) {
  return createBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: getProjectDisplayTitle(project), path: getProjectPath(project) },
  ])
}

export function createArticleJsonLd(article: BlogArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
      url: siteUrl,
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
    image: getDefaultOgImageUrl(),
  }
}
