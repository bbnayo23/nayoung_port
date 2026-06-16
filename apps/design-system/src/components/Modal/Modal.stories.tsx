import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Modal } from './Modal'
import type { ModalSize } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>약관 동의</Modal.Header>
        <Modal.Body>
          <p style={{ margin: 0 }}>
            서비스를 이용하려면 약관에 동의해야 합니다. 계속 진행하시겠습니까?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={() => setOpen(false)}>확인</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

function ModalSizesDemo() {
  const [size, setSize] = useState<ModalSize | null>(null)
  const options: ModalSize[] = ['sm', 'md', 'lg']
  return (
    <>
      <div style={{ display: 'flex', gap: 12 }}>
        {options.map((s) => (
          <Button key={s} variant="secondary" onClick={() => setSize(s)}>
            {s.toUpperCase()} 모달
          </Button>
        ))}
      </div>
      <Modal open={size !== null} onClose={() => setSize(null)} size={size ?? 'md'}>
        <Modal.Header>{size?.toUpperCase()} 사이즈</Modal.Header>
        <Modal.Body>
          <p style={{ margin: 0 }}>이 모달의 크기는 &quot;{size}&quot; 입니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setSize(null)}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const Playground: Story = {
  render: () => <ModalDemo />,
}

export const Sizes: Story = {
  render: () => <ModalSizesDemo />,
}
