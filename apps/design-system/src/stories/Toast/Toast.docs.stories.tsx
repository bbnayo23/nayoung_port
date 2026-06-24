import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Toast, { Toaster, toast } from '../../components/Toast'

const meta = {
  title: 'StyleGuide/Toast',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Layout helpers ────────────────────────────────────────────────────────────

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

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 840,
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

type PropRow = { name: string; type: string; defaultVal?: string; desc: string }

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

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Toast</h1>
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
            SONNER
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          4가지 <InlineCode>variant</InlineCode>를 지원하는 알림 컴포넌트입니다. <InlineCode>Toast</InlineCode>는 단독
          렌더 또는 <InlineCode>Toaster</InlineCode> + <InlineCode>toast()</InlineCode> 조합으로 스태킹 알림을 구현할 수
          있습니다.
        </p>
        <CodeBlock>{`import Toast, { Toaster, toast } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TOAST
          </p>
          <PropsTable
            rows={[
              {
                name: 'variant',
                type: "'success' | 'error' | 'info' | 'warning'",
                defaultVal: "'success'",
                desc: '아이콘과 프로그레스바 색상을 결정합니다.',
              },
              { name: 'title', type: 'string', desc: '토스트 제목' },
              { name: 'message', type: 'string', desc: '토스트 본문 메시지' },
              {
                name: 'duration',
                type: 'number',
                defaultVal: '3000',
                desc: '자동 닫힘 시간(ms). 0이면 자동으로 닫히지 않습니다.',
              },
              { name: 'showCloseButton', type: 'boolean', defaultVal: 'true', desc: '우측 닫기(×) 버튼 표시 여부' },
              { name: 'onClose', type: '() => void', desc: '닫기 버튼 클릭 및 duration 만료 시 콜백' },
              { name: 'action', type: 'ReactNode', desc: '우측 액션 버튼 슬롯' },
              { name: 'icon', type: 'ReactNode', desc: '커스텀 아이콘 — 지정 시 variant 기본 아이콘을 대체합니다.' },
              {
                name: 'position',
                type: 'ToastPosition',
                desc: '단독 사용 시 위치 진입 애니메이션 클래스 적용 (Toaster 사용 시 생략)',
              },
              { name: 'isClosing', type: 'boolean', desc: '퇴장 애니메이션 상태 (토스트 매니저 연동 시 사용)' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TOASTER
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            앱 루트에 한 번 배치합니다. sonner의 <InlineCode>Toaster</InlineCode> props를 모두 전달할 수 있습니다.
          </p>
          <PropsTable
            rows={[
              { name: 'position', type: 'ToastPosition', defaultVal: "'top-right'", desc: '스택 위치' },
              { name: '...rest', type: 'SonnerToasterProps', desc: 'sonner Toaster의 모든 props 전달 가능' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TOAST() HELPER
          </p>
          <CodeBlock>{`toast.success(title, opts?)
toast.error(title, opts?)
toast.info(title, opts?)
toast.warning(title, opts?)

// opts: { message?, duration?, action?, icon? }`}</CodeBlock>
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>스태킹 토스트 (권장)</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            앱 루트에 <InlineCode>{'<Toaster />'}</InlineCode>를 배치하고 <InlineCode>toast()</InlineCode>로 호출합니다.
            자동 스태킹·위치·타이머를 sonner가 관리합니다.
          </p>
          <CodeBlock>{`// 앱 루트
<Toaster position="top-right" />

// 호출부 (어디서나)
toast.success('저장 완료', { message: '변경사항이 저장되었습니다.' })
toast.error('오류 발생', { message: '요청을 처리하는 중 문제가 발생했습니다.' })
toast.warning('세션 만료 예정', { message: '5분 후 자동 로그아웃됩니다.' })
toast.info('업데이트 가능', { message: '새 버전 v3.2.1이 있습니다.' })`}</CodeBlock>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
            <Toaster position="bottom-right" />
            {(['success', 'error', 'warning', 'info'] as const).map((v) => (
              <button
                key={v}
                onClick={() =>
                  toast[v](
                    v === 'success'
                      ? '저장 완료'
                      : v === 'error'
                        ? '오류 발생'
                        : v === 'warning'
                          ? '세션 만료 예정'
                          : '업데이트 가능',
                    {
                      message:
                        v === 'success'
                          ? '변경사항이 저장되었습니다.'
                          : v === 'error'
                            ? '요청을 처리하는 중 문제가 발생했습니다.'
                            : v === 'warning'
                              ? '5분 후 자동 로그아웃됩니다.'
                              : '새 버전 v3.2.1이 있습니다.',
                    },
                  )
                }
                style={{
                  padding: '6px 16px',
                  fontSize: 12,
                  fontWeight: 600,
                  background: t.surface,
                  color: t.text,
                  border: `1px solid ${t.border}`,
                  borderRadius: t.radiusSm,
                  cursor: 'pointer',
                  width: 'fit-content',
                }}
              >
                {v} 토스트 띄우기
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>단독 렌더 (Controlled)</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            상태로 직접 마운트/언마운트를 제어합니다. <InlineCode>position</InlineCode>으로 진입 애니메이션을
            적용합니다.
          </p>
          <CodeBlock>{`const [visible, setVisible] = useState(true)

{visible && (
  <Toast
    variant="success"
    title="저장 완료"
    message="변경사항이 저장되었습니다."
    position="top-right"
    duration={3000}
    onClose={() => setVisible(false)}
  />
)}`}</CodeBlock>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>액션 버튼 (Snackbar 패턴)</p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>duration=0</InlineCode>으로 자동 닫힘을 비활성화하고 <InlineCode>action</InlineCode> prop으로
            버튼을 추가합니다.
          </p>
          <CodeBlock>{`<Toast
  variant="info"
  title="업데이트 가능"
  message="새 버전 v3.2.1이 있습니다."
  duration={0}
  action={<button onClick={handleUpdate}>업데이트</button>}
/>`}</CodeBlock>
          <div style={{ marginTop: 16, maxWidth: 420 }}>
            <Toast
              variant="info"
              title="업데이트 가능"
              message="새 버전 v3.2.1이 있습니다."
              duration={0}
              action={
                <button
                  style={{
                    padding: '4px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    background: vars.color.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: t.radiusSm,
                    cursor: 'pointer',
                  }}
                >
                  업데이트
                </button>
              }
            />
          </div>
        </Card>
      </Section>

      {/* Variant */}
      <Section gap={16}>
        <SectionTitle>Variant</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420 }}>
            {(['success', 'error', 'warning', 'info'] as const).map((v) => (
              <Toast
                key={v}
                variant={v}
                title={
                  v === 'success'
                    ? '저장 완료'
                    : v === 'error'
                      ? '오류 발생'
                      : v === 'warning'
                        ? '세션 만료 예정'
                        : '업데이트 가능'
                }
                message={
                  v === 'success'
                    ? '변경사항이 저장되었습니다.'
                    : v === 'error'
                      ? '요청을 처리하는 중 문제가 발생했습니다.'
                      : v === 'warning'
                        ? '5분 후 자동 로그아웃됩니다.'
                        : '새 버전 v3.2.1이 있습니다.'
                }
                duration={0}
              />
            ))}
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
