import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Input from '../../components/Input'

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

const ClearButtonDemo = () => {
  const [value, setValue] = useState('지울 수 있는 텍스트')
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      showClearButton={value.length > 0}
      onClear={() => setValue('')}
      placeholder="입력 후 X 버튼으로 지우기"
    />
  )
}

const ValidationDemo = () => {
  const [email, setEmail] = useState('')
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const variant = email.length === 0 ? 'default' : isValid ? 'success' : 'error'
  const helperText =
    email.length === 0 ? undefined : isValid ? '유효한 이메일 주소입니다.' : '올바른 이메일 형식으로 입력하세요.'
  return (
    <Input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="이메일 주소"
      variant={variant}
      helperText={helperText}
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
          텍스트 입력 컴포넌트입니다. 5가지 <InlineCode>variant</InlineCode>, 3가지 <InlineCode>size</InlineCode>,
          접두/접미 아이콘(<InlineCode>prefixIcon</InlineCode> · <InlineCode>suffixIcon</InlineCode>), 클리어 버튼,
          도움말 텍스트를 지원합니다.
        </p>
        <CodeBlock>{`import Input from "@port/design-system"`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'variant',
                type: "'default' | 'ghost' | 'error' | 'success' | 'warning'",
                defaultVal: "'default'",
                desc: '시각적 상태 변형 — 테두리 색상과 helperText 색상에 반영됨',
              },
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", desc: '입력 필드 높이 및 폰트 크기' },
              {
                name: 'fullWidth',
                type: 'boolean',
                defaultVal: 'true',
                desc: '컨테이너 너비 100% 사용. false이면 내용에 맞춤',
              },
              { name: 'prefixIcon', type: 'ReactNode', desc: '입력 왼쪽에 표시할 요소 (아이콘, 텍스트 등)' },
              {
                name: 'suffixIcon',
                type: 'ReactNode',
                desc: '입력 오른쪽에 표시할 요소. 지정 시 showClearButton 무시',
              },
              {
                name: 'showClearButton',
                type: 'boolean',
                defaultVal: 'false',
                desc: '클리어(×) 버튼 표시 여부. suffixIcon이 있으면 무시됨',
              },
              { name: 'onClear', type: '() => void', desc: '클리어 버튼 클릭 콜백. showClearButton이 true일 때 필수' },
              { name: 'helperText', type: 'string', desc: '입력 하단 도움말/오류 텍스트. variant 색상으로 표시됨' },
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
            desc="value + onChange로 controlled 방식으로 사용합니다."
            code={`const [value, setValue] = useState("");

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="텍스트를 입력하세요"
/>`}
          >
            <Input placeholder="텍스트를 입력하세요" />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="클리어 버튼"
            desc="showClearButton과 onClear를 함께 사용합니다. 입력값이 있을 때만 버튼을 표시하는 패턴이 권장됩니다."
            code={`const [value, setValue] = useState("");

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  showClearButton={value.length > 0}
  onClear={() => setValue("")}
  placeholder="입력 후 X 버튼으로 지우기"
/>`}
          >
            <ClearButtonDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="실시간 유효성 검사"
            desc="입력 상태에 따라 variant를 동적으로 전환하고 helperText로 피드백을 제공합니다."
            code={`const isValid = /^[^@]+@[^@]+\.[^@]+$/.test(email);
const variant = email ? (isValid ? "success" : "error") : "default";

<Input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  variant={variant}
  helperText={isValid ? "유효한 주소입니다." : "형식을 확인하세요."}
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
            {(['default', 'ghost', 'error', 'success', 'warning'] as const).map((v) => (
              <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>{`variant="${v}"`}</span>
                <Input variant={v} placeholder={v} helperText={`${v} 상태입니다`} />
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
                <Input size={s} placeholder={`size="${s}"`} />
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
