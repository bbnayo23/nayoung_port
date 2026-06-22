import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { CalendarInput } from './CalendarInput'

const meta = {
  title: 'StyleGuide/CalendarInput',
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
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

const pad = (n: number) => String(n).padStart(2, '0')
const formatDate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

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
    const [value, setValue] = useState('')
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const now = new Date()
    const [preValue, setPreValue] = useState(formatDate(now))
    const [preSelected, setPreSelected] = useState<Date | null>(now)

    const [rangeValue, setRangeValue] = useState('')
    const [rangeDate, setRangeDate] = useState<Date | null>(null)
    const today = new Date()
    const disabledBefore = new Date(today.getFullYear(), today.getMonth(), 1)
    const disabledAfter = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const handleSelect =
      (setVal: (v: string) => void, setDate: (d: Date | null) => void) => (date: Date | undefined) => {
        setDate(date ?? null)
        setVal(date ? formatDate(date) : '')
      }

    return (
      <DocPage>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>CalendarInput</h1>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
            텍스트 입력과 달력 팝업을 결합한 날짜 선택 컴포넌트입니다. 입력 필드를 클릭하면 달력 팝업이 열리고, 날짜
            선택 시 <InlineCode>YYYY-MM-DD HH:mm:ss</InlineCode> 형식으로 값이 채워집니다.
          </p>
          <CodeBlock>{`import { CalendarInput } from '@port/design-system/components/CalendarInput'`}</CodeBlock>
        </div>

        <Section>
          <SectionTitle>API</SectionTitle>
          <DocCard>
            <PropsTable
              rows={[
                { name: 'value', type: 'string', desc: '입력 필드에 표시되는 텍스트 값 (controlled)' },
                { name: 'selectedDate', type: 'Date | null', desc: '달력에서 하이라이트할 선택된 날짜' },
                {
                  name: 'onDateSelect',
                  type: '(date: Date | undefined) => void',
                  desc: '달력에서 날짜 클릭 시 호출. 선택 해제 시 undefined',
                },
                {
                  name: 'onInputChange',
                  type: '(text: string) => void',
                  desc: '입력 필드 직접 타이핑 시 호출',
                },
                { name: 'onInputBlur', type: '() => void', desc: '입력 필드 blur 시 호출' },
                { name: 'disabledBefore', type: 'Date', desc: '이 날짜 이전은 달력에서 선택 불가' },
                { name: 'disabledAfter', type: 'Date', desc: '이 날짜 이후는 달력에서 선택 불가' },
                {
                  name: 'placeholder',
                  type: 'string',
                  defaultVal: "'YYYY-MM-DD HH:mm:ss'",
                  desc: '입력 필드 placeholder',
                },
                { name: 'disabled', type: 'boolean', desc: '비활성화 — 입력 및 달력 팝업 불가' },
                {
                  name: 'className',
                  type: 'string',
                  desc: '최상위 wrapper에 추가할 className. 너비 조정은 이 prop이나 부모 컨테이너로 제어합니다.',
                },
              ]}
            />
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>기본 사용</SectionTitle>
          <CodeBlock>{`const [value, setValue] = useState('')
const [selectedDate, setSelectedDate] = useState<Date | null>(null)

const handleDateSelect = (date: Date | undefined) => {
  setSelectedDate(date ?? null)
  setValue(date ? formatDate(date) : '')
}

<CalendarInput
  value={value}
  selectedDate={selectedDate}
  onDateSelect={handleDateSelect}
  onInputChange={setValue}
/>`}</CodeBlock>
          <DocCard>
            <div style={{ maxWidth: 280 }}>
              <CalendarInput
                value={value}
                selectedDate={selectedDate}
                onDateSelect={handleSelect(setValue, setSelectedDate)}
                onInputChange={setValue}
              />
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>너비 설정</SectionTitle>
          <CodeBlock>{`// 부모 컨테이너로 너비 제어 (권장)
<div style={{ width: 240 }}>
  <CalendarInput ... />
</div>

// className으로 너비 제어
<CalendarInput className={styles.myInput} ... />
// .myInput { width: 320px; }`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {([160, 240, 360] as const).map((w) => (
                <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ width: 36, fontSize: 12, color: t.textMuted, flexShrink: 0 }}>{w}px</span>
                  <div style={{ width: w }}>
                    <CalendarInput placeholder='YYYY-MM-DD HH:mm:ss' />
                  </div>
                </div>
              ))}
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>초기값 설정</SectionTitle>
          <CodeBlock>{`const now = new Date()
const [value, setValue] = useState(formatDate(now))
const [selectedDate, setSelectedDate] = useState<Date | null>(now)`}</CodeBlock>
          <DocCard>
            <div style={{ maxWidth: 280 }}>
              <CalendarInput
                value={preValue}
                selectedDate={preSelected}
                onDateSelect={handleSelect(setPreValue, setPreSelected)}
                onInputChange={setPreValue}
              />
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>날짜 범위 제한</SectionTitle>
          <CodeBlock>{`const today = new Date()
const disabledBefore = new Date(today.getFullYear(), today.getMonth(), 1)
const disabledAfter  = new Date(today.getFullYear(), today.getMonth() + 1, 0)

<CalendarInput
  value={value}
  selectedDate={selectedDate}
  onDateSelect={handleDateSelect}
  onInputChange={setValue}
  disabledBefore={disabledBefore}
  disabledAfter={disabledAfter}
/>`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280 }}>
              <span style={{ fontSize: 12, color: t.textMuted }}>이번 달 날짜만 선택 가능합니다.</span>
              <CalendarInput
                value={rangeValue}
                selectedDate={rangeDate}
                onDateSelect={handleSelect(setRangeValue, setRangeDate)}
                onInputChange={setRangeValue}
                disabledBefore={disabledBefore}
                disabledAfter={disabledAfter}
              />
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>Disabled</SectionTitle>
          <CodeBlock>{`<CalendarInput value="2025-01-15 09:00:00" disabled />`}</CodeBlock>
          <DocCard>
            <div style={{ maxWidth: 280 }}>
              <CalendarInput value='2025-01-15 09:00:00' disabled />
            </div>
          </DocCard>
        </Section>
      </DocPage>
    )
  },
}
