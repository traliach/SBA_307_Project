/**
 * usePortfolioData.ts — Central data and form state hook for the public site
 *
 * This is the main "brain" of the public portfolio.  It is called once in
 * PublicSite.tsx and returns everything the page components need:
 *
 *   - Content data  (profile, projects, skills, testimonials) fetched from the API
 *   - API status    (loading / online / offline) so components can show fallbacks
 *   - Form state    (current field values + submit status) for contact & testimonials
 *   - Form handlers (onChange, onSubmit) passed as props to the page components
 *
 * "Merge" functions are used to blend API data with local fallback content.
 * This means the site always shows something meaningful even if the API is down.
 */

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

// ─── Merge helpers ───────────────────────────────────────────────────────────
// These functions combine what the API returned with the hardcoded fallback
// content defined in content.ts.  If the API is missing a field, the fallback
// value is used instead, so pages never render undefined or empty strings.

/** Type guard that narrows `unknown` to a plain object (not null, not array). */
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Merges an unknown API profile response with the local fallback profile.
 * Handles the nested `links` object separately to avoid wiping out defaults.
 */
function mergeProfileContent(profile: unknown): ProfileContent {
  if (!isObject(profile)) {
    return fallbackProfile
  }

  return {
    ...fallbackProfile,     // start with all fallback fields
    ...profile,             // overwrite with whatever the API sent
    // For complex fields we validate the type before using the API value.
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
    // Merge links as its own object so we keep fallback URLs for any key the
    // API didn't return (e.g. if a new link type is added later).
    links: {
      ...fallbackProfile.links,
      ...(isObject(profile.links) ? profile.links : {}),
    },
  }
}

/**
 * Merges each project returned by the API with its corresponding fallback.
 * Uses the array index to match API projects to fallback projects.
 */
function mergeProjects(projects: unknown): ProjectSummary[] {
  if (!Array.isArray(projects)) {
    return fallbackProjects
  }

  return projects.map((project, index) => {
    const fallbackProject = fallbackProjects[index]

    return {
      ...fallbackProject,
      ...project,
      // Nullish coalescing (??) fills in the fallback when the API value is null/undefined.
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

/** Merges skill groups from the API with fallback skill groups. */
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

/** Merges testimonials from the API with fallback testimonials. */
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

// ─── Main hook ───────────────────────────────────────────────────────────────

export function usePortfolioData() {
  // ── Content state ──────────────────────────────────────────────────────────
  // All content starts as the local fallback so the page renders immediately
  // without showing empty sections while the API loads.
  const [apiState, setApiState] = useState<ApiState>('loading')
  const [health, setHealth] = useState<ApiHealth | null>(null)
  const [profile, setProfile] = useState<ProfileContent>(fallbackProfile)
  const [projects, setProjects] = useState<ProjectSummary[]>(fallbackProjects)
  const [skills, setSkills] = useState<SkillGroup[]>(fallbackSkillGroups)
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(fallbackTestimonials)

  // ── Contact form state ─────────────────────────────────────────────────────
  const [contactForm, setContactForm] =
    useState<ContactSubmissionInput>(createInitialContactForm)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  // ── Testimonial form state ─────────────────────────────────────────────────
  const [testimonialForm, setTestimonialForm] =
    useState<TestimonialSubmissionInput>(createInitialTestimonialForm)
  const [testimonialSubmitState, setTestimonialSubmitState] =
    useState<SubmitState>('idle')
  const [testimonialSubmitMessage, setTestimonialSubmitMessage] = useState('')

  // ── Data loading effect ────────────────────────────────────────────────────
  useEffect(() => {
    // The `active` flag prevents state updates after the component has unmounted.
    // Without it, React would warn about setting state on an unmounted component
    // if the user navigates away before the fetch completes.
    let active = true

    async function loadData() {
      console.info('[portfolio] loading API data')

      // Promise.allSettled fires all requests in parallel and waits for ALL of
      // them to finish, regardless of individual success or failure.
      // Unlike Promise.all, a single failed request doesn't cancel the rest.
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

      // If the component unmounted while we were fetching, discard the results.
      if (!active) {
        return
      }

      // Log the outcome of each request for easier debugging in the browser console.
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

      // startTransition tells React that these state updates are not urgent —
      // they can be interrupted if the user interacts with the page.
      // This keeps the UI responsive while a large amount of data is processed.
      startTransition(() => {
        // Use health as the proxy for overall API availability.
        if (healthResult.status === 'fulfilled') {
          setHealth(healthResult.value)
          setApiState('online')
        } else {
          setApiState('offline')
        }

        // For each content type: only replace the fallback if the API succeeded.
        // The merge functions handle partial data gracefully.
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

    // `void` discards the Promise returned by loadData() — we handle errors
    // inside the function itself, so there is nothing to catch here.
    void loadData()

    // Cleanup: mark the fetch as stale when the component unmounts.
    return () => {
      active = false
    }
  }, []) // Empty array → run only once, right after the first render.

  // ─── Contact form handlers ─────────────────────────────────────────────────

  /**
   * Called on every keystroke / selection change in the contact form fields.
   * Uses the input's `name` attribute to update the matching key in the form state.
   * Also clears any previous success/error message so the UI stays clean.
   */
  function handleContactChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target

    // If there is a lingering status message from a previous submission,
    // clear it the moment the user starts editing again.
    if (submitMessage) {
      setSubmitMessage('')
      setSubmitState('idle')
    }

    // Computed property key: [name] dynamically targets the right field.
    // e.g. if name === 'email', this updates contactForm.email.
    setContactForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  /**
   * Called when the contact form is submitted.
   * Validates on the server side — the API returns field-specific errors.
   * On success, the form resets and a confirmation message appears for 5 seconds.
   */
  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from doing a full page reload (default form behaviour).
    event.preventDefault()
    setSubmitState('submitting')
    setSubmitMessage('')
    console.info('[portfolio] submitting contact form')

    try {
      const result = await submitContact(contactForm)
      setSubmitState('success')
      setSubmitMessage(result.message)
      setContactForm(createInitialContactForm()) // wipe the fields for the next message
      console.info('[portfolio] contact form success')

      // Auto-dismiss the success banner after 5 seconds so it doesn't linger.
      setTimeout(() => {
        setSubmitMessage('')
        setSubmitState('idle')
      }, 5000)
    } catch (error) {
      setSubmitState('error')
      // If the server returned a message (e.g. "Message must be at least 10
      // characters."), show it verbatim.  Otherwise show a generic fallback.
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send message right now.',
      )
      console.error('[portfolio] contact form failed', error)
    }
  }

  // ─── Testimonial form handlers ─────────────────────────────────────────────

  /** Mirrors handleContactChange but for the testimonial form fields. */
  function handleTestimonialChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target

    setTestimonialForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  /**
   * Submits the testimonial for admin moderation.
   * The testimonial won't appear on the site until an admin approves it.
   * The success banner auto-dismisses after 5 seconds (same behaviour as contact).
   */
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

      // Auto-clear the success banner after 5 s, same as the contact form.
      setTimeout(() => {
        setTestimonialSubmitMessage('')
        setTestimonialSubmitState('idle')
      }, 5000)
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

  // Return everything the page components need as a flat object.
  // Components destructure only the properties they care about.
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
    testimonialForm,
    testimonialSubmitMessage,
    testimonialSubmitState,
    testimonials,
  }
}
