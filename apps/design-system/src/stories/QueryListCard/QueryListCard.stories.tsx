import type { Meta, StoryObj } from '@storybook/react-vite'
import { Clock, ListChecks } from 'lucide-react'
import QueryListCard from '../../components/QueryListCard'
import type { QueryListItem } from '../../components/QueryListCard'

const HISTORY: QueryListItem[] = [
  { id: 'h1', title: '1분 전', meta: '전체 · 내림차순', query: "d_port:80 AND d_ip:1.1.1.1 OR s_ip: 2.2.2.2" },
  { id: 'h2', title: '12분 전', meta: 'system · 오름차순', query: "s_country = 'CN' AND severity >= high" },
  { id: 'h3', title: '1시간 전', meta: 'ips · 내림차순', query: "user = 'root' AND action = 'blocked'" },
  { id: 'h4', title: '3시간 전', meta: '전체 · 내림차순', query: "eventType = 'C2 Communication'" },
]

const TEMPLATES: QueryListItem[] = [
  { id: 't1', title: 'C2 비콘 탐지', meta: '전체 · 내림차순', query: "eventType = 'C2 Communication'" },
  { id: 't2', title: '랜섬웨어 행위 탐지', meta: 'ips · 내림차순', query: "s_country = 'CN' AND severity = 'critical'" },
  { id: 't3', title: 'SQL Injection 탐지', meta: 'waf · 오름차순', query: "d_port IN (80, 443) AND action = 'blocked'" },
]

const meta = {
  title: 'StyleGuide/QueryListCard',
  component: QueryListCard,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    onAction: { table: { disable: true } },
  },
} satisfies Meta<typeof QueryListCard>

export default meta
type Story = StoryObj<typeof meta>

/** 검색기록 — 저장된 쿼리 목록. 항목 hover 시 실행 어피던스가 나타납니다. */
export const History: Story = {
  args: { title: '검색기록', items: HISTORY, onSelect: () => {} },
  render: (args) => (
    <div style={{ height: 360, maxWidth: 460 }}>
      <QueryListCard {...args} icon={<Clock size={15} />} actionLabel="전체" />
    </div>
  ),
}

/** 템플릿 — 저장된 쿼리 템플릿 목록. */
export const Templates: Story = {
  args: { title: '템플릿', items: TEMPLATES, onSelect: () => {} },
  render: (args) => (
    <div style={{ height: 360, maxWidth: 460 }}>
      <QueryListCard {...args} icon={<ListChecks size={15} />} actionLabel="전체" />
    </div>
  ),
}

/** 빈 목록 상태. */
export const Empty: Story = {
  args: { title: '검색기록', items: [], onSelect: () => {}, emptyText: '저장된 검색이 없습니다.' },
  render: (args) => (
    <div style={{ height: 240, maxWidth: 460 }}>
      <QueryListCard {...args} icon={<Clock size={15} />} />
    </div>
  ),
}
