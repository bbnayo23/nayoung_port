import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RelativeTimeInput } from './RelativeTimeInput'

const meta: Meta<typeof RelativeTimeInput> = {
  title: 'Components/RelativeTimeInput',
  component: RelativeTimeInput,
  argTypes: {
    isValid: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof RelativeTimeInput>

export const Default: Story = {
  args: { placeholder: '1h' },
}

export const WithValue: Story = {
  args: { value: '30m' },
}

export const Invalid: Story = {
  args: { value: 'abc', isValid: false },
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('1h')
    const isValid = /^\d+[smhd]$/.test(value)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <RelativeTimeInput value={value} onChange={setValue} isValid={isValid} placeholder="1h" />
        <span style={{ fontSize: 12 }}>
          {value.length === 0 ? '입력 없음' : isValid ? '유효한 값' : '유효하지 않음'}
        </span>
      </div>
    )
  },
}
