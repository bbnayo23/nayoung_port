import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Dropdown } from './Dropdown'
import type { DropdownItem } from './Dropdown'

const items: DropdownItem[] = [
  { label: 'fw', value: 'fw' },
  { label: 'system', value: 'system' },
  { label: 'ips', value: 'ips' },
  { label: 'tms', value: 'tms' },
  { label: 'uncategorized', value: 'uncategorized' },
  { label: 'waf', value: 'waf' },
]

const itemsWithAll: DropdownItem[] = [
  { label: '전체', value: '__all__' },
  { type: 'divider', key: 'all-divider' },
  ...items,
]

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 250 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items,
    placeholder: '로그 유형',
  },
}

export const WithSearch: Story = {
  args: {
    items,
    placeholder: '로그 유형',
    searchable: true,
  },
}

export const Disabled: Story = {
  args: {
    items,
    placeholder: '로그 유형',
    disabled: true,
  },
}

export const WithDivider: Story = {
  args: { items: itemsWithAll },
  render: () => {
    const [value, setValue] = useState<string | undefined>('__all__')
    return (
      <div>
        <Dropdown items={itemsWithAll} value={value} onChange={setValue} placeholder="로그 유형" searchable />
        <p style={{ marginTop: 8, fontSize: 13 }}>선택값: {value ?? '(없음)'}</p>
      </div>
    )
  },
}

export const Interactive: Story = {
  args: { items },
  render: () => {
    const [value, setValue] = useState<string | undefined>()
    return (
      <div>
        <Dropdown items={items} value={value} onChange={setValue} placeholder="로그 유형" searchable />
        <p style={{ marginTop: 8, fontSize: 13 }}>선택값: {value ?? '(없음)'}</p>
      </div>
    )
  },
}
