import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import { StatsBar, StatItem, StatCount, StatLabel } from '../../components/StatsBar'
import Popover from '../../components/Popover'
import { ExdHomeIcon, ExdDetectionIcon, ExdEventIcon, ExdDataCodeIcon, ExdGaugeIcon } from '@port/icon-library'

// ── Mock 데이터 ────────────────────────────────────────────────────────────────

type Severity = 'critical' | 'high' | 'medium' | 'low'

interface MockRow {
  id: string
  name: string
  severity: Severity
  source: string
}

const MOCK_ROWS: MockRow[] = [
  { id: 'EVT-001', name: 'SQL Injection Attempt', severity: 'critical', source: '192.168.1.100' },
  { id: 'EVT-002', name: 'XSS Attack Detected', severity: 'critical', source: '10.0.0.5' },
  { id: 'EVT-003', name: 'Ransomware Signature', severity: 'critical', source: '172.16.1.50' },
  { id: 'EVT-004', name: 'Brute Force Login', severity: 'high', source: '172.16.0.2' },
  { id: 'EVT-005', name: 'Unauthorized Access', severity: 'high', source: '192.168.0.50' },
  { id: 'EVT-006', name: 'Port Scan Detected', severity: 'high', source: '10.0.1.5' },
  { id: 'EVT-007', name: 'Unusual Login Location', severity: 'medium', source: '203.0.113.1' },
  { id: 'EVT-008', name: 'Failed Auth Attempts', severity: 'medium', source: '192.168.1.200' },
  { id: 'EVT-009', name: 'Config Change Detected', severity: 'medium', source: '10.0.0.10' },
  { id: 'EVT-010', name: 'Outdated SSL Certificate', severity: 'low', source: 'web-server-01' },
  { id: 'EVT-011', name: 'Weak Password Policy', severity: 'low', source: 'domain-ctrl-01' },
]

const STATS = [
  { key: 'all', label: 'All', count: MOCK_ROWS.length, icon: <ExdHomeIcon size={16} /> },
  {
    key: 'critical',
    label: 'Critical',
    count: MOCK_ROWS.filter((e) => e.severity === 'critical').length,
    icon: <ExdDetectionIcon size={16} />,
  },
  {
    key: 'high',
    label: 'High',
    count: MOCK_ROWS.filter((e) => e.severity === 'high').length,
    icon: <ExdEventIcon size={16} />,
  },
  {
    key: 'medium',
    label: 'Medium',
    count: MOCK_ROWS.filter((e) => e.severity === 'medium').length,
    icon: <ExdDataCodeIcon size={16} />,
  },
  {
    key: 'low',
    label: 'Low',
    count: MOCK_ROWS.filter((e) => e.severity === 'low').length,
    icon: <ExdGaugeIcon size={16} />,
  },
]

// ── 공유 helpers ───────────────────────────────────────────────────────────────

const SectionCard = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      background: vars.color.surface,
      border: `1px solid ${vars.color.border}`,
      borderRadius: vars.radius.md,
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
)

