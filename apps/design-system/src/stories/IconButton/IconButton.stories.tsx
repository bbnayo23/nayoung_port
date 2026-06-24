import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import IconButton from '../../components/IconButton'
import { XdrSettingIcon, XdrNavAlertIcon, XdrSearchIcon, XdrCloseIcon, XdrDownloadIcon } from '@port/icon-library'

const meta = {
  title: 'StyleGuide/IconButton',
  component: IconButton,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기',
      table: { category: 'Appearance' },
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'outline', 'circle'],
      description: '버튼 스타일 변형',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { category: 'State' },
    },
    icon: { table: { disable: true } },
  },
  args: {
    size: 'md',
    variant: 'ghost',
    disabled: false,
    'aria-label': 'icon button',
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    icon: <XdrSettingIcon size={16} />,
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
      <IconButton {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <IconButton
            size={size}
            aria-label={size}
            icon={<XdrSettingIcon size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />}
          />
          <code style={{ fontSize: 11, color: vars.color.textSecondary }}>{`size="${size}"`}</code>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 24 }}>
      {(['default', 'ghost', 'outline', 'circle'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <IconButton variant={variant} aria-label={variant} icon={<XdrNavAlertIcon size={16} />} />
          <code style={{ fontSize: 11, color: vars.color.textSecondary }}>{variant}</code>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <IconButton aria-label="normal" icon={<XdrSearchIcon size={16} />} />
        <code style={{ fontSize: 11, color: vars.color.textSecondary }}>normal</code>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <IconButton aria-label="disabled" icon={<XdrCloseIcon size={16} />} disabled />
        <code style={{ fontSize: 11, color: vars.color.textSecondary }}>disabled</code>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

export const IconSet: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 24 }}>
      {[
        { icon: <XdrSettingIcon size={16} />, label: 'Settings' },
        { icon: <XdrNavAlertIcon size={16} />, label: 'Bell' },
        { icon: <XdrSearchIcon size={16} />, label: 'Search' },
        { icon: <XdrCloseIcon size={16} />, label: 'Close' },
        { icon: <XdrDownloadIcon size={16} />, label: 'Download' },
      ].map(({ icon, label }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <IconButton variant="ghost" aria-label={label} icon={icon} />
          <code style={{ fontSize: 10, color: vars.color.textMuted }}>{label}</code>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}
