import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import { Portal } from '../../utils/Portal'
import { cx } from '../../utils/cx'
import * as styles from './Tooltip.css'

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  /** 툴팁에 표시할 내용 */
  content: ReactNode
  /** 트리거 기준 표시 위치 (기본 'top') */
  placement?: TooltipPlacement
  /** 표시까지의 지연 시간(ms, 기본 200) */
  delay?: number
  /** 트리거가 될 단일 엘리먼트 */
  children: ReactElement
}

/** 트리거 사각형 + placement 로 fixed 좌표를 계산한다 (viewport 기준). */
function computePosition(rect: DOMRect, placement: TooltipPlacement) {
  const gap = 8
  switch (placement) {
    case 'top':
      return {
        left: rect.left + rect.width / 2,
        top: rect.top - gap,
        transform: 'translate(-50%, -100%)',
      }
    case 'bottom':
      return {
        left: rect.left + rect.width / 2,
        top: rect.bottom + gap,
        transform: 'translate(-50%, 0)',
      }
    case 'left':
      return {
        left: rect.left - gap,
        top: rect.top + rect.height / 2,
        transform: 'translate(-100%, -50%)',
      }
    case 'right':
    default:
      return {
        left: rect.right + gap,
        top: rect.top + rect.height / 2,
        transform: 'translate(0, -50%)',
      }
  }
}

/**
 * 트리거에 hover / focus 하면 Portal 로 띄우는 툴팁.
 *
 * 트리거는 `display:inline-flex` 래퍼 `<span>` 으로 감싸 mouse/focus 핸들러와
 * 측정용 ref 를 안정적으로 부착한다. 보여질 때 트리거의 `getBoundingClientRect()`
 * 를 읽어 `position:fixed` 좌표(스크롤 오프셋 불필요)로 배치한다.
 *
 * a11y: 툴팁 엘리먼트에 `role="tooltip"` + id 를 부여하고, 트리거 래퍼에
 * `aria-describedby` 로 연결한다. hover/focus 로 표시, mouseleave/blur/Escape 로 숨김.
 */
export function Tooltip({ content, placement = 'top', delay = 200, children }: TooltipProps) {
  const id = useId()
  const triggerRef = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ left: number; top: number; transform: string }>({
    left: 0,
    top: 0,
    transform: '',
  })

  const clearTimer = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [])

  const show = useCallback(() => {
    clearTimer()
    timerRef.current = setTimeout(() => {
      const el = triggerRef.current
      if (!el) return
      setCoords(computePosition(el.getBoundingClientRect(), placement))
      setOpen(true)
    }, delay)
  }, [clearTimer, delay, placement])

  const hide = useCallback(() => {
    clearTimer()
    setOpen(false)
  }, [clearTimer])

  useEffect(() => clearTimer, [clearTimer])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, hide])

  return (
    <span
      ref={triggerRef}
      className={styles.trigger}
      aria-describedby={open ? id : undefined}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open && (
        <Portal>
          <div
            id={id}
            role="tooltip"
            className={cx(styles.box)}
            style={{ left: coords.left, top: coords.top, transform: coords.transform }}
          >
            {content}
          </div>
        </Portal>
      )}
    </span>
  )
}
