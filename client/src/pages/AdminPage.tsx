import { useEffect, useState } from 'react'
import { useAdminPanel } from '../hooks/useAdminPanel'
import type {
  AdminContactSubmission,
  AdminProject,
  AdminSkillGroup,
  AdminTestimonial,
  ContactSubmissionStatus,
  ProfileContent,
} from '../types/site'

type NoticeTone = 'neutral' | 'success' | 'error'

type ProfileDraft = {
  name: string
  title: string
  location: string
  availability: string
  summary: string
  intro: string
  about: string
  certificationsText: string
  strengthsText: string
  timelineText: string
  email: string
  linkedin: string
  resume: string
}

type ProjectDraft = {
  id?: string
  order?: number
  title: string
  timeframe: string
  role: string
  featured: boolean
  summary: string
  challenge: string
  solution: string
  stackText: string
  metricsText: string
  outcomesText: string
}

type SkillDraft = {
  id?: string
  order?: number
  eyebrow: string
  title: string
  description: string
  itemsText: string
}

type TestimonialDraft = {
  id?: string
  order?: number
  quote: string
  author: string
  role: string
  company: string
}

const CONTACT_STATUSES: ContactSubmissionStatus[] = [
  'new',
  'reviewed',
  'replied',
  'archived',
]

function parseLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function joinLines(values: string[]) {
  return values.join('\n')
}

// Keep complex nested fields editable without forcing JSON into the UI.
function parseTimeline(value: string) {
  return parseLines(value)
    .map((line) => {
      const [period = '', title = '', ...detailParts] = line.split('|')

      return {
        period: period.trim(),
        title: title.trim(),
        detail: detailParts.join('|').trim(),
      }
    })
    .filter((item) => item.period && item.title && item.detail)
}

function joinTimeline(
  timeline: Array<{ period: string; title: string; detail: string }>,
) {
  return timeline
    .map((item) => `${item.period} | ${item.title} | ${item.detail}`)
    .join('\n')
}

function parseMetrics(value: string) {
  return parseLines(value)
    .map((line) => {
      const [label = '', ...valueParts] = line.split('|')

      return {
        label: label.trim(),
        value: valueParts.join('|').trim(),
      }
    })
    .filter((metric) => metric.label && metric.value)
}

function joinMetrics(metrics: Array<{ label: string; value: string }>) {
  return metrics.map((metric) => `${metric.label} | ${metric.value}`).join('\n')
}

function createEmptyProfileDraft(): ProfileDraft {
  return {
    name: '',
    title: '',
    location: '',
    availability: '',
    summary: '',
    intro: '',
    about: '',
    certificationsText: '',
    strengthsText: '',
    timelineText: '',
    email: '',
    linkedin: '',
    resume: '',
  }
}

function toProfileDraft(profile: ProfileContent): ProfileDraft {
  return {
    name: profile.name,
    title: profile.title,
    location: profile.location,
    availability: profile.availability,
    summary: profile.summary,
    intro: profile.intro,
    about: profile.about,
    certificationsText: joinLines(profile.certifications),
    strengthsText: joinLines(profile.strengths),
    timelineText: joinTimeline(profile.timeline),
    email: profile.links.email,
    linkedin: profile.links.linkedin,
    resume: profile.links.resume,
  }
}

function toProfilePayload(draft: ProfileDraft): ProfileContent {
  return {
    name: draft.name.trim(),
    title: draft.title.trim(),
    location: draft.location.trim(),
    availability: draft.availability.trim(),
    summary: draft.summary.trim(),
    intro: draft.intro.trim(),
    about: draft.about.trim(),
    certifications: parseLines(draft.certificationsText),
    strengths: parseLines(draft.strengthsText),
    timeline: parseTimeline(draft.timelineText),
    links: {
      email: draft.email.trim(),
      linkedin: draft.linkedin.trim(),
      resume: draft.resume.trim(),
    },
  }
}

function createEmptyProjectDraft(): ProjectDraft {
  return {
    title: '',
    timeframe: '',
    role: '',
    featured: false,
    summary: '',
    challenge: '',
    solution: '',
    stackText: '',
    metricsText: '',
    outcomesText: '',
  }
}

function toProjectDraft(project: AdminProject): ProjectDraft {
  return {
    id: project.id,
    order: project.order,
    title: project.title,
    timeframe: project.timeframe,
    role: project.role,
    featured: project.featured,
    summary: project.summary,
    challenge: project.challenge,
    solution: project.solution,
    stackText: joinLines(project.stack),
    metricsText: joinMetrics(project.metrics),
    outcomesText: joinLines(project.outcomes),
  }
}

