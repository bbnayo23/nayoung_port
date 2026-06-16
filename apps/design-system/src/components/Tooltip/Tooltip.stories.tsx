import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: { content: '도움말 텍스트', placement: 'top', delay: 200 },
  argTypes: {
    placement: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
    },
    delay: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 80, display: 'inline-flex' }}>
      <Tooltip {...args}>
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </div>
  ),
}

export const Placements: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 48,
        padding: 80,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Tooltip {...args} content="위쪽 툴팁" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip {...args} content="오른쪽 툴팁" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip {...args} content="아래쪽 툴팁" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip {...args} content="왼쪽 툴팁" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  ),
}
