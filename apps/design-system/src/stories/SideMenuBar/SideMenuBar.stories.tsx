import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import SideMenuBar from '../../components/SideMenuBar'
import type { MenuItem } from '../../components/SideMenuBar'
import {
  XdrNavDashboardIcon,
  XdrNavAiIcon,
  XdrNavTopologyIcon,
  XdrNavEventIcon,
  XdrNavLogsearchIcon,
  XdrNavIntelligenceIcon,
  XdrNavIncidentIcon,
  XdrNavDetectIcon,
  XdrNavPlaybookIcon,
} from '@port/icon-library'
import xdrLogoMini from './xdr-logo-mini.svg'
import xdrLogoFull from './xdr-logo-full.svg'

// ── 로고 ────────────────────────────────────────────────────────────────────────

const XdrLogo = () => (
  <>
    <span className="header-logo-mini">
      <img src={xdrLogoMini} alt="XDR" width={28} height={16} />
    </span>
    <span className="header-logo-full">
      <img src={xdrLogoMini} alt="XDR" width={28} height={16} />
      <img src={xdrLogoFull} alt="SPIDER XDR" width={138} height={22} />
    </span>
  </>
)

// ── 메뉴 데이터 ────────────────────────────────────────────────────────────────

const BASE_MENU: MenuItem[] = [
  { key: 'dashboard', label: '대시보드', icon: <XdrNavDashboardIcon size={18} /> },
  { key: 'green-ai', label: 'GREEN AI', icon: <XdrNavAiIcon size={18} /> },
  {
    key: 'security-visibility',
    label: '보안 가시성',
    icon: <XdrNavTopologyIcon size={18} />,
    children: [
      { key: 'security-posture', label: '보안 태세 모니터링' },
      { key: 'performance', label: '성능 모니터링' },
    ],
  },
  { key: 'event-detection', label: '이벤트/탐지 분석', icon: <XdrNavEventIcon size={18} /> },
  { key: 'log-search', label: '로그 검색', icon: <XdrNavLogsearchIcon size={18} /> },
  { key: 'intelligence', label: '인텔리전스', icon: <XdrNavIntelligenceIcon size={18} />, showDivider: true },
  { key: 'incident', label: 'INCIDENT 대응', icon: <XdrNavIncidentIcon size={18} /> },
  {
    key: 'detection-rule',
    label: '탐지룰관리',
    icon: <XdrNavDetectIcon size={18} />,
    children: [
      { key: 'alert-condition', label: '경보조건관리' },
      { key: 'single-rule', label: '단일룰관리' },
      { key: 'search-rule', label: '검색기반룰관리' },
      { key: 'ai-anomaly', label: 'AI 이상행위 탐지 관리' },
    ],
  },
  {
    key: 'playbook',
    label: 'PLAYBOOK',
    icon: <XdrNavPlaybookIcon size={18} />,
    children: [
      { key: 'api-mgmt', label: 'API관리' },
      { key: 'app-mgmt', label: 'APP관리' },
      { key: 'custom-table', label: '사용자정의테이블' },
    ],
  },
]

const BADGE_MENU: MenuItem[] = [
  { key: 'dashboard', label: '대시보드', icon: <XdrNavDashboardIcon size={18} /> },
  { key: 'event-detection', label: '이벤트/탐지', icon: <XdrNavEventIcon size={18} />, badge: 5 },
  { key: 'incident', label: 'INCIDENT 대응', icon: <XdrNavIncidentIcon size={18} />, badge: 99 },
  { key: 'intelligence', label: '인텔리전스', icon: <XdrNavIntelligenceIcon size={18} />, badge: 100 },
  { key: 'log-search', label: '로그 검색', icon: <XdrNavLogsearchIcon size={18} />, badge: 0 },
]

const GROUP_MENU: MenuItem[] = [
  { key: 'g1', label: '모니터링', type: 'group' },
  { key: 'dashboard', label: '대시보드', icon: <XdrNavDashboardIcon size={18} /> },
  { key: 'green-ai', label: 'GREEN AI', icon: <XdrNavAiIcon size={18} /> },
  { key: 'g2', label: '분석', type: 'group' },
  { key: 'event', label: '이벤트/탐지', icon: <XdrNavEventIcon size={18} />, badge: 3 },
  { key: 'log-search', label: '로그 검색', icon: <XdrNavLogsearchIcon size={18} /> },
  { key: 'intelligence', label: '인텔리전스', icon: <XdrNavIntelligenceIcon size={18} /> },
  { key: 'g3', label: '관리', type: 'group' },
  {
    key: 'detection-rule',
    label: '탐지룰관리',
    icon: <XdrNavDetectIcon size={18} />,
    children: [
      { key: 'alert-condition', label: '경보조건관리' },
      { key: 'single-rule', label: '단일룰관리' },
    ],
  },
]

