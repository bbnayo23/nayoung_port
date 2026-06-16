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
import * as styles from './Drawer.css'
import type { DrawerSide, DrawerSize } from './Drawer.css'

export type { DrawerSide, DrawerSize } from './Drawer.css'

interface DrawerContextValue {
  /** 드로어를 닫는 콜백 (Header 의 X 버튼이 사용) */
  onClose: () => void
  /** 타이틀 요소 id — Header 가 부여하고 panel 의 aria-labelledby 가 참조 */
  titleId: string
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

function useDrawerContext(part: string): DrawerContextValue {
  const ctx = useContext(DrawerContext)
  if (!ctx) {
    throw new Error(`Drawer.${part} 는 <Drawer> 내부에서만 사용할 수 있습니다.`)
  }
  return ctx
}

export interface DrawerProps {
  /** 열림 여부 (제어 컴포넌트) */
  open: boolean
  /** 닫기 요청 콜백 — Escape / 오버레이 클릭 / X 버튼에서 호출 */
  onClose: () => void
  /** 패널이 붙는 방향 */
  side?: DrawerSide
  /** 좌/우는 폭, 상/하는 높이를 제어 */
  size?: DrawerSize
  /** 오버레이 클릭으로 닫기 허용 */
  closeOnOverlayClick?: boolean
  /** Drawer.Header / Drawer.Body / Drawer.Footer */
  children: ReactNode
}

/**
 * 화면 모서리에 앵커링되는 슬라이드 패널 컴파운드 컴포넌트.
 *
 * `Drawer.Header` / `Drawer.Body` / `Drawer.Footer` 를 합성해 구성한다.
 *
 * 접근성:
 * - `role="dialog"` + `aria-modal="true"`.
 * - `aria-labelledby` 가 `Drawer.Header` 타이틀과 연결된다.
 * - 열려 있는 동안 포커스를 패널 안에 가두고(`useFocusTrap`), 닫히면 직전 포커스로 복귀.
 * - Escape 로 닫히며, 열려 있는 동안 body 스크롤을 잠근다.
 */
export function Drawer({
  open,
  onClose,
  side = 'left',
  size = 'md',
  closeOnOverlayClick = true,
  children,
}: DrawerProps) {
  const titleId = useId()
  const panelRef = useFocusTrap<HTMLDivElement>(open, onClose)

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

  const isHorizontal = side === 'left' || side === 'right'
  const sizeClass = isHorizontal ? styles.widthSizes[size] : styles.heightSizes[size]

  return (
    <Portal>
      <div
        className={cx(styles.overlay, styles.overlaySides[side])}
        onMouseDown={handleOverlayClick}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={cx(styles.panel, styles.panelSides[side], sizeClass)}
        >
          <DrawerContext.Provider value={{ onClose, titleId }}>{children}</DrawerContext.Provider>
        </div>
      </div>
    </Portal>
  )
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** 타이틀 내용 */
  children: ReactNode
}

/** 헤더 — children 을 타이틀로 렌더링하고 닫기(X) 버튼을 제공한다. */
function DrawerHeader({ children, className, ...rest }: DrawerHeaderProps) {
  const { onClose, titleId } = useDrawerContext('Header')
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
DrawerHeader.displayName = 'Drawer.Header'

export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/** 본문 — 스크롤 가능한 패딩 영역. */
function DrawerBody({ children, className, ...rest }: DrawerBodyProps) {
  return (
    <div className={cx(styles.body, className)} {...rest}>
      {children}
    </div>
  )
}
DrawerBody.displayName = 'Drawer.Body'

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/** 푸터 — 상단 보더 + 우측 정렬 액션 행. */
function DrawerFooter({ children, className, ...rest }: DrawerFooterProps) {
  return (
    <div className={cx(styles.footer, className)} {...rest}>
      {children}
    </div>
  )
}
DrawerFooter.displayName = 'Drawer.Footer'

Drawer.Header = DrawerHeader
Drawer.Body = DrawerBody
Drawer.Footer = DrawerFooter
