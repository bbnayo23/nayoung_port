import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconStar, IconHeart } from '@port/icon-library'
import { IconButton } from './IconButton'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': '필터',
    variant: 'default',
    children: <IconStar size={14} />,
  },
}

export const Primary: Story = {
  args: {
    'aria-label': '필터',
    variant: 'primary',
    children: <IconStar size={14} />,
  },
}

export const Danger: Story = {
  args: {
    'aria-label': '삭제',
    variant: 'danger',
    children: <IconHeart size={14} />,
  },
}

export const Ghost: Story = {
  args: {
    'aria-label': '필터',
    variant: 'ghost',
    children: <IconStar size={14} />,
  },
}

export const Small: Story = {
  args: {
    'aria-label': '필터',
    size: 'sm',
    children: <IconStar size={12} />,
  },
}

export const Disabled: Story = {
  args: {
    'aria-label': '필터',
    disabled: true,
    children: <IconStar size={14} />,
  },
}

export const AllVariants: Story = {
  args: { 'aria-label': 'icon' },
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <IconButton aria-label="default">
        <IconStar size={14} />
      </IconButton>
      <IconButton aria-label="primary" variant="primary">
        <IconStar size={14} />
      </IconButton>
      <IconButton aria-label="danger" variant="danger">
        <IconHeart size={14} />
      </IconButton>
      <IconButton aria-label="ghost" variant="ghost">
        <IconStar size={14} />
      </IconButton>
      <IconButton aria-label="disabled" disabled>
        <IconStar size={14} />
      </IconButton>
    </div>
  ),
}
