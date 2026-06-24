import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Radio from '../../components/Radio'
import type { RadioProps } from '../../components/Radio'

const meta = {
  title: 'StyleGuide/Radio',
  component: Radio,
  parameters: { layout: 'padded' },
  argTypes: {
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: { category: 'Content' },
    },
    value: {
      control: 'text',
      description: '라디오 버튼 값',
      table: { category: 'Data' },
    },
    name: {
      control: 'text',
      description: '라디오 그룹 이름',
      table: { category: 'Data' },
    },
    checked: {
      control: 'boolean',
      description: '선택 상태',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { category: 'State' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies RadioProps['size'][],
      description: '크기',
      table: { category: 'Appearance' },
    },
    variant: {
      control: 'select',
      options: ['default', 'primary'] satisfies RadioProps['variant'][],
      description: '색상 variant',
      table: { category: 'Appearance' },
    },
    onChange: { table: { disable: true } },
  },
  args: {
    label: '라디오 버튼',
    value: 'option',
    name: 'playground',
    checked: false,
    disabled: false,
    size: 'md',
    variant: 'default',
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false)
    return <Radio {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  },
}

// ── States ────────────────────────────────────────────────────────────────────

/** 기본 · 선택 · 비활성화 상태 비교 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {[
        { label: 'Default', checked: false, disabled: false },
        { label: 'Checked', checked: true, disabled: false },
        { label: 'Disabled', checked: false, disabled: true },
        { label: 'Disabled + Checked', checked: true, disabled: true },
      ].map(({ label, checked, disabled }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Radio value={label} name="states" label={label} checked={checked} disabled={disabled} onChange={() => {}} />
          <Label>{label}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

/** sm · md · lg 크기 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Radio value={size} name="sizes" label={size} checked size={size} onChange={() => {}} />
          <Label>{`size="${size}"`}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Variants ──────────────────────────────────────────────────────────────────

/** default · primary variant 비교 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20 }}>
      {(['default', 'primary'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Radio value={variant} name="variants" label={variant} checked variant={variant} onChange={() => {}} />
          <Label>{`variant="${variant}"`}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── RadioGroup ────────────────────────────────────────────────────────────────

/** 실제 라디오 그룹 인터랙션 예제 */
export const RadioGroup: Story = {
  render: () => {
    const options = [
      { value: 'low', label: '낮음 (Low)' },
      { value: 'medium', label: '중간 (Medium)' },
      { value: 'high', label: '높음 (High)' },
      { value: 'critical', label: '심각 (Critical)' },
    ]
    const [selected, setSelected] = useState('medium')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: vars.color.text }}>심각도 선택</p>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            value={opt.value}
            name="severity"
            label={opt.label}
            checked={selected === opt.value}
            onChange={() => setSelected(opt.value)}
          />
        ))}
        <p style={{ margin: '8px 0 0', fontSize: 12, color: vars.color.textSecondary }}>
          선택된 값: <strong>{selected}</strong>
        </p>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
