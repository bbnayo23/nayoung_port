import {
  forwardRef,
  type PropsWithChildren,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  type MouseEvent,
  type KeyboardEvent,
} from 'react'
import {
  styledSideMenuBar,
  styledSideMenuBarHeader,
  styledSideMenuBarBody,
  styledSideMenuBarItem,
  styledSideMenuBarFooter,
  styledSideMenuBarGroupLabel,
  styledSubMenuItem,
  styledDivider,
} from './SideMenuBar.css'
import type { SideMenuBarProps, MenuItem } from './SideMenuBar.types'
import { XdrChevronRightIcon, XdrChevronLeftIcon, ExdExternalLinkIcon } from '@port/icon-library'
import cn from 'classnames'

const STORAGE_KEY = 'igloo-side-menu-bar-collapsed'

const SideMenuBarContext = createContext<{
  collapsed: boolean
  activeKey: string
  setActiveKey: (key: string) => void
  setHoverExpanded: (expanded: boolean) => void
  hoverExpanded: boolean
  onCollapse?: (collapsed: boolean) => void
}>({
  collapsed: false,
  activeKey: '',
  setActiveKey: () => {},
  setHoverExpanded: () => {},
  hoverExpanded: false,
  onCollapse: () => {},
})

const SideMenuBarItem = ({ menuItem, depth = 1, ...rest }: { menuItem: MenuItem; depth: number }) => {
  const { key, icon, label, children, target, onClick, url, showDivider, badge, tooltip, type } = menuItem
  const [isExpanded, setIsExpanded] = useState(true)
  const { collapsed, activeKey, setActiveKey, hoverExpanded, setHoverExpanded, onCollapse } =
    useContext(SideMenuBarContext)

  const effectiveCollapsed = collapsed && !hoverExpanded
  const hasChildren = !effectiveCollapsed && children !== undefined
  const hasExpandedChildren = hasChildren && isExpanded
  const isActive = activeKey === key

  // group label — non-interactive section header
  if (type === 'group') {
    return (
      <li className={styledSideMenuBarGroupLabel} aria-hidden="true">
        {label}
      </li>
    )
  }

  const handleMenuItemClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    } else {
      if (collapsed) {
        onCollapse?.(false)
        setHoverExpanded(false)
      }
      onClick?.(e)
      setActiveKey(key)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleMenuItemClick(e as unknown as MouseEvent<HTMLAnchorElement>)
    }
  }

  const badgeLabel = badge !== undefined ? (badge > 99 ? '99+' : String(badge)) : null
  const tooltipText = effectiveCollapsed ? (tooltip ?? label) : undefined

  return (
    <>
      <li className={styledSideMenuBarItem} data-depth={depth} data-collapsed={effectiveCollapsed} {...rest}>
        <a
          className={cn('menu-item-wrapper', isActive && 'is-active')}
          href={url}
          onClick={handleMenuItemClick}
          onKeyDown={handleKeyDown}
          aria-current={isActive ? 'page' : undefined}
          title={tooltipText}
          role="menuitem"
          tabIndex={0}
        >
          {icon && <span className="menu-item-icon">{icon}</span>}
          <span className="menu-item-text">{label}</span>
          {badgeLabel !== null && (
            <span className="menu-item-badge" aria-label={`알림 ${badgeLabel}개`}>
              {badgeLabel}
            </span>
          )}
          {hasChildren && (
            <span className={cn('menu-item-arrow', isExpanded && 'expanded')}>
              <XdrChevronRightIcon size={14} />
            </span>
          )}
          {target && (
            <span className="menu-item-external">{target === '_blank' && <ExdExternalLinkIcon size={16} />}</span>
          )}
        </a>
        {hasExpandedChildren &&
          children.map((childMenuItem) => (
            <ul key={childMenuItem.key} className={cn(styledSubMenuItem, 'sub-menu-item')} role="menu">
              <SideMenuBarItem menuItem={childMenuItem} depth={depth + 1} />
            </ul>
          ))}
      </li>
      {showDivider && <hr className={styledDivider} />}
    </>
  )
}

