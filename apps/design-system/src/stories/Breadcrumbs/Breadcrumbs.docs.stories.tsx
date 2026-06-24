import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Breadcrumbs from '../../components/Breadcrumbs'

const meta = {
  title: 'StyleGuide/Breadcrumbs',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Design tokens ─────────────────────────────────────────────────────────────

const t = {
  bg: vars.color.background,
  surface: vars.color.surface,
  surfaceHover: vars.color.surfaceHover,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textMuted,
  primary: vars.color.primary,
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

// ── Layout helpers ────────────────────────────────────────────────────────────

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

const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
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
      fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
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
      whiteSpace: 'normal',
      wordBreak: 'break-word',
    }}
  >
    {children}
  </code>
)

const DefaultBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: t.surfaceHover,
      color: t.textSecondary,
      borderRadius: 3,
      padding: '2px 6px',
    }}
  >
    {children}
  </code>
)

// ── Props table ───────────────────────────────────────────────────────────────

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
              <DefaultBadge>{row.defaultVal}</DefaultBadge>
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

// ── Story ─────────────────────────────────────────────────────────────────────

const SEPARATORS = ['›', '/', '→', '|', '>'] as const

export const Documentation: Story = {
  render: () => {
    const [resetKey, setResetKey] = useState(0)
    const [log, setLog] = useState('')
    const btnStyle = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      fontSize: 'inherit',
      color: 'inherit',
    } as const

    return (
      <DocPage>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Breadcrumbs</h1>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
            현재 페이지의 위치를 계층적으로 표시하는 네비게이션 컴포넌트입니다. 구분자 커스터마이즈와 긴 경로
            축약(maxItems)을 지원합니다.
          </p>
          <CodeBlock>{`import Breadcrumbs from '@port/design-system'`}</CodeBlock>
        </div>

        {/* API */}
        <Section gap={16}>
          <SectionTitle>API</SectionTitle>
          <Card>
            <PropsTable
              rows={[
                {
                  name: 'separator',
                  type: 'string | ReactNode',
                  defaultVal: "'›'",
                  desc: '항목 사이에 표시할 구분자. 문자열 또는 ReactNode 모두 가능합니다.',
                },
                {
                  name: 'maxItems',
                  type: 'number',
                  defaultVal: '0',
                  desc: '최대 표시 항목 수. 초과 시 중간 항목을 ⋯ 버튼으로 축약합니다. 0이면 전체를 표시합니다.',
                },
                {
                  name: 'children',
                  type: 'ReactNode',
                  desc: '브레드크럼 항목. 일반적으로 <a>, <span>, <button>을 사용합니다.',
                },
                {
                  name: 'className',
                  type: 'string',
                  desc: '<nav> 요소에 추가할 CSS 클래스',
                },
                {
                  name: 'style',
                  type: 'CSSProperties',
                  desc: '<nav> 요소에 적용할 인라인 스타일',
                },
              ]}
            />
          </Card>
        </Section>

        {/* Basic */}
        <Section gap={16}>
          <SectionTitle>기본 사용법</SectionTitle>
          <CodeBlock>{`<Breadcrumbs>
  <a href="#">홈</a>
  <a href="#">카테고리</a>
  <span>현재 페이지</span>
</Breadcrumbs>`}</CodeBlock>
          <Card>
            <Breadcrumbs>
              <a href="#">홈</a>
              <a href="#">카테고리</a>
              <span>현재 페이지</span>
            </Breadcrumbs>
          </Card>
        </Section>

        {/* Separator */}
        <Section gap={16}>
          <SectionTitle>Separator</SectionTitle>
          <CodeBlock>{`<Breadcrumbs separator="/">...</Breadcrumbs>
<Breadcrumbs separator="→">...</Breadcrumbs>`}</CodeBlock>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {SEPARATORS.map((sep) => (
                <div key={sep} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <InlineCode>{`"${sep}"`}</InlineCode>
                  <Breadcrumbs separator={sep}>
                    <a href="#">홈</a>
                    <a href="#">목록</a>
                    <span>상세</span>
                  </Breadcrumbs>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Overflow */}
        <Section gap={16}>
          <SectionTitle>Overflow (maxItems)</SectionTitle>
          <CodeBlock>{`<Breadcrumbs maxItems={3}>
  <a href="#">보안운영센터</a>
  <a href="#">위협 인텔리전스</a>
  <a href="#">침해지표 분석</a>
  <a href="#">IP 목록</a>
  <span>EVT-2024-0042</span>
</Breadcrumbs>`}</CodeBlock>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <code style={{ fontSize: 11, fontFamily: 'monospace', color: t.textSecondary }}>
                  maxItems=3 · 6단계 경로
                </code>
                <Breadcrumbs key={`a-${resetKey}`} separator="/" maxItems={3}>
                  <a href="#">보안운영센터</a>
                  <a href="#">위협 인텔리전스</a>
                  <a href="#">침해지표 분석</a>
                  <a href="#">IP 목록</a>
                  <a href="#">상세 분석</a>
                  <span>EVT-2024-0042</span>
                </Breadcrumbs>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <code style={{ fontSize: 11, fontFamily: 'monospace', color: t.textSecondary }}>
                  maxItems=2 · 5단계 경로
                </code>
                <Breadcrumbs key={`b-${resetKey}`} separator="›" maxItems={2}>
                  <a href="#">홈</a>
                  <a href="#">설정</a>
                  <a href="#">보안</a>
                  <a href="#">알림</a>
                  <span>이메일 알림</span>
                </Breadcrumbs>
              </div>
              <button
                type="button"
                onClick={() => setResetKey((k) => k + 1)}
                style={{ alignSelf: 'flex-start', fontSize: 11, cursor: 'pointer', padding: '4px 10px' }}
              >
                초기화
              </button>
            </div>
          </Card>
        </Section>

        {/* App Navigation */}
        <Section gap={16}>
          <SectionTitle>App Navigation</SectionTitle>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  label: '2단계',
                  node: (
                    <Breadcrumbs separator="/">
                      <a href="#">대시보드</a>
                      <span>보안 이벤트</span>
                    </Breadcrumbs>
                  ),
                },
                {
                  label: '3단계',
                  node: (
                    <Breadcrumbs separator="/">
                      <a href="#">대시보드</a>
                      <a href="#">자동화</a>
                      <span>SOAR-001 피싱 대응</span>
                    </Breadcrumbs>
                  ),
                },
                {
                  label: '4단계',
                  node: (
                    <Breadcrumbs separator="/">
                      <a href="#">대시보드</a>
                      <a href="#">위협 탐지</a>
                      <a href="#">이벤트 목록</a>
                      <span>EVT-2024-0042</span>
                    </Breadcrumbs>
                  ),
                },
              ].map(({ label, node }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <InlineCode>{label}</InlineCode>
                  {node}
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* WithOnClick */}
        <Section gap={16}>
          <SectionTitle>SPA 라우터 연동 (onClick)</SectionTitle>
          <CodeBlock>{`<Breadcrumbs separator="/">
  <button type="button" onClick={() => router.push("/")}>대시보드</button>
  <button type="button" onClick={() => router.push("/automation")}>자동화</button>
  <span>SOAR-001</span>
</Breadcrumbs>`}</CodeBlock>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Breadcrumbs separator="/">
                <button type="button" onClick={() => setLog('navigate → /')} style={btnStyle}>
                  대시보드
                </button>
                <button type="button" onClick={() => setLog('navigate → /automation')} style={btnStyle}>
                  자동화
                </button>
                <span>SOAR-001</span>
              </Breadcrumbs>
              {log && <code style={{ fontSize: 11, fontFamily: 'monospace', color: t.textSecondary }}>{log}</code>}
            </div>
          </Card>
        </Section>
      </DocPage>
    )
  },
}
