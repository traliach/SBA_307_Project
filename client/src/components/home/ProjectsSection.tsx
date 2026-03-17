import type { ProjectSummary } from '../../types/site'

interface ProjectsSectionProps {
  projects: ProjectSummary[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="section" id="projects">
      <div className="surface">
        <span className="eyebrow">Projects</span>
        <h2>Case-study style delivery work</h2>
        <p className="section-intro">
          These projects now carry enough structure to read like concise case studies instead of
          simple summary cards. The next step after this is route-level project detail pages.
        </p>

        <div className="grid grid--cards">
          {projects.map((project) => (
            <article className="surface project-card" key={project.title}>
              <div className="project-heading">
                <div>
                  <span className="eyebrow">{project.featured ? 'Featured project' : 'Project'}</span>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-meta">{project.timeframe}</p>
              </div>

              <p className="project-role">{project.role}</p>
              <p>{project.summary}</p>

              <div className="project-story">
                <div>
                  <span className="eyebrow">Challenge</span>
                  <p>{project.challenge ?? project.summary}</p>
                </div>
                <div>
                  <span className="eyebrow">Approach</span>
                  <p>{project.solution ?? 'Delivery and automation improvements applied across the stack.'}</p>
                </div>
              </div>

              {project.metrics?.length ? (
                <div className="project-metrics">
                  {project.metrics.map((metric) => (
                    <div className="metric-chip" key={`${project.title}-${metric.label}`}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <ul className="stack-list">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <ul className="project-outcomes">
                {project.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="project-actions">
                <a className="button button--secondary" href="/contact">
                  Discuss similar work
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
