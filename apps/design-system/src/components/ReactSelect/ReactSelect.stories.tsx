import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReactSelect } from './ReactSelect'
import { ReactMultiSelect } from './ReactMultiSelect'

const meta: Meta<typeof ReactSelect> = {
  title: 'Components/ReactSelect',
  component: ReactSelect,
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ReactSelect>

const fruitOptions = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '체리', value: 'cherry' },
  { label: '포도', value: 'grape' },
  { label: '멜론', value: 'melon' },
]

export const Playground: Story = {
  args: {
    size: 'md',
    placeholder: '과일을 선택하세요',
  },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined)
    return <ReactSelect<string> {...args} options={fruitOptions} value={value} onChange={setValue} />
  },
}

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string | undefined>>({})
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <ReactSelect
            key={size}
            size={size}
            placeholder={`size: ${size}`}
            options={fruitOptions}
            value={values[size]}
            onChange={(v) => setValues((prev) => ({ ...prev, [size]: v }))}
          />
        ))}
      </div>
    )
  },
}

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined)
    return (
      <ReactSelect
        options={fruitOptions}
        value={value}
        onChange={setValue}
        searchable
        placeholder="검색하여 선택하세요"
      />
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <ReactSelect
        options={fruitOptions}
        placeholder="비활성화됨"
        disabled
        onChange={() => undefined}
      />
      <ReactSelect
        options={[
          { label: '사과', value: 'apple' },
          { label: '바나나 (품절)', value: 'banana', disabled: true },
          { label: '체리', value: 'cherry' },
        ]}
        value="apple"
        placeholder="과일"
        onChange={() => undefined}
      />
    </div>
  ),
}

export const WithTypeLabel: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined)
    return (
      <ReactSelect
        options={[
          { label: '기획', value: 'plan', optionData: { type: 'PM' } },
          { label: '개발', value: 'dev', optionData: { type: 'FE' } },
          { label: '디자인', value: 'design', optionData: { type: 'UX' } },
        ]}
        value={value}
        onChange={setValue}
        typeKey="type"
        typePosition="right"
        placeholder="역할을 선택하세요"
      />
    )
  },
}

// ─── MultiSelect stories ──────────────────────────────────────────────────────

export const MultiSelectPlayground: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ReactMultiSelect
          options={fruitOptions}
          value={values}
          onChange={setValues}
          placeholder="과일을 선택하세요 (복수)"
        />
        <p style={{ fontSize: 14 }}>선택된 값: {values.join(', ') || '없음'}</p>
      </div>
    )
  },
}

export const MultiSelectSizes: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string[]>>({ sm: [], md: [], lg: [] })
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <ReactMultiSelect
            key={size}
            size={size}
            placeholder={`size: ${size}`}
            options={fruitOptions}
            value={values[size]}
            onChange={(v) => setValues((prev) => ({ ...prev, [size]: v }))}
          />
        ))}
      </div>
    )
  },
}
