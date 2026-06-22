import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldGroup } from './FieldGroup'
import { Select } from '../Select'
import { Input } from '../Input'

const meta = {
  title: 'Components/FieldGroup',
  component: FieldGroup,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof FieldGroup>

export default meta
type Story = StoryObj<typeof meta>

const logTypes = [
  { label: '전체', value: 'all' },
  { label: 'INFO', value: 'info' },
  { label: 'WARN', value: 'warn' },
  { label: 'ERROR', value: 'error' },
]

const logSources = [
  { label: '전체', value: 'all' },
  { label: 'fw', value: 'fw' },
  { label: 'ips', value: 'ips' },
  { label: 'waf', value: 'waf' },
]

export const WithDropdown: Story = {
  args: {
    label: '로그 유형',
    children: null,
  },
  render: () => {
    const [value, setValue] = useState('all')
    return (
      <FieldGroup label="로그 유형">
        <Select value={value} onValueChange={setValue} placeholder="선택">
          <Select.Trigger />
          <Select.Content>
            {logTypes.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select.Content>
        </Select>
      </FieldGroup>
    )
  },
}

export const WithMultipleDropdown: Story = {
  args: {
    label: '로그소스',
    children: null,
  },
  render: () => {
    const [values, setValues] = useState<string[]>([])
    const toggle = (v: string) =>
      setValues((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
    return (
      <FieldGroup label="로그소스">
        <div style={{ display: 'flex', gap: 8, padding: '0 8px', alignItems: 'center' }}>
          {logSources.map((item) => (
            <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={values.includes(item.value)}
                onChange={() => toggle(item.value)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </FieldGroup>
    )
  },
}

export const WithInput: Story = {
  args: {
    label: '검색어',
    children: null,
  },
  render: () => (
    <FieldGroup label="검색어">
      <Input placeholder="검색어를 입력하세요" />
    </FieldGroup>
  ),
}

export const DropdownAsLabel: Story = {
  args: {
    label: null,
    children: null,
  },
  render: () => {
    const [source, setSource] = useState('all')
    const [type, setType] = useState('all')
    return (
      <FieldGroup
        label={
          <Select value={source} onValueChange={setSource} placeholder="소스 선택">
            <Select.Trigger />
            <Select.Content>
              {logSources.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        }
      >
        <Select value={type} onValueChange={setType} placeholder="유형 선택">
          <Select.Trigger />
          <Select.Content>
            {logTypes.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select.Content>
        </Select>
      </FieldGroup>
    )
  },
}

export const Sizes: Story = {
  args: {
    label: '라벨',
    children: null,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <FieldGroup label="Small" size="sm">
        <Input size="sm" placeholder="sm" />
      </FieldGroup>
      <FieldGroup label="Medium" size="md">
        <Input size="md" placeholder="md" />
      </FieldGroup>
      <FieldGroup label="Large" size="lg">
        <Input size="lg" placeholder="lg" />
      </FieldGroup>
    </div>
  ),
}

export const MultipleFields: Story = {
  args: {
    label: '로그 검색',
    children: null,
  },
  render: () => {
    const [type, setType] = useState('all')
    const [source, setSource] = useState('all')
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <FieldGroup label="로그 유형">
          <Select value={type} onValueChange={setType} placeholder="선택">
            <Select.Trigger />
            <Select.Content>
              {logTypes.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </FieldGroup>
        <FieldGroup label="로그소스">
          <Select value={source} onValueChange={setSource} placeholder="선택">
            <Select.Trigger />
            <Select.Content>
              {logSources.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </FieldGroup>
      </div>
    )
  },
}
