import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import {
  XdrStatusInfoIcon,
  XdrStatusNormalIcon,
  XdrStatusCautionIcon,
  XdrStatusErrorIcon,
  XdrStatusNodataIcon,
} from '@port/icon-library'
import { Button } from '../../components/Button'
import AlertModal from '../../components/AlertModal'
import type { AlertType } from '../../components/AlertModal'

const meta = {
  title: 'StyleGuide/AlertModal',
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
      whiteSpace: 'normal',
      wordBreak: 'break-word',
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

// ── Props table ───────────────────────────────────────────────────────────────

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

// ── Demo components ───────────────────────────────────────────────────────────

const ICON_MAP: Record<AlertType, React.ReactElement> = {
  info: <XdrStatusInfoIcon />,
  success: <XdrStatusNormalIcon />,
  warning: <XdrStatusCautionIcon />,
  error: <XdrStatusErrorIcon />,
  confirm: <XdrStatusNodataIcon />,
}

const BasicDemo = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button onClick={() => setOpen(true)}>AlertModal 열기</Button>
      <AlertModal open={open} onClose={() => setOpen(false)}>
        <AlertModal.Header title="알림" type="info" icon={ICON_MAP.info} />
        <AlertModal.Body description="이것은 알림 메시지입니다. 확인을 누르면 닫힙니다." />
        <AlertModal.Footer onPrimary={() => setOpen(false)} />
      </AlertModal>
    </div>
  )
}

const CancelDemo = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button onClick={() => setOpen(true)}>삭제 확인 열기</Button>
      <AlertModal open={open} onClose={() => setOpen(false)}>
        <AlertModal.Header title="삭제하시겠습니까?" type="confirm" icon={ICON_MAP.confirm} />
        <AlertModal.Body description="이 작업은 되돌릴 수 없습니다." />
        <AlertModal.Footer
          showCancelButton
          primaryLabel="삭제"
          cancelLabel="취소"
          confirmVariant="error"
          onPrimary={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </AlertModal>
    </div>
  )
}

// ── Pattern block (code + live demo) ─────────────────────────────────────────

const Pattern = ({
  title,
  desc,
  code,
  children,
}: {
  title: string
  desc: string
  code: string
  children: ReactNode
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div>
      <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: t.text }}>{title}</p>
      <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>{desc}</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
      <CodeBlock>{code}</CodeBlock>
      <div>{children}</div>
    </div>
  </div>
)

// ── Type grid demo ────────────────────────────────────────────────────────────

