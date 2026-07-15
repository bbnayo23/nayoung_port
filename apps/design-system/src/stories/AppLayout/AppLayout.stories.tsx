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
} from 'lucide-react'
import AppLayout from '@dc/components/AppLayout'
import Gnb from '@dc/components/Gnb'
import Lnb from '@dc/components/Lnb'
import type { MenuItem } from '@dc/components/Lnb'

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
  title: 'Page/AppLayout',
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
// AppLayout 은 GNB·LNB·Main 셸 구조만 잡아주는 역할이며, 콘텐츠 영역은 비워 둔다.
// (실제 페이지 콘텐츠는 각 소비 앱에서 children 으로 주입)

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
            expandOnHover={false}
          />
        }
      >
        {/* 콘텐츠 영역 — 비어 있음 (레이아웃 구조만 확인) */}
      </AppLayout>
    </div>
  )
}

/** AiR Works 공통 셸 — GNB + LNB + Main. 콘텐츠 영역은 비어 있고 레이아웃 구조만 잡아줍니다. */
export const Empty: Story = {
  args: { children: null },
  render: () => <Demo />,
}

/** 접힌 LNB 상태의 빈 셸 레이아웃. */
export const CollapsedLnb: Story = {
  args: { children: null },
  render: () => <Demo defaultCollapsed />,
  parameters: { controls: { disable: true } },
}
