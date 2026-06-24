import type { ReactNode } from 'react'

export interface ContextMenuItem {
  key: string
  label: string
  icon?: ReactNode
  disabled?: boolean
  divider?: boolean
  onSelect?: () => void
  children?: ContextMenuItem[]
}

export interface ContextMenuProps {
  open: boolean
  x: number
  y: number
  items: ContextMenuItem[]
  onClose: () => void
}
