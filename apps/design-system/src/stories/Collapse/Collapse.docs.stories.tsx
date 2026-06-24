import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import { Collapse } from '../../components/Collapse'
import type { CollapseVariant } from '../../components/Collapse'

const meta = {
  title: 'StyleGuide/Collapse',
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
  success: vars.color.success,
  error: vars.color.error,
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

export const Documentation: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [showMoreOpen, setShowMoreOpen] = useState(false)
    const services = [
      { id: 1, name: 'nginx', ok: true },
      { id: 2, name: 'mysql', ok: false },
      { id: 3, name: 'redis', ok: true },
      { id: 4, name: 'mongodb', ok: false },
      { id: 5, name: 'rabbitmq', ok: true },
    ]
    const rowStyle = {
      padding: '7px 0',
      borderBottom: `1px solid ${t.border}`,
      fontSize: 12,
      display: 'flex',
      justifyContent: 'space-between' as const,
    }

    return (
      <DocPage>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Collapse</h1>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
            단일 콘텐츠를 접고 펼치는 컴포넌트입니다. card · row · more · horizontal 4가지 variant와 uncontrolled /
            controlled 두 가지 제어 방식을 지원합니다.
          </p>
          <CodeBlock>{`import { Collapse } from '@port/design-system'`}</CodeBlock>
        </div>

        <Section>
          <SectionTitle>API</SectionTitle>
          <DocCard>
            <PropsTable
              rows={[
                {
                  name: 'variant',
                  type: "'card' | 'row' | 'more' | 'horizontal'",
                  defaultVal: "'card'",
                  desc: '스타일 변형',
                },
                { name: 'header', type: 'ReactNode', desc: '헤더 영역 (클릭 시 토글). 생략하면 외부 open 제어만 가능' },
                { name: 'defaultOpen', type: 'boolean', defaultVal: 'false', desc: '초기 열림 상태 (uncontrolled)' },
                { name: 'open', type: 'boolean', desc: '제어 모드 열림 상태. onOpenChange와 함께 사용' },
                { name: 'onOpenChange', type: '(open: boolean) => void', desc: '열림 상태 변경 콜백' },
                { name: 'children', type: 'ReactNode', desc: '펼쳐지는 콘텐츠 영역' },
              ]}
            />
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>Variants</SectionTitle>
          <DocCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
              {(['card', 'row', 'more'] as CollapseVariant[]).map((v) => (
                <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <InlineCode>{`variant="${v}"`}</InlineCode>
                  <Collapse variant={v} header={`${v} 헤더`} defaultOpen={v === 'card'}>
                    {v === 'card' && '카드 스타일 — 테두리와 radius가 적용됩니다.'}
                    {v === 'row' && 'row 스타일 — 하단 구분선만 표시됩니다.'}
                    {v === 'more' && 'more 스타일 — 더보기 패턴에 사용합니다.'}
                  </Collapse>
                </div>
              ))}
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>ShowMore (variant="more")</SectionTitle>
          <CodeBlock>{`<Collapse
  variant="more"
  header={open ? '접기' : '더보기'}
  open={open}
  onOpenChange={setOpen}
>
  {hiddenItems.map(...)}
</Collapse>`}</CodeBlock>
          <DocCard style={{ maxWidth: 360 }}>
            {services.slice(0, 3).map((s) => (
              <div key={s.id} style={rowStyle}>
                <span>{s.name}</span>
                <span style={{ color: s.ok ? t.success : t.error }}>{s.ok ? '정상' : '오류'}</span>
              </div>
            ))}
            <Collapse
              variant="more"
              header={showMoreOpen ? '접기' : '더보기'}
              open={showMoreOpen}
              onOpenChange={setShowMoreOpen}
            >
              {services.slice(3).map((s) => (
                <div key={s.id} style={rowStyle}>
                  <span>{s.name}</span>
                  <span style={{ color: s.ok ? t.success : t.error }}>{s.ok ? '정상' : '오류'}</span>
                </div>
              ))}
            </Collapse>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>Controlled (open + onOpenChange)</SectionTitle>
          <CodeBlock>{`const [open, setOpen] = useState(false)

<Collapse
  variant="card"
  header="제어 모드"
  open={open}
  onOpenChange={setOpen}
>
  ...
</Collapse>`}</CodeBlock>
          <DocCard style={{ maxWidth: 480 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  style={{ padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}
                >
                  열기
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{ padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}
                >
                  닫기
                </button>
                <code style={{ fontFamily: 'monospace', fontSize: 11, color: t.textSecondary }}>
                  open={String(open)}
                </code>
              </div>
              <Collapse variant="card" header="제어 모드 Collapse" open={open} onOpenChange={setOpen}>
                외부 state로 열림·닫힘을 제어합니다.
              </Collapse>
            </div>
          </DocCard>
        </Section>
      </DocPage>
    )
  },
}
