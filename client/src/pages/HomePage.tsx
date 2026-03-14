import { startTransition, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { StatusPill } from '../components/StatusPill'
import {
  contactItems,
  fallbackProfile,
  highlightMetrics,
  initialContactForm,
  contactTopics,
  projectSummaries as fallbackProjects,
  skillGroups as fallbackSkillGroups,
} from '../features/portfolio/content'
import {
  fetchHealth,
  fetchProfile,
  fetchProjects,
  fetchSkills,
  submitContact,
} from '../services/api'
import type {
  ApiHealth,
  ApiState,
  ContactSubmissionInput,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
} from '../types/site'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function HomePage() {
  const [apiState, setApiState] = useState<ApiState>('loading')
  const [health, setHealth] = useState<ApiHealth | null>(null)
  const [profile, setProfile] = useState<ProfileContent>(fallbackProfile)
  const [projects, setProjects] = useState<ProjectSummary[]>(fallbackProjects)
  const [skills, setSkills] = useState<SkillGroup[]>(fallbackSkillGroups)
  const [contactForm, setContactForm] =
    useState<ContactSubmissionInput>(initialContactForm)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    let active = true

    async function loadData() {
      const [healthResult, profileResult, projectResult, skillResult] =
        await Promise.allSettled([
          fetchHealth(),
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
        ])

      if (!active) {
        return
      }

      startTransition(() => {
        if (healthResult.status === 'fulfilled') {
          setHealth(healthResult.value)
          setApiState('online')
        } else {
          setApiState('offline')
        }

        if (profileResult.status === 'fulfilled') {
          setProfile(profileResult.value)
        }

        if (projectResult.status === 'fulfilled') {
          setProjects(projectResult.value)
        }

        if (skillResult.status === 'fulfilled') {
          setSkills(skillResult.value)
        }
      })
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

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState('submitting')
    setSubmitMessage('')

    try {
      const result = await submitContact(contactForm)
      setSubmitState('success')
      setSubmitMessage(result.message)
      setContactForm(initialContactForm)
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send message right now.',
      )
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand__name">{profile.name}</span>
          <span className="brand__role">{profile.title}</span>
        </div>

        <nav className="nav-links" aria-label="Portfolio sections">
          <a href="#overview">Overview</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="overview">
        <div className="surface surface--accent">
          <span className="eyebrow">{profile.location}</span>
          <h1>Full-stack portfolio scaffold, now backed by an API.</h1>
          <p className="lead">{profile.summary}</p>
          <p className="hero-copy">{profile.intro}</p>

          <div className="hero-actions">
            <a className="button button--primary" href="#projects">
              View starter sections
            </a>
            <a className="button button--secondary" href="#contact">
              Open contact block
            </a>
          </div>
        </div>

        <aside className="surface hero-meta">
          <StatusPill state={apiState} timestamp={health?.timestamp ?? null} />
          <div>
            <span className="eyebrow">Current stack</span>
            <ul className="cert-list">
              {profile.certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">Next build phase</span>
            <ul className="detail-list">
              <li>Replace static HTML sections with routed React pages.</li>
              <li>Move content into API-managed profile, projects, and skills modules.</li>
              <li>Connect the contact experience to a persisted submission flow.</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="surface">
          <span className="eyebrow">Foundation</span>
          <h2>Week 1 progress, inside the new client.</h2>
          <p className="section-intro">
            This shell replaces the Vite starter page and reads from the future API shape already.
            When the server is running, the status pill turns online and the client can read
            profile, project, and skill data from `/api`.
          </p>

          <div className="grid grid--metrics">
            {highlightMetrics.map((item) => (
              <article className="surface metric-card" key={item.label}>
                <span className="eyebrow">{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="surface">
          <span className="eyebrow">Projects</span>
          <h2>API-ready project cards</h2>
          <p className="section-intro">
            The project structure is already typed so it can later move out of hardcoded content
            and into Mongo-backed data.
          </p>

          <div className="grid grid--cards">
            {projects.map((project) => (
              <article className="surface project-card" key={project.title}>
                <span className="eyebrow">{project.title}</span>
                <p className="project-meta">{project.timeframe}</p>
                <p>{project.summary}</p>
                <ul className="stack-list">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ul>
                  {project.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="surface">
          <span className="eyebrow">Skills</span>
          <h2>Grouped skill modules</h2>
          <p className="section-intro">
            These sections match the server API shape so the next step can swap static content for
            live data without rewriting the UI structure.
          </p>

          <div className="grid grid--cards">
            {skills.map((group) => (
              <article className="surface skill-card" key={group.title}>
                <span className="eyebrow">{group.eyebrow}</span>
                <h3>{group.title}</h3>
                <p className="section-intro">{group.description}</p>
                <ul className="stack-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="surface contact-layout">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Connected contact flow</h2>
            <p className="section-intro">
              The client now posts to the API. Right now submissions are validated and stored
              in-memory on the server, which is enough to prove the flow before MongoDB is added.
            </p>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="field-grid">
                <label className="field">
                  <span>Name</span>
                  <input
                    name="name"
                    type="text"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Your full name"
                    required
                  />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <label className="field">
                <span>Inquiry</span>
                <select
                  name="inquiryType"
                  value={contactForm.inquiryType}
                  onChange={handleContactChange}
                >
                  {contactTopics.map((topic) => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Message</span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Share the role, project, or delivery problem you want to discuss."
                  rows={5}
                  required
                />
              </label>

              <div className="form-actions">
                <button
                  className="button button--primary"
                  type="submit"
                  disabled={submitState === 'submitting'}
                >
                  {submitState === 'submitting' ? 'Sending...' : 'Send message'}
                </button>

                {submitMessage ? (
                  <p className={`form-status form-status--${submitState}`}>
                    {submitMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </div>

          <div className="contact-links">
            {contactItems.map((item) => (
              <article className="surface contact-card" key={item.label}>
                <span className="eyebrow">{item.label}</span>
                {item.href ? <a href={item.href}>{item.value}</a> : <p>{item.value}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Client scaffold ready. Next step: install and run the server workspace.</p>
      </footer>
    </div>
  )
}
