import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import { DateTimePicker } from '@dc/components/DateTimePicker'
import type { DateTimePreset, DateTimeRange } from '@dc/components/DateTimePicker'

const meta = {
  title: 'StyleGuide/DateTimePicker',
  component: DateTimePicker,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '트리거 크기',
      table: { category: 'Appearance' },
    },
    label: {
      control: 'text',
      description: '트리거 앞에 표시되는 라벨',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
      table: { category: 'State' },
    },
    onChange: { table: { disable: true } },
    presets: { table: { disable: true } },
  },
  args: {
    size: 'sm',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 460 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateTimePicker>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 props를 변경할 수 있습니다. 클릭하여 패널을 열어보세요. */
export const Playground: Story = {}

// ── With Label ────────────────────────────────────────────────────────────────

/** label이 트리거 왼쪽에 통합된 형태입니다. */
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <DateTimePicker label="검색 시간" size="sm" />
      <DateTimePicker label="수집시간" size="sm" />
      <DateTimePicker label="등록일" size="sm" />
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

/** sm · md · lg 세 가지 크기를 비교합니다. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <DateTimePicker label="검색 시간" size={size} />
          <Label>{size}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Presets ───────────────────────────────────────────────────────────────────

/** 프리셋별 기본 동작을 확인합니다. */
export const Presets: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {(
        [
          { preset: 'today', label: '오늘' },
          { preset: 'yesterday', label: '어제' },
          { preset: 'last1h', label: '최근 1시간' },
          { preset: 'last7d', label: '최근 7일' },
          { preset: 'last30d', label: '최근 30일' },
        ] as const
      ).map(({ preset, label }) => (
        <div key={preset} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <DateTimePicker label={label} defaultPreset={preset as DateTimePreset} size="sm" />
          <Label>{preset}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Custom Presets ────────────────────────────────────────────────────────────

/** presets prop으로 프리셋 목록을 커스터마이징할 수 있습니다. */
export const CustomPresets: Story = {
  render: () => (
    <DateTimePicker
      label="등록일"
      size="sm"
      presets={[
        { value: 'today', label: '오늘' },
        { value: 'yesterday', label: '어제' },
        { value: 'last1d', label: '최근 1일' },
        { value: 'last7d', label: '최근 7일' },
        { value: 'last30d', label: '최근 30일' },
        { value: 'custom', label: '직접 입력' },
      ]}
    />
  ),
  parameters: { controls: { disable: true } },
}

// ── Controlled ────────────────────────────────────────────────────────────────

/** preset prop으로 외부에서 선택 상태를 제어하는 예시입니다. */
export const Controlled: Story = {
  render: () => {
    const [preset, setPreset] = useState<DateTimePreset>('today')
    const [range, setRange] = useState<DateTimeRange | null>(null)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DateTimePicker
          label="검색 시간"
          preset={preset}
          onChange={(r, p) => {
            setRange(r)
            setPreset(p)
          }}
          size="sm"
        />
        <div
          style={{
            padding: '10px 14px',
            background: vars.color.surface,
            border: `1px solid ${vars.color.border}`,
            borderRadius: vars.radius.sm,
            fontSize: 12,
            fontFamily: 'monospace',
            color: vars.color.textSecondary,
          }}
        >
          <div>
            <strong style={{ color: vars.color.text }}>Preset:</strong> {preset}
          </div>
          {range && (
            <>
              <div>
                <strong style={{ color: vars.color.text }}>Start:</strong> {range.start.toLocaleString('ko-KR')}
              </div>
              <div>
                <strong style={{ color: vars.color.text }}>End:</strong> {range.end.toLocaleString('ko-KR')}
              </div>
            </>
          )}
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Disabled ──────────────────────────────────────────────────────────────────

/** 비활성 상태입니다. */
export const Disabled: Story = {
  render: () => <DateTimePicker label="검색 시간" size="sm" disabled />,
  parameters: { controls: { disable: true } },
}
