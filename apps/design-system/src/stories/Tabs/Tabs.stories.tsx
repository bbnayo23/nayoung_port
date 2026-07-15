import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import Tabs from '@dc/components/Tabs'
import type { TabsProps } from '@dc/components/Tabs'

const meta = {
  title: 'StyleGuide/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'outline', 'enclosed', 'fill'] satisfies TabsProps['variant'][],
      description: '탭 스타일 variant',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies TabsProps['size'][],
      description: '탭 크기',
      table: { category: 'Size' },
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'] satisfies TabsProps['direction'][],
      description: '탭 방향',
      table: { category: 'Layout' },
    },
    value: { control: false, table: { disable: true } },
    onChange: { table: { disable: true } },
    children: { control: false, table: { disable: true } },
  },
  args: {
    variant: 'underline',
    size: 'md',
    direction: 'horizontal',
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 variant · size · direction을 실시간으로 조정합니다. */
export const Playground: Story = {
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = useState<string | number>('tab1')
      return (
        <Tabs {...args} value={value} onChange={setValue}>
          <Tabs.List>
            <Tabs.Tab value="tab1">탭 1</Tabs.Tab>
            <Tabs.Tab value="tab2">탭 2</Tabs.Tab>
            <Tabs.Tab value="tab3">탭 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Contents value="tab1">
            <div style={{ padding: '16px 0', fontSize: 13, color: vars.color.textSecondary }}>탭 1 내용입니다.</div>
          </Tabs.Contents>
          <Tabs.Contents value="tab2">
            <div style={{ padding: '16px 0', fontSize: 13, color: vars.color.textSecondary }}>탭 2 내용입니다.</div>
          </Tabs.Contents>
          <Tabs.Contents value="tab3">
            <div style={{ padding: '16px 0', fontSize: 13, color: vars.color.textSecondary }}>탭 3 내용입니다.</div>
          </Tabs.Contents>
        </Tabs>
      )
    }
    return <Demo />
  },
}

// ── Variants ─────────────────────────────────────────────────────────────────

/** underline · outline · enclosed · fill 네 가지 variant 비교 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 500 }}>
      {(['underline', 'outline', 'enclosed', 'fill'] as const).map((v) => {
        const TabExample = () => {
          const [value, setValue] = useState<string | number>('t1')
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>
                {`variant="${v}"`}
              </code>
              <Tabs variant={v} value={value} onChange={setValue}>
                <Tabs.List>
                  <Tabs.Tab value="t1">탭 A</Tabs.Tab>
                  <Tabs.Tab value="t2">탭 B</Tabs.Tab>
                  <Tabs.Tab value="t3">탭 C</Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </div>
          )
        }
        return <TabExample key={v} />
      })}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── WithContent ───────────────────────────────────────────────────────────────

/** Tabs.Contents를 함께 사용해 탭 패널을 전환합니다. */
export const WithContent: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string | number>('alerts')
      return (
        <div style={{ maxWidth: 560 }}>
          <Tabs value={value} onChange={setValue} variant="underline">
            <Tabs.List>
              <Tabs.Tab value="alerts">알림</Tabs.Tab>
              <Tabs.Tab value="threats">위협</Tabs.Tab>
              <Tabs.Tab value="assets">자산</Tabs.Tab>
            </Tabs.List>
            <Tabs.Contents value="alerts">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0' }}>
                <strong style={{ fontSize: 13, color: vars.color.text }}>최근 알림 (3건)</strong>
                {['피싱 이메일 탐지', 'DDoS 트래픽 급증', '비정상 로그인 시도'].map((name, i) => (
                  <div
                    key={name}
                    style={{
                      padding: '8px 12px',
                      borderRadius: vars.radius.sm,
                      border: `1px solid ${vars.color.border}`,
                      fontSize: 12,
                      color: vars.color.textSecondary,
                    }}
                  >
                    {name} — {(i + 1) * 2}분 전
                  </div>
                ))}
              </div>
            </Tabs.Contents>
            <Tabs.Contents value="threats">
              <div style={{ padding: '16px 0', fontSize: 13, color: vars.color.textSecondary }}>
                위협 인텔리전스 피드 — 오늘 42건 수집됨
              </div>
            </Tabs.Contents>
            <Tabs.Contents value="assets">
              <div style={{ padding: '16px 0', fontSize: 13, color: vars.color.textSecondary }}>
                등록된 자산 1,284개 · 위험 자산 7개
              </div>
            </Tabs.Contents>
          </Tabs>
        </div>
      )
    }
    return <Demo />
  },
  parameters: { controls: { disable: true } },
}

// ── DisabledTab ───────────────────────────────────────────────────────────────

/** disabled prop으로 특정 탭을 비활성화합니다. 키보드 이동 시 건너뜁니다. */
export const DisabledTab: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string | number>('active')
      return (
        <div style={{ maxWidth: 400 }}>
          <Tabs value={value} onChange={setValue} variant="underline">
            <Tabs.List>
              <Tabs.Tab value="active">활성 탭</Tabs.Tab>
              <Tabs.Tab value="another">다른 탭</Tabs.Tab>
              <Tabs.Tab value="disabled" disabled>
                비활성 탭
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>
      )
    }
    return <Demo />
  },
  parameters: { controls: { disable: true } },
}

// ── Vertical ──────────────────────────────────────────────────────────────────

/** direction="vertical"로 세로 탭 레이아웃을 구성합니다. */
export const Vertical: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string | number>('general')
      const menus = [
        { value: 'general', label: '일반 설정' },
        { value: 'security', label: '보안' },
        { value: 'notify', label: '알림' },
        { value: 'advanced', label: '고급' },
      ]
      return (
        <div style={{ maxWidth: 500 }}>
          <Tabs value={value} onChange={setValue} direction="vertical" variant="enclosed">
            <Tabs.List direction="vertical">
              {menus.map((m) => (
                <Tabs.Tab key={m.value} value={m.value}>
                  {m.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {menus.map((m) => (
              <Tabs.Contents key={m.value} value={m.value} renderMode="singleRender">
                <div style={{ padding: '0 16px', fontSize: 13, color: vars.color.textSecondary }}>
                  <strong style={{ color: vars.color.text }}>{m.label}</strong> 설정 패널
                </div>
              </Tabs.Contents>
            ))}
          </Tabs>
        </div>
      )
    }
    return <Demo />
  },
  parameters: { controls: { disable: true } },
}
