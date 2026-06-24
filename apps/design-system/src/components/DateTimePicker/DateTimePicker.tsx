import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ExdChevronDownIcon } from '@port/icon-library'
import type { DateTimePickerProps, DateTimePreset, DateTimeRange, PresetItem } from './DateTimePicker.types'
import {
  pickerWrapper,
  pickerLabel,
  pickerTrigger,
  triggerText,
  chevronIcon,
  panelOverlay,
  panel,
  presetList,
  presetItem,
  rightContent,
  dateTimeInputRow,
  dateTimeInput,
  inputSeparator,
  calendarRow,
  calendarContainer,
  calendarHeader,
  calendarTitle,
  calendarNavBtn,
  calendarNavChevronLeft,
  calendarNavChevronRight,
  calendarGrid,
  calendarDayLabel,
  calendarDay,
} from './DateTimePicker.css'
import cn from 'classnames'

// ── 기본 프리셋 목록 ─────────────────────────────────────────────────────────

const DEFAULT_PRESETS: PresetItem[] = [
  { value: 'today', label: '오늘' },
  { value: 'yesterday', label: '어제' },
  { value: 'last30m', label: '최근 30분' },
  { value: 'last1h', label: '최근 1시간' },
  { value: 'last6h', label: '최근 6시간' },
  { value: 'last12h', label: '최근 12시간' },
  { value: 'last1d', label: '최근 1일' },
  { value: 'last7d', label: '최근 7일' },
  { value: 'last30d', label: '최근 30일' },
  { value: 'custom', label: '직접 입력' },
]

// ── 헬퍼 ──────────────────────────────────────────────────────────────────────

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatDateTime(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function formatDateOnly(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function startOfDay(d: Date): Date {
  const r = new Date(d)
  r.setHours(0, 0, 0, 0)
  return r
}

function endOfDay(d: Date): Date {
  const r = new Date(d)
  r.setHours(23, 59, 59, 0)
  return r
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function calcPresetRange(preset: DateTimePreset): DateTimeRange {
  const now = new Date()
  switch (preset) {
    case 'today':
      return { start: startOfDay(now), end: endOfDay(now) }
    case 'yesterday': {
      const y = new Date(now)
      y.setDate(y.getDate() - 1)
      return { start: startOfDay(y), end: endOfDay(y) }
    }
    case 'last30m':
      return { start: new Date(now.getTime() - 30 * 60 * 1000), end: now }
    case 'last1h':
      return { start: new Date(now.getTime() - 60 * 60 * 1000), end: now }
    case 'last6h':
      return { start: new Date(now.getTime() - 6 * 60 * 60 * 1000), end: now }
    case 'last12h':
      return { start: new Date(now.getTime() - 12 * 60 * 60 * 1000), end: now }
    case 'last1d':
      return { start: new Date(now.getTime() - 24 * 60 * 60 * 1000), end: now }
    case 'last7d':
      return { start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), end: now }
    case 'last30d':
      return { start: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), end: now }
    case 'custom':
      return { start: startOfDay(now), end: endOfDay(now) }
    default:
      return { start: startOfDay(now), end: endOfDay(now) }
  }
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const days: { date: Date; isOtherMonth: boolean }[] = []

  // 이전달
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, prevMonthDays - i), isOtherMonth: true })
  }
  // 현재달
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: new Date(year, month, i), isOtherMonth: false })
  }
  // 다음달 (6줄 채우기)
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: new Date(year, month + 1, i), isOtherMonth: true })
  }

  return days
}

// ── Calendar 컴포넌트 ─────────────────────────────────────────────────────────

interface CalendarProps {
  year: number
  month: number
  selectedDate?: Date
  rangeStart?: Date
  rangeEnd?: Date
  onSelect: (d: Date) => void
  onMonthChange: (delta: number) => void
}

