import { useEffect } from 'react'
import { contactItems, contactTopics } from '../features/portfolio/content'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { PortfolioHeader } from '../components/home/PortfolioHeader'
import { siteContainerClass } from '../components/site/styles'
import { AboutPage } from './AboutPage'
import { ContactPage } from './ContactPage'
import { HomePage } from './HomePage'
import { NotFoundPage } from './NotFoundPage'
import { ProjectsPage } from './ProjectsPage'
import { SkillsPage } from './SkillsPage'

const pageMetadata = {
  '/': {
    title: 'Ali Achille Traore | DevOps Engineer',
    description:
      'Portfolio for Ali Achille Traore, focused on DevOps, cloud infrastructure, CI/CD, and modern full-stack engineering.',
  },
  '/about': {
    title: 'About | Ali Achille Traore',
    description:
      'Background, strengths, timeline, and engineering focus for Ali Achille Traore.',
  },
  '/projects': {
    title: 'Projects | Ali Achille Traore',
    description:
      'Project case studies covering cloud delivery, CI/CD, infrastructure automation, and platform reliability.',
  },
  '/skills': {
    title: 'Skills | Ali Achille Traore',
    description:
      'Curated technical skills across cloud platforms, automation, infrastructure as code, and full-stack application work.',
  },
  '/contact': {
    title: 'Contact | Ali Achille Traore',
    description:
      'Contact Ali Achille Traore for DevOps roles, cloud delivery work, and engineering conversations.',
  },
} as const

function updateMetadata(currentPath: string) {
  const metadata = pageMetadata[currentPath as keyof typeof pageMetadata] ?? {
    title: 'Ali Achille Traore | Portfolio',
    description:
      'Portfolio for Ali Achille Traore covering DevOps, cloud delivery, and full-stack engineering.',
  }

  document.title = metadata.title

  const description = document.querySelector('meta[name="description"]')
  description?.setAttribute('content', metadata.description)

  const ogTitle = document.querySelector('meta[property="og:title"]')
  ogTitle?.setAttribute('content', metadata.title)

  const ogDescription = document.querySelector('meta[property="og:description"]')
  ogDescription?.setAttribute('content', metadata.description)

  const twitterTitle = document.querySelector('meta[name="twitter:title"]')
  twitterTitle?.setAttribute('content', metadata.title)

  const twitterDescription = document.querySelector('meta[name="twitter:description"]')
  twitterDescription?.setAttribute('content', metadata.description)
}

export function PublicSite() {
  const portfolio = usePortfolioData()
  const revealRef = useScrollReveal()
  const currentPath = window.location.pathname

  useEffect(() => {
    updateMetadata(currentPath)
  }, [currentPath])

  function renderPage() {
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
      case '/projects':
        return <ProjectsPage projects={portfolio.projects} />
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
      default:
        return <NotFoundPage />
    }
  }

  return (
    <div className="app-shell" ref={revealRef}>
      <PortfolioHeader
        currentPath={currentPath}
        name={portfolio.profile.name}
        title={portfolio.profile.title}
      />

      <main className="pb-12 sm:pb-16">{renderPage()}</main>

      <footer className="footer">
        <div className={siteContainerClass}>
          <div className="flex flex-col gap-6 py-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-400">
                {portfolio.profile.name}
              </p>
              <p className="font-display text-lg font-semibold tracking-[-0.02em] text-ink sm:text-xl">
                {portfolio.profile.title}
              </p>
              <p className="max-w-2xl text-sm leading-7 text-muted">
                Cloud delivery, CI/CD, infrastructure automation, platform reliability,
                and production-minded software engineering.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-muted transition hover:border-accent/30 hover:text-accent-deep"
                href={portfolio.profile.links.email}
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
              <a
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-muted transition hover:border-accent/30 hover:text-accent-deep"
                href={portfolio.profile.links.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-muted transition hover:border-accent/30 hover:text-accent-deep"
                href="https://github.com/traliach"
                rel="noreferrer"
                target="_blank"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
