import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { SearchStatus } from './SearchStatus'

const meta = {
  title: 'StyleGuide/SearchStatus',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const t = {
  bg: vars.color.background,
  surface: vars.color.surface,
  surfaceHover: vars.color.surfaceMuted,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textDisabled,
  primary: vars.color.brand[600],
  success: vars.color.success,
  danger: vars.color.danger,
  info: vars.color.info,
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: '48px 32px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
      }}
    >
      {children}
    </div>
  </div>
)

const Section = ({ children, gap = 16 }: { children: ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
)

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
    <span
      style={{ display: 'inline-block', width: 3, height: 16, background: t.primary, borderRadius: 2, flexShrink: 0 }}
    />
    <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: 0.2 }}>{children}</h2>
  </div>
)

const DocCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: t.radius,
      padding: '20px 24px',
      ...style,
    }}
  >
    {children}
  </div>
)

const CodeBlock = ({ children }: { children: string }) => (
  <pre
    style={{
      margin: 0,
      padding: '14px 18px',
      background: '#1e2228',
      color: '#abb2bf',
      borderRadius: t.radiusSm,
      fontSize: 12,
      fontFamily: "'Fira Code','Consolas',monospace",
      lineHeight: 1.7,
      overflowX: 'auto',
      whiteSpace: 'pre',
    }}
  >
    <code>{children}</code>
  </pre>
)

const InlineCode = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 12,
      background: t.surfaceHover,
      border: `1px solid ${t.border}`,
      borderRadius: 3,
      padding: '1px 5px',
      color: t.text,
    }}
  >
    {children}
  </code>
)

const TypeBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: 'rgba(113,135,255,0.08)',
      color: '#5a6ee0',
      borderRadius: 3,
      padding: '2px 6px',
      wordBreak: 'break-word' as const,
    }}
  >
    {children}
  </code>
)

