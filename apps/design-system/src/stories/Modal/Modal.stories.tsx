import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Modal from '../../components/Modal'
import type { ModalProps } from '../../components/Modal'

const meta = {
  title: 'StyleGuide/Modal',
  component: Modal,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies ModalProps['size'][],
      description: '모달 너비 크기',
      table: { category: 'Appearance' },
    },
    type: {
      control: 'select',
      options: ['modal', 'sidepanel'] satisfies ModalProps['type'][],
      description: '표시 형태',
      table: { category: 'Appearance' },
    },
    position: {
      control: 'select',
      options: ['left', 'right'] satisfies ModalProps['position'][],
      description: "사이드 패널 위치 (type='sidepanel'일 때)",
      table: { category: 'Appearance' },
    },
    showDimmed: {
      control: 'boolean',
      description: '사이드 패널에서 딤드 배경 표시 여부',
      table: { category: 'Appearance' },
    },
    showCloseButton: {
      control: 'boolean',
      description: '사이드 패널 우상단 닫기 버튼 표시 여부',
      table: { category: 'Appearance' },
    },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
    isClosing: { table: { disable: true } },
    portalTarget: { table: { disable: true } },
  },
  args: {
    size: 'md',
    type: 'modal',
    showDimmed: false,
    showCloseButton: true,
    onClose: () => {},
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const Btn = ({
  children,
  onClick,
  variant = 'primary',
}: {
  children: string
  onClick: () => void
  variant?: 'primary' | 'ghost' | 'outline'
}) => (
  <button
    onClick={onClick}
    style={{
      padding: '6px 14px',
      fontSize: 13,
      fontWeight: 500,
      border: `1px solid ${variant === 'primary' ? vars.color.primary : vars.color.border}`,
      borderRadius: vars.radius.sm,
      background: variant === 'primary' ? vars.color.primary : 'transparent',
      color: variant === 'primary' ? '#fff' : vars.color.text,
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 size · type · position 등을 조정한 뒤 버튼으로 모달을 엽니다. */
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Btn onClick={() => setOpen(true)}>모달 열기</Btn>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <Modal.Header>모달 제목</Modal.Header>
          <Modal.Body>
            <p style={{ margin: 0, fontSize: 13, color: vars.color.text, lineHeight: 1.7 }}>
              모달 본문 내용입니다. Controls 패널에서 size · type · position을 변경해 보세요.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Btn variant="ghost" onClick={() => setOpen(false)}>
                취소
              </Btn>
              <Btn onClick={() => setOpen(false)}>확인</Btn>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    )
  },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

/** sm · md · lg 세 가지 크기를 각각 열어볼 수 있습니다. */
export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null)
    return (
      <>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Btn key={s} variant="outline" onClick={() => setSize(s)}>
              {`Size: ${s}`}
            </Btn>
          ))}
        </div>
        {size && (
          <Modal open onClose={() => setSize(null)} size={size}>
            <Modal.Header>{`Size: ${size}`}</Modal.Header>
            <Modal.Body>
              <p style={{ margin: 0, fontSize: 13, color: vars.color.text }}>{`${size} 크기의 모달입니다.`}</p>
            </Modal.Body>
            <Modal.Footer>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Btn onClick={() => setSize(null)}>닫기</Btn>
              </div>
            </Modal.Footer>
          </Modal>
        )}
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── SidePanel ─────────────────────────────────────────────────────────────────

/** type="sidepanel"로 우측 슬라이드 패널을 표시합니다. */
export const SidePanel: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Btn variant="outline" onClick={() => setOpen(true)}>
          우측 패널 열기
        </Btn>
        {open && (
          <Modal open onClose={() => setOpen(false)} type="sidepanel" position="right" showCloseButton>
            <Modal.Header>우측 사이드 패널</Modal.Header>
            <Modal.Body>
              <p style={{ margin: 0, fontSize: 13, color: vars.color.text, lineHeight: 1.7 }}>
                사이드 패널 내용입니다. 화면 오른쪽에서 슬라이드됩니다.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Btn onClick={() => setOpen(false)}>닫기</Btn>
              </div>
            </Modal.Footer>
          </Modal>
        )}
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithDimmed ────────────────────────────────────────────────────────────────

/** showDimmed=true로 사이드 패널에서도 딤드 배경을 표시합니다. */
export const WithDimmed: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Btn variant="outline" onClick={() => setOpen(true)}>
          딤드 사이드 패널 열기
        </Btn>
        <Modal open={open} onClose={() => setOpen(false)} type="sidepanel" position="right" showDimmed showCloseButton>
          <Modal.Header>딤드 사이드 패널</Modal.Header>
          <Modal.Body>
            <p style={{ margin: 0, fontSize: 13, color: vars.color.text, lineHeight: 1.7 }}>
              showDimmed=true이면 사이드 패널 뒤에도 딤드 오버레이가 표시됩니다.
            </p>
          </Modal.Body>
        </Modal>
      </>
    )
  },
  parameters: { controls: { disable: true } },
}
