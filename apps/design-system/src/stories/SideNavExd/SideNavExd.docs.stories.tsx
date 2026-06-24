import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import { SideNavExd } from '../../components/SideNavExd'
import type { MenuItem } from '../../components/SideMenuBar/SideMenuBar.types'
import { ExdHomeIcon, ExdSecurityShieldIcon, ExdBellIcon, ExdSettingsIcon, ExdFileIcon } from '@port/icon-library'

const meta = {
  title: 'StyleGuide/SideNavExd',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Design tokens ─────────────────────────────────────────────────────────────

const t = {
  bg: vars.color.background,
  surface: vars.color.surface,
  surfaceHover: vars.color.surfaceHover,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textMuted,
  primary: vars.color.primary,
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

// ── Layout helpers ────────────────────────────────────────────────────────────

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '48px 32px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
      }}
    >
      {children}
    </div>
  </div>
)

const Section = ({ children, gap = 16 }: { children: ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
)

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
    <span
      style={{ display: 'inline-block', width: 3, height: 16, background: t.primary, borderRadius: 2, flexShrink: 0 }}
    />
    <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: 0.2 }}>{children}</h2>
  </div>
)

const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: t.radius,
      padding: '20px 24px',
      ...style,
    }}
  >
    {children}
  </div>
)

const CodeBlock = ({ children }: { children: string }) => (
  <pre
    style={{
      margin: 0,
      padding: '14px 18px',
      background: '#1e2228',
      color: '#abb2bf',
      borderRadius: t.radiusSm,
      fontSize: 12,
      fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
      lineHeight: 1.7,
      overflowX: 'auto',
      whiteSpace: 'pre',
    }}
  >
    <code>{children}</code>
  </pre>
)

const InlineCode = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 12,
      background: t.surfaceHover,
      border: `1px solid ${t.border}`,
      borderRadius: 3,
      padding: '1px 5px',
      color: t.text,
    }}
  >
    {children}
  </code>
)

const TypeBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: 'rgba(113,135,255,0.08)',
      color: '#5a6ee0',
      borderRadius: 3,
      padding: '2px 6px',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </code>
)

const DefaultBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: t.surfaceHover,
      color: t.textSecondary,
      borderRadius: 3,
      padding: '2px 6px',
    }}
  >
    {children}
  </code>
)

type PropRow = { name: string; type: string; defaultVal?: string; required?: boolean; desc: string }

