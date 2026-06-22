import type { Meta, StoryObj } from '@storybook/react-vite'
import { PIcon } from './PIcon'

const meta: Meta<typeof PIcon> = {
  title: 'Components/PIcon',
  component: PIcon,
  decorators: [
    (Story) => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'search',
        'filter',
        'plus',
        'copy',
        'trash',
        'upload',
        'download',
        'chevronLeft',
        'chevronRight',
        'chevronDown',
        'chevronUp',
        'x',
        'check',
        'play',
        'pause',
        'save',
        'edit',
        'more',
        'moreV',
        'settings',
        'layers',
        'alert',
        'shield',
        'clock',
        'sliders',
        'eye',
        'database',
        'grip',
        'code',
        'refresh',
        'pin',
        'expand',
        'bars',
      ],
    },
    size: { control: { type: 'number', min: 8, max: 48, step: 2 } },
  },
} satisfies Meta<typeof PIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'search',
    size: 16,
  },
}

export const Large: Story = {
  args: {
    name: 'settings',
    size: 32,
  },
}

export const AllIcons: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: 16 }}>
      {[
        'search',
        'filter',
        'plus',
        'copy',
        'trash',
        'upload',
        'download',
        'chevronLeft',
        'chevronRight',
        'chevronDown',
        'chevronUp',
        'x',
        'check',
        'play',
        'pause',
        'save',
        'edit',
        'more',
        'moreV',
        'settings',
        'layers',
        'alert',
        'shield',
        'clock',
        'sliders',
        'eye',
        'database',
        'grip',
        'code',
        'refresh',
        'pin',
        'expand',
        'bars',
      ].map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <PIcon name={name} size={20} />
          <span style={{ fontSize: 10, color: '#666' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}
