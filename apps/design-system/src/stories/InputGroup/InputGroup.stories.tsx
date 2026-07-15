import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import InputGroup from '@dc/components/InputGroup'
import type { InputGroupProps } from '@dc/components/InputGroup'

const meta = {
  title: 'StyleGuide/InputGroup',
  component: InputGroup,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies InputGroupProps['size'][],
      description: '그룹 크기 (하위 컴포넌트에 Context로 자동 전달)',
      table: { category: 'Appearance' },
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'] satisfies InputGroupProps['variant'][],
      description: '상태 variant — 테두리 색상에 반영',
      table: { category: 'Appearance' },
    },
    fullWidth: {
      control: 'boolean',
      description: '컨테이너 너비에 맞춤',
      table: { category: 'Layout' },
    },
    children: { table: { disable: true } },
  },
  args: {
    size: 'md',
    variant: 'default',
    fullWidth: false,
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 size · variant · fullWidth를 조정합니다. */
export const Playground: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Text>https://</InputGroup.Text>
      <InputGroup.Input placeholder="도메인 입력" />
      <InputGroup.Button>확인</InputGroup.Button>
    </InputGroup>
  ),
}

// ── Compositions ──────────────────────────────────────────────────────────────

/** 아이콘 · 텍스트 애드온 다양한 조합 예시입니다. */
export const Compositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      {[
        {
          label: '텍스트 접두 + 버튼',
          node: (
            <InputGroup>
              <InputGroup.Text>https://</InputGroup.Text>
              <InputGroup.Input placeholder="도메인 입력" />
              <InputGroup.Button>확인</InputGroup.Button>
            </InputGroup>
          ),
        },
        {
          label: '좌우 텍스트 애드온',
          node: (
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <InputGroup.Input placeholder="금액 입력" />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
          ),
        },
        {
          label: '접미 텍스트 (이메일)',
          node: (
            <InputGroup>
              <InputGroup.Input placeholder="사용자명" />
              <InputGroup.Text>@example.com</InputGroup.Text>
            </InputGroup>
          ),
        },
        {
          label: '아이콘 + 검색',
          node: (
            <InputGroup>
              <InputGroup.Icon position="left">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </InputGroup.Icon>
              <InputGroup.Input placeholder="검색..." />
            </InputGroup>
          ),
        },
      ].map(({ label, node }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{label}</code>
          {node}
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Variants ──────────────────────────────────────────────────────────────────

/** 4가지 variant 상태와 HelperText 색상 연동을 확인합니다. */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      {(['default', 'error', 'success', 'warning'] as const).map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <code
            style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}
          >{`variant="${v}"`}</code>
          <InputGroup variant={v}>
            <InputGroup.Input placeholder={`${v} 상태`} />
            <InputGroup.Button>확인</InputGroup.Button>
          </InputGroup>
          <InputGroup.HelperText variant={v}>{v} 도움말 텍스트</InputGroup.HelperText>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── FormField ─────────────────────────────────────────────────────────────────

/** InputGroup.FormField로 Label + InputGroup + HelperText를 하나의 폼 필드로 구성합니다. */
export const FormField: Story = {
  render: () => {
    const [url, setUrl] = useState('')
    const [ip, setIp] = useState('')
    const isValidIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(ip)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
        <InputGroup.FormField>
          <InputGroup.Label required>서버 주소</InputGroup.Label>
          <InputGroup size="sm">
            <InputGroup.Text>https://</InputGroup.Text>
            <InputGroup.Input placeholder="example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
            <InputGroup.Button variant="primary">확인</InputGroup.Button>
          </InputGroup>
          <InputGroup.HelperText>접속할 서버 주소를 입력하세요.</InputGroup.HelperText>
        </InputGroup.FormField>

        <InputGroup.FormField>
          <InputGroup.Label required>IP 주소 (유효성 검사)</InputGroup.Label>
          <InputGroup size="sm" variant={ip.length > 0 ? (isValidIp ? 'success' : 'error') : 'default'}>
            <InputGroup.Input placeholder="192.168.0.1" value={ip} onChange={(e) => setIp(e.target.value)} />
            <InputGroup.Button variant="primary">조회</InputGroup.Button>
          </InputGroup>
          <InputGroup.HelperText variant={ip.length > 0 ? (isValidIp ? 'success' : 'error') : 'default'}>
            {ip.length > 0
              ? isValidIp
                ? '유효한 IP 주소입니다.'
                : '올바른 IP 형식으로 입력하세요.'
              : '조회할 IP 주소를 입력하세요.'}
          </InputGroup.HelperText>
        </InputGroup.FormField>

        <InputGroup.FormField direction="horizontal">
          <InputGroup.Label>API 키</InputGroup.Label>
          <InputGroup size="sm" fullWidth>
            <InputGroup.Input placeholder="API 키를 입력하세요" type="password" />
            <InputGroup.Button>복사</InputGroup.Button>
          </InputGroup>
        </InputGroup.FormField>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
