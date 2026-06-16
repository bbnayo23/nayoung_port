import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Drawer } from './Drawer'
import type { DrawerSide, DrawerSize } from './Drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
}

export default meta
type Story = StoryObj<typeof Drawer>

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>드로어 열기</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>필터</Drawer.Header>
        <Drawer.Body>
          <p style={{ margin: 0 }}>여기에 필터 옵션을 배치합니다.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="outline" onClick={() => setOpen(false)}>
            초기화
          </Button>
          <Button onClick={() => setOpen(false)}>적용</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}

function DrawerSidesDemo() {
  const [side, setSide] = useState<DrawerSide | null>(null)
  const options: DrawerSide[] = ['left', 'right', 'top', 'bottom']
  return (
    <>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {options.map((s) => (
          <Button key={s} variant="secondary" onClick={() => setSide(s)}>
            {s}
          </Button>
        ))}
      </div>
      <Drawer open={side !== null} onClose={() => setSide(null)} side={side ?? 'left'}>
        <Drawer.Header>{side} 드로어</Drawer.Header>
        <Drawer.Body>
          <p style={{ margin: 0 }}>&quot;{side}&quot; 방향에서 슬라이드합니다.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setSide(null)}>닫기</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}

function DrawerSizesDemo() {
  const [size, setSize] = useState<DrawerSize | null>(null)
  const options: DrawerSize[] = ['sm', 'md', 'lg']
  return (
    <>
      <div style={{ display: 'flex', gap: 12 }}>
        {options.map((s) => (
          <Button key={s} variant="secondary" onClick={() => setSize(s)}>
            {s.toUpperCase()} 드로어
          </Button>
        ))}
      </div>
      <Drawer open={size !== null} onClose={() => setSize(null)} side="right" size={size ?? 'md'}>
        <Drawer.Header>{size?.toUpperCase()} 사이즈</Drawer.Header>
        <Drawer.Body>
          <p style={{ margin: 0 }}>이 드로어의 폭은 &quot;{size}&quot; 입니다.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setSize(null)}>닫기</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}

export const Playground: Story = {
  render: () => <DrawerDemo />,
}

export const Sides: Story = {
  render: () => <DrawerSidesDemo />,
}

export const Sizes: Story = {
  render: () => <DrawerSizesDemo />,
}
