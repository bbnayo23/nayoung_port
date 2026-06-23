import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Switch } from './Switch'

const meta = {
  title: 'StyleGuide/Switch',
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
  const [basic, setBasic] = useState(false)
  const [notify, setNotify] = useState(true)
  const [marketing, setMarketing] = useState(false)
  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Switch</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          켜짐/꺼짐 두 상태를 토글하는 컨트롤입니다. 시각적으로 숨긴 체크박스 input(role="switch") 위에 트랙과 썸을
          얹어 그리며, 우측 라벨을 옵션으로 받습니다. sm · md · lg 세 가지 크기를 지원하고 checked · hover · focus ·
          disabled 상태는 모두 CSS selector 로 처리됩니다.
        </p>
        <CodeBlock>{`import { Switch } from '@nayoung-port/design-system/components/Switch'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — Switch</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'switchSize',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '스위치 크기. 트랙/썸의 픽셀 치수를 결정한다 (sm 28×16 · md 40×22 · lg 44×24).',
              },
              {
                name: 'label',
                type: 'ReactNode',
                desc: '트랙 우측에 표시할 라벨. null/undefined 면 라벨 span 자체를 렌더하지 않는다.',
              },
              {
                name: 'checked',
                type: 'boolean',
                desc: '제어 컴포넌트로 쓸 때의 켜짐 상태. onChange 와 함께 사용한다. (input 속성)',
              },
              {
                name: 'defaultChecked',
                type: 'boolean',
                desc: '비제어 컴포넌트의 초기 켜짐 상태. (input 속성)',
              },
              {
                name: 'onChange',
                type: '(e: ChangeEvent<HTMLInputElement>) => void',
                desc: '토글 시 호출. e.target.checked 로 현재 상태를 읽는다. (input 속성)',
              },
              {
                name: 'disabled',
                type: 'boolean',
                desc: '비활성화. 래퍼 opacity 0.5 + cursor not-allowed, 숨은 input 도 함께 disabled 된다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 <label> 에 cx 로 병합되는 추가 클래스.',
              },
              {
                name: '...rest',
                type: "Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>",
                desc: '숨은 <input type="checkbox"> 로 전달되는 나머지 속성 (name, value, onBlur, aria-* 등). size 는 제외된다.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Basic — 제어 / 비제어</SectionTitle>
        <CodeBlock>{`// 제어 (controlled)
const [checked, setChecked] = useState(false)
<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />

// 비제어 (uncontrolled)
<Switch defaultChecked />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>controlled</InlineCode>
              <Switch checked={basic} onChange={(e) => setBasic(e.target.checked)} />
              <span style={{ fontSize: 11, color: t.textMuted }}>현재: {basic ? 'on' : 'off'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>uncontrolled · defaultChecked</InlineCode>
              <Switch defaultChecked />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Size</SectionTitle>
        <CodeBlock>{`<Switch switchSize="sm" label="Small" defaultChecked />
<Switch switchSize="md" label="Medium" defaultChecked />
<Switch switchSize="lg" label="Large" defaultChecked />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <InlineCode>{`switchSize="${s}"`}</InlineCode>
                <Switch switchSize={s} label={s} defaultChecked />
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Label</SectionTitle>
        <CodeBlock>{`<Switch label="알림 수신" defaultChecked />
<Switch />  // label 없으면 트랙만 렌더`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>label 있음</InlineCode>
              <Switch label="알림 수신" defaultChecked />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>label 없음</InlineCode>
              <Switch defaultChecked />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>ReactNode label</InlineCode>
              <Switch
                defaultChecked
                label={
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    실시간 동기화
                    <span style={{ fontSize: 10, color: t.info, fontWeight: 600 }}>BETA</span>
                  </span>
                }
              />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>State — checked / unchecked</SectionTitle>
        <CodeBlock>{`<Switch label="꺼짐" />
<Switch label="켜짐" defaultChecked />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <Switch label="꺼짐 (unchecked)" />
            <Switch label="켜짐 (checked)" defaultChecked />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>State — hover / focus</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          hover · focus 상태는 CSS selector 로만 처리됩니다. 아래 스위치에 마우스를 올리거나 Tab 으로 포커스하면 트랙
          색과 포커스 링 변화를 확인할 수 있습니다. (off hover → borderStrong, on hover → brand[700], focus-visible →
          brand 포커스 링)
        </p>
        <DocCard>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <Switch label="hover/focus 해보기 (off)" />
            <Switch label="hover/focus 해보기 (on)" defaultChecked />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>State — disabled</SectionTitle>
        <CodeBlock>{`<Switch label="Off" disabled />
<Switch label="On" disabled defaultChecked />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <Switch label="비활성 · 꺼짐" disabled />
            <Switch label="비활성 · 켜짐" disabled defaultChecked />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>실전 예시 — 설정 목록</SectionTitle>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
            {[
              { key: 'notify', title: '푸시 알림', desc: '새 보안 이벤트 발생 시 알림', on: notify, set: setNotify },
              {
                key: 'marketing',
                title: '마케팅 수신',
                desc: '제품 업데이트 및 프로모션 메일',
                on: marketing,
                set: setMarketing,
              },
            ].map((row) => (
              <div
                key={row.key}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{row.title}</span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>{row.desc}</span>
                </div>
                <Switch checked={row.on} onChange={(e) => row.set(e.target.checked)} />
              </div>
            ))}
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, opacity: 0.7 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>2단계 인증</span>
                <span style={{ fontSize: 11, color: t.textMuted }}>관리자 정책으로 잠김</span>
              </div>
              <Switch disabled defaultChecked />
            </div>
          </div>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
