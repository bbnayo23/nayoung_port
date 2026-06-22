import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRangeCalendarUI } from './hooks'
import { isValidRelativeTime, parseRelativeTime } from './relativeTime'
import { Portal, cx } from '../../utils'
import { Calendar } from '../Calendar'
import { PIcon } from '../PIcon'
import * as styles from './RangeCalendar.css'

// ---------------------------------------------------------------------------
// 타입 (types.ts 를 RangeCalendar.tsx 에 통합)
// ---------------------------------------------------------------------------

export interface DateRange {
  start: Date
  end: Date
}

/** Preset 정의 — common/utils/date의 RangePreset와 구조적 호환 */
export type RangePreset =
  | {
      label: string
      type: 'preset'
      getValue: (now?: Date) => DateRange
      /** focus 시 입력식 prefill 용 (e.g. "-6h"). 없으면 focus 시 빈값 + "직접입력" 하이라이트 전환 */
      editValue?: string
    }
  | { label: string; type: 'custom' }

export interface RangeCalendarProps {
  // --- 날짜 범위 (controlled) ---
  start?: Date | null
  end?: Date | null
  /** Calendar 날짜 클릭 또는 절대시간 input blur 성공, 또는 preset/custom 적용 시 호출 */
  onStartChange?: (date: Date) => void
  onEndChange?: (date: Date) => void

  // --- 상대시간 값 (controlled) ---
  /**
   * - `null`: absolute 모드 (사이드바 하이라이트 없음)
   * - `""`: 직접입력 선택, 아직 미입력
   * - preset label과 일치: 해당 preset 선택
   * - 그 외 문자열: 직접입력 + 커밋된 custom 표현식 (예: "-7d")
   */
  relativeValue?: string | null
  /** preset 클릭 / 직접입력 클릭 / custom 확정 / absolute 전환 시 호출 */
  onRelativeValueChange?: (value: string | null) => void

  // --- 필수 config ---
  presets: RangePreset[]
  formatDate: (date: Date) => string
  parseDate: (text: string) => Date | null

  // --- 선택 ---
  placeholder?: string
  disabled?: boolean
  disabledBefore?: Date
  disabledAfter?: Date
  className?: string
}

// ---------------------------------------------------------------------------
// 패널 위치
// ---------------------------------------------------------------------------

interface PanelPosition {
  top: number
  left: number
}

// ---------------------------------------------------------------------------
// RangeCalendar
// ---------------------------------------------------------------------------

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

  // mode는 relativeValue로부터 파생: null이면 absolute, 그 외 relative
  const mode = relativeValue === null ? 'absolute' : 'relative'

  // 내부 state (month는 Calendar 컴포넌트가 내부 관리)
  const [isEditing, setIsEditing] = useState(false)
  const [relativeEdit, setRelativeEdit] = useState('')
  const [startInput, setStartInput] = useState(() => (start ? formatDate(start) : ''))
  const [endInput, setEndInput] = useState(() => (end ? formatDate(end) : ''))
  // preset 클릭으로 인한 프로그램matic blur의 commit 로직을 스킵 (편집 pending을 preset이 덮음)
  const skipBlurCommitRef = useRef(false)
  // "직접입력" 클릭으로 진입한 pending 상태. 타이핑 없이 blur되면 이 값으로 복구.
  //   undefined: pending 없음 / string|null: 복구할 이전 relativeValue
  const preCustomSnapshotRef = useRef<string | null | undefined>(undefined)

  // 패널 위치
  const [panelPos, setPanelPos] = useState<PanelPosition>({ top: 0, left: 0 })

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    setPanelPos({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    })
  }, [])

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition()
      requestAnimationFrame(() => updatePosition())
    }
  }, [isOpen, updatePosition])

  // 외부 start/end 변화 → 내부 텍스트 동기화
  useEffect(() => {
    setStartInput(start ? formatDate(start) : '')
  }, [start, formatDate])
  useEffect(() => {
    setEndInput(end ? formatDate(end) : '')
  }, [end, formatDate])

  // absolute로 전환되면 editing 상태 리셋
  useEffect(() => {
    if (mode !== 'relative') setIsEditing(false)
  }, [mode])

  // useClickOutside 인라인 (Dropdown.tsx 패턴)
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
        !triggerRef.current?.contains(target) &&
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

  // sidebar 하이라이트 계산:
  //   - isEditing 중 editValue 없는 preset(오늘/어제) → "직접입력" 미리 하이라이트
  //   - relativeValue가 preset label과 일치 → 해당 preset
  //   - relativeValue === "" 또는 기타 문자열 → "직접입력"(custom preset)
  //   - relativeValue === null → 없음
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

  // focus 시 editing 텍스트 prefill 규칙
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

  // blur 시 검증 → 성공이면 commit, 실패면 pending 복구 또는 no-op. skip 플래그 시 전부 스킵.
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
    // "직접입력" pending 상태에서 유효입력 없이 blur → snapshot으로 복구
    if (preCustomSnapshotRef.current !== undefined) {
      onRelativeValueChange?.(preCustomSnapshotRef.current)
      preCustomSnapshotRef.current = undefined
    }
  }, [relativeEdit, onRelativeValueChange, onStartChange, onEndChange])

  const handlePresetClick = useCallback(
    (preset: RangePreset) => {
      if (preset.type === 'custom') {
        // 최초 "직접입력" 진입 시 복구용 스냅샷 저장 (이미 pending이면 보존)
        if (preCustomSnapshotRef.current === undefined) {
          preCustomSnapshotRef.current = relativeValue ?? null
        }
        setRelativeEdit('')
        onRelativeValueChange?.('')
        requestAnimationFrame(() => relativeInputRef.current?.focus())
        return
      }
      // 일반 preset 선택 — pending 스냅샷 무효화
      preCustomSnapshotRef.current = undefined
      const { start: s, end: e } = preset.getValue()
      // input이 실제로 focus된 경우에만 programmatic blur의 commit을 스킵
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
    <div className={cx(styles.triggerWrapper, className)}>
      {mode === 'relative' ? (
        <div ref={triggerRef} className={styles.relativeTriggerWrapper}>
          <input
            ref={relativeInputRef}
            type="text"
            className={cx(styles.relativeTrigger, isOpen && styles.triggerOpen)}
            value={isEditing ? relativeEdit : (relativeValue ?? '')}
            onChange={(e) => setRelativeEdit(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleRelativeBlur}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={6}
          />
          <button type="button" className={styles.calendarIcon} onClick={toggle} disabled={disabled}>
            <PIcon name="clock" size={16} />
          </button>
        </div>
      ) : (
        <div
          ref={triggerRef}
          className={cx(styles.absoluteTrigger, isOpen && styles.triggerOpen)}
        >
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
            <PIcon name="clock" size={16} />
          </button>
        </div>
      )}

      {isOpen && (
        <Portal>
          <div
            ref={panelRef}
            className={styles.panel}
            style={{ top: panelPos.top, left: panelPos.left }}
          >
            <div className={styles.sidebar}>
              {regularPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className={cx(
                    styles.presetButton,
                    effectiveActivePreset === preset.label && styles.presetButtonActive,
                  )}
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
                  className={cx(
                    styles.presetButton,
                    effectiveActivePreset === customPreset.label && styles.presetButtonActive,
                  )}
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
                  className={cx(styles.dateInput, !isValidRange && styles.dateInputInvalid)}
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
                  className={cx(styles.dateInput, !isValidRange && styles.dateInputInvalid)}
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
      )}
    </div>
  )
}
