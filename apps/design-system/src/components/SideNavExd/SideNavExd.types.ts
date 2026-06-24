import type { ReactNode } from 'react'
import type { MenuItem } from '../SideMenuBar/SideMenuBar.types'

export interface SideNavExdProps {
  menuGroup?: MenuItem[]
  activeKey?: string
  onActiveChange?: (key: string) => void
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  hidden?: boolean
  onHidden?: (hidden: boolean) => void
  header?: ReactNode
  aiChatSlot?: ReactNode
}
