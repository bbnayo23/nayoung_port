import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Checkbox from '../../components/Checkbox'

const meta = {
  title: 'StyleGuide/Checkbox',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

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

export const Documentation: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 'a', label: '이용약관 동의 (필수)', checked: false },
      { id: 'b', label: '개인정보 수집 동의 (필수)', checked: false },
      { id: 'c', label: '마케팅 정보 수신 동의 (선택)', checked: false },
    ])
    const allChecked = items.every((i) => i.checked)
    const someChecked = items.some((i) => i.checked)
    const toggle = (id: string) =>
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)))
    const toggleAll = () => setItems((prev) => prev.map((i) => ({ ...i, checked: !allChecked })))

    return (
      <DocPage>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Checkbox</h1>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
            checked · indeterminate · disabled 3가지 상태와 4가지 color variant를 지원하는 체크박스 컴포넌트입니다.
            라벨을 좌·우로 배치할 수 있습니다.
          </p>
          <CodeBlock>{`import Checkbox from '@port/design-system'`}</CodeBlock>
        </div>

        <Section>
          <SectionTitle>API</SectionTitle>
          <DocCard>
            <PropsTable
              rows={[
                { name: 'checked', type: 'boolean', defaultVal: 'false', desc: '체크 상태' },
                {
                  name: 'indeterminate',
                  type: 'boolean',
                  defaultVal: 'false',
                  desc: '중간(mixed) 상태 — checked와 독립적으로 동작',
                },
                {
                  name: 'disabled',
                  type: 'boolean',
                  defaultVal: 'false',
                  desc: '비활성화 — opacity 0.5, cursor not-allowed',
                },
                { name: 'label', type: 'string | ReactNode', desc: '체크박스 옆에 표시할 라벨' },
                { name: 'labelDirection', type: "'left' | 'right'", defaultVal: "'right'", desc: '라벨 위치' },
                { name: 'color', type: "'danger' | 'warning' | 'success' | 'info'", desc: '체크 색상 variant' },
                { name: 'onChange', type: '(e: ChangeEvent) => void', desc: '상태 변경 핸들러' },
                { name: 'id', type: 'string', desc: 'label htmlFor 연결용 id' },
              ]}
            />
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>State</SectionTitle>
          <DocCard>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {[
                { label: 'Default', props: {} },
                { label: 'Checked', props: { checked: true, onChange: () => {} } },
                { label: 'Indeterminate', props: { indeterminate: true, onChange: () => {} } },
                { label: 'Disabled', props: { disabled: true } },
                { label: 'Disabled + Checked', props: { disabled: true, checked: true, onChange: () => {} } },
              ].map(({ label, props }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                  <Checkbox label={label} {...props} />
                  <InlineCode>{label}</InlineCode>
                </div>
              ))}
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>Color</SectionTitle>
          <CodeBlock>{`<Checkbox color="danger" checked />
<Checkbox color="success" checked />`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {(['danger', 'warning', 'success', 'info'] as const).map((color) => (
                <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                  <Checkbox label={color} color={color} checked onChange={() => {}} />
                  <InlineCode>{color}</InlineCode>
                </div>
              ))}
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>LabelDirection</SectionTitle>
          <DocCard>
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Checkbox label="Right (기본값)" labelDirection="right" checked onChange={() => {}} />
                <InlineCode>labelDirection="right"</InlineCode>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Checkbox label="Left" labelDirection="left" checked onChange={() => {}} />
                <InlineCode>labelDirection="left"</InlineCode>
              </div>
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>인터랙티브 예제 — 전체 동의</SectionTitle>
          <CodeBlock>{`const allChecked = items.every(i => i.checked)
const someChecked = items.some(i => i.checked)

<Checkbox
  label="전체 동의"
  checked={allChecked}
  indeterminate={someChecked && !allChecked}
  onChange={toggleAll}
/>`}</CodeBlock>
          <DocCard style={{ maxWidth: 360 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Checkbox
                label="전체 동의"
                checked={allChecked}
                indeterminate={someChecked && !allChecked}
                onChange={toggleAll}
              />
              <div style={{ height: 1, background: t.border }} />
              {items.map((item) => (
                <Checkbox key={item.id} label={item.label} checked={item.checked} onChange={() => toggle(item.id)} />
              ))}
            </div>
          </DocCard>
        </Section>
      </DocPage>
    )
  },
}
