import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import SideMenuBar from '../../components/SideMenuBar'
import type { MenuItem } from '../../components/SideMenuBar'
import {
  ExdHomeIcon,
  ExdSearchIcon,
  ExdBellIcon,
  ExdSettingsIcon,
  ExdDataCodeIcon,
  ExdEventIcon,
  ExdDetectionIcon,
  ExdListUlIcon,
} from '@port/icon-library'

const meta = {
  title: 'StyleGuide/SideMenuBar',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Design tokens ──────────────────────────────────────────────────────────────

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

// ── Layout helpers ─────────────────────────────────────────────────────────────

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
      style={{
        display: 'inline-block',
        width: 3,
        height: 16,
        background: t.primary,
        borderRadius: 2,
        flexShrink: 0,
      }}
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

const RequiredBadge = () => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 600,
      color: vars.color.error,
      background: 'rgba(240,62,62,0.08)',
      borderRadius: 3,
      padding: '1px 5px',
      marginLeft: 4,
    }}
  >
    required
  </span>
)

// ── Props table ────────────────────────────────────────────────────────────────

type PropRow = {
  name: string
  type: string
  defaultVal?: string
  required?: boolean
  desc: string
}

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
            {row.required && <RequiredBadge />}
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

// ── 공통 메뉴 데이터 ───────────────────────────────────────────────────────────

const DEMO_MENU: MenuItem[] = [
  { key: 'dashboard', label: '대시보드', icon: <ExdHomeIcon size={18} /> },
  { key: 'log-search', label: '로그 검색', icon: <ExdSearchIcon size={18} /> },
  {
    key: 'detection-rule',
    label: '탐지룰관리',
    icon: <ExdSettingsIcon size={18} />,
    children: [
      { key: 'alert-condition', label: '경보조건관리' },
      { key: 'single-rule', label: '단일룰관리' },
    ],
  },
  { key: 'intelligence', label: '인텔리전스', icon: <ExdDataCodeIcon size={18} />, showDivider: true },
  { key: 'incident', label: 'INCIDENT 대응', icon: <ExdEventIcon size={18} /> },
]

const BADGE_MENU: MenuItem[] = [
  { key: 'dashboard', label: '대시보드', icon: <ExdHomeIcon size={18} /> },
  { key: 'event', label: '이벤트/탐지', icon: <ExdDetectionIcon size={18} />, badge: 5 },
  { key: 'incident', label: 'INCIDENT 대응', icon: <ExdBellIcon size={18} />, badge: 99 },
  { key: 'intelligence', label: '인텔리전스', icon: <ExdDataCodeIcon size={18} />, badge: 100 },
  { key: 'report', label: '보고서', icon: <ExdListUlIcon size={18} /> },
]

// ── Demo shell ─────────────────────────────────────────────────────────────────

const DemoShell = ({ menu, defaultCollapsed = false }: { menu: MenuItem[]; defaultCollapsed?: boolean }) => {
  const [activeKey, setActiveKey] = useState('log-search')
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  return (
    <div
      style={{
        display: 'flex',
        height: 400,
        border: `1px solid ${t.border}`,
        borderRadius: t.radius,
        overflow: 'hidden',
        background: t.bg,
      }}
    >
      <SideMenuBar
        menuGroup={menu}
        activeKey={activeKey}
        onActiveChange={setActiveKey}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        header={<span style={{ fontSize: 11, fontWeight: 700, color: t.primary, letterSpacing: 1 }}>SPIDER XDR</span>}
      />
      <div style={{ flex: 1, padding: 20, fontSize: 13, color: t.textSecondary }}>
        Active: <strong style={{ color: t.text }}>{activeKey}</strong>
        <br />
        Collapsed: <strong style={{ color: t.text }}>{String(collapsed)}</strong>
      </div>
    </div>
  )
}

