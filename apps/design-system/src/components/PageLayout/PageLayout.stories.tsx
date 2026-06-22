import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { PageHeader, PageLayout } from './PageLayout'

const meta = {
  title: 'Components/PageLayout',
  component: PageLayout,
} satisfies Meta<typeof PageLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: null },
  render: () => (
    <PageLayout>
      <PageHeader title="페이지 제목" />
      <div style={{ padding: 16 }}>페이지 콘텐츠 영역</div>
    </PageLayout>
  ),
}

export const WithDescription: Story = {
  args: { children: null },
  render: () => (
    <PageLayout>
      <PageHeader title="페이지 제목" description="페이지에 대한 간략한 설명입니다." />
      <div style={{ padding: 16 }}>페이지 콘텐츠 영역</div>
    </PageLayout>
  ),
}

export const WithRight: Story = {
  args: { children: null },
  render: () => (
    <PageLayout>
      <PageHeader
        title="페이지 제목"
        description="페이지에 대한 간략한 설명입니다."
        right={
          <>
            <Button variant="secondary">내보내기</Button>
            <Button variant="primary">새로 만들기</Button>
          </>
        }
      />
      <div style={{ padding: 16 }}>페이지 콘텐츠 영역</div>
    </PageLayout>
  ),
}

export const HeaderOnly: Story = {
  args: { children: null },
  render: () => <PageHeader title="헤더만 단독 사용" />,
}
