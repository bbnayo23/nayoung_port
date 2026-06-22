import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ArboristTree } from './ArboristTree'
import type { TreeNodeData } from './ArboristTree'

// ─── 샘플 데이터 ──────────────────────────────────────────────────────────────

const SAMPLE_NODES: TreeNodeData[] = [
  {
    value: 1,
    label: '프론트엔드',
    name: '프론트엔드',
    dataType: 'GROUP',
    children: [
      {
        value: 11,
        label: 'React',
        name: 'React',
        dataType: 'FILE',
        count: 12,
      },
      {
        value: 12,
        label: 'TypeScript',
        name: 'TypeScript',
        dataType: 'FILE',
        count: 8,
      },
      {
        value: 13,
        label: '컴포넌트',
        name: '컴포넌트',
        dataType: 'GROUP',
        children: [
          {
            value: 131,
            label: 'Button',
            name: 'Button',
            dataType: 'FILE',
          },
          {
            value: 132,
            label: 'Input',
            name: 'Input',
            dataType: 'FILE',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 2,
    label: '백엔드',
    name: '백엔드',
    dataType: 'GROUP',
    children: [
      {
        value: 21,
        label: 'Node.js',
        name: 'Node.js',
        dataType: 'FILE',
      },
      {
        value: 22,
        label: 'PostgreSQL',
        name: 'PostgreSQL',
        dataType: 'FILE',
        count: 5,
      },
    ],
  },
  {
    value: 3,
    label: '설계 문서',
    name: '설계 문서',
    dataType: 'FILE',
  },
]

const CHECKBOX_NODES: TreeNodeData[] = SAMPLE_NODES.map((n) => ({
  ...n,
  showCheckbox: true,
  children: n.children?.map((c) => ({
    ...c,
    showCheckbox: true,
    children: c.children?.map((gc) => ({ ...gc, showCheckbox: true })),
  })),
}))

// ─── 메타 ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ArboristTree> = {
  title: 'Components/ArboristTree',
  component: ArboristTree,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checkType: {
      control: 'inline-radio',
      options: ['click', 'single', 'multi'],
    },
    isExpandAll: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    enableSearchArea: { control: 'boolean' },
    hideTitleArea: { control: 'boolean' },
  },
  args: {
    nodes: SAMPLE_NODES,
    checkType: 'click',
    isExpandAll: true,
    noBorder: false,
    isLoading: false,
    enableSearchArea: true,
    hideTitleArea: false,
    searchPlaceholder: 'Search...',
  },
}

export default meta
type Story = StoryObj<typeof ArboristTree>

// ─── 스토리 ───────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 320, height: 320 }}>
      <ArboristTree {...args} />
    </div>
  ),
}

export const WithTitle: Story = {
  args: { title: '파일 탐색기' },
  render: (args) => (
    <div style={{ width: 320, height: 320 }}>
      <ArboristTree {...args} />
    </div>
  ),
}

export const NoBorder: Story = {
  args: { noBorder: true, title: '테두리 없음' },
  render: (args) => (
    <div style={{ width: 320, height: 320 }}>
      <ArboristTree {...args} />
    </div>
  ),
}

export const FixedHeight: Story = {
  args: { height: 200, title: '고정 높이 200px' },
  render: (args) => (
    <div style={{ width: 320 }}>
      <ArboristTree {...args} />
    </div>
  ),
}

export const Loading: Story = {
  args: { isLoading: true },
  render: (args) => (
    <div style={{ width: 320, height: 200 }}>
      <ArboristTree {...args} />
    </div>
  ),
}

/** 단일 선택 체크박스 모드 */
export const SingleCheckbox: Story = {
  render: (args) => {
    const [checked, setChecked] = useState<(string | number)[]>([])
    return (
      <div style={{ width: 320, height: 320 }}>
        <ArboristTree
          {...args}
          nodes={CHECKBOX_NODES}
          checkType="single"
          checkedSeqList={checked}
          handleCheckedSeq={(list) => setChecked(list)}
          title="단일 선택"
        />
      </div>
    )
  },
}

/** 다중 선택 체크박스 모드 */
export const MultiCheckbox: Story = {
  render: (args) => {
    const [checked, setChecked] = useState<(string | number)[]>([])
    return (
      <div style={{ width: 320, height: 320 }}>
        <ArboristTree
          {...args}
          nodes={CHECKBOX_NODES}
          checkType="multi"
          checkedSeqList={checked}
          handleCheckedSeq={(list) => setChecked(list)}
          title={`다중 선택 (${checked.length}개 선택됨)`}
        />
      </div>
    )
  },
}

/** 컨트롤드 검색 */
export const ControlledSearch: Story = {
  render: (args) => {
    const [search, setSearch] = useState('')
    return (
      <div style={{ width: 320 }}>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>
          외부 검색어: <strong>{search || '(없음)'}</strong>
        </p>
        <div style={{ height: 280 }}>
          <ArboristTree
            {...args}
            searchValue={search}
            onSearchChange={setSearch}
            title="컨트롤드 검색"
          />
        </div>
      </div>
    )
  },
}
