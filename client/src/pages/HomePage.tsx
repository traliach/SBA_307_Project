import {
  contactItems,
  highlightMetrics,
  contactTopics,
} from '../features/portfolio/content'
import { AboutSection } from '../components/home/AboutSection'
import { ContactSection } from '../components/home/ContactSection'
import { HeroSection } from '../components/home/HeroSection'
import { HighlightsSection } from '../components/home/HighlightsSection'
import { PortfolioHeader } from '../components/home/PortfolioHeader'
import { ProjectsSection } from '../components/home/ProjectsSection'
import { SkillsSection } from '../components/home/SkillsSection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import type { ApiHealth, ApiState, ContactSubmissionInput, ProfileContent, ProjectSummary, SkillGroup, SubmitState, Testimonial, TestimonialSubmissionInput } from '../types/site'

interface HomePageProps {
  apiState: ApiState
  contactForm: ContactSubmissionInput
  currentPath: string
  handleContactChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void
  handleContactSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleTestimonialChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handleTestimonialSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  health: ApiHealth | null
  profile: ProfileContent
  projects: ProjectSummary[]
  skills: SkillGroup[]
  submitMessage: string
  submitState: SubmitState
  testimonials: Testimonial[]
  testimonialForm: TestimonialSubmissionInput
  testimonialSubmitMessage: string
  testimonialSubmitState: SubmitState
}

export function HomePage({
  apiState,
  contactForm,
  currentPath,
  handleContactChange,
  handleContactSubmit,
  handleTestimonialChange,
  handleTestimonialSubmit,
  health,
  profile,
  projects,
  skills,
  submitMessage,
  submitState,
  testimonials,
  testimonialForm,
  testimonialSubmitMessage,
  testimonialSubmitState,
}: HomePageProps) {

  return (
    <>
      <PortfolioHeader currentPath={currentPath} name={profile.name} title={profile.title} />
      <HeroSection apiState={apiState} health={health} profile={profile} />
      <AboutSection profile={profile} />
      <HighlightsSection items={highlightMetrics} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <TestimonialsSection
        onChange={handleTestimonialChange}
        onSubmit={handleTestimonialSubmit}
        submitMessage={testimonialSubmitMessage}
        submitState={testimonialSubmitState}
        testimonialForm={testimonialForm}
        testimonials={testimonials}
      />
      <ContactSection
        contactForm={contactForm}
        contactItems={contactItems}
        contactTopics={contactTopics}
        onChange={handleContactChange}
        onSubmit={handleContactSubmit}
        submitMessage={submitMessage}
        submitState={submitState}
      />
    </>
  )
}
