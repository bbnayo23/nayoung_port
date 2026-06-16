import { Badge } from '../../components/ui/Badge'
import { career } from '../../data'
import {
  section, inner, sectionTag, sectionTitle,
  items, item, itemMeta, period, company,
  itemBody, itemRole, itemDesc,
  highlights, highlight, highlightDot, highlightContent,
  highlightTitle, highlightDetail, tags,
} from './Career.css'

export function Career() {
  return (
    <section id="career" className={section} aria-label="Career">
      <div className={inner}>
        <span className={sectionTag}>01 — Career</span>
        <h2 className={sectionTitle}>Experience</h2>

        <div className={items}>
          {career.map((c) => (
            <article key={c.company} className={item}>
              <div className={itemMeta}>
                <p className={period}>{c.period}</p>
                <p className={company}>{c.company}</p>
              </div>
              <div className={itemBody}>
                <h3 className={itemRole}>{c.role}</h3>
                <p className={itemDesc}>{c.description}</p>
                <div className={highlights}>
                  {c.highlights.map((h) => (
                    <div key={h.title} className={highlight}>
                      <span className={highlightDot} aria-hidden="true" />
                      <div className={highlightContent}>
                        <p className={highlightTitle}>{h.title}</p>
                        <p className={highlightDetail}>{h.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={tags}>
                  {c.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
