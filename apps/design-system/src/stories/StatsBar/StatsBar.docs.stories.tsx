import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { vars } from '../../theme/contract.css'
import { StatsBar, StatItem, StatCount, StatLabel } from '../../components/StatsBar'

const meta = {
  title: 'StyleGuide/StatsBar',
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

const Card = ({ children }: { children: ReactNode }) => (
  <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.radius, padding: '20px 24px' }}>
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
      fontFamily: "'Fira Code', 'Consolas', monospace",
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

const PropsTable = ({ title, rows }: { title: string; rows: PropRow[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>{title}</p>
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
  </div>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>StatsBar</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          보안 이벤트·알림 등의 집계 수치를 가로로 나열하는 통계 바입니다. 합계 항목과 개별 항목을 구분하고, hover 시{' '}
          <InlineCode>popoverContent</InlineCode>로 상세 정보를 표시할 수 있습니다.
        </p>
        <CodeBlock>{`import { StatsBar, StatItem, StatCount, StatLabel } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PropsTable
              title="StatsBar"
              rows={[{ name: 'children', type: 'ReactNode', desc: 'StatItem 컴포넌트들을 children으로 전달합니다.' }]}
            />
            <PropsTable
              title="StatItem"
              rows={[
                { name: '$isTotal', type: 'boolean', desc: '합계 항목임을 나타냅니다. 시각적으로 강조 표시됩니다.' },
                { name: '$active', type: 'boolean', desc: '선택된 항목 상태. 배경색으로 활성 상태를 표시합니다.' },
                {
                  name: 'popoverContent',
                  type: 'ReactNode',
                  desc: 'hover 시 표시할 Popover 콘텐츠. 미설정 시 Popover 비활성.',
                },
                { name: 'children', type: 'ReactNode', desc: 'StatCount + StatLabel 조합을 children으로 전달합니다.' },
              ]}
            />
            <PropsTable
              title="StatCount"
              rows={[
                { name: '$isTotal', type: 'boolean', desc: '합계 항목의 카운트. 일반 항목보다 큰 폰트로 표시됩니다.' },
                { name: 'children', type: 'ReactNode', desc: '표시할 숫자 또는 텍스트.' },
              ]}
            />
            <PropsTable title="StatLabel" rows={[{ name: 'children', type: 'ReactNode', desc: '항목 이름 레이블.' }]} />
          </div>
        </Card>
      </Section>

      {/* 기본 사용 */}
      <Section gap={16}>
        <SectionTitle>기본 사용</SectionTitle>
        <Card>
          <CodeBlock>{`<StatsBar>
  <StatItem $isTotal>
    <StatCount $isTotal>1,248</StatCount>
    <StatLabel>전체</StatLabel>
  </StatItem>
  <StatItem>
    <StatCount>432</StatCount>
    <StatLabel>Critical</StatLabel>
  </StatItem>
  <StatItem>
    <StatCount>316</StatCount>
    <StatLabel>High</StatLabel>
  </StatItem>
  <StatItem>
    <StatCount>289</StatCount>
    <StatLabel>Medium</StatLabel>
  </StatItem>
  <StatItem>
    <StatCount>211</StatCount>
    <StatLabel>Low</StatLabel>
  </StatItem>
</StatsBar>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <StatsBar>
              <StatItem $isTotal>
                <StatCount $isTotal>1,248</StatCount>
                <StatLabel>전체</StatLabel>
              </StatItem>
              <StatItem>
                <StatCount>432</StatCount>
                <StatLabel>Critical</StatLabel>
              </StatItem>
              <StatItem>
                <StatCount>316</StatCount>
                <StatLabel>High</StatLabel>
              </StatItem>
              <StatItem>
                <StatCount>289</StatCount>
                <StatLabel>Medium</StatLabel>
              </StatItem>
              <StatItem>
                <StatCount>211</StatCount>
                <StatLabel>Low</StatLabel>
              </StatItem>
            </StatsBar>
          </div>
        </Card>
      </Section>

      {/* $active */}
      <Section gap={16}>
        <SectionTitle>$active — 선택 상태</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>$active</InlineCode>를 사용해 현재 필터링된 항목을 강조합니다.
          </p>
          <CodeBlock>{`<StatsBar>
  <StatItem $isTotal>
    <StatCount $isTotal>1,248</StatCount>
    <StatLabel>전체</StatLabel>
  </StatItem>
  <StatItem $active>
    <StatCount>432</StatCount>
    <StatLabel>Critical</StatLabel>
  </StatItem>
  <StatItem>
    <StatCount>316</StatCount>
    <StatLabel>High</StatLabel>
  </StatItem>
</StatsBar>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <StatsBar>
              <StatItem $isTotal>
                <StatCount $isTotal>1,248</StatCount>
                <StatLabel>전체</StatLabel>
              </StatItem>
              <StatItem $active>
                <StatCount>432</StatCount>
                <StatLabel>Critical</StatLabel>
              </StatItem>
              <StatItem>
                <StatCount>316</StatCount>
                <StatLabel>High</StatLabel>
              </StatItem>
              <StatItem>
                <StatCount>289</StatCount>
                <StatLabel>Medium</StatLabel>
              </StatItem>
            </StatsBar>
          </div>
        </Card>
      </Section>

      {/* popoverContent */}
      <Section gap={16}>
        <SectionTitle>popoverContent — hover 상세 정보</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>popoverContent</InlineCode>를 설정하면 항목 hover 시 Popover가 표시됩니다.
          </p>
          <CodeBlock>{`<StatItem
  popoverContent={
    <div>
      <p>오늘 +12건</p>
      <p>전주 대비 +5%</p>
    </div>
  }
>
  <StatCount>432</StatCount>
  <StatLabel>Critical</StatLabel>
</StatItem>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <StatsBar>
              <StatItem $isTotal>
                <StatCount $isTotal>1,248</StatCount>
                <StatLabel>전체</StatLabel>
              </StatItem>
              <StatItem
                popoverContent={
                  <div style={{ padding: '4px 8px', fontSize: 12, color: t.textSecondary, lineHeight: 1.8 }}>
                    <div>오늘 +12건</div>
                    <div>전주 대비 +5%</div>
                  </div>
                }
              >
                <StatCount>432</StatCount>
                <StatLabel>Critical ↗</StatLabel>
              </StatItem>
              <StatItem>
                <StatCount>316</StatCount>
                <StatLabel>High</StatLabel>
              </StatItem>
            </StatsBar>
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
