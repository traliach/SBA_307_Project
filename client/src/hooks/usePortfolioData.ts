import {
  startTransition,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import {
  createInitialTestimonialForm,
  createInitialContactForm,
  fallbackProfile,
  projectSummaries as fallbackProjects,
  skillGroups as fallbackSkillGroups,
  testimonialQuotes as fallbackTestimonials,
} from '../features/portfolio/content'
import {
  fetchHealth,
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchTestimonials,
  submitContact,
  submitTestimonial,
} from '../services/api'
import type {
  ApiHealth,
  ApiState,
  ContactSubmissionInput,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  SubmitState,
  Testimonial,
  TestimonialSubmissionInput,
} from '../types/site'

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function mergeProfileContent(profile: unknown): ProfileContent {
  if (!isObject(profile)) {
    return fallbackProfile
  }

  return {
    ...fallbackProfile,
    ...profile,
    about:
      typeof profile.about === 'string' ? profile.about : fallbackProfile.about,
    availability:
      typeof profile.availability === 'string'
        ? profile.availability
        : fallbackProfile.availability,
    certifications: Array.isArray(profile.certifications)
      ? profile.certifications
      : fallbackProfile.certifications,
    strengths: Array.isArray(profile.strengths)
      ? profile.strengths
      : fallbackProfile.strengths,
    timeline: Array.isArray(profile.timeline)
      ? profile.timeline
      : fallbackProfile.timeline,
    links: {
      ...fallbackProfile.links,
      ...(isObject(profile.links) ? profile.links : {}),
    },
  }
}

function mergeProjects(projects: unknown): ProjectSummary[] {
  if (!Array.isArray(projects)) {
    return fallbackProjects
  }

  return projects.map((project, index) => {
    const fallbackProject = fallbackProjects[index]

    return {
      ...fallbackProject,
      ...project,
      challenge: project.challenge ?? fallbackProject?.challenge ?? project.summary,
      solution:
        project.solution ??
        fallbackProject?.solution ??
        'Implemented delivery and automation changes that made the workflow easier to operate.',
      metrics: project.metrics ?? fallbackProject?.metrics ?? [],
      outcomes: project.outcomes ?? fallbackProject?.outcomes ?? [],
      stack: project.stack ?? fallbackProject?.stack ?? [],
      role: project.role ?? fallbackProject?.role ?? 'DevOps Engineer',
      featured: project.featured ?? fallbackProject?.featured ?? false,
    }
  })
}

function mergeSkills(skills: unknown): SkillGroup[] {
  if (!Array.isArray(skills)) {
    return fallbackSkillGroups
  }

  return skills.map((skill, index) => {
    const fallbackSkillGroup = fallbackSkillGroups[index]

    return {
      ...fallbackSkillGroup,
      ...skill,
      items: skill.items ?? fallbackSkillGroup?.items ?? [],
    }
  })
}

function mergeTestimonials(testimonials: unknown): Testimonial[] {
  if (!Array.isArray(testimonials)) {
    return fallbackTestimonials
  }

  return testimonials.map((testimonial, index) => {
    const fallbackTestimonial = fallbackTestimonials[index]

    return {
      ...fallbackTestimonial,
      ...testimonial,
      quote: testimonial.quote ?? fallbackTestimonial?.quote ?? '',
      author: testimonial.author ?? fallbackTestimonial?.author ?? 'Anonymous',
      role: testimonial.role ?? fallbackTestimonial?.role ?? 'Unknown role',
      company: testimonial.company ?? fallbackTestimonial?.company ?? 'Unknown company',
    }
  })
}

export function usePortfolioData() {
  const [apiState, setApiState] = useState<ApiState>('loading')
  const [health, setHealth] = useState<ApiHealth | null>(null)
  const [profile, setProfile] = useState<ProfileContent>(fallbackProfile)
  const [projects, setProjects] = useState<ProjectSummary[]>(fallbackProjects)
  const [skills, setSkills] = useState<SkillGroup[]>(fallbackSkillGroups)
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(fallbackTestimonials)
  const [contactForm, setContactForm] =
    useState<ContactSubmissionInput>(createInitialContactForm)
  const [testimonialForm, setTestimonialForm] =
    useState<TestimonialSubmissionInput>(createInitialTestimonialForm)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [testimonialSubmitState, setTestimonialSubmitState] =
    useState<SubmitState>('idle')
  const [testimonialSubmitMessage, setTestimonialSubmitMessage] = useState('')

  useEffect(() => {
    let active = true

    async function loadData() {
      console.info('[portfolio] loading API data')

      const [
        healthResult,
        profileResult,
        projectResult,
        skillResult,
        testimonialResult,
      ] =
        await Promise.allSettled([
          fetchHealth(),
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
          fetchTestimonials(),
        ])

      if (!active) {
        return
      }

      console.info('[portfolio] health', healthResult.status)
      console.info('[portfolio] profile', profileResult.status)
      console.info('[portfolio] projects', projectResult.status)
      console.info('[portfolio] skills', skillResult.status)
      console.info('[portfolio] testimonials', testimonialResult.status)

      if (healthResult.status === 'rejected') {
        console.error('[portfolio] health failed', healthResult.reason)
      }

      if (profileResult.status === 'rejected') {
        console.error('[portfolio] profile failed', profileResult.reason)
      }

      if (projectResult.status === 'rejected') {
        console.error('[portfolio] projects failed', projectResult.reason)
      }

      if (skillResult.status === 'rejected') {
        console.error('[portfolio] skills failed', skillResult.reason)
      }

      if (testimonialResult.status === 'rejected') {
        console.error('[portfolio] testimonials failed', testimonialResult.reason)
      }

      startTransition(() => {
        if (healthResult.status === 'fulfilled') {
          setHealth(healthResult.value)
          setApiState('online')
        } else {
          setApiState('offline')
        }

        if (profileResult.status === 'fulfilled') {
          setProfile(mergeProfileContent(profileResult.value))
        }

        if (projectResult.status === 'fulfilled') {
          setProjects(mergeProjects(projectResult.value))
        }

        if (skillResult.status === 'fulfilled') {
          setSkills(mergeSkills(skillResult.value))
        }

        if (testimonialResult.status === 'fulfilled') {
          setTestimonials(mergeTestimonials(testimonialResult.value))
        }
      })

      console.info('[portfolio] render state updated')
    }

    void loadData()

    return () => {
      active = false
    }
  }, [])

  function handleContactChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target

    setContactForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleTestimonialChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target

    setTestimonialForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState('submitting')
    setSubmitMessage('')
    console.info('[portfolio] submitting contact form')

    try {
      const result = await submitContact(contactForm)
      setSubmitState('success')
      setSubmitMessage(result.message)
      setContactForm(createInitialContactForm())
      console.info('[portfolio] contact form success')
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send message right now.',
      )
      console.error('[portfolio] contact form failed', error)
    }
  }

  async function handleTestimonialSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTestimonialSubmitState('submitting')
    setTestimonialSubmitMessage('')
    console.info('[portfolio] submitting testimonial form')

    try {
      const result = await submitTestimonial(testimonialForm)
      setTestimonialSubmitState('success')
      setTestimonialSubmitMessage(result.message)
      setTestimonialForm(createInitialTestimonialForm())
      console.info('[portfolio] testimonial form success')
    } catch (error) {
      setTestimonialSubmitState('error')
      setTestimonialSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send testimonial right now.',
      )
      console.error('[portfolio] testimonial form failed', error)
    }
  }

  return {
    apiState,
    contactForm,
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
  }
}
