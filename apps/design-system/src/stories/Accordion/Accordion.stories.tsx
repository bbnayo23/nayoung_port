import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { vars } from '@dc/theme/contract.css'
import Accordion from '@dc/components/Accordion'

/**
 * Accordion — 여러 섹션을 그룹으로 묶어 관리하는 컴포넌트
 *
 * 여러 Accordion.Item이 공통 iconDirection · disabled 상태를 공유합니다.
 * 단일 섹션 토글이 필요할 때는 Collapse를 사용하세요.
 */
const meta = {
  title: 'StyleGuide/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
  argTypes: {
    iconDirection: {
      control: 'select',
      options: ['left', 'right'],
      description: '모든 항목에 공통 적용되는 아이콘 방향',
      table: { category: 'Layout' },
    },
    disabled: {
      control: 'boolean',
      description: '그룹 전체 비활성화',
      table: { category: 'State' },
    },
  },
  args: {
    iconDirection: 'right',
    disabled: false,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code
    style={{
      display: 'inline-block',
      marginBottom: 6,
      fontSize: 11,
      fontFamily: 'monospace',
      color: vars.color.textSecondary,
    }}
  >
    {children}
  </code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 iconDirection · disabled를 조정합니다. */
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState<Record<string, boolean>>({ a1: true })
    return (
      <Accordion {...args}>
        <Accordion.Item active={open.a1} onChange={(v) => setOpen((p) => ({ ...p, a1: v }))}>
          <Accordion.Header>아코디언 항목 1</Accordion.Header>
          <Accordion.Content>첫 번째 항목의 내용입니다.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item active={open.a2} onChange={(v) => setOpen((p) => ({ ...p, a2: v }))}>
          <Accordion.Header>아코디언 항목 2</Accordion.Header>
          <Accordion.Content>두 번째 항목의 내용입니다.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item active={open.a3} onChange={(v) => setOpen((p) => ({ ...p, a3: v }))}>
          <Accordion.Header>아코디언 항목 3</Accordion.Header>
          <Accordion.Content>세 번째 항목의 내용입니다.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )
  },
}

// ── Exclusive (FAQ 패턴) ───────────────────────────────────────────────────────

/** 한 번에 하나만 열리는 패턴. 다른 항목 클릭 시 기존 항목이 닫힙니다. FAQ, Q&A 목록에 사용합니다. */
export const Exclusive: Story = {
  render: () => {
    const items = [
      {
        id: 'q1',
        title: '피싱 대응 플레이북이란?',
        content: '수신된 피싱 이메일을 자동으로 탐지하고 격리 · 리포트하는 자동화 워크플로우입니다.',
      },
      {
        id: 'q2',
        title: 'DDoS 완화는 어떻게 작동하나요?',
        content: 'CDN을 우회하고 트래픽을 여러 서버로 분산시켜 서비스 가용성을 유지합니다.',
      },
      {
        id: 'q3',
        title: '내부 위협을 어떻게 탐지하나요?',
        content: 'UEBA 엔진이 사용자 행동 이상을 감지하면 계정을 잠금하고 관리자에게 알림을 전송합니다.',
      },
    ]
    const [openId, setOpenId] = useState<string | null>('q1')
    return (
      <Accordion>
        {items.map((item) => (
          <Accordion.Item
            key={item.id}
            active={openId === item.id}
            onChange={(isOpen) => setOpenId(isOpen ? item.id : null)}
          >
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Content>{item.content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Multiple (설정 카테고리) ────────────────────────────────────────────────────

/** 여러 항목을 동시에 펼칠 수 있는 패턴. 설정 페이지의 카테고리 그룹에 사용합니다. */
export const Multiple: Story = {
  render: () => {
    const items = [
      { id: 'm1', title: '일반 설정', content: '언어, 시간대, 날짜 형식을 설정합니다.' },
      { id: 'm2', title: '보안 설정', content: '2FA 인증, 세션 타임아웃, 비밀번호 정책을 관리합니다.' },
      { id: 'm3', title: '알림 설정', content: 'Slack, Email, SMS 알림 채널을 구성합니다.' },
    ]
    const [openSet, setOpenSet] = useState<Set<string>>(new Set(['m1']))
    const toggle = (id: string, isOpen: boolean) => {
      setOpenSet((prev) => {
        const next = new Set(prev)
        if (isOpen) next.add(id)
        else next.delete(id)
        return next
      })
    }
    return (
      <Accordion>
        {items.map((item) => (
          <Accordion.Item key={item.id} active={openSet.has(item.id)} onChange={(isOpen) => toggle(item.id, isOpen)}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Content>{item.content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Icon Direction ────────────────────────────────────────────────────────────

/** iconDirection left · right 비교. 그룹 전체에 한 번에 적용됩니다. */
export const IconDirection: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['left', 'right'] as const).map((dir) => (
        <div key={dir} style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>{`iconDirection="${dir}"`}</Label>
          <Accordion iconDirection={dir}>
            <Accordion.Item active onChange={() => {}}>
              <Accordion.Header>헤더</Accordion.Header>
              <Accordion.Content>콘텐츠 영역</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ maxWidth: 600 }}>
        <Story />
      </div>
    ),
  ],
}

// ── Disabled ──────────────────────────────────────────────────────────────────

/** 항목 개별 비활성화 vs 그룹 전체 비활성화. */
export const Disabled: Story = {
  render: () => {
    const [open, setOpen] = useState<Record<string, boolean>>({ e1: true })
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>item disabled (개별)</Label>
          <Accordion>
            <Accordion.Item active={open.e1} onChange={(v) => setOpen((p) => ({ ...p, e1: v }))}>
              <Accordion.Header>활성화된 항목</Accordion.Header>
              <Accordion.Content>이 항목은 정상적으로 열고 닫을 수 있습니다.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item disabled>
              <Accordion.Header>비활성화된 항목</Accordion.Header>
              <Accordion.Content>이 내용은 보이지 않습니다.</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>Accordion disabled (그룹 전체)</Label>
          <Accordion disabled>
            <Accordion.Item>
              <Accordion.Header>전체 비활성화된 아코디언</Accordion.Header>
              <Accordion.Content>이 내용은 열 수 없습니다.</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