function toProjectPayload(draft: ProjectDraft) {
  return {
    title: draft.title.trim(),
    timeframe: draft.timeframe.trim(),
    role: draft.role.trim(),
    featured: draft.featured,
    summary: draft.summary.trim(),
    challenge: draft.challenge.trim(),
    solution: draft.solution.trim(),
    stack: parseLines(draft.stackText),
    metrics: parseMetrics(draft.metricsText),
    outcomes: parseLines(draft.outcomesText),
  }
}

function createEmptySkillDraft(): SkillDraft {
  return {
    eyebrow: '',
    title: '',
    description: '',
    itemsText: '',
  }
}

function toSkillDraft(skill: AdminSkillGroup): SkillDraft {
  return {
    id: skill.id,
    order: skill.order,
    eyebrow: skill.eyebrow,
    title: skill.title,
    description: skill.description,
    itemsText: joinLines(skill.items),
  }
}

function toSkillPayload(draft: SkillDraft) {
  return {
    eyebrow: draft.eyebrow.trim(),
    title: draft.title.trim(),
    description: draft.description.trim(),
    items: parseLines(draft.itemsText),
  }
}

function createEmptyTestimonialDraft(): TestimonialDraft {
  return {
    quote: '',
    author: '',
    role: '',
    company: '',
  }
}

function toTestimonialDraft(testimonial: AdminTestimonial): TestimonialDraft {
  return {
    id: testimonial.id,
    order: testimonial.order,
    quote: testimonial.quote,
    author: testimonial.author,
    role: testimonial.role,
    company: testimonial.company,
  }
}

function toTestimonialPayload(draft: TestimonialDraft) {
  return {
    quote: draft.quote.trim(),
    author: draft.author.trim(),
    role: draft.role.trim(),
    company: draft.company.trim(),
  }
}

