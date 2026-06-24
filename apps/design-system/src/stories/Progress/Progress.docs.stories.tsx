import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Progress from '../../components/Progress'

const meta = {
  title: 'StyleGuide/Progress',
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

const BasicDemo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <Progress value={30} color="info" />
    <Progress value={60} color="warning" />
    <Progress value={90} color="success" />
  </div>
)

const StackDemo = () => (
  <Progress.Stack>
    <Progress.Item value={40} color="success" />
    <Progress.Item value={25} color="warning" />
    <Progress.Item value={15} color="danger" />
  </Progress.Stack>
)

const InteractiveDemo = () => {
  const [value, setValue] = useState(45)
  const [done, setDone] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Progress value={value} color={value === 100 ? 'success' : 'info'} onComplete={() => setDone(true)} />
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value))
          if (Number(e.target.value) < 100) setDone(false)
        }}
      />
      {done && <span style={{ fontSize: 11, color: vars.color.success }}>onComplete 호출됨</span>}
    </div>
  )
}

export const Documentation: Story = {
  render: () => (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Progress</h1>
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
            COMPOUND
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          진행률을 시각화하는 바 컴포넌트입니다. <InlineCode>Progress</InlineCode> 단독 사용과{' '}
          <InlineCode>Progress.Stack</InlineCode> + <InlineCode>Progress.Item</InlineCode> 컴파운드 패턴으로 다중 구간을
          표현할 수 있습니다.
        </p>
        <CodeBlock>{`import Progress from '@port/design-system'`}</CodeBlock>
      </div>

      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            PROGRESS
          </p>
          <PropsTable
            rows={[
              { name: 'value', type: 'number', required: true, desc: '0~100 사이의 진행 값' },
              {
                name: 'color',
                type: 'UIColorType',
                defaultVal: "'success'",
                desc: "색상 — 'success' | 'danger' | 'warning' | 'info'",
              },
              {
                name: 'shape',
                type: "'linear' | 'linear-round'",
                defaultVal: "'linear-round'",
                desc: '바 형태 (모서리 처리)',
              },
              { name: 'shadow', type: 'boolean', defaultVal: 'true', desc: '배경 그림자(트랙) 표시 여부' },
              {
                name: 'transition',
                type: 'boolean | { duration?, easing? }',
                defaultVal: 'true',
                desc: '애니메이션 설정. false=없음 / true=기본(0.4s ease) / 객체=커스텀',
              },
              { name: 'onComplete', type: '() => void', desc: 'value가 100이 되면 호출되는 콜백' },
              { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            PROGRESS.STACK
          </p>
          <PropsTable
            rows={[
              {
                name: 'shape',
                type: "'linear' | 'linear-round'",
                defaultVal: "'linear-round'",
                desc: 'Stack 전체 형태',
              },
              { name: 'shadow', type: 'boolean', defaultVal: 'true', desc: '배경 트랙 표시 여부' },
              { name: 'children', type: 'ReactNode', required: true, desc: 'Progress.Item 목록' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            PROGRESS.ITEM
          </p>
          <PropsTable
            rows={[
              {
                name: 'value',
                type: 'number',
                required: true,
                desc: '이 구간의 너비 (0~100). 전체 합이 100 초과 시 넘치는 구간은 숨겨집니다.',
              },
              { name: 'color', type: 'UIColorType', defaultVal: "'success'", desc: '이 구간의 색상' },
              {
                name: 'transition',
                type: 'boolean | { duration?, easing? }',
                defaultVal: 'true',
                desc: '구간 개별 애니메이션 설정',
              },
            ]}
          />
        </Card>
      </Section>

      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="색상별 단일 바"
            desc="color prop으로 상태를 시각화합니다. 낮음=info, 경고=warning, 완료=success 패턴을 권장합니다."
            code={`<Progress value={30} color="info" />
<Progress value={60} color="warning" />
<Progress value={90} color="success" />`}
          >
            <BasicDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Stack — 다중 구간"
            desc="Progress.Stack 안에 Progress.Item을 배치합니다. 각 Item의 value 합이 100을 넘으면 초과분은 표시되지 않습니다."
            code={`<Progress.Stack>
  <Progress.Item value={40} color="success" />
  <Progress.Item value={25} color="warning" />
  <Progress.Item value={15} color="danger" />
</Progress.Stack>`}
          >
            <StackDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="onComplete 콜백"
            desc="value가 100이 되는 순간 onComplete가 호출됩니다. 슬라이더를 100으로 드래그해 보세요."
            code={`<Progress
  value={value}
  onComplete={() => toast('완료!')}
/>`}
          >
            <InteractiveDemo />
          </Pattern>
        </Card>
      </Section>

      <Section gap={16}>
        <SectionTitle>형태 비교</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {(['linear', 'linear-round'] as const).map((shape) => (
            <Card key={shape}>
              <p
                style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}
              >{`shape="${shape}"`}</p>
              <Progress value={65} shape={shape} />
            </Card>
          ))}
        </div>
      </Section>
    </DocPage>
  ),
}
