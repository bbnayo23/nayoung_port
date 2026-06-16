import {
  section, inner, sectionTag, sectionTitle,
  grid, block, blockFull, blockTitle,
  diagram, diagramHighlight,
  tokenRow, tokenItem, tokenName, tokenValue,
  ruleList, ruleItem, ruleNum, ruleText,
} from './Architecture.css'

const monorepoTree = `nayoung_port/
├── apps/
│   ├── portfolio-web    ← 포트폴리오 메인
│   ├── dashboard        ← 미니앱
│   ├── design-system    ← Storybook
│   └── icon-library     ← 아이콘 쇼케이스
│
└── packages/config/
    ├── typescript-config
    ├── vite-config
    └── eslint-config`

const designSystemLayers = `tokens.css.ts        ← CSS 변수 정의
     ↓
primitives/          ← Box, Text, Stack
     ↓
components/          ← Button, Input, Card
     ↓
patterns/            ← Form, DataTable`

const themeTokens = [
  { name: 'color.*', value: '20 tokens — bg, text, accent, semantic' },
  { name: 'space.*', value: '14 steps — 4px base unit' },
  { name: 'fontSize.*', value: '11 steps — xs to 6xl' },
  { name: 'radius.*', value: 'sm → full' },
  { name: 'transition.*', value: 'fast / base / slow' },
]

const componentRules = [
  'variants는 styleVariants()로 컴파일 타임에 정의',
  'props 기반 동적 스타일은 CSS 변수로 처리',
  'media query는 각 style() 블록 내 @media로 캡슐화',
  '컴포넌트당 하나의 .css.ts 파일 유지',
  'global 스타일은 global.css.ts에만 허용',
]

export function Architecture() {
  return (
    <section id="architecture" className={section} aria-label="Architecture">
      <div className={inner}>
        <span className={sectionTag}>03 — Architecture</span>
        <h2 className={sectionTitle}>System Design</h2>

        <div className={grid}>
          <div className={blockFull} data-glass>
            <p className={blockTitle}>Monorepo Structure</p>
            <pre className={diagram}>
              <code>
                {monorepoTree.split('portfolio-web    ←').map((part, i) =>
                  i === 0 ? part :
                    <>
                      <span className={diagramHighlight}>portfolio-web</span>
                      {'    ←' + part}
                    </>
                )}
              </code>
            </pre>
          </div>

          <div className={block} data-glass>
            <p className={blockTitle}>Design System Layers</p>
            <pre className={diagram}>
              <code>{designSystemLayers}</code>
            </pre>
          </div>

          <div className={block} data-glass>
            <p className={blockTitle}>Theme Token Structure</p>
            <div className={tokenRow}>
              {themeTokens.map((t) => (
                <div key={t.name} className={tokenItem}>
                  <span className={tokenName}>{t.name}</span>
                  <span className={tokenValue}>{t.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={blockFull} data-glass>
            <p className={blockTitle}>Component Rules</p>
            <ol className={ruleList}>
              {componentRules.map((rule, i) => (
                <li key={i} className={ruleItem}>
                  <span className={ruleNum}>0{i + 1}</span>
                  <span className={ruleText}>{rule}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