type PropRow = { name: string; type: string; defaultVal?: string; desc: string }
const PropsTable = ({ rows }: { rows: PropRow[] }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
    <thead>
      <tr style={{ background: t.surfaceHover }}>
        {['Prop', 'Type', 'Default', '설명'].map((h) => (
          <th
            key={h}
            style={{
              padding: '8px 12px',
              textAlign: 'left',
              fontWeight: 600,
              fontSize: 12,
              color: t.textSecondary,
              borderBottom: `1px solid ${t.border}`,
              letterSpacing: 0.3,
            }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.name} style={{ borderBottom: `1px solid ${t.border}` }}>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            <InlineCode>{row.name}</InlineCode>
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            <TypeBadge>{row.type}</TypeBadge>
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            {row.defaultVal ? (
              <InlineCode>{row.defaultVal}</InlineCode>
            ) : (
              <span style={{ color: t.textMuted }}>—</span>
            )}
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top', color: t.textSecondary, lineHeight: 1.6 }}>
            {row.desc}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

const StateCell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 120 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 48,
        borderRadius: t.radiusSm,
        background: t.surfaceHover,
        fontSize: 16,
        color: t.text,
      }}
    >
      {children}
    </div>
    <InlineCode>{label}</InlineCode>
  </div>
)

const DocumentationView = () => (
  <DocPage>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>SearchStatus</h1>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
        비동기 데이터(검색 결과 건수 등)의 로딩 상태를 한 칸에 표시하는 인라인 상태 컴포넌트입니다. 단일 state prop
        으로 로딩 스피너 · 값 · 에러(대시) 세 가지 상태를 전환하며, 표 셀이나 텍스트 안에 inline-flex 로 자연스럽게
        들어갑니다.
      </p>
      <CodeBlock>{`import { SearchStatus } from '@nayoung-port/design-system/components/SearchStatus'`}</CodeBlock>
    </div>

    <Section>
      <SectionTitle>API — SearchStatus</SectionTitle>
      <DocCard>
        <PropsTable
          rows={[
            {
              name: 'state',
              type: "'loading' | 'hasValue' | 'hasError'",
              desc: '표시할 상태. loading(스피너) · hasValue(children 값 표시) · hasError(대시 + danger 색). 필수 prop.',
            },
            {
              name: 'children',
              type: 'ReactNode',
              desc: "state 가 'hasValue' 일 때 표시되는 콘텐츠 (예: 검색 건수). loading · hasError 상태에서는 무시된다.",
            },
            {
              name: 'className',
              type: 'string',
              desc: '루트 span 에 병합되는 추가 클래스 (cx 로 wrapper 클래스와 합쳐진다)',
            },
          ]}
        />
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>State — 전체 상태</SectionTitle>
      <CodeBlock>{`<SearchStatus state="loading" />
<SearchStatus state="hasValue">1,234</SearchStatus>
<SearchStatus state="hasError" />`}</CodeBlock>
      <DocCard>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <StateCell label="loading">
            <SearchStatus state="loading" />
          </StateCell>
          <StateCell label="hasValue">
            <SearchStatus state="hasValue">1,234</SearchStatus>
          </StateCell>
          <StateCell label="hasError">
            <SearchStatus state="hasError" />
          </StateCell>
        </div>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>loading — 스피너</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        aria-busy=&quot;true&quot; 가 부여된 wrapper 안에 회전 스피너를 렌더합니다. 스피너 크기는 0.9em 으로 폰트
        크기를 따라가며, border 색은 vars.color.border / 상단은 brand[600] 입니다.
      </p>
      <DocCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, color: t.text }}>
            기본 (14px): <SearchStatus state="loading" />
          </span>
          <span style={{ fontSize: 20, color: t.text }}>
            큰 텍스트 (20px): <SearchStatus state="loading" />
          </span>
          <span style={{ fontSize: 28, color: t.text }}>
            제목 (28px): <SearchStatus state="loading" />
          </span>
        </div>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>hasValue — 값 표시</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        children 으로 전달한 값을 그대로 표시합니다. 숫자, 텍스트, 노드 모두 가능합니다.
      </p>
      <DocCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', fontSize: 15, color: t.text }}>
          <span>
            건수: <SearchStatus state="hasValue">1,234</SearchStatus>
          </span>
          <span>
            텍스트: <SearchStatus state="hasValue">완료</SearchStatus>
          </span>
          <span>
            노드:{' '}
            <SearchStatus state="hasValue">
              <strong style={{ color: t.success }}>OK</strong>
            </SearchStatus>
          </span>
        </div>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>hasError — 에러 (대시)</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        값을 가져오지 못한 경우, danger 색의 대시(-) 를 표시합니다. children 은 무시됩니다.
      </p>
      <DocCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', fontSize: 15, color: t.text }}>
          <span>
            에러: <SearchStatus state="hasError" />
          </span>
        </div>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>Composition — 테이블 셀 안에서</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        검색 결과 건수처럼 비동기로 채워지는 셀에 inline 으로 배치하는 실전 예시입니다.
      </p>
      <DocCard>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: t.surfaceHover }}>
              {['항목', '탐지 건수'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: 12,
                    color: t.textSecondary,
                    borderBottom: `1px solid ${t.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(
              [
                { name: '피싱 대응', state: 'hasValue' as const, value: '128' },
                { name: 'DDoS 완화', state: 'loading' as const, value: null },
                { name: '악성코드 격리', state: 'hasError' as const, value: null },
              ]
            ).map((row) => (
              <tr key={row.name} style={{ borderBottom: `1px solid ${t.border}` }}>
                <td style={{ padding: '10px 12px', color: t.text }}>{row.name}</td>
                <td style={{ padding: '10px 12px', color: t.text }}>
                  <SearchStatus state={row.state}>{row.value}</SearchStatus>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DocCard>
    </Section>
  </DocPage>
)

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
