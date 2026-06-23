import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { FormField } from './FormField'

const meta = {
  title: 'StyleGuide/FormField',
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
  danger: vars.color.danger,
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

const inputStyle: CSSProperties = {
  width: '100%',
  height: 32,
  boxSizing: 'border-box',
  padding: '0 10px',
  fontSize: 13,
  color: t.text,
  background: t.surface,
  border: `1px solid ${t.border}`,
  borderRadius: t.radiusSm,
  outline: 'none',
}

const DemoInput = ({ placeholder, invalid }: { placeholder: string; invalid?: boolean }) => (
  <input
    placeholder={placeholder}
    style={invalid ? { ...inputStyle, borderColor: t.danger } : inputStyle}
  />
)

const DocumentationView = () => {
  const [email, setEmail] = useState('')
  const emailError = email.length > 0 && !email.includes('@') ? '올바른 이메일 주소를 입력해주세요.' : undefined

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>FormField</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          폼 입력 요소를 감싸는 레이아웃 래퍼 컴포넌트입니다. 레이블 · 필수 표시(*) · 에러 메시지 · 도움말 텍스트를
          통합 관리하며, horizontal(레이블 좌측 정렬) 과 vertical(레이블 상단 적층) 두 가지 배치 방향을 지원합니다.
        </p>
        <CodeBlock>{`import { FormField } from '@nayoung-port/design-system/components/FormField'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — FormField</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                desc: '래핑할 입력 요소(input · select · textarea 등). content 영역에 렌더된다. (필수)',
              },
              {
                name: 'label',
                type: 'ReactNode',
                desc: '필드 레이블. 생략하면 레이블 영역 자체가 렌더되지 않는다.',
              },
              {
                name: 'required',
                type: 'boolean',
                desc: '필수 항목 표시. true 면 레이블 뒤에 danger 색 별표(*)를 붙인다.',
              },
              {
                name: 'error',
                type: 'string',
                desc: '에러 메시지. 지정되면 입력 하단에 danger 색으로 표시되며 helpText 보다 우선한다.',
              },
              {
                name: 'helpText',
                type: 'string',
                desc: '도움말 텍스트. 입력 하단에 muted 색으로 표시된다. error 가 있으면 숨겨진다.',
              },
              {
                name: 'direction',
                type: "'horizontal' | 'vertical'",
                defaultVal: "'horizontal'",
                desc: '레이블과 입력 필드의 배치 방향. horizontal 은 좌우, vertical 은 상하로 적층한다.',
              },
              {
                name: 'labelWidth',
                type: 'number',
                defaultVal: '140',
                desc: 'horizontal 방향일 때 레이블 너비(px). vertical 방향에서는 무시된다.',
              },
              {
                name: 'htmlFor',
                type: 'string',
                desc: '레이블의 htmlFor 속성. 입력 요소의 id 와 연결해 접근성을 확보한다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 div 에 병합되는 추가 클래스',
              },
              {
                name: 'labelClassName',
                type: 'string',
                desc: 'label 요소에 병합되는 추가 클래스',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Direction — horizontal (기본)</SectionTitle>
        <CodeBlock>{`<FormField label="사용자명" htmlFor="username">
  <input id="username" placeholder="사용자명을 입력하세요" />
</FormField>`}</CodeBlock>
        <DocCard>
          <FormField label="사용자명" htmlFor="doc-username">
            <DemoInput placeholder="사용자명을 입력하세요" />
          </FormField>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Direction — vertical</SectionTitle>
        <CodeBlock>{`<FormField direction="vertical" label="이메일" htmlFor="email">
  <input id="email" placeholder="이메일을 입력하세요" />
</FormField>`}</CodeBlock>
        <DocCard>
          <div style={{ maxWidth: 360 }}>
            <FormField direction="vertical" label="이메일" htmlFor="doc-email-v">
              <DemoInput placeholder="이메일을 입력하세요" />
            </FormField>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>labelWidth — 레이블 너비 조정 (horizontal)</SectionTitle>
        <CodeBlock>{`<FormField label="짧게" labelWidth={80}>...</FormField>
<FormField label="기본 너비" labelWidth={140}>...</FormField>
<FormField label="넓게 정렬" labelWidth={200}>...</FormField>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {([80, 140, 200] as const).map((w) => (
              <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <InlineCode>{`labelWidth={${w}}`}</InlineCode>
                <FormField label="레이블" labelWidth={w}>
                  <DemoInput placeholder={`너비 ${w}px`} />
                </FormField>
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>State — required (필수 표시)</SectionTitle>
        <CodeBlock>{`<FormField label="비밀번호" required>
  <input type="password" placeholder="..." />
</FormField>`}</CodeBlock>
        <DocCard>
          <FormField label="비밀번호" required htmlFor="doc-pw">
            <DemoInput placeholder="반드시 입력해야 합니다" />
          </FormField>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>State — helpText (도움말)</SectionTitle>
        <CodeBlock>{`<FormField label="비밀번호" helpText="8자 이상, 영문·숫자·특수문자를 포함해야 합니다.">
  <input type="password" placeholder="..." />
</FormField>`}</CodeBlock>
        <DocCard>
          <FormField
            label="비밀번호"
            helpText="8자 이상, 영문·숫자·특수문자를 포함해야 합니다."
            htmlFor="doc-pw-help"
          >
            <DemoInput placeholder="비밀번호를 입력하세요" />
          </FormField>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>State — error (에러 메시지)</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>error</InlineCode> 가 지정되면 <InlineCode>helpText</InlineCode> 는 숨겨지고 danger 색 에러
          메시지가 우선 표시됩니다.
        </p>
        <CodeBlock>{`<FormField label="이메일" required error="올바른 이메일 주소를 입력해주세요." htmlFor="email">
  <input id="email" style={{ borderColor: 'var(--danger)' }} />
</FormField>`}</CodeBlock>
        <DocCard>
          <FormField
            label="이메일"
            required
            error="올바른 이메일 주소를 입력해주세요."
            helpText="이 도움말은 error 가 있을 때 숨겨집니다."
            htmlFor="doc-email-err"
          >
            <DemoInput placeholder="이메일을 입력하세요" invalid />
          </FormField>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>State — no label (레이블 생략)</SectionTitle>
        <CodeBlock>{`<FormField>
  <input placeholder="레이블 없는 필드" />
</FormField>`}</CodeBlock>
        <DocCard>
          <div style={{ maxWidth: 360 }}>
            <FormField>
              <DemoInput placeholder="레이블 없는 필드" />
            </FormField>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Interactive — 실시간 검증 예시</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          입력값에 따라 <InlineCode>error</InlineCode> 를 동적으로 전달하면 검증 메시지가 실시간으로 토글됩니다.
        </p>
        <DocCard>
          <div style={{ maxWidth: 420 }}>
            <FormField label="이메일" required error={emailError} htmlFor="doc-email-live">
              <input
                id="doc-email-live"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@ 를 포함해 입력해보세요"
                style={emailError ? { ...inputStyle, borderColor: t.danger } : inputStyle}
              />
            </FormField>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Composition — 폼 레이아웃 예시</SectionTitle>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 520 }}>
            <FormField label="이름" required labelWidth={120} htmlFor="form-name">
              <DemoInput placeholder="홍길동" />
            </FormField>
            <FormField label="이메일" required labelWidth={120} htmlFor="form-email">
              <DemoInput placeholder="user@example.com" />
            </FormField>
            <FormField
              label="비밀번호"
              required
              labelWidth={120}
              helpText="8자 이상 입력하세요."
              htmlFor="form-pw"
            >
              <DemoInput placeholder="••••••••" />
            </FormField>
            <FormField label="소개" labelWidth={120} htmlFor="form-bio">
              <DemoInput placeholder="(선택) 자기소개" />
            </FormField>
          </div>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
