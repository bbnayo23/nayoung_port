import {
  useRef,
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
  type ChangeEvent,
} from 'react'
import { cx } from '../../utils'
import { Portal } from '../../utils'
import { useCalendarInputUI } from './hooks'
import { Calendar } from '../Calendar'
import { IconStar } from '@port/icon-library'
import * as styles from './CalendarInput.css'

// ---------------------------------------------------------------------------
// Props (types.ts 를 CalendarInput.tsx 에 통합)
// ---------------------------------------------------------------------------

export interface CalendarInputProps {
  value?: string
  selectedDate?: Date | null
  onDateSelect?: (date: Date | undefined) => void
  onInputChange?: (text: string) => void
  onInputBlur?: () => void
  /** 이 날짜 이전은 선택 불가 */
  disabledBefore?: Date
  /** 이 날짜 이후는 선택 불가 */
  disabledAfter?: Date
  placeholder?: string
  disabled?: boolean
  className?: string
}

// ---------------------------------------------------------------------------
// 패널 위치 타입
// ---------------------------------------------------------------------------

interface PanelPosition {
  top: number
  left: number
  minWidth: number
}

// ---------------------------------------------------------------------------
// CalendarInput
// ---------------------------------------------------------------------------

export const CalendarInput = ({
  value,
  selectedDate,
  onDateSelect,
  onInputChange,
  onInputBlur,
  disabledBefore,
  disabledAfter,
  placeholder = 'YYYY-MM-DD HH:mm:ss',
  disabled,
  className,
}: CalendarInputProps) => {
  const { isOpen, open, close } = useCalendarInputUI()
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // ---- 패널 위치 계산 (Dropdown 패턴) ----
  const [panelPos, setPanelPos] = useState<PanelPosition>({ top: 0, left: 0, minWidth: 0 })

  const updatePosition = useCallback(() => {
    if (!inputRef.current) return
    const rect = inputRef.current.getBoundingClientRect()
    let left = rect.left + window.scrollX

    if (panelRef.current) {
      const panelWidth = panelRef.current.offsetWidth
      if (left + panelWidth > window.innerWidth) {
        left = Math.max(0, window.innerWidth - panelWidth - 8)
      }
    }

    setPanelPos({
      top: rect.bottom + window.scrollY,
      left,
      minWidth: rect.width,
    })
  }, [])

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition()
      requestAnimationFrame(() => updatePosition())
    }
  }, [isOpen, updatePosition])

  // ---- scroll / resize / Escape / click-outside (Dropdown 인라인 패턴) ----
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => updatePosition()
    const handleResize = () => updatePosition()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (
        !inputRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        close()
      }
    }

    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleResize)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen, close, updatePosition])

  const handleFocus = useCallback(() => {
    if (!disabled) open()
  }, [disabled, open])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onInputChange?.(e.target.value)
    },
    [onInputChange],
  )

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      onDateSelect?.(date)
    },
    [onDateSelect],
  )

  return (
    <div className={cx(styles.wrapper, className)}>
      <input
        ref={inputRef}
        type="text"
        value={value ?? ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={onInputBlur}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.calendarIcon} aria-hidden="true">
        <IconStar size={16} />
      </span>
      {isOpen && (
        <Portal>
          <div
            ref={panelRef}
            className={styles.panel}
            style={{
              top: panelPos.top,
              left: panelPos.left,
              minWidth: panelPos.minWidth,
            }}
          >
            <Calendar
              selected={selectedDate ?? undefined}
              onSelect={handleDateSelect}
              disabledBefore={disabledBefore}
              disabledAfter={disabledAfter}
            />
          </div>
        </Portal>
      )}
    </div>
  )
}
