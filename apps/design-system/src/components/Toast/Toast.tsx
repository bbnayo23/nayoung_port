import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Portal } from '../../utils/Portal'
import { cx } from '../../utils/cx'
import * as styles from './Toast.css'
import type { ToastPosition, ToastVariant } from './Toast.css'

export type { ToastVariant, ToastPosition }

export interface ToastOptions {
  /** 제목 (필수) */
  title: string
  /** 보조 설명 */
  description?: string
  /** 의미색 (기본 'info') */
  variant?: ToastVariant
  /** 자동 사라짐 시간(ms, 기본 4000) */
  duration?: number
}

interface ToastItem extends ToastOptions {
  id: string
}

interface ToastContextValue {
  /** 토스트를 띄우고 id 를 반환 */
  toast: (opts: ToastOptions) => string
  /** id 로 토스트 제거 */
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export interface ToastProviderProps {
  children: ReactNode
  /** viewport 코너 위치 (기본 'top-right') */
  position?: ToastPosition
  /** 동시 표시 최대 개수 (기본 5, 초과 시 가장 오래된 것부터 제거) */
  max?: number
}

/** variant 별 인라인 SVG 아이콘 (aria-hidden, currentColor 사용) */
function ToastIcon({ variant }: { variant: ToastVariant }) {
  const common = {
    className: styles.icon,
    viewBox: '0 0 20 20',
    fill: 'currentColor',
    'aria-hidden': true,
    focusable: false,
  } as const

  switch (variant) {
    case 'success':
      return (
        <svg {...common}>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )
    case 'warning':
      return (
        <svg {...common}>
          <path
            fillRule="evenodd"
            d="M8.3 2.9c.8-1.3 2.6-1.3 3.4 0l6 10.4c.7 1.3-.2 2.9-1.7 2.9H4c-1.5 0-2.4-1.6-1.7-2.9l6-10.4zM10 7a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1zm0 7a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    case 'danger':
      return (
        <svg {...common}>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.7 7.3a1 1 0 00-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 101.4 1.4L10 11.4l1.3 1.3a1 1 0 001.4-1.4L11.4 10l1.3-1.3a1 1 0 00-1.4-1.4L10 8.6 8.7 7.3z"
            clipRule="evenodd"
          />
        </svg>
      )
    case 'info':
    default:
      return (
        <svg {...common}>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      )
  }
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      focusable={false}
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  )
}

function ToastCard({
  item,
  position,
  onDismiss,
}: {
  item: ToastItem
  position: ToastPosition
  onDismiss: (id: string) => void
}) {
  const variant = item.variant ?? 'info'
  const isAlert = variant === 'danger'
  const isLeft = position === 'top-left' || position === 'bottom-left'

  return (
    <div
      className={cx(
        styles.card,
        styles.variants[variant],
        isLeft ? styles.enterLeft : styles.enterRight,
      )}
      role={isAlert ? 'alert' : 'status'}
      aria-live={isAlert ? 'assertive' : 'polite'}
    >
      <ToastIcon variant={variant} />
      <div className={styles.body}>
        <div className={styles.title}>{item.title}</div>
        {item.description && <div className={styles.description}>{item.description}</div>}
      </div>
      <button
        type="button"
        className={styles.closeButton}
        aria-label="닫기"
        onClick={() => onDismiss(item.id)}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

/**
 * 명령형 Toast API 를 제공하는 Provider.
 *
 * 활성 토스트 배열을 state 로 들고, 선택한 코너에 `<Portal>` viewport 를 fixed 로 그린다.
 * 각 토스트는 `duration` 후 `setTimeout` 으로 자동 제거(언마운트/수동 제거 시 정리)되고,
 * `max` 초과 시 가장 오래된 토스트부터 버린다. id 는 `useRef(0)` 카운터로 발급한다.
 *
 * a11y: info/success/warning 토스트는 `role="status"` + `aria-live="polite"`,
 * danger 는 `role="alert"` + `aria-live="assertive"`.
 */
export function ToastProvider({
  children,
  position = 'top-right',
  max = 5,
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([])
  const counterRef = useRef(0)
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (timer !== undefined) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const toast = useCallback(
    (opts: ToastOptions) => {
      const id = `toast-${(counterRef.current += 1)}`
      const item: ToastItem = { ...opts, id }
      setItems((prev) => {
        const next = [...prev, item]
        // max 초과 시 가장 오래된 토스트 제거 + 타이머 정리
        while (next.length > max) {
          const dropped = next.shift()
          if (dropped) {
            const t = timersRef.current.get(dropped.id)
            if (t !== undefined) {
              clearTimeout(t)
              timersRef.current.delete(dropped.id)
            }
          }
        }
        return next
      })

      const duration = opts.duration ?? 4000
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration)
        timersRef.current.set(id, timer)
      }
      return id
    },
    [dismiss, max],
  )

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((t) => clearTimeout(t))
      timers.clear()
    }
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {items.length > 0 && (
        <Portal>
          <div className={cx(styles.viewport, styles.positions[position])}>
            {items.map((item) => (
              <ToastCard key={item.id} item={item} position={position} onDismiss={dismiss} />
            ))}
          </div>
        </Portal>
      )}
    </ToastContext.Provider>
  )
}

/**
 * 토스트를 띄우는 훅. `{ toast, dismiss }` 를 반환한다.
 * `ToastProvider` 바깥에서 호출하면 에러를 던진다.
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast 는 <ToastProvider> 내부에서만 사용할 수 있습니다.')
  }
  return ctx
}
