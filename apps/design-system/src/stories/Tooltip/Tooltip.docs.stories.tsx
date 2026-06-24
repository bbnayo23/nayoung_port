import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import { Tooltip } from '../../components/Tooltip'

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
              background: 'rgba(0,183,153,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            POPPER
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          <InlineCode>react-popper</InlineCode> 기반의 툴팁 컴포넌트입니다. 8방향 <InlineCode>placement</InlineCode>와
          controlled 모드, portal 렌더링을 지원합니다.
        </p>
        <CodeBlock>{`import { Tooltip } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'content', type: 'ReactNode', desc: '툴팁에 표시할 내용 (필수)' },
              { name: 'children', type: 'ReactNode', desc: '툴팁 트리거가 될 요소 (필수)' },
              {
                name: 'placement',
                type: 'Placement',
                defaultVal: "'top'",
                desc: '툴팁 위치 — top · bottom · left · right 및 -start · -end 변형 포함 (총 12방향)',
              },
              { name: 'open', type: 'boolean', desc: 'Controlled 모드 — 툴팁 표시 여부를 외부에서 제어합니다.' },
              { name: 'onOpen', type: '() => void', desc: 'Controlled 모드에서 마우스 진입 시 호출' },
              { name: 'onClose', type: '() => void', desc: 'Controlled 모드에서 마우스 이탈 시 호출' },
              {
                name: 'portal',
                type: 'boolean',
                defaultVal: 'false',
                desc: 'true면 document.body에 포털 렌더링 — overflow:hidden 부모에서도 잘리지 않습니다.',
              },
              {
                name: 'portalTarget',
                type: 'HTMLElement | () => HTMLElement',
                desc: 'portal=true 시 렌더링 대상 엘리먼트. 미지정 시 document.body',
              },
              { name: 'popperOptions', type: 'Partial<Options>', desc: 'usePopper에 전달할 추가 옵션' },
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
            <InlineCode>content</InlineCode>와 <InlineCode>children</InlineCode>만으로 동작합니다. 마우스를 올리면 50ms
            후 표시됩니다.
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
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>Controlled 모드</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>open</InlineCode> prop으로 표시 여부를 외부에서 완전히 제어합니다.
          </p>
          <CodeBlock>{`const [open, setOpen] = useState(false)

<Tooltip content="제어형 툴팁" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
  <button>타겟 요소</button>
</Tooltip>
<button onClick={() => setOpen(v => !v)}>토글</button>`}</CodeBlock>
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              padding: '16px 0',
            }}
          >
            {(() => {
              const Demo = () => {
                const [open, setOpen] = useState(false)
                return (
                  <>
                    <Tooltip
                      content="제어형 툴팁입니다"
                      open={open}
                      onOpen={() => setOpen(true)}
                      onClose={() => setOpen(false)}
                      placement="top"
                    >
                      <TriggerBox>타겟 요소</TriggerBox>
                    </Tooltip>
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      style={{
                        padding: '6px 16px',
                        background: t.primary,
                        color: '#fff',
                        border: 'none',
                        borderRadius: t.radiusSm,
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {open ? '툴팁 닫기' : '툴팁 열기'}
                    </button>
                  </>
                )
              }
              return <Demo />
            })()}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>Portal 렌더링</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>portal=true</InlineCode>로 document.body에 렌더링하면 <InlineCode>overflow:hidden</InlineCode>{' '}
            부모 안에서도 잘리지 않습니다.
          </p>
          <CodeBlock>{`<Tooltip content="잘리지 않는 툴팁" portal placement="top">
  <button>overflow:hidden 내부</button>
</Tooltip>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <div
              style={{
                overflow: 'hidden',
                border: `1px dashed ${t.border}`,
                borderRadius: t.radiusSm,
                padding: 24,
                display: 'flex',
                gap: 24,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Tooltip content="overflow:hidden에 잘립니다" placement="top">
                  <TriggerBox>portal=false</TriggerBox>
                </Tooltip>
                <span style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>portal=false</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Tooltip content="document.body에 렌더링됩니다" placement="top" portal>
                  <TriggerBox>portal=true</TriggerBox>
                </Tooltip>
                <span style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>portal=true</span>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Placement */}
      <Section gap={16}>
        <SectionTitle>Placement</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary }}>
            <InlineCode>@popperjs/core</InlineCode>의 전체 Placement 타입을 지원합니다. 마우스를 올려 위치를 확인하세요.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right'] as const).map(
              (p) => (
                <div
                  key={p}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 0' }}
                >
                  <Tooltip content={`placement="${p}"`} placement={p}>
                    <TriggerBox>{p}</TriggerBox>
                  </Tooltip>
                </div>
              ),
            )}
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
