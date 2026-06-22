import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { CorrelationCheckbox } from './CorrelationCheckbox'

const meta: Meta<typeof CorrelationCheckbox> = {
  title: 'Components/CorrelationCheckbox',
  component: CorrelationCheckbox,
  decorators: [
    (Story) => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CorrelationCheckbox>

export default meta

type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: { checked: true },
}

export const Unchecked: Story = {
  args: { checked: false },
}

export const Readonly: Story = {
  args: { checked: false },
}

const Demo = ({ initialChecked }: { initialChecked: boolean }) => {
  const [checked, setChecked] = useState(initialChecked)
  return <CorrelationCheckbox checked={checked} onChange={() => setChecked((c) => !c)} />
}

export const Interactive: StoryObj = {
  render: () => <Demo initialChecked={false} />,
}