function mapContactStatuses(contacts: AdminContactSubmission[]) {
  return contacts.reduce<Record<string, ContactSubmissionStatus>>(
    (result, contact) => {
      result[contact.id] = contact.status
      return result
    },
    {},
  )
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

export function AdminPage() {
  const {
    adminSession,
    authError,
    authState,
    contacts,
    isLoadingData,
    login,
    logout,
    profile,
    projects,
    refresh,
    removeProject,
    removeSkillGroup,
    removeTestimonial,
    saveContactStatus,
    saveProfile,
    saveProject,
    saveSkillGroup,
    saveTestimonial,
    skills,
    testimonials,
  } = useAdminPanel()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [notice, setNotice] = useState('')
  const [noticeTone, setNoticeTone] = useState<NoticeTone>('neutral')
  const [busyKey, setBusyKey] = useState('')
  const [contactFilter, setContactFilter] = useState<'all' | ContactSubmissionStatus>(
    'all',
  )
  const [profileDraft, setProfileDraft] = useState<ProfileDraft>(
    createEmptyProfileDraft(),
  )
  const [projectDrafts, setProjectDrafts] = useState<ProjectDraft[]>([])
  const [newProjectDraft, setNewProjectDraft] = useState<ProjectDraft>(
    createEmptyProjectDraft(),
  )
  const [skillDrafts, setSkillDrafts] = useState<SkillDraft[]>([])
  const [newSkillDraft, setNewSkillDraft] = useState<SkillDraft>(
    createEmptySkillDraft(),
  )
  const [testimonialDrafts, setTestimonialDrafts] = useState<TestimonialDraft[]>(
    [],
  )
  const [newTestimonialDraft, setNewTestimonialDraft] = useState<TestimonialDraft>(
    createEmptyTestimonialDraft(),
  )
  const [contactStatusDrafts, setContactStatusDrafts] = useState<
    Record<string, ContactSubmissionStatus>
  >({})

  useEffect(() => {
    if (profile) {
      setProfileDraft(toProfileDraft(profile))
    }
  }, [profile])

  useEffect(() => {
    setProjectDrafts(projects.map(toProjectDraft))
  }, [projects])

  useEffect(() => {
    setSkillDrafts(skills.map(toSkillDraft))
  }, [skills])

  useEffect(() => {
    setTestimonialDrafts(testimonials.map(toTestimonialDraft))
  }, [testimonials])

  useEffect(() => {
    setContactStatusDrafts(mapContactStatuses(contacts))
  }, [contacts])

  const contactCounts = {
    all: contacts.length,
    new: contacts.filter((contact) => contact.status === 'new').length,
    reviewed: contacts.filter((contact) => contact.status === 'reviewed').length,
    replied: contacts.filter((contact) => contact.status === 'replied').length,
    archived: contacts.filter((contact) => contact.status === 'archived').length,
  }

  const visibleContacts =
    contactFilter === 'all'
      ? contacts
      : contacts.filter((contact) => contact.status === contactFilter)

  function showNotice(message: string, tone: NoticeTone) {
    setNotice(message)
    setNoticeTone(tone)
  }

  function updateProjectDraft(projectId: string, patch: Partial<ProjectDraft>) {
    setProjectDrafts((current) =>
      current.map((draft) =>
        draft.id === projectId ? { ...draft, ...patch } : draft,
      ),
    )
  }

  function updateSkillDraft(skillId: string, patch: Partial<SkillDraft>) {
    setSkillDrafts((current) =>
      current.map((draft) =>
        draft.id === skillId ? { ...draft, ...patch } : draft,
      ),
    )
  }

  function updateTestimonialDraft(
    testimonialId: string,
    patch: Partial<TestimonialDraft>,
  ) {
    setTestimonialDrafts((current) =>
      current.map((draft) =>
        draft.id === testimonialId ? { ...draft, ...patch } : draft,
      ),
    )
  }

  async function handleRefresh() {
    setBusyKey('refresh')

    try {
      await refresh()
      showNotice('Admin data refreshed.', 'success')
    } catch (error) {
      showNotice(getErrorMessage(error, 'Unable to refresh admin data.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function handleSaveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusyKey('profile')

    try {
      await saveProfile(toProfilePayload(profileDraft))
      showNotice('Profile saved.', 'success')
    } catch (error) {
      showNotice(getErrorMessage(error, 'Unable to save profile.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function handleSaveProject(draft: ProjectDraft) {
    const key = draft.id ? `project-save-${draft.id}` : 'project-create'
    setBusyKey(key)

    try {
      await saveProject(toProjectPayload(draft), draft.id)

      if (!draft.id) {
        setNewProjectDraft(createEmptyProjectDraft())
      }

      showNotice(draft.id ? 'Project updated.' : 'Project created.', 'success')
    } catch (error) {
      showNotice(getErrorMessage(error, 'Unable to save project.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function handleDeleteProject(projectId: string) {
    setBusyKey(`project-delete-${projectId}`)

    try {
      await removeProject(projectId)
      showNotice('Project deleted.', 'success')
    } catch (error) {
      showNotice(getErrorMessage(error, 'Unable to delete project.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function handleSaveSkill(draft: SkillDraft) {
    const key = draft.id ? `skill-save-${draft.id}` : 'skill-create'
    setBusyKey(key)

    try {
      await saveSkillGroup(toSkillPayload(draft), draft.id)

      if (!draft.id) {
        setNewSkillDraft(createEmptySkillDraft())
      }

      showNotice(draft.id ? 'Skill group updated.' : 'Skill group created.', 'success')
    } catch (error) {
      showNotice(getErrorMessage(error, 'Unable to save skill group.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function handleDeleteSkill(skillId: string) {
    setBusyKey(`skill-delete-${skillId}`)

    try {
      await removeSkillGroup(skillId)
      showNotice('Skill group deleted.', 'success')
    } catch (error) {
      showNotice(getErrorMessage(error, 'Unable to delete skill group.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function handleSaveTestimonial(draft: TestimonialDraft) {
    const key = draft.id ? `testimonial-save-${draft.id}` : 'testimonial-create'
    setBusyKey(key)

    try {
      await saveTestimonial(toTestimonialPayload(draft), draft.id)

      if (!draft.id) {
        setNewTestimonialDraft(createEmptyTestimonialDraft())
      }

      showNotice(
        draft.id ? 'Testimonial updated.' : 'Testimonial created.',
        'success',
      )
    } catch (error) {
      showNotice(getErrorMessage(error, 'Unable to save testimonial.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function handleDeleteTestimonial(testimonialId: string) {
    setBusyKey(`testimonial-delete-${testimonialId}`)

    try {
      await removeTestimonial(testimonialId)
      showNotice('Testimonial deleted.', 'success')
    } catch (error) {
      showNotice(
        getErrorMessage(error, 'Unable to delete testimonial.'),
        'error',
      )
    } finally {
      setBusyKey('')
    }
  }

  async function handleSaveContactStatus(contactId: string) {
    setBusyKey(`contact-${contactId}`)

    try {
      await saveContactStatus(contactId, contactStatusDrafts[contactId] ?? 'new')
      showNotice('Contact status updated.', 'success')
    } catch (error) {
      showNotice(
        getErrorMessage(error, 'Unable to update contact status.'),
        'error',
      )
    } finally {
      setBusyKey('')
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusyKey('login')
    setNotice('')

    try {
      await login(loginEmail, loginPassword)
    } finally {
      setBusyKey('')
    }
  }

  if (authState === 'checking') {
    return (
      <main className="admin-shell">
        <section className="surface admin-card">
          <span className="eyebrow">Admin</span>
          <h1 className="admin-title">Checking admin session</h1>
          <p className="section-intro">
            Restoring the current session before loading admin content.
          </p>
        </section>
      </main>
    )
  }

  if (authState !== 'signed_in') {
    return (
      <main className="admin-shell admin-shell--narrow">
        <section className="surface surface--accent admin-card admin-login-card">
          <span className="eyebrow">Admin</span>
          <h1 className="admin-title">Resume platform admin</h1>
          <p className="section-intro">
            Sign in with the server admin credentials to edit portfolio content.
          </p>
          <form className="admin-stack" onSubmit={handleLogin}>
            <label className="field">
              <span>Email</span>
              <input
                autoComplete="username"
                type="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                autoComplete="current-password"
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
              />
            </label>
            {authError ? (
              <p className="admin-banner admin-banner--error">{authError}</p>
            ) : null}
            <div className="admin-actions">
              <button
                className="button button--primary"
                disabled={busyKey === 'login' || authState === 'signing_in'}
                type="submit"
              >
                {busyKey === 'login' || authState === 'signing_in'
                  ? 'Signing in...'
                  : 'Sign in'}
              </button>
            </div>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-shell">
      <header className="surface admin-topbar">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="admin-title">Content control panel</h1>
          <p className="admin-meta">
            Signed in as {adminSession?.email ?? 'admin'}
          </p>
        </div>
        <div className="admin-actions">
          <button
            className="button button--secondary"
            disabled={busyKey === 'refresh' || isLoadingData}
            onClick={() => void handleRefresh()}
            type="button"
          >
            {busyKey === 'refresh' ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            className="button button--primary"
            onClick={() => logout()}
            type="button"
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="admin-summary-grid">
        <article className="surface admin-summary-card">
          <span className="eyebrow">Projects</span>
          <strong>{projects.length}</strong>
          <p className="admin-meta">Live case studies in the public portfolio.</p>
        </article>
        <article className="surface admin-summary-card">
          <span className="eyebrow">Skills</span>
          <strong>{skills.length}</strong>
          <p className="admin-meta">Grouped skill sections managed in admin.</p>
        </article>
        <article className="surface admin-summary-card">
          <span className="eyebrow">Testimonials</span>
          <strong>{testimonials.length}</strong>
          <p className="admin-meta">Example testimonials currently shown on the site.</p>
        </article>
        <article className="surface admin-summary-card">
          <span className="eyebrow">Contacts</span>
          <strong>{contactCounts.new}</strong>
          <p className="admin-meta">New inbound contact items needing review.</p>
        </article>
      </section>

      {notice ? (
        <p
          className={[
            'admin-banner',
            noticeTone === 'success'
              ? 'admin-banner--success'
              : noticeTone === 'error'
                ? 'admin-banner--error'
                : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {notice}
        </p>
      ) : null}

      {authError ? <p className="admin-banner admin-banner--error">{authError}</p> : null}

      <section className="surface admin-card">
        <div className="admin-section-heading">
          <div>
            <span className="eyebrow">Profile</span>
            <h2>Profile content</h2>
          </div>
          <p className="admin-meta">One profile document powers the public site.</p>
        </div>
        <form className="admin-stack" onSubmit={handleSaveProfile}>
          <div className="field-grid">
            <label className="field">
              <span>Name</span>
              <input
                value={profileDraft.name}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Title</span>
              <input
                value={profileDraft.title}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Location</span>
              <input
                value={profileDraft.location}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    location: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Availability</span>
              <input
                value={profileDraft.availability}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    availability: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Contact Email</span>
              <input
                type="email"
                value={profileDraft.email}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>LinkedIn URL</span>
              <input
                value={profileDraft.linkedin}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    linkedin: event.target.value,
                  }))
                }
              />
            </label>
          </div>

          <label className="field">
            <span>Resume Link</span>
            <input
              value={profileDraft.resume}
              onChange={(event) =>
                setProfileDraft((current) => ({
                  ...current,
                  resume: event.target.value,
                }))
              }
            />
          </label>

          <label className="field">
            <span>Summary</span>
            <textarea
              rows={3}
              value={profileDraft.summary}
              onChange={(event) =>
                setProfileDraft((current) => ({
                  ...current,
                  summary: event.target.value,
                }))
              }
            />
          </label>

          <label className="field">
            <span>Intro</span>
            <textarea
              rows={4}
              value={profileDraft.intro}
              onChange={(event) =>
                setProfileDraft((current) => ({
                  ...current,
                  intro: event.target.value,
                }))
              }
            />
          </label>

          <label className="field">
            <span>About</span>
            <textarea
              rows={7}
              value={profileDraft.about}
              onChange={(event) =>
                setProfileDraft((current) => ({
                  ...current,
                  about: event.target.value,
                }))
              }
            />
          </label>

          <div className="admin-grid">
            <label className="field">
              <span>Certifications</span>
              <textarea
                rows={6}
                placeholder="One certification per line"
                value={profileDraft.certificationsText}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    certificationsText: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Strengths</span>
              <textarea
                rows={6}
                placeholder="One strength per line"
                value={profileDraft.strengthsText}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    strengthsText: event.target.value,
                  }))
                }
              />
            </label>
          </div>

          <label className="field">
            <span>Timeline</span>
            <textarea
              rows={6}
              placeholder="2024-Now | Senior DevOps Engineer | Led delivery and cloud automation"
              value={profileDraft.timelineText}
              onChange={(event) =>
                setProfileDraft((current) => ({
                  ...current,
                  timelineText: event.target.value,
                }))
              }
            />
          </label>

          <div className="admin-actions">
            <button
              className="button button--primary"
              disabled={busyKey === 'profile'}
              type="submit"
            >
              {busyKey === 'profile' ? 'Saving...' : 'Save profile'}
            </button>
          </div>
        </form>
      </section>

      <section className="surface admin-card">
        <div className="admin-section-heading">
          <div>
            <span className="eyebrow">Projects</span>
            <h2>Projects</h2>
          </div>
          <p className="admin-meta">Edit live project cards and add new case studies.</p>
        </div>

        <div className="admin-stack">
          {projectDrafts.map((draft) => (
            <article className="admin-card admin-card--nested" key={draft.id}>
              <div className="admin-section-heading">
                <h3>{draft.title || 'Untitled project'}</h3>
                <span className="admin-tag">Order {draft.order ?? 0}</span>
              </div>
              <div className="field-grid">
                <label className="field">
                  <span>Title</span>
                  <input
                    value={draft.title}
                    onChange={(event) =>
                      updateProjectDraft(draft.id ?? '', { title: event.target.value })
                    }
                  />
                </label>
                <label className="field">
                  <span>Timeframe</span>
                  <input
                    value={draft.timeframe}
                    onChange={(event) =>
                      updateProjectDraft(draft.id ?? '', {
                        timeframe: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>Role</span>
                  <input
                    value={draft.role}
                    onChange={(event) =>
                      updateProjectDraft(draft.id ?? '', { role: event.target.value })
                    }
                  />
                </label>
                <label className="field admin-checkbox">
                  <span>Featured</span>
                  <input
                    checked={draft.featured}
                    onChange={(event) =>
                      updateProjectDraft(draft.id ?? '', {
                        featured: event.target.checked,
                      })
                    }
                    type="checkbox"
                  />
                </label>
              </div>
              <label className="field">
                <span>Summary</span>
                <textarea
                  rows={3}
                  value={draft.summary}
                  onChange={(event) =>
                    updateProjectDraft(draft.id ?? '', { summary: event.target.value })
                  }
                />
              </label>
              <div className="admin-grid">
                <label className="field">
                  <span>Challenge</span>
                  <textarea
                    rows={4}
                    value={draft.challenge}
                    onChange={(event) =>
                      updateProjectDraft(draft.id ?? '', {
                        challenge: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>Solution</span>
                  <textarea
                    rows={4}
                    value={draft.solution}
                    onChange={(event) =>
                      updateProjectDraft(draft.id ?? '', {
                        solution: event.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="admin-grid">
                <label className="field">
                  <span>Stack</span>
                  <textarea
                    rows={5}
                    placeholder="One technology per line"
                    value={draft.stackText}
                    onChange={(event) =>
                      updateProjectDraft(draft.id ?? '', {
                        stackText: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>Metrics</span>
                  <textarea
                    rows={5}
                    placeholder="Deployment speed | +30%"
                    value={draft.metricsText}
                    onChange={(event) =>
                      updateProjectDraft(draft.id ?? '', {
                        metricsText: event.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <label className="field">
                <span>Outcomes</span>
                <textarea
                  rows={4}
                  placeholder="One outcome per line"
                  value={draft.outcomesText}
                  onChange={(event) =>
                    updateProjectDraft(draft.id ?? '', {
                      outcomesText: event.target.value,
                    })
                  }
                />
              </label>
              <div className="admin-actions">
                <button
                  className="button button--primary"
                  disabled={busyKey === `project-save-${draft.id}`}
                  onClick={() => void handleSaveProject(draft)}
                  type="button"
                >
                  {busyKey === `project-save-${draft.id}` ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="button button--secondary"
                  disabled={busyKey === `project-delete-${draft.id}`}
                  onClick={() => draft.id && void handleDeleteProject(draft.id)}
                  type="button"
                >
                  {busyKey === `project-delete-${draft.id}` ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))}

          <article className="admin-card admin-card--nested admin-card--new">
            <div className="admin-section-heading">
              <h3>Add project</h3>
              <span className="admin-tag">New</span>
            </div>
            <div className="field-grid">
              <label className="field">
                <span>Title</span>
                <input
                  value={newProjectDraft.title}
                  onChange={(event) =>
                    setNewProjectDraft((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Timeframe</span>
                <input
                  value={newProjectDraft.timeframe}
                  onChange={(event) =>
                    setNewProjectDraft((current) => ({
                      ...current,
                      timeframe: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Role</span>
                <input
                  value={newProjectDraft.role}
                  onChange={(event) =>
                    setNewProjectDraft((current) => ({
                      ...current,
                      role: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="field admin-checkbox">
                <span>Featured</span>
                <input
                  checked={newProjectDraft.featured}
                  onChange={(event) =>
                    setNewProjectDraft((current) => ({
                      ...current,
                      featured: event.target.checked,
                    }))
                  }
                  type="checkbox"
                />
              </label>
            </div>
            <label className="field">
              <span>Summary</span>
              <textarea
                rows={3}
                value={newProjectDraft.summary}
                onChange={(event) =>
                  setNewProjectDraft((current) => ({
                    ...current,
                    summary: event.target.value,
                  }))
                }
              />
            </label>
            <div className="admin-grid">
              <label className="field">
                <span>Challenge</span>
                <textarea
                  rows={4}
                  value={newProjectDraft.challenge}
                  onChange={(event) =>
                    setNewProjectDraft((current) => ({
                      ...current,
                      challenge: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Solution</span>
                <textarea
                  rows={4}
                  value={newProjectDraft.solution}
                  onChange={(event) =>
                    setNewProjectDraft((current) => ({
                      ...current,
                      solution: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <div className="admin-grid">
              <label className="field">
                <span>Stack</span>
                <textarea
                  rows={5}
                  value={newProjectDraft.stackText}
                  onChange={(event) =>
                    setNewProjectDraft((current) => ({
                      ...current,
                      stackText: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Metrics</span>
                <textarea
                  rows={5}
                  value={newProjectDraft.metricsText}
                  onChange={(event) =>
                    setNewProjectDraft((current) => ({
                      ...current,
                      metricsText: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <label className="field">
              <span>Outcomes</span>
              <textarea
                rows={4}
                value={newProjectDraft.outcomesText}
                onChange={(event) =>
                  setNewProjectDraft((current) => ({
                    ...current,
                    outcomesText: event.target.value,
                  }))
                }
              />
            </label>
            <div className="admin-actions">
              <button
                className="button button--primary"
                disabled={busyKey === 'project-create'}
                onClick={() => void handleSaveProject(newProjectDraft)}
                type="button"
              >
                {busyKey === 'project-create' ? 'Creating...' : 'Create project'}
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="surface admin-card">
        <div className="admin-section-heading">
          <div>
            <span className="eyebrow">Skills</span>
            <h2>Skills groups</h2>
          </div>
          <p className="admin-meta">Maintain the grouped stack shown on the site.</p>
        </div>

        <div className="admin-stack">
          {skillDrafts.map((draft) => (
            <article className="admin-card admin-card--nested" key={draft.id}>
              <div className="admin-section-heading">
                <h3>{draft.title || 'Untitled skill group'}</h3>
                <span className="admin-tag">Order {draft.order ?? 0}</span>
              </div>
              <div className="field-grid">
                <label className="field">
                  <span>Eyebrow</span>
                  <input
                    value={draft.eyebrow}
                    onChange={(event) =>
                      updateSkillDraft(draft.id ?? '', { eyebrow: event.target.value })
                    }
                  />
                </label>
                <label className="field">
                  <span>Title</span>
                  <input
                    value={draft.title}
                    onChange={(event) =>
                      updateSkillDraft(draft.id ?? '', { title: event.target.value })
                    }
                  />
                </label>
              </div>
              <label className="field">
                <span>Description</span>
                <textarea
                  rows={3}
                  value={draft.description}
                  onChange={(event) =>
                    updateSkillDraft(draft.id ?? '', {
                      description: event.target.value,
                    })
                  }
                />
              </label>
              <label className="field">
                <span>Items</span>
                <textarea
                  rows={5}
                  placeholder="One skill per line"
                  value={draft.itemsText}
                  onChange={(event) =>
                    updateSkillDraft(draft.id ?? '', { itemsText: event.target.value })
                  }
                />
              </label>
              <div className="admin-actions">
                <button
                  className="button button--primary"
                  disabled={busyKey === `skill-save-${draft.id}`}
                  onClick={() => void handleSaveSkill(draft)}
                  type="button"
                >
                  {busyKey === `skill-save-${draft.id}` ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="button button--secondary"
                  disabled={busyKey === `skill-delete-${draft.id}`}
                  onClick={() => draft.id && void handleDeleteSkill(draft.id)}
                  type="button"
                >
                  {busyKey === `skill-delete-${draft.id}` ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))}

          <article className="admin-card admin-card--nested admin-card--new">
            <div className="admin-section-heading">
              <h3>Add skill group</h3>
              <span className="admin-tag">New</span>
            </div>
            <div className="field-grid">
              <label className="field">
                <span>Eyebrow</span>
                <input
                  value={newSkillDraft.eyebrow}
                  onChange={(event) =>
                    setNewSkillDraft((current) => ({
                      ...current,
                      eyebrow: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Title</span>
                <input
                  value={newSkillDraft.title}
                  onChange={(event) =>
                    setNewSkillDraft((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <label className="field">
              <span>Description</span>
              <textarea
                rows={3}
                value={newSkillDraft.description}
                onChange={(event) =>
                  setNewSkillDraft((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Items</span>
              <textarea
                rows={5}
                value={newSkillDraft.itemsText}
                onChange={(event) =>
                  setNewSkillDraft((current) => ({
                    ...current,
                    itemsText: event.target.value,
                  }))
                }
              />
            </label>
            <div className="admin-actions">
              <button
                className="button button--primary"
                disabled={busyKey === 'skill-create'}
                onClick={() => void handleSaveSkill(newSkillDraft)}
                type="button"
              >
                {busyKey === 'skill-create' ? 'Creating...' : 'Create skill group'}
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="surface admin-card">
        <div className="admin-section-heading">
          <div>
            <span className="eyebrow">Testimonials</span>
            <h2>Testimonials</h2>
          </div>
          <p className="admin-meta">Keep the public social proof section current.</p>
        </div>

        <div className="admin-stack">
          {testimonialDrafts.map((draft) => (
            <article className="admin-card admin-card--nested" key={draft.id}>
              <div className="admin-section-heading">
                <h3>{draft.author || 'Untitled testimonial'}</h3>
                <span className="admin-tag">Order {draft.order ?? 0}</span>
              </div>
              <label className="field">
                <span>Quote</span>
                <textarea
                  rows={5}
                  value={draft.quote}
                  onChange={(event) =>
                    updateTestimonialDraft(draft.id ?? '', {
                      quote: event.target.value,
                    })
                  }
                />
              </label>
              <div className="field-grid">
                <label className="field">
                  <span>Author</span>
                  <input
                    value={draft.author}
                    onChange={(event) =>
                      updateTestimonialDraft(draft.id ?? '', {
                        author: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>Role</span>
                  <input
                    value={draft.role}
                    onChange={(event) =>
                      updateTestimonialDraft(draft.id ?? '', {
                        role: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>Company</span>
                  <input
                    value={draft.company}
                    onChange={(event) =>
                      updateTestimonialDraft(draft.id ?? '', {
                        company: event.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="admin-actions">
                <button
                  className="button button--primary"
                  disabled={busyKey === `testimonial-save-${draft.id}`}
                  onClick={() => void handleSaveTestimonial(draft)}
                  type="button"
                >
                  {busyKey === `testimonial-save-${draft.id}` ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="button button--secondary"
                  disabled={busyKey === `testimonial-delete-${draft.id}`}
                  onClick={() => draft.id && void handleDeleteTestimonial(draft.id)}
                  type="button"
                >
                  {busyKey === `testimonial-delete-${draft.id}`
                    ? 'Deleting...'
                    : 'Delete'}
                </button>
              </div>
            </article>
          ))}

          <article className="admin-card admin-card--nested admin-card--new">
            <div className="admin-section-heading">
              <h3>Add testimonial</h3>
              <span className="admin-tag">New</span>
            </div>
            <label className="field">
              <span>Quote</span>
              <textarea
                rows={5}
                value={newTestimonialDraft.quote}
                onChange={(event) =>
                  setNewTestimonialDraft((current) => ({
                    ...current,
                    quote: event.target.value,
                  }))
                }
              />
            </label>
            <div className="field-grid">
              <label className="field">
                <span>Author</span>
                <input
                  value={newTestimonialDraft.author}
                  onChange={(event) =>
                    setNewTestimonialDraft((current) => ({
                      ...current,
                      author: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Role</span>
                <input
                  value={newTestimonialDraft.role}
                  onChange={(event) =>
                    setNewTestimonialDraft((current) => ({
                      ...current,
                      role: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Company</span>
                <input
                  value={newTestimonialDraft.company}
                  onChange={(event) =>
                    setNewTestimonialDraft((current) => ({
                      ...current,
                      company: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <div className="admin-actions">
              <button
                className="button button--primary"
                disabled={busyKey === 'testimonial-create'}
                onClick={() => void handleSaveTestimonial(newTestimonialDraft)}
                type="button"
              >
                {busyKey === 'testimonial-create'
                  ? 'Creating...'
                  : 'Create testimonial'}
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="surface admin-card">
        <div className="admin-section-heading">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Contact submissions</h2>
          </div>
          <p className="admin-meta">
            {contacts.length} total submissions. Latest status:{' '}
            {contacts[0]?.status ?? 'none'}
          </p>
        </div>

        <div className="admin-actions">
          <button
            className={[
              'button',
              contactFilter === 'all' ? 'button--primary' : 'button--secondary',
            ].join(' ')}
            onClick={() => setContactFilter('all')}
            type="button"
          >
            All ({contactCounts.all})
          </button>
          {CONTACT_STATUSES.map((status) => (
            <button
              className={[
                'button',
                contactFilter === status ? 'button--primary' : 'button--secondary',
              ].join(' ')}
              key={status}
              onClick={() => setContactFilter(status)}
              type="button"
            >
              {status} ({contactCounts[status]})
            </button>
          ))}
        </div>

        {visibleContacts.length === 0 ? (
          <p className="admin-empty">
            {contacts.length === 0
              ? 'No contact submissions yet. Public contact requests will appear here.'
              : `No ${contactFilter} contact submissions right now.`}
          </p>
        ) : (
          <div className="admin-stack">
            {visibleContacts.map((contact) => {
              const draftStatus = contactStatusDrafts[contact.id] ?? contact.status

              return (
                <article className="admin-card admin-card--nested" key={contact.id}>
                  <div className="admin-section-heading">
                    <div>
                      <h3>{contact.name}</h3>
                      <p className="admin-meta">
                        {contact.email} • {contact.inquiryType} •{' '}
                        {new Date(contact.receivedAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="admin-tag">{contact.status}</span>
                  </div>
                  <p className="admin-message">{contact.message}</p>
                  <div className="admin-actions admin-actions--split">
                    <label className="field admin-field-inline">
                      <span>Status</span>
                      <select
                        value={draftStatus}
                        onChange={(event) =>
                          setContactStatusDrafts((current) => ({
                            ...current,
                            [contact.id]: event.target.value as ContactSubmissionStatus,
                          }))
                        }
                      >
                        {CONTACT_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      className="button button--primary"
                      disabled={
                        busyKey === `contact-${contact.id}` ||
                        draftStatus === contact.status
                      }
                      onClick={() => void handleSaveContactStatus(contact.id)}
                      type="button"
                    >
                      {busyKey === `contact-${contact.id}`
                        ? 'Saving...'
                        : 'Update status'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
