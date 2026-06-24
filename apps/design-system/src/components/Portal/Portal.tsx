import { createPortal } from 'react-dom'
import { useState, useLayoutEffect, useCallback, useEffect } from 'react'
import type { PortalProps } from './types'
import { usePortal } from './hooks'
import * as styles from './Portal.css'

interface Position {
  top: number
  left: number
  width: number
}

export function Portal({ children, triggerRef, panelRef, isOpen, onClose, placement = 'bottom' }: PortalProps) {
  const container = usePortal()
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    width: 0,
  })

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    let left = rect.left + window.scrollX

    // viewport clamping: 패널이 오른쪽으로 넘치면 조정
    if (typeof panelRef === 'object' && panelRef?.current) {
      const panelWidth = panelRef.current.offsetWidth
      const viewportWidth = window.innerWidth
      if (left + panelWidth > viewportWidth) {
        left = Math.max(0, viewportWidth - panelWidth - 8)
      }
    }

    const panelHeight =
      placement === 'top' && typeof panelRef === 'object' && panelRef?.current ? panelRef.current.offsetHeight : 0

    setPosition({
      top: placement === 'top' ? rect.top + window.scrollY - panelHeight : rect.bottom + window.scrollY,
      left,
      width: rect.width,
    })
  }, [triggerRef, panelRef, placement])

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition()
      // 패널 렌더 후 실제 너비로 clamping 재계산
      requestAnimationFrame(() => updatePosition())
    }
  }, [isOpen, updatePosition])

  useEffect(() => {
    if (!isOpen) return

    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, updatePosition, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      ref={panelRef}
      className={styles.panel}
      style={{
        top: position.top,
        left: position.left,
        minWidth: position.width,
      }}
    >
      {children}
    </div>,
    container,
  )
}
