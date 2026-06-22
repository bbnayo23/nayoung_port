import { useCallback, useEffect, type MouseEvent, type ReactNode } from 'react'
import { cx } from '../../utils'
import { Portal } from '../../utils'
import * as styles from './SidePanel.css'
import type { SidePanelSide } from './SidePanel.css'

export interface SidePanelProps {
  open: boolean
  onClose: () => void
  /** 패널이 열리는 방향 (기본: "right") */
  side?: SidePanelSide
  /** 패널 너비 (기본: 360) */
  width?: number | string
  title?: ReactNode
  children: ReactNode
  className?: string
}

/** ESC 키로 패널 닫기 */
function useEscClose(isOpen: boolean, onClose: () => void) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])
}

export const SidePanel = ({
  open,
  onClose,
  side = 'right',
  width = 360,
  title,
  children,
  className,
}: SidePanelProps) => {
  useEscClose(open, onClose)

  const handleOverlayClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose],
  )

  if (!open) return null

  return (
    <Portal>
      <div className={styles.overlay} onClick={handleOverlayClick} />
      <aside
        role="dialog"
        aria-modal="true"
        className={cx(styles.panel[side], className)}
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
      >
        {title !== null && title !== undefined && (
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </aside>
    </Portal>
  )
}
