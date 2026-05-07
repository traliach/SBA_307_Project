import type { ReactNode } from 'react'

export interface BlogArticleSection {
  id: string
  title: string
  body: ReactNode
  code?: {
    language: string
    value: string
  }
}

export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  author: string
  date: string
  tags: string[]
  sections: BlogArticleSection[]
}

export const blogArticles: BlogArticle[] = []

export const blogCategories = [
  'Cloud',
  'CI/CD',
  'Kubernetes',
  'Observability',
  'Full-stack',
] as const

export function findBlogArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug)
}

export function getRelatedBlogArticles(article: BlogArticle) {
  return blogArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      score: candidate.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((item) => item.article)
}
