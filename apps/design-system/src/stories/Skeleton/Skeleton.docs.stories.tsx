import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { vars } from '../../theme/contract.css'
import Skeleton from '../../components/Skeleton'

const meta = {
  title: 'StyleGuide/Skeleton',
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
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Skeleton</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          데이터 로딩 중 콘텐츠 자리를 채워주는 플레이스홀더입니다. <InlineCode>variant</InlineCode>로 모양을 선택하고{' '}
          <InlineCode>width</InlineCode> · <InlineCode>height</InlineCode>로 크기를 지정합니다.
        </p>
        <CodeBlock>{`import Skeleton from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'variant',
                type: "'rectangular' | 'rounded' | 'circle'",
                defaultVal: "'rectangular'",
                desc: '스켈레톤 모양 — rectangular(직사각형), rounded(둥근 모서리), circle(원형)',
              },
              {
                name: 'width',
                type: 'string | number',
                desc: "너비. 숫자는 px로 처리, 문자열은 CSS 값 그대로 적용 (예: '100%', '240px')",
              },
              { name: 'height', type: 'string | number', desc: '높이. 미설정 시 variant에 따른 기본값 적용' },
              { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>
      </Section>

      {/* Variants */}
      <Section gap={16}>
        <SectionTitle>Variant</SectionTitle>
        <Card>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {(['rectangular', 'rounded', 'circle'] as const).map((variant) => (
              <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <Skeleton
                  variant={variant}
                  width={variant === 'circle' ? 48 : 120}
                  height={variant === 'circle' ? 48 : 40}
                />
                <InlineCode>{`variant="${variant}"`}</InlineCode>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Sizes */}
      <Section gap={16}>
        <SectionTitle>크기 조정</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CodeBlock>{`<Skeleton width={240} height={16} />
<Skeleton width="100%" height={24} />
<Skeleton width={80} height={80} variant="circle" />`}</CodeBlock>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Skeleton width={240} height={16} />
              <Skeleton width="100%" height={24} />
              <Skeleton width={80} height={80} variant="circle" />
            </div>
          </div>
        </Card>
      </Section>

      {/* 사용 패턴 */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 600, color: t.text }}>카드 스켈레톤</p>
          <CodeBlock>{`<div style={{ display: 'flex', gap: 12 }}>
  <Skeleton variant="circle" width={40} height={40} />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton width="60%" height={14} />
    <Skeleton width="40%" height={12} />
  </div>
</div>`}</CodeBlock>
          <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
            <Skeleton variant="circle" width={40} height={40} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Skeleton width="60%" height={14} />
              <Skeleton width="40%" height={12} />
            </div>
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 600, color: t.text }}>텍스트 라인</p>
          <CodeBlock>{`<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Skeleton width="100%" height={14} />
  <Skeleton width="90%" height={14} />
  <Skeleton width="75%" height={14} />
</div>`}</CodeBlock>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton width="100%" height={14} />
            <Skeleton width="90%" height={14} />
            <Skeleton width="75%" height={14} />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 600, color: t.text }}>대시보드 플레이스홀더</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  padding: 16,
                  border: `1px solid ${t.border}`,
                  borderRadius: t.radiusSm,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <Skeleton width="50%" height={12} />
                <Skeleton width="70%" height={28} />
                <Skeleton width="100%" height={60} variant="rounded" />
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
