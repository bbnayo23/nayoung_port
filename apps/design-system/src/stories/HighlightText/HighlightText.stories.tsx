import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { HighlightText } from '../../components/HighlightText'

const meta = {
  title: 'StyleGuide/HighlightText',
  component: HighlightText,
  parameters: { layout: 'padded' },
  argTypes: {
    text: { control: 'text', description: '표시할 텍스트' },
    searchWords: { control: false, description: '하이라이트할 단어 배열' },
    caseSensitive: { control: 'boolean', description: '대소문자 구분' },
  },
  args: {
    text: '네트워크 트래픽에서 비정상적인 패킷이 감지되었습니다.',
    searchWords: ['비정상적인', '패킷'],
    caseSensitive: false,
  },
} satisfies Meta<typeof HighlightText>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const SingleWord: Story = {
  args: {
    text: 'Spider XDR Security Platform에서 위협을 탐지했습니다.',
    searchWords: ['위협'],
  },
}

export const MultipleWords: Story = {
  args: {
    text: '사용자 인증 실패 및 권한 없는 접근이 반복적으로 시도되었습니다.',
    searchWords: ['인증 실패', '권한 없는'],
  },
}

export const CaseSensitive: Story = {
  args: {
    text: 'Error: Connection failed. error code 503. ERROR threshold exceeded.',
    searchWords: ['Error'],
    caseSensitive: true,
  },
}

export const RegexPattern: Story = {
  args: {
    text: 'IP 주소 192.168.1.100 에서 10.0.0.1 로의 접근이 차단되었습니다.',
    searchWords: [/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g],
  },
}

export const NoMatch: Story = {
  args: {
    text: '정상적인 트래픽입니다.',
    searchWords: ['위협', '비정상'],
  },
}

export const Interactive: Story = {
  render: () => {
    const [query, setQuery] = useState('위협')
    const text = '네트워크에서 위협이 감지되었습니다. 보안 위협 수준이 높습니다. 즉각적인 대응이 필요합니다.'

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어 입력..."
          style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14 }}
        />
        <p style={{ margin: 0, lineHeight: 1.6, fontSize: 14 }}>
          <HighlightText text={text} searchWords={query ? [query] : []} />
        </p>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
