import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { CalendarInput } from '@dc/components/CalendarInput'

const meta = {
  title: 'StyleGuide/CalendarInput',
  component: CalendarInput,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: false },
    selectedDate: { control: false },
  },
  args: {
    placeholder: 'YYYY-MM-DD HH:mm:ss',
    disabled: false,
  },
} satisfies Meta<typeof CalendarInput>

export default meta
type Story = StoryObj<typeof meta>

const pad = (n: number) => String(n).padStart(2, '0')
const formatDate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date ?? null)
      setValue(date ? formatDate(date) : '')
    }

    return (
      <div style={{ maxWidth: 280 }}>
        <CalendarInput
          {...args}
          value={value}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onInputChange={setValue}
        />
      </div>
    )
  },
}

export const WithPreselectedDate: Story = {
  render: () => {
    const now = new Date()
    const [value, setValue] = useState(formatDate(now))
    const [selectedDate, setSelectedDate] = useState<Date | null>(now)

    const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date ?? null)
      setValue(date ? formatDate(date) : '')
    }

    return (
      <div style={{ maxWidth: 280 }}>
        <CalendarInput
          value={value}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onInputChange={setValue}
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <CalendarInput value="2025-01-15 09:00:00" disabled />
    </div>
  ),
  parameters: { controls: { disable: true } },
}

export const WithDisabledRange: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const today = new Date()
    const disabledBefore = new Date(today.getFullYear(), today.getMonth(), 1)
    const disabledAfter = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date ?? null)
      setValue(date ? formatDate(date) : '')
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#888' }}>이번 달 날짜만 선택 가능합니다.</p>
        <CalendarInput
          value={value}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onInputChange={setValue}
          disabledBefore={disabledBefore}
          disabledAfter={disabledAfter}
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