// Main: SideMenuBar
const SideMenuBar = forwardRef<HTMLDivElement, PropsWithChildren<SideMenuBarProps>>((props, ref) => {
  const {
    header,
    footer,
    className,
    style,
    position = 'left',
    showCollapseButton = true,
    collapsed = true,
    onCollapse,
    menuGroup = [],
    activeKey,
    onActiveChange,
    ...rest
  } = props
  const CollapseIcon = XdrChevronLeftIcon
  const ExpandIcon = XdrChevronRightIcon
  const [hoverExpanded, setHoverExpanded] = useState(false)
  const bodyRef = useRef<HTMLUListElement>(null)

  // Persist collapse state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(collapsed))
    } catch {
      /* ignore */
    }
  }, [collapsed])

  const handleToggleCollapse = () => {
    onCollapse?.(!collapsed)
    setHoverExpanded(false)
  }

  const handleActiveKeyChange = (key: string) => {
    onActiveChange?.(key)
  }

  const handleSidebarMouseLeave = () => {
    if (collapsed) {
      setHoverExpanded(false)
    }
  }

  const handleBodyMouseEnter = () => {
    if (collapsed) {
      setHoverExpanded(true)
    }
  }

  // Keyboard navigation: ↑↓ traverse items, ←/→ collapse/expand
  const handleBodyKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (!bodyRef.current) return
    const items = Array.from(bodyRef.current.querySelectorAll<HTMLElement>('.menu-item-wrapper'))
    const idx = items.indexOf(document.activeElement as HTMLElement)

    switch (e.key) {
      case 'ArrowDown':
        items[Math.min(idx + 1, items.length - 1)]?.focus()
        e.preventDefault()
        break
      case 'ArrowUp':
        items[Math.max(idx - 1, 0)]?.focus()
        e.preventDefault()
        break
      case 'ArrowLeft':
        if (!collapsed) {
          onCollapse?.(true)
          e.preventDefault()
        }
        break
      case 'ArrowRight':
        if (collapsed) {
          onCollapse?.(false)
          e.preventDefault()
        }
        break
    }
  }

  const effectiveCollapsed = collapsed && !hoverExpanded

  return (
    <SideMenuBarContext.Provider
      value={{
        collapsed,
        activeKey,
        setActiveKey: handleActiveKeyChange,
        setHoverExpanded,
        hoverExpanded,
        onCollapse,
      }}
    >
      <div
        ref={ref}
        className={cn(styledSideMenuBar, 'side-menu-bar', effectiveCollapsed && 'collapsed', className)}
        style={style}
        onMouseLeave={handleSidebarMouseLeave}
        data-position={position}
        {...rest}
      >
        <div className={cn(styledSideMenuBarHeader, 'side-menu-bar-header')}>
          {header}
          {showCollapseButton && (
            <button
              type="button"
              className="header-collapse-btn"
              onClick={handleToggleCollapse}
              aria-label={collapsed ? '메뉴 펼치기' : '메뉴 접기'}
            >
              {collapsed ? <ExpandIcon size={14} /> : <CollapseIcon size={14} />}
            </button>
          )}
        </div>
        <ul
          ref={bodyRef}
          className={cn(styledSideMenuBarBody, 'side-menu-bar-body')}
          role="menu"
          onMouseEnter={handleBodyMouseEnter}
          onKeyDown={handleBodyKeyDown}
        >
          {menuGroup.map((item) => (
            <SideMenuBarItem key={item.key} menuItem={item} depth={1} />
          ))}
        </ul>
        {footer}
      </div>
    </SideMenuBarContext.Provider>
  )
})

// Section: SideMenuBar
const SideMenuBarHeader = forwardRef<HTMLDivElement, PropsWithChildren>(({ children, ...rest }, ref) => (
  <div ref={ref} className={cn(styledSideMenuBarHeader, 'side-menu-bar-header')} {...rest}>
    {children}
  </div>
))

const SideMenuBarFooter = forwardRef<HTMLDivElement, PropsWithChildren>(({ children, ...rest }, ref) => (
  <div ref={ref} className={styledSideMenuBarFooter} {...rest}>
    {children}
  </div>
))

SideMenuBar.displayName = 'SideMenuBar'
SideMenuBarHeader.displayName = 'SideMenuBar.Header'
SideMenuBarItem.displayName = 'SideMenuBar.Item'
SideMenuBarFooter.displayName = 'SideMenuBar.Footer'

const SideMenuBarWithSections = Object.assign(SideMenuBar, {
  Header: SideMenuBarHeader,
  Item: SideMenuBarItem,
  Footer: SideMenuBarFooter,
})

export default SideMenuBarWithSections

/** localStorage에서 접힘 초기값을 읽어옵니다. */
export const getStoredCollapsed = (defaultValue = true): boolean => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored !== null ? stored === 'true' : defaultValue
  } catch {
    return defaultValue
  }
}
