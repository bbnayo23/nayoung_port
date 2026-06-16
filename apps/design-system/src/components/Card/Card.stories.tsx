import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: { variant: 'elevated', padding: 'md' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['elevated', 'outlined', 'filled'],
    },
    padding: {
      control: 'inline-radio',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Playground: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Body>
        간단한 카드 본문입니다. variant 와 padding 컨트롤을 조절해 보세요.
      </Card.Body>
    </Card>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card {...args} variant="elevated" style={{ width: 220 }}>
        <Card.Body>Elevated</Card.Body>
      </Card>
      <Card {...args} variant="outlined" style={{ width: 220 }}>
        <Card.Body>Outlined</Card.Body>
      </Card>
      <Card {...args} variant="filled" style={{ width: 220 }}>
        <Card.Body>Filled</Card.Body>
      </Card>
    </div>
  ),
}

export const Composed: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 400 }}>
      <Card.Header>프로젝트 설정</Card.Header>
      <Card.Body>
        헤더 · 본문 · 푸터 슬롯을 조합한 카드입니다. 푸터의 액션은 우측 정렬됩니다.
      </Card.Body>
      <Card.Footer>
        <Button variant="ghost" size="sm">
          취소
        </Button>
        <Button variant="primary" size="sm">
          저장
        </Button>
      </Card.Footer>
    </Card>
  ),
}

export const Paddings: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((p) => (
        <Card {...args} key={p} padding={p} variant="outlined" style={{ width: 200 }}>
          <Card.Header>{p}</Card.Header>
          <Card.Body>padding="{p}"</Card.Body>
        </Card>
      ))}
    </div>
  ),
}
