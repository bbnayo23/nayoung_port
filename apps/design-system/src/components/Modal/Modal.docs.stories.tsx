import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Modal } from './Modal'

const meta = {
  title: 'StyleGuide/Modal',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Design tokens ─────────────────────────────────────────────────────────────

const t = {
  bg: vars.color.background,
  surface: vars.color.surface,
  surfaceHover: vars.color.surfaceMuted,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textDisabled,
  primary: vars.color.brand[600],
  danger: vars.color.danger,
  success: vars.color.success,
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

// ── Layout helpers ────────────────────────────────────────────────────────────

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
      fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace",
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
      color: vars.color.danger,
      background: 'rgba(240,62,62,0.08)',
      borderRadius: 3,
      padding: '1px 5px',
      marginLeft: 4,
    }}
  >
    required
  </span>
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

// ── Trigger button helpers ────────────────────────────────────────────────────

const TriggerBtn = ({ children, onClick }: { children: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      padding: '6px 14px',
      fontSize: 13,
      fontWeight: 500,
      border: `1px solid ${t.primary}`,
      borderRadius: t.radiusSm,
      background: t.primary,
      color: '#fff',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

const OutlineBtn = ({ children, onClick }: { children: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      padding: '6px 14px',
      fontSize: 13,
      fontWeight: 500,
      border: `1px solid ${t.border}`,
      borderRadius: t.radiusSm,
      background: 'transparent',
      color: t.text,
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

// ── Demo components ───────────────────────────────────────────────────────────

const BasicModalDemo = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <TriggerBtn onClick={() => setOpen(true)}>모달 열기</TriggerBtn>
      <Modal open={open} onClose={() => setOpen(false)} size="md">
        <Modal.Header>모달 제목</Modal.Header>
        <Modal.Body>
          <p style={{ margin: 0, fontSize: 13, color: t.text, lineHeight: 1.7 }}>모달 본문 내용입니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <OutlineBtn onClick={() => setOpen(false)}>취소</OutlineBtn>
          <TriggerBtn onClick={() => setOpen(false)}>확인</TriggerBtn>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const NoOverlayCloseDemo = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <TriggerBtn onClick={() => setOpen(true)}>오버레이 클릭 비활성</TriggerBtn>
      <Modal open={open} onClose={() => setOpen(false)} closeOnOverlayClick={false}>
        <Modal.Header>오버레이 클릭 비활성</Modal.Header>
        <Modal.Body>
          <p style={{ margin: 0, fontSize: 13, color: t.text, lineHeight: 1.7 }}>
            오버레이를 클릭해도 닫히지 않습니다. X 버튼 또는 Escape 키로만 닫을 수 있습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <TriggerBtn onClick={() => setOpen(false)}>닫기</TriggerBtn>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const ConfirmModalDemo = () => {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleConfirm = () => {
    setOpen(false)
    setResult('삭제가 완료되었습니다.')
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '6px 14px',
            fontSize: 13,
            border: `1px solid ${t.danger}`,
            borderRadius: t.radiusSm,
            background: t.danger,
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          삭제
        </button>
        {result && <span style={{ fontSize: 12, color: t.success }}>{result}</span>}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} size="sm">
        <Modal.Header>삭제 확인</Modal.Header>
        <Modal.Body>
          <p style={{ margin: 0, fontSize: 13, color: t.text, lineHeight: 1.7 }}>
            선택한 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <OutlineBtn onClick={() => setOpen(false)}>취소</OutlineBtn>
          <button
            onClick={handleConfirm}
            style={{
              padding: '6px 14px',
              fontSize: 13,
              border: `1px solid ${t.danger}`,
              borderRadius: t.radiusSm,
              background: t.danger,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            삭제
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Modal</h1>
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
            COMPOUND
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 620 }}>
          중앙 정렬 다이얼로그 컴파운드 컴포넌트입니다. <InlineCode>Portal</InlineCode>로 DOM 최상위에 렌더링하며,{' '}
          <InlineCode>Modal.Header</InlineCode> · <InlineCode>Modal.Body</InlineCode> ·{' '}
          <InlineCode>Modal.Footer</InlineCode> 컴파운드 패턴으로 구성합니다.{' '}
          <InlineCode>open</InlineCode> · <InlineCode>onClose</InlineCode>로 완전 제어(controlled)합니다.
          열려 있는 동안 포커스를 다이얼로그 안에 가두고(<InlineCode>useFocusTrap</InlineCode>),
          Escape 키로도 닫을 수 있습니다.
        </p>
        <CodeBlock>{`import { Modal } from '@nayoung-port/design-system/components/Modal'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            MODAL
          </p>
          <PropsTable
            rows={[
              {
                name: 'open',
                type: 'boolean',
                required: true,
                desc: '모달 표시 여부. false이면 null을 반환해 DOM에서 제거됩니다.',
              },
              {
                name: 'onClose',
                type: '() => void',
                required: true,
                desc: '닫기 요청 콜백 — Escape 키 / 오버레이 클릭 / X 버튼에서 호출됩니다.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                required: true,
                desc: 'Modal.Header / Modal.Body / Modal.Footer 서브 컴포넌트를 합성합니다.',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '다이얼로그 최대 폭 — sm: 360px / md: 520px / lg: 720px.',
              },
              {
                name: 'closeOnOverlayClick',
                type: 'boolean',
                defaultVal: 'true',
                desc: '오버레이(딤드 영역) 클릭 시 onClose 호출 여부.',
              },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            서브 컴포넌트
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: t.surfaceHover }}>
                {['컴포넌트', '역할'].map((h) => (
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
                ['Modal.Header', '상단 제목 영역 — children을 타이틀로 렌더링하고 닫기(X) 버튼을 항상 제공합니다. aria-labelledby로 dialog와 연결됩니다.'],
                ['Modal.Body', '본문 스크롤 영역 — 주요 콘텐츠를 배치합니다. overflowY: auto로 긴 내용도 스크롤됩니다.'],
                ['Modal.Footer', '하단 액션 버튼 영역 — 상단 보더 + 우측 정렬. 확인/취소 등 버튼을 배치합니다.'],
              ].map(([name, desc]) => (
                <tr key={name} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: '10px 12px' }}>
                    <InlineCode>{name}</InlineCode>
                  </td>
                  <td style={{ padding: '10px 12px', color: t.textSecondary }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            서브 컴포넌트 Props (공통)
          </p>
          <PropsTable
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                required: true,
                desc: '렌더링할 자식 요소.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '추가 CSS 클래스 — HTMLAttributes<HTMLDivElement>를 extends합니다.',
              },
            ]}
          />
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 다이얼로그 모달"
            desc="useState로 open 상태를 관리합니다. Header · Body · Footer를 조합해 구성합니다."
            code={`const [open, setOpen] = useState(false)

<button onClick={() => setOpen(true)}>모달 열기</button>
<Modal open={open} onClose={() => setOpen(false)} size="md">
  <Modal.Header>모달 제목</Modal.Header>
  <Modal.Body>본문 내용입니다.</Modal.Body>
  <Modal.Footer>
    <button onClick={() => setOpen(false)}>취소</button>
    <button onClick={() => setOpen(false)}>확인</button>
  </Modal.Footer>
</Modal>`}
          >
            <BasicModalDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="오버레이 클릭 비활성화"
            desc="closeOnOverlayClick={false}로 오버레이 클릭을 무시합니다. 폼 입력 도중 실수로 닫히지 않아야 할 때 사용합니다."
            code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  closeOnOverlayClick={false}
>
  <Modal.Header>오버레이 클릭 비활성</Modal.Header>
  <Modal.Body>
    오버레이를 클릭해도 닫히지 않습니다.
    X 버튼 또는 Escape 키로만 닫을 수 있습니다.
  </Modal.Body>
  <Modal.Footer>
    <button onClick={() => setOpen(false)}>닫기</button>
  </Modal.Footer>
</Modal>`}
          >
            <NoOverlayCloseDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="확인 다이얼로그 (Confirm)"
            desc="size='sm'으로 작은 모달을 만들어 확인/취소 패턴을 구현합니다. 위험한 동작은 버튼 색상으로 명확히 표시합니다."
            code={`<Modal open={open} onClose={() => setOpen(false)} size="sm">
  <Modal.Header>삭제 확인</Modal.Header>
  <Modal.Body>
    선택한 항목을 삭제하시겠습니까?
    이 작업은 되돌릴 수 없습니다.
  </Modal.Body>
  <Modal.Footer>
    <button onClick={onClose}>취소</button>
    <button
      style={{ background: vars.color.danger }}
      onClick={handleDelete}
    >
      삭제
    </button>
  </Modal.Footer>
</Modal>`}
          >
            <ConfirmModalDemo />
          </Pattern>
        </Card>
      </Section>

      {/* Size showcase */}
      <Section gap={16}>
        <SectionTitle>Size</SectionTitle>
        <Card>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['sm', 'md', 'lg'] as const).map((s) => {
              const SizeDemo = () => {
                const [open, setOpen] = useState(false)
                return (
                  <>
                    <OutlineBtn onClick={() => setOpen(true)}>{`size="${s}"`}</OutlineBtn>
                    <Modal open={open} onClose={() => setOpen(false)} size={s}>
                      <Modal.Header>{`Size: ${s}`}</Modal.Header>
                      <Modal.Body>
                        <p style={{ margin: 0, fontSize: 13, color: t.text }}>{`${s} 크기의 모달입니다.`}</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <TriggerBtn onClick={() => setOpen(false)}>닫기</TriggerBtn>
                      </Modal.Footer>
                    </Modal>
                  </>
                )
              }
              return <SizeDemo key={s} />
            })}
          </div>
        </Card>
      </Section>

      {/* Notes */}
      <Section gap={16}>
        <SectionTitle>주의사항</SectionTitle>
        <Card style={{ background: t.surfaceHover }}>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: t.textSecondary, lineHeight: 2 }}>
            <li>
              Modal은 <InlineCode>Portal</InlineCode> 유틸리티로 렌더링되므로 부모 컴포넌트의 CSS transform/overflow 영향을
              받지 않습니다.
            </li>
            <li>
              열려 있는 동안 <InlineCode>document.body</InlineCode>의 스크롤이 잠기고(<InlineCode>overflow: hidden</InlineCode>),
              닫히면 이전 값으로 복원됩니다.
            </li>
            <li>
              <InlineCode>Modal.Header</InlineCode>는 항상 닫기(X) 버튼을 포함합니다. 버튼은{' '}
              <InlineCode>aria-label="닫기"</InlineCode>를 가지며 <InlineCode>onClose</InlineCode>를 호출합니다.
            </li>
            <li>
              <InlineCode>useFocusTrap</InlineCode>으로 열려 있는 동안 포커스가 다이얼로그 내부에 갇히며,
              닫히면 직전 포커스 요소로 복귀합니다.
            </li>
            <li>
              <InlineCode>role="dialog"</InlineCode> + <InlineCode>aria-modal="true"</InlineCode> +{' '}
              <InlineCode>aria-labelledby</InlineCode>가 <InlineCode>Modal.Header</InlineCode>의 타이틀 요소와
              자동으로 연결되어 스크린 리더를 지원합니다.
            </li>
          </ul>
        </Card>
      </Section>
    </DocPage>
  ),
}
