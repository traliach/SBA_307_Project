import { useEffect } from 'react'
import { contactItems, contactTopics } from '../features/portfolio/content'
import { findBlogArticleBySlug } from '../content/blog'
import { optionalRoutes } from '../content/routeFlags'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useVisitorCounter } from '../hooks/useVisitorCounter'
import { PortfolioHeader } from '../components/home/PortfolioHeader'
import { ScrollProgressBar } from '../components/site/ScrollProgressBar'
import { siteContainerClass } from '../components/site/styles'
import { AboutPage } from './AboutPage'
import { BlogDetailPage } from './BlogDetailPage'
import { BlogIndexPage } from './BlogIndexPage'
import { ContactPage } from './ContactPage'
import { ComponentPreviewPage } from './ComponentPreviewPage'
import { HomePage } from './HomePage'
import { NotFoundPage } from './NotFoundPage'
import { PortalPreviewPage } from './PortalPreviewPage'
import { PrivacyPage } from './PrivacyPage'
import { ServicesPage } from './ServicesPage'
import { SkillsPage } from './SkillsPage'
import { TermsPage } from './TermsPage'
import { WorkDetailPage } from './WorkDetailPage'
import { WorkIndexPage } from './WorkIndexPage'
import { findProjectBySlug, getProjectDisplayTitle } from '../utils/projects'
import { absoluteUrl, getDefaultOgImageUrl } from '../utils/seo'
import type { ProjectSummary } from '../types/site'

interface RouteMetadata {
  title: string
  description: string
  path: string
  image?: string
  robots?: string
  type?: 'website' | 'article'
}

const pageMetadata = {
  '/': {
    title: 'Ali Achille Traore | DevOps Engineer and Full-Stack Developer',
    description:
      'Portfolio for Ali Achille Traore, focused on DevOps engineering, AWS cloud infrastructure, CI/CD, Kubernetes, and full-stack delivery.',
    path: '/',
  },
  '/about': {
    title: 'About | Ali Achille Traore',
    description:
      'Background, strengths, timeline, and engineering focus for Ali Achille Traore.',
    path: '/about',
  },
  '/services': {
    title: 'Services | Ali Achille Traore',
    description:
      'DevOps consulting services for cloud foundations, CI/CD modernization, Terraform, Kubernetes, observability, security, and full-stack delivery.',
    path: '/services',
  },
  '/work': {
    title: 'Work | Ali Achille Traore',
    description:
      'Case studies covering AWS infrastructure, Kubernetes platforms, CI/CD modernization, observability, and full-stack delivery.',
    path: '/work',
  },
  '/projects': {
    title: 'Work | Ali Achille Traore',
    description:
      'Case studies covering cloud delivery, CI/CD, infrastructure automation, and platform reliability.',
    path: '/work',
  },
  '/skills': {
    title: 'Skills | Ali Achille Traore',
    description:
      'Curated technical skills across cloud platforms, automation, infrastructure as code, and full-stack application work.',
    path: '/skills',
  },
  '/contact': {
    title: 'Contact | Ali Achille Traore',
    description:
      'Contact Ali Achille Traore for DevOps roles, cloud delivery work, freelance projects, and engineering conversations.',
    path: '/contact',
  },
  '/blog': {
    title: 'Blog | Ali Achille Traore',
    description:
      'Hidden article index template for future DevOps, cloud, Kubernetes, observability, and full-stack engineering notes.',
    path: '/blog',
    robots: 'noindex,follow',
  },
  '/portal': {
    title: 'Client Portal Preview | Ali Achille Traore',
    description:
      'Hidden coming-soon preview for a future client portal with static delivery workspace mock data.',
    path: '/portal',
    robots: 'noindex,follow',
  },
  '/privacy': {
    title: 'Privacy | Ali Achille Traore',
    description:
      'Privacy policy for the achille.tech portfolio contact forms and submitted information.',
    path: '/privacy',
  },
  '/terms': {
    title: 'Terms | Ali Achille Traore',
    description:
      'Terms of use for the achille.tech portfolio, project information, and contact forms.',
    path: '/terms',
  },
  '/404': {
    title: 'Page Not Found | Ali Achille Traore',
    description: 'The requested achille.tech portfolio page was not found.',
    path: '/404',
    robots: 'noindex,follow',
  },
} satisfies Record<string, RouteMetadata>