// ── 데모 래퍼 ──────────────────────────────────────────────────────────────────

const Demo = ({
  defaultCollapsed = false,
  menuOverride,
  footer,
  defaultActiveKey = 'log-search',
}: {
  defaultCollapsed?: boolean
  menuOverride?: MenuItem[]
  footer?: React.ReactNode
  defaultActiveKey?: string
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey)
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <div
      data-solution="xdr"
      style={{
        display: 'flex',
        height: 600,
        border: `1px solid ${vars.color.border}`,
        borderRadius: vars.radius.md,
        overflow: 'hidden',
        background: vars.color.background,
      }}
    >
      <SideMenuBar
        menuGroup={menuOverride ?? BASE_MENU}
        activeKey={activeKey}
        onActiveChange={setActiveKey}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        header={<XdrLogo />}
        footer={footer}
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
      </div>
    </div>
  )
}

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: 'StyleGuide/SideMenuBar',
  component: SideMenuBar,
  parameters: { layout: 'padded' },
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: '접힌 상태',
      table: { category: 'State' },
    },
    showCollapseButton: {
      control: 'boolean',
      description: '접기 버튼 표시',
      table: { category: 'Toggle' },
    },
    position: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      description: '사이드바 위치',
      table: { category: 'Layout' },
    },
    header: { control: false, table: { disable: true } },
    footer: { control: false, table: { disable: true } },
    menuGroup: { control: false, table: { disable: true } },
    onCollapse: { table: { disable: true } },
    onActiveChange: { table: { disable: true } },
  },
} satisfies Meta<typeof SideMenuBar>

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ─────────────────────────────────────────────────────────────────

/** Controls 패널에서 collapsed · showCollapseButton · position 등을 조정합니다. */
export const Playground: Story = {
  args: { menuGroup: BASE_MENU, activeKey: 'log-search' },
  render: () => <Demo />,
}

// ── Collapsed ──────────────────────────────────────────────────────────────────

/** 접힌 상태(56px)로 시작합니다. 헤더 토글 버튼 또는 메뉴 본문 hover로 펼칩니다. */
export const Collapsed: Story = {
  args: { menuGroup: BASE_MENU, activeKey: 'log-search' },
  render: () => <Demo defaultCollapsed />,
  parameters: { controls: { disable: true } },
}

// ── WithBadge ──────────────────────────────────────────────────────────────────

/** badge prop으로 메뉴 아이템에 알림 숫자를 표시합니다. 99 초과 시 "99+"로 클램핑됩니다. */
export const WithBadge: Story = {
  args: { menuGroup: BADGE_MENU, activeKey: 'dashboard' },
  render: () => <Demo menuOverride={BADGE_MENU} defaultActiveKey="dashboard" />,
  parameters: { controls: { disable: true } },
}

// ── WithGroupLabel ─────────────────────────────────────────────────────────────

/** type="group" 아이템으로 메뉴를 섹션별로 구분합니다. 접힌 상태에서는 레이블이 숨겨집니다. */
export const WithGroupLabel: Story = {
  args: { menuGroup: GROUP_MENU, activeKey: 'dashboard' },
  render: () => <Demo menuOverride={GROUP_MENU} defaultActiveKey="dashboard" />,
  parameters: { controls: { disable: true } },
}

// ── WithFooter ─────────────────────────────────────────────────────────────────

/** footer 슬롯 — 버전 정보나 사용자 프로필 등 하단 고정 영역으로 활용합니다. */
export const WithFooter: Story = {
  args: { menuGroup: BASE_MENU, activeKey: 'log-search' },
  render: () => (
    <Demo
      footer={
        <div
          style={{
            padding: '12px 16px',
            fontSize: 11,
            color: vars.color.textMuted,
            borderTop: `1px solid ${vars.color.border}`,
          }}
        >
          v0.1.9
        </div>
      }
    />
  ),
  parameters: { controls: { disable: true } },
}
