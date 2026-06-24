import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/src/style.css'
import { XdrChevronLeftIcon, XdrChevronRightIcon } from '@port/icon-library'
import type { CalendarProps } from './types'
import * as styles from './Calendar.css'

const CalendarChevron = ({ orientation }: { orientation?: string }) =>
  orientation === 'left' ? <XdrChevronLeftIcon size={14} /> : <XdrChevronRightIcon size={14} />

const formatCaption = (month: Date) => `${month.getFullYear()}년 ${month.getMonth() + 1}월`
const toMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)
const sameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

export const Calendar = ({ selected, onSelect, disabledBefore, disabledAfter, className }: CalendarProps) => {
  const [month, setMonth] = useState<Date>(() => toMonth(selected ?? new Date()))

  useEffect(() => {
    if (!selected) return
    setMonth((prev) => (sameMonth(prev, selected) ? prev : toMonth(selected)))
  }, [selected])

  const disabled = [
    ...(disabledBefore ? [{ before: disabledBefore }] : []),
    ...(disabledAfter ? [{ after: disabledAfter }] : []),
  ]

  return (
    <div className={`${styles.wrapper}${className ? ` ${className}` : ''}`}>
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
        components={{ Chevron: CalendarChevron }}
      />
    </div>
  )
}

export default Calendar
