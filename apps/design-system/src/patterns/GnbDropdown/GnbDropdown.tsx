import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { shell } from './GnbDropdown.css'

export interface GnbDropdownProps {
  open: boolean
  onClose: () => void
  /** 앵커할 GNB 버튼의 aria-label */
  targetLabel: string
  width?: number
  /** 대상 버튼 기준 정렬 (기본 right) */
  align?: 'left' | 'right'
  ariaLabel?: string
  children: ReactNode
}

/**
 * GNB 아이콘 버튼(aria-label)에 앵커되는 드롭다운.
 * Gnb 는 콜백만 노출하므로 대상 버튼의 위치를 측정해 그 아래·좌/우 정렬로 띄운다.
 * 바깥 클릭·Esc 로 닫히며, 대상 버튼 클릭(토글)은 무시한다.
 */
export default function GnbDropdown({
  open,
  onClose,
  targetLabel,
  width = 260,
  align = 'right',
  ariaLabel,
  children,
}: GnbDropdownProps) {
  const [pos, setPos] = useState<{ top: number; left?: number; right?: number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const targetSelector = `button[aria-label="${targetLabel}"]`

  useLayoutEffect(() => {
    if (!open) return
    const btn = document.querySelector(targetSelector)
    const r = btn?.getBoundingClientRect()
    const horizontal = r
      ? align === 'left'
        ? { left: Math.max(8, r.left) }
        : { right: Math.max(8, window.innerWidth - r.right) }
      : align === 'left'
        ? { left: 16 }
        : { right: 16 }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPos({ top: r ? r.bottom + 8 : 56, ...horizontal })
  }, [open, targetSelector, align])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (ref.current?.contains(t)) return
      if (document.querySelector(targetSelector)?.contains(t)) return
      onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, targetSelector])

  if (!open || !pos) return null

  return (
    <div
      ref={ref}
      className={shell}
      style={{ top: pos.top, left: pos.left, right: pos.right, width }}
      role="menu"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}
