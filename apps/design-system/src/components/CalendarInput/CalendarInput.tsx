import { useRef, useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { ExdCalendarIcon } from '@port/icon-library'
import { useClickOutside } from '../../hooks'
import { Portal } from '../Portal'
import { Calendar } from '../Calendar'
import type { CalendarInputProps } from './types'
import { useCalendarInputUI } from './hooks'
import * as styles from './CalendarInput.css'

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

  useClickOutside([inputRef, panelRef], close)

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
    <div className={`${styles.wrapper}${isOpen ? ' is-open' : ''}${className ? ` ${className}` : ''}`}>
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
        <ExdCalendarIcon size={16} />
      </span>
      <Portal triggerRef={inputRef} panelRef={panelRef} isOpen={isOpen} onClose={close}>
        <div className={styles.calendarPanel}>
          <Calendar
            selected={selectedDate ?? undefined}
            onSelect={handleDateSelect}
            disabledBefore={disabledBefore}
            disabledAfter={disabledAfter}
          />
        </div>
      </Portal>
    </div>
  )
}

export default CalendarInput