const Calendar = ({ year, month, selectedDate, rangeStart, rangeEnd, onSelect, onMonthChange }: CalendarProps) => {
  const today = new Date()
  const days = useMemo(() => getCalendarDays(year, month), [year, month])

  return (
    <div className={calendarContainer}>
      <div className={calendarHeader}>
        <button type="button" className={calendarNavBtn} onClick={() => onMonthChange(-1)}>
          <span className={calendarNavChevronLeft}>
            <ExdChevronDownIcon size={12} />
          </span>
        </button>
        <span className={calendarTitle}>
          {year}년 {month + 1}월
        </span>
        <button type="button" className={calendarNavBtn} onClick={() => onMonthChange(1)}>
          <span className={calendarNavChevronRight}>
            <ExdChevronDownIcon size={12} />
          </span>
        </button>
      </div>
      <div className={calendarGrid}>
        {DAY_LABELS.map((d, i) => (
          <span key={d} className={cn(calendarDayLabel, (i === 0 || i === 6) && 'is-weekend')}>
            {d}
          </span>
        ))}
        {days.map(({ date, isOtherMonth }) => {
          const dayOfWeek = date.getDay()
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
          const isInRange =
            rangeStart && rangeEnd && date >= startOfDay(rangeStart) && date <= endOfDay(rangeEnd) && !isSelected
          return (
            <button
              key={date.toISOString()}
              type="button"
              className={cn(
                calendarDay,
                isSameDay(date, today) && 'is-today',
                isSelected && 'is-selected',
                !!isInRange && 'is-in-range',
                isOtherMonth && 'is-other-month',
                (dayOfWeek === 0 || dayOfWeek === 6) && 'is-weekend',
              )}
              onClick={() => onSelect(date)}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── DateTimePicker ────────────────────────────────────────────────────────────

export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      label,
      preset: controlledPreset,
      defaultPreset = 'today',
      onChange,
      presets = DEFAULT_PRESETS,
      disabled = false,
      size = 'sm',
      className,
      style,
    },
    ref,
  ) => {
    const isControlled = controlledPreset !== undefined
    const [internalPreset, setInternalPreset] = useState<DateTimePreset>(defaultPreset)
    const activePreset = isControlled ? controlledPreset : internalPreset

    const [range, setRange] = useState<DateTimeRange>(() => calcPresetRange(defaultPreset))
    const [isOpen, setIsOpen] = useState(false)
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
    const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({})
    const wrapperRef = useRef<HTMLDivElement>(null)

    // 시작/종료 캘린더 월 상태
    const [startCal, setStartCal] = useState({ year: range.start.getFullYear(), month: range.start.getMonth() })
    const [endCal, setEndCal] = useState({ year: range.end.getFullYear(), month: range.end.getMonth() })

    // 직접 입력 모드 텍스트
    const [startText, setStartText] = useState(formatDateTime(range.start))
    const [endText, setEndText] = useState(formatDateTime(range.end))

    // range 변경 시 텍스트 동기화
    useEffect(() => {
      setStartText(formatDateTime(range.start))
      setEndText(formatDateTime(range.end))
    }, [range])

    const updatePanelPosition = useCallback(() => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const PANEL_H = 460
      const next: React.CSSProperties = { left: rect.left, minWidth: rect.width }
      if (rect.bottom + PANEL_H > window.innerHeight && rect.top >= PANEL_H) {
        next.bottom = window.innerHeight - rect.top + 4
      } else {
        next.top = rect.bottom + 4
      }
      setPanelStyle(next)
    }, [])

    useEffect(() => {
      if (!isOpen) return
      window.addEventListener('scroll', updatePanelPosition, true)
      window.addEventListener('resize', updatePanelPosition)
      return () => {
        window.removeEventListener('scroll', updatePanelPosition, true)
        window.removeEventListener('resize', updatePanelPosition)
      }
    }, [isOpen, updatePanelPosition])

    const handleOpen = useCallback(() => {
      if (disabled) return
      if (!isOpen && wrapperRef.current) {
        const sol = wrapperRef.current.closest('[data-solution]') as HTMLElement | null
        setPortalRoot(sol ?? document.body)
        updatePanelPosition()
      }
      setIsOpen((v) => !v)
    }, [disabled, isOpen, updatePanelPosition])

    const applyRange = useCallback(
      (newRange: DateTimeRange, preset: DateTimePreset) => {
        setRange(newRange)
        if (!isControlled) setInternalPreset(preset)
        onChange?.(newRange, preset)
      },
      [isControlled, onChange],
    )

    // 프리셋 선택
    const handlePresetClick = useCallback(
      (p: DateTimePreset) => {
        if (p === 'custom') {
          if (!isControlled) setInternalPreset('custom')
          return
        }
        const newRange = calcPresetRange(p)
        applyRange(newRange, p)
        setStartCal({ year: newRange.start.getFullYear(), month: newRange.start.getMonth() })
        setEndCal({ year: newRange.end.getFullYear(), month: newRange.end.getMonth() })
      },
      [applyRange, isControlled],
    )

    // 시작 캘린더 날짜 선택 → 시간 00:00:00 초기화
    const handleStartDateSelect = useCallback(
      (d: Date) => {
        const newStart = startOfDay(d)
        let newEnd = range.end
        // 시작이 종료보다 뒤면 종료를 같은 날 23:59:59로
        if (newStart > newEnd) {
          newEnd = endOfDay(d)
        }
        applyRange({ start: newStart, end: newEnd }, 'custom')
        setStartCal({ year: d.getFullYear(), month: d.getMonth() })
      },
      [range.end, applyRange],
    )

    // 종료 캘린더 날짜 선택 → 시간 23:59:59 초기화
    const handleEndDateSelect = useCallback(
      (d: Date) => {
        let newStart = range.start
        const newEnd = endOfDay(d)
        // 종료가 시작보다 앞이면 시작을 같은 날 00:00:00으로
        if (newEnd < newStart) {
          newStart = startOfDay(d)
        }
        applyRange({ start: newStart, end: newEnd }, 'custom')
        setEndCal({ year: d.getFullYear(), month: d.getMonth() })
      },
      [range.start, applyRange],
    )

    // 직접 입력 — 시작
    const handleStartInputBlur = useCallback(() => {
      const parsed = new Date(startText.replace(/\//g, '-'))
      if (isNaN(parsed.getTime())) {
        setStartText(formatDateTime(range.start))
        return
      }
      // 날짜만 입력 시 시간 자동 입력 (00:00:00)
      if (/^\d{4}-\d{2}-\d{2}$/.test(startText.trim())) {
        parsed.setHours(0, 0, 0, 0)
      }
      let newEnd = range.end
      if (parsed > newEnd) {
        newEnd = endOfDay(parsed)
      }
      applyRange({ start: parsed, end: newEnd }, 'custom')
      setStartCal({ year: parsed.getFullYear(), month: parsed.getMonth() })
    }, [startText, range, applyRange])

    // 직접 입력 — 종료
    const handleEndInputBlur = useCallback(() => {
      const parsed = new Date(endText.replace(/\//g, '-'))
      if (isNaN(parsed.getTime())) {
        setEndText(formatDateTime(range.end))
        return
      }
      if (/^\d{4}-\d{2}-\d{2}$/.test(endText.trim())) {
        parsed.setHours(23, 59, 59, 0)
      }
      let newStart = range.start
      if (parsed < newStart) {
        newStart = startOfDay(parsed)
      }
      applyRange({ start: newStart, end: parsed }, 'custom')
      setEndCal({ year: parsed.getFullYear(), month: parsed.getMonth() })
    }, [endText, range, applyRange])

    const handleInputKeyDown = useCallback(
      (e: React.KeyboardEvent, type: 'start' | 'end') => {
        if (e.key === 'Enter') {
          if (type === 'start') handleStartInputBlur()
          else handleEndInputBlur()
        }
      },
      [handleStartInputBlur, handleEndInputBlur],
    )

    // 트리거 텍스트
    const triggerLabel = useMemo(() => {
      const matchedPreset = presets.find((p) => p.value === activePreset)
      if (activePreset === 'custom') {
        return `${formatDateOnly(range.start)} ~ ${formatDateOnly(range.end)}`
      }
      const rangeStr = `${formatDateTime(range.start)} ~ ${formatDateTime(range.end)}`
      return matchedPreset ? `${rangeStr}` : rangeStr
    }, [activePreset, range, presets])

    return (
      <>
        <div ref={ref} className={cn(pickerWrapper, className)} style={style}>
          {label && <label className={pickerLabel}>{label}</label>}
          <div ref={wrapperRef}>
            <button
              type="button"
              disabled={disabled}
              className={cn(pickerTrigger, `picker-${size}`, isOpen && 'is-open', !!label && 'has-label')}
              onClick={handleOpen}
            >
              <span className={triggerText}>{triggerLabel}</span>
              <span className={cn(chevronIcon, isOpen && 'is-open')}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {isOpen &&
          portalRoot &&
          createPortal(
            <>
              <div className={panelOverlay} onClick={() => setIsOpen(false)} />
              <div className={panel} style={panelStyle}>
                {/* 프리셋 목록 */}
                <ul className={presetList}>
                  {presets.map((p) => (
                    <li
                      key={p.value}
                      className={cn(presetItem, activePreset === p.value && 'is-active')}
                      onClick={() => handlePresetClick(p.value)}
                    >
                      {p.label}
                    </li>
                  ))}
                </ul>

                {/* 날짜/시간 입력 + 캘린더 */}
                <div className={rightContent}>
                  <div className={dateTimeInputRow}>
                    <input
                      className={dateTimeInput}
                      value={startText}
                      onChange={(e) => {
                        setStartText(e.target.value)
                        if (!isControlled) setInternalPreset('custom')
                      }}
                      onBlur={handleStartInputBlur}
                      onKeyDown={(e) => handleInputKeyDown(e, 'start')}
                    />
                    <span className={inputSeparator}>~</span>
                    <input
                      className={dateTimeInput}
                      value={endText}
                      onChange={(e) => {
                        setEndText(e.target.value)
                        if (!isControlled) setInternalPreset('custom')
                      }}
                      onBlur={handleEndInputBlur}
                      onKeyDown={(e) => handleInputKeyDown(e, 'end')}
                    />
                  </div>

                  <div className={calendarRow}>
                    <Calendar
                      year={startCal.year}
                      month={startCal.month}
                      selectedDate={range.start}
                      rangeStart={range.start}
                      rangeEnd={range.end}
                      onSelect={handleStartDateSelect}
                      onMonthChange={(delta) =>
                        setStartCal((prev) => {
                          const d = new Date(prev.year, prev.month + delta)
                          return { year: d.getFullYear(), month: d.getMonth() }
                        })
                      }
                    />
                    <Calendar
                      year={endCal.year}
                      month={endCal.month}
                      selectedDate={range.end}
                      rangeStart={range.start}
                      rangeEnd={range.end}
                      onSelect={handleEndDateSelect}
                      onMonthChange={(delta) =>
                        setEndCal((prev) => {
                          const d = new Date(prev.year, prev.month + delta)
                          return { year: d.getFullYear(), month: d.getMonth() }
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </>,
            portalRoot,
          )}
      </>
    )
  },
)

DateTimePicker.displayName = 'DateTimePicker'
