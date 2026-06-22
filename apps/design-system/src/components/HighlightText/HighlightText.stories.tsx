import type { Meta, StoryObj } from '@storybook/react-vite'
import { HighlightText } from './HighlightText'

const meta: Meta<typeof HighlightText> = {
  title: 'Components/HighlightText',
  component: HighlightText,
}

export default meta
type Story = StoryObj<typeof HighlightText>

export const SingleWord: Story = {
  args: {
    text: 'The quick brown fox jumps over the lazy dog.',
    searchWords: ['fox'],
  },
}

export const LongText: Story = {
  args: {
    text: Array.from(
      { length: 30 },
      (_, i) => `Word${i} ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor`,
    ).join(' '),
    searchWords: ['ipsum', 'tempor'],
  },
}

export const RegExpSearch: Story = {
  args: {
    text: 'User login from 192.168.1.100 at 2024-01-15T10:30:00Z with status=success',
    searchWords: [/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, /status=\w+/],
  },
}

export const MultipleWords: Story = {
  args: {
    text: 'error occurred during authentication: invalid token, please retry login with valid credentials',
    searchWords: ['error', 'invalid', 'token', 'retry'],
  },
}