const PropsTable = ({ rows }: { rows: PropRow[] }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
    <thead>
      <tr style={{ background: t.surfaceHover }}>
        {['Prop', 'Type', 'Default', '설명'].map((h) => (
          <th
            key={h}
            style={{
              padding: '8px 12px',
              textAlign: 'left',
              fontWeight: 600,
              fontSize: 12,
              color: t.textSecondary,
              borderBottom: `1px solid ${t.border}`,
              letterSpacing: 0.3,
            }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.name} style={{ borderBottom: `1px solid ${t.border}` }}>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            <InlineCode>{row.name}</InlineCode>
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            <TypeBadge>{row.type}</TypeBadge>
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            {row.defaultVal ? (
              <DefaultBadge>{row.defaultVal}</DefaultBadge>
            ) : (
              <span style={{ color: t.textMuted }}>—</span>
            )}
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top', color: t.textSecondary, lineHeight: 1.6 }}>
            {row.desc}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

// ── Demo ──────────────────────────────────────────────────────────────────────

const MENU_GROUP: MenuItem[] = [
  { key: 'dashboard', label: '대시보드', icon: <ExdHomeIcon size={16} /> },
  {
    key: 'events',
    label: '이벤트',
    icon: <ExdBellIcon size={16} />,
    children: [
      { key: 'events-security', label: '보안 이벤트' },
      { key: 'events-system', label: '시스템 이벤트' },
    ],
  },
  { key: 'policy', label: '정책', icon: <ExdSecurityShieldIcon size={16} /> },
  { key: 'reports', label: '보고서', icon: <ExdFileIcon size={16} /> },
  { key: 'settings', label: '설정', icon: <ExdSettingsIcon size={16} /> },
]

const LiveDemo = ({ collapsed }: { collapsed: boolean }) => {
  const [activeKey, setActiveKey] = useState('dashboard')
  const [isCollapsed, setCollapsed] = useState(collapsed)
  return (
    <div
      style={{
        display: 'flex',
        height: 360,
        border: `1px solid ${t.border}`,
        borderRadius: t.radius,
        overflow: 'hidden',
      }}
    >
      <SideNavExd
        menuGroup={MENU_GROUP}
        activeKey={activeKey}
        onActiveChange={setActiveKey}
        collapsed={isCollapsed}
        onCollapse={setCollapsed}
      />
      <div style={{ flex: 1, padding: 24, background: t.bg }}>
        <p style={{ margin: 0, fontSize: 13, color: t.textSecondary }}>
          활성: <strong style={{ color: t.text }}>{activeKey}</strong>
        </p>
        <p style={{ margin: '8px 0 0', fontSize: 13, color: t.textSecondary }}>상태: {isCollapsed ? '접힘' : '펼침'}</p>
      </div>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>SideNavExd</h1>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.primary,
              background: 'rgba(0,183,153,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            NAVIGATION
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 640 }}>
          EXD 앱 전용 사이드 내비게이션 컴포넌트입니다. 접힘/펼침 상태를 지원하며, 접힌 상태에서 아이콘 위에 마우스를
          올리면 Flyout 서브메뉴가 표시됩니다.
          <InlineCode>menuGroup</InlineCode>은 <InlineCode>MenuItem</InlineCode> 배열을 받으며 중첩 구조를 지원합니다.
        </p>
        <CodeBlock>{`import { SideNavExd } from '@port/design-system'
import type { SideNavExdProps } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* Live demo */}
      <Section gap={12}>
        <SectionTitle>라이브 데모 (펼침)</SectionTitle>
        <LiveDemo collapsed={false} />
      </Section>

      <Section gap={12}>
        <SectionTitle>라이브 데모 (접힘)</SectionTitle>
        <LiveDemo collapsed={true} />
      </Section>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'menuGroup',
                type: 'MenuItem[]',
                desc: '메뉴 그룹 데이터. MenuItem은 children으로 서브메뉴를 가질 수 있습니다.',
              },
              { name: 'activeKey', type: 'string', desc: '현재 활성화된 메뉴 아이템의 key' },
              { name: 'onActiveChange', type: '(key: string) => void', desc: '활성 메뉴 변경 콜백' },
              { name: 'collapsed', type: 'boolean', defaultVal: 'false', desc: '접힌 상태. true 시 아이콘만 표시.' },
              { name: 'onCollapse', type: '(collapsed: boolean) => void', desc: '접힘/펼침 변경 콜백' },
              { name: 'hidden', type: 'boolean', defaultVal: 'false', desc: '숨김 상태' },
              { name: 'onHidden', type: '(hidden: boolean) => void', desc: '숨김 상태 변경 콜백' },
              { name: 'header', type: 'ReactNode', desc: '사이드 내비게이션 상단 헤더 슬롯' },
              { name: 'aiChatSlot', type: 'ReactNode', desc: 'AI 채팅 버튼 슬롯 (하단 영역)' },
            ]}
          />
        </Card>

        <Card style={{ background: t.surfaceHover }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            MENUITEM
          </p>
          <PropsTable
            rows={[
              { name: 'key', type: 'string', required: true, desc: '고유 키' },
              { name: 'label', type: 'string', required: true, desc: '메뉴 레이블' },
              { name: 'icon', type: 'ReactNode', desc: '메뉴 아이콘 (@port/icon-library 사용 권장)' },
              { name: 'children', type: 'MenuItem[]', desc: '서브 메뉴. 있으면 펼침/접힘 가능한 그룹으로 렌더됩니다.' },
              { name: 'badge', type: 'number', desc: "알림 배지 숫자. 99 초과 시 '99+' 표시." },
              {
                name: 'type',
                type: "'item' | 'group'",
                defaultVal: "'item'",
                desc: "'group' 설정 시 클릭 불가한 섹션 레이블로 렌더됩니다.",
              },
            ]}
          />
        </Card>
      </Section>

      {/* Pattern */}
      <Section gap={16}>
        <SectionTitle>기본 사용법</SectionTitle>
        <Card>
          <CodeBlock>{`const [activeKey, setActiveKey] = useState('dashboard');
const [collapsed, setCollapsed] = useState(false);

<SideNavExd
  menuGroup={[
    { key: 'dashboard', label: '대시보드', icon: <ExdHomeIcon size={16} /> },
    {
      key: 'events',
      label: '이벤트',
      icon: <ExdBellIcon size={16} />,
      children: [
        { key: 'events-security', label: '보안 이벤트' },
        { key: 'events-system',   label: '시스템 이벤트' },
      ],
    },
  ]}
  activeKey={activeKey}
  onActiveChange={setActiveKey}
  collapsed={collapsed}
  onCollapse={setCollapsed}
/>`}</CodeBlock>
        </Card>
      </Section>
    </DocPage>
  ),
}
