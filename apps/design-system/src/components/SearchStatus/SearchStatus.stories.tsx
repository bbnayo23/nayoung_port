import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchStatus } from './SearchStatus'

const meta = {
  title: 'Components/SearchStatus',
  component: SearchStatus,
  argTypes: {
    state: {
      control: 'select',
      options: ['loading', 'hasValue', 'hasError'],
    },
  },
} satisfies Meta<typeof SearchStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Loading: Story = {
  args: { state: 'loading' },
}

export const HasValue: Story = {
  args: { state: 'hasValue', children: '1,234' },
}

export const HasError: Story = {
  args: { state: 'hasError' },
}

export const AllStates: Story = {
  args: { state: 'loading' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <SearchStatus state="loading" />
        <span style={{ fontSize: 12 }}>loading</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <SearchStatus state="hasValue">1,234</SearchStatus>
        <span style={{ fontSize: 12 }}>hasValue</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <SearchStatus state="hasError" />
        <span style={{ fontSize: 12 }}>hasError</span>
      </div>
    </div>
  ),
}
