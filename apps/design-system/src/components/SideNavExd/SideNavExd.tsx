import { useState, createContext, useContext, type ReactNode } from 'react'
import {
  ExdChevronDownIcon,
  ExdBellIcon,
  ExdCogIcon,
  ExdCloseIcon,
  XdrDownloadIcon,
  ExdMoreSolutionIcon,
} from '@port/icon-library'
import type { SideNavExdProps } from './SideNavExd.types'
import type { MenuItem } from '../SideMenuBar/SideMenuBar.types'
import {
  exdNav,
  exdNavHeader,
  exdNavLogoIcon,
  exdNavLogoFull,
  exdNavBody,
  exdNavItem,
  exdNavRootRow,
  exdNavIcon,
  exdNavLabel,
  exdNavChevron,
  exdNavSubList,
  exdNavChildRow,
  exdNavFlyout,
  exdNavBottom,
  exdNavBtn,
  exdNavBtnLg,
  exdNavBtnGroup,
  exdNavBtnSpacer,
  exdNavBtnSmSpacer,
  exdNavBtnIconLeft,
  exdNavBtnIconRight,
  exdNavBtnIconSm,
  exdShowNavBtn,
} from './SideNavExd.css'
import cn from 'classnames'

// ── Context ──────────────────────────────────────────────────────────────────

interface SideNavExdCtxValue {
  collapsed: boolean
  activeKey: string
  onActiveChange: (key: string) => void
}

const SideNavExdCtx = createContext<SideNavExdCtxValue>({
  collapsed: false,
  activeKey: '',
  onActiveChange: () => {},
})

// ── Flyout (collapsed hover submenu) ─────────────────────────────────────────

const NavFlyout = ({ item }: { item: MenuItem }) => {
  const { activeKey, onActiveChange } = useContext(SideNavExdCtx)
  if (!item.children?.length) return null
  return (
    <div className={exdNavFlyout}>
      <div className="flyout-title">{item.label}</div>
      {item.children.map((child) => (
        <div
          key={child.key}
          className={cn('flyout-item', { 'is-active': activeKey === child.key })}
          onClick={() => onActiveChange(child.key)}
        >
          {child.label}
        </div>
      ))}
    </div>
  )
}

// ── Child row ────────────────────────────────────────────────────────────────

const NavChildItem = ({ item }: { item: MenuItem }) => {
  const { activeKey, onActiveChange } = useContext(SideNavExdCtx)
  return (
    <div
      className={cn(exdNavChildRow, { 'is-active': activeKey === item.key })}
      onClick={() => onActiveChange(item.key)}
    >
      {item.label}
    </div>
  )
}

// ── Root item ────────────────────────────────────────────────────────────────

