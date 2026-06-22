import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { IconButton } from './IconButton'

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
  surfaceHover: vars.color.surfaceMuted,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textDisabled,
  primary: vars.color.brand[600],
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
            {row.required && (
              <span style={{ marginLeft: 4, fontSize: 10, color: vars.color.danger, fontWeight: 700 }}>*</span>
            )}
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

// ── Inline SVG icons (no external dependency) ─────────────────────────────────

const IconSettings = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const IconBell = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const IconSearch = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const IconClose = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconTrash = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
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
              background: 'rgba(113,135,255,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            PRIMITIVE
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          아이콘 전용 정사각형 버튼 컴포넌트입니다. <InlineCode>children</InlineCode>으로 아이콘을 전달하며,{' '}
          <InlineCode>size</InlineCode>와 <InlineCode>variant</InlineCode>로 외형을 제어합니다.
          접근성을 위해 <InlineCode>aria-label</InlineCode>이 필수입니다.
        </p>
        <CodeBlock>{`import { IconButton } from '@nayoung-port/design-system/components/IconButton'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'aria-label',
                type: 'string',
                required: true,
                desc: '스크린리더용 접근성 레이블. 필수 prop입니다.',
              },
              {
                name: 'variant',
                type: "'default' | 'primary' | 'danger' | 'ghost'",
                defaultVal: "'default'",
                desc: '버튼 시각 스타일. default(테두리 있는 기본), primary(브랜드색 채움), danger(위험 동작 빨간색 채움), ghost(배경 없음).',
              },
              {
                name: 'size',
                type: "'sm' | 'md'",
                defaultVal: "'md'",
                desc: '버튼 크기. sm=24×24px, md=28×28px.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: '버튼 내부에 렌더링할 아이콘 요소.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '비활성화 상태. opacity 0.4로 표시되며 클릭이 차단됩니다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 요소에 추가할 CSS 클래스.',
              },
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
            title="children으로 아이콘 전달"
            desc="SVG 아이콘 컴포넌트를 children으로 전달하는 기본 패턴입니다."
            code={`<IconButton aria-label="설정">
  <SettingsIcon size={16} />
</IconButton>`}
          >
            <IconButton aria-label="설정">
              <IconSettings size={16} />
            </IconButton>
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="variant 조합"
            desc="용도에 따라 default, primary, danger, ghost 중 선택합니다."
            code={`<IconButton variant="default" aria-label="기본">…</IconButton>
<IconButton variant="primary" aria-label="기본">…</IconButton>
<IconButton variant="danger"  aria-label="삭제">…</IconButton>
<IconButton variant="ghost"   aria-label="닫기">…</IconButton>`}
          >
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(['default', 'primary', 'danger', 'ghost'] as const).map((v) => (
                <IconButton key={v} aria-label={v} variant={v}>
                  <IconBell size={16} />
                </IconButton>
              ))}
            </div>
          </Pattern>
        </Card>
      </Section>

      {/* Sizes */}
      <Section gap={16}>
        <SectionTitle>크기</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {(['sm', 'md'] as const).map((size) => (
            <Card key={size}>
              <p
                style={{ margin: '0 0 12px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}
              >{`size="${size}"`}</p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <IconButton aria-label={`settings-${size}`} size={size}>
                  <IconSettings size={size === 'sm' ? 12 : 16} />
                </IconButton>
                <IconButton aria-label={`bell-${size}`} size={size} variant="primary">
                  <IconBell size={size === 'sm' ? 12 : 16} />
                </IconButton>
                <IconButton aria-label={`close-${size}`} size={size} variant="ghost">
                  <IconClose size={size === 'sm' ? 12 : 16} />
                </IconButton>
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
            <IconButton aria-label="검색">
              <IconSearch size={16} />
            </IconButton>
          </Card>
          <Card>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>disabled</p>
            <IconButton aria-label="닫기" disabled>
              <IconClose size={16} />
            </IconButton>
          </Card>
        </div>
      </Section>

      {/* Variant showcase */}
      <Section gap={16}>
        <SectionTitle>Variant 상세</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {(
            [
              { variant: 'default', label: 'default', desc: '테두리 있는 기본 스타일' },
              { variant: 'primary', label: 'primary', desc: '브랜드 강조 동작' },
              { variant: 'danger', label: 'danger', desc: '삭제 등 위험 동작' },
              { variant: 'ghost', label: 'ghost', desc: '배경 없이 아이콘만' },
            ] as const
          ).map(({ variant, label, desc }) => (
            <Card key={variant}>
              <p style={{ margin: '0 0 4px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>{label}</p>
              <p style={{ margin: '0 0 12px', fontSize: 11, color: t.textSecondary }}>{desc}</p>
              <IconButton aria-label={label} variant={variant}>
                {variant === 'danger' ? <IconTrash size={16} /> : <IconBell size={16} />}
              </IconButton>
            </Card>
          ))}
        </div>
      </Section>
    </DocPage>
  ),
}
