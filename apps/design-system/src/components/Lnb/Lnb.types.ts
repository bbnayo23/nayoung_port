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

export interface LnbProps extends CommonProps {
  header?: ReactNode
  footer?: ReactNode
  position?: 'left' | 'right'
  /** 하단 컨트롤 바(접기/펼치기 · 전체화면) 표시 여부 */
  showControls?: boolean
  /** 하단 접기/펼치기 버튼 표시 여부 */
  showCollapseButton?: boolean
  /** 하단 전체화면 버튼 표시 여부 */
  showFullscreenButton?: boolean
  /** 전체화면 버튼 클릭 콜백 */
  onFullscreen?: () => void
  /** 접힘 상태에서 메뉴 본문 hover 시 자동으로 펼침(오버레이) 여부. 기본 true. false 면 hover 로 열리지 않는다. */
  expandOnHover?: boolean
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  menuGroup: MenuItem[]
  activeKey: string
  onActiveChange?: (key: string) => void
}
