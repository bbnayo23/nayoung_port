import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Toast, { Toaster, toast } from '../../components/Toast'
import type { ToastProps } from '../../components/Toast'

const meta = {
  title: 'StyleGuide/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'] satisfies ToastProps['variant'][],
      description: '토스트 유형',
      table: { category: 'Appearance' },
    },
    title: {
      control: 'text',
      description: '제목',
      table: { category: 'Content' },
    },
    message: {
      control: 'text',
      description: '메시지',
      table: { category: 'Content' },
    },
    showCloseButton: {
      control: 'boolean',
      description: '닫기 버튼 표시',
      table: { category: 'Appearance' },
    },
    duration: {
      control: 'number',
      description: '자동 닫힘 시간(ms). 0이면 Snackbar 모드',
      table: { category: 'Behavior' },
    },
    onClose: { table: { disable: true } },
    icon: { table: { disable: true } },
    action: { table: { disable: true } },
  },
  args: {
    variant: 'success',
    title: '저장 완료',
    message: '변경사항이 저장되었습니다.',
    showCloseButton: true,
    duration: 0,
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {}

// ── Variants ─────────────────────────────────────────────────────────────────

/** success · error · info · warning 네 가지 variant 비교 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      {(['success', 'error', 'info', 'warning'] as const).map((v) => (
        <Toast key={v} variant={v} title={v} message={`${v} 유형의 토스트 메시지입니다.`} duration={0} />
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── WithAction (Snackbar) ─────────────────────────────────────────────────────

/** duration=0으로 Snackbar 모드를 사용하고 action prop으로 액션 버튼을 추가합니다. */
export const WithAction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Toast
        variant="info"
        title="업데이트 가능"
        message="새 버전 v3.2.1이 있습니다."
        duration={0}
        action={
          <button
            style={{
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 600,
              background: vars.color.primary,
              color: '#fff',
              border: 'none',
              borderRadius: vars.radius.sm,
              cursor: 'pointer',
            }}
          >
            업데이트
          </button>
        }
      />
      <Toast
        variant="warning"
        title="세션 만료 예정"
        message="5분 후 자동 로그아웃됩니다."
        duration={0}
        action={
          <button
            style={{
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 600,
              background: 'transparent',
              color: vars.color.warning,
              border: `1px solid ${vars.color.warning}`,
              borderRadius: vars.radius.sm,
              cursor: 'pointer',
            }}
          >
            연장
          </button>
        }
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Stacked ───────────────────────────────────────────────────────────────────

const toastMessages: Record<NonNullable<ToastProps['variant']>, { title: string; message: string }> = {
  success: { title: '저장 완료', message: '변경사항이 저장되었습니다.' },
  error: { title: '오류 발생', message: '요청을 처리하는 중 문제가 발생했습니다.' },
  info: { title: '업데이트 가능', message: '새 버전 v3.2.1이 있습니다.' },
  warning: { title: '세션 만료 예정', message: '5분 후 자동 로그아웃됩니다.' },
}

/** Toaster 컨테이너를 배치하고 toast() 헬퍼로 스태킹 토스트를 시연합니다. */
export const Stacked: Story = {
  render: () => {
    const triggerVariants = ['success', 'error', 'info', 'warning'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 0' }}>
        <Toaster position="top-right" />
        <p style={{ margin: 0, fontSize: 12, color: vars.color.textSecondary }}>
          버튼을 연속 클릭하면 우측 상단에 토스트가 쌓입니다. 4초 후 자동으로 사라집니다.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {triggerVariants.map((v) => (
            <button
              key={v}
              onClick={() => toast[v](toastMessages[v].title, { message: toastMessages[v].message })}
              style={{
                padding: '6px 16px',
                fontSize: 12,
                fontWeight: 600,
                background: vars.color.surface,
                color: vars.color.text,
                border: `1px solid ${vars.color.border}`,
                borderRadius: vars.radius.sm,
                cursor: 'pointer',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
