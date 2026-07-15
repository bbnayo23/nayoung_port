import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import { Popover } from '@dc/components/Popover'
import type { PopoverProps } from '@dc/components/Popover'

const meta = {
  title: 'StyleGuide/Popover',
  component: Popover,
  parameters: { layout: 'padded' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'] satisfies PopoverProps['placement'][],
      description: '팝오버 표시 방향',
      table: { category: 'Appearance' },
    },
    arrow: {
      control: 'boolean',
      description: '화살표 표시 여부',
      table: { category: 'Appearance' },
    },
    closeButton: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 — 클릭해도 팝오버가 열리지 않습니다',
      table: { category: 'State' },
    },
    portal: {
      control: 'boolean',
      description: 'Portal(document.body)로 렌더 여부',
      table: { category: 'Behavior' },
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: '외부 클릭 시 닫기',
      table: { category: 'Behavior' },
    },
    title: {
      control: 'text',
      description: '팝오버 제목',
      table: { category: 'Content' },
    },
    content: { table: { disable: true } },
    children: { table: { disable: true } },
    onVisibleChange: { table: { disable: true } },
    onClick: { table: { disable: true } },
    visible: { table: { disable: true } },
  },
  args: {
    placement: 'top',
    arrow: true,
    closeButton: false,
    disabled: false,
    portal: true,
    closeOnOutsideClick: true,
    title: '팝오버 제목',
    content: '팝오버 내용이 여기에 표시됩니다.',
    children: '트리거',
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

const TriggerButton = ({ children }: { children: string }) => (
  <button
    type="button"
    style={{
      padding: '6px 14px',
      fontSize: 13,
      border: `1px solid ${vars.color.border}`,
      borderRadius: 6,
      background: vars.color.surface,
      color: vars.color.text,
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

const PopContent = ({ text = '팝오버 내용이 여기에 표시됩니다.' }: { text?: string }) => (
  <p style={{ margin: 0, fontSize: 13, color: vars.color.textSecondary, lineHeight: 1.6 }}>{text}</p>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <Popover
          {...args}
          visible={visible}
          onVisibleChange={setVisible}
          content={<PopContent />}
          onClick={() => setVisible((v) => !v)}
        >
          <TriggerButton>팝오버 열기</TriggerButton>
        </Popover>
      </div>
    )
  },
}

// ── Placements ────────────────────────────────────────────────────────────────

/** 네 방향 placement 비교 */
export const Placements: Story = {
  render: () => {
    const [open, setOpen] = useState<string | null>(null)
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, auto)',
          gap: 12,
          justifyContent: 'center',
          padding: '60px 0',
        }}
      >
        {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
          <div key={placement} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Popover
              placement={placement}
              arrow
              visible={open === placement}
              onVisibleChange={(v) => setOpen(v ? placement : null)}
              content={<PopContent text={`placement="${placement}"`} />}
              onClick={() => setOpen((p) => (p === placement ? null : placement))}
            >
              <TriggerButton>{placement}</TriggerButton>
            </Popover>
            <Label>{`placement="${placement}"`}</Label>
          </div>
        ))}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithCloseButton ───────────────────────────────────────────────────────────

/** closeButton + title 조합 */
export const WithCloseButton: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <Popover
          placement="bottom"
          arrow
          closeButton
          title="경고"
          visible={visible}
          onVisibleChange={setVisible}
          content={<PopContent text="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?" />}
          onClick={() => setVisible((v) => !v)}
        >
          <TriggerButton>closeButton 팝오버</TriggerButton>
        </Popover>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── HoverTrigger ─────────────────────────────────────────────────────────────

/** 마우스를 올리면 팝오버가 열리고, 벗어나면 닫힙니다. */
export const HoverTrigger: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <Popover
          placement="top"
          arrow
          visible={visible}
          onVisibleChange={setVisible}
          content={<PopContent text="마우스를 올리면 표시됩니다." />}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <TriggerButton>호버 팝오버</TriggerButton>
        </Popover>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Disabled ──────────────────────────────────────────────────────────────────

/** 비활성화 상태에서는 팝오버가 열리지 않습니다. */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
      <Popover placement="top" arrow disabled visible={false} content={<PopContent />}>
        <TriggerButton>비활성화된 트리거</TriggerButton>
      </Popover>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
