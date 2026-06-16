import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconStar } from '@port/icon-library'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Label',
    placeholder: 'Type here…',
    variant: 'outline',
    size: 'md',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['outline', 'filled'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    invalid: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Playground: Story = {
  args: { helperText: 'We never share your data.' },
}

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Input {...args} variant="outline" label="Outline" />
      <Input {...args} variant="filled" label="Filled" />
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  ),
}

export const WithError: Story = {
  args: {
    label: 'Email',
    defaultValue: 'not-an-email',
    invalid: true,
    errorText: 'Please enter a valid email address.',
  },
}

export const WithSlots: Story = {
  args: {
    label: 'Favorite',
    placeholder: 'Search…',
    leftSlot: <IconStar size={18} />,
    rightSlot: <IconStar size={18} />,
  },
}

export const Disabled: Story = {
  args: { label: 'Disabled', value: 'Read only', disabled: true },
}
