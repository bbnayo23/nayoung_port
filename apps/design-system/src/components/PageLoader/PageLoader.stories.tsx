import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageLoader } from './PageLoader'

const meta: Meta<typeof PageLoader> = {
  title: 'Components/PageLoader',
  component: PageLoader,
}

export default meta
type Story = StoryObj<typeof PageLoader>

/** 기본 페이지 로더 */
export const Default: Story = {}
