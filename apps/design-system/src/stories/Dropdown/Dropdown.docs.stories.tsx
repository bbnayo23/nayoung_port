import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import { Dropdown } from '../../components/Dropdown'
import type { DropdownOption } from '../../components/Dropdown'

const meta = {
  title: 'StyleGuide/Dropdown',
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

const RequiredBadge = () => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 600,
      color: vars.color.error,
      background: 'rgba(240,62,62,0.08)',
      borderRadius: 3,
      padding: '1px 5px',
      marginLeft: 4,
    }}
  >
    required
  </span>
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
            {row.required && <RequiredBadge />}
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

// ── Sample data ───────────────────────────────────────────────────────────────

const sampleOptions: DropdownOption[] = [
  { value: 'all', label: '전체' },
  { value: 'info', label: 'INFO' },
  { value: 'warn', label: 'WARN' },
  { value: 'error', label: 'ERROR' },
  { value: 'debug', label: 'DEBUG', disabled: true },
]

const coloredOptions: DropdownOption[] = [
  { value: 'critical', label: 'Critical', variant: 'red' },
  { value: 'high', label: 'High', variant: 'orange' },
  { value: 'medium', label: 'Medium', variant: 'yellow' },
  { value: 'low', label: 'Low', variant: 'green' },
  { value: 'info2', label: 'Info', variant: 'purple' },
]

// ── Demo components ───────────────────────────────────────────────────────────

const SingleControlledDemo = () => {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 180 }}>
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={(v) => setValue(v)}
        placeholder="선택하세요"
        style={{ minWidth: 160 }}
      />
      <div
        style={{
          padding: '8px 12px',
          background: t.surfaceHover,
          border: `1px solid ${t.border}`,
          borderRadius: t.radiusSm,
          fontSize: 12,
          fontFamily: 'monospace',
          color: t.textSecondary,
        }}
      >
        value: {value ?? 'undefined'}
      </div>
    </div>
  )
}

const MultiCountDemo = () => {
  const [selected, setSelected] = useState<string[]>([])
  return (
    <div style={{ paddingBottom: 180 }}>
      <Dropdown
        multiSelect
        options={sampleOptions}
        value={selected}
        onChange={setSelected}
        placeholder="선택하세요"
        style={{ minWidth: 160 }}
      />
    </div>
  )
}

