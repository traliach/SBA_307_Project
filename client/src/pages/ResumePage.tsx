import React, { useEffect, useState } from 'react'
import { certificationLinks } from '../features/portfolio/content'
import { profileFr, projectsFr, skillsFr } from '../features/portfolio/resume.fr'
import { useDarkMode } from '../hooks/useDarkMode'
import { usePortfolioData } from '../hooks/usePortfolioData'

export function ResumePage() {
  const { profile: profileEn, projects: projectsEn, skills: skillsEn } = usePortfolioData()
  const [lang, setLang] = useState<'en' | 'fr'>('en')
  const { dark, toggle: toggleDark } = useDarkMode()

  const profile = lang === 'fr' ? profileFr : profileEn
  const skills = lang === 'fr' ? skillsFr : skillsEn
  const allProjects = lang === 'fr' ? projectsFr : projectsEn

  const RESUME_PROJECT_TITLES = [
    'k8s-platform-lab — Self-Hosted Kubernetes Platform',
    'cloud_resume_infra — AWS Resume Platform',
    'devops_platform — Self-Hosted DevOps Platform',
    'Restaurant Deals — MERN Marketplace',
  ]
  const featuredProjects = RESUME_PROJECT_TITLES
    .map((t) => allProjects.find((p) => p.title === t))
    .filter((p): p is (typeof allProjects)[number] => p !== undefined)

  useEffect(() => {
    document.title = `${profile.name} | Resume`
    return () => {
      document.title = 'Ali Achille Traore | Portfolio'
    }
  }, [profile.name])

  function formatEmail(raw: string) {
    return raw.replace('mailto:', '')
  }

  function formatUrl(raw: string) {
    return raw.replace('https://', '').replace('http://', '')
  }

  function formatProjectTitle(raw: string) {
    if (raw === 'cloud_resume_infra — AWS Resume Platform') {
      return 'Serverless Resume Platform on AWS'
    }

    if (raw === 'k8s-platform-lab — Self-Hosted Kubernetes Platform') {
      return 'Self-Hosted Kubernetes Platform'
    }

    if (raw === 'devops_platform — Self-Hosted DevOps Platform') {
      return 'Self-Hosted DevOps Platform'
    }

    return raw
  }

  const toolbarBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.45rem 1rem',
    borderRadius: '6px',
    fontSize: '9pt',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  }

  return (
    <div className="resume-shell">
      {/* Toolbar — hidden on print */}
      <div className="resume-toolbar">
        <a
          href="/"
          style={{ ...toolbarBase, background: dark ? '#1c2028' : '#fff', border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : '#ccc'}`, color: dark ? '#d1d5db' : '#333', textDecoration: 'none' }}
        >
          ← Back to site
        </a>

        {/* EN / FR toggle */}
        <div style={{ display: 'inline-flex', borderRadius: '6px', overflow: 'hidden', border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : '#ccc'}` }}>
          {(['en', 'fr'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                ...toolbarBase,
                padding: '0.45rem 0.85rem',
                border: 'none',
                borderRadius: 0,
                background: lang === l ? '#1d3557' : dark ? '#1c2028' : '#fff',
                color: lang === l ? '#fff' : dark ? '#9ca3af' : '#555',
                fontWeight: lang === l ? 700 : 400,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ ...toolbarBase, background: dark ? '#1c2028' : '#fff', border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : '#ccc'}`, color: dark ? '#d1d5db' : '#555', padding: '0.45rem 0.65rem' }}
        >
          {dark ? '☀' : '☾'}
        </button>

        <button
          onClick={() => window.print()}
          style={{ ...toolbarBase, background: '#1d3557', border: 'none', color: '#fff', padding: '0.45rem 1.25rem' }}
        >
          Download PDF
        </button>
      </div>
      <p className="resume-print-tip" style={{
        maxWidth: '8.5in',
        margin: '0 auto 0.75rem',
        fontSize: '8pt',
        fontFamily: 'Arial, sans-serif',
        color: '#777',
        textAlign: 'right',
      }}>
        Tip: in Chrome's print dialog → More settings → uncheck <strong>Headers and footers</strong> for a clean 2-page PDF.
      </p>

      {/* ── PAGE 1 ── Name · Contact · Summary · Skills | Experience · Certifications */}
      <div className="resume-page">
        {/* Sidebar */}
        <div className="resume-sidebar">
          {/* Name block */}
          <div>
            <h1 className="resume-name">{profile.name}</h1>
            <p className="resume-title">{profile.title}</p>
          </div>

          {/* Contact */}
          <div className="resume-sidebar-section">
            <p className="resume-sidebar-heading">Contact</p>
            <div className="resume-contact-item">
              <a href={profile.links.email}>{formatEmail(profile.links.email)}</a>
            </div>
            <div className="resume-contact-item">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                {formatUrl(profile.links.linkedin)}
              </a>
            </div>
            <div className="resume-contact-item">
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                {formatUrl(profile.links.github)}
              </a>
            </div>
            <div className="resume-contact-item">{profile.location}</div>
            <div className="resume-contact-item">(646) 750-8151</div>
            <div className="resume-contact-item">
              <a href="https://achille.tech" target="_blank" rel="noreferrer">achille.tech</a>
            </div>
          </div>

          {/* Summary */}
          <div className="resume-sidebar-section">
            <p className="resume-sidebar-heading">Summary</p>
            <p className="resume-summary">{profile.summary}</p>
          </div>

          {/* Skills — DevOps groups only (full table on page 2) */}
          <div className="resume-sidebar-section">
            <p className="resume-sidebar-heading">Skills</p>
            {skills.slice(0, 4).map((group) => (
              <div className="resume-sidebar-skill" key={group.eyebrow}>
                <span className="resume-sidebar-skill-label">{group.eyebrow}</span>
                <span className="resume-sidebar-skill-items">{group.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="resume-main">
          {/* Experience */}
          <div className="resume-section">
            <p className="resume-section-title">Experience</p>
            <div className="resume-timeline">
              {profile.timeline.map((item) => (
                <div className="resume-timeline-item" key={`${item.title}-${item.period}`}>
                  <div className="resume-timeline-header">
                    <span className="resume-timeline-role">{item.title}</span>
                    <span className="resume-timeline-period">{item.period}</span>
                  </div>
                  <p className="resume-timeline-detail">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="resume-section">
            <p className="resume-section-title">Certifications</p>
            <div className="resume-certs">
              {profile.certifications.map((cert) => {
                const url = certificationLinks[cert]
                return url ? (
                  <a className="resume-cert" href={url} key={cert} target="_blank" rel="noreferrer">· {cert}</a>
                ) : (
                  <span className="resume-cert" key={cert}>· {cert}</span>
                )
              })}
            </div>
          </div>

          {/* Core Strengths — fills remaining space on page 1 */}
          <div className="resume-section">
            <p className="resume-section-title">Core Strengths</p>
            <ul className="resume-strengths">
              {profile.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── PAGE 2 ── Projects · Technical Skills */}
      <div className="resume-page resume-page-2">
        {/* Sidebar — page 2 brand accent */}
        <div className="resume-sidebar">
          <div>
            <p className="resume-name" style={{ fontSize: '13pt' }}>{profile.name}</p>
            <p className="resume-title">{profile.title}</p>
          </div>
          <div className="resume-sidebar-section">
            <p className="resume-sidebar-heading">Availability</p>
            <p className="resume-summary">{profile.availability}</p>
          </div>
          <div className="resume-sidebar-section">
            <p className="resume-sidebar-heading">Certifications</p>
            {profile.certifications.map((cert) => (
              <div className="resume-contact-item" key={cert}>· {cert}</div>
            ))}
          </div>
          <div className="resume-sidebar-section">
            <p className="resume-sidebar-heading">Contact</p>
            <div className="resume-contact-item">
              <a href={profile.links.email}>{formatEmail(profile.links.email)}</a>
            </div>
            <div className="resume-contact-item">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                {formatUrl(profile.links.linkedin)}
              </a>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="resume-main">
          {/* Projects */}
          {featuredProjects.length > 0 && (
            <div className="resume-section">
              <p className="resume-section-title">Projects</p>
              <div className="resume-projects">
                {featuredProjects.map((project) => (
                  <div className="resume-project-item" key={project.title}>
                    <div className="resume-project-header">
                      <span className="resume-project-title">{formatProjectTitle(project.title)}</span>
                      <span className="resume-project-meta">
                        {project.role} · {project.timeframe}
                      </span>
                    </div>
                    <p className="resume-project-stack">{project.stack.join(' · ')}</p>
                    <ul className="resume-project-outcomes">
                      {project.outcomes.slice(0, 3).map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Skills */}
          <div className="resume-section">
            <p className="resume-section-title">Technical Skills</p>
            <div className="resume-skills">
              {skills.map((group) => (
                <div className="resume-skill-row" key={group.eyebrow}>
                  <span className="resume-skill-label">{group.eyebrow}</span>
                  <span className="resume-skill-items">{group.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
