import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { vars } from '../../theme/contract.css'
import {
  XdrStatusInfoIcon,
  XdrStatusNormalIcon,
  XdrStatusCautionIcon,
  XdrStatusErrorIcon,
  XdrStatusNodataIcon,
} from '@port/icon-library'
import { Button } from '../../components/Button'
import AlertModal from '../../components/AlertModal'
import type { AlertType } from '../../components/AlertModal'

const meta = {
  title: 'StyleGuide/AlertModal',
  component: AlertModal,
  parameters: { layout: 'padded' },
  argTypes: {
    open: {
      control: 'boolean',
      description: '모달 열림/닫힘 상태',
      table: { category: 'State' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '모달 크기',
      table: { category: 'Appearance' },
    },
    closeOnOverlay: {
      control: 'boolean',
      description: '배경 클릭으로 닫기',
      table: { category: 'Behavior' },
    },
  },
  args: {
    open: false,
    size: 'sm',
    closeOnOverlay: true,
  },
} satisfies Meta<typeof AlertModal>

export default meta
type Story = StoryObj<typeof meta>

const ICON_MAP: Record<AlertType, React.ReactElement> = {
  info: <XdrStatusInfoIcon />,
  success: <XdrStatusNormalIcon />,
  warning: <XdrStatusCautionIcon />,
  error: <XdrStatusErrorIcon />,
  confirm: <XdrStatusNodataIcon />,
}

const Label = ({ children }: { children: string }) => (
  <code
    style={{
      display: 'inline-block',
      marginBottom: 6,
      fontSize: 11,
      fontFamily: 'monospace',
      color: vars.color.textSecondary,
    }}
  >
    {children}
  </code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 size · closeOnOverlay를 조정합니다. */
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ minHeight: 200 }}>
        <Button onClick={() => setOpen(true)}>AlertModal 열기</Button>
        <AlertModal {...args} open={open} onClose={() => setOpen(false)}>
          <AlertModal.Header title="알림" type="info" icon={ICON_MAP.info} />
          <AlertModal.Body description="이것은 알림 메시지입니다. 확인을 누르면 닫힙니다." />
          <AlertModal.Footer onPrimary={() => setOpen(false)} />
        </AlertModal>
      </div>
    )
  },
}

// ── AlertTypes ────────────────────────────────────────────────────────────────

/** info / success / warning / error / confirm 5가지 타입을 확인합니다. */
export const AlertTypes: Story = {
  render: () => {
    const [activeType, setActiveType] = useState<AlertType | null>(null)
    const types: AlertType[] = ['info', 'success', 'warning', 'error', 'confirm']
    return (
      <div style={{ minHeight: 200 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {types.map((t) => (
            <Button key={t} variant="secondary" onClick={() => setActiveType(t)}>
              {t}
            </Button>
          ))}
        </div>
        {activeType !== null && (
          <AlertModal open onClose={() => setActiveType(null)}>
            <AlertModal.Header title={`${activeType} 알림`} type={activeType} icon={ICON_MAP[activeType]} />
            <AlertModal.Body description={`${activeType} 유형의 알림입니다.`} />
            <AlertModal.Footer
              confirmVariant={activeType}
              onPrimary={() => setActiveType(null)}
              onCancel={() => setActiveType(null)}
              showCancelButton
            />
          </AlertModal>
        )}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithCancel ────────────────────────────────────────────────────────────────

/** 취소 버튼이 있는 확인 다이얼로그. 파괴적 작업 확인에 사용합니다. */
export const WithCancel: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 200 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button onClick={() => setOpen(true)}>삭제 확인 열기</Button>
          {result && <Label>{`결과: ${result}`}</Label>}
        </div>
        <AlertModal open={open} onClose={() => setOpen(false)}>
          <AlertModal.Header title="삭제하시겠습니까?" type="error" icon={ICON_MAP.error} />
          <AlertModal.Body description="이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?" />
          <AlertModal.Footer
            showCancelButton
            primaryLabel="삭제"
            cancelLabel="취소"
            confirmVariant="error"
            onPrimary={() => {
              setResult('확인')
              setOpen(false)
            }}
            onCancel={() => {
              setResult('취소')
              setOpen(false)
            }}
          />
        </AlertModal>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
