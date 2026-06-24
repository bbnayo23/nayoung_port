import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { vars } from '../../theme/contract.css'
import Textarea from '../../components/Textarea'

const meta = {
  title: 'StyleGuide/Textarea',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Layout helpers ────────────────────────────────────────────────────────────

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

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 840,
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

const Card = ({ children }: { children: ReactNode }) => (
  <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.radius, padding: '20px 24px' }}>
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
      fontFamily: "'Fira Code', 'Consolas', monospace",
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
      whiteSpace: 'nowrap',
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

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Textarea</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          여러 줄 텍스트 입력 컴포넌트입니다. <InlineCode>resize</InlineCode>로 사용자 리사이즈 방향을 제어하고,{' '}
          <InlineCode>height="auto"</InlineCode>로 내용에 따라 높이가 자동으로 늘어나는 동작을 지원합니다.
        </p>
        <CodeBlock>{`import Textarea from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'resize',
                type: "CSSProperties['resize']",
                defaultVal: "'vertical'",
                desc: '사용자가 textarea를 리사이즈할 수 있는 방향 — none, both, horizontal, vertical',
              },
              { name: 'height', type: "number | 'auto'", desc: "고정 높이(px) 또는 'auto'(내용에 따라 자동 조절)" },
              { name: 'placeholder', type: 'string', desc: '빈 상태에서 표시할 힌트 텍스트' },
              { name: 'disabled', type: 'boolean', desc: '입력 비활성화 상태' },
              { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>
      </Section>

      {/* 기본 사용 */}
      <Section gap={16}>
        <SectionTitle>기본 사용</SectionTitle>
        <Card>
          <CodeBlock>{`<Textarea placeholder="내용을 입력하세요" />`}</CodeBlock>
          <div style={{ marginTop: 16, maxWidth: 400 }}>
            <Textarea placeholder="내용을 입력하세요" />
          </div>
        </Card>
      </Section>

      {/* resize */}
      <Section gap={16}>
        <SectionTitle>resize</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {(['none', 'both', 'horizontal', 'vertical'] as const).map((resize) => (
              <div key={resize} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <InlineCode>{`resize="${resize}"`}</InlineCode>
                <div style={{ maxWidth: 400 }}>
                  <Textarea resize={resize} placeholder={`resize="${resize}"`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* height */}
      <Section gap={16}>
        <SectionTitle>height</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <InlineCode>height={80} — 고정 높이</InlineCode>
              <div style={{ maxWidth: 400 }}>
                <Textarea height={80} placeholder="고정 높이 80px" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <InlineCode>{'height="auto" — 내용에 따라 자동 조절'}</InlineCode>
              <div style={{ maxWidth: 400 }}>
                <Textarea
                  height="auto"
                  defaultValue={'자동 높이 예시입니다.\n내용이 많아질수록 textarea가 늘어납니다.\n세 번째 줄입니다.'}
                />
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* 상태 */}
      <Section gap={16}>
        <SectionTitle>상태</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <InlineCode>기본</InlineCode>
              <div style={{ maxWidth: 400 }}>
                <Textarea placeholder="기본 상태" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <InlineCode>disabled</InlineCode>
              <div style={{ maxWidth: 400 }}>
                <Textarea disabled defaultValue="비활성화된 내용입니다." />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <InlineCode>값 있음</InlineCode>
              <div style={{ maxWidth: 400 }}>
                <Textarea defaultValue="입력된 내용이 있는 상태입니다." />
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
