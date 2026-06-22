import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Tabs } from './Tabs'

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
  surfaceHover: vars.color.surfaceMuted,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textDisabled,
  primary: vars.color.brand[600],
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
}: {
  variant?: 'line' | 'enclosed'
}) => {
  const [value, setValue] = useState<string>('tab1')
  return (
    <Tabs variant={variant} value={value} onValueChange={setValue}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">탭 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">탭 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">탭 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="tab1">
        <div style={{ padding: '12px 0', fontSize: 12, color: t.textSecondary }}>탭 1 내용입니다.</div>
      </Tabs.Panel>
      <Tabs.Panel value="tab2">
        <div style={{ padding: '12px 0', fontSize: 12, color: t.textSecondary }}>탭 2 내용입니다.</div>
      </Tabs.Panel>
      <Tabs.Panel value="tab3">
        <div style={{ padding: '12px 0', fontSize: 12, color: t.textSecondary }}>탭 3 내용입니다.</div>
      </Tabs.Panel>
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
          2가지 variant를 지원하는 탭 컴포넌트입니다. <InlineCode>Tabs.List</InlineCode> ·{' '}
          <InlineCode>Tabs.Trigger</InlineCode> · <InlineCode>Tabs.Panel</InlineCode> 컴파운드 패턴으로 구성되며 키보드
          접근성(← → Home End)을 내장합니다. controlled / uncontrolled 두 모드를 모두 지원합니다.
        </p>
        <CodeBlock>{`import { Tabs } from '@ds/components/Tabs'`}</CodeBlock>
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
              { name: 'value', type: 'string', desc: '제어 모드 활성 탭 value. 제공 시 controlled 모드로 동작합니다.' },
              {
                name: 'defaultValue',
                type: 'string',
                desc: '비제어 모드 초기 value. value prop 없이 내부 상태로 관리할 때 사용합니다.',
              },
              {
                name: 'onValueChange',
                type: '(value: string) => void',
                desc: '활성 탭 변경 콜백. controlled/uncontrolled 모두에서 호출됩니다.',
              },
              {
                name: 'variant',
                type: "'line' | 'enclosed'",
                defaultVal: "'line'",
                desc: "탭 스타일 변형. line=언더라인 인디케이터, enclosed=박스형(상단 보더 박스)",
              },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TABS.LIST
          </p>
          <PropsTable
            rows={[
              {
                name: 'aria-label',
                type: 'string',
                desc: '스크린리더용 탭 목록 레이블. 페이지에 탭 목록이 여러 개일 때 구분을 위해 사용합니다.',
              },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TABS.TRIGGER
          </p>
          <PropsTable
            rows={[
              { name: 'value', type: 'string', desc: '이 트리거가 활성화하는 패널의 value — 패널과 반드시 일치해야 합니다.' },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '비활성화. 클릭 및 키보드 화살표 내비게이션 대상에서 제외됩니다.',
              },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TABS.PANEL
          </p>
          <PropsTable
            rows={[
              {
                name: 'value',
                type: 'string',
                desc: '이 패널을 활성화하는 트리거의 value와 일치해야 합니다. 비활성 시 hidden 처리됩니다.',
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
            <InlineCode>value</InlineCode>와 <InlineCode>onValueChange</InlineCode>로 활성 탭을 제어합니다.
          </p>
          <CodeBlock>{`const [value, setValue] = useState('tab1')

<Tabs value={value} onValueChange={setValue}>
  <Tabs.List>
    <Tabs.Trigger value="tab1">탭 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">탭 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="tab1">탭 1 내용</Tabs.Panel>
  <Tabs.Panel value="tab2">탭 2 내용</Tabs.Panel>
</Tabs>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <TabDemo />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>비제어 모드 (uncontrolled)</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary }}>
            <InlineCode>defaultValue</InlineCode>만 넘기면 내부 상태로 관리됩니다.{' '}
            <InlineCode>onValueChange</InlineCode>는 선택적으로 구독할 수 있습니다.
          </p>
          <CodeBlock>{`<Tabs defaultValue="tab1" onValueChange={(v) => console.log(v)}>
  <Tabs.List>
    <Tabs.Trigger value="tab1">탭 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">탭 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="tab1">탭 1 내용</Tabs.Panel>
  <Tabs.Panel value="tab2">탭 2 내용</Tabs.Panel>
</Tabs>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            {(() => {
              const UncontrolledDemo = () => (
                <Tabs defaultValue="tab1">
                  <Tabs.List>
                    <Tabs.Trigger value="tab1">탭 1</Tabs.Trigger>
                    <Tabs.Trigger value="tab2">탭 2</Tabs.Trigger>
                    <Tabs.Trigger value="tab3">탭 3</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Panel value="tab1">
                    <div style={{ padding: '12px 0', fontSize: 12, color: t.textSecondary }}>탭 1 내용입니다.</div>
                  </Tabs.Panel>
                  <Tabs.Panel value="tab2">
                    <div style={{ padding: '12px 0', fontSize: 12, color: t.textSecondary }}>탭 2 내용입니다.</div>
                  </Tabs.Panel>
                  <Tabs.Panel value="tab3">
                    <div style={{ padding: '12px 0', fontSize: 12, color: t.textSecondary }}>탭 3 내용입니다.</div>
                  </Tabs.Panel>
                </Tabs>
              )
              return <UncontrolledDemo />
            })()}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>비활성 탭</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary }}>
            <InlineCode>disabled</InlineCode> prop으로 특정 탭을 비활성화합니다. 키보드 화살표 이동 시 건너뜁니다.
          </p>
          {(() => {
            const DisabledDemo = () => {
              const [value, setValue] = useState<string>('active')
              return (
                <Tabs value={value} onValueChange={setValue}>
                  <Tabs.List>
                    <Tabs.Trigger value="active">활성 탭</Tabs.Trigger>
                    <Tabs.Trigger value="another">다른 탭</Tabs.Trigger>
                    <Tabs.Trigger value="disabled" disabled>
                      비활성 탭
                    </Tabs.Trigger>
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
          {(['line', 'enclosed'] as const).map((v) => (
            <Card key={v}>
              <p
                style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}
              >{`variant="${v}"`}</p>
              <TabDemo variant={v} />
            </Card>
          ))}
        </div>
      </Section>

      {/* Accessibility */}
      <Section gap={16}>
        <SectionTitle>접근성</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: t.text }}>키보드 내비게이션</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: t.surfaceHover }}>
                {['키', '동작'].map((h) => (
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
              {[
                { key: '← / →', action: '이전 / 다음 탭으로 포커스 이동 (순환)' },
                { key: 'Home', action: '첫 번째 탭으로 포커스 이동' },
                { key: 'End', action: '마지막 탭으로 포커스 이동' },
              ].map((row) => (
                <tr key={row.key} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                    <InlineCode>{row.key}</InlineCode>
                  </td>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top', color: t.textSecondary, lineHeight: 1.6 }}>
                    {row.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ margin: '12px 0 0', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            트리거는 <InlineCode>role="tab"</InlineCode>과 <InlineCode>aria-selected</InlineCode>를 가지며,{' '}
            <InlineCode>aria-controls</InlineCode>로 패널과 연결됩니다. 비활성(disabled) 탭은 키보드 이동 대상에서 제외됩니다.
          </p>
        </Card>
      </Section>
    </DocPage>
  ),
}