const PopoverContent = ({ label, count }: { label: string; count: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <span style={{ fontSize: 12, color: vars.color.textSecondary }}>{label}</span>
    <span style={{ fontSize: 14, color: vars.color.text }}>{count.toLocaleString()}건</span>
  </div>
)

const SEVERITY_COLOR: Record<Severity, string> = {
  critical: vars.color.error,
  high: '#f97316',
  medium: '#eab308',
  low: vars.color.success ?? '#22c55e',
}

const MiniGrid = ({ rows }: { rows: MockRow[] }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ background: vars.color.surfaceHover }}>
        {['ID', '이벤트명', '심각도', '소스'].map((h) => (
          <th
            key={h}
            style={{
              padding: '8px 12px',
              textAlign: 'left',
              fontSize: 12,
              fontWeight: 600,
              color: vars.color.textSecondary,
              borderBottom: `1px solid ${vars.color.border}`,
            }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.length === 0 ? (
        <tr>
          <td colSpan={4} style={{ padding: 24, textAlign: 'center', fontSize: 13, color: vars.color.textMuted }}>
            조회된 데이터가 없습니다.
          </td>
        </tr>
      ) : (
        rows.map((row) => (
          <tr key={row.id} style={{ borderBottom: `1px solid ${vars.color.border}` }}>
            <td style={{ padding: '8px 12px', fontSize: 12, color: vars.color.textSecondary }}>{row.id}</td>
            <td style={{ padding: '8px 12px', fontSize: 13, color: vars.color.text }}>{row.name}</td>
            <td style={{ padding: '8px 12px' }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: SEVERITY_COLOR[row.severity],
                  border: `1px solid ${SEVERITY_COLOR[row.severity]}`,
                  borderRadius: 3,
                  padding: '1px 6px',
                }}
              >
                {row.severity}
              </span>
            </td>
            <td style={{ padding: '8px 12px', fontSize: 12, color: vars.color.textSecondary }}>{row.source}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
)

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: 'StyleGuide/StatsBar',
  component: StatsBar,
  parameters: { layout: 'padded' },
  args: { children: null },
} satisfies Meta<typeof StatsBar>

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ─────────────────────────────────────────────────────────────────

/** 기본 StatsBar 컴포넌트입니다. SectionCard로 감싸 섹션 박스 안에 배치합니다. */
export const Playground: Story = {
  render: () => (
    <SectionCard>
      <StatsBar>
        {STATS.map((stat) => (
          <StatItem key={stat.key} $isTotal={stat.key === 'all'}>
            <div className="stat-info">
              <span className="stat-icon">{stat.icon}</span>
              <StatLabel>{stat.label}</StatLabel>
            </div>
            <StatCount $isTotal={stat.key === 'all'}>{stat.count}</StatCount>
          </StatItem>
        ))}
      </StatsBar>
    </SectionCard>
  ),
}

// ── WithPopover ────────────────────────────────────────────────────────────────

const PopoverStatItem = ({ stat }: { stat: (typeof STATS)[number] }) => {
  const [visible, setVisible] = useState(false)
  return (
    <Popover
      placement="bottom"
      arrow
      visible={visible}
      onVisibleChange={setVisible}
      content={<PopoverContent label={stat.label} count={stat.count} />}
    >
      <StatItem
        $isTotal={stat.key === 'all'}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <div className="stat-info">
          <span className="stat-icon">{stat.icon}</span>
          <StatLabel>{stat.label}</StatLabel>
        </div>
        <StatCount $isTotal={stat.key === 'all'}>{stat.count}</StatCount>
      </StatItem>
    </Popover>
  )
}

/** StatItem을 Popover로 감싸 호버 시 상세 정보를 표시합니다. */
export const WithPopover: Story = {
  render: () => (
    <SectionCard>
      <StatsBar>
        {STATS.map((stat) => (
          <PopoverStatItem key={stat.key} stat={stat} />
        ))}
      </StatsBar>
    </SectionCard>
  ),
  parameters: { controls: { disable: true } },
}

// ── ActiveState ────────────────────────────────────────────────────────────────

/** $active prop으로 현재 선택(필터 적용) 상태를 시각적으로 표시합니다. */
export const ActiveState: Story = {
  render: () => (
    <SectionCard>
      <StatsBar>
        {STATS.map((stat, i) => (
          <StatItem key={stat.key} $isTotal={stat.key === 'all'} $active={i === 2}>
            <div className="stat-info">
              <span className="stat-icon">{stat.icon}</span>
              <StatLabel>{stat.label}</StatLabel>
            </div>
            <StatCount $isTotal={stat.key === 'all'}>{stat.count}</StatCount>
          </StatItem>
        ))}
      </StatsBar>
    </SectionCard>
  ),
  parameters: { controls: { disable: true } },
}

// ── WithGridFilter ─────────────────────────────────────────────────────────────

/** StatItem 클릭으로 하단 그리드를 필터링하는 패턴입니다. Popover로 상세 정보도 표시합니다. */
export const WithGridFilter: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState('all')
    const [visibleKey, setVisibleKey] = useState<string | null>(null)
    const filteredRows = activeKey === 'all' ? MOCK_ROWS : MOCK_ROWS.filter((r) => r.severity === activeKey)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionCard>
          <StatsBar>
            {STATS.map((stat) => (
              <Popover
                key={stat.key}
                placement="bottom"
                arrow
                visible={visibleKey === stat.key}
                onVisibleChange={(v) => setVisibleKey(v ? stat.key : null)}
                content={<PopoverContent label={stat.label} count={stat.count} />}
              >
                <StatItem
                  $isTotal={stat.key === 'all'}
                  $active={activeKey === stat.key}
                  onClick={() => setActiveKey(stat.key)}
                  onMouseEnter={() => setVisibleKey(stat.key)}
                  onMouseLeave={() => setVisibleKey(null)}
                >
                  <div className="stat-info">
                    <span className="stat-icon">{stat.icon}</span>
                    <StatLabel>{stat.label}</StatLabel>
                  </div>
                  <StatCount $isTotal={stat.key === 'all'}>{stat.count}</StatCount>
                </StatItem>
              </Popover>
            ))}
          </StatsBar>
        </SectionCard>
        <SectionCard>
          <MiniGrid rows={filteredRows} />
        </SectionCard>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
