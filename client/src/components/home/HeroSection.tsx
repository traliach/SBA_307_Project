import { nextBuildSteps } from '../../features/portfolio/content'
import type { ApiHealth, ApiState, ProfileContent } from '../../types/site'
import { StatusPill } from '../StatusPill'

interface HeroSectionProps {
  apiState: ApiState
  health: ApiHealth | null
  profile: ProfileContent
}

export function HeroSection({ apiState, health, profile }: HeroSectionProps) {
  return (
    <section className="hero" id="overview">
      <div className="surface surface--accent">
        <span className="eyebrow">{profile.location}</span>
        <h1>Full-stack portfolio scaffold, now backed by an API.</h1>
        <p className="lead">{profile.summary}</p>
        <p className="hero-copy">{profile.intro}</p>

        <div className="hero-actions">
          <a className="button button--primary" href={profile.links.resume} download>
            Download resume
          </a>
          <a className="button button--secondary" href="#about">
            Read profile story
          </a>
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
            {nextBuildSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  )
}
