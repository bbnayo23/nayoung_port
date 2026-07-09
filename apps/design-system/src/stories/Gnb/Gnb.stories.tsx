import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Gnb from '../../components/Gnb'
import type { GnbNotiItem, GnbDownloadItem, GnbProduct } from '../../components/Gnb'

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: 'StyleGuide/Gnb',
  component: Gnb,
  parameters: { layout: 'padded' },
  argTypes: {
    notiCount: {
      control: 'number',
      description: '알림 배지 숫자. 0이면 미표시, 99 초과 시 "99+"',
      table: { category: 'Notification' },
    },
    userName: {
      control: 'text',
      description: '사용자 이름',
      table: { category: 'User' },
    },
    userEmail: {
      control: 'text',
      description: '사용자 이메일',
      table: { category: 'User' },
    },
    userRole: {
      control: 'text',
      description: '사용자 역할 배지',
      table: { category: 'User' },
    },
    defaultTheme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: '초기 테마 모드',
      table: { category: 'Theme' },
    },
    defaultLang: {
      control: 'select',
      options: ['ko', 'en', 'ja'],
      description: '초기 언어',
      table: { category: 'Language' },
    },
    onThemeChange: { table: { disable: true } },
    onLangChange: { table: { disable: true } },
    onNotificationClick: { table: { disable: true } },
    onDownloadClick: { table: { disable: true } },
    onProfileClick: { table: { disable: true } },
    onProgramInfoClick: { table: { disable: true } },
    onLogoutClick: { table: { disable: true } },
    onProductChange: { table: { disable: true } },
    onNotiItemClick: { table: { disable: true } },
    onNotiReadAll: { table: { disable: true } },
    onDownloadItemClick: { table: { disable: true } },
    products: { control: false, table: { disable: true } },
    langs: { control: false, table: { disable: true } },
    notiItems: { control: false, table: { disable: true } },
    downloadItems: { control: false, table: { disable: true } },
  },
  args: {
    notiCount: 5,
    userName: '관리자',
    userEmail: 'admin@example.com',
    userRole: 'Admin',
    defaultTheme: 'light',
    defaultLang: 'ko',
  },
} satisfies Meta<typeof Gnb>

export default meta
type Story = StoryObj<typeof meta>

// ── 미리보기 래퍼 ──────────────────────────────────────────────────────────────

const Preview = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{children}</div>
)

// ── Playground ─────────────────────────────────────────────────────────────────

/** Controls 패널에서 notiCount · userName · userRole · defaultTheme · defaultLang 등을 조정합니다. */
export const Playground: Story = {
  render: (args) => (
    <Preview>
      <Gnb {...args} />
    </Preview>
  ),
}

// ── WithNotifications ──────────────────────────────────────────────────────────

/** 알림 아이콘 클릭 시 notiItems 팝오버가 열립니다. 항목 클릭 시 읽음 처리됩니다. */
export const WithNotifications: Story = {
  render: () => {
    const [notiItems, setNotiItems] = useState<GnbNotiItem[]>([
      {
        id: '1',
        title: '새 위협 탐지',
        message: '비정상적인 네트워크 트래픽이 감지되었습니다.',
        time: '2분 전',
        read: false,
      },
      {
        id: '2',
        title: '정책 위반 알림',
        message: '사용자 계정에서 반복적인 인증 실패가 발생했습니다.',
        time: '15분 전',
        read: false,
      },
      {
        id: '3',
        title: '시스템 업데이트 완료',
        message: '보안 패치가 성공적으로 적용되었습니다.',
        time: '1시간 전',
        read: true,
      },
    ])
    const unread = notiItems.filter((n) => !n.read).length

    return (
      <Preview>
        <Gnb
          notiCount={unread}
          notiItems={notiItems}
          onNotiItemClick={(id) => setNotiItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))}
          onNotiReadAll={() => setNotiItems((prev) => prev.map((n) => ({ ...n, read: true })))}
        />
      </Preview>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithDownloads ──────────────────────────────────────────────────────────────

/** 다운로드 아이콘 클릭 시 downloadItems 팝오버가 열립니다. 완료/진행/실패 상태를 보여줍니다. */
export const WithDownloads: Story = {
  render: () => {
    const downloadItems: GnbDownloadItem[] = [
      { id: '1', fileName: 'security_report_2025.csv', fileSize: '2.4 MB', status: 'done' },
      { id: '2', fileName: 'threat_analysis_log.xlsx', fileSize: '8.1 MB', status: 'progress', progress: 65 },
      { id: '3', fileName: 'incident_export_may.zip', fileSize: '15.3 MB', status: 'error' },
    ]
    return (
      <Preview>
        <Gnb notiCount={0} downloadItems={downloadItems} />
      </Preview>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithCallbacks ──────────────────────────────────────────────────────────────

/** 버튼을 클릭해 이벤트 콜백이 발생하는 것을 이벤트 로그로 확인합니다. */
export const WithCallbacks: Story = {
  render: () => {
    const [log, setLog] = useState<string[]>([])
    const addLog = (msg: string) =>
      setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 9)])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Preview>
          <Gnb
            notiCount={3}
            userName="홍길동"
            userEmail="hong@example.com"
            userRole="Operator"
            onNotificationClick={() => addLog('알림 버튼 클릭')}
            onDownloadClick={() => addLog('다운로드 버튼 클릭')}
            onNotiItemClick={(id) => addLog(`알림 항목 클릭: #${id}`)}
            onNotiReadAll={() => addLog('모두 읽음 처리')}
            onDownloadItemClick={(id) => addLog(`다운로드 항목 클릭: #${id}`)}
            onProfileClick={() => addLog('프로필 클릭')}
            onThemeChange={(m) => addLog(`테마 변경: ${m}`)}
            onLangChange={(l) => addLog(`언어 변경: ${l}`)}
            onProgramInfoClick={() => addLog('프로그램 정보 클릭')}
            onLogoutClick={() => addLog('로그아웃 클릭')}
            onProductChange={(id) => addLog(`프로덕트 변경: ${id}`)}
          />
        </Preview>
        <div
          style={{
            background: vars.color.surface,
            border: `1px solid ${vars.color.border}`,
            borderRadius: vars.radius.md,
            padding: '12px 16px',
            minHeight: 80,
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

// ── CustomProducts ─────────────────────────────────────────────────────────────

/** products prop으로 앱 전환 팝오버 목록을 커스터마이징합니다. */
export const CustomProducts: Story = {
  render: () => {
    const [active, setActive] = useState('xdr')
    const products: GnbProduct[] = [
      { id: 'xdr', label: 'Spider XDR' },
      { id: 'rn', label: 'Spider RN' },
      { id: 'ud', label: 'Unified Defense' },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Preview>
          <Gnb notiCount={0} products={products} defaultActiveProduct={active} onProductChange={setActive} />
        </Preview>
        <p style={{ margin: 0, fontSize: 13, color: vars.color.textSecondary }}>
          현재 프로덕트: <strong style={{ color: vars.color.text }}>{active}</strong>
        </p>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