const optionalFooterLinks = optionalRoutes
  .filter((route) => route.enabled)
  .map((route) => ({ href: route.href, label: route.label }))

const footerSections = [
  {
    title: 'Capabilities',
    links: [
      { href: '/services#devops-consulting', label: 'DevOps consulting' },
      { href: '/services#ci-cd-modernization', label: 'CI/CD modernization' },
      { href: '/services#terraform-iac', label: 'Terraform IaC' },
      { href: '/services#kubernetes-enablement', label: 'Kubernetes enablement' },
    ],
  },
  {
    title: 'Portfolio',
    links: [
      { href: '/work', label: 'Work' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/skills', label: 'Stack archive' },
      ...optionalFooterLinks,
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
] as const

function getMetadata(currentPath: string, projects: ProjectSummary[]): RouteMetadata {
  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.replace('/blog/', '')
    const article = findBlogArticleBySlug(slug)

    if (article) {
      return {
        title: `${article.title} | Blog | Ali Achille Traore`,
        description: article.excerpt,
        path: `/blog/${article.slug}`,
        robots: 'index,follow',
        type: 'article',
      }
    }

    return {
      title: 'Article Not Found | Ali Achille Traore',
      description: 'The requested achille.tech article was not found.',
      path: currentPath,
      robots: 'noindex,follow',
    }
  }

  if (currentPath.startsWith('/work/')) {
    const slug = currentPath.replace('/work/', '')
    const project = findProjectBySlug(projects, slug)

    if (project) {
      return {
        title: `${getProjectDisplayTitle(project)} | Work | Ali Achille Traore`,
        description: project.summary,
        path: currentPath,
        robots: 'index,follow',
      }
    }

    return {
      title: 'Project Not Found | Ali Achille Traore',
      description: 'The requested achille.tech project case study was not found.',
      path: currentPath,
      robots: 'noindex,follow',
    }
  }

  return pageMetadata[currentPath as keyof typeof pageMetadata] ?? {
    title: 'Ali Achille Traore | Portfolio',
    description:
      'Portfolio for Ali Achille Traore covering DevOps, cloud delivery, and full-stack engineering.',
    path: currentPath,
    robots: 'noindex,follow',
  }
}

function ensureMeta(attribute: 'name' | 'property', value: string) {
  let meta = document.querySelector(`meta[${attribute}="${value}"]`)

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, value)
    document.head.appendChild(meta)
  }

  return meta
}

function setMeta(attribute: 'name' | 'property', value: string, content: string) {
  ensureMeta(attribute, value).setAttribute('content', content)
}

function setCanonical(url: string) {
  let canonical = document.querySelector('link[rel="canonical"]')

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }

  canonical.setAttribute('href', url)
}

function updateMetadata(currentPath: string, projects: ProjectSummary[]) {
  const metadata = getMetadata(currentPath, projects)
  const canonicalUrl = absoluteUrl(metadata.path)
  const imageUrl = metadata.image ? absoluteUrl(metadata.image) : getDefaultOgImageUrl()
  const robots = metadata.robots ?? 'index,follow'
  const type = metadata.type ?? 'website'

  document.title = metadata.title

  setCanonical(canonicalUrl)
  setMeta('name', 'description', metadata.description)
  setMeta('name', 'robots', robots)
  setMeta('property', 'og:type', type)
  setMeta('property', 'og:url', canonicalUrl)
  setMeta('property', 'og:title', metadata.title)
  setMeta('property', 'og:description', metadata.description)
  setMeta('property', 'og:image', imageUrl)
  setMeta('property', 'og:image:alt', 'Ali Achille Traore portfolio preview')
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:url', canonicalUrl)
  setMeta('name', 'twitter:title', metadata.title)
  setMeta('name', 'twitter:description', metadata.description)
  setMeta('name', 'twitter:image', imageUrl)
  setMeta('name', 'twitter:image:alt', 'Ali Achille Traore portfolio preview')
}

