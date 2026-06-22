import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Input } from './Input'

const meta = {
  title: 'StyleGuide/Input',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Design tokens ─────────────────────────────────────────────────────────────

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
      fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace",
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

// ── Demos ─────────────────────────────────────────────────────────────────────

const SlotDemo = () => {
  const [value, setValue] = useState('')
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      leftSlot={<span style={{ fontSize: 14 }}>🔍</span>}
      placeholder="검색어를 입력하세요"
      fullWidth
    />
  )
}

const ValidationDemo = () => {
  const [email, setEmail] = useState('')
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const invalid = email.length > 0 && !isValid
  const errorText = invalid ? '올바른 이메일 형식으로 입력하세요.' : undefined
  const helperText = !invalid && email.length > 0 ? '유효한 이메일 주소입니다.' : undefined
  return (
    <Input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="이메일 주소"
      invalid={invalid}
      errorText={errorText}
      helperText={helperText}
      fullWidth
    />
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Input</h1>
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
            PRIMITIVE
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          텍스트 입력 컴포넌트입니다. 2가지 <InlineCode>variant</InlineCode>, 3가지 <InlineCode>size</InlineCode>,
          좌·우 슬롯(<InlineCode>leftSlot</InlineCode> · <InlineCode>rightSlot</InlineCode>), 라벨,
          보조 텍스트 및 에러 메시지를 지원합니다.
        </p>
        <CodeBlock>{`import { Input } from '@nayoung-port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'variant',
                type: "'outline' | 'filled'",
                defaultVal: "'outline'",
                desc: '시각적 스타일 — outline은 테두리 표시, filled는 배경색으로 경계 표현',
              },
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", desc: '입력 필드 높이 및 폰트 크기' },
              {
                name: 'label',
                type: 'ReactNode',
                desc: '필드 위에 노출되는 라벨. htmlFor로 input과 자동 연결됨',
              },
              {
                name: 'helperText',
                type: 'ReactNode',
                desc: '필드 아래 보조 설명 텍스트. errorText가 없을 때 표시됨',
              },
              {
                name: 'errorText',
                type: 'ReactNode',
                desc: '에러 메시지 — 존재하면 invalid 상태로 동작하며 helperText보다 우선함',
              },
              {
                name: 'invalid',
                type: 'boolean',
                defaultVal: 'false',
                desc: '에러(유효성 실패) 상태 강제 지정. aria-invalid 처리 포함',
              },
              { name: 'leftSlot', type: 'ReactNode', desc: 'input 앞(왼쪽) 슬롯 — 아이콘, 접두어 텍스트 등' },
              { name: 'rightSlot', type: 'ReactNode', desc: 'input 뒤(오른쪽) 슬롯 — 아이콘, 버튼 등' },
              {
                name: 'fullWidth',
                type: 'boolean',
                defaultVal: 'false',
                desc: '부모 폭을 가득 채움. false이면 inline-flex로 내용에 맞춤',
              },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '비활성화 상태' },
              { name: 'placeholder', type: 'string', desc: '플레이스홀더 텍스트' },
            ]}
          />
        </Card>
        <Card style={{ background: t.surfaceHover }}>
          <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.7 }}>
            <strong style={{ color: t.text }}>HTML input 속성 상속:</strong> <InlineCode>value</InlineCode>,{' '}
            <InlineCode>onChange</InlineCode>, <InlineCode>type</InlineCode>, <InlineCode>readOnly</InlineCode>,{' '}
            <InlineCode>maxLength</InlineCode> 등 표준 <InlineCode>InputHTMLAttributes</InlineCode> 속성을 모두 전달할
            수 있습니다. 단, HTML <InlineCode>size</InlineCode> 속성은 컴포넌트의 <InlineCode>size</InlineCode> prop이
            우선합니다.
          </p>
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 제어 입력"
            desc="value + onChange로 controlled 방식으로 사용합니다. label로 접근성 있는 레이블을 추가할 수 있습니다."
            code={`const [value, setValue] = useState("")

<Input
  label="이름"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="텍스트를 입력하세요"
  fullWidth
/>`}
          >
            <Input label="이름" placeholder="텍스트를 입력하세요" fullWidth />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="leftSlot / rightSlot 슬롯"
            desc="leftSlot과 rightSlot으로 input 내부 좌·우에 아이콘 등 임의 노드를 배치할 수 있습니다."
            code={`const [value, setValue] = useState("")

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  leftSlot={<span>🔍</span>}
  placeholder="검색어를 입력하세요"
  fullWidth
/>`}
          >
            <SlotDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="실시간 유효성 검사"
            desc="invalid + errorText로 에러 상태를 제어합니다. errorText가 있으면 helperText 대신 에러 메시지가 표시됩니다."
            code={`const invalid = email.length > 0 && !isValid
const errorText = invalid
  ? "올바른 이메일 형식으로 입력하세요."
  : undefined

<Input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  invalid={invalid}
  errorText={errorText}
  helperText="유효한 이메일 주소입니다."
  fullWidth
/>`}
          >
            <ValidationDemo />
          </Pattern>
        </Card>
      </Section>

      {/* Variant showcase */}
      <Section gap={16}>
        <SectionTitle>Variant</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 340 }}>
            {(['outline', 'filled'] as const).map((v) => (
              <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>{`variant="${v}"`}</span>
                <Input variant={v} placeholder={v} helperText={`${v} 스타일입니다`} fullWidth />
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Size showcase */}
      <Section gap={16}>
        <SectionTitle>Size</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 340 }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>{`size="${s}"`}</span>
                <Input size={s} placeholder={`size="${s}"`} fullWidth />
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* States */}
      <Section gap={16}>
        <SectionTitle>States</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 340 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>기본</span>
              <Input placeholder="기본 입력" fullWidth />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>helperText</span>
              <Input placeholder="보조 텍스트" helperText="입력 필드 아래 보조 설명입니다." fullWidth />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>invalid + errorText</span>
              <Input
                placeholder="에러 상태"
                invalid
                errorText="필수 항목입니다."
                fullWidth
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>disabled</span>
              <Input placeholder="비활성화 상태" disabled fullWidth />
            </div>
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
