import { Badge } from '../../components/ui/Badge'
import { personal, techStack } from '../../data'
import {
  section, bg, content,
  statusRow, statusDot, statusLabel,
  name, roles, role, roleSep, bio, stack,
  actions, primaryBtn, secondaryBtn,
  scrollHint, scrollLine, scrollLabel,
} from './Hero.css'

export function Hero() {
  return (
    <section id="hero" className={section} aria-label="Introduction">
      <div className={bg} aria-hidden="true" />

      <div className={content}>
        <div className={statusRow}>
          <span className={statusDot} aria-hidden="true" />
          <span className={statusLabel}>Available for opportunities</span>
        </div>

        <h1 className={name}>{personal.nameEn}</h1>

        <div className={roles} aria-label="Roles">
          {personal.roles.map((r, i) => (
            <>
              <span key={r} className={role}>{r}</span>
              {i < personal.roles.length - 1 && (
                <span key={`sep-${i}`} className={roleSep} aria-hidden="true">/</span>
              )}
            </>
          ))}
        </div>

        <p className={bio}>{personal.bio}</p>

        <div className={stack} aria-label="Tech stack">
          {techStack.map((tech) => (
            <Badge
              key={tech.name}
              variant={
                tech.type === 'ai' ? 'purple' :
                tech.type === 'lang' ? 'accent' :
                'default'
              }
            >
              {tech.name}
            </Badge>
          ))}
        </div>

        <div className={actions}>
          <a href="#projects" className={primaryBtn}>
            View Projects
          </a>
          <a href={`mailto:${personal.email}`} className={secondaryBtn}>
            Get in touch
          </a>
        </div>
      </div>

      <div className={scrollHint} aria-hidden="true">
        <span className={scrollLine} />
        <span className={scrollLabel}>scroll</span>
      </div>
    </section>
  )
}
