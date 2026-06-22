import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ConfirmModal } from './ConfirmModal'

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  decorators: [
    (Story) => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConfirmModal>

export default meta

const Demo = ({ title, message, danger = false }: { title?: string; message: string; danger?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        모달 열기
      </button>
      <ConfirmModal
        isOpen={isOpen}
        title={title}
        message={message}
        danger={danger}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      />
    </>
  )
}

export const Default: StoryObj = {
  render: () => <Demo message="정말 삭제하시겠습니까?" />,
}

export const WithTitle: StoryObj = {
  render: () => <Demo title="삭제 확인" message="선택한 항목을 삭제하시겠습니까?" />,
}

export const Danger: StoryObj = {
  render: () => <Demo title="경고" message="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?" danger={true} />,
}
