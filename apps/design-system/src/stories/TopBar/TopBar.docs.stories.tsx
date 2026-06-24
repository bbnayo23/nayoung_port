import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import TopBar from '../../components/TopBar'
import type { TopBarNotiItem, TopBarDownloadItem, TopBarProduct } from '../../components/TopBar'

const meta = {
  title: 'StyleGuide/TopBar',
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
        maxWidth: 860,
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
            {row.required && (
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
            )}
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

// ── TopBar preview wrapper ────────────────────────────────────────────────────

const Preview = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{children}</div>
)

// ── Interactive demos ──────────────────────────────────────────────────────────

const NotiDemo = () => {
  const [notiItems, setNotiItems] = useState<TopBarNotiItem[]>([
    {
      id: '1',
      title: '새 위협 탐지',
      message: '비정상적인 네트워크 트래픽이 감지되었습니다.',
      time: '2분 전',
      read: false,
    },
    { id: '2', title: '정책 위반 알림', message: '반복적인 인증 실패가 발생했습니다.', time: '15분 전', read: false },
    {
      id: '3',
      title: '업데이트 완료',
      message: '보안 패치가 성공적으로 적용되었습니다.',
      time: '1시간 전',
      read: true,
    },
  ])
  const unread = notiItems.filter((n) => !n.read).length
  return (
    <Preview>
      <TopBar
        notiCount={unread}
        notiItems={notiItems}
        onNotiItemClick={(id) => setNotiItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))}
        onNotiReadAll={() => setNotiItems((prev) => prev.map((n) => ({ ...n, read: true })))}
      />
    </Preview>
  )
}

const DownloadDemo = () => {
  const downloadItems: TopBarDownloadItem[] = [
    { id: '1', fileName: 'security_report_2025.csv', fileSize: '2.4 MB', status: 'done' },
    { id: '2', fileName: 'threat_analysis_log.xlsx', fileSize: '8.1 MB', status: 'progress', progress: 65 },
    { id: '3', fileName: 'incident_export_may.zip', fileSize: '15.3 MB', status: 'error' },
  ]
  return (
    <Preview>
      <TopBar notiCount={0} downloadItems={downloadItems} />
    </Preview>
  )
}

