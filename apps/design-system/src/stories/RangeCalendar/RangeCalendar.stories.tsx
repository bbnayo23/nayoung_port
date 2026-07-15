import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { RangeCalendar } from '@dc/components/RangeCalendar'
import type { RangePreset, DateRange } from '@dc/components/RangeCalendar'

const meta = {
  title: 'StyleGuide/RangeCalendar',
  component: RangeCalendar,
  parameters: { layout: 'padded' },
  args: {
    presets: [],
    formatDate: (d: Date) => d.toISOString(),
    parseDate: (text: string): Date | null => {
      const d = new Date(text)
      return isNaN(d.getTime()) ? null : d
    },
  },
} satisfies Meta<typeof RangeCalendar>

export default meta
type Story = StoryObj<typeof meta>

const pad = (n: number) => String(n).padStart(2, '0')
const formatDate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

const parseDate = (text: string): Date | null => {
  const d = new Date(text.replace(' ', 'T'))
  return isNaN(d.getTime()) ? null : d
}

const now = new Date()
const makePresets = (): RangePreset[] => [
  {
    label: '최근 1시간',
    type: 'preset',
    editValue: '-1h',
    getValue: (): DateRange => ({ start: new Date(now.getTime() - 3_600_000), end: now }),
  },
  {
    label: '최근 6시간',
    type: 'preset',
    editValue: '-6h',
    getValue: (): DateRange => ({ start: new Date(now.getTime() - 6 * 3_600_000), end: now }),
  },
  {
    label: '최근 24시간',
    type: 'preset',
    editValue: '-24h',
    getValue: (): DateRange => ({ start: new Date(now.getTime() - 24 * 3_600_000), end: now }),
  },
  {
    label: '오늘',
    type: 'preset',
    getValue: (): DateRange => {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return { start, end: now }
    },
  },
  {
    label: '어제',
    type: 'preset',
    getValue: (): DateRange => {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, -1)
      return { start, end }
    },
  },
  { label: '직접입력', type: 'custom' },
]

export const AbsoluteMode: Story = {
  render: () => {
    const [start, setStart] = useState<Date | null>(new Date(now.getTime() - 3_600_000))
    const [end, setEnd] = useState<Date | null>(now)
    const [relativeValue, setRelativeValue] = useState<string | null>(null)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RangeCalendar
          start={start}
          end={end}
          relativeValue={relativeValue}
          onStartChange={setStart}
          onEndChange={setEnd}
          onRelativeValueChange={setRelativeValue}
          presets={makePresets()}
          formatDate={formatDate}
          parseDate={parseDate}
        />
        <p style={{ margin: 0, fontSize: 12, color: '#888', fontFamily: 'monospace' }}>
          {start ? formatDate(start) : '—'} ~ {end ? formatDate(end) : '—'}
        </p>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const RelativeMode: Story = {
  render: () => {
    const [start, setStart] = useState<Date | null>(new Date(now.getTime() - 3_600_000))
    const [end, setEnd] = useState<Date | null>(now)
    const [relativeValue, setRelativeValue] = useState<string | null>('최근 1시간')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RangeCalendar
          start={start}
          end={end}
          relativeValue={relativeValue}
          onStartChange={setStart}
          onEndChange={setEnd}
          onRelativeValueChange={setRelativeValue}
          presets={makePresets()}
          formatDate={formatDate}
          parseDate={parseDate}
          placeholder="-1h"
        />
        <p style={{ margin: 0, fontSize: 12, color: '#888' }}>
          모드: <strong>{relativeValue === null ? 'absolute' : 'relative'}</strong>
          {relativeValue !== null && (
            <>
              {' '}
              · 값: <strong>{relativeValue || '(미입력)'}</strong>
            </>
          )}
        </p>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const WithPresets: Story = {
  render: () => {
    const [start, setStart] = useState<Date | null>(null)
    const [end, setEnd] = useState<Date | null>(null)
    const [relativeValue, setRelativeValue] = useState<string | null>(null)
    const [log, setLog] = useState<string[]>([])

    const handleStartChange = (d: Date) => {
      setStart(d)
      setLog((p) => [`시작: ${formatDate(d)}`, ...p.slice(0, 4)])
    }
    const handleEndChange = (d: Date) => {
      setEnd(d)
      setLog((p) => [`종료: ${formatDate(d)}`, ...p.slice(0, 4)])
    }
    const handleRelativeChange = (v: string | null) => {
      setRelativeValue(v)
      setLog((p) => [`상대값: ${v ?? 'null'}`, ...p.slice(0, 4)])
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RangeCalendar
          start={start}
          end={end}
          relativeValue={relativeValue}
          onStartChange={handleStartChange}
          onEndChange={handleEndChange}
          onRelativeValueChange={handleRelativeChange}
          presets={makePresets()}
          formatDate={formatDate}
          parseDate={parseDate}
        />
        <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace', minHeight: 64 }}>
          {log.length === 0 ? '— 프리셋을 클릭하거나 날짜를 선택하세요' : log.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const Disabled: Story = {
  render: () => (
    <RangeCalendar
      start={new Date(now.getTime() - 3_600_000)}
      end={now}
      relativeValue={null}
      presets={makePresets()}
      formatDate={formatDate}
      parseDate={parseDate}
      disabled
    />
  ),
  parameters: { controls: { disable: true } },
}
