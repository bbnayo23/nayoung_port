import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import { SideNavExd } from '../../components/SideNavExd'
import type { MenuItem } from '../../components/SideMenuBar/SideMenuBar.types'
import {
  XdrNavTopologyIcon,
  ExdSearchIcon,
  XdrNavDashboardIcon,
  XdrNavIntelligenceIcon,
  ExdListUlIcon,
  XdrNavAiIcon,
} from '@port/icon-library'
import spiderExdLogo from '../../images/spider_exd.png'

// ── 로고 ────────────────────────────────────────────────────────────────────────

const ExdLogo = () => <img src={spiderExdLogo} alt="SPIDER EXD" height={24} />

// ── 메뉴 데이터 ────────────────────────────────────────────────────────────────

const EXD_MENU: MenuItem[] = [
  {
    key: 'security-control',
    label: '보안관제',
    icon: <XdrNavTopologyIcon size={18} />,
    children: [
      { key: 'realtime-alert-search', label: '실시간 경보 검색' },
      { key: 'log-process-status', label: '로그 처리 현황' },
      { key: 'log-source-status', label: '로그 소스 현황' },
    ],
  },
  {
    key: 'search',
    label: '검색',
    icon: <ExdSearchIcon size={18} />,
    children: [
      { key: 'log-search', label: '로그 검색' },
      { key: 'analysis', label: '분석' },
      { key: 'audit-log', label: '시스템 감사 로그' },
    ],
  },
  {
    key: 'insight',
    label: '대시보드',
    icon: <XdrNavDashboardIcon size={18} />,
    children: [
      { key: 'statistics-log', label: '로그 통계' },
      { key: 'statistics-alert', label: '경보 통계' },
      { key: 'statistics-response', label: '대응 통계' },
      { key: 'service-monitoring', label: '서비스 모니터링' },
    ],
  },
  {
    key: 'ioc',
    label: '인텔리전스',
    icon: <XdrNavIntelligenceIcon size={18} />,
    children: [
      { key: 'ioc-info', label: 'IOC 정보' },
      { key: 'malicious-ip', label: '악성 IP' },
      { key: 'malicious-domain', label: '악성 도메인' },
    ],
  },
  {
    key: 'report',
    label: '보고서',
    icon: <ExdListUlIcon size={18} />,
    children: [
      { key: 'batch-report', label: '배치 보고서' },
      { key: 'user-report', label: '사용자 보고서' },
    ],
  },
  {
    key: 'agentic-soc',
    label: 'Agentic SOC',
    icon: <XdrNavAiIcon size={18} />,
    children: [{ key: 'analysis-agent', label: '분석 에이전트' }],
  },
]

// ── 데모 래퍼 ──────────────────────────────────────────────────────────────────

const Demo = ({
  defaultCollapsed = false,
  defaultHidden = false,
  defaultActiveKey = 'log-search',
}: {
  defaultCollapsed?: boolean
  defaultHidden?: boolean
  defaultActiveKey?: string
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey)
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [hidden, setHidden] = useState(defaultHidden)

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: vars.color.background,
      }}
    >
      <SideNavExd
        menuGroup={EXD_MENU}
        activeKey={activeKey}
        onActiveChange={setActiveKey}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        hidden={hidden}
        onHidden={setHidden}
        header={<ExdLogo />}
      />
      <div
        style={{
          flex: 1,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          fontSize: 13,
          color: vars.color.textSecondary,
        }}
      >
        <p style={{ margin: 0 }}>
          Active: <strong style={{ color: vars.color.text }}>{activeKey}</strong>
        </p>
        <p style={{ margin: 0 }}>
          Collapsed: <strong style={{ color: vars.color.text }}>{String(collapsed)}</strong>
        </p>
        <p style={{ margin: 0 }}>
          Hidden: <strong style={{ color: vars.color.text }}>{String(hidden)}</strong>
        </p>
      </div>
    </div>
  )
}

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: 'StyleGuide/SideNavExd',
  component: SideNavExd,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    collapsed: { control: 'boolean', description: '접힌 상태', table: { category: 'State' } },
    hidden: { control: 'boolean', description: '숨김 상태', table: { category: 'State' } },
    header: { control: false, table: { disable: true } },
    aiChatSlot: { control: false, table: { disable: true } },
    menuGroup: { control: false, table: { disable: true } },
    onCollapse: { table: { disable: true } },
    onHidden: { table: { disable: true } },
    onActiveChange: { table: { disable: true } },
  },
} satisfies Meta<typeof SideNavExd>

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ─────────────────────────────────────────────────────────────────

/** Controls 패널에서 collapsed · hidden 등을 조정합니다. */
export const Playground: Story = {
  args: { menuGroup: EXD_MENU, activeKey: 'log-search' },
  render: () => <Demo />,
}

// ── Collapsed ──────────────────────────────────────────────────────────────────

/** 접힌 상태(56px)로 시작합니다. 아이콘 위에 마우스를 올리면 Flyout 서브메뉴가 나타납니다. */
export const Collapsed: Story = {
  args: { menuGroup: EXD_MENU, activeKey: 'log-search' },
  render: () => <Demo defaultCollapsed />,
  parameters: { controls: { disable: true } },
}

// ── WithHidden ─────────────────────────────────────────────────────────────────

/** 숨김 상태 — 네비게이션이 화면 밖으로 사라지고 재열기 버튼이 나타납니다. */
export const WithHidden: Story = {
  args: { menuGroup: EXD_MENU, activeKey: 'log-search' },
  render: () => <Demo defaultHidden />,
  parameters: { controls: { disable: true } },
}
