import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import { Toggle } from '../../components/Toggle'
import type { ToggleSize } from '../../components/Toggle'

const meta = {
  title: 'StyleGuide/Toggle',
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

const StateRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
    <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>{label}</span>
    {children}
  </div>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Toggle</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          controlled / uncontrolled 모드를 모두 지원하는 스위치 컴포넌트입니다. <InlineCode>label</InlineCode>과{' '}
          <InlineCode>innerLabel</InlineCode> 옵션으로 다양한 레이아웃을 구성할 수 있으며 키보드 접근성을 내장합니다.
        </p>
        <CodeBlock>{`import { Toggle } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'checked', type: 'boolean', desc: 'Controlled 모드 — 외부에서 on/off 상태를 제어합니다.' },
              { name: 'defaultChecked', type: 'boolean', defaultVal: 'false', desc: 'Uncontrolled 모드 초기값' },
              { name: 'onChange', type: '(checked: boolean) => void', desc: '상태 변경 콜백' },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '트랙 크기 — sm(28×16) · md(40×22) · lg(52×28)',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '비활성화. 클릭과 키보드 조작을 막습니다.',
              },
              { name: 'label', type: 'ReactNode', desc: '트랙 오른쪽에 표시되는 라벨' },
              {
                name: 'innerLabel',
                type: 'boolean',
                defaultVal: 'false',
                desc: '트랙 내부에 ON/OFF 텍스트를 표시합니다.',
              },
            ]}
          />
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>Controlled</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>checked</InlineCode>와 <InlineCode>onChange</InlineCode>로 상태를 완전히 제어합니다.
          </p>
          <CodeBlock>{`const [on, setOn] = useState(false)

<Toggle checked={on} onChange={setOn} label="알림 활성화" />`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            {(() => {
              const Demo = () => {
                const [on, setOn] = useState(false)
                return <Toggle checked={on} onChange={setOn} label={on ? '켜짐' : '꺼짐'} />
              }
              return <Demo />
            })()}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>Uncontrolled</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>defaultChecked</InlineCode>로 초기값만 지정하고 내부 상태로 동작합니다.
          </p>
          <CodeBlock>{`<Toggle defaultChecked label="다크 모드" />`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <Toggle defaultChecked label="다크 모드" />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>Inner Label</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>innerLabel</InlineCode>을 활성화하면 트랙 내부에 ON/OFF 텍스트가 표시됩니다.
          </p>
          <CodeBlock>{`<Toggle innerLabel defaultChecked />`}</CodeBlock>
          <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>
            <Toggle innerLabel />
            <Toggle innerLabel defaultChecked />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>설정 목록 패턴</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            여러 Toggle을 하나의 상태 객체로 제어하는 실제 사용 패턴입니다.
          </p>
          {(() => {
            const SETTINGS = [
              {
                id: 'notifications',
                label: '알림 활성화',
                description: '새 보안 이벤트 발생 시 알림을 받습니다.',
                defaultChecked: true,
              },
              {
                id: '2fa',
                label: '2단계 인증',
                description: '로그인 시 추가 인증을 요구합니다.',
                defaultChecked: true,
              },
              {
                id: 'autolock',
                label: '자동 잠금',
                description: '10분 비활동 후 화면을 잠급니다.',
                defaultChecked: false,
              },
            ]
            const Demo = () => {
              const [states, setStates] = useState<Record<string, boolean>>(
                Object.fromEntries(SETTINGS.map((s) => [s.id, s.defaultChecked])),
              )
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${t.border}`,
                    borderRadius: t.radius,
                    overflow: 'hidden',
                  }}
                >
                  {SETTINGS.map((s, i) => (
                    <div
                      key={s.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 20px',
                        borderBottom: i < SETTINGS.length - 1 ? `1px solid ${t.border}` : 'none',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{s.label}</div>
                        <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>{s.description}</div>
                      </div>
                      <Toggle checked={states[s.id]} onChange={(v) => setStates((prev) => ({ ...prev, [s.id]: v }))} />
                    </div>
                  ))}
                </div>
              )
            }
            return <Demo />
          })()}
        </Card>
      </Section>

      {/* States */}
      <Section gap={16}>
        <SectionTitle>States</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
            <StateRow label="off">
              <Toggle />
            </StateRow>
            <StateRow label="on">
              <Toggle defaultChecked />
            </StateRow>
            <StateRow label="disabled off">
              <Toggle disabled />
            </StateRow>
            <StateRow label="disabled on">
              <Toggle disabled defaultChecked />
            </StateRow>
            <StateRow label="focus">
              <Toggle className="is-focus" />
            </StateRow>
          </div>
        </Card>
      </Section>

      {/* Size */}
      <Section gap={16}>
        <SectionTitle>Size</SectionTitle>
        <Card>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            {(['sm', 'md', 'lg'] as ToggleSize[]).map((s) => (
              <StateRow key={s} label={s === 'sm' ? `sm — 28×16` : s === 'md' ? `md — 40×22` : `lg — 52×28`}>
                <Toggle size={s} defaultChecked />
              </StateRow>
            ))}
          </div>
        </Card>
      </Section>

      {/* Inner Label sizes */}
      <Section gap={16}>
        <SectionTitle>Inner Label</SectionTitle>
        <Card>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            {(['sm', 'md', 'lg'] as ToggleSize[]).map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <StateRow label={`${s} — off`}>
                  <Toggle size={s} innerLabel />
                </StateRow>
                <StateRow label={`${s} — on`}>
                  <Toggle size={s} innerLabel defaultChecked />
                </StateRow>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
