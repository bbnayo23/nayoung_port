import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import type { RefObject } from 'react'
import type { ContextMenuItem } from './types'

const getSelectableIndexes = (items: ContextMenuItem[]) =>
  items.reduce<number[]>((acc, it, idx) => {
    if (!it.divider && !it.disabled) acc.push(idx)
    return acc
  }, [])

export interface ClampedPosition {
  left: number
  top: number
  measured: boolean
}

export const useClampedPosition = (
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  x: number,
  y: number,
): ClampedPosition => {
  const [pos, setPos] = useState<ClampedPosition>({ left: x, top: y, measured: false })

  useLayoutEffect(() => {
    if (!open) {
      // 닫힐 때 측정 전(measured:false) 상태로 되돌려 다음 오픈 시 깜빡임 방지
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPos({ left: x, top: y, measured: false })
      return
    }
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const maxLeft = window.innerWidth - rect.width - 4
    const maxTop = window.innerHeight - rect.height - 4
    setPos({
      left: Math.max(4, Math.min(x, maxLeft)),
      top: Math.max(4, Math.min(y, maxTop)),
      measured: true,
    })
  }, [open, x, y, ref])

  return pos
}

export const useOutsideClose = (ref: RefObject<HTMLElement | null>, open: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open, onClose, ref])
}

export const shouldFlipSubMenu = (liEl: HTMLElement | null): boolean => {
  if (!liEl) return false
  const rect = liEl.getBoundingClientRect()
  return window.innerWidth - rect.right < 164
}

export const useMenuKeyboard = (
  open: boolean,
  items: ContextMenuItem[],
  onClose: () => void,
  openSubMenu: (idx: number) => void,
  closeSubMenu: () => void,
  activeSubMenu: number,
) => {
  const selectable = useMemo(() => getSelectableIndexes(items), [items])
  const [active, setActive] = useState<number>(-1)

  useEffect(() => {
    // 메뉴가 열리거나 항목이 바뀌면 첫 선택 가능 항목으로 활성 인덱스 초기화
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(selectable.length > 0 ? (selectable[0] ?? -1) : -1)
  }, [open, selectable])

  const move = useCallback(
    (dir: 1 | -1) => {
      if (selectable.length === 0) return
      const currentPos = selectable.indexOf(active)
      const nextPos = currentPos === -1 ? 0 : (currentPos + dir + selectable.length) % selectable.length
      const next = selectable[nextPos]
      if (next !== undefined) setActive(next)
    },
    [active, selectable],
  )

  useEffect(() => {
    if (!open) return
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        move(1)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        move(-1)
        return
      }
      if (e.key === 'ArrowRight') {
        const it = items[active]
        if (it && it.children && it.children.length > 0) {
          e.preventDefault()
          openSubMenu(active)
        }
        return
      }
      if (e.key === 'ArrowLeft') {
        if (activeSubMenu !== -1) {
          e.preventDefault()
          closeSubMenu()
        }
        return
      }
      if (e.key === 'Enter') {
        const it = items[active]
        if (it && !it.divider && !it.disabled) {
          e.preventDefault()
          if (it.children && it.children.length > 0) openSubMenu(active)
          else if (it.onSelect) {
            it.onSelect()
            onClose()
          }
        }
      }
    }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [open, items, active, move, onClose, openSubMenu, closeSubMenu, activeSubMenu])

  return { active, setActive }
}
