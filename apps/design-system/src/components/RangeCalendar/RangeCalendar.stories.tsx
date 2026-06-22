import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RangeCalendar } from './RangeCalendar'
import type { RangePreset } from './RangeCalendar'
import { FieldGroup } from '../FieldGroup'

// Stories 전용 no-dep formatter (실제 app에서는 common의 formatDateTime/parseDateTime 주입)
const pad2 = (n: number) => String(n).padStart(2, '0')
const fmt = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
const parse = (s: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(s)
  if (!m) return null
  const date = new Date(+m[1]!, +m[2]! - 1, +m[3]!, +m[4]!, +m[5]!, +m[6]!)
  return isNaN(date.getTime()) ? null : date
}

const now = new Date()
const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

const presets: RangePreset[] = [
  {
    label: '오늘',
    type: 'preset',
    getValue: () => ({ start: startOfToday, end: now }),
  },
  {
    label: '최근 1시간',
    type: 'preset',
    editValue: '-1h',
    getValue: () => ({
      start: new Date(Date.now() - 3_600_000),
      end: new Date(),
    }),
  },
  {
    label: '최근 7일',
    type: 'preset',
    editValue: '-7d',
    getValue: () => ({
      start: new Date(Date.now() - 7 * 86_400_000),
      end: new Date(),
    }),
  },
  {
    label: '최근 30일',
    type: 'preset',
    editValue: '-30d',
    getValue: () => ({
      start: new Date(Date.now() - 30 * 86_400_000),
      end: new Date(),
    }),
  },
  { label: '직접입력', type: 'custom' },
]

const meta = {
  title: 'Components/RangeCalendar',
  component: RangeCalendar,
  args: {
    formatDate: fmt,
    parseDate: parse,
    presets,
    placeholder: '기간 선택',
  },
} satisfies Meta<typeof RangeCalendar>

export default meta
type Story = StoryObj<typeof meta>

const useRangeCalendarDemo = () => {
  const [relativeValue, setRelativeValue] = useState<string | null>('오늘')
  const [start, setStart] = useState<Date | null>(startOfToday)
  const [end, setEnd] = useState<Date | null>(now)

  return {
    relativeValue,
    onRelativeValueChange: setRelativeValue,
    start,
    end,
    onStartChange: setStart,
    onEndChange: setEnd,
    presets,
    placeholder: '기간 선택',
    formatDate: fmt,
    parseDate: parse,
  }
}

/** 기본 시나리오 — preset 전환, focus 시 편집식 표시, Calendar 날짜 클릭 시 absolute 전환 */
export const Default: Story = {
  render: () => {
    const props = useRangeCalendarDemo()
    return <RangeCalendar {...props} />
  },
}

/** FieldGroup 내부 */
export const InFieldGroup: Story = {
  render: () => {
    const props = useRangeCalendarDemo()
    return (
      <FieldGroup label="검색 시간">
        <RangeCalendar {...props} />
      </FieldGroup>
    )
  },
}
