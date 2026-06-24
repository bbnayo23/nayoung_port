import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Calendar } from '../../components/Calendar'

const meta = {
  title: 'StyleGuide/Calendar',
  component: Calendar,
  parameters: { layout: 'padded' },
  argTypes: {
    selected: { control: false },
    onSelect: { table: { disable: true } },
    disabledBefore: { control: false },
    disabledAfter: { control: false },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date())
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Calendar selected={selected} onSelect={setSelected} />
        <p style={{ margin: 0, fontSize: 13, color: '#888' }}>
          선택된 날짜: <strong>{selected?.toLocaleDateString('ko-KR') ?? '없음'}</strong>
        </p>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>()
    return <Calendar selected={selected} onSelect={setSelected} />
  },
  parameters: { controls: { disable: true } },
}

export const WithDisabledRange: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date())
    const today = new Date()
    const disabledBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    const disabledAfter = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#888' }}>오늘 기준 ±7일만 선택 가능합니다.</p>
        <Calendar
          selected={selected}
          onSelect={setSelected}
          disabledBefore={disabledBefore}
          disabledAfter={disabledAfter}
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const PreselectedDate: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date(2025, 0, 15))
    return <Calendar selected={selected} onSelect={setSelected} />
  },
  parameters: { controls: { disable: true } },
}
