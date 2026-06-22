import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FilterPanel } from './FilterPanel'
import type { FilterPanelGroup } from './FilterPanel'

const groups: FilterPanelGroup[] = [
  {
    id: 'assetGroup',
    label: '자산 그룹',
    count: 1000,
    defaultExpanded: true,
    items: [
      { value: 'user', label: 'User', count: 100 },
      { value: 'device', label: 'Device', count: 100 },
      { value: 'network', label: 'Network', count: 100 },
      { value: 'system', label: 'System', count: 200 },
      { value: 'application', label: 'Application', count: 250 },
      { value: 'data', label: 'Data', count: 200 },
      { value: 'others', label: 'The Others', count: 50 },
    ],
  },
  {
    id: 'assetType',
    label: '자산 타입',
    count: 9999,
    items: [
      { value: 'server', label: 'Server', count: 4000 },
      { value: 'endpoint', label: 'Endpoint', count: 3000 },
      { value: 'cloud', label: 'Cloud', count: 2999 },
    ],
  },
  {
    id: 'assetName',
    label: '자산명',
    count: 9999,
    items: [
      { value: 'a1', label: 'asset-a1' },
      { value: 'a2', label: 'asset-a2' },
    ],
  },
  { id: 'assetId', label: '자산 ID', count: 9999, items: [] },
  { id: 'assetEnv', label: '자산 환경', count: 9999, items: [] },
  { id: 'solution', label: '연동 솔루션', count: 9999, items: [] },
  { id: 'cso', label: '보안등급(CSO)', count: 9999, items: [] },
]

const groupsNoCount: FilterPanelGroup[] = groups.map((g) => ({
  ...g,
  count: undefined,
  items: g.items.map((i) => ({ ...i, count: undefined })),
}))

const meta: Meta<typeof FilterPanel> = {
  title: 'Components/FilterPanel',
  component: FilterPanel,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 16, height: 640, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { groups },
}

export const NoCounts: Story = {
  args: { groups: groupsNoCount },
}

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    const [selected, setSelected] = useState<Record<string, string[]>>({})
    return (
      <FilterPanel
        groups={groups}
        selected={selected}
        onChange={setSelected}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
      />
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({
      assetGroup: ['user', 'device'],
    })
    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <FilterPanel groups={groups} selected={selected} onChange={setSelected} />
        <pre style={{ fontSize: 12 }}>{JSON.stringify(selected, null, 2)}</pre>
      </div>
    )
  },
}
