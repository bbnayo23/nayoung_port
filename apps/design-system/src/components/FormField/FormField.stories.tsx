import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField } from './FormField'

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  args: {
    label: '이름',
    direction: 'horizontal',
    labelWidth: 140,
    required: false,
  },
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    required: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof FormField>

export const Playground: Story = {
  args: {
    children: <input placeholder="값을 입력하세요" style={{ width: '100%' }} />,
  },
}

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    label: '사용자명',
    children: <input placeholder="사용자명을 입력하세요" style={{ width: '100%' }} />,
  },
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    label: '이메일',
    children: <input placeholder="이메일을 입력하세요" style={{ width: '100%' }} />,
  },
}

export const Required: Story = {
  args: {
    label: '필수 항목',
    required: true,
    children: <input placeholder="반드시 입력해야 합니다" style={{ width: '100%' }} />,
  },
}

export const WithError: Story = {
  args: {
    label: '이메일',
    required: true,
    error: '올바른 이메일 주소를 입력해주세요.',
    children: (
      <input
        placeholder="이메일을 입력하세요"
        style={{ width: '100%', borderColor: 'red' }}
      />
    ),
  },
}

export const WithHelpText: Story = {
  args: {
    label: '비밀번호',
    helpText: '8자 이상, 영문·숫자·특수문자를 포함해야 합니다.',
    children: <input type="password" placeholder="비밀번호를 입력하세요" style={{ width: '100%' }} />,
  },
}

export const NoLabel: Story = {
  args: {
    label: undefined,
    children: <input placeholder="레이블 없는 필드" style={{ width: '100%' }} />,
  },
}