// ── Story ──────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>SideMenuBar</h1>
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
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 620 }}>
          XDR 테마에서 사용하는 좌측 사이드 네비게이션 바입니다. 접기/펼치기, 다단계 서브메뉴, hover 확장, 배지 알림,
          그룹 레이블을 지원합니다. <InlineCode>collapsed</InlineCode> 상태는 <InlineCode>localStorage</InlineCode>에
          자동으로 저장됩니다.
        </p>
        <CodeBlock>{`import SideMenuBar from '@port/design-system'
import type { MenuItem, SideMenuBarProps } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API - SideMenuBar */}
      <Section gap={24}>
        <SectionTitle>API — SideMenuBar</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'menuGroup', type: 'MenuItem[]', required: true, desc: '메뉴 항목 배열. MenuItem 타입 참조' },
              { name: 'activeKey', type: 'string', required: true, desc: '현재 활성화된 메뉴 아이템의 key' },
              { name: 'onActiveChange', type: '(key: string) => void', desc: '활성 메뉴 변경 콜백' },
              { name: 'collapsed', type: 'boolean', defaultVal: 'true', desc: '사이드바 접힘 상태 (controlled)' },
              { name: 'onCollapse', type: '(collapsed: boolean) => void', desc: '접기/펼치기 상태 변경 콜백' },
              { name: 'header', type: 'ReactNode', desc: '헤더 영역 — 로고, 브랜드명 등' },
              { name: 'footer', type: 'ReactNode', desc: '하단 고정 영역 — 버전 정보, 프로필 등' },
              {
                name: 'showCollapseButton',
                type: 'boolean',
                defaultVal: 'true',
                desc: '헤더 접기/펼치기 버튼 표시 여부',
              },
              {
                name: 'position',
                type: "'left' | 'right'",
                defaultVal: "'left'",
                desc: '사이드바 위치',
              },
            ]}
          />
        </Card>

        <SectionTitle>API — MenuItem</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'key', type: 'string', required: true, desc: '메뉴 아이템의 고유 키' },
              { name: 'label', type: 'string', required: true, desc: '메뉴 텍스트' },
              {
                name: 'type',
                type: "'item' | 'group'",
                defaultVal: "'item'",
                desc: "'group'으로 설정하면 클릭 불가한 섹션 레이블로 렌더됩니다",
              },
              { name: 'icon', type: 'ReactNode', desc: '메뉴 아이콘 (@port/icon-library 사용 권장)' },
              { name: 'children', type: 'MenuItem[]', desc: '서브 메뉴 배열 — 재귀 지원' },
              { name: 'badge', type: 'number', desc: '알림 배지 숫자. 99 초과 시 "99+"로 클램핑' },
              { name: 'tooltip', type: 'string', desc: '접힌 상태에서 표시할 툴팁. 미지정 시 label 사용' },
              { name: 'url', type: 'string', desc: '링크 URL' },
              {
                name: 'target',
                type: "'_blank' | '_self' | '_parent' | '_top'",
                desc: "'_blank'이면 외부링크 아이콘이 표시됩니다",
              },
              { name: 'showDivider', type: 'boolean', defaultVal: 'false', desc: '항목 아래 구분선 표시' },
              { name: 'onClick', type: '(e: MouseEvent) => void', desc: '클릭 핸들러' },
            ]}
          />
        </Card>
      </Section>

      {/* Usage patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>기본 패턴</p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>collapsed</InlineCode>와 <InlineCode>activeKey</InlineCode>를 상태로 관리합니다.
          </p>
          <CodeBlock>{`const [activeKey, setActiveKey] = useState('dashboard')
const [collapsed, setCollapsed] = useState(false)

<SideMenuBar
  menuGroup={menuGroup}
  activeKey={activeKey}
  onActiveChange={setActiveKey}
  collapsed={collapsed}
  onCollapse={setCollapsed}
  header={<Logo />}
/>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <DemoShell menu={DEMO_MENU} />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>배지 알림</p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>badge</InlineCode> prop에 숫자를 전달합니다. 99 초과 시 "99+"로 표시되고, 0이면 배지가
            숨겨집니다.
          </p>
          <CodeBlock>{`const menuGroup: MenuItem[] = [
  { key: 'event', label: '이벤트/탐지', icon: <DetectionIcon />, badge: 5 },
  { key: 'incident', label: 'INCIDENT 대응', icon: <EventIcon />, badge: 99 },
  { key: 'intel', label: '인텔리전스', icon: <DataCodeIcon />, badge: 100 }, // → "99+"
]`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <DemoShell menu={BADGE_MENU} />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>그룹 레이블</p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>type: 'group'</InlineCode> 항목으로 메뉴를 섹션별로 구분합니다. 접힌 상태에서는 레이블이
            자동으로 숨겨집니다.
          </p>
          <CodeBlock>{`const menuGroup: MenuItem[] = [
  { key: 'g1', label: '모니터링', type: 'group' },
  { key: 'dashboard', label: '대시보드', icon: <HomeIcon /> },
  { key: 'g2', label: '분석', type: 'group' },
  { key: 'log-search', label: '로그 검색', icon: <SearchIcon /> },
]`}</CodeBlock>
        </Card>
      </Section>

      {/* Collapsed state */}
      <Section gap={16}>
        <SectionTitle>접힘 상태 (Collapsed)</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Card>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
              collapsed=false (펼침)
            </p>
            <DemoShell menu={DEMO_MENU} defaultCollapsed={false} />
          </Card>
          <Card>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
              collapsed=true (접힘)
            </p>
            <DemoShell menu={DEMO_MENU} defaultCollapsed />
          </Card>
        </div>
        <Card style={{ background: t.surfaceHover }}>
          <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.7 }}>
            <strong style={{ color: t.text }}>Hover 확장</strong>: 접힌 상태에서 메뉴 본문 위에 마우스를 올리면
            일시적으로 확장됩니다. 마우스가 벗어나면 다시 접힙니다.
            <br />
            <strong style={{ color: t.text }}>localStorage 저장</strong>: 접힘 상태는{' '}
            <InlineCode>igloo-side-menu-bar-collapsed</InlineCode> 키로 자동 저장됩니다.
            <InlineCode>getStoredCollapsed()</InlineCode> 헬퍼로 초기값을 읽어올 수 있습니다.
          </p>
        </Card>
      </Section>

      {/* Keyboard nav */}
      <Section gap={16}>
        <SectionTitle>키보드 내비게이션</SectionTitle>
        <Card>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: t.surfaceHover }}>
                {['키', '동작'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '8px 12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: 12,
                      color: t.textSecondary,
                      borderBottom: `1px solid ${t.border}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['↓ / ↑', '다음/이전 메뉴 항목으로 포커스 이동'],
                ['Enter / Space', '현재 포커스된 항목 선택 또는 서브메뉴 토글'],
                ['← ArrowLeft', '펼쳐진 상태에서 사이드바 접기'],
                ['→ ArrowRight', '접힌 상태에서 사이드바 펼치기'],
              ].map(([key, desc]) => (
                <tr key={key} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: '10px 12px' }}>
                    <InlineCode>{key}</InlineCode>
                  </td>
                  <td style={{ padding: '10px 12px', color: t.textSecondary }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>
    </DocPage>
  ),
}
