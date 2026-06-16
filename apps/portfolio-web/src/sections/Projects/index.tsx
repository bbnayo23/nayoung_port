import { Badge } from '../../components/ui/Badge'
import { projects } from '../../data'
import {
  section, inner, sectionTag, sectionTitle,
  grid, card, cardHeader, cardName,
  statusBadge, cardTagline, cardDesc,
  cardFooter, cardTags, cardLink,
} from './Projects.css'

const statusLabel = {
  shipped: 'Shipped',
  'in-progress': 'In Progress',
  experiment: 'Experiment',
} as const

export function Projects() {
  return (
    <section id="projects" className={section} aria-label="Projects">
      <div className={inner}>
        <span className={sectionTag}>02 — Projects</span>
        <h2 className={sectionTitle}>What I've Built</h2>

        <div className={grid}>
          {projects.map((project) => (
            <article key={project.id} className={card}>
              <div className={cardHeader}>
                <h3 className={cardName}>{project.name}</h3>
                <span className={statusBadge[project.status]}>
                  {statusLabel[project.status]}
                </span>
              </div>

              <p className={cardTagline}>{project.tagline}</p>
              <p className={cardDesc}>{project.description}</p>

              <div className={cardFooter}>
                <div className={cardTags}>
                  {project.tags.slice(0, 3).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} className={cardLink} aria-label={`View ${project.name}`}>
                    View →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
