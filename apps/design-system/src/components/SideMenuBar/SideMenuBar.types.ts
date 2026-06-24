import type { ReactNode, MouseEvent, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface MenuItem {
  key: string
  label: string
  type?: 'item' | 'group'
  icon?: ReactNode
  children?: MenuItem[]
  isActive?: boolean
  badge?: number
  tooltip?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  url?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  showDivider?: boolean
}

export interface SideMenuBarProps extends CommonProps {
  header?: ReactNode
  footer?: ReactNode
  position?: 'left' | 'right'
  showCollapseButton?: boolean
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  menuGroup: MenuItem[]
  activeKey: string
  onActiveChange?: (key: string) => void
}
