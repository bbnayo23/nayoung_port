import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { MultipleDropdown } from './MultipleDropdown'
import type { DropdownItem } from '../Dropdown/Dropdown'

const items: DropdownItem[] = [
  { label: 'fw', value: 'fw' },
  { label: 'system', value: 'system' },
  { label: 'ips', value: 'ips' },
  { label: 'tms', value: 'tms' },
  { label: 'uncategorized', value: 'uncategorized' },
  { label: 'waf', value: 'waf' },
]

const meta: Meta<typeof MultipleDropdown> = {
  title: 'Components/MultipleDropdown',
  component: MultipleDropdown,
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

export const Interactive: Story = {
  args: { items },
  render: () => {
    const [values, setValues] = useState<string[]>([])
    return (
      <div>
        <MultipleDropdown items={items} values={values} onChange={setValues} placeholder="로그 유형" searchable />
        <p style={{ marginTop: 8, fontSize: 13 }}>선택값: {values.length > 0 ? values.join(', ') : '(없음)'}</p>
      </div>
    )
  },
}
