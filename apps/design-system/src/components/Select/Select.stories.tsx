import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const fruits = (
  <>
    <Select.Option value="apple">사과</Select.Option>
    <Select.Option value="banana">바나나</Select.Option>
    <Select.Option value="cherry">체리</Select.Option>
    <Select.Option value="grape">포도</Select.Option>
    <Select.Option value="melon">멜론</Select.Option>
  </>
)

export const Playground: Story = {
  args: { size: 'md', placeholder: '과일을 선택하세요' },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger />
      <Select.Content>{fruits}</Select.Content>
    </Select>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Select key={size} size={size} placeholder={`size: ${size}`}>
          <Select.Trigger />
          <Select.Content>{fruits}</Select.Content>
        </Select>
      ))}
    </div>
  ),
}

export const WithDefaultValue: Story = {
  args: { defaultValue: 'banana', placeholder: '과일을 선택하세요' },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger />
      <Select.Content>{fruits}</Select.Content>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Select disabled placeholder="비활성화됨">
        <Select.Trigger />
        <Select.Content>{fruits}</Select.Content>
      </Select>
      <Select defaultValue="apple" placeholder="과일">
        <Select.Trigger />
        <Select.Content>
          <Select.Option value="apple">사과</Select.Option>
          <Select.Option value="banana" disabled>
            바나나 (품절)
          </Select.Option>
          <Select.Option value="cherry">체리</Select.Option>
        </Select.Content>
      </Select>
    </div>
  ),
}

function SelectControlledDemo() {
  const [value, setValue] = useState('cherry')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={() => setValue('apple')}>
          사과로 설정
        </button>
        <button type="button" onClick={() => setValue('grape')}>
          포도로 설정
        </button>
      </div>
      <Select value={value} onValueChange={setValue} placeholder="과일을 선택하세요">
        <Select.Trigger />
        <Select.Content>{fruits}</Select.Content>
      </Select>
      <p style={{ fontSize: 14 }}>현재 값: {value}</p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <SelectControlledDemo />,
}
