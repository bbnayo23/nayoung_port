import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from './Calendar'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 캘린더 — 날짜 선택 가능 */
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>()
    return <Calendar selected={selected} onSelect={setSelected} />
  },
}

/** 특정 날짜가 선택된 상태 */
export const WithSelected: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date(2025, 0, 15))
    return <Calendar selected={selected} onSelect={setSelected} />
  },
}

/** 선택 불가 범위 — 오늘 이전 비활성 */
export const DisabledBefore: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>()
    return <Calendar selected={selected} onSelect={setSelected} disabledBefore={new Date()} />
  },
}
