import { useCallback, useEffect, useRef, useState } from 'react'
import { ExdCalendarIcon } from '@port/icon-library'
import { useClickOutside } from '@dc/hooks'
import { Portal } from '@dc/components/Portal'
import { Calendar } from '@dc/components/Calendar'
import type { RangeCalendarProps, RangePreset } from './types'
import { useRangeCalendarUI } from './hooks'
import { isValidRelativeTime, parseRelativeTime } from './relativeTime'
import * as styles from './RangeCalendar.css'

export const RangeCalendar = ({
  start = null,
  end = null,
  onStartChange,
  onEndChange,
  relativeValue = null,
  onRelativeValueChange,
  presets,
  formatDate,
  parseDate,
  placeholder,
  disabled,
  disabledBefore,
  disabledAfter,
  className,
}: RangeCalendarProps) => {
  const { isOpen, open, close, toggle } = useRangeCalendarUI()
  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const relativeInputRef = useRef<HTMLInputElement>(null)

  const mode = relativeValue === null ? 'absolute' : 'relative'

  const [isEditing, setIsEditing] = useState(false)
  const [relativeEdit, setRelativeEdit] = useState('')
  const [startInput, setStartInput] = useState(() => (start ? formatDate(start) : ''))
  const [endInput, setEndInput] = useState(() => (end ? formatDate(end) : ''))
  const skipBlurCommitRef = useRef(false)
  const preCustomSnapshotRef = useRef<string | null | undefined>(undefined)

  // 외부 start/end/mode 변경 시 로컬 입력·편집 상태를 동기화 (외부 상태 → 로컬 미러링)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartInput(start ? formatDate(start) : '')
  }, [start, formatDate])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEndInput(end ? formatDate(end) : '')
  }, [end, formatDate])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (mode !== 'relative') setIsEditing(false)
  }, [mode])

  useClickOutside([triggerRef, panelRef], close)

  const customPresetLabel = presets.find((p) => p.type === 'custom')?.label
  const effectiveActivePreset = (() => {
    if (relativeValue === null) return null
    if (isEditing) {
      const preset = presets.find((p) => p.label === relativeValue)
      if (preset?.type === 'preset' && !preset.editValue) return customPresetLabel ?? null
    }
    const match = presets.find((p) => p.label === relativeValue)
    if (match?.type === 'preset') return match.label
    return customPresetLabel ?? null
  })()

  const handleFocus = useCallback(() => {
    if (disabled) return
    open()
    if (mode !== 'relative') return
    setIsEditing(true)
    const preset = presets.find((p) => p.label === relativeValue)
    if (preset?.type === 'preset') {
      setRelativeEdit(preset.editValue ?? '')
    } else {
      setRelativeEdit(relativeValue ?? '')
    }
  }, [disabled, open, mode, presets, relativeValue])

  const handleRelativeBlur = useCallback(() => {
    setIsEditing(false)
    if (skipBlurCommitRef.current) {
      skipBlurCommitRef.current = false
      return
    }
    const trimmed = relativeEdit.trim()
    if (trimmed && isValidRelativeTime(trimmed)) {
      const now = new Date()
      const resolved = parseRelativeTime(trimmed, now)
      if (resolved) {
        const s = resolved < now ? resolved : now
        const e = resolved < now ? now : resolved
        onRelativeValueChange?.(trimmed)
        onStartChange?.(s)
        onEndChange?.(e)
        preCustomSnapshotRef.current = undefined
        return
      }
    }
    if (preCustomSnapshotRef.current !== undefined) {
      onRelativeValueChange?.(preCustomSnapshotRef.current)
      preCustomSnapshotRef.current = undefined
    }
  }, [relativeEdit, onRelativeValueChange, onStartChange, onEndChange])

  const handlePresetClick = useCallback(
    (preset: RangePreset) => {
      if (preset.type === 'custom') {
        if (preCustomSnapshotRef.current === undefined) {
          preCustomSnapshotRef.current = relativeValue ?? null
        }
        setRelativeEdit('')
        onRelativeValueChange?.('')
        requestAnimationFrame(() => relativeInputRef.current?.focus())
        return
      }
      preCustomSnapshotRef.current = undefined
      const { start: s, end: e } = preset.getValue()
      skipBlurCommitRef.current = document.activeElement === relativeInputRef.current
      onRelativeValueChange?.(preset.label)
      onStartChange?.(s)
      onEndChange?.(e)
      relativeInputRef.current?.blur()
    },
    [relativeValue, onRelativeValueChange, onStartChange, onEndChange],
  )

  const handleStartDateSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) return
      onStartChange?.(date)
      onRelativeValueChange?.(null)
    },
    [onStartChange, onRelativeValueChange],
  )

  const handleEndDateSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) return
      onEndChange?.(date)
      onRelativeValueChange?.(null)
    },
    [onEndChange, onRelativeValueChange],
  )

  const handleStartInputBlur = useCallback(() => {
    const parsed = parseDate(startInput)
    if (parsed) {
      onStartChange?.(parsed)
      onRelativeValueChange?.(null)
    } else {
      setStartInput(start ? formatDate(start) : '')
    }
  }, [startInput, start, onStartChange, onRelativeValueChange, formatDate, parseDate])

  const handleEndInputBlur = useCallback(() => {
    const parsed = parseDate(endInput)
    if (parsed) {
      onEndChange?.(parsed)
      onRelativeValueChange?.(null)
    } else {
      setEndInput(end ? formatDate(end) : '')
    }
  }, [endInput, end, onEndChange, onRelativeValueChange, formatDate, parseDate])

  const isValidRange = start !== null && end !== null && start <= end

  const regularPresets = presets.filter((p) => p.type !== 'custom')
  const customPreset = presets.find((p) => p.type === 'custom')

  return (
    <div className={`${styles.triggerWrapper}${className ? ` ${className}` : ''}`}>
      {mode === 'relative' ? (
        <div ref={triggerRef} className={styles.triggerWrapper}>
          <input
            ref={relativeInputRef}
            type="text"
            className={`${styles.relativeTrigger}${isOpen ? ` ${styles.triggerOpen}` : ''}`}
            value={isEditing ? relativeEdit : (relativeValue ?? '')}
            onChange={(e) => setRelativeEdit(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleRelativeBlur}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={6}
          />
          <button type="button" className={styles.calendarIcon} onClick={toggle} disabled={disabled}>
            <ExdCalendarIcon size={16} />
          </button>
        </div>
      ) : (
        <div ref={triggerRef} className={`${styles.absoluteTrigger}${isOpen ? ` ${styles.triggerOpen}` : ''}`}>
          <input
            type="text"
            className={styles.absoluteInput}
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleStartInputBlur}
            placeholder="YYYY-MM-DD HH:mm:ss"
            disabled={disabled}
          />
          <span className={styles.separator}>~</span>
          <input
            type="text"
            className={styles.absoluteInput}
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleEndInputBlur}
            placeholder="YYYY-MM-DD HH:mm:ss"
            disabled={disabled}
          />
          <button type="button" className={styles.calendarIcon} onClick={toggle} disabled={disabled}>
            <ExdCalendarIcon size={16} />
          </button>
        </div>
      )}

      <Portal triggerRef={triggerRef} panelRef={panelRef} isOpen={isOpen} onClose={close}>
        <div className={styles.panel}>
          <div className={styles.sidebar}>
            {regularPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={`${styles.presetButton}${effectiveActivePreset === preset.label ? ` ${styles.presetButtonActive}` : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handlePresetClick(preset)}
              >
                {preset.label}
              </button>
            ))}
            <div className={styles.sidebarSpacer} />
            {customPreset && (
              <button
                type="button"
                className={`${styles.presetButton}${effectiveActivePreset === customPreset.label ? ` ${styles.presetButtonActive}` : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handlePresetClick(customPreset)}
              >
                {customPreset.label}
              </button>
            )}
          </div>

          <div className={styles.calendarsWrapper}>
            <div className={styles.calendarPanel}>
              <input
                type="text"
                className={`${styles.dateInput}${!isValidRange ? ` ${styles.dateInputInvalid}` : ''}`}
                value={startInput}
                placeholder="YYYY-MM-DD HH:mm:ss"
                onChange={(e) => setStartInput(e.target.value)}
                onBlur={handleStartInputBlur}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                aria-label="시작 날짜"
              />
              <div className={styles.calendarInner}>
                <Calendar
                  selected={start ?? undefined}
                  onSelect={handleStartDateSelect}
                  disabledBefore={disabledBefore}
                  disabledAfter={disabledAfter}
                />
              </div>
            </div>

            <div className={styles.calendarPanel}>
              <input
                type="text"
                className={`${styles.dateInput}${!isValidRange ? ` ${styles.dateInputInvalid}` : ''}`}
                value={endInput}
                placeholder="YYYY-MM-DD HH:mm:ss"
                onChange={(e) => setEndInput(e.target.value)}
                onBlur={handleEndInputBlur}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                aria-label="종료 날짜"
              />
              <div className={styles.calendarInner}>
                <Calendar
                  selected={end ?? undefined}
                  onSelect={handleEndDateSelect}
                  disabledBefore={disabledBefore}
                  disabledAfter={disabledAfter}
                />
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </div>
  )
}

export default RangeCalendar
