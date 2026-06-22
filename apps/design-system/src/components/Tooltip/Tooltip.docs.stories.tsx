import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'StyleGuide/Tooltip',
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
  borderHover: vars.color.borderStrong,
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

const TriggerBox = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      padding: '8px 16px',
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: t.radiusSm,
      fontSize: 13,
      color: t.text,
      cursor: 'default',
      userSelect: 'none',
      display: 'inline-block',
    }}
  >
    {children}
  </div>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Tooltip</h1>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.primary,
              background: 'rgba(113,135,255,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            PORTAL
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          Portal 기반의 툴팁 컴포넌트입니다. <InlineCode>top · right · bottom · left</InlineCode> 4방향{' '}
          <InlineCode>placement</InlineCode>와 hover/focus 트리거, Escape 키 닫기를 지원합니다.
          <InlineCode>position: fixed</InlineCode> 로 배치돼 <InlineCode>overflow:hidden</InlineCode> 부모에서도
          잘리지 않습니다.
        </p>
        <CodeBlock>{`import { Tooltip } from '@ds/components/Tooltip'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'content', type: 'ReactNode', desc: '툴팁에 표시할 내용 (필수)' },
              {
                name: 'children',
                type: 'ReactElement',
                desc: '툴팁 트리거가 될 단일 엘리먼트 (필수). inline-flex 래퍼로 감싸 mouse/focus 핸들러를 부착합니다.',
              },
              {
                name: 'placement',
                type: "'top' | 'right' | 'bottom' | 'left'",
                defaultVal: "'top'",
                desc: '툴팁 표시 위치. 4방향을 지원합니다.',
              },
              {
                name: 'delay',
                type: 'number',
                defaultVal: '200',
                desc: '마우스 진입 후 툴팁이 표시되기까지의 지연 시간(ms).',
              },
            ]}
          />
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>기본 사용법</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>content</InlineCode>와 <InlineCode>children</InlineCode>만으로 동작합니다. 마우스를 올리면
            200ms 후 표시됩니다.
          </p>
          <CodeBlock>{`<Tooltip content="툴팁 내용입니다" placement="top">
  <button>마우스를 올려보세요</button>
</Tooltip>`}</CodeBlock>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
            <Tooltip content="툴팁 내용입니다" placement="top">
              <TriggerBox>마우스를 올려보세요</TriggerBox>
            </Tooltip>
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>ReactNode content</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>content</InlineCode>에 ReactNode를 전달해 리치 컨텐츠를 구성할 수 있습니다.
          </p>
          <CodeBlock>{`<Tooltip
  content={
    <div>
      <strong style={{ display: 'block', marginBottom: 4 }}>제목</strong>
      <span>상세 내용을 입력합니다.</span>
    </div>
  }
  placement="top"
>
  <button>리치 툴팁</button>
</Tooltip>`}</CodeBlock>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
            <Tooltip
              content={
                <div>
                  <strong style={{ display: 'block', marginBottom: 4 }}>위협 탐지 엔진</strong>
                  <span style={{ fontSize: 11 }}>실시간으로 이상 트래픽을 분석합니다.</span>
                </div>
              }
              placement="top"
            >
              <TriggerBox>리치 툴팁</TriggerBox>
            </Tooltip>
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>지연 시간 커스터마이즈</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>delay</InlineCode> prop으로 툴팁이 나타나기까지의 지연을 조절합니다. 기본값은 200ms입니다.
          </p>
          <CodeBlock>{`{/* 즉시 표시 */}
<Tooltip content="즉시 표시됩니다" delay={0} placement="top">
  <button>delay=0</button>
</Tooltip>

{/* 긴 지연 */}
<Tooltip content="1초 뒤에 표시됩니다" delay={1000} placement="top">
  <button>delay=1000</button>
</Tooltip>`}</CodeBlock>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 24, padding: '32px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Tooltip content="즉시 표시됩니다" delay={0} placement="top">
                <TriggerBox>delay=0</TriggerBox>
              </Tooltip>
              <span style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>delay=0</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Tooltip content="200ms 뒤에 표시됩니다" delay={200} placement="top">
                <TriggerBox>delay=200 (기본)</TriggerBox>
              </Tooltip>
              <span style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>delay=200 (default)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Tooltip content="1초 뒤에 표시됩니다" delay={1000} placement="top">
                <TriggerBox>delay=1000</TriggerBox>
              </Tooltip>
              <span style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>delay=1000</span>
            </div>
          </div>
        </Card>
      </Section>

      {/* Placement */}
      <Section gap={16}>
        <SectionTitle>Placement</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary }}>
            <InlineCode>top · right · bottom · left</InlineCode> 4방향을 지원합니다. 마우스를 올려 위치를 확인하세요.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {(['top', 'right', 'bottom', 'left'] as const).map((p) => (
              <div
                key={p}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 0' }}
              >
                <Tooltip content={`placement="${p}"`} placement={p}>
                  <TriggerBox>{p}</TriggerBox>
                </Tooltip>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Accessibility */}
      <Section gap={16}>
        <SectionTitle>접근성</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.7 }}>
            툴팁은 <InlineCode>role="tooltip"</InlineCode> + 고유 id를 부여받고, 트리거 래퍼에{' '}
            <InlineCode>aria-describedby</InlineCode>로 연결됩니다.
          </p>
          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontSize: 13,
              color: t.textSecondary,
              lineHeight: 1.6,
            }}
          >
            <li>
              <strong style={{ color: t.text }}>hover / focus</strong> — 툴팁 표시 (delay 적용)
            </li>
            <li>
              <strong style={{ color: t.text }}>mouseleave / blur</strong> — 즉시 숨김
            </li>
            <li>
              <strong style={{ color: t.text }}>Escape 키</strong> — 열린 툴팁 즉시 닫기
            </li>
            <li>
              <strong style={{ color: t.text }}>Portal (position: fixed)</strong> — overflow:hidden 부모에서도 잘리지
              않음
            </li>
          </ul>
        </Card>
      </Section>
    </DocPage>
  ),
}
