import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import ButtonGroup from '../../components/ButtonGroup'

const meta = {
  title: 'StyleGuide/ButtonGroup',
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

// ── Demo components ───────────────────────────────────────────────────────────

const PrimaryDemo = () => {
  const [active, setActive] = useState(0)
  return (
    <ButtonGroup variant="primary">
      {['옵션 A', '옵션 B', '옵션 C'].map((label, i) => (
        <ButtonGroup.Item key={i} active={active === i} onClick={() => setActive(i)}>
          {label}
        </ButtonGroup.Item>
      ))}
    </ButtonGroup>
  )
}

const SecondaryDemo = () => {
  const [active, setActive] = useState(0)
  return (
    <ButtonGroup variant="secondary">
      {['선택됨', '항목 2', '항목 3'].map((label, i) => (
        <ButtonGroup.Item key={i} active={active === i} onClick={() => setActive(i)}>
          {label}
        </ButtonGroup.Item>
      ))}
    </ButtonGroup>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>ButtonGroup</h1>
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
            COMPOUND
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          여러 선택지 중 하나를 선택하는 토글 버튼 그룹 컴포넌트입니다. <InlineCode>primary</InlineCode>(슬라이더 탭)와{' '}
          <InlineCode>secondary</InlineCode>(토글 버튼) 두 가지 variant를 지원합니다.
        </p>
        <CodeBlock>{`import ButtonGroup from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            BUTTONGROUP
          </p>
          <PropsTable
            rows={[
              {
                name: 'variant',
                type: "'primary' | 'secondary'",
                defaultVal: "'primary'",
                desc: '버튼 그룹 스타일 — primary는 슬라이더 탭, secondary는 토글 버튼',
              },
              { name: 'children', type: 'ReactNode', desc: 'ButtonGroup.Item 컴포넌트들' },
              { name: 'className', type: 'string', desc: '래퍼 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            BUTTONGROUP.ITEM
          </p>
          <PropsTable
            rows={[
              {
                name: 'active',
                type: 'boolean',
                defaultVal: 'false',
                desc: '활성화 상태. 선택된 항목임을 시각적으로 표시합니다.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '비활성화 상태 — opacity, pointer-events 비활성',
              },
              { name: 'onClick', type: '() => void', desc: '클릭 핸들러' },
              { name: 'children', type: 'ReactNode', desc: '버튼 레이블 또는 아이콘' },
            ]}
          />
        </Card>
      </Section>

      {/* Usage */}
      <Section gap={16}>
        <SectionTitle>기본 사용법</SectionTitle>
        <CodeBlock>{`const [active, setActive] = useState(0);

<ButtonGroup variant="primary">
  <ButtonGroup.Item active={active === 0} onClick={() => setActive(0)}>옵션 A</ButtonGroup.Item>
  <ButtonGroup.Item active={active === 1} onClick={() => setActive(1)}>옵션 B</ButtonGroup.Item>
  <ButtonGroup.Item active={active === 2} onClick={() => setActive(2)}>옵션 C</ButtonGroup.Item>
</ButtonGroup>`}</CodeBlock>
        <Card>
          <PrimaryDemo />
        </Card>
      </Section>

      {/* Variants */}
      <Section gap={16}>
        <SectionTitle>Variant</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card>
            <p
              style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}
            >
              PRIMARY — 슬라이더 탭 형식
            </p>
            <PrimaryDemo />
          </Card>
          <Card>
            <p
              style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}
            >
              SECONDARY — 토글 버튼 형식
            </p>
            <SecondaryDemo />
          </Card>
        </div>
      </Section>

      {/* Disabled */}
      <Section gap={16}>
        <SectionTitle>Disabled Item</SectionTitle>
        <CodeBlock>{`<ButtonGroup>
  <ButtonGroup.Item active>활성</ButtonGroup.Item>
  <ButtonGroup.Item>일반</ButtonGroup.Item>
  <ButtonGroup.Item disabled>비활성</ButtonGroup.Item>
</ButtonGroup>`}</CodeBlock>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card>
            <p
              style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}
            >
              PRIMARY
            </p>
            <ButtonGroup variant="primary">
              <ButtonGroup.Item active>활성</ButtonGroup.Item>
              <ButtonGroup.Item>일반</ButtonGroup.Item>
              <ButtonGroup.Item disabled>비활성</ButtonGroup.Item>
            </ButtonGroup>
          </Card>
          <Card>
            <p
              style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}
            >
              SECONDARY
            </p>
            <ButtonGroup variant="secondary">
              <ButtonGroup.Item active>활성</ButtonGroup.Item>
              <ButtonGroup.Item>일반</ButtonGroup.Item>
              <ButtonGroup.Item disabled>비활성</ButtonGroup.Item>
            </ButtonGroup>
          </Card>
        </div>
      </Section>
    </DocPage>
  ),
}
