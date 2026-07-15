import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import Breadcrumbs from '@dc/components/Breadcrumbs'

const meta = {
  title: 'StyleGuide/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'padded' },
  argTypes: {
    separator: {
      control: 'text',
      description: '항목 사이 구분자 (문자열 또는 ReactNode)',
      table: { category: 'Content' },
    },
    maxItems: {
      control: { type: 'number', min: 0 },
      description: '최대 표시 항목 수. 초과 시 중간을 ⋯ 버튼으로 축약. 0 = 전체 표시',
      table: { category: 'Behavior' },
    },
    children: { control: false, table: { disable: true } },
  },
  args: {
    children: null,
    separator: '›',
    maxItems: 0,
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code
    style={{
      display: 'inline-block',
      marginTop: 4,
      fontSize: 11,
      fontFamily: 'monospace',
      color: vars.color.textSecondary,
    }}
  >
    {children}
  </code>
)

const SEPARATORS = ['›', '/', '→', '|', '>'] as const

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 separator · maxItems를 실시간으로 변경할 수 있습니다. */
export const Playground: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <a href="#">홈</a>
      <a href="#">카테고리</a>
      <a href="#">서브카테고리</a>
      <span>현재 페이지</span>
    </Breadcrumbs>
  ),
}

// ── Separator ─────────────────────────────────────────────────────────────────

/** 다양한 구분자를 비교합니다. */
export const Separator: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {SEPARATORS.map((sep) => (
        <div key={sep} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>{`separator="${sep}"`}</Label>
          <Breadcrumbs separator={sep}>
            <a href="#">홈</a>
            <a href="#">목록</a>
            <span>상세</span>
          </Breadcrumbs>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── AppNavigation ─────────────────────────────────────────────────────────────

/** 실제 앱 네비게이션 계층 구조 — 2·3·4단계 경로 예시 */
export const AppNavigation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>2단계</Label>
        <Breadcrumbs separator="/">
          <a href="#">대시보드</a>
          <span>보안 이벤트</span>
        </Breadcrumbs>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>3단계</Label>
        <Breadcrumbs separator="/">
          <a href="#">대시보드</a>
          <a href="#">자동화</a>
          <span>SOAR-001 피싱 대응</span>
        </Breadcrumbs>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>4단계</Label>
        <Breadcrumbs separator="/">
          <a href="#">대시보드</a>
          <a href="#">위협 탐지</a>
          <a href="#">이벤트 목록</a>
          <span>EVT-2024-0042</span>
        </Breadcrumbs>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Overflow ──────────────────────────────────────────────────────────────────

/** maxItems로 긴 경로를 ⋯ 버튼으로 축약합니다. 버튼 클릭 시 전체 경로가 펼쳐집니다. */
export const Overflow: Story = {
  render: () => {
    const [resetKey, setResetKey] = useState(0)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>maxItems=3 (6단계 경로)</Label>
          <Breadcrumbs key={`a-${resetKey}`} separator="/" maxItems={3}>
            <a href="#">보안운영센터</a>
            <a href="#">위협 인텔리전스</a>
            <a href="#">침해지표 분석</a>
            <a href="#">IP 목록</a>
            <a href="#">상세 분석</a>
            <span>EVT-2024-0042</span>
          </Breadcrumbs>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>maxItems=2 (5단계 경로)</Label>
          <Breadcrumbs key={`b-${resetKey}`} separator="›" maxItems={2}>
            <a href="#">홈</a>
            <a href="#">설정</a>
            <a href="#">보안</a>
            <a href="#">알림</a>
            <span>이메일 알림</span>
          </Breadcrumbs>
        </div>
        <button
          type="button"
          onClick={() => setResetKey((k) => k + 1)}
          style={{ alignSelf: 'flex-start', fontSize: 11, cursor: 'pointer', padding: '4px 10px' }}
        >
          초기화
        </button>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithOnClick ───────────────────────────────────────────────────────────────

/** href 대신 onClick으로 SPA 라우터와 연동하는 패턴 */
export const WithOnClick: Story = {
  render: () => {
    const [log, setLog] = useState('')
    const nav = (path: string) => setLog(`navigate → ${path}`)
    const btnStyle = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      fontSize: 'inherit',
      color: 'inherit',
    } as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Breadcrumbs separator="/">
          <button type="button" onClick={() => nav('/')} style={btnStyle}>
            대시보드
          </button>
          <button type="button" onClick={() => nav('/automation')} style={btnStyle}>
            자동화
          </button>
          <span>SOAR-001</span>
        </Breadcrumbs>
        {log && <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{log}</code>}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
