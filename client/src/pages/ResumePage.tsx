import { useEffect } from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'

export function ResumePage() {
  const { profile, projects, skills } = usePortfolioData()
  const featuredProjects = projects.filter((p) => p.featured)

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

  return (
    <div className="resume-shell">
      {/* Toolbar — hidden on print */}
      <div className="resume-toolbar">
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.45rem 1rem',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '9pt',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            textDecoration: 'none',
          }}
        >
          ← Back to site
        </a>
        <button
          onClick={() => window.print()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.45rem 1.25rem',
            background: '#1d3557',
            border: 'none',
            borderRadius: '6px',
            fontSize: '9pt',
            fontFamily: 'Arial, sans-serif',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Download PDF
        </button>
      </div>

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
          </div>

          {/* Summary */}
          <div className="resume-sidebar-section">
            <p className="resume-sidebar-heading">Summary</p>
            <p className="resume-summary">{profile.summary}</p>
          </div>

          {/* Skills — compact overview */}
          <div className="resume-sidebar-section">
            <p className="resume-sidebar-heading">Skills</p>
            {skills.map((group) => (
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
              {profile.certifications.map((cert) => (
                <span className="resume-cert" key={cert}>· {cert}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PAGE 2 ── Core Strengths | Projects · Technical Skills */}
      <div className="resume-page resume-page-2">
        {/* Sidebar */}
        <div className="resume-sidebar">
          <div className="resume-sidebar-section">
            <p className="resume-sidebar-heading">Core Strengths</p>
            <ul className="resume-sidebar-list">
              {profile.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
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
                      <span className="resume-project-title">{project.title}</span>
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
