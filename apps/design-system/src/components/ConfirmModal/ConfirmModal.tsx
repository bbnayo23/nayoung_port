import { Button } from '../Button'
import { Portal } from '../../utils'
import { useFocusTrap } from '../../utils'
import * as styles from './ConfirmModal.css'

// 단순 confirm/cancel 2버튼 모달. AlertModal 의 아이콘 변형이 아닌 텍스트 only
// 패턴 — 검색기반룰(CorrelationRule) 등에서 사용.
export interface ConfirmModalProps {
  isOpen: boolean
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  /** 확인 버튼을 danger 스타일로 표시 */
  danger?: boolean
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmModalProps) {
  const dialogRef = useFocusTrap<HTMLDivElement>(isOpen, onCancel)

  if (!isOpen) {
    return null
  }

  return (
    <Portal>
      <div className={styles.overlay}>
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={styles.surface}
        >
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.message}>{message}</div>
          <div className={styles.buttonRow}>
            <Button variant="secondary" size="sm" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button variant={danger ? 'danger' : 'primary'} size="sm" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  )
}
