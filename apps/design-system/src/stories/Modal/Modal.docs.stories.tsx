import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Modal from '../../components/Modal'

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

// ── Trigger button helper ─────────────────────────────────────────────────────

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
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <OutlineBtn onClick={() => setOpen(false)}>취소</OutlineBtn>
            <TriggerBtn onClick={() => setOpen(false)}>확인</TriggerBtn>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const SidePanelDemo = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <TriggerBtn onClick={() => setOpen(true)}>우측 패널 열기</TriggerBtn>
      <Modal open={open} onClose={() => setOpen(false)} type="sidepanel" position="right" showCloseButton>
        <Modal.Header>사이드 패널</Modal.Header>
        <Modal.Body>
          <p style={{ margin: 0, fontSize: 13, color: t.text, lineHeight: 1.7 }}>
            화면 우측에서 슬라이드되는 패널입니다. 상세 정보, 설정, 필터 등에 활용합니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <TriggerBtn onClick={() => setOpen(false)}>닫기</TriggerBtn>
          </div>
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
            border: `1px solid ${vars.color.error}`,
            borderRadius: t.radiusSm,
            background: vars.color.error,
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          삭제
        </button>
        {result && <span style={{ fontSize: 12, color: vars.color.success }}>{result}</span>}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} size="sm">
        <Modal.Header>삭제 확인</Modal.Header>
        <Modal.Body>
          <p style={{ margin: 0, fontSize: 13, color: t.text, lineHeight: 1.7 }}>
            선택한 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <OutlineBtn onClick={() => setOpen(false)}>취소</OutlineBtn>
            <button
              onClick={handleConfirm}
              style={{
                padding: '6px 14px',
                fontSize: 13,
                border: `1px solid ${vars.color.error}`,
                borderRadius: t.radiusSm,
                background: vars.color.error,
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              삭제
            </button>
          </div>
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
              background: 'rgba(0,183,153,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            COMPOUND
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 620 }}>
          다이얼로그 모달과 사이드 패널을 지원하는 오버레이 컴포넌트입니다. <InlineCode>createPortal</InlineCode>로 DOM
          최상위에 렌더링하며, <InlineCode>Modal.Header</InlineCode> · <InlineCode>Modal.Body</InlineCode> ·{' '}
          <InlineCode>Modal.Footer</InlineCode> 컴파운드 패턴으로 구성합니다.
          <InlineCode>open</InlineCode> · <InlineCode>onClose</InlineCode>로 완전 제어(controlled)합니다.
        </p>
        <CodeBlock>{`import Modal from "@port/design-system"`}</CodeBlock>
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
                desc: '모달 표시 여부. false이고 isClosing도 false이면 null 반환',
              },
              {
                name: 'onClose',
                type: '() => void',
                required: true,
                desc: '닫기 콜백 — 딤드 클릭, 사이드 패널 닫기 버튼 클릭 시 호출',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: "모달 너비 크기 (type='modal'에만 영향)",
              },
              {
                name: 'type',
                type: "'modal' | 'sidepanel'",
                defaultVal: "'modal'",
                desc: '표시 형태 — modal은 중앙, sidepanel은 좌/우 슬라이드',
              },
              { name: 'position', type: "'left' | 'right'", desc: "사이드 패널 위치 (type='sidepanel'일 때만 적용)" },
              {
                name: 'showDimmed',
                type: 'boolean',
                defaultVal: 'false',
                desc: '사이드 패널에서도 딤드 오버레이를 표시할지 여부. modal 타입은 항상 표시',
              },
              {
                name: 'showCloseButton',
                type: 'boolean',
                defaultVal: 'true',
                desc: '사이드 패널 우상단 × 버튼 표시 여부',
              },
              {
                name: 'isClosing',
                type: 'boolean',
                defaultVal: 'false',
                desc: '닫힘 애니메이션 트리거. true이면 open=false여도 마운트 유지',
              },
              {
                name: 'portalTarget',
                type: 'Element | (() => Element)',
                defaultVal: 'document.body',
                desc: 'Portal 렌더 대상. [data-solution] 요소가 있으면 그것이 기본값',
              },
              { name: 'className', type: 'string', desc: '모달 래퍼 div에 추가할 CSS 클래스' },
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
                ['Modal.Header', '모달 상단 제목 영역 — 닫기 버튼이 없는 경우 제목만 표시'],
                ['Modal.Body', '모달 본문 스크롤 영역 — 주요 콘텐츠 배치'],
                ['Modal.Footer', '모달 하단 액션 버튼 영역 — 확인/취소 등 버튼 배치'],
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
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 다이얼로그 모달"
            desc="useState로 open 상태를 관리합니다. Header · Body · Footer를 조합해 구성합니다."
            code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>모달 열기</Button>
<Modal open={open} onClose={() => setOpen(false)} size="md">
  <Modal.Header>모달 제목</Modal.Header>
  <Modal.Body>본문 내용입니다.</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>
      취소
    </Button>
    <Button onClick={() => setOpen(false)}>확인</Button>
  </Modal.Footer>
</Modal>`}
          >
            <BasicModalDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="사이드 패널"
            desc="type='sidepanel'과 position으로 좌/우측 슬라이드 패널을 표시합니다. showCloseButton으로 닫기 버튼을 추가합니다."
            code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  type="sidepanel"
  position="right"
  showCloseButton
>
  <Modal.Header>사이드 패널</Modal.Header>
  <Modal.Body>패널 내용입니다.</Modal.Body>
  <Modal.Footer>
    <Button onClick={() => setOpen(false)}>닫기</Button>
  </Modal.Footer>
</Modal>`}
          >
            <SidePanelDemo />
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
    <Button variant="ghost" onClick={onClose}>취소</Button>
    <Button tone="danger" onClick={handleDelete}>삭제</Button>
  </Modal.Footer>
</Modal>`}
          >
            <ConfirmModalDemo />
          </Pattern>
        </Card>
      </Section>

      {/* Size showcase */}
      <Section gap={16}>
        <SectionTitle>Size (type="modal")</SectionTitle>
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
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <TriggerBtn onClick={() => setOpen(false)}>닫기</TriggerBtn>
                        </div>
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
              Modal은 <InlineCode>createPortal</InlineCode>로 렌더링되므로 부모 컴포넌트의 CSS transform/overflow 영향을
              받지 않습니다.
            </li>
            <li>
              <InlineCode>portalTarget</InlineCode> 미지정 시 <InlineCode>[data-solution]</InlineCode> 요소를 먼저
              탐색하고, 없으면 <InlineCode>document.body</InlineCode>에 렌더링합니다.
            </li>
            <li>
              닫힘 애니메이션이 필요하면 <InlineCode>isClosing</InlineCode>을 true로 설정한 뒤 애니메이션 종료 후{' '}
              <InlineCode>open</InlineCode>을 false로 변경합니다.
            </li>
            <li>
              <InlineCode>type="modal"</InlineCode>에서는 딤드 오버레이가 항상 표시됩니다.{' '}
              <InlineCode>type="sidepanel"</InlineCode>에서는 <InlineCode>showDimmed=true</InlineCode>로 명시해야
              표시됩니다.
            </li>
          </ul>
        </Card>
      </Section>
    </DocPage>
  ),
}
