import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { cx } from '../../utils'
import * as styles from './Calendar.css'

// ---------------------------------------------------------------------------
// 타입 (types.ts 를 Calendar.tsx 에 통합)
// ---------------------------------------------------------------------------

export interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  /** 이 날짜 이전은 선택 불가 */
  disabledBefore?: Date
  /** 이 날짜 이후는 선택 불가 */
  disabledAfter?: Date
  className?: string
}

// ---------------------------------------------------------------------------
// 내부 유틸
// ---------------------------------------------------------------------------

const formatCaption = (month: Date) =>
  `${month.getFullYear()}년 ${month.getMonth() + 1}월`

const toMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)

const sameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

// ---------------------------------------------------------------------------
// Calendar
// ---------------------------------------------------------------------------

export const Calendar = ({
  selected,
  onSelect,
  disabledBefore,
  disabledAfter,
  className,
}: CalendarProps) => {
  const [month, setMonth] = useState<Date>(() => toMonth(selected ?? new Date()))

  // selected가 외부에서 바뀌면 해당 월로 이동. 함수형 setState로 내부 네비(월 변경)에선 재실행 안됨.
  useEffect(() => {
    if (!selected) return
    setMonth((prev) => (sameMonth(prev, selected) ? prev : toMonth(selected)))
  }, [selected])

  const disabled = [
    ...(disabledBefore ? [{ before: disabledBefore }] : []),
    ...(disabledAfter ? [{ after: disabledAfter }] : []),
  ]

  return (
    <div className={cx(styles.wrapper, className)}>
      <DayPicker
        mode="single"
        weekStartsOn={0}
        selected={selected}
        onSelect={onSelect}
        month={month}
        onMonthChange={setMonth}
        disabled={disabled.length > 0 ? disabled : undefined}
        showOutsideDays
        fixedWeeks
        formatters={{ formatMonthCaption: formatCaption }}
      />
    </div>
  )
}
