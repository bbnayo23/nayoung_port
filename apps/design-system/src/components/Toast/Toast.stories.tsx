import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { ToastProvider, useToast } from './Toast'

function Demo() {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ title: '정보', description: '새로운 업데이트가 있습니다.', variant: 'info' })
        }
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ title: '저장 완료', description: '변경 사항이 저장되었습니다.', variant: 'success' })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ title: '주의', description: '용량이 거의 찼습니다.', variant: 'warning' })
        }
      >
        Warning
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({ title: '오류 발생', description: '요청을 처리하지 못했습니다.', variant: 'danger' })
        }
      >
        Danger
      </Button>
    </div>
  )
}

const meta: Meta<typeof Demo> = {
  title: 'Components/Toast',
  component: Demo,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Demo>

export const Playground: Story = {}
