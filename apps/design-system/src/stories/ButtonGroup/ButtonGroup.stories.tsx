import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { vars } from '@dc/theme/contract.css'
import ButtonGroup from '@dc/components/ButtonGroup'

const meta = {
  title: 'StyleGuide/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '버튼 그룹 스타일',
      table: { category: 'Appearance' },
    },
  },
  args: {
    variant: 'primary',
    children: null,
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code
    style={{
      display: 'inline-block',
      marginBottom: 6,
      fontSize: 11,
      fontFamily: 'monospace',
      color: vars.color.textSecondary,
    }}
  >
    {children}
  </code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 variant를 변경합니다. */
export const Playground: Story = {
  render: (args) => {
    const [active, setActive] = useState(0)
    return (
      <ButtonGroup {...args}>
        {['옵션 A', '옵션 B', '옵션 C'].map((label, i) => (
          <ButtonGroup.Item key={i} active={active === i} onClick={() => setActive(i)}>
            {label}
          </ButtonGroup.Item>
        ))}
      </ButtonGroup>
    )
  },
}

// ── Variants ──────────────────────────────────────────────────────────────────

/** primary(탭 형식) · secondary(토글 형식) 두 가지 variant를 비교합니다. */
export const Variants: Story = {
  render: () => {
    const [activePrimary, setActivePrimary] = useState(0)
    const [activeSecondary, setActiveSecondary] = useState(0)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Label>primary — 슬라이더 탭 형식</Label>
          <ButtonGroup variant="primary">
            {['옵션 A', '옵션 B', '옵션 C'].map((label, i) => (
              <ButtonGroup.Item key={i} active={activePrimary === i} onClick={() => setActivePrimary(i)}>
                {label}
              </ButtonGroup.Item>
            ))}
          </ButtonGroup>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Label>secondary — 토글 버튼 형식</Label>
          <ButtonGroup variant="secondary">
            {['선택됨', '항목 2', '항목 3'].map((label, i) => (
              <ButtonGroup.Item key={i} active={activeSecondary === i} onClick={() => setActiveSecondary(i)}>
                {label}
              </ButtonGroup.Item>
            ))}
          </ButtonGroup>
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithDisabled ───────────────────────────────────────────────────────────────

/** 일부 항목을 disabled 처리하는 패턴 */
export const WithDisabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label>primary</Label>
        <ButtonGroup variant="primary">
          <ButtonGroup.Item active>활성</ButtonGroup.Item>
          <ButtonGroup.Item>일반</ButtonGroup.Item>
          <ButtonGroup.Item disabled>비활성</ButtonGroup.Item>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label>secondary</Label>
        <ButtonGroup variant="secondary">
          <ButtonGroup.Item active>활성</ButtonGroup.Item>
          <ButtonGroup.Item>일반</ButtonGroup.Item>
          <ButtonGroup.Item disabled>비활성</ButtonGroup.Item>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
