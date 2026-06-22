import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { vars } from '../../theme/tokens.css'
import { RangeCalendar } from './RangeCalendar'
import type { RangePreset } from './RangeCalendar'

const meta = {
  title: 'StyleGuide/RangeCalendar',
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
        maxWidth: 900,
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

type PropRow = { name: string; type: string; defaultVal?: string; required?: boolean; desc: string }

const PropsTable = ({ title, rows }: { title?: string; rows: PropRow[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {title && (
      <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>{title}</p>
    )}
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
              {row.required && <span style={{ marginLeft: 4, fontSize: 10, color: '#e06c75' }}>required</span>}
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
  </div>
)

// ── Utilities ─────────────────────────────────────────────────────────────────

const pad = (n: number) => String(n).padStart(2, '0')

const formatDate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

const parseDate = (text: string): Date | null => {
  const d = new Date(text)
  return isNaN(d.getTime()) ? null : d
}

// ── Presets ───────────────────────────────────────────────────────────────────

const makePresets = (): RangePreset[] => [
  {
    label: '최근 1시간',
    type: 'preset',
    editValue: '-1h',
    getValue: () => {
      const now = new Date()
      const s = new Date(now)
      s.setHours(s.getHours() - 1)
      return { start: s, end: now }
    },
  },
  {
    label: '최근 6시간',
    type: 'preset',
    editValue: '-6h',
    getValue: () => {
      const now = new Date()
      const s = new Date(now)
      s.setHours(s.getHours() - 6)
      return { start: s, end: now }
    },
  },
  {
    label: '최근 24시간',
    type: 'preset',
    editValue: '-24h',
    getValue: () => {
      const now = new Date()
      const s = new Date(now)
      s.setHours(s.getHours() - 24)
      return { start: s, end: now }
    },
  },
  {
    label: '최근 7일',
    type: 'preset',
    editValue: '-7d',
    getValue: () => {
      const now = new Date()
      const s = new Date(now)
      s.setDate(s.getDate() - 7)
      return { start: s, end: now }
    },
  },
  {
    label: '직접입력',
    type: 'custom',
  },
]

// ── Interactive demo components ───────────────────────────────────────────────

const AbsoluteDemo = () => {
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  const presets = makePresets()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RangeCalendar
        start={start}
        end={end}
        onStartChange={setStart}
        onEndChange={setEnd}
        relativeValue={null}
        presets={presets}
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder="YYYY-MM-DD HH:mm:ss"
      />
      <p style={{ margin: 0, fontSize: 12, color: t.textSecondary }}>
        시작: <InlineCode>{start ? formatDate(start) : '미설정'}</InlineCode> 종료:{' '}
        <InlineCode>{end ? formatDate(end) : '미설정'}</InlineCode>
      </p>
    </div>
  )
}

const RelativeDemo = () => {
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  const [relativeValue, setRelativeValue] = useState<string | null>('최근 1시간')
  const presets = makePresets()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RangeCalendar
        start={start}
        end={end}
        onStartChange={setStart}
        onEndChange={setEnd}
        relativeValue={relativeValue}
        onRelativeValueChange={setRelativeValue}
        presets={presets}
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder="-6h, -7d …"
      />
      <p style={{ margin: 0, fontSize: 12, color: t.textSecondary }}>
        relativeValue: <InlineCode>{relativeValue ?? 'null (absolute 모드)'}</InlineCode>
      </p>
    </div>
  )
}

const DisabledDemo = () => {
  const [start] = useState<Date | null>(() => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return d
  })
  const [end] = useState<Date | null>(() => new Date())
  const presets = makePresets()

  return (
    <RangeCalendar
      start={start}
      end={end}
      relativeValue={null}
      presets={presets}
      formatDate={formatDate}
      parseDate={parseDate}
      disabled
    />
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>RangeCalendar</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 660 }}>
          시작·종료 날짜 범위를 선택하는 컴포넌트입니다. <strong style={{ color: t.text }}>절대 모드</strong>(날짜 직접
          입력·캘린더 선택)와 <strong style={{ color: t.text }}>상대 모드</strong>(최근 1시간 등 preset, 직접입력
          표현식)를
          <InlineCode>relativeValue</InlineCode>로 전환합니다. 사이드바의 preset 목록은 <InlineCode>presets</InlineCode>{' '}
          prop으로 완전히 커스터마이즈 가능합니다.
        </p>
        <CodeBlock>{`import { RangeCalendar } from '@nayoung-port/design-system/components/RangeCalendar'
import type { RangePreset } from '@nayoung-port/design-system/components/RangeCalendar'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <PropsTable
              title="RangeCalendarProps"
              rows={[
                { name: 'start', type: 'Date | null', defaultVal: 'null', desc: '선택된 시작 날짜 (controlled)' },
                { name: 'end', type: 'Date | null', defaultVal: 'null', desc: '선택된 종료 날짜 (controlled)' },
                { name: 'onStartChange', type: '(date: Date) => void', desc: '시작 날짜 변경 핸들러' },
                { name: 'onEndChange', type: '(date: Date) => void', desc: '종료 날짜 변경 핸들러' },
                {
                  name: 'relativeValue',
                  type: 'string | null',
                  defaultVal: 'null',
                  desc: 'null → absolute 모드 / \'\' → 직접입력 선택 / preset label → 해당 preset 활성 / 기타 문자열 → 커밋된 표현식 (예: \'-7d\')',
                },
                {
                  name: 'onRelativeValueChange',
                  type: '(value: string | null) => void',
                  desc: 'relativeValue 변경 핸들러',
                },
                {
                  name: 'presets',
                  type: 'RangePreset[]',
                  required: true,
                  desc: '사이드바에 표시할 preset 목록. preset과 custom 타입을 혼합해 구성합니다.',
                },
                {
                  name: 'formatDate',
                  type: '(date: Date) => string',
                  required: true,
                  desc: 'Date → 텍스트 변환 함수. input 표시와 동기화에 사용합니다.',
                },
                {
                  name: 'parseDate',
                  type: '(text: string) => Date | null',
                  required: true,
                  desc: '텍스트 → Date 파싱 함수. 파싱 실패 시 null 반환.',
                },
                { name: 'placeholder', type: 'string', desc: 'relative 모드 input의 placeholder 텍스트' },
                { name: 'disabled', type: 'boolean', desc: '컴포넌트 전체 비활성화' },
                { name: 'disabledBefore', type: 'Date', desc: '이 날짜 이전은 캘린더에서 선택 불가' },
                { name: 'disabledAfter', type: 'Date', desc: '이 날짜 이후는 캘린더에서 선택 불가' },
                { name: 'className', type: 'string', desc: '루트 wrapper 요소에 추가할 CSS 클래스' },
              ]}
            />
            <PropsTable
              title="RangePreset"
              rows={[
                {
                  name: 'label',
                  type: 'string',
                  desc: '사이드바에 표시할 이름. relativeValue의 식별자로도 사용됩니다.',
                },
                {
                  name: 'type',
                  type: "'preset' | 'custom'",
                  desc: "preset: 클릭 시 getValue()로 범위 적용 / custom: 직접입력 모드 진입",
                },
                {
                  name: 'getValue',
                  type: '(now?: Date) => { start, end }',
                  desc: "type='preset'일 때 필수. 클릭 시 날짜 범위를 반환합니다.",
                },
                {
                  name: 'editValue',
                  type: 'string',
                  desc: "type='preset'일 때 선택. focus 시 input에 prefill할 표현식 (예: '-6h')",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      {/* 절대 모드 */}
      <Section gap={16}>
        <SectionTitle>절대 모드 (relativeValue=null)</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>relativeValue</InlineCode>를 <InlineCode>null</InlineCode>로 유지하면 절대 모드입니다. 시작·종료
            날짜 input을 직접 타이핑하거나 달력에서 선택합니다.
          </p>
          <CodeBlock>{`const [start, setStart] = useState<Date | null>(null)
const [end, setEnd] = useState<Date | null>(null)

<RangeCalendar
  start={start}
  end={end}
  onStartChange={setStart}
  onEndChange={setEnd}
  relativeValue={null}
  presets={presets}
  formatDate={formatDate}
  parseDate={parseDate}
/>`}</CodeBlock>
          <div style={{ marginTop: 20 }}>
            <AbsoluteDemo />
          </div>
        </Card>
      </Section>

      {/* 상대 모드 */}
      <Section gap={16}>
        <SectionTitle>상대 모드 (relativeValue 사용)</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>relativeValue</InlineCode>에 preset label이나 표현식을 전달하면 상대 모드로 전환됩니다.
            사이드바에서 preset을 클릭하거나 직접입력 모드에서 <InlineCode>-6h</InlineCode>,{' '}
            <InlineCode>-7d</InlineCode> 형식으로 입력합니다.
          </p>
          <CodeBlock>{`const [relativeValue, setRelativeValue] = useState<string | null>('최근 1시간')

<RangeCalendar
  start={start}
  end={end}
  onStartChange={setStart}
  onEndChange={setEnd}
  relativeValue={relativeValue}
  onRelativeValueChange={setRelativeValue}
  presets={presets}
  formatDate={formatDate}
  parseDate={parseDate}
  placeholder="-6h, -7d …"
/>`}</CodeBlock>
          <div style={{ marginTop: 20 }}>
            <RelativeDemo />
          </div>
        </Card>
      </Section>

      {/* Presets 구성 */}
      <Section gap={16}>
        <SectionTitle>Presets 구성</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>presets</InlineCode>는 <InlineCode>type: 'preset'</InlineCode> 항목과{' '}
            <InlineCode>type: 'custom'</InlineCode> 항목(직접입력)으로 구성합니다. custom은 사이드바 하단에 고정됩니다.
          </p>
          <CodeBlock>{`const presets: RangePreset[] = [
  {
    label: '최근 1시간',
    type: 'preset',
    editValue: '-1h',   // focus 시 input에 prefill
    getValue: () => {
      const now = new Date()
      const s = new Date(now)
      s.setHours(s.getHours() - 1)
      return { start: s, end: now }
    },
  },
  {
    label: '최근 7일',
    type: 'preset',
    editValue: '-7d',
    getValue: () => {
      const now = new Date()
      const s = new Date(now)
      s.setDate(s.getDate() - 7)
      return { start: s, end: now }
    },
  },
  { label: '직접입력', type: 'custom' },  // 항상 마지막에
]`}</CodeBlock>
        </Card>
      </Section>

      {/* relativeValue 상태 흐름 */}
      <Section gap={16}>
        <SectionTitle>relativeValue 상태 흐름</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { value: 'null', desc: '절대 모드. 사이드바 하이라이트 없음. 시작·종료 input 표시.' },
              { value: '"최근 1시간"', desc: 'preset 선택 상태. 사이드바에서 해당 항목 하이라이트.' },
              { value: '""', desc: '직접입력 선택, 아직 미입력. 사이드바에서 직접입력 하이라이트.' },
              { value: '"-7d"', desc: '직접입력 + 커밋된 표현식. 사이드바에서 직접입력 하이라이트.' },
            ].map(({ value, desc }) => (
              <div
                key={value}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '10px 14px',
                  background: t.surfaceHover,
                  borderRadius: t.radiusSm,
                }}
              >
                <InlineCode>{`relativeValue = ${value}`}</InlineCode>
                <span style={{ fontSize: 13, color: t.textSecondary }}>{desc}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Disabled */}
      <Section gap={16}>
        <SectionTitle>Disabled</SectionTitle>
        <Card>
          <CodeBlock>{`<RangeCalendar ... disabled />`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <DisabledDemo />
          </div>
        </Card>
      </Section>

      {/* 날짜 범위 제한 */}
      <Section gap={16}>
        <SectionTitle>날짜 범위 제한</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>disabledBefore</InlineCode> · <InlineCode>disabledAfter</InlineCode>로 선택 가능한 날짜를
            제한합니다. 캘린더에서 해당 날짜가 흐리게 표시되고 클릭이 비활성화됩니다.
          </p>
          <CodeBlock>{`const thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

<RangeCalendar
  ...
  disabledBefore={thirtyDaysAgo}
  disabledAfter={new Date()}
/>`}</CodeBlock>
        </Card>
      </Section>
    </DocPage>
  ),
}
