import { useState } from 'react'
import type { MouseEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContextMenu } from './ContextMenu'
import type { ContextMenuItem } from './ContextMenu'

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

interface MenuDemoProps {
  items: ContextMenuItem[]
}

const MenuDemo = ({ items }: MenuDemoProps) => {
  const [state, setState] = useState({ open: false, x: 0, y: 0 })

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    setState({ open: true, x: e.clientX, y: e.clientY })
  }

  return (
    <div>
      <div
        onContextMenu={handleContextMenu}
        style={{
          width: 400,
          height: 200,
          border: '1px dashed #888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
        }}
      >
        우클릭으로 메뉴 열기
      </div>
      <ContextMenu
        open={state.open}
        x={state.x}
        y={state.y}
        items={items}
        onClose={() => setState((s) => ({ ...s, open: false }))}
      />
    </div>
  )
}

export const Default: Story = {
  args: {} as never,
  render: () => (
    <MenuDemo
      items={[
        { key: 'copy', label: '복사', onSelect: () => {} },
        { key: 'paste', label: '붙여넣기', onSelect: () => {} },
        { key: 'delete', label: '삭제', onSelect: () => {} },
      ]}
    />
  ),
}

export const WithDivider: Story = {
  args: {} as never,
  render: () => (
    <MenuDemo
      items={[
        { key: 'copy', label: '복사', onSelect: () => {} },
        { key: 'paste', label: '붙여넣기', onSelect: () => {} },
        { key: 'd1', label: '', onSelect: () => {}, divider: true },
        { key: 'delete', label: '삭제', onSelect: () => {} },
      ]}
    />
  ),
}

export const WithDisabled: Story = {
  args: {} as never,
  render: () => (
    <MenuDemo
      items={[
        { key: 'copy', label: '복사', onSelect: () => {} },
        { key: 'paste', label: '붙여넣기', onSelect: () => {}, disabled: true },
        { key: 'd1', label: '', divider: true },
        { key: 'delete', label: '삭제', onSelect: () => {} },
      ]}
    />
  ),
}

export const WithSubMenu: Story = {
  args: {} as never,
  render: () => (
    <MenuDemo
      items={[
        { key: 'copy', label: '복사', onSelect: () => {} },
        { key: 'copy-row', label: '행 복사', onSelect: () => {} },
        {
          key: 'condition',
          label: '조건 추가',
          children: [
            {
              key: 'include',
              label: '이 값으로 쿼리 추가',
              onSelect: () => {},
            },
            { key: 'exclude', label: '이 값 제외', onSelect: () => {} },
            { key: 'nested', label: '중첩검색으로 추가', onSelect: () => {} },
            { key: 'd1', label: '', divider: true },
            { key: 'detail', label: '상세 보기', onSelect: () => {} },
          ],
        },
      ]}
    />
  ),
}
