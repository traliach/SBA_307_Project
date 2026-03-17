import { useEffect, useState } from 'react'
import {
  createAdminProject,
  createAdminSkillGroup,
  deleteAdminProject,
  deleteAdminSkillGroup,
  fetchAdminContacts,
  fetchAdminProfile,
  fetchAdminProjects,
  fetchAdminSession,
  fetchAdminSkills,
  fetchAdminTestimonials,
  loginAdmin,
  reorderAdminProjects,
  reorderAdminSkillGroups,
  reorderAdminTestimonials,
  saveAdminProfile,
  updateAdminContactStatus,
  updateAdminProject,
  updateAdminSkillGroup,
  updateAdminTestimonialStatus,
  updateAdminTestimonial,
} from '../services/adminApi'
import type {
  AdminAuthState,
  AdminContactSubmission,
  AdminProject,
  AdminSession,
  AdminSkillGroup,
  AdminTestimonial,
  ContactSubmissionStatus,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  Testimonial,
  TestimonialModerationStatus,
} from '../types/site'

const ADMIN_TOKEN_KEY = 'resume-admin-token'
const ADMIN_PERSISTENT_TOKEN_KEY = 'resume-admin-token-persistent'

function moveItemById<T extends { id: string }>(
  items: T[],
  itemId: string,
  direction: 'up' | 'down',
) {
  const currentIndex = items.findIndex((item) => item.id === itemId)

  if (currentIndex === -1) {
    return null
  }

  const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

  if (targetIndex < 0 || targetIndex >= items.length) {
    return null
  }

  const next = [...items]
  const [item] = next.splice(currentIndex, 1)
  next.splice(targetIndex, 0, item)
  return next
}

