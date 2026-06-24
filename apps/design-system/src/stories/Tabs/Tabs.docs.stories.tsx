import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Tabs from '../../components/Tabs'

const meta = {
  title: 'StyleGuide/Tabs',
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

// ── Demo helpers ──────────────────────────────────────────────────────────────

const TabDemo = ({
  variant,
  size,
  direction,
}: {
  variant?: 'underline' | 'outline' | 'enclosed' | 'fill'
  size?: 'sm' | 'md' | 'lg'
  direction?: 'horizontal' | 'vertical'
}) => {
  const [value, setValue] = useState<string | number>('tab1')
  return (
    <Tabs variant={variant} size={size} direction={direction} value={value} onChange={setValue}>
      <Tabs.List direction={direction}>
        <Tabs.Tab value="tab1">탭 1</Tabs.Tab>
        <Tabs.Tab value="tab2">탭 2</Tabs.Tab>
        <Tabs.Tab value="tab3">탭 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Contents value="tab1">
        <div style={{ padding: '12px 0', fontSize: 12, color: t.textSecondary }}>탭 1 내용입니다.</div>
      </Tabs.Contents>
      <Tabs.Contents value="tab2">
        <div style={{ padding: '12px 0', fontSize: 12, color: t.textSecondary }}>탭 2 내용입니다.</div>
      </Tabs.Contents>
      <Tabs.Contents value="tab3">
        <div style={{ padding: '12px 0', fontSize: 12, color: t.textSecondary }}>탭 3 내용입니다.</div>
      </Tabs.Contents>
    </Tabs>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Tabs</h1>
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
          4가지 variant와 3가지 size를 지원하는 탭 컴포넌트입니다. <InlineCode>Tabs.List</InlineCode> ·{' '}
          <InlineCode>Tabs.Tab</InlineCode> · <InlineCode>Tabs.Contents</InlineCode> 컴파운드 패턴으로 구성되며 키보드
          접근성(← → ↑ ↓ Home End)을 내장합니다.
        </p>
        <CodeBlock>{`import Tabs from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TABS
          </p>
          <PropsTable
            rows={[
              { name: 'value', type: 'string | number', desc: '현재 활성 탭 값 (controlled)' },
              { name: 'onChange', type: '(value: string | number) => void', desc: '탭 변경 콜백' },
              {
                name: 'variant',
                type: "'underline' | 'outline' | 'enclosed' | 'fill'",
                defaultVal: "'underline'",
                desc: '탭 스타일 변형',
              },
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", desc: '탭 크기' },
              {
                name: 'direction',
                type: "'horizontal' | 'vertical'",
                defaultVal: "'horizontal'",
                desc: '탭 배치 방향',
              },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TABS.TAB
          </p>
          <PropsTable
            rows={[
              { name: 'value', type: 'string', desc: '탭 고유 값 — Tabs.value와 매칭됩니다.' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '비활성 탭. 키보드 이동 시 건너뜁니다.' },
              { name: 'icon', type: 'ReactNode', desc: '탭 좌측 아이콘' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TABS.CONTENTS
          </p>
          <PropsTable
            rows={[
              { name: 'value', type: 'string | number', desc: '대응하는 Tabs.Tab의 value와 일치해야 합니다.' },
              {
                name: 'renderMode',
                type: "'multiRender' | 'singleRender'",
                defaultVal: "'multiRender'",
                desc: 'multiRender: 모두 렌더 후 CSS hidden 제어. singleRender: 활성 탭만 마운트.',
              },
            ]}
          />
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>기본 사용법 (controlled)</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary }}>
            <InlineCode>value</InlineCode>와 <InlineCode>onChange</InlineCode>로 활성 탭을 제어합니다.
          </p>
          <CodeBlock>{`const [value, setValue] = useState('tab1')

<Tabs value={value} onChange={setValue}>
  <Tabs.List>
    <Tabs.Tab value="tab1">탭 1</Tabs.Tab>
    <Tabs.Tab value="tab2">탭 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Contents value="tab1">탭 1 내용</Tabs.Contents>
  <Tabs.Contents value="tab2">탭 2 내용</Tabs.Contents>
</Tabs>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <TabDemo />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>세로 방향 (vertical)</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary }}>
            <InlineCode>direction="vertical"</InlineCode>로 세로 탭 레이아웃을 구성합니다. 설정 패널에 적합합니다.
          </p>
          <div style={{ maxWidth: 460 }}>
            <TabDemo direction="vertical" variant="enclosed" />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>비활성 탭</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary }}>
            <InlineCode>disabled</InlineCode> prop으로 특정 탭을 비활성화합니다. 키보드 화살표 이동 시 건너뜁니다.
          </p>
          {(() => {
            const DisabledDemo = () => {
              const [value, setValue] = useState<string | number>('active')
              return (
                <Tabs value={value} onChange={setValue}>
                  <Tabs.List>
                    <Tabs.Tab value="active">활성 탭</Tabs.Tab>
                    <Tabs.Tab value="another">다른 탭</Tabs.Tab>
                    <Tabs.Tab value="disabled" disabled>
                      비활성 탭
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              )
            }
            return <DisabledDemo />
          })()}
        </Card>
      </Section>

      {/* Variant */}
      <Section gap={16}>
        <SectionTitle>Variant</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {(['underline', 'outline', 'enclosed', 'fill'] as const).map((v) => (
            <Card key={v}>
              <p
                style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}
              >{`variant="${v}"`}</p>
              <TabDemo variant={v} />
            </Card>
          ))}
        </div>
      </Section>

      {/* Size */}
      <Section gap={16}>
        <SectionTitle>Size</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Card key={s}>
              <p
                style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}
              >{`size="${s}"`}</p>
              <TabDemo size={s} />
            </Card>
          ))}
        </div>
      </Section>
    </DocPage>
  ),
}
