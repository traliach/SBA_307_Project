import { useEffect } from 'react'
import {
  contactItems,
  contactTopics,
} from '../features/portfolio/content'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { PortfolioHeader } from '../components/home/PortfolioHeader'
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
      'Executive-style portfolio for DevOps, cloud delivery, platform automation, and project case studies.',
  },
  '/about': {
    title: 'About | Ali Achille Traore',
    description:
      'Career timeline, strengths, certifications, and availability for Ali Achille Traore.',
  },
  '/projects': {
    title: 'Projects | Ali Achille Traore',
    description:
      'Selected project case studies covering DevOps, cloud infrastructure, CI/CD, and platform reliability.',
  },
  '/skills': {
    title: 'Skills | Ali Achille Traore',
    description:
      'Grouped technical skills across cloud, DevOps, automation, tooling, and platform delivery.',
  },
  '/contact': {
    title: 'Contact | Ali Achille Traore',
    description:
      'Contact Ali Achille Traore for DevOps, cloud delivery, infrastructure, and platform work.',
  },
} as const

function updateMetadata(currentPath: string) {
  const metadata = pageMetadata[currentPath as keyof typeof pageMetadata] ?? {
    title: 'Ali Achille Traore | Portfolio',
    description:
      'Portfolio platform for Ali Achille Traore covering DevOps, cloud delivery, and platform engineering.',
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

  useEffect(() => {
    updateMetadata(currentPath)
  }, [currentPath])

  // Keep public navigation path-based without relying on the router runtime.
  function renderPage() {
    switch (currentPath) {
      case '/':
        return <HomePage {...portfolio} currentPath={currentPath} />
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
            submitMessage={portfolio.submitMessage}
            submitState={portfolio.submitState}
          />
        )
      default:
        return <NotFoundPage />
    }
  }

  return (
    <div className="app-shell">
      {currentPath === '/' ? null : (
        <PortfolioHeader
          currentPath={currentPath}
          name={portfolio.profile.name}
          title={portfolio.profile.title}
        />
      )}
      {renderPage()}
      <footer className="footer">
        <p>Public pages now work on their own paths without reintroducing router risk.</p>
      </footer>
    </div>
  )
}
