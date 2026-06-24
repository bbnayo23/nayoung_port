import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import IconButton from '../../components/IconButton'
import { XdrSettingIcon, XdrNavAlertIcon, XdrSearchIcon, XdrCloseIcon, XdrWrenchIcon } from '@port/icon-library'

const meta = {
  title: 'StyleGuide/IconButton',
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

type PropRow = { name: string; type: string; defaultVal?: string; required?: boolean; desc: string }

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

const Pattern = ({
  title,
  desc,
  code,
  children,
}: {
  title: string
  desc: string
  code: string
  children: ReactNode
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div>
      <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: t.text }}>{title}</p>
      <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>{desc}</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
      <CodeBlock>{code}</CodeBlock>
      <div>{children}</div>
    </div>
  </div>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>IconButton</h1>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.primary,
              background: 'rgba(0,183,153,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            PRIMITIVE
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          아이콘 전용 버튼 컴포넌트입니다. <InlineCode>icon</InlineCode> prop 또는 <InlineCode>children</InlineCode>으로
          아이콘을 전달하며, <InlineCode>size</InlineCode>와 <InlineCode>variant</InlineCode>로 외형을 제어합니다.
        </p>
        <CodeBlock>{`import IconButton from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", desc: '버튼 크기' },
              {
                name: 'variant',
                type: "'default' | 'ghost' | 'outline' | 'circle'",
                defaultVal: "'ghost'",
                desc: '버튼 스타일 변형',
              },
              { name: 'icon', type: 'ReactNode', desc: '버튼 내부에 렌더링할 아이콘. children보다 우선합니다.' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '비활성화 상태' },
              { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>
        <Card style={{ background: t.surfaceHover }}>
          <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.7 }}>
            <InlineCode>IconButton</InlineCode>은 <strong style={{ color: t.text }}>forwardRef</strong>를 지원하며, 표준{' '}
            <InlineCode>HTMLButtonElement</InlineCode> 속성을 모두 그대로 전달합니다.
          </p>
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>
        <Card>
          <Pattern
            title="icon prop 사용"
            desc="@port/icon-library 아이콘을 icon prop에 전달하는 기본 패턴입니다."
            code={`import { XdrSettingIcon } from '@port/icon-library'

<IconButton
  icon={<XdrSettingIcon size={16} />}
  onClick={() => openSettings()}
/>`}
          >
            <IconButton aria-label="settings" icon={<XdrSettingIcon size={16} />} />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="variant 조합"
            desc="용도에 따라 ghost, outline, circle, default 중 선택합니다."
            code={`<IconButton variant="ghost"   icon={<XdrNavAlertIcon size={16} />} />
<IconButton variant="outline" icon={<XdrNavAlertIcon size={16} />} />
<IconButton variant="circle"  icon={<XdrNavAlertIcon size={16} />} />
<IconButton variant="default" icon={<XdrNavAlertIcon size={16} />} />`}
          >
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(['ghost', 'outline', 'circle', 'default'] as const).map((v) => (
                <IconButton key={v} aria-label={v} variant={v} icon={<XdrNavAlertIcon size={16} />} />
              ))}
            </div>
          </Pattern>
        </Card>
      </Section>

      {/* Sizes */}
      <Section gap={16}>
        <SectionTitle>크기</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Card key={size}>
              <p
                style={{ margin: '0 0 12px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}
              >{`size="${size}"`}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <IconButton
                  aria-label={`settings-${size}`}
                  size={size}
                  icon={<XdrSettingIcon size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />}
                />
                <IconButton
                  aria-label={`cog-${size}`}
                  size={size}
                  variant="outline"
                  icon={<XdrWrenchIcon size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />}
                />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* States */}
      <Section gap={16}>
        <SectionTitle>상태</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Card>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>normal</p>
            <IconButton aria-label="search" icon={<XdrSearchIcon size={16} />} />
          </Card>
          <Card>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>disabled</p>
            <IconButton aria-label="close" disabled icon={<XdrCloseIcon size={16} />} />
          </Card>
        </div>
      </Section>
    </DocPage>
  ),
}
