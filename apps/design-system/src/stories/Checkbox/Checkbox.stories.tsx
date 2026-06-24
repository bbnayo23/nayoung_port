import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Checkbox from '../../components/Checkbox'
import type { CheckboxInterface } from '../../components/Checkbox'

const meta = {
  title: 'StyleGuide/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크 상태',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { category: 'State' },
    },
    indeterminate: {
      control: 'boolean',
      description: '중간(mixed) 상태',
      table: { category: 'State' },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: { category: 'Content' },
    },
    labelDirection: {
      control: 'select',
      options: ['left', 'right'] satisfies CheckboxInterface['labelDirection'][],
      description: '라벨 위치',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: ['danger', 'warning', 'success', 'info'],
      description: '색상 variant',
      table: { category: 'Appearance' },
    },
    onChange: { table: { disable: true } },
  },
  args: {
    label: 'Checkbox',
    checked: false,
    disabled: false,
    indeterminate: false,
    labelDirection: 'right',
  },
} satisfies Meta<typeof Checkbox>

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
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  },
}

// ── States ────────────────────────────────────────────────────────────────────

/** checked · indeterminate · disabled 조합 상태 비교 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {[
        { label: 'Default', props: {} },
        { label: 'Checked', props: { checked: true, onChange: () => {} } },
        { label: 'Indeterminate', props: { indeterminate: true, onChange: () => {} } },
        { label: 'Disabled', props: { disabled: true } },
        { label: 'Disabled + Checked', props: { disabled: true, checked: true, onChange: () => {} } },
      ].map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Checkbox label={label} {...props} />
          <Label>{label}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Colors ────────────────────────────────────────────────────────────────────

/** color prop으로 상태 색상을 변경합니다. */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {(['danger', 'warning', 'success', 'info'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Checkbox label={color} color={color} checked onChange={() => {}} />
          <Label>{color}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── LabelDirection ────────────────────────────────────────────────────────────

/** labelDirection으로 라벨 위치를 변경합니다. */
export const LabelDirection: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
        <Checkbox label="Right (기본값)" labelDirection="right" checked onChange={() => {}} />
        <Label>labelDirection="right"</Label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
        <Checkbox label="Left" labelDirection="left" checked onChange={() => {}} />
        <Label>labelDirection="left"</Label>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Interactive ───────────────────────────────────────────────────────────────

/** 실제 체크/해제가 동작하는 인터랙티브 예제 */
export const Interactive: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 'a', label: '이용약관 동의 (필수)', checked: false },
      { id: 'b', label: '개인정보 수집 동의 (필수)', checked: false },
      { id: 'c', label: '마케팅 정보 수신 동의 (선택)', checked: false },
    ])
    const allChecked = items.every((i) => i.checked)
    const someChecked = items.some((i) => i.checked)
    const toggle = (id: string) =>
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)))
    const toggleAll = () => setItems((prev) => prev.map((i) => ({ ...i, checked: !allChecked })))
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Checkbox
          label="전체 동의"
          checked={allChecked}
          indeterminate={someChecked && !allChecked}
          onChange={toggleAll}
        />
        <div style={{ height: 1, background: vars.color.border }} />
        {items.map((item) => (
          <Checkbox key={item.id} label={item.label} checked={item.checked} onChange={() => toggle(item.id)} />
        ))}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
