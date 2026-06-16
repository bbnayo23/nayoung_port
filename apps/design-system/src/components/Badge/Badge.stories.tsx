import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Badge', variant: 'neutral', appearance: 'soft', size: 'md' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['neutral', 'brand', 'success', 'warning', 'danger', 'info'],
    },
    appearance: { control: 'inline-radio', options: ['solid', 'soft', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

const colors = ['neutral', 'brand', 'success', 'warning', 'danger', 'info'] as const

export const Playground: Story = {}

export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Badge {...args} appearance="solid">Solid</Badge>
      <Badge {...args} appearance="soft">Soft</Badge>
      <Badge {...args} appearance="outline">Outline</Badge>
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['solid', 'soft', 'outline'] as const).map((appearance) => (
        <div key={appearance} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {colors.map((variant) => (
            <Badge key={variant} {...args} appearance={appearance} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Badge {...args} size="sm">Small</Badge>
      <Badge {...args} size="md">Medium</Badge>
    </div>
  ),
}

export const WithDot: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Badge {...args} dot variant="success">Active</Badge>
      <Badge {...args} dot variant="warning">Pending</Badge>
      <Badge {...args} dot variant="danger">Error</Badge>
    </div>
  ),
}
