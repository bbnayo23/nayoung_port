import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { vars } from '../../theme/contract.css'
import { Tooltip } from '../../components/Tooltip'

const meta = {
  title: 'StyleGuide/Tooltip',
  component: Tooltip,
  parameters: { layout: 'padded' },
  argTypes: {
    content: {
      control: 'text',
      description: '툴팁에 표시할 내용',
      table: { category: 'Content' },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: '툴팁 위치',
      table: { category: 'Appearance' },
    },
    portal: {
      control: 'boolean',
      description: 'Portal 사용 여부',
      table: { category: 'Behavior' },
    },
    open: {
      control: 'boolean',
      description: '강제 표시 여부 (제어형)',
      table: { category: 'State' },
    },
    onOpen: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onChangeShow: { table: { disable: true } },
    portalTarget: { table: { disable: true } },
    popperOptions: { table: { disable: true } },
  },
  args: {
    content: '툴팁 내용입니다',
    children: '마우스를 올려보세요',
    placement: 'top',
    portal: false,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

const TriggerBox = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      padding: '8px 16px',
      background: vars.color.surface,
      border: `1px solid ${vars.color.border}`,
      borderRadius: vars.radius.sm,
      fontSize: 13,
      color: vars.color.text,
      cursor: 'default',
      userSelect: 'none',
    }}
  >
    {children}
  </div>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
      <Tooltip {...args}>
        <TriggerBox>마우스를 올려보세요</TriggerBox>
      </Tooltip>
    </div>
  ),
}

// ── Placements ────────────────────────────────────────────────────────────────

/** 8가지 placement 방향을 한눈에 비교합니다. */
export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: 20,
        justifyContent: 'center',
        padding: 40,
      }}
    >
      {(['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'] as const).map(
        (placement) => (
          <div key={placement} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Tooltip content={`placement="${placement}"`} placement={placement}>
              <TriggerBox>{placement}</TriggerBox>
            </Tooltip>
            <Label>{placement}</Label>
          </div>
        ),
      )}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Content Types ─────────────────────────────────────────────────────────────

/** content prop에 string 또는 ReactNode를 전달할 수 있습니다. */
export const ContentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Tooltip content="단순 텍스트 툴팁" placement="top">
          <TriggerBox>String content</TriggerBox>
        </Tooltip>
        <Label>{'content=string'}</Label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Tooltip
          content={
            <div>
              <strong style={{ display: 'block', marginBottom: 4 }}>제목</strong>
              <span style={{ fontSize: 12 }}>ReactNode 형태의 상세 내용입니다.</span>
            </div>
          }
          placement="top"
        >
          <TriggerBox>ReactNode content</TriggerBox>
        </Tooltip>
        <Label>{'content=<ReactNode>'}</Label>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Controlled ────────────────────────────────────────────────────────────────

/** open prop으로 표시 여부를 외부에서 제어합니다. */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 40 }}>
        <Tooltip content="제어형 툴팁입니다" open={open} placement="top">
          <TriggerBox>타겟 요소</TriggerBox>
        </Tooltip>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={{
            padding: '6px 16px',
            background: vars.color.primary,
            color: '#fff',
            border: 'none',
            borderRadius: vars.radius.sm,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          {open ? '툴팁 닫기' : '툴팁 열기'}
        </button>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Portal ────────────────────────────────────────────────────────────────────

/** portal=true로 document.body에 렌더링하면 overflow:hidden 부모 컨테이너에서도 툴팁이 잘리지 않습니다. */
export const Portal: Story = {
  render: () => (
    <div
      style={{
        overflow: 'hidden',
        border: `1px dashed ${vars.color.border}`,
        borderRadius: vars.radius.sm,
        padding: 24,
        display: 'flex',
        gap: 24,
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Tooltip content="portal=false — overflow:hidden에 잘릴 수 있음" placement="top">
          <TriggerBox>portal=false</TriggerBox>
        </Tooltip>
        <Label>{'portal={false}'}</Label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Tooltip content="portal=true — document.body에 렌더링됨" placement="top" portal>
          <TriggerBox>portal=true</TriggerBox>
        </Tooltip>
        <Label>{'portal={true}'}</Label>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
