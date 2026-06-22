import type { Meta, StoryObj } from '@storybook/react-vite'
import { ErrorPage } from './ErrorPage'

const meta: Meta<typeof ErrorPage> = {
  title: 'Components/ErrorPage',
  component: ErrorPage,
  args: {
    title: '문제가 발생했습니다',
    description: '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    retryLabel: '다시 시도',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    retryLabel: { control: 'text' },
    onRetry: { action: 'retried' },
  },
}

export default meta
type Story = StoryObj<typeof ErrorPage>

export const Playground: Story = {}

export const WithRetry: Story = {
  args: {
    onRetry: () => {},
  },
}

export const NoDescription: Story = {
  args: {
    description: undefined,
    onRetry: () => {},
  },
}

export const CustomTitle: Story = {
  args: {
    title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지가 존재하지 않거나 이동되었습니다.',
    onRetry: () => {},
    retryLabel: '홈으로 이동',
  },
}
