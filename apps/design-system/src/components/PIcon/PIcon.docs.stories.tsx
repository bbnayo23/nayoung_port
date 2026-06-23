import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { PIcon } from './PIcon'

const meta = {
  title: 'StyleGuide/PIcon',
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

const ICON_NAMES = [
  'search',
  'filter',
  'plus',
  'copy',
  'trash',
  'upload',
  'download',
  'chevronLeft',
  'chevronRight',
  'chevronDown',
  'chevronUp',
  'x',
  'check',
  'play',
  'pause',
  'save',
  'edit',
  'more',
  'moreV',
  'settings',
  'layers',
  'alert',
  'shield',
  'clock',
  'sliders',
  'eye',
  'database',
  'grip',
  'code',
  'refresh',
  'pin',
  'expand',
  'collapse',
  'folder',
  'bars',
] as const

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

const DocumentationView = () => {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = ICON_NAMES.filter((n) => n.toLowerCase().includes(query.toLowerCase()))

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>PIcon</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          레포 공용 글리프 아이콘 컴포넌트입니다. <InlineCode>name</InlineCode> prop 으로 내부 inline-SVG path
          레지스트리에 접근하며, 24×24 viewBox · strokeWidth 1.75 · <InlineCode>stroke=&quot;currentColor&quot;</InlineCode>
          로 그려져 부모의 텍스트 색(=토큰)을 그대로 따릅니다. 존재하지 않는 name 을 주면 아무것도 렌더하지 않습니다(
          <InlineCode>null</InlineCode>).
        </p>
        <CodeBlock>{`import { PIcon } from '@nayoung-port/design-system/components/PIcon'

<PIcon name="search" />`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — PIcon</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'name',
                type: 'string',
                desc: '렌더할 아이콘 키. 내부 path 레지스트리에 등록된 글리프 이름이어야 한다. 매칭되는 키가 없으면 null 을 반환한다(필수).',
              },
              {
                name: 'size',
                type: 'number',
                defaultVal: '16',
                desc: 'SVG 의 width/height(px). viewBox 는 항상 24×24 로 고정되며 size 가 표시 크기만 조절한다.',
              },
              {
                name: 'style',
                type: 'React.CSSProperties',
                desc: 'SVG 루트에 전달되는 인라인 스타일. 색은 color 로 지정한다(stroke 가 currentColor 이므로).',
              },
              {
                name: 'className',
                type: 'string',
                desc: 'SVG 루트에 전달되는 추가 클래스.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>전체 아이콘 ({ICON_NAMES.length}개)</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          레지스트리에 등록된 모든 글리프입니다. icon-library 에 없는 기본 글리프는 PIcon 의 path dict 에 추가합니다 —
          이것이 사실상 공유 icon registry 입니다. 아래 카드를 클릭하면 name 이 복사 표시됩니다.
        </p>
        <DocCard>
          <div style={{ marginBottom: 16 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="아이콘 이름 검색..."
              style={{
                width: '100%',
                maxWidth: 260,
                padding: '7px 10px',
                fontSize: 13,
                color: t.text,
                background: t.bg,
                border: `1px solid ${t.border}`,
                borderRadius: t.radiusSm,
                outline: 'none',
              }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
              gap: 8,
            }}
          >
            {filtered.map((name) => {
              const isCopied = copied === name
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCopied(isCopied ? null : name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    padding: '14px 8px',
                    background: isCopied ? t.surfaceHover : 'transparent',
                    border: `1px solid ${isCopied ? t.primary : t.border}`,
                    borderRadius: t.radiusSm,
                    cursor: 'pointer',
                    color: isCopied ? t.primary : t.text,
                    transition: 'border-color 0.12s, color 0.12s',
                  }}
                >
                  <PIcon name={name} size={22} />
                  <span style={{ fontSize: 10, color: isCopied ? t.primary : t.textMuted, wordBreak: 'break-all' }}>
                    {isCopied ? '복사됨!' : name}
                  </span>
                </button>
              )
            })}
            {filtered.length === 0 && (
              <span style={{ fontSize: 13, color: t.textMuted }}>일치하는 아이콘이 없습니다.</span>
            )}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Size</SectionTitle>
        <CodeBlock>{`<PIcon name="settings" size={12} />
<PIcon name="settings" size={16} />  // 기본값
<PIcon name="settings" size={24} />
<PIcon name="settings" size={32} />
<PIcon name="settings" size={48} />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', color: t.text }}>
            {[12, 16, 24, 32, 48].map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <PIcon name="settings" size={s} />
                <InlineCode>{`size={${s}}`}</InlineCode>
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>색상 — currentColor</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          stroke 가 <InlineCode>currentColor</InlineCode> 이므로 부모의 <InlineCode>color</InlineCode>(또는{' '}
          <InlineCode>style</InlineCode> 의 color)를 그대로 따릅니다. 색은 항상 토큰으로 주입합니다.
        </p>
        <CodeBlock>{`<span style={{ color: vars.color.brand[600] }}>
  <PIcon name="shield" size={24} />
</span>

<PIcon name="alert" size={24} style={{ color: vars.color.danger }} />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            {(
              [
                { label: 'text', color: t.text, icon: 'code' },
                { label: 'textSecondary', color: t.textSecondary, icon: 'eye' },
                { label: 'primary', color: t.primary, icon: 'shield' },
                { label: 'success', color: t.success, icon: 'check' },
                { label: 'danger', color: t.danger, icon: 'alert' },
                { label: 'info', color: t.info, icon: 'database' },
              ] as const
            ).map(({ label, color, icon }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ color }}>
                  <PIcon name={icon} size={26} />
                </span>
                <span style={{ fontSize: 10, color: t.textMuted }}>{label}</span>
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>존재하지 않는 name</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          레지스트리에 없는 키를 주면 컴포넌트는 <InlineCode>null</InlineCode> 을 반환합니다 — 빈 박스나 깨진 이미지가
          아니라 아무것도 렌더하지 않습니다.
        </p>
        <CodeBlock>{`<PIcon name="this-does-not-exist" />  // → null (렌더 안 됨)`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: t.textSecondary }}>
            <span style={{ color: t.text }}>
              <PIcon name="not-a-real-icon" size={24} />
            </span>
            <span>
              위 자리에 <InlineCode>name=&quot;not-a-real-icon&quot;</InlineCode> 가 있지만 아무것도 그려지지 않습니다.
            </span>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>사용 예시 — 버튼/라벨 안에서</SectionTitle>
        <CodeBlock>{`<button>
  <PIcon name="plus" size={14} />
  추가
</button>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                fontSize: 13,
                color: '#fff',
                background: t.primary,
                border: 'none',
                borderRadius: t.radiusSm,
                cursor: 'pointer',
              }}
            >
              <PIcon name="plus" size={14} />
              추가
            </button>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                fontSize: 13,
                color: t.text,
                background: 'transparent',
                border: `1px solid ${t.border}`,
                borderRadius: t.radiusSm,
                cursor: 'pointer',
              }}
            >
              <PIcon name="download" size={14} />
              다운로드
            </button>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                fontSize: 13,
                color: t.danger,
                background: 'transparent',
                border: `1px solid ${t.border}`,
                borderRadius: t.radiusSm,
                cursor: 'pointer',
              }}
            >
              <PIcon name="trash" size={14} />
              삭제
            </button>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: t.textSecondary }}>
              <PIcon name="clock" size={14} />
              3분 전
            </span>
          </div>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
