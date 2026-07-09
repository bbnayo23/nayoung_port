import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  LayoutDashboard,
  MessagesSquare,
  LayoutPanelLeft,
  MonitorDot,
  Bot,
  Workflow as WorkflowIcon,
  Boxes,
  PenTool,
  Link2,
  Database,
  Building2,
  Users,
} from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import Gnb from '../../components/Gnb'
import Lnb from '../../components/Lnb'
import type { MenuItem } from '../../components/Lnb'
import { vars } from '../../theme/contract.css'

// ── AiR Works 메뉴 데이터 ────────────────────────────────────────────────────────

const AW_MENU: MenuItem[] = [
  { key: 'dashboard', label: '대시보드', icon: <LayoutDashboard size={18} /> },
  { key: 'chatbot', label: '챗봇', icon: <MessagesSquare size={18} /> },
  { key: 'workspace', label: '워크스페이스', icon: <LayoutPanelLeft size={18} /> },
  { key: 'monitoring', label: '모니터링', icon: <MonitorDot size={18} />, showDivider: true },
  {
    key: 'agent',
    label: '에이전트 관리',
    icon: <Bot size={18} />,
    children: [
      { key: 'agent-list', label: '에이전트 목록' },
      { key: 'result-template', label: '결과 템플릿' },
    ],
  },
  { key: 'workflow', label: '워크플로 관리', icon: <WorkflowIcon size={18} /> },
  { key: 'model', label: '모델 관리', icon: <Boxes size={18} /> },
  { key: 'tool', label: 'Tool 관리', icon: <PenTool size={18} /> },
  { key: 'external', label: '외부연동 관리', icon: <Link2 size={18} /> },
  { key: 'vector', label: '백터스토어 관리', icon: <Database size={18} />, showDivider: true },
  { key: 'org', label: '조직관리', icon: <Building2 size={18} /> },
]

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: 'StyleGuide/AppLayout',
  component: AppLayout,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    solution: { control: 'text', description: 'data-solution 테마 스코프' },
    gnb: { table: { disable: true } },
    lnb: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof AppLayout>

export default meta
type Story = StoryObj<typeof meta>

// ── 데모 ──────────────────────────────────────────────────────────────────────

const SampleMain = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* 페이지 헤더 — 타이틀 + 액션 */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '16px 24px',
        borderBottom: `1px solid ${vars.color.border}`,
      }}
    >
      <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: vars.color.text }}>워크스페이스</h1>
      <button
        type="button"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          height: 32,
          padding: '0 12px',
          border: 'none',
          borderRadius: 8,
          background: '#131313',
          color: '#fff',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <Users size={14} /> 그룹 설정
      </button>
    </div>
    <div style={{ flex: 1, padding: 24, color: vars.color.textMuted, fontSize: 13 }}>
      메인 콘텐츠 영역 — 흰 카드(좌상단 라운드 + 그림자) 위에 페이지 콘텐츠가 배치됩니다.
    </div>
  </div>
)

const Demo = ({ defaultCollapsed = false, solution = '' }: { defaultCollapsed?: boolean; solution?: string }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [activeKey, setActiveKey] = useState('workspace')

  return (
    <div style={{ height: '100vh' }}>
      <AppLayout
        solution={solution}
        gnb={<Gnb title="AiR Works" notiCount={3} />}
        lnb={
          <Lnb
            menuGroup={AW_MENU}
            activeKey={activeKey}
            onActiveChange={setActiveKey}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            onFullscreen={() => console.log('fullscreen')}
          />
        }
      >
        <SampleMain />
      </AppLayout>
    </div>
  )
}

/** AiR Works 공통 셸 — GNB + LNB + Main. GNB 아래 영역 배경이 이어지고 LNB·Main 은 그림자 카드입니다. */
export const AirWorks: Story = {
  args: { children: null },
  render: () => <Demo />,
}

/** 접힌 LNB 상태의 셸 레이아웃. */
export const CollapsedLnb: Story = {
  args: { children: null },
  render: () => <Demo defaultCollapsed />,
  parameters: { controls: { disable: true } },
}
