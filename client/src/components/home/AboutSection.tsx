import type { ProfileContent } from '../../types/site'

interface AboutSectionProps {
  profile: ProfileContent
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="section" id="about">
      <div className="surface about-layout">
        <div>
          <span className="eyebrow">About</span>
          <h2>Execution-focused cloud and delivery engineering</h2>
          <p className="section-intro">{profile.about}</p>

          <div className="about-actions">
            <a className="button button--primary" href={profile.links.resume} download>
              Download resume
            </a>
            <a className="button button--secondary" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              View LinkedIn
            </a>
          </div>

          <div className="availability-note">
            <span className="eyebrow">Availability</span>
            <p>{profile.availability}</p>
          </div>
        </div>

        <div className="about-panels">
          <article className="surface">
            <span className="eyebrow">Core strengths</span>
            <ul className="detail-list">
              {profile.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="surface">
            <span className="eyebrow">Career timeline</span>
            <div className="timeline-list">
              {profile.timeline.map((item) => (
                <div className="timeline-item" key={`${item.title}-${item.period}`}>
                  <p className="timeline-period">{item.period}</p>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