const ProductDemo = () => {
  const [active, setActive] = useState('xdr')
  const products: TopBarProduct[] = [
    { id: 'xdr', label: 'Spider XDR' },
    { id: 'rn', label: 'Spider RN' },
    { id: 'ud', label: 'Unified Defense' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Preview>
        <TopBar notiCount={0} products={products} defaultActiveProduct={active} onProductChange={setActive} />
      </Preview>
      <p style={{ margin: 0, fontSize: 12, color: t.textSecondary }}>
        현재 프로덕트: <strong style={{ color: t.text }}>{active}</strong>
      </p>
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
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>TopBar</h1>
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
          XDR 레이아웃 상단 우측에 고정되는 액션 바입니다. 알림, 다운로드, 사용자 메뉴(테마/언어/로그아웃), 앱 전환
          팝오버 4개의 버튼으로 구성됩니다. 팝오버는 영역 외부 클릭 시 자동으로 닫힙니다.
        </p>
        <CodeBlock>{`import TopBar from '@port/design-system'
import type {
  TopBarProps,
  TopBarNotiItem,
  TopBarDownloadItem,
  TopBarProduct,
  TopBarLangItem,
  ThemeMode,
  LangCode,
} from '@port/design-system'`}</CodeBlock>
      </div>

      {/* Live preview */}
      <Section gap={12}>
        <SectionTitle>미리보기</SectionTitle>
        <Preview>
          <TopBar notiCount={3} userName="관리자" userEmail="admin@example.com" userRole="Admin" />
        </Preview>
        <p style={{ margin: 0, fontSize: 12, color: t.textMuted }}>각 아이콘을 클릭해 팝오버를 확인하세요.</p>
      </Section>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API — TopBarProps</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            사용자 정보
          </p>
          <PropsTable
            rows={[
              {
                name: 'userName',
                type: 'string',
                defaultVal: "'관리자'",
                desc: '사용자 이름 — 사용자 팝오버 프로필에 표시',
              },
              { name: 'userEmail', type: 'string', defaultVal: "'admin@example.com'", desc: '사용자 이메일' },
              { name: 'userRole', type: 'string', defaultVal: "'Admin'", desc: '사용자 역할 배지 텍스트' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            알림
          </p>
          <PropsTable
            rows={[
              {
                name: 'notiCount',
                type: 'number',
                defaultVal: '0',
                desc: '알림 아이콘 배지 숫자. 0이면 미표시, 99 초과 시 "99+"',
              },
              { name: 'notiItems', type: 'TopBarNotiItem[]', desc: '알림 팝오버 목록. 미전달 시 내장 기본값 사용' },
              { name: 'onNotificationClick', type: '() => void', desc: '알림 아이콘 버튼 클릭 콜백' },
              { name: 'onNotiItemClick', type: '(id: string) => void', desc: '알림 항목 클릭 콜백 — 읽음 처리에 사용' },
              { name: 'onNotiReadAll', type: '() => void', desc: "'모두 읽음' 버튼 클릭 콜백" },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            다운로드
          </p>
          <PropsTable
            rows={[
              {
                name: 'downloadItems',
                type: 'TopBarDownloadItem[]',
                desc: '다운로드 팝오버 목록. 미전달 시 내장 기본값 사용',
              },
              { name: 'onDownloadClick', type: '() => void', desc: '다운로드 아이콘 버튼 클릭 콜백' },
              { name: 'onDownloadItemClick', type: '(id: string) => void', desc: '다운로드 항목 클릭 콜백' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            테마 / 언어
          </p>
          <PropsTable
            rows={[
              {
                name: 'defaultTheme',
                type: "'light' | 'dark' | 'system'",
                defaultVal: "'light'",
                desc: '초기 테마 모드',
              },
              { name: 'defaultLang', type: "'ko' | 'en' | 'ja'", defaultVal: "'ko'", desc: '초기 언어 코드' },
              { name: 'langs', type: 'TopBarLangItem[]', desc: '언어 선택 목록. 미전달 시 ko/en/ja 기본값 사용' },
              { name: 'onThemeChange', type: '(mode: ThemeMode) => void', desc: '테마 변경 콜백' },
              { name: 'onLangChange', type: '(lang: LangCode) => void', desc: '언어 변경 콜백' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            앱 전환 / 기타
          </p>
          <PropsTable
            rows={[
              {
                name: 'products',
                type: 'TopBarProduct[]',
                desc: '앱 전환 팝오버 목록. 미전달 시 XDR/RN/UD 기본값 사용',
              },
              { name: 'defaultActiveProduct', type: 'string', defaultVal: "'xdr'", desc: '초기 활성 프로덕트 id' },
              { name: 'onProductChange', type: '(id: string) => void', desc: '프로덕트 변경 콜백' },
              { name: 'onProfileClick', type: '() => void', desc: '프로필 영역 클릭 콜백' },
              { name: 'onProgramInfoClick', type: '() => void', desc: '프로그램 정보 메뉴 클릭 콜백' },
              { name: 'onLogoutClick', type: '() => void', desc: '로그아웃 메뉴 클릭 콜백' },
              { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            타입 정의
          </p>
          <CodeBlock>{`type ThemeMode = 'light' | 'dark' | 'system'
type LangCode  = 'ko' | 'en' | 'ja'

interface TopBarLangItem {
  code:  LangCode
  label: string   // 언어 이름 (예: '한국어')
  flag:  string   // 국기 이모지 (예: '🇰🇷')
}

interface TopBarProduct {
  id:    string
  label: ReactNode  // 커스텀 라벨 (JSX 가능)
}

interface TopBarNotiItem {
  id:       string
  title:    string
  message?: string
  time?:    string
  read?:    boolean
}

interface TopBarDownloadItem {
  id:        string
  fileName:  string
  fileSize?: string
  status:    'done' | 'progress' | 'error'
  progress?: number  // 0-100, status='progress' 일 때 사용
}`}</CodeBlock>
        </Card>
      </Section>

      {/* Usage patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>알림 읽음 처리</p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>notiItems</InlineCode>를 state로 관리하고 <InlineCode>onNotiItemClick</InlineCode>으로 개별 읽음
            처리, <InlineCode>onNotiReadAll</InlineCode>로 전체 읽음 처리합니다.
          </p>
          <CodeBlock>{`const [notiItems, setNotiItems] = useState<TopBarNotiItem[]>([
  { id: '1', title: '새 위협 탐지', message: '...', time: '2분 전', read: false },
  { id: '2', title: '정책 위반 알림', message: '...', time: '15분 전', read: false },
])
const unread = notiItems.filter((n) => !n.read).length

<TopBar
  notiCount={unread}
  notiItems={notiItems}
  onNotiItemClick={(id) =>
    setNotiItems((prev) =>
      prev.map((n) => n.id === id ? { ...n, read: true } : n)
    )
  }
  onNotiReadAll={() =>
    setNotiItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }
/>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <NotiDemo />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>다운로드 상태 표시</p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>status: 'done' | 'progress' | 'error'</InlineCode> 로 다운로드 상태를 표시합니다.
            <InlineCode>progress</InlineCode>는 0-100 숫자로 진행률을 나타냅니다.
          </p>
          <CodeBlock>{`const downloadItems: TopBarDownloadItem[] = [
  { id: '1', fileName: 'security_report.csv',   fileSize: '2.4 MB', status: 'done' },
  { id: '2', fileName: 'threat_analysis.xlsx',  fileSize: '8.1 MB', status: 'progress', progress: 65 },
  { id: '3', fileName: 'incident_export.zip',   fileSize: '15.3 MB', status: 'error' },
]

<TopBar notiCount={0} downloadItems={downloadItems} />`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <DownloadDemo />
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>커스텀 프로덕트 목록</p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>products</InlineCode> prop으로 앱 전환 팝오버 목록을 커스터마이징합니다.
            <InlineCode>label</InlineCode>은 <InlineCode>ReactNode</InlineCode>이므로 JSX로 커스텀 표현이 가능합니다.
          </p>
          <CodeBlock>{`const [active, setActive] = useState('xdr')
const products: TopBarProduct[] = [
  { id: 'xdr', label: 'Spider XDR' },
  { id: 'rn',  label: 'Spider RN'  },
  { id: 'ud',  label: 'Unified Defense' },
]

<TopBar
  notiCount={0}
  products={products}
  defaultActiveProduct={active}
  onProductChange={setActive}
/>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <ProductDemo />
          </div>
        </Card>
      </Section>

      {/* Behavior notes */}
      <Section gap={16}>
        <SectionTitle>동작 설명</SectionTitle>
        <Card>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: t.surfaceHover }}>
                {['영역', '동작'].map((h) => (
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
                ['알림 팝오버', '벨 아이콘 클릭 시 열립니다. 미읽음 항목에는 파란 점이 표시됩니다.'],
                ['다운로드 팝오버', '다운로드 아이콘 클릭 시 열립니다. done/progress/error 상태별 UI가 다릅니다.'],
                ['사용자 팝오버', '사람 아이콘 클릭 시 열립니다. 프로필 → 테마 전환 → 언어 선택 → 메뉴 순서입니다.'],
                ['테마 전환', 'ButtonGroup(light/dark/system)으로 구성됩니다. 선택 값이 onThemeChange로 전달됩니다.'],
                ['언어 선택', '현재 언어(국기+이름)를 표시하며 화살표 클릭 시 사이드 팝오버가 열립니다.'],
                ['앱 전환', '메뉴 아이콘 클릭 시 열립니다. 현재 활성 프로덕트에 점 인디케이터가 표시됩니다.'],
                ['팝오버 닫힘', '각 팝오버는 영역 외부 mousedown 이벤트로 자동 닫힙니다.'],
              ].map(([area, desc]) => (
                <tr key={area} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500, color: t.text, whiteSpace: 'nowrap' }}>{area}</td>
                  <td style={{ padding: '10px 12px', color: t.textSecondary, lineHeight: 1.6 }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card style={{ background: t.surfaceHover }}>
          <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.7 }}>
            <strong style={{ color: t.text }}>레이아웃 배치</strong>: TopBar는 XDR 레이아웃 루트에 1회만 배치합니다.
            개별 페이지에서 추가할 필요가 없습니다. 컴포넌트 자체에는 <InlineCode>position: absolute/fixed</InlineCode>
            가 포함되지 않으므로 레이아웃에서 직접 위치를 지정하세요.
          </p>
        </Card>
      </Section>
    </DocPage>
  ),
}
