import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import { DateTimePicker } from '../../components/DateTimePicker'
import type { DateTimePreset, DateTimeRange } from '../../components/DateTimePicker'

const meta = {
  title: 'StyleGuide/DateTimePicker',
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
      style={{
        display: 'inline-block',
        width: 3,
        height: 16,
        background: t.primary,
        borderRadius: 2,
        flexShrink: 0,
      }}
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

type PropRow = {
  name: string
  type: string
  defaultVal?: string
  required?: boolean
  desc: string
}

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

const InfoPanel = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      padding: '10px 14px',
      background: t.surfaceHover,
      border: `1px solid ${t.border}`,
      borderRadius: t.radiusSm,
      fontSize: 12,
      fontFamily: 'monospace',
      color: t.textSecondary,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}
  >
    {children}
  </div>
)

const ControlledDemo = () => {
  const [preset, setPreset] = useState<DateTimePreset>('today')
  const [range, setRange] = useState<DateTimeRange | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 460 }}>
      <DateTimePicker
        label="검색 시간"
        preset={preset}
        onChange={(r, p) => {
          setRange(r)
          setPreset(p)
        }}
        size="sm"
      />
      <InfoPanel>
        <div>
          <strong style={{ color: t.text }}>Preset:</strong> {preset}
        </div>
        {range && (
          <>
            <div>
              <strong style={{ color: t.text }}>Start:</strong> {range.start.toLocaleString('ko-KR')}
            </div>
            <div>
              <strong style={{ color: t.text }}>End:</strong> {range.end.toLocaleString('ko-KR')}
            </div>
          </>
        )}
      </InfoPanel>
    </div>
  )
}

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
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>DateTimePicker</h1>
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
            PICKER
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          날짜·시간 범위를 선택하는 피커 컴포넌트입니다. 프리셋 목록과 캘린더 직접 선택, 텍스트 직접 입력을 모두
          지원합니다. <InlineCode>preset</InlineCode> prop으로 제어 모드를, <InlineCode>defaultPreset</InlineCode>으로
          비제어 초기값을 설정합니다.
        </p>
        <CodeBlock>{`import { DateTimePicker } from '@port/design-system'
import type { DateTimePreset, DateTimeRange } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            DATETIMEPICKER
          </p>
          <PropsTable
            rows={[
              { name: 'label', type: 'string', desc: '트리거 왼쪽에 표시되는 라벨' },
              { name: 'preset', type: 'DateTimePreset', desc: '제어 모드 프리셋 값' },
              { name: 'defaultPreset', type: 'DateTimePreset', defaultVal: "'today'", desc: '비제어 모드 초기 프리셋' },
              {
                name: 'onChange',
                type: '(range: DateTimeRange, preset: DateTimePreset) => void',
                desc: '날짜 범위 변경 콜백',
              },
              { name: 'presets', type: 'PresetItem[]', defaultVal: '기본 10개', desc: '프리셋 목록 커스터마이즈' },
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'sm'", desc: '트리거 크기' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '비활성 상태' },
              { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TYPES
          </p>
          <CodeBlock>{`type DateTimePreset =
  | 'today' | 'yesterday'
  | 'last30m' | 'last1h' | 'last6h' | 'last12h'
  | 'last1d' | 'last7d' | 'last30d'
  | 'custom'

interface DateTimeRange {
  start: Date
  end: Date
}

interface PresetItem {
  value: DateTimePreset
  label: string
}`}</CodeBlock>
        </Card>
      </Section>

      {/* Usage patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 사용법"
            desc="label과 size를 지정하면 됩니다. 비제어 모드에서 defaultPreset으로 초기 프리셋을 설정합니다."
            code={`<DateTimePicker label="검색 시간" size="sm" />`}
          >
            <div style={{ paddingBottom: 460 }}>
              <DateTimePicker label="검색 시간" size="sm" />
            </div>
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="제어 모드 (controlled)"
            desc="preset + onChange로 외부 상태와 동기화합니다. onChange는 DateTimeRange와 DateTimePreset을 함께 전달합니다."
            code={`const [preset, setPreset] = useState<DateTimePreset>('today')

<DateTimePicker
  label="검색 시간"
  preset={preset}
  onChange={(range, p) => setPreset(p)}
  size="sm"
/>`}
          >
            <ControlledDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Custom Presets"
            desc="presets prop으로 프리셋 목록을 원하는 항목만 표시하도록 커스터마이즈합니다."
            code={`<DateTimePicker
  label="등록일"
  size="sm"
  presets={[
    { value: 'today',   label: '오늘' },
    { value: 'last7d',  label: '최근 7일' },
    { value: 'last30d', label: '최근 30일' },
    { value: 'custom',  label: '직접 입력' },
  ]}
/>`}
          >
            <div style={{ paddingBottom: 200 }}>
              <DateTimePicker
                label="등록일"
                size="sm"
                presets={[
                  { value: 'today', label: '오늘' },
                  { value: 'last7d', label: '최근 7일' },
                  { value: 'last30d', label: '최근 30일' },
                  { value: 'custom', label: '직접 입력' },
                ]}
              />
            </div>
          </Pattern>
        </Card>
      </Section>

      {/* Size */}
      <Section gap={16}>
        <SectionTitle>Size</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Card key={size}>
              <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
                {`size="${size}"`}
              </p>
              <DateTimePicker label="검색 시간" size={size} />
            </Card>
          ))}
        </div>
      </Section>

      {/* Presets */}
      <Section gap={16}>
        <SectionTitle>기본 프리셋 목록</SectionTitle>
        <Card style={{ background: t.surfaceHover }}>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: t.textSecondary, lineHeight: 1.7 }}>
            기본 제공 10개 프리셋입니다. <InlineCode>custom</InlineCode>은 패널을 열어 달력으로 직접 날짜를 선택하거나
            텍스트 입력으로 범위를 지정할 수 있습니다.
          </p>
          <CodeBlock>{`'today'     → 오늘 00:00:00 ~ 23:59:59
'yesterday' → 어제 00:00:00 ~ 23:59:59
'last30m'   → 최근 30분
'last1h'    → 최근 1시간
'last6h'    → 최근 6시간
'last12h'   → 최근 12시간
'last1d'    → 최근 1일
'last7d'    → 최근 7일
'last30d'   → 최근 30일
'custom'    → 직접 입력 (캘린더 + 텍스트 입력)`}</CodeBlock>
        </Card>
      </Section>

      {/* Disabled */}
      <Section gap={16}>
        <SectionTitle>비활성화</SectionTitle>
        <Card>
          <DateTimePicker label="검색 시간" size="sm" disabled />
        </Card>
      </Section>
    </DocPage>
  ),
}
