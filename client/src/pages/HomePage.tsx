import { AboutSection } from '../components/home/AboutSection'
import {
  contactItems,
  highlightMetrics,
  contactTopics,
} from '../features/portfolio/content'
import { ContactSection } from '../components/home/ContactSection'
import { HeroSection } from '../components/home/HeroSection'
import { HighlightsSection } from '../components/home/HighlightsSection'
import { PortfolioHeader } from '../components/home/PortfolioHeader'
import { ProjectsSection } from '../components/home/ProjectsSection'
import { SkillsSection } from '../components/home/SkillsSection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { usePortfolioData } from '../hooks/usePortfolioData'

export function HomePage() {
  const {
    apiState,
    contactForm,
    handleContactChange,
    handleContactSubmit,
    health,
    profile,
    projects,
    skills,
    submitMessage,
    submitState,
    testimonials,
  } = usePortfolioData()

  return (
    <div className="app-shell">
      <PortfolioHeader name={profile.name} title={profile.title} />
      <HeroSection apiState={apiState} health={health} profile={profile} />
      <AboutSection profile={profile} />
      <HighlightsSection items={highlightMetrics} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection
        contactForm={contactForm}
        contactItems={contactItems}
        contactTopics={contactTopics}
        onChange={handleContactChange}
        onSubmit={handleContactSubmit}
        submitMessage={submitMessage}
        submitState={submitState}
      />

      <footer className="footer">
        <p>Client scaffold ready. Next step: install and run the server workspace.</p>
      </footer>
    </div>
  )
}
