import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 체크박스 */
export const Default: Story = {
  args: {} as never,
  render: () => {
    const [checked, setChecked] = useState(false)
    return <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  },
}

/** 라벨 포함 */
export const WithLabel: Story = {
  args: {} as never,
  render: () => {
    const [checked, setChecked] = useState(false)
    return <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="이용약관에 동의합니다" />
  },
}

/** 사이즈 비교 */
export const Sizes: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Checkbox checkboxSize="sm" label="Small" defaultChecked />
      <Checkbox checkboxSize="md" label="Medium" defaultChecked />
      <Checkbox checkboxSize="lg" label="Large" defaultChecked />
    </div>
  ),
}

/** 비활성 */
export const Disabled: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Checkbox label="Unchecked" disabled />
      <Checkbox label="Checked" disabled defaultChecked />
    </div>
  ),
}

/** 에러 상태 */
export const Error: Story = {
  args: {} as never,
  render: () => <Checkbox label="필수 항목입니다" error />,
}
