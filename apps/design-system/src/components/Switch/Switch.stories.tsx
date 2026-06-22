import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 스위치 */
export const Default: Story = {
  args: {} as never,
  render: () => {
    const [checked, setChecked] = useState(false)
    return <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  },
}

/** 라벨 포함 */
export const WithLabel: Story = {
  args: {} as never,
  render: () => {
    const [checked, setChecked] = useState(false)
    return <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} label="알림 수신" />
  },
}

/** 사이즈 비교 */
export const Sizes: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Switch switchSize="sm" label="Small" defaultChecked />
      <Switch switchSize="md" label="Medium" defaultChecked />
      <Switch switchSize="lg" label="Large" defaultChecked />
    </div>
  ),
}

/** 비활성 */
export const Disabled: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Switch label="Off" disabled />
      <Switch label="On" disabled defaultChecked />
    </div>
  ),
}
