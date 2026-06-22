import { useRef, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { cx } from '../../utils'
import { Portal } from '../../utils'
import { useClampedPosition, useMenuKeyboard, useOutsideClose, shouldFlipSubMenu } from './hooks'
import * as styles from './ContextMenu.css'

const SUBMENU_CLOSE_DELAY = 200

export interface ContextMenuItem {
  key: string
  label: string
  icon?: ReactNode
  disabled?: boolean
  /** true일 경우 디바이더 행으로 렌더 */
  divider?: boolean
  /** leaf 항목에 필수; children 이 있는 경우 optional */
  onSelect?: () => void
  /** 서브메뉴 항목 */
  children?: ContextMenuItem[]
}

export interface ContextMenuProps {
  open: boolean
  /** 뷰포트 기준 x 좌표 */
  x: number
  /** 뷰포트 기준 y 좌표 */
  y: number
  items: ContextMenuItem[]
  onClose: () => void
}

interface SubMenuProps {
  items: ContextMenuItem[]
  parentRef: React.RefObject<HTMLLIElement | null>
  onClose: () => void
}

const SubMenu = ({ items, parentRef, onClose }: SubMenuProps) => {
  const flip = shouldFlipSubMenu(parentRef.current)

  return (
    <ul role="menu" className={cx(styles.subMenu, flip && styles.subMenuLeft)}>
      {items.map((it) => {
        if (it.divider) {
          return <li key={it.key} role="separator" className={styles.divider} />
        }
        const disabled = Boolean(it.disabled)
        return (
          <li
            key={it.key}
            role="menuitem"
            aria-disabled={disabled}
            tabIndex={-1}
            className={cx(styles.item, disabled && styles.itemDisabled)}
            onClick={() => {
              if (disabled) return
              if (it.onSelect) {
                it.onSelect()
                onClose()
              }
            }}
          >
            {it.icon && <span className={styles.icon}>{it.icon}</span>}
            <span>{it.label}</span>
          </li>
        )
      })}
    </ul>
  )
}

interface MenuItemRowProps {
  it: ContextMenuItem
  idx: number
  active: number
  setActive: (idx: number) => void
  openSubIdx: number
  onOpenSub: (idx: number) => void
  onCloseSub: () => void
  onClose: () => void
}

const MenuItemRow = ({ it, idx, active, setActive, openSubIdx, onOpenSub, onCloseSub, onClose }: MenuItemRowProps) => {
  const liRef = useRef<HTMLLIElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const disabled = Boolean(it.disabled)
  const isActive = idx === active
  const hasChildren = Boolean(it.children && it.children.length > 0)
  const isSubOpen = openSubIdx === idx

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimerRef.current = setTimeout(() => {
      onCloseSub()
    }, SUBMENU_CLOSE_DELAY)
  }, [cancelClose, onCloseSub])

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current)
    },
    [],
  )

  const handleMouseEnter = () => {
    setActive(idx)
    cancelClose()
    if (hasChildren) {
      onOpenSub(idx)
    } else {
      onCloseSub()
    }
  }

  const handleMouseLeave = () => {
    if (hasChildren && isSubOpen) {
      scheduleClose()
    }
  }

  const handleClick = () => {
    if (disabled) return
    if (hasChildren) {
      onOpenSub(idx)
    } else if (it.onSelect) {
      it.onSelect()
      onClose()
    }
  }

  return (
    <li
      ref={liRef}
      role="menuitem"
      aria-haspopup={hasChildren ? 'menu' : undefined}
      aria-expanded={hasChildren ? isSubOpen : undefined}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={cx(
        styles.item,
        disabled && styles.itemDisabled,
        isActive && styles.itemActive,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {it.icon && <span className={styles.icon}>{it.icon}</span>}
      <span>{it.label}</span>
      {hasChildren && <span className={styles.chevron}>&#9658;</span>}
      {hasChildren && isSubOpen && it.children && <SubMenu items={it.children} parentRef={liRef} onClose={onClose} />}
    </li>
  )
}

export const ContextMenu = ({ open, x, y, items, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLUListElement>(null)
  const [openSubIdx, setOpenSubIdx] = useState(-1)

  const openSubMenu = useCallback((idx: number) => setOpenSubIdx(idx), [])
  const closeSubMenu = useCallback(() => setOpenSubIdx(-1), [])

  const pos = useClampedPosition(menuRef, open, x, y)
  const { active, setActive } = useMenuKeyboard(open, items, onClose, openSubMenu, closeSubMenu, openSubIdx)
  useOutsideClose(menuRef, open, onClose)

  useEffect(() => {
    if (!open) setOpenSubIdx(-1)
  }, [open])

  if (!open) return null

  return (
    <Portal>
      <ul
        ref={menuRef}
        role="menu"
        className={styles.menu}
        style={{
          left: pos.left,
          top: pos.top,
          visibility: pos.measured ? 'visible' : 'hidden',
        }}
      >
        {items.map((it, idx) => {
          if (it.divider) {
            return <li key={it.key} role="separator" className={styles.divider} />
          }
          return (
            <MenuItemRow
              key={it.key}
              it={it}
              idx={idx}
              active={active}
              setActive={setActive}
              openSubIdx={openSubIdx}
              onOpenSub={openSubMenu}
              onCloseSub={closeSubMenu}
              onClose={onClose}
            />
          )
        })}
      </ul>
    </Portal>
  )
}
