import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { ToastProvider, useToast } from './Toast'
import type { ToastVariant, ToastPosition } from './Toast'

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
  surfaceHover: vars.color.surfaceMuted,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textDisabled,
  primary: vars.color.brand[600],
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

// ── Demo helpers ──────────────────────────────────────────────────────────────

type VariantMeta = {
  variant: ToastVariant
  title: string
  description: string
}

const VARIANTS: VariantMeta[] = [
  { variant: 'success', title: '저장 완료', description: '변경사항이 저장되었습니다.' },
  { variant: 'danger', title: '오류 발생', description: '요청을 처리하는 중 문제가 발생했습니다.' },
  { variant: 'warning', title: '세션 만료 예정', description: '5분 후 자동 로그아웃됩니다.' },
  { variant: 'info', title: '업데이트 가능', description: '새 버전 v3.2.1이 있습니다.' },
]

function VariantButtons() {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
      {VARIANTS.map(({ variant, title, description }) => (
        <button
          key={variant}
          onClick={() => toast({ variant, title, description })}
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
          {variant} 토스트 띄우기
        </button>
      ))}
    </div>
  )
}

function PositionDemo({ position }: { position: ToastPosition }) {
  const { toast } = useToast()
  return (
    <button
      onClick={() =>
        toast({ variant: 'info', title: `position: ${position}`, description: '위치 확인용 토스트입니다.' })
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
      }}
    >
      {position}
    </button>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <ToastProvider position="top-right" max={5}>
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
                background: 'rgba(113,135,255,0.1)',
                borderRadius: 4,
                padding: '2px 8px',
                letterSpacing: 0.5,
              }}
            >
              PROVIDER + HOOK
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
            4가지 <InlineCode>variant</InlineCode>를 지원하는 알림 컴포넌트입니다.{' '}
            <InlineCode>ToastProvider</InlineCode>를 앱 루트에 배치하고{' '}
            <InlineCode>useToast()</InlineCode> 훅으로 토스트를 띄웁니다. 토스트는 자동 스태킹·타이머·접근성을 모두
            내장합니다.
          </p>
          <CodeBlock>{`import { ToastProvider, useToast } from '@ds/components/Toast'
import type { ToastVariant, ToastPosition } from '@ds/components/Toast'`}</CodeBlock>
        </div>

        {/* API */}
        <Section gap={24}>
          <SectionTitle>API</SectionTitle>

          <Card>
            <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
              TOASTPROVIDER
            </p>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
              앱 루트에 한 번 배치합니다. 내부적으로 <InlineCode>{'<Portal>'}</InlineCode>을 사용해 viewport 고정
              레이어에 토스트를 렌더링합니다.
            </p>
            <PropsTable
              rows={[
                {
                  name: 'children',
                  type: 'ReactNode',
                  desc: '앱 트리 전체를 감쌉니다.',
                },
                {
                  name: 'position',
                  type: 'ToastPosition',
                  defaultVal: "'top-right'",
                  desc: "viewport 코너 위치. 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
                },
                {
                  name: 'max',
                  type: 'number',
                  defaultVal: '5',
                  desc: '동시 표시 최대 개수. 초과 시 가장 오래된 토스트부터 제거합니다.',
                },
              ]}
            />
          </Card>

          <Card>
            <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
              USETOAST()
            </p>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
              <InlineCode>ToastProvider</InlineCode> 내부에서만 호출할 수 있습니다.{' '}
              <InlineCode>{'{ toast, dismiss }'}</InlineCode>를 반환합니다.
            </p>
            <PropsTable
              rows={[
                {
                  name: 'toast(opts)',
                  type: '(opts: ToastOptions) => string',
                  desc: '토스트를 띄우고 고유 id를 반환합니다.',
                },
                {
                  name: 'dismiss(id)',
                  type: '(id: string) => void',
                  desc: 'id로 특정 토스트를 즉시 제거합니다.',
                },
              ]}
            />
          </Card>

          <Card>
            <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
              TOASTOPTIONS
            </p>
            <PropsTable
              rows={[
                {
                  name: 'title',
                  type: 'string',
                  desc: '토스트 제목 (필수)',
                },
                {
                  name: 'description',
                  type: 'string',
                  desc: '보조 설명 텍스트 (선택)',
                },
                {
                  name: 'variant',
                  type: "'info' | 'success' | 'warning' | 'danger'",
                  defaultVal: "'info'",
                  desc: '아이콘과 좌측 accent 보더 색상을 결정합니다.',
                },
                {
                  name: 'duration',
                  type: 'number',
                  defaultVal: '4000',
                  desc: '자동 닫힘 시간(ms). 0이면 자동으로 닫히지 않습니다.',
                },
              ]}
            />
          </Card>
        </Section>

        {/* Patterns */}
        <Section gap={24}>
          <SectionTitle>사용 패턴</SectionTitle>

          <Card>
            <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>기본 사용법 (권장)</p>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
              앱 루트에 <InlineCode>{'<ToastProvider />'}</InlineCode>를 배치하고, 호출부에서{' '}
              <InlineCode>useToast()</InlineCode>를 사용합니다.
            </p>
            <CodeBlock>{`// 앱 루트
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// 호출부 (ToastProvider 내부 어디서나)
function MyComponent() {
  const { toast } = useToast()

  return (
    <button onClick={() =>
      toast({ variant: 'success', title: '저장 완료', description: '변경사항이 저장되었습니다.' })
    }>
      저장
    </button>
  )
}`}</CodeBlock>
            <div style={{ marginTop: 16 }}>
              <VariantButtons />
            </div>
          </Card>

          <Card>
            <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>수동 닫기 (dismiss)</p>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
              <InlineCode>toast()</InlineCode>가 반환하는 <InlineCode>id</InlineCode>를 저장하고{' '}
              <InlineCode>dismiss(id)</InlineCode>로 특정 토스트를 즉시 제거할 수 있습니다.
            </p>
            <CodeBlock>{`const { toast, dismiss } = useToast()

const handleAction = async () => {
  const id = toast({
    variant: 'warning',
    title: '처리 중...',
    duration: 0, // 자동 닫힘 비활성화
  })
  await doSomething()
  dismiss(id)
  toast({ variant: 'success', title: '완료' })
}`}</CodeBlock>
          </Card>

          <Card>
            <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>지속 토스트 (duration: 0)</p>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
              <InlineCode>duration={'{0}'}</InlineCode>으로 자동 닫힘을 비활성화합니다. 사용자가 직접 × 버튼을 눌러야
              닫힙니다.
            </p>
            <CodeBlock>{`toast({
  variant: 'info',
  title: '업데이트 가능',
  description: '새 버전 v3.2.1이 있습니다.',
  duration: 0,
})`}</CodeBlock>
          </Card>
        </Section>

        {/* Variant */}
        <Section gap={16}>
          <SectionTitle>Variant</SectionTitle>
          <p style={{ margin: 0, fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            아래 버튼을 클릭하면 각 <InlineCode>variant</InlineCode>의 토스트가 실제로 표시됩니다.
          </p>
          <Card>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {VARIANTS.map(({ variant, title, description }) => (
                <VariantButton key={variant} variant={variant} title={title} description={description} />
              ))}
            </div>
          </Card>
        </Section>

        {/* Position */}
        <Section gap={16}>
          <SectionTitle>Position</SectionTitle>
          <p style={{ margin: 0, fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>ToastProvider</InlineCode>의 <InlineCode>position</InlineCode> prop으로 viewport 코너를
            지정합니다. 아래 버튼을 클릭하면 각 위치에 대한 토스트를 확인할 수 있습니다.
          </p>
          <Card>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as ToastPosition[]).map((pos) => (
                <PositionDemo key={pos} position={pos} />
              ))}
            </div>
          </Card>
          <CodeBlock>{`// top-right (기본값)
<ToastProvider position="top-right">

// top-left
<ToastProvider position="top-left">

// bottom-right
<ToastProvider position="bottom-right">

// bottom-left
<ToastProvider position="bottom-left">`}</CodeBlock>
        </Section>

        {/* Max */}
        <Section gap={16}>
          <SectionTitle>Max (동시 표시 제한)</SectionTitle>
          <p style={{ margin: 0, fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>max</InlineCode> prop으로 동시 표시 최대 개수를 제한합니다. 초과 시 가장 오래된 토스트부터
            자동 제거됩니다. 기본값은 <InlineCode>5</InlineCode>입니다.
          </p>
          <CodeBlock>{`<ToastProvider position="top-right" max={3}>
  <App />
</ToastProvider>`}</CodeBlock>
        </Section>

        {/* Accessibility */}
        <Section gap={16}>
          <SectionTitle>접근성 (a11y)</SectionTitle>
          <Card>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
              토스트 카드는 <InlineCode>variant</InlineCode>에 따라 ARIA 속성이 자동 적용됩니다.
            </p>
            <PropsTable
              rows={[
                {
                  name: "variant: 'danger'",
                  type: 'role="alert" aria-live="assertive"',
                  desc: '즉각적인 스크린리더 알림. 긴급 오류에 사용합니다.',
                },
                {
                  name: "variant: 기타",
                  type: 'role="status" aria-live="polite"',
                  desc: '현재 작업이 끝난 후 읽어줍니다. info·success·warning에 적용됩니다.',
                },
              ]}
            />
          </Card>
        </Section>
      </DocPage>
    </ToastProvider>
  ),
}

// ── Isolated variant button (needs its own useToast call) ─────────────────────

function VariantButton({ variant, title, description }: VariantMeta) {
  const { toast } = useToast()
  return (
    <button
      onClick={() => toast({ variant, title, description, duration: 0 })}
      style={{
        padding: '6px 16px',
        fontSize: 12,
        fontWeight: 600,
        background: t.surface,
        color: t.text,
        border: `1px solid ${t.border}`,
        borderRadius: t.radiusSm,
        cursor: 'pointer',
      }}
    >
      {variant}
    </button>
  )
}
