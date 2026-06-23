import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { ConfirmModal } from './ConfirmModal'

const meta = {
  title: 'StyleGuide/ConfirmModal',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

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
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

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

const DocCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
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
      fontFamily: "'Fira Code','Consolas',monospace",
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
      wordBreak: 'break-word' as const,
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

const TriggerButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: '8px 16px',
      fontSize: 13,
      fontWeight: 600,
      color: t.text,
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: t.radiusSm,
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

const DocumentationView = () => {
  const [basicOpen, setBasicOpen] = useState(false)
  const [titleOpen, setTitleOpen] = useState(false)
  const [dangerOpen, setDangerOpen] = useState(false)
  const [labelOpen, setLabelOpen] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>ConfirmModal</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          확인 / 취소 두 개의 버튼만 가지는 단순 확인 모달입니다. Portal 로 렌더되어 화면 전체를 덮는 오버레이 위에
          표시되며, 열렸을 때 포커스 트랩(useFocusTrap)이 동작하고 Esc 또는 오버레이 동작으로 onCancel 이 호출됩니다.
          삭제·되돌릴 수 없는 작업 등 위험한 동작은 <InlineCode>danger</InlineCode> 로 확인 버튼을 강조합니다.
        </p>
        <CodeBlock>{`import { ConfirmModal } from '@port/design-system/components/ConfirmModal'
import type { ConfirmModalProps } from '@port/design-system/components/ConfirmModal'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — ConfirmModal</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'isOpen',
                type: 'boolean',
                desc: '모달 열림 여부. false 이면 아무것도 렌더하지 않는다(null 반환).',
              },
              {
                name: 'message',
                type: 'string',
                desc: '본문 메시지. 필수 prop 이다.',
              },
              {
                name: 'title',
                type: 'string',
                desc: '상단 제목. 생략하면 제목 영역 자체가 렌더되지 않는다.',
              },
              {
                name: 'confirmLabel',
                type: 'string',
                defaultVal: "'확인'",
                desc: '확인 버튼 라벨.',
              },
              {
                name: 'cancelLabel',
                type: 'string',
                defaultVal: "'취소'",
                desc: '취소 버튼 라벨.',
              },
              {
                name: 'danger',
                type: 'boolean',
                defaultVal: 'false',
                desc: "true 면 확인 버튼을 danger(빨강) 스타일로, false 면 primary 스타일로 표시한다.",
              },
              {
                name: 'onConfirm',
                type: '() => void',
                desc: '확인 버튼 클릭 시 호출. 모달을 닫는 책임은 호출 측에 있다.',
              },
              {
                name: 'onCancel',
                type: '() => void',
                desc: '취소 버튼 클릭 · 포커스 트랩 종료(Esc 등) 시 호출. 모달을 닫는 책임은 호출 측에 있다.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>기본 사용 (Basic)</SectionTitle>
        <CodeBlock>{`const [isOpen, setIsOpen] = useState(false)

<ConfirmModal
  isOpen={isOpen}
  message="정말 삭제하시겠습니까?"
  onConfirm={() => setIsOpen(false)}
  onCancel={() => setIsOpen(false)}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <TriggerButton onClick={() => setBasicOpen(true)}>모달 열기</TriggerButton>
            <span style={{ fontSize: 12, color: t.textMuted }}>title 없이 message 만 — 제목 영역 미렌더</span>
          </div>
          <ConfirmModal
            isOpen={basicOpen}
            message="정말 삭제하시겠습니까?"
            onConfirm={() => setBasicOpen(false)}
            onCancel={() => setBasicOpen(false)}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>제목 포함 (title)</SectionTitle>
        <CodeBlock>{`<ConfirmModal
  isOpen={isOpen}
  title="삭제 확인"
  message="선택한 항목을 삭제하시겠습니까?"
  onConfirm={...}
  onCancel={...}
/>`}</CodeBlock>
        <DocCard>
          <TriggerButton onClick={() => setTitleOpen(true)}>제목 있는 모달 열기</TriggerButton>
          <ConfirmModal
            isOpen={titleOpen}
            title="삭제 확인"
            message="선택한 항목을 삭제하시겠습니까?"
            onConfirm={() => setTitleOpen(false)}
            onCancel={() => setTitleOpen(false)}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>위험 작업 (danger)</SectionTitle>
        <CodeBlock>{`<ConfirmModal
  isOpen={isOpen}
  title="경고"
  message="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"
  danger
  onConfirm={...}
  onCancel={...}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <TriggerButton onClick={() => setDangerOpen(true)}>위험 모달 열기</TriggerButton>
            <span style={{ fontSize: 12, color: t.textMuted }}>확인 버튼이 danger 스타일로 강조된다</span>
          </div>
          <ConfirmModal
            isOpen={dangerOpen}
            title="경고"
            message="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"
            danger
            onConfirm={() => setDangerOpen(false)}
            onCancel={() => setDangerOpen(false)}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>커스텀 라벨 (confirmLabel / cancelLabel)</SectionTitle>
        <CodeBlock>{`<ConfirmModal
  isOpen={isOpen}
  title="규칙 적용"
  message="현재 상관분석 규칙을 적용하시겠습니까?"
  confirmLabel="적용"
  cancelLabel="나중에"
  onConfirm={...}
  onCancel={...}
/>`}</CodeBlock>
        <DocCard>
          <TriggerButton onClick={() => setLabelOpen(true)}>커스텀 라벨 모달 열기</TriggerButton>
          <ConfirmModal
            isOpen={labelOpen}
            title="규칙 적용"
            message="현재 상관분석 규칙을 적용하시겠습니까?"
            confirmLabel="적용"
            cancelLabel="나중에"
            onConfirm={() => setLabelOpen(false)}
            onCancel={() => setLabelOpen(false)}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>onConfirm / onCancel 동작</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          모달을 닫는 책임은 호출 측에 있습니다. 아래 예시는 두 콜백에서 각각 결과를 기록하고 모달을 닫습니다.
        </p>
        <DocCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <TriggerButton
              onClick={() => {
                setResult(null)
                setBasicOpen(true)
              }}
            >
              결과 확인 모달 열기
            </TriggerButton>
            {result && (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: result === '확인됨' ? t.primary : t.danger,
                }}
              >
                {result}
              </span>
            )}
          </div>
          <ConfirmModal
            isOpen={basicOpen}
            title="콜백 데모"
            message="확인 또는 취소를 눌러보세요."
            onConfirm={() => {
              setResult('확인됨')
              setBasicOpen(false)
            }}
            onCancel={() => {
              setResult('취소됨')
              setBasicOpen(false)
            }}
          />
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
