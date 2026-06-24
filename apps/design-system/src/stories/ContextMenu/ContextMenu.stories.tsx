import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ExdCogIcon, ExdTrashIcon, ExdEditIcon } from '@port/icon-library'
import { ContextMenu } from '../../components/ContextMenu'
import type { ContextMenuItem } from '../../components/ContextMenu'

const meta = {
  title: 'StyleGuide/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'padded' },
  args: {
    open: false,
    x: 0,
    y: 0,
    items: [],
    onClose: () => {},
  },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

const BASIC_ITEMS: ContextMenuItem[] = [
  { key: 'edit', label: '편집', icon: <ExdEditIcon size={14} />, onSelect: () => alert('편집') },
  { key: 'settings', label: '설정', icon: <ExdCogIcon size={14} />, onSelect: () => alert('설정') },
  { key: 'div1', label: '', divider: true },
  { key: 'delete', label: '삭제', icon: <ExdTrashIcon size={14} />, onSelect: () => alert('삭제') },
]

export const Playground: Story = {
  render: () => {
    const [menu, setMenu] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 })

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault()
      setMenu({ open: true, x: e.clientX, y: e.clientY })
    }

    return (
      <div
        onContextMenu={handleContextMenu}
        style={{
          width: '100%',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ccc',
          borderRadius: 8,
          fontSize: 14,
          color: '#999',
          userSelect: 'none',
        }}
      >
        우클릭으로 컨텍스트 메뉴를 열어보세요
        <ContextMenu
          open={menu.open}
          x={menu.x}
          y={menu.y}
          items={BASIC_ITEMS}
          onClose={() => setMenu((p) => ({ ...p, open: false }))}
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const WithSubMenu: Story = {
  render: () => {
    const [menu, setMenu] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 })
    const [log, setLog] = useState<string[]>([])

    const items: ContextMenuItem[] = [
      { key: 'view', label: '보기', onSelect: () => setLog((p) => ['보기 클릭', ...p]) },
      {
        key: 'export',
        label: '내보내기',
        children: [
          { key: 'csv', label: 'CSV', onSelect: () => setLog((p) => ['CSV 내보내기', ...p]) },
          { key: 'xlsx', label: 'Excel', onSelect: () => setLog((p) => ['Excel 내보내기', ...p]) },
          { key: 'json', label: 'JSON', onSelect: () => setLog((p) => ['JSON 내보내기', ...p]) },
        ],
      },
      { key: 'div1', label: '', divider: true },
      { key: 'delete', label: '삭제', onSelect: () => setLog((p) => ['삭제 클릭', ...p]) },
    ]

    return (
      <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
        <div
          onContextMenu={(e) => {
            e.preventDefault()
            setMenu({ open: true, x: e.clientX, y: e.clientY })
          }}
          style={{
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #ccc',
            borderRadius: 8,
            fontSize: 14,
            color: '#999',
            userSelect: 'none',
          }}
        >
          우클릭 → "내보내기"에 서브메뉴가 있습니다
        </div>
        <ContextMenu
          open={menu.open}
          x={menu.x}
          y={menu.y}
          items={items}
          onClose={() => setMenu((p) => ({ ...p, open: false }))}
        />
        <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace', minHeight: 48 }}>
          {log.length === 0 ? '— 항목을 클릭해보세요' : log.slice(0, 5).map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const WithDisabledItems: Story = {
  render: () => {
    const [menu, setMenu] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 })

    const items: ContextMenuItem[] = [
      { key: 'edit', label: '편집', onSelect: () => alert('편집') },
      { key: 'copy', label: '복사 (비활성)', disabled: true, onSelect: () => alert('복사') },
      { key: 'div1', label: '', divider: true },
      { key: 'delete', label: '삭제 (비활성)', disabled: true, onSelect: () => alert('삭제') },
      { key: 'cancel', label: '취소', onSelect: () => alert('취소') },
    ]

    return (
      <>
        <div
          onContextMenu={(e) => {
            e.preventDefault()
            setMenu({ open: true, x: e.clientX, y: e.clientY })
          }}
          style={{
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #ccc',
            borderRadius: 8,
            fontSize: 14,
            color: '#999',
            userSelect: 'none',
          }}
        >
          우클릭 — 일부 항목이 비활성화되어 있습니다
        </div>
        <ContextMenu
          open={menu.open}
          x={menu.x}
          y={menu.y}
          items={items}
          onClose={() => setMenu((p) => ({ ...p, open: false }))}
        />
      </>
    )
  },
  parameters: { controls: { disable: true } },
}
