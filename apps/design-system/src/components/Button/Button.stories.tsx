import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconStar } from '@port/icon-library'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
}

export const WithIcon: Story = {
  args: {
    children: 'Star',
    icon: <IconStar size={18} />,
  },
}