export function PublicSite() {
  const portfolio = usePortfolioData()
  const revealRef = useScrollReveal()
  const visitorCount = useVisitorCounter()
  const currentPath =
    window.location.pathname === '/'
      ? '/'
      : window.location.pathname.replace(/\/+$/, '')

  useEffect(() => {
    updateMetadata(currentPath, portfolio.projects)
  }, [currentPath, portfolio.projects])

  function renderPage() {
    if (currentPath.startsWith('/blog/')) {
      return <BlogDetailPage slug={currentPath.replace('/blog/', '')} />
    }

    if (currentPath.startsWith('/work/')) {
      return (
        <WorkDetailPage
          projects={portfolio.projects}
          slug={currentPath.replace('/work/', '')}
        />
      )
    }

    switch (currentPath) {
      case '/':
        return (
          <HomePage
            apiState={portfolio.apiState}
            health={portfolio.health}
            profile={portfolio.profile}
            projects={portfolio.projects}
            testimonials={portfolio.testimonials}
          />
        )
      case '/about':
        return <AboutPage profile={portfolio.profile} />
      case '/services':
        return <ServicesPage />
      case '/work':
      case '/projects':
        return <WorkIndexPage projects={portfolio.projects} />
      case '/skills':
        return <SkillsPage skills={portfolio.skills} />
      case '/contact':
        return (
          <ContactPage
            contactForm={portfolio.contactForm}
            contactItems={contactItems}
            contactTopics={contactTopics}
            onChange={portfolio.handleContactChange}
            onSubmit={portfolio.handleContactSubmit}
            onTestimonialChange={portfolio.handleTestimonialChange}
            onTestimonialSubmit={portfolio.handleTestimonialSubmit}
            profile={portfolio.profile}
            submitMessage={portfolio.submitMessage}
            submitState={portfolio.submitState}
            testimonialForm={portfolio.testimonialForm}
            testimonialSubmitMessage={portfolio.testimonialSubmitMessage}
            testimonialSubmitState={portfolio.testimonialSubmitState}
          />
        )
      case '/blog':
        return <BlogIndexPage />
      case '/portal':
        return <PortalPreviewPage />
      case '/privacy':
        return <PrivacyPage />
      case '/terms':
        return <TermsPage />
      case '/404':
        return <NotFoundPage />
      case '/_dev/components':
        return import.meta.env.DEV ? <ComponentPreviewPage /> : <NotFoundPage />
      default:
        return <NotFoundPage />
    }
  }

  return (
    <div className="app-shell" ref={revealRef}>
      <a
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Skip to main content
      </a>
      <ScrollProgressBar />
      <PortfolioHeader
        currentPath={currentPath}
        links={portfolio.profile.links}
        name={portfolio.profile.name}
        title={portfolio.profile.title}
      />

      <main className="pb-12 sm:pb-16" id="main-content" tabIndex={-1}>
        {renderPage()}
      </main>

      <footer className="footer">
        <div className={siteContainerClass}>
          <div className="grid gap-8 py-8 sm:py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-normal text-text-muted">
                {portfolio.profile.name}
              </p>
              <p className="font-display text-lg font-semibold tracking-normal text-text sm:text-xl">
                {portfolio.profile.title}
              </p>
              <p className="max-w-2xl text-sm leading-7 text-text-muted">
                {portfolio.profile.summary}
              </p>
              <p className="max-w-2xl text-sm font-semibold leading-7 text-text">
                Open to senior DevOps and SRE roles.
              </p>
              {visitorCount != null && (
                <p className="text-[0.72rem] font-semibold uppercase tracking-normal text-text-muted">
                  {visitorCount.toLocaleString()} portfolio visits
                </p>
              )}

              <div className="flex items-center gap-3">
                <a
                  aria-label="Email"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent/40 hover:text-accent-deep"
                  href={portfolio.profile.links.email}
                >
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </a>
                <a
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent/40 hover:text-accent-deep"
                  href={portfolio.profile.links.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a
                  aria-label="GitHub"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent/40 hover:text-accent-deep"
                  href={portfolio.profile.links.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {footerSections.map((section) => (
                <nav aria-label={section.title} className="space-y-3" key={section.title}>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-normal text-text-muted">
                    {section.title}
                  </p>
                  <div className="grid gap-2">
                    {section.links.map((link) => (
                      <a
                        className="text-sm font-medium leading-6 text-text-muted transition hover:text-accent-deep"
                        href={link.href}
                        key={link.href}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
