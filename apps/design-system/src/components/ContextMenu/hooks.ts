import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import type { RefObject } from 'react'
import type { ContextMenuItem } from './ContextMenu'

/** 선택 가능한 (비-디바이더, 비활성화 아님) 아이템의 인덱스만 반환 */
const getSelectableIndexes = (items: ContextMenuItem[]) =>
  items.reduce<number[]>((acc, it, idx) => {
    if (!it.divider && !it.disabled) acc.push(idx)
    return acc
  }, [])

export interface ClampedPosition {
  left: number
  top: number
  /** 측정 완료 전에는 false — 메뉴를 visibility: hidden 으로 감춰 최초 프레임 깜빡임 방지 */
  measured: boolean
}

/** 메뉴 위치를 뷰포트 안으로 클램프. 측정이 완료되기 전에는 `measured: false` 를 반환. */
export const useClampedPosition = (
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  x: number,
  y: number,
): ClampedPosition => {
  const [pos, setPos] = useState<ClampedPosition>({
    left: x,
    top: y,
    measured: false,
  })

  useLayoutEffect(() => {
    if (!open) {
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

/** 외부 클릭 시 닫기 */
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

/**
 * 서브메뉴 flip: li 요소의 우측 공간이 subMenu 너비보다 작으면 좌측으로 flip.
 * subMenuWidth 는 추정치(160) 사용 — 측정 전이므로.
 */
export const shouldFlipSubMenu = (liEl: HTMLElement | null): boolean => {
  if (!liEl) return false
  const rect = liEl.getBoundingClientRect()
  return window.innerWidth - rect.right < 164
}

/** 키보드 내비게이션 (ArrowUp/Down/Left/Right/Enter/Escape). 디바이더/비활성화는 스킵, 루프. */
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
          if (it.children && it.children.length > 0) {
            openSubMenu(active)
          } else if (it.onSelect) {
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
