import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import PageHeader from '../../components/PageHeader'
import type { BreadcrumbItem } from '../../components/PageHeader'

const meta = {
  title: 'StyleGuide/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    title: {
      control: 'text',
      description: '페이지 타이틀 (h1 자동 적용)',
      table: { category: 'Content' },
    },
    subtitle: {
      control: 'text',
      description: '서브 타이틀 (타이틀 옆에 표시)',
      table: { category: 'Content' },
    },
    divider: {
      control: 'boolean',
      description: '헤더 하단 구분선 표시 여부',
      table: { category: 'Appearance' },
    },
    onBack: { table: { disable: true } },
    backButton: { table: { disable: true } },
    breadcrumbs: { table: { disable: true } },
    tags: { table: { disable: true } },
    actions: { table: { disable: true } },
  },
  args: {
    title: '페이지 타이틀',
    subtitle: '서브 타이틀',
    divider: false,
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

const BREADCRUMBS: BreadcrumbItem[] = [
  { key: 'home', label: 'Home', href: '#' },
  { key: 'settings', label: 'Settings', href: '#' },
  { key: 'current', label: 'Current Page' },
]

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {
  args: {
    title: '페이지 타이틀',
    subtitle: '서브 타이틀',
    divider: true,
  },
}

// ── WithBreadcrumbs ───────────────────────────────────────────────────────────

/** 브레드크럼 경로가 포함된 페이지 헤더 */
export const WithBreadcrumbs: Story = {
  render: () => <PageHeader title="위협 인텔리전스" subtitle="IoC 데이터 관리" breadcrumbs={BREADCRUMBS} divider />,
  parameters: { controls: { disable: true } },
}

// ── WithActions ───────────────────────────────────────────────────────────────

/** 우측 액션 버튼 슬롯 사용 예시 */
export const WithActions: Story = {
  render: () => (
    <PageHeader
      title="플레이북 관리"
      subtitle="자동화 워크플로우를 구성합니다"
      breadcrumbs={[
        { key: 'home', label: 'Home', href: '#' },
        { key: 'playbook', label: 'Playbook' },
      ]}
      actions={
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            style={{
              padding: '6px 14px',
              fontSize: 12,
              border: `1px solid ${vars.color.border}`,
              borderRadius: 4,
              background: vars.color.surface,
              color: vars.color.text,
              cursor: 'pointer',
            }}
          >
            내보내기
          </button>
          <button
            type="button"
            style={{
              padding: '6px 14px',
              fontSize: 12,
              border: 'none',
              borderRadius: 4,
              background: vars.color.primary,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            + 새 플레이북
          </button>
        </div>
      }
      divider
    />
  ),
  parameters: { controls: { disable: true } },
}

// ── WithBackButton ────────────────────────────────────────────────────────────

/** onBack 핸들러 지정 시 자동 렌더되는 뒤로가기 버튼 */
export const WithBackButton: Story = {
  render: () => {
    const [log, setLog] = useState<string[]>([])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PageHeader
          title="이벤트 상세"
          subtitle="이벤트 ID: EVT-20240501-0042"
          onBack={() => setLog((p) => [...p, 'onBack 호출됨'])}
          divider
        />
        {log.length > 0 && (
          <div
            style={{
              padding: '8px 12px',
              background: vars.color.surface,
              borderRadius: 4,
              fontSize: 12,
              color: vars.color.textSecondary,
            }}
          >
            {log.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        )}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithTags ──────────────────────────────────────────────────────────────────

/** tags 슬롯에 상태 칩을 렌더합니다. */
export const WithTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(
        [
          { label: 'ACTIVE', bg: 'rgba(0,183,153,0.12)', color: '#00b799' },
          { label: 'DRAFT', bg: 'rgba(255,180,0,0.12)', color: '#ffb400' },
          { label: 'ARCHIVED', bg: vars.color.surfaceHover, color: vars.color.textSecondary },
        ] as const
      ).map(({ label, bg, color }) => (
        <PageHeader
          key={label}
          title="플레이북 이름"
          tags={
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 4,
                background: bg,
                color,
                letterSpacing: 0.5,
              }}
            >
              {label}
            </span>
          }
          divider
        />
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}