const NavItem = ({ item }: { item: MenuItem }) => {
  const [open, setOpen] = useState(true)
  const { collapsed, activeKey, onActiveChange } = useContext(SideNavExdCtx)
  const ChevronIcon = ExdChevronDownIcon

  const hasChildren = Boolean(item.children?.length)
  const isActive = !hasChildren && activeKey === item.key
  const isParentActive =
    hasChildren && item.children!.some((c) => c.key === activeKey || c.children?.some((cc) => cc.key === activeKey))

  const handleClick = () => {
    if (hasChildren && !collapsed) {
      setOpen((prev) => !prev)
    } else if (!hasChildren) {
      onActiveChange(item.key)
    }
  }

  return (
    <div className={exdNavItem}>
      <div
        className={cn(exdNavRootRow, { 'is-active': isActive, 'is-parent-active': isParentActive })}
        onClick={handleClick}
      >
        {item.icon && <span className={exdNavIcon}>{item.icon}</span>}
        <span className={exdNavLabel}>{item.label}</span>
        {hasChildren && (
          <span className={cn(exdNavChevron, { open: open && !collapsed })}>
            <ChevronIcon size={11} />
          </span>
        )}
      </div>
      {collapsed && hasChildren && <NavFlyout item={item} />}
      {!collapsed && hasChildren && (
        <div className={cn(exdNavSubList, { closed: !open })}>
          {item.children!.map((child) => (
            <NavChildItem key={child.key} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Bottom Controls ───────────────────────────────────────────────────────────

const NavBottom = ({
  collapsed,
  onCollapse,
  onHidden,
  aiChatSlot,
}: {
  collapsed: boolean
  onCollapse: (v: boolean) => void
  onHidden: (v: boolean) => void
  aiChatSlot?: ReactNode
}) => {
  const ChevronDownIcon = ExdChevronDownIcon
  const BellIcon = ExdBellIcon
  const CogIcon = ExdCogIcon
  const CloseIcon = ExdCloseIcon
  const DownloadIcon = XdrDownloadIcon

  if (collapsed) {
    return (
      <div className={cn(exdNavBottom, 'collapsed')}>
        {aiChatSlot}
        <button type="button" className={exdNavBtnLg} aria-label="다운로드">
          <DownloadIcon size={16} />
        </button>
        <button type="button" className={exdNavBtnLg} aria-label="알림">
          <BellIcon size={16} />
        </button>
        <button type="button" className={exdNavBtnLg} aria-label="설정">
          <CogIcon size={16} />
        </button>
        <div className={exdNavBtnSmSpacer} />
        <button type="button" className={exdNavBtn} aria-label="펼치기" onClick={() => onCollapse(false)}>
          <span className={exdNavBtnIconRight}>
            <ChevronDownIcon size={16} />
          </span>
        </button>
        <button type="button" className={exdNavBtn} aria-label="숨기기" onClick={() => onHidden(true)}>
          <span className={exdNavBtnIconSm}>
            <CloseIcon size={12} />
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className={exdNavBottom}>
      <div className={exdNavBtnGroup}>
        <button type="button" className={exdNavBtn} aria-label="접기" onClick={() => onCollapse(true)}>
          <span className={exdNavBtnIconLeft}>
            <ChevronDownIcon size={16} />
          </span>
        </button>
        <button type="button" className={exdNavBtn} aria-label="숨기기" onClick={() => onHidden(true)}>
          <span className={exdNavBtnIconSm}>
            <CloseIcon size={12} />
          </span>
        </button>
      </div>
      {aiChatSlot}
      <div className={exdNavBtnSpacer} />
      <button type="button" className={exdNavBtnLg} aria-label="다운로드">
        <DownloadIcon size={16} />
      </button>
      <button type="button" className={exdNavBtnLg} aria-label="알림">
        <BellIcon size={16} />
      </button>
      <button type="button" className={exdNavBtnLg} aria-label="설정">
        <CogIcon size={16} />
      </button>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

const SideNavExd = ({
  menuGroup = [],
  activeKey = '',
  onActiveChange,
  collapsed: controlledCollapsed,
  onCollapse,
  hidden: controlledHidden,
  onHidden,
  header,
  aiChatSlot,
}: SideNavExdProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const [internalHidden, setInternalHidden] = useState(false)

  const collapsed = controlledCollapsed ?? internalCollapsed
  const hidden = controlledHidden ?? internalHidden

  const handleCollapse = (v: boolean) => {
    if (controlledCollapsed === undefined) setInternalCollapsed(v)
    onCollapse?.(v)
  }

  const handleHidden = (v: boolean) => {
    if (controlledHidden === undefined) setInternalHidden(v)
    onHidden?.(v)
  }

  const handleActiveChange = (key: string) => {
    onActiveChange?.(key)
  }

  const GridIcon = ExdMoreSolutionIcon

  return (
    <SideNavExdCtx.Provider value={{ collapsed, activeKey, onActiveChange: handleActiveChange }}>
      <div className={cn(exdNav, { collapsed, hidden })}>
        <div className={exdNavHeader}>
          <div className={exdNavLogoIcon}>
            <GridIcon size={18} />
          </div>
          <div className={exdNavLogoFull}>{header}</div>
        </div>

        <div className={exdNavBody}>
          {menuGroup.map((item) => (
            <NavItem key={item.key} item={item} />
          ))}
        </div>

        <NavBottom collapsed={collapsed} onCollapse={handleCollapse} onHidden={handleHidden} aiChatSlot={aiChatSlot} />
      </div>

      {hidden && (
        <button
          type="button"
          className={exdShowNavBtn}
          aria-label="네비게이션 열기"
          onClick={() => handleHidden(false)}
        >
          <GridIcon size={12} />
        </button>
      )}
    </SideNavExdCtx.Provider>
  )
}

SideNavExd.displayName = 'SideNavExd'

export default SideNavExd
