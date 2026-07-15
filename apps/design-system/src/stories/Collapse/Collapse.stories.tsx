import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import { Collapse } from '@dc/components/Collapse'
import type { CollapseVariant } from '@dc/components/Collapse'

const meta = {
  title: 'StyleGuide/Collapse',
  component: Collapse,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['card', 'row', 'more', 'horizontal'] satisfies CollapseVariant[],
      description: '스타일 변형',
      table: { category: 'Appearance' },
    },
    defaultOpen: {
      control: 'boolean',
      description: '초기 열림 상태 (uncontrolled)',
      table: { category: 'State' },
    },
    header: {
      control: 'text',
      description: '헤더 텍스트',
      table: { category: 'Content' },
    },
    children: { control: false, table: { disable: true } },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
  args: {
    variant: 'card',
    defaultOpen: false,
    header: 'Collapse 헤더',
    children: '펼쳐지는 콘텐츠 영역입니다.',
  },
} satisfies Meta<typeof Collapse>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 variant · defaultOpen · header를 실시간으로 조정합니다. */
export const Playground: Story = {}

// ── Variants ──────────────────────────────────────────────────────────────────

/** card · row · more 세 가지 variant를 비교합니다. */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
      {(['card', 'row', 'more'] as CollapseVariant[]).map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>{`variant="${v}"`}</Label>
          <Collapse variant={v} header={`${v} 헤더`} defaultOpen={v === 'card'}>
            {v === 'card' && '카드 스타일 — 테두리와 radius가 적용됩니다.'}
            {v === 'row' && 'row 스타일 — 하단 구분선만 표시됩니다.'}
            {v === 'more' && 'more 스타일 — 더보기 패턴에 사용합니다.'}
          </Collapse>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── ShowMore ──────────────────────────────────────────────────────────────────

/** variant="more" — 목록 일부를 먼저 보여주고 클릭 시 나머지를 펼칩니다. */
export const ShowMore: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const items = [
      { id: 1, name: 'nginx', status: '정상' },
      { id: 2, name: 'apache', status: '정상' },
      { id: 3, name: 'mysql', status: '경고' },
      { id: 4, name: 'redis', status: '정상' },
      { id: 5, name: 'mongodb', status: '오류' },
      { id: 6, name: 'rabbitmq', status: '정상' },
    ]
    const itemStyle = {
      padding: '8px 0',
      borderBottom: `1px solid ${vars.color.border}`,
      fontSize: 12,
      display: 'flex',
      justifyContent: 'space-between' as const,
    }
    return (
      <div style={{ maxWidth: 320 }}>
        {items.slice(0, 3).map((item) => (
          <div key={item.id} style={itemStyle}>
            <span>{item.name}</span>
            <span style={{ color: item.status === '정상' ? vars.color.success : vars.color.error }}>{item.status}</span>
          </div>
        ))}
        <Collapse variant="more" header={open ? '접기' : '더보기'} open={open} onOpenChange={setOpen}>
          {items.slice(3).map((item) => (
            <div key={item.id} style={itemStyle}>
              <span>{item.name}</span>
              <span style={{ color: item.status === '정상' ? vars.color.success : vars.color.error }}>
                {item.status}
              </span>
            </div>
          ))}
        </Collapse>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
