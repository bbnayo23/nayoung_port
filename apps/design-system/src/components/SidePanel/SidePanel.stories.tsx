import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidePanel } from './SidePanel'
import { Button } from '../Button'

const meta = {
  title: 'Components/SidePanel',
  component: SidePanel,
} satisfies Meta<typeof SidePanel>

export default meta
type Story = StoryObj<typeof meta>

/** 닫힌 상태 */
export const Closed: Story = {
  args: {} as never,
  render: () => (
    <SidePanel open={false} onClose={() => {}}>
      닫혀 있는 패널
    </SidePanel>
  ),
}

/** 오른쪽에서 열림 (기본) */
export const OpenRight: Story = {
  args: {} as never,
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>오른쪽 패널 열기</Button>
        <SidePanel open={open} onClose={() => setOpen(false)}>
          오른쪽에서 열리는 패널 내용입니다.
        </SidePanel>
      </>
    )
  },
}

/** 왼쪽에서 열림 */
export const OpenLeft: Story = {
  args: {} as never,
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>왼쪽 패널 열기</Button>
        <SidePanel open={open} onClose={() => setOpen(false)} side="left">
          왼쪽에서 열리는 패널 내용입니다.
        </SidePanel>
      </>
    )
  },
}

/** 제목이 있는 패널 */
export const OpenWithTitle: Story = {
  args: {} as never,
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>패널 열기</Button>
        <SidePanel open={open} onClose={() => setOpen(false)} title="상세 정보">
          제목이 있는 패널 내용입니다.
        </SidePanel>
      </>
    )
  },
}

/** 넓은 패널 */
export const Wide: Story = {
  args: {} as never,
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>넓은 패널 열기</Button>
        <SidePanel open={open} onClose={() => setOpen(false)} title="넓은 패널" width={640}>
          width=640으로 설정된 패널입니다.
        </SidePanel>
      </>
    )
  },
}