const TypeGridDemo = () => {
  const [activeType, setActiveType] = useState<AlertType | null>(null)
  const types: AlertType[] = ['info', 'success', 'warning', 'error', 'confirm']
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            style={{
              padding: '8px 4px',
              borderRadius: 6,
              border: `1px solid ${t.border}`,
              background: t.surfaceHover,
              color: t.text,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            {type}
          </button>
        ))}
      </div>
      {activeType !== null && (
        <AlertModal open onClose={() => setActiveType(null)}>
          <AlertModal.Header title={`${activeType} 알림`} type={activeType} icon={ICON_MAP[activeType]} />
          <AlertModal.Body description={`${activeType} 유형의 알림입니다.`} />
          <AlertModal.Footer
            confirmVariant={activeType}
            onPrimary={() => setActiveType(null)}
            onCancel={() => setActiveType(null)}
            showCancelButton
          />
        </AlertModal>
      )}
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
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>AlertModal</h1>
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
            COMPOUND
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          사용자 확인이 필요한 알림, 경고, 확인 다이얼로그를 표시하는 컴포넌트입니다.{' '}
          <InlineCode>AlertModal.Header</InlineCode> · <InlineCode>AlertModal.Body</InlineCode> ·{' '}
          <InlineCode>AlertModal.Footer</InlineCode> 컴파운드 패턴으로 구성되며, <InlineCode>createPortal</InlineCode>을
          사용해 DOM 트리 밖에 렌더링됩니다.
        </p>
        <CodeBlock>{`import AlertModal from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            ALERTMODAL
          </p>
          <PropsTable
            rows={[
              {
                name: 'open',
                type: 'boolean',
                defaultVal: 'false',
                desc: '모달 열림/닫힘 상태. 호출자가 직접 제어합니다 (controlled).',
              },
              {
                name: 'onClose',
                type: '() => void',
                desc: '배경(dimmed) 클릭 또는 닫기 트리거 시 호출되는 콜백',
              },
              {
                name: 'closeOnOverlay',
                type: 'boolean',
                defaultVal: 'true',
                desc: '배경(dimmed) 클릭으로 모달을 닫을지 여부',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: 'AlertModal.Header · Body · Footer 서브컴포넌트',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'sm'",
                desc: '모달 크기',
              },
              {
                name: 'portalTarget',
                type: 'Element | DocumentFragment | () => Element | DocumentFragment',
                desc: 'portal 렌더링 대상. 기본값은 document.body',
              },
              { name: 'className', type: 'string', desc: '모달 래퍼 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            ALERTMODAL.HEADER
          </p>
          <PropsTable
            rows={[
              {
                name: 'title',
                type: 'string',
                desc: '헤더에 표시할 제목 텍스트',
              },
              {
                name: 'icon',
                type: 'ReactNode',
                desc: '헤더 상단에 표시할 아이콘. @port/icon-library의 Xdr* 아이콘을 권장합니다.',
              },
              {
                name: 'type',
                type: "'info' | 'success' | 'warning' | 'error' | 'confirm'",
                defaultVal: "'info'",
                desc: '아이콘 색상 변형. 각 타입에 맞는 색상이 자동 적용됩니다.',
              },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            ALERTMODAL.BODY
          </p>
          <PropsTable
            rows={[
              {
                name: 'description',
                type: 'ReactNode',
                desc: '본문 메시지. p 태그로 감싸져 렌더링됩니다.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: '커스텀 본문 콘텐츠. description과 함께 사용 가능합니다.',
              },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            ALERTMODAL.FOOTER
          </p>
          <PropsTable
            rows={[
              {
                name: 'showCancelButton',
                type: 'boolean',
                defaultVal: 'false',
                desc: '취소 버튼 표시 여부',
              },
              {
                name: 'primaryLabel',
                type: 'string',
                defaultVal: "'OK'",
                desc: '확인(주요) 버튼 텍스트',
              },
              {
                name: 'secondaryLabel',
                type: 'string',
                desc: '보조 버튼 텍스트. 제공 시 취소 버튼과 확인 버튼 사이에 렌더링됩니다.',
              },
              {
                name: 'cancelLabel',
                type: 'string',
                defaultVal: "'Cancel'",
                desc: '취소 버튼 텍스트',
              },
              {
                name: 'confirmVariant',
                type: "'info' | 'success' | 'warning' | 'error' | 'confirm'",
                defaultVal: "'info'",
                desc: '확인 버튼 색상 변형. error 타입이면 danger 버튼으로 렌더링됩니다.',
              },
              {
                name: 'onPrimary',
                type: '() => void',
                desc: '확인(주요) 버튼 클릭 콜백',
              },
              {
                name: 'onSecondary',
                type: '() => void',
                desc: '보조 버튼 클릭 콜백',
              },
              {
                name: 'onCancel',
                type: '() => void',
                desc: '취소 버튼 클릭 콜백',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: '커스텀 버튼 영역. 제공 시 기본 버튼을 대체합니다.',
              },
            ]}
          />
        </Card>
      </Section>

      {/* Usage patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 사용법"
            desc="open state를 관리하고 onClose · onPrimary 콜백으로 제어합니다."
            code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>열기</Button>
<AlertModal open={open} onClose={() => setOpen(false)}>
  <AlertModal.Header
    title="알림"
    type="info"
    icon={<XdrStatusInfoIcon />}
  />
  <AlertModal.Body
    description="이것은 알림 메시지입니다."
  />
  <AlertModal.Footer
    onPrimary={() => setOpen(false)}
  />
</AlertModal>`}
          >
            <BasicDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="취소 버튼 패턴"
            desc="showCancelButton으로 취소 버튼을 표시합니다. 파괴적 작업 확인에 적합합니다."
            code={`<AlertModal open={open} onClose={() => setOpen(false)}>
  <AlertModal.Header
    title="삭제하시겠습니까?"
    type="confirm"
    icon={<XdrStatusNodataIcon />}
  />
  <AlertModal.Body
    description="이 작업은 되돌릴 수 없습니다."
  />
  <AlertModal.Footer
    showCancelButton
    primaryLabel="삭제"
    cancelLabel="취소"
    confirmVariant="error"
    onPrimary={() => setOpen(false)}
    onCancel={() => setOpen(false)}
  />
</AlertModal>`}
          >
            <CancelDemo />
          </Pattern>
        </Card>
      </Section>

      {/* Types */}
      <Section gap={16}>
        <SectionTitle>타입</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
          버튼을 클릭하면 해당 타입의 AlertModal을 확인할 수 있습니다.
        </p>
        <Card>
          <TypeGridDemo />
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {(['info', 'success', 'warning', 'error', 'confirm'] as AlertType[]).map((type) => (
            <Card key={type}>
              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: 11,
                  color: t.textMuted,
                  fontFamily: 'monospace',
                  textAlign: 'center',
                }}
              >
                {`type="${type}"`}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: t.textSecondary,
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                {type === 'info' && '일반 정보 알림'}
                {type === 'success' && '성공 완료 알림'}
                {type === 'warning' && '주의 경고 알림'}
                {type === 'error' && '오류 위험 알림'}
                {type === 'confirm' && '사용자 확인 요청'}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </DocPage>
  ),
}
