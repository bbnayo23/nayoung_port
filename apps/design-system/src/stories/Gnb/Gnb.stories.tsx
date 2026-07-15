import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import Gnb from '@dc/components/Gnb'

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: 'StyleGuide/Gnb',
  component: Gnb,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text', description: '브랜드 타이틀', table: { category: 'Brand' } },
    showBrandDropdown: { control: 'boolean', description: '브랜드 드롭다운 셰브론', table: { category: 'Brand' } },
    showAiAssistant: { control: 'boolean', description: 'AI Assistant 버튼', table: { category: 'Actions' } },
    aiAssistantLabel: { control: 'text', description: 'AI Assistant 라벨', table: { category: 'Actions' } },
    notiCount: { control: 'number', description: '알림 개수(1↑ 빨간 점)', table: { category: 'Actions' } },
    showDownload: { control: 'boolean', table: { category: 'Actions' } },
    showNotification: { control: 'boolean', table: { category: 'Actions' } },
    showTheme: { control: 'boolean', table: { category: 'Actions' } },
    showLanguage: { control: 'boolean', table: { category: 'Actions' } },
    showUser: { control: 'boolean', table: { category: 'Actions' } },
    showHome: { control: 'boolean', table: { category: 'Actions' } },
    onBrandClick: { table: { disable: true } },
    onAiAssistantClick: { table: { disable: true } },
    onDownloadClick: { table: { disable: true } },
    onNotificationClick: { table: { disable: true } },
    onThemeClick: { table: { disable: true } },
    onLanguageClick: { table: { disable: true } },
    onUserClick: { table: { disable: true } },
    onHomeClick: { table: { disable: true } },
  },
  args: {
    title: 'AiR Works',
    aiAssistantLabel: 'AI Assistant',
    notiCount: 3,
  },
} satisfies Meta<typeof Gnb>

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ─────────────────────────────────────────────────────────────────

/** Controls 패널에서 브랜드·액션 노출 여부를 조정합니다. */
export const Playground: Story = {}

// ── WithNotification ───────────────────────────────────────────────────────────

/** `notiCount`가 1 이상이면 알림 벨 우상단에 빨간 점이 표시됩니다. */
export const WithNotification: Story = {
  args: { notiCount: 5 },
  parameters: { controls: { disable: true } },
}

// ── Callbacks ──────────────────────────────────────────────────────────────────

/** 각 버튼 클릭 시 대응 콜백이 발생합니다(이벤트 로그로 확인). */
export const WithCallbacks: Story = {
  render: (args) => {
    const [log, setLog] = useState<string[]>([])
    const add = (m: string) => setLog((prev) => [m, ...prev.slice(0, 8)])
    return (
      <div>
        <Gnb
          {...args}
          onBrandClick={() => add('브랜드 클릭')}
          onAiAssistantClick={() => add('AI Assistant 클릭')}
          onDownloadClick={() => add('다운로드 클릭')}
          onNotificationClick={() => add('알림 클릭')}
          onThemeClick={() => add('테마 클릭')}
          onLanguageClick={() => add('언어 클릭')}
          onUserClick={() => add('사용자 클릭')}
          onHomeClick={() => add('홈 클릭')}
        />
        <div
          style={{
            margin: 16,
            padding: '12px 16px',
            minHeight: 80,
            background: vars.color.surface,
            border: `1px solid ${vars.color.border}`,
            borderRadius: vars.radius.md,
            fontSize: 12,
            fontFamily: 'monospace',
            color: vars.color.textSecondary,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {log.length === 0 ? (
            <span style={{ color: vars.color.textMuted }}>— 버튼을 클릭해 보세요</span>
          ) : (
            log.map((entry, i) => <span key={i}>{entry}</span>)
          )}
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