const MultiTagsDemo = () => {
  const [selected, setSelected] = useState<string[]>(['critical', 'high'])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 220 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Dropdown
          multiSelect
          multiDisplayMode="tags"
          options={coloredOptions}
          value={selected}
          onChange={setSelected}
          placeholder="선택하세요"
          style={{ minWidth: 200 }}
        />
        <Dropdown
          multiSelect
          multiDisplayMode="tags-closable"
          options={coloredOptions}
          value={selected}
          onChange={setSelected}
          placeholder="선택하세요"
          style={{ minWidth: 200 }}
        />
      </div>
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

type MultiDisplayMode = 'count' | 'values' | 'tags' | 'tags-closable'

const MultiDisplayModeDemo = ({ mode }: { mode: MultiDisplayMode }) => {
  const [value, setValue] = useState<string[]>(['critical', 'high'])
  return (
    <Card>
      <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
        {`multiDisplayMode="${mode}"`}
      </p>
      <Dropdown
        multiSelect
        multiDisplayMode={mode}
        options={coloredOptions}
        value={value}
        onChange={setValue}
        placeholder="선택하세요"
      />
    </Card>
  )
}

const MultiDisplayModeSection = () => (
  <Section gap={16}>
    <SectionTitle>multiDisplayMode</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <MultiDisplayModeDemo mode="count" />
      <MultiDisplayModeDemo mode="values" />
      <MultiDisplayModeDemo mode="tags" />
      <MultiDisplayModeDemo mode="tags-closable" />
    </div>
  </Section>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Dropdown</h1>
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
            SELECT
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          단일/다중 선택 드롭다운 컴포넌트입니다. <InlineCode>multiSelect</InlineCode> prop으로 모드를 전환하며, 다중
          선택 시 <InlineCode>multiDisplayMode</InlineCode>로 count·values·tags·tags-closable 표시 방식을 선택합니다.
        </p>
        <CodeBlock>{`import { Dropdown } from '@port/design-system'
import type { DropdownOption } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            DROPDOWN (공통)
          </p>
          <PropsTable
            rows={[
              { name: 'options', type: 'DropdownOption[]', required: true, desc: '선택 옵션 목록' },
              { name: 'placeholder', type: 'string', defaultVal: "'선택'", desc: '미선택 상태 텍스트' },
              { name: 'label', type: 'string', desc: '트리거 앞에 통합 표시되는 라벨' },
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", desc: '드롭다운 크기' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '비활성 상태' },
              { name: 'width', type: 'number | string', desc: "드롭다운 너비 직접 지정 (예: 200, '100%')" },
              {
                name: 'forceOpen',
                type: 'boolean',
                defaultVal: 'false',
                desc: '메뉴를 강제로 열어둠 (Style Guide 전용)',
              },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            SINGLE SELECT (기본)
          </p>
          <PropsTable
            rows={[
              { name: 'multiSelect', type: 'false', defaultVal: 'false', desc: '단일 선택 모드 (기본값)' },
              { name: 'value', type: 'string', desc: '제어 모드 선택값' },
              { name: 'defaultValue', type: 'string', desc: '비제어 모드 초기값' },
              { name: 'onChange', type: '(value: string, option: DropdownOption) => void', desc: '값 변경 콜백' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            MULTI SELECT
          </p>
          <PropsTable
            rows={[
              { name: 'multiSelect', type: 'true', required: true, desc: '다중 선택 모드 활성화' },
              {
                name: 'multiDisplayMode',
                type: "'count' | 'values' | 'tags' | 'tags-closable'",
                defaultVal: "'count'",
                desc: '트리거 표시 방식',
              },
              { name: 'value', type: 'string[]', desc: '제어 모드 선택값 배열' },
              { name: 'defaultValue', type: 'string[]', desc: '비제어 모드 초기값 배열' },
              {
                name: 'onChange',
                type: '(values: string[], options: DropdownOption[]) => void',
                desc: '값 변경 콜백',
              },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            DROPDOWNOPTION
          </p>
          <CodeBlock>{`interface DropdownOption {
  value: string
  label: string
  disabled?: boolean  // 개별 옵션 비활성화
  variant?: string    // 태그 모드에서 Badge 색상 (예: 'red', 'green', 'yellow', 'orange', 'purple')
}`}</CodeBlock>
        </Card>
      </Section>

      {/* Usage patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="Single Select (단일 선택)"
            desc="기본 모드입니다. value + onChange로 제어 모드를, defaultValue로 비제어 모드를 사용합니다."
            code={`const [value, setValue] = useState<string>()

<Dropdown
  options={[
    { value: 'info', label: 'INFO' },
    { value: 'warn', label: 'WARN' },
    { value: 'error', label: 'ERROR' },
  ]}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="선택하세요"
/>`}
          >
            <SingleControlledDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Multi Select — count 모드"
            desc="multiSelect=true로 다중 선택을 활성화합니다. 기본 표시는 'N개 선택'입니다."
            code={`const [selected, setSelected] = useState<string[]>([])

<Dropdown
  multiSelect
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="선택하세요"
/>`}
          >
            <MultiCountDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Multi Select — tags 모드"
            desc="multiDisplayMode='tags' 또는 'tags-closable'로 선택값을 Badge 태그로 표시합니다. variant로 색상을 지정할 수 있습니다."
            code={`<Dropdown
  multiSelect
  multiDisplayMode="tags-closable"
  options={coloredOptions}
  value={selected}
  onChange={setSelected}
/>`}
          >
            <MultiTagsDemo />
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
              <Dropdown options={sampleOptions} size={size} placeholder={`${size} 선택`} />
            </Card>
          ))}
        </div>
      </Section>

      {/* multiDisplayMode */}
      <MultiDisplayModeSection />
    </DocPage>
  ),
}
