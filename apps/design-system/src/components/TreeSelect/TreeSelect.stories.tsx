import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { TreeNodeData } from '../ArboristTree'
import { TreeSelect } from './TreeSelect'

const sampleTree: TreeNodeData[] = [
  {
    value: 'frontend',
    label: '프론트엔드',
    children: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  {
    value: 'backend',
    label: '백엔드',
    children: [
      { value: 'node', label: 'Node.js' },
      {
        value: 'java',
        label: 'Java',
        children: [
          { value: 'spring', label: 'Spring Boot' },
          { value: 'quarkus', label: 'Quarkus' },
        ],
      },
    ],
  },
  {
    value: 'devops',
    label: 'DevOps',
    children: [
      { value: 'docker', label: 'Docker' },
      { value: 'k8s', label: 'Kubernetes' },
    ],
  },
]

const meta: Meta<typeof TreeSelect> = {
  title: 'Components/TreeSelect',
  component: TreeSelect,
  args: {
    treeList: sampleTree,
    placeholder: '선택하세요',
    size: 'md',
    disabled: false,
    searchable: true,
    treeHeight: 300,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TreeSelect>

// 단일 선택
export const SingleSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number | null>(null)
    return (
      <div style={{ width: 280 }}>
        <TreeSelect
          {...args}
          value={value}
          onChange={(node) => setValue(node.value)}
        />
      </div>
    )
  },
}

// 다중 선택
export const MultiSelect: Story = {
  render: (args) => {
    const [values, setValues] = useState<(string | number)[]>([])
    return (
      <div style={{ width: 280 }}>
        <TreeSelect
          {...args}
          multiSelect
          values={values}
          onMultiChange={(seqs) => setValues(seqs)}
        />
      </div>
    )
  },
}

// 크기 비교
export const Sizes: Story = {
  render: (args) => {
    const [smVal, setSmVal] = useState<string | number | null>(null)
    const [mdVal, setMdVal] = useState<string | number | null>(null)
    const [lgVal, setLgVal] = useState<string | number | null>(null)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
        <TreeSelect {...args} size="sm" value={smVal} onChange={(n) => setSmVal(n.value)} placeholder="Small" />
        <TreeSelect {...args} size="md" value={mdVal} onChange={(n) => setMdVal(n.value)} placeholder="Medium" />
        <TreeSelect {...args} size="lg" value={lgVal} onChange={(n) => setLgVal(n.value)} placeholder="Large" />
      </div>
    )
  },
}

// 비활성화
export const Disabled: Story = {
  args: { disabled: true, value: 'react' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <TreeSelect {...args} onChange={() => {}} />
    </div>
  ),
}

// 검색 없이
export const NoSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number | null>(null)
    return (
      <div style={{ width: 280 }}>
        <TreeSelect
          {...args}
          searchable={false}
          value={value}
          onChange={(node) => setValue(node.value)}
        />
      </div>
    )
  },
}
