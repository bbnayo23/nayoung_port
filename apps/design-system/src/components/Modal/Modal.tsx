import {
  createContext,
  useContext,
  useEffect,
  useId,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { Portal } from '../../utils/Portal'
import { useFocusTrap } from '../../utils/useFocusTrap'
import { cx } from '../../utils/cx'
import * as styles from './Modal.css'
import type { ModalSize } from './Modal.css'

export type { ModalSize } from './Modal.css'

interface ModalContextValue {
  /** 모달을 닫는 콜백 (Header 의 X 버튼이 사용) */
  onClose: () => void
  /** 타이틀 요소 id — Header 가 부여하고 dialog 의 aria-labelledby 가 참조 */
  titleId: string
}

const ModalContext = createContext<ModalContextValue | null>(null)

function useModalContext(part: string): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error(`Modal.${part} 는 <Modal> 내부에서만 사용할 수 있습니다.`)
  }
  return ctx
}

export interface ModalProps {
  /** 열림 여부 (제어 컴포넌트) */
  open: boolean
  /** 닫기 요청 콜백 — Escape / 오버레이 클릭 / X 버튼에서 호출 */
  onClose: () => void
  /** 다이얼로그 최대 폭 */
  size?: ModalSize
  /** 오버레이 클릭으로 닫기 허용 */
  closeOnOverlayClick?: boolean
  /** Modal.Header / Modal.Body / Modal.Footer */
  children: ReactNode
}

/**
 * 중앙 정렬 다이얼로그 컴파운드 컴포넌트.
 *
 * `Modal.Header` / `Modal.Body` / `Modal.Footer` 를 합성해 구성한다.
 *
 * 접근성:
 * - `role="dialog"` + `aria-modal="true"`.
 * - `aria-labelledby` 가 `Modal.Header` 타이틀과 연결된다.
 * - 열려 있는 동안 포커스를 다이얼로그 안에 가두고(`useFocusTrap`), 닫히면 직전 포커스로 복귀.
 * - Escape 로 닫히며, 열려 있는 동안 body 스크롤을 잠근다.
 */
export function Modal({
  open,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  children,
}: ModalProps) {
  const titleId = useId()
  const dialogRef = useFocusTrap<HTMLDivElement>(open, onClose)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open) return null

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <Portal>
      <div className={styles.overlay} onMouseDown={handleOverlayClick}>
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={cx(styles.dialog, styles.sizes[size])}
        >
          <ModalContext.Provider value={{ onClose, titleId }}>{children}</ModalContext.Provider>
        </div>
      </div>
    </Portal>
  )
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** 타이틀 내용 */
  children: ReactNode
}

/** 헤더 — children 을 타이틀로 렌더링하고 닫기(X) 버튼을 제공한다. */
function ModalHeader({ children, className, ...rest }: ModalHeaderProps) {
  const { onClose, titleId } = useModalContext('Header')
  return (
    <div className={cx(styles.header, className)} {...rest}>
      <h2 id={titleId} className={styles.title}>
        {children}
      </h2>
      <button type="button" aria-label="닫기" className={styles.closeButton} onClick={onClose}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
    </div>
  )
}
ModalHeader.displayName = 'Modal.Header'

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/** 본문 — 스크롤 가능한 패딩 영역. */
function ModalBody({ children, className, ...rest }: ModalBodyProps) {
  return (
    <div className={cx(styles.body, className)} {...rest}>
      {children}
    </div>
  )
}
ModalBody.displayName = 'Modal.Body'

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/** 푸터 — 상단 보더 + 우측 정렬 액션 행. */
function ModalFooter({ children, className, ...rest }: ModalFooterProps) {
  return (
    <div className={cx(styles.footer, className)} {...rest}>
      {children}
    </div>
  )
}
ModalFooter.displayName = 'Modal.Footer'

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
