import { useEffect } from 'react'
import { contactItems, contactTopics } from '../features/portfolio/content'
import { usePortfolioData } from '../hooks/usePortfolioData'
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
  const currentPath = window.location.pathname
  const footerEmail = portfolio.profile.links.email.replace(/^mailto:/, '')

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
    <div className="app-shell">
      <PortfolioHeader
        currentPath={currentPath}
        name={portfolio.profile.name}
        title={portfolio.profile.title}
      />

      <main className="pb-10 sm:pb-12">{renderPage()}</main>

      <footer className="footer">
        <div className={siteContainerClass}>
          <div className="flex flex-col gap-4 py-6 sm:py-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-1">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {portfolio.profile.name}
              </p>
              <p className="text-base font-semibold tracking-[-0.03em] text-ink sm:text-lg">
                {portfolio.profile.title}
              </p>
              <p className="max-w-2xl text-sm leading-7 text-slate-600">
                Cloud delivery, CI/CD, infrastructure automation, platform reliability,
                and production-minded software engineering.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-600">
              <a
                className="transition hover:text-accent-deep"
                href={portfolio.profile.links.email}
              >
                {footerEmail}
              </a>
              <a
                className="transition hover:text-accent-deep"
                href={portfolio.profile.links.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="transition hover:text-accent-deep"
                href={portfolio.profile.links.resume}
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
