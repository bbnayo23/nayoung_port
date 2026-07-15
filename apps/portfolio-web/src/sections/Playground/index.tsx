import { Badge } from '@/components/ui/Badge'
import { playgroundItems } from '@/data'
import {
  section, inner, sectionTag, sectionTitle, sectionDesc,
  grid, card, cardIcon, cardTitle, cardDesc, cardTags,
} from './Playground.css'

const icons: Record<string, string> = {
  'design-tokens': '🎨',
  'component-playground': '⚡',
  'motion-ui': '✦',
}

export function Playground() {
  return (
    <section id="playground" className={section} aria-label="Playground">
      <div className={inner}>
        <span className={sectionTag}>04 — Playground</span>
        <h2 className={sectionTitle}>Experiments</h2>
        <p className={sectionDesc}>
          디자인 토큰·공통 컴포넌트·인터랙션을 다듬는 UI 실험과 퍼블리싱 탐구.
        </p>

        <div className={grid}>
          {playgroundItems.map((item) => (
            <article key={item.id} className={card} data-glass>
              <div className={cardIcon} aria-hidden="true">
                {icons[item.id]}
              </div>
              <h3 className={cardTitle}>{item.title}</h3>
              <p className={cardDesc}>{item.description}</p>
              <div className={cardTags}>
                {item.tags.map((t) => (
                  <Badge key={t} variant={t.includes('Claude') ? 'purple' : 'default'}>
                    {t}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
