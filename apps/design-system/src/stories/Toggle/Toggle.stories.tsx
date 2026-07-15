import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import { Toggle } from '@dc/components/Toggle'
import type { ToggleProps, ToggleSize } from '@dc/components/Toggle'

const meta = {
  title: 'StyleGuide/Toggle',
  component: Toggle,
  parameters: { layout: 'padded' },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled on/off 상태',
      table: { category: 'State' },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Uncontrolled 초기값',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
      table: { category: 'State' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies ToggleSize[],
      description: 'Toggle 크기',
      table: { category: 'Size' },
    },
    label: {
      control: 'text',
      description: '우측 라벨 텍스트',
      table: { category: 'Content' },
    },
    innerLabel: {
      control: 'boolean',
      description: '스위치 내부 ON/OFF 텍스트 표시',
      table: { category: 'Content' },
    },
    onChange: { table: { disable: true } },
  },
  args: {
    size: 'md',
    disabled: false,
    label: 'Toggle',
    innerLabel: false,
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 변경할 수 있습니다. */
export const Playground: Story = {}

// ── States ────────────────────────────────────────────────────────────────────

/** Off · On · Disabled Off · Disabled On 상태 비교 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      {[
        { label: 'Off', props: {} as Partial<ToggleProps> },
        { label: 'On', props: { defaultChecked: true } as Partial<ToggleProps> },
        { label: 'Disabled Off', props: { disabled: true } as Partial<ToggleProps> },
        { label: 'Disabled On', props: { disabled: true, defaultChecked: true } as Partial<ToggleProps> },
        { label: 'Force Focus', props: { className: 'is-focus' } as Partial<ToggleProps> },
      ].map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <Toggle label={label} {...props} />
          <Label>{label}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

const sizeLabel: Record<ToggleSize, string> = { sm: '28 × 16', md: '40 × 22', lg: '52 × 28' }

/** sm(28×16) · md(40×22) · lg(52×28) 세 가지 크기 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {(['sm', 'md', 'lg'] as ToggleSize[]).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <Toggle size={s} defaultChecked label={s} />
          <Label>{sizeLabel[s]}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── InnerLabel ────────────────────────────────────────────────────────────────

/** innerLabel=true — 스위치 내부에 ON/OFF 텍스트가 표시됩니다. */
export const InnerLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      {[
        { label: 'off (md)', props: { innerLabel: true } as Partial<ToggleProps> },
        { label: 'on (md)', props: { innerLabel: true, defaultChecked: true } as Partial<ToggleProps> },
        { label: 'off (sm)', props: { innerLabel: true, size: 'sm' as ToggleSize } as Partial<ToggleProps> },
        {
          label: 'on (sm)',
          props: { innerLabel: true, size: 'sm' as ToggleSize, defaultChecked: true } as Partial<ToggleProps>,
        },
        { label: 'disabled', props: { innerLabel: true, disabled: true } as Partial<ToggleProps> },
      ].map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <Toggle {...props} />
          <Label>{label}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── SettingsList ──────────────────────────────────────────────────────────────

/** 설정 목록에서 여러 Toggle을 제어하는 실제 사용 패턴 */
export const SettingsList: Story = {
  render: () => {
    const SETTINGS = [
      {
        id: 'notifications',
        label: '알림 활성화',
        description: '새 보안 이벤트 발생 시 알림을 받습니다.',
        defaultChecked: true,
      },
      { id: 'darkmode', label: '다크 모드', description: '어두운 테마를 사용합니다.', defaultChecked: false },
      { id: '2fa', label: '2단계 인증', description: '로그인 시 추가 인증을 요구합니다.', defaultChecked: true },
      { id: 'autolock', label: '자동 잠금', description: '10분 비활동 후 화면을 잠급니다.', defaultChecked: false },
    ]

    const Demo = () => {
      const [states, setStates] = useState<Record<string, boolean>>(
        Object.fromEntries(SETTINGS.map((s) => [s.id, s.defaultChecked])),
      )

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 480,
            border: `1px solid ${vars.color.border}`,
            borderRadius: vars.radius.md,
            background: vars.color.surface,
            overflow: 'hidden',
          }}
        >
          {SETTINGS.map((setting, i) => (
            <div
              key={setting.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: i < SETTINGS.length - 1 ? `1px solid ${vars.color.border}` : 'none',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: vars.color.text }}>{setting.label}</div>
                <div style={{ fontSize: 12, color: vars.color.textSecondary, marginTop: 2 }}>{setting.description}</div>
              </div>
              <Toggle
                checked={states[setting.id]}
                onChange={(checked) => setStates((prev) => ({ ...prev, [setting.id]: checked }))}
              />
            </div>
          ))}
        </div>
      )
    }
    return <Demo />
  },
  parameters: { controls: { disable: true } },
}
