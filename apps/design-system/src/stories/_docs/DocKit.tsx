import type { ReactNode } from 'react'
import * as s from './DocKit.css'

/**
 * DocKit — MDX 를 대체하는 "문서 스토리(.docs.stories.tsx)" 공용 UI 키트.
 * 디자인 토큰(vars) 기반으로 트렌디하고 가독성 높은 문서 레이아웃을 조립한다.
 * 각 컴포넌트의 X.docs.stories.tsx 는 이 키트를 조합해 문서 페이지를 구성한다.
 */

export function DocPage({ children }: { children: ReactNode }) {
  return (
    <div className={s.page}>
      <div className={s.inner}>{children}</div>
    </div>
  )
}

export function DocHero({
  eyebrow,
  title,
  subtitle,
  importCode,
  children,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  importCode?: string
  children?: ReactNode
}) {
  return (
    <header className={s.hero}>
      {eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}
      <h1 className={s.heroTitle}>{title}</h1>
      {subtitle && <p className={s.heroSubtitle}>{subtitle}</p>}
      {importCode && (
        <div className={s.importRow}>
          <span className={s.importChip}>{importCode}</span>
        </div>
      )}
      {children && <div className={s.heroPreview}>{children}</div>}
    </header>
  )
}

export function DocSection({
  title,
  description,
  children,
}: {
  title: string
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <span className={s.sectionBar} aria-hidden="true" />
        <h2 className={s.sectionTitle}>{title}</h2>
      </div>
      {description && <p className={s.sectionDesc}>{description}</p>}
      {children}
    </section>
  )
}

/** 라이브 예제를 얹는 표면(도트 그리드 배경). flush 로 배경 도트 제거. */
export function Example({ children, flush }: { children: ReactNode; flush?: boolean }) {
  return <div className={flush ? `${s.example} ${s.exampleFlush}` : s.example}>{children}</div>
}

/** 예제 항목 + 하단 코드 라벨 */
export function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.specimen}>
      {children}
      <span className={s.specimenLabel}>{label}</span>
    </div>
  )
}

export type PropRow = {
  name: string
  type: string
  default?: string
  required?: boolean
  desc: ReactNode
}

export function ApiTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className={s.tableWrap}>
      <table className={s.table}>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>Prop</th>
            <th style={{ width: '30%' }}>Type</th>
            <th style={{ width: '14%' }}>Default</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>
                <span className={s.propName}>{r.name}</span>
                {r.required && <span className={s.required}>*</span>}
              </td>
              <td>
                <code className={s.typeCode}>{r.type}</code>
              </td>
              <td>{r.default ? <code className={s.defaultCode}>{r.default}</code> : <span style={{ opacity: 0.4 }}>—</span>}</td>
              <td>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** 본문 인라인 코드 */
export function Code({ children }: { children: ReactNode }) {
  return <code className={s.code}>{children}</code>
}

/**
 * 사용 지침 — 권장(Do) / 지양(Don't) 2열 + 선택적 접근성 노트.
 * 컴포넌트를 올바르게 쓰는 방법을 한눈에 안내한다.
 */
export function Guidelines({
  dos,
  donts,
  a11y,
}: {
  dos: string[]
  donts: string[]
  a11y?: string[]
}) {
  return (
    <>
      <div className={s.guideGrid}>
        <div className={s.guideCard}>
          <div className={s.guideHeadDo}>
            <span aria-hidden="true">✓</span> 권장 (Do)
          </div>
          <ul className={s.guideList}>
            {dos.map((t, i) => (
              <li key={i} className={s.guideItem}>
                <span className={s.guideMarkDo} aria-hidden="true">
                  ✓
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.guideCard}>
          <div className={s.guideHeadDont}>
            <span aria-hidden="true">✕</span> 지양 (Don't)
          </div>
          <ul className={s.guideList}>
            {donts.map((t, i) => (
              <li key={i} className={s.guideItem}>
                <span className={s.guideMarkDont} aria-hidden="true">
                  ✕
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {a11y && a11y.length > 0 && (
        <div className={s.a11yCard}>
          <span className={s.a11yBadge} aria-hidden="true">
            ♿
          </span>
          <div className={s.a11yBody}>
            <div className={s.a11yTitle}>접근성</div>
            <ul className={s.a11yList}>
              {a11y.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * 스토리 파일의 스토리 객체를 그대로 렌더해 문서 예제로 재사용한다.
 * (render 함수가 args/context 를 쓰지 않으므로 안전하게 호출)
 */
export function renderExample(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  story: { render?: (...args: any[]) => ReactNode; args?: unknown },
): ReactNode {
  if (!story?.render) return null
  return story.render(story.args ?? {}, {})
}
