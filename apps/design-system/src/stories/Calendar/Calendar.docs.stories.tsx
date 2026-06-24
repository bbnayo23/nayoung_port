import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import { Calendar } from '../../components/Calendar'

const meta = {
  title: 'StyleGuide/Calendar',
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
    const [selected, setSelected] = useState<Date | undefined>(new Date())
    const today = new Date()
    const disabledBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    const disabledAfter = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    const [rangeSelected, setRangeSelected] = useState<Date | undefined>(new Date())

    return (
      <DocPage>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Calendar</h1>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
            react-day-picker 기반의 날짜 선택 컴포넌트입니다. 단일 날짜 선택, 날짜 범위 제한, 비활성 날짜 등을
            지원합니다.
          </p>
          <CodeBlock>{`import { Calendar } from '@port/design-system'`}</CodeBlock>
        </div>

        <Section>
          <SectionTitle>API</SectionTitle>
          <DocCard>
            <PropsTable
              rows={[
                { name: 'selected', type: 'Date | undefined', desc: '현재 선택된 날짜' },
                { name: 'onSelect', type: '(date: Date | undefined) => void', desc: '날짜 선택 시 호출되는 콜백' },
                { name: 'disabledBefore', type: 'Date', desc: '이 날짜 이전은 선택 불가' },
                { name: 'disabledAfter', type: 'Date', desc: '이 날짜 이후는 선택 불가' },
                { name: 'className', type: 'string', desc: '최상위 wrapper에 추가할 className' },
              ]}
            />
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>기본 사용</SectionTitle>
          <CodeBlock>{`const [selected, setSelected] = useState<Date | undefined>(new Date());

<Calendar selected={selected} onSelect={setSelected} />`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <Calendar selected={selected} onSelect={setSelected} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 12, color: t.textMuted }}>선택된 날짜</span>
                <span style={{ fontSize: 14, color: t.text, fontWeight: 600 }}>
                  {selected?.toLocaleDateString('ko-KR') ?? '없음'}
                </span>
              </div>
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>날짜 범위 제한</SectionTitle>
          <CodeBlock>{`const today = new Date();
const disabledBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const disabledAfter  = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

<Calendar
  selected={selected}
  onSelect={setSelected}
  disabledBefore={disabledBefore}
  disabledAfter={disabledAfter}
/>`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <Calendar
                selected={rangeSelected}
                onSelect={setRangeSelected}
                disabledBefore={disabledBefore}
                disabledAfter={disabledAfter}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 12, color: t.textMuted }}>선택 범위</span>
                <span style={{ fontSize: 13, color: t.textSecondary }}>
                  오늘 기준 <InlineCode>±7일</InlineCode>만 선택 가능
                </span>
              </div>
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>날짜별 스타일 상태</SectionTitle>
          <DocCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Calendar selected={new Date()} onSelect={() => {}} />
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 8 }}>
                {[
                  { label: '오늘 (today)', color: t.primary, desc: '볼드 + primary 색상 + 테두리' },
                  { label: '선택됨 (selected)', color: t.primary, desc: 'primary 배경 + 흰 텍스트' },
                  { label: '일요일', color: t.error, desc: 'error 색상' },
                  { label: '비활성 (disabled)', color: t.textMuted, desc: 'opacity 0.4 + 취소선' },
                ].map(({ label, desc }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>
                      <InlineCode>{label}</InlineCode>
                    </span>
                    <span style={{ fontSize: 12, color: t.textMuted }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </DocCard>
        </Section>
      </DocPage>
    )
  },
}
