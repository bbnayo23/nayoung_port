import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { RelativeTimeInput } from './RelativeTimeInput'

const meta = {
  title: 'StyleGuide/RelativeTimeInput',
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
  success: vars.color.success,
  danger: vars.color.danger,
  info: vars.color.info,
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

const DocumentationView = () => {
  const [value, setValue] = useState('1h')
  const isValid = /^\d+[smhd]$/.test(value)

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>RelativeTimeInput</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          상대 시간 문자열(예: <InlineCode>1h</InlineCode> · <InlineCode>30m</InlineCode>)을 입력받는 작고 고정폭의
          텍스트 필드입니다. <InlineCode>isValid</InlineCode> 가 <InlineCode>false</InlineCode> 이면 error 테두리를
          표시하며, 입력 길이는 <InlineCode>maxLength=6</InlineCode> 으로 고정되어 있습니다. monospace · 가운데 정렬 ·
          폭 80px 의 단일 input 으로 렌더됩니다.
        </p>
        <CodeBlock>{`import { RelativeTimeInput } from '@nayoung-port/design-system/components/RelativeTimeInput'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — RelativeTimeInput</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'value',
                type: 'string',
                defaultVal: "''",
                desc: '현재 입력 값(controlled). 미지정 시 빈 문자열로 렌더된다.',
              },
              {
                name: 'onChange',
                type: '(value: string) => void',
                desc: '입력이 바뀔 때 변경된 문자열 값을 그대로 전달한다. native event 가 아닌 string 을 받는다.',
              },
              {
                name: 'onBlur',
                type: '() => void',
                desc: '필드에서 포커스가 빠질 때 호출된다(인자 없음). 입력값 검증/포맷 정규화 시점으로 사용한다.',
              },
              {
                name: 'isValid',
                type: 'boolean',
                desc: 'false 일 때만 invalid 스타일(danger 테두리 + danger 포커스 링)을 적용한다. undefined/true 는 기본 스타일.',
              },
              {
                name: 'placeholder',
                type: 'string',
                desc: '빈 입력 시 표시되는 안내 문구. 예) "1h"',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 input 에 병합되는 추가 클래스',
              },
              {
                name: '...rest',
                type: "Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>",
                desc: 'input 에 전달되는 나머지 HTML 속성(disabled, name, aria-* 등). value/onChange 는 위 시그니처로 대체되어 제외된다.',
              },
            ]}
          />
        </DocCard>
        <p style={{ margin: 0, fontSize: 12, color: t.textMuted, lineHeight: 1.7 }}>
          참고 — <InlineCode>type="text"</InlineCode> 와 <InlineCode>maxLength=6</InlineCode> 은 컴포넌트 내부에서
          고정값으로 설정되어 있어 prop 으로 노출되지 않습니다.
        </p>
      </Section>

      <Section>
        <SectionTitle>기본 사용</SectionTitle>
        <CodeBlock>{`<RelativeTimeInput placeholder="1h" />
<RelativeTimeInput value="30m" />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>placeholder</InlineCode>
              <RelativeTimeInput placeholder="1h" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>value="30m"</InlineCode>
              <RelativeTimeInput value="30m" />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>상태 — valid · invalid · disabled</SectionTitle>
        <CodeBlock>{`<RelativeTimeInput value="1h" isValid />
<RelativeTimeInput value="abc" isValid={false} />
<RelativeTimeInput value="1h" disabled />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>기본 (valid)</InlineCode>
              <RelativeTimeInput value="1h" isValid />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>{'isValid={false}'}</InlineCode>
              <RelativeTimeInput value="abc" isValid={false} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>disabled</InlineCode>
              <RelativeTimeInput value="1h" disabled />
            </div>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 12, color: t.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: t.danger }}>invalid</strong> 은 danger 테두리, <strong>disabled</strong> 는 opacity
            0.5 + not-allowed 커서로 표현됩니다. <strong style={{ color: t.primary }}>focus</strong> 상태(brand 테두리 +
            포커스 링)는 아래 필드를 클릭해 직접 확인하세요.
          </p>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>인터랙션 — controlled + 검증</SectionTitle>
        <CodeBlock>{`const [value, setValue] = useState('1h')
const isValid = /^\\d+[smhd]$/.test(value)

<RelativeTimeInput
  value={value}
  onChange={setValue}
  isValid={isValid}
  placeholder="1h"
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
            <RelativeTimeInput value={value} onChange={setValue} isValid={isValid} placeholder="1h" />
            <span style={{ fontSize: 12, color: isValid ? t.success : t.danger }}>
              {value.length === 0 ? '입력 없음' : isValid ? '유효한 값' : '유효하지 않음 (예: 1h, 30m, 45s, 2d)'}
            </span>
          </div>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
