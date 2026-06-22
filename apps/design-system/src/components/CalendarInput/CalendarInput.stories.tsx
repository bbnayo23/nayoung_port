import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarInput } from './CalendarInput'
import { FieldGroup } from '../FieldGroup'

const meta = {
  title: 'Components/CalendarInput',
  component: CalendarInput,
} satisfies Meta<typeof CalendarInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    const [text, setText] = useState('')

    return (
      <CalendarInput
        value={text}
        selectedDate={date}
        onDateSelect={(d) => {
          if (d) {
            setDate(d)
            setText(d.toLocaleString('ko-KR'))
          }
        }}
        onInputChange={setText}
      />
    )
  },
}

export const Disabled: Story = {
  render: () => <CalendarInput value="2025-01-15" disabled />,
}

export const InFieldGroup: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    const [text, setText] = useState('')

    return (
      <FieldGroup label="날짜 선택">
        <CalendarInput
          value={text}
          selectedDate={date}
          onDateSelect={(d) => {
            if (d) {
              setDate(d)
              setText(d.toLocaleString('ko-KR'))
            }
          }}
          onInputChange={setText}
        />
      </FieldGroup>
    )
  },
}
