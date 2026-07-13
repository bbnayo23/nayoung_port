import { Badge } from '../../components/ui/Badge'
import { projects } from '../../data'
import type { Project } from '../../data'
import {
  section, inner, sectionTag, sectionTitle, moreTitle,
  grid, card, cardClickable, cardHeader, cardName,
  statusBadge, cardTagline, cardDesc,
  cardFooter, cardTags, cardLink,
  caseList, caseCard, caseHead, caseHeadText, caseRole, caseRoleLabel,
  metricRow, metric, metricValue, metricLabel,
  caseBody, caseBlock, caseBlockLabel, casePoints, casePoint,
  mediaRow, mediaItem, mediaKind, mediaCaption, caseLinks,
} from './Projects.css'

const statusLabel = {
  shipped: 'Shipped',
  'in-progress': 'In Progress',
  experiment: 'Experiment',
} as const

/** 케이스 스터디 — 문제 → 과정 → 성과 서사를 담은 상세 블록. */
function CaseStudyCard({ project }: { project: Project }) {
  const cs = project.caseStudy!
  const blocks = [
    { label: 'Problem', points: cs.problem },
    { label: 'Process', points: cs.process },
    { label: 'Outcome', points: cs.outcome },
  ]

  return (
    <article className={caseCard} data-glass aria-label={`${project.name} 케이스 스터디`}>
      <header className={caseHead}>
        <div className={caseHeadText}>
          <h3 className={cardName}>{project.name}</h3>
          <p className={cardTagline}>{project.tagline}</p>
        </div>
        <span className={statusBadge[project.status]}>{statusLabel[project.status]}</span>
      </header>

      <p className={caseRole}>
        <span className={caseRoleLabel}>Role</span>
        {cs.role}
      </p>

      {cs.metrics && cs.metrics.length > 0 && (
        <div className={metricRow}>
          {cs.metrics.map((m) => (
            <div key={m.label} className={metric}>
              <span className={metricValue}>{m.value}</span>
              <span className={metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className={caseBody}>
        {blocks.map((b) => (
          <section key={b.label} className={caseBlock}>
            <h4 className={caseBlockLabel}>{b.label}</h4>
            <ul className={casePoints}>
              {b.points.map((p, i) => (
                <li key={i} className={casePoint}>{p}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {cs.media && cs.media.length > 0 && (
        <div className={mediaRow}>
          {cs.media.map((m) => (
            <a
              key={m.caption}
              className={mediaItem}
              href={m.href}
              target={m.href?.startsWith('http') ? '_blank' : undefined}
              rel={m.href?.startsWith('http') ? 'noreferrer' : undefined}
            >
              <span className={mediaKind} data-kind={m.kind}>
                {m.kind === 'before' ? 'Before' : 'After'}
              </span>
              <span className={mediaCaption}>{m.caption}</span>
            </a>
          ))}
        </div>
      )}

      <div className={cardFooter}>
        <div className={cardTags}>
          {project.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        {cs.links && cs.links.length > 0 && (
          <div className={caseLinks}>
            {cs.links.map((l) => (
              <a
                key={l.label}
                className={cardLink}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {l.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

/** 케이스 스터디가 없는 프로젝트 — 요약 카드. */
function SummaryCard({ project }: { project: Project }) {
  const body = (
    <>
      <div className={cardHeader}>
        <h3 className={cardName}>{project.name}</h3>
        <span className={statusBadge[project.status]}>{statusLabel[project.status]}</span>
      </div>
      <p className={cardTagline}>{project.tagline}</p>
      <p className={cardDesc}>{project.description}</p>
      <div className={cardFooter}>
        <div className={cardTags}>
          {project.tags.slice(0, 3).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        {project.link && <span className={cardLink}>View →</span>}
      </div>
    </>
  )

  return project.link ? (
    <a
      href={project.link}
      className={`${card} ${cardClickable}`}
      data-glass
      aria-label={`${project.name} 프로젝트 열기`}
    >
      {body}
    </a>
  ) : (
    <article className={card} data-glass>
      {body}
    </article>
  )
}

export function Projects() {
  const caseStudies = projects.filter((p) => p.caseStudy)
  const rest = projects.filter((p) => !p.caseStudy)

  return (
    <section id="projects" className={section} aria-label="Projects">
      <div className={inner}>
        <span className={sectionTag}>02 — Projects</span>
        <h2 className={sectionTitle}>What I've Built</h2>

        {caseStudies.length > 0 && (
          <div className={caseList}>
            {caseStudies.map((p) => (
              <CaseStudyCard key={p.id} project={p} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <>
            <h3 className={moreTitle}>More</h3>
            <div className={grid}>
              {rest.map((p) => (
                <SummaryCard key={p.id} project={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
