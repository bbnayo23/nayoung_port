import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Radio from '../../components/Radio'

const meta = {
  title: 'StyleGuide/Radio',
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

type PropRow = { name: string; type: string; defaultVal?: string; required?: boolean; desc: string }

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

const RadioGroupDemo = () => {
  const options = [
    { value: 'low', label: '낮음 (Low)' },
    { value: 'medium', label: '중간 (Medium)' },
    { value: 'high', label: '높음 (High)' },
    { value: 'critical', label: '심각 (Critical)' },
  ]
  const [selected, setSelected] = useState('medium')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          value={opt.value}
          name="demo-severity"
          label={opt.label}
          checked={selected === opt.value}
          onChange={() => setSelected(opt.value)}
        />
      ))}
      <p style={{ margin: '6px 0 0', fontSize: 11, color: t.textSecondary }}>
        선택: <strong>{selected}</strong>
      </p>
    </div>
  )
}

const SizesDemo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {(['sm', 'md', 'lg'] as const).map((size) => (
      <Radio
        key={size}
        value={size}
        name="demo-sizes"
        label={`size="${size}"`}
        checked
        size={size}
        onChange={() => {}}
      />
    ))}
  </div>
)

const VariantsDemo = () => {
  const [sel, setSel] = useState<Record<string, string>>({ default: 'a', primary: 'a' })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {(['default', 'primary'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span
            style={{ fontSize: 11, fontFamily: 'monospace', color: t.textSecondary }}
          >{`variant="${variant}"`}</span>
          <div style={{ display: 'flex', gap: 16 }}>
            {['a', 'b'].map((v) => (
              <Radio
                key={v}
                value={v}
                name={`demo-variant-${variant}`}
                label={`옵션 ${v.toUpperCase()}`}
                checked={sel[variant] === v}
                variant={variant}
                onChange={() => setSel((p) => ({ ...p, [variant]: v }))}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Documentation: Story = {
  render: () => (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Radio</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          단일 선택을 위한 라디오 버튼 컴포넌트입니다. 같은 <InlineCode>name</InlineCode>을 가진 Radio를 그룹으로 묶어
          사용하며, <InlineCode>checked</InlineCode>·<InlineCode>onChange</InlineCode>로 완전 제어(controlled) 방식으로
          동작합니다.
        </p>
        <CodeBlock>{`import Radio from '@port/design-system'`}</CodeBlock>
      </div>

      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'value', type: 'string', required: true, desc: '이 라디오 버튼의 값' },
              {
                name: 'name',
                type: 'string',
                required: true,
                desc: '라디오 그룹 이름 — 같은 name끼리 단일 선택됩니다.',
              },
              { name: 'label', type: 'ReactNode', desc: '라벨 텍스트 또는 노드' },
              { name: 'checked', type: 'boolean', desc: '선택 상태 (controlled)' },
              { name: 'onChange', type: '(e: ChangeEvent<HTMLInputElement>) => void', desc: '변경 이벤트 핸들러' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '비활성화 상태' },
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", desc: '크기' },
              { name: 'variant', type: "'default' | 'primary'", defaultVal: "'default'", desc: '색상 variant' },
              { name: 'id', type: 'string', desc: '커스텀 ID. 미지정 시 name+value 조합으로 자동 생성.' },
            ]}
          />
        </Card>
      </Section>

      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="라디오 그룹"
            desc="같은 name prop을 공유하는 Radio 목록으로 그룹을 구성합니다. 부모 컴포넌트에서 선택 상태를 관리하세요."
            code={`const [selected, setSelected] = useState('medium');

{options.map((opt) => (
  <Radio
    key={opt.value}
    value={opt.value}
    name="severity"
    label={opt.label}
    checked={selected === opt.value}
    onChange={() => setSelected(opt.value)}
  />
))}`}
          >
            <RadioGroupDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="크기 비교"
            desc="size prop으로 sm · md · lg를 선택합니다."
            code={`<Radio size="sm" checked ... />
<Radio size="md" checked ... />
<Radio size="lg" checked ... />`}
          >
            <SizesDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Variant 비교"
            desc="variant='primary'는 브랜드 색상을 적용합니다."
            code={`<Radio variant="default" checked ... />
<Radio variant="primary" checked ... />`}
          >
            <VariantsDemo />
          </Pattern>
        </Card>
      </Section>

      <Section gap={16}>
        <SectionTitle>상태</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Default', checked: false, disabled: false },
            { label: 'Checked', checked: true, disabled: false },
            { label: 'Disabled', checked: false, disabled: true },
            { label: 'Disabled+Checked', checked: true, disabled: true },
          ].map(({ label, checked, disabled }) => (
            <Card key={label}>
              <p style={{ margin: '0 0 8px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>{label}</p>
              <Radio
                value={label}
                name="doc-states"
                label={label}
                checked={checked}
                disabled={disabled}
                onChange={() => {}}
              />
            </Card>
          ))}
        </div>
      </Section>
    </DocPage>
  ),
}