export function useAdminPanel() {
  const [authState, setAuthState] = useState<AdminAuthState>('checking')
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [authError, setAuthError] = useState('')
  const [adminSession, setAdminSession] = useState<AdminSession['admin']>(null)
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [profile, setProfile] = useState<ProfileContent | null>(null)
  const [projects, setProjects] = useState<AdminProject[]>([])
  const [skills, setSkills] = useState<AdminSkillGroup[]>([])
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([])
  const [contacts, setContacts] = useState<AdminContactSubmission[]>([])

  async function hydrateAdminData(activeToken: string) {
    setIsLoadingData(true)

    try {
      const [session, nextProfile, nextProjects, nextSkills, nextTestimonials, nextContacts] =
        await Promise.all([
          fetchAdminSession(activeToken),
          fetchAdminProfile(activeToken),
          fetchAdminProjects(activeToken),
          fetchAdminSkills(activeToken),
          fetchAdminTestimonials(activeToken),
          fetchAdminContacts(activeToken),
        ])

      setAdminSession(session.admin)
      setMfaEnabled(session.mfaEnabled)
      setProfile(nextProfile)
      setProjects(nextProjects)
      setSkills(nextSkills)
      setTestimonials(nextTestimonials)
      setContacts(nextContacts.items)
      setAuthState('signed_in')
      setAuthError('')
    } catch (error) {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY)
      localStorage.removeItem(ADMIN_PERSISTENT_TOKEN_KEY)
      setToken(null)
      setAdminSession(null)
      setMfaEnabled(false)
      setAuthState('signed_out')
      setAuthError(
        error instanceof Error
          ? error.message
          : 'Unable to load admin session.',
      )
    } finally {
      setIsLoadingData(false)
    }
  }

  useEffect(() => {
    const storedToken =
      localStorage.getItem(ADMIN_PERSISTENT_TOKEN_KEY) ??
      sessionStorage.getItem(ADMIN_TOKEN_KEY)

    if (!storedToken) {
      setAuthState('signed_out')
      return
    }

    setToken(storedToken)
    void hydrateAdminData(storedToken)
  }, [])

  function requireToken() {
    if (!token) {
      throw new Error('Admin session is missing. Please sign in again.')
    }

    return token
  }

  async function login(
    email: string,
    password: string,
    mfaCode?: string,
    rememberSession = false,
  ) {
    setAuthState('signing_in')
    setAuthError('')

    try {
      const result = await loginAdmin(email, password, mfaCode)

      if (rememberSession) {
        localStorage.setItem(ADMIN_PERSISTENT_TOKEN_KEY, result.token)
        sessionStorage.removeItem(ADMIN_TOKEN_KEY)
      } else {
        sessionStorage.setItem(ADMIN_TOKEN_KEY, result.token)
        localStorage.removeItem(ADMIN_PERSISTENT_TOKEN_KEY)
      }

      setToken(result.token)
      setMfaEnabled(result.mfaEnabled)
      await hydrateAdminData(result.token)
    } catch (error) {
      setAuthState('signed_out')
      setAuthError(
        error instanceof Error ? error.message : 'Unable to sign in.',
      )
    }
  }

  function logout() {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
    localStorage.removeItem(ADMIN_PERSISTENT_TOKEN_KEY)
    setToken(null)
    setAdminSession(null)
    setMfaEnabled(false)
    setProfile(null)
    setProjects([])
    setSkills([])
    setTestimonials([])
    setContacts([])
    setAuthError('')
    setAuthState('signed_out')
  }

  async function refresh() {
    const activeToken = requireToken()
    await hydrateAdminData(activeToken)
  }

  async function saveProfile(profilePayload: ProfileContent) {
    const activeToken = requireToken()
    const nextProfile = await saveAdminProfile(activeToken, profilePayload)
    setProfile(nextProfile)
    return nextProfile
  }

  async function saveProject(
    projectPayload: ProjectSummary,
    projectId?: string,
  ) {
    const activeToken = requireToken()
    const nextProject = projectId
      ? await updateAdminProject(activeToken, projectId, projectPayload)
      : await createAdminProject(activeToken, projectPayload)

    setProjects((current) => {
      const existingIndex = current.findIndex((project) => project.id === nextProject.id)

      if (existingIndex === -1) {
        return [...current, nextProject].sort((left, right) => left.order - right.order)
      }

      const next = [...current]
      next[existingIndex] = nextProject
      return next.sort((left, right) => left.order - right.order)
    })

    return nextProject
  }

  async function removeProject(projectId: string) {
    const activeToken = requireToken()
    await deleteAdminProject(activeToken, projectId)
    setProjects((current) => current.filter((project) => project.id !== projectId))
  }

  async function reorderProject(projectId: string, direction: 'up' | 'down') {
    const activeToken = requireToken()
    const nextProjects = moveItemById(projects, projectId, direction)

    if (!nextProjects) {
      return false
    }

    const reorderedProjects = await reorderAdminProjects(
      activeToken,
      nextProjects.map((project) => project.id),
    )
    setProjects(reorderedProjects)
    return true
  }

  async function saveSkillGroup(
    skillGroupPayload: SkillGroup,
    skillGroupId?: string,
  ) {
    const activeToken = requireToken()
    const nextSkillGroup = skillGroupId
      ? await updateAdminSkillGroup(activeToken, skillGroupId, skillGroupPayload)
      : await createAdminSkillGroup(activeToken, skillGroupPayload)

    setSkills((current) => {
      const existingIndex = current.findIndex((skill) => skill.id === nextSkillGroup.id)

      if (existingIndex === -1) {
        return [...current, nextSkillGroup].sort((left, right) => left.order - right.order)
      }

      const next = [...current]
      next[existingIndex] = nextSkillGroup
      return next.sort((left, right) => left.order - right.order)
    })

    return nextSkillGroup
  }

  async function removeSkillGroup(skillGroupId: string) {
    const activeToken = requireToken()
    await deleteAdminSkillGroup(activeToken, skillGroupId)
    setSkills((current) => current.filter((skill) => skill.id !== skillGroupId))
  }

  async function reorderSkillGroup(
    skillGroupId: string,
    direction: 'up' | 'down',
  ) {
    const activeToken = requireToken()
    const nextSkillGroups = moveItemById(skills, skillGroupId, direction)

    if (!nextSkillGroups) {
      return false
    }

    const reorderedSkillGroups = await reorderAdminSkillGroups(
      activeToken,
      nextSkillGroups.map((skillGroup) => skillGroup.id),
    )
    setSkills(reorderedSkillGroups)
    return true
  }

  async function saveTestimonial(
    testimonialPayload: Testimonial,
    testimonialId: string,
  ) {
    const activeToken = requireToken()
    const nextTestimonial = await updateAdminTestimonial(
      activeToken,
      testimonialId,
      testimonialPayload,
    )

    setTestimonials((current) => {
      const existingIndex = current.findIndex(
        (testimonial) => testimonial.id === nextTestimonial.id,
      )

      if (existingIndex === -1) {
        return [...current, nextTestimonial].sort(
          (left, right) => left.order - right.order,
        )
      }

      const next = [...current]
      next[existingIndex] = nextTestimonial
      return next.sort((left, right) => left.order - right.order)
    })

    return nextTestimonial
  }

  async function moderateTestimonial(
    testimonialId: string,
    status: TestimonialModerationStatus,
  ) {
    const activeToken = requireToken()
    const nextTestimonial = await updateAdminTestimonialStatus(
      activeToken,
      testimonialId,
      status,
    )

    setTestimonials((current) =>
      current.map((testimonial) =>
        testimonial.id === nextTestimonial.id ? nextTestimonial : testimonial,
      ),
    )

    return nextTestimonial
  }

  async function reorderTestimonial(
    testimonialId: string,
    direction: 'up' | 'down',
  ) {
    const activeToken = requireToken()
    const nextTestimonials = moveItemById(testimonials, testimonialId, direction)

    if (!nextTestimonials) {
      return false
    }

    const reorderedTestimonials = await reorderAdminTestimonials(
      activeToken,
      nextTestimonials.map((testimonial) => testimonial.id),
    )
    setTestimonials(reorderedTestimonials)
    return true
  }

  async function saveContactStatus(
    contactId: string,
    status: ContactSubmissionStatus,
  ) {
    const activeToken = requireToken()
    const nextContact = await updateAdminContactStatus(activeToken, contactId, status)

    setContacts((current) =>
      current.map((contact) => (contact.id === nextContact.id ? nextContact : contact)),
    )

    return nextContact
  }

  return {
    adminSession,
    authError,
    authState,
    contacts,
    isLoadingData,
    login,
    logout,
    mfaEnabled,
    moderateTestimonial,
    profile,
    projects,
    refresh,
    reorderProject,
    reorderSkillGroup,
    reorderTestimonial,
    removeProject,
    removeSkillGroup,
    saveContactStatus,
    saveProfile,
    saveProject,
    saveSkillGroup,
    saveTestimonial,
    skills,
    testimonials,
  }
}
