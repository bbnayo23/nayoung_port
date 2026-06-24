import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import { Popover } from '../../components/Popover'

const meta = {
  title: 'StyleGuide/Popover',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

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
      <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'center' }}>{children}</div>
    </div>
  </div>
)

const Btn = ({ children, onClick }: { children: string; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: '6px 14px',
      fontSize: 13,
      border: `1px solid ${t.border}`,
      borderRadius: 6,
      background: t.surface,
      color: t.text,
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

const BasicDemo = () => {
  const [visible, setVisible] = useState(false)
  return (
    <Popover
      placement="top"
      arrow
      visible={visible}
      onVisibleChange={setVisible}
      content={<p style={{ margin: 0, fontSize: 13, color: t.textSecondary }}>팝오버 내용입니다.</p>}
      onClick={() => setVisible((v) => !v)}
    >
      <Btn>열기</Btn>
    </Popover>
  )
}

const WithTitleDemo = () => {
  const [visible, setVisible] = useState(false)
  return (
    <Popover
      placement="bottom"
      arrow
      closeButton
      title="주의사항"
      visible={visible}
      onVisibleChange={setVisible}
      content={<p style={{ margin: 0, fontSize: 13, color: t.textSecondary }}>이 작업은 되돌릴 수 없습니다.</p>}
      onClick={() => setVisible((v) => !v)}
    >
      <Btn>삭제</Btn>
    </Popover>
  )
}

const PlacementsDemo = () => {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Popover
          key={p}
          placement={p}
          arrow
          visible={open === p}
          onVisibleChange={(v) => setOpen(v ? p : null)}
          content={<span style={{ fontSize: 12, color: t.textSecondary }}>{p}</span>}
          onClick={() => setOpen((cur) => (cur === p ? null : p))}
        >
          <Btn>{p}</Btn>
        </Popover>
      ))}
    </div>
  )
}

export const Documentation: Story = {
  render: () => (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Popover</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          트리거 요소 주변에 부유하는 콘텐츠 패널입니다. <InlineCode>visible</InlineCode>·
          <InlineCode>onVisibleChange</InlineCode>로 완전 제어(controlled)하며, Popper.js 기반 위치 계산으로 화면 경계를
          자동 처리합니다.
        </p>
        <CodeBlock>{`import { Popover } from '@port/design-system'`}</CodeBlock>
      </div>

      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'children', type: 'ReactNode', required: true, desc: '팝오버를 여는 트리거 요소' },
              { name: 'content', type: 'ReactNode', required: true, desc: '팝오버 본문 콘텐츠' },
              { name: 'visible', type: 'boolean', required: true, desc: '팝오버 표시 여부 (controlled)' },
              { name: 'onVisibleChange', type: '(visible: boolean) => void', desc: '표시 상태 변경 콜백' },
              {
                name: 'placement',
                type: "'top' | 'bottom' | 'left' | 'right'",
                defaultVal: "'top'",
                desc: '팝오버 표시 방향. 공간 부족 시 자동 반전됩니다.',
              },
              { name: 'title', type: 'ReactNode', desc: '팝오버 제목. 지정 시 본문 위에 렌더됩니다.' },
              { name: 'arrow', type: 'boolean', defaultVal: 'false', desc: '화살표 표시 여부' },
              { name: 'closeButton', type: 'boolean', defaultVal: 'false', desc: '우측 상단 닫기(×) 버튼 표시 여부' },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '비활성화 — 팝오버가 렌더되지 않습니다.',
              },
              {
                name: 'offset',
                type: '[number, number]',
                defaultVal: '[0, 8]',
                desc: '트리거와 팝오버 사이 오프셋 [skid, distance]',
              },
              {
                name: 'portal',
                type: 'boolean',
                defaultVal: 'true',
                desc: 'Portal로 렌더 여부. false면 DOM 인라인 렌더.',
              },
              { name: 'closeOnOutsideClick', type: 'boolean', defaultVal: 'true', desc: '팝오버 외부 클릭 시 닫기' },
              { name: 'onClick', type: '() => void', desc: '트리거 클릭 핸들러' },
            ]}
          />
        </Card>
      </Section>

      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 사용"
            desc="visible 상태를 직접 관리합니다. onClick으로 토글, onVisibleChange로 외부 클릭 닫기를 처리합니다."
            code={`const [visible, setVisible] = useState(false);

<Popover
  placement="top"
  arrow
  visible={visible}
  onVisibleChange={setVisible}
  content={<p>팝오버 내용</p>}
  onClick={() => setVisible((v) => !v)}
>
  <button>열기</button>
</Popover>`}
          >
            <BasicDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="제목 + 닫기 버튼"
            desc="title과 closeButton을 함께 사용하면 확인 다이얼로그 스타일로 활용할 수 있습니다."
            code={`<Popover
  placement="bottom"
  arrow
  closeButton
  title="주의사항"
  visible={visible}
  onVisibleChange={setVisible}
  content={<p>이 작업은 되돌릴 수 없습니다.</p>}
  onClick={() => setVisible((v) => !v)}
>
  <button>삭제</button>
</Popover>`}
          >
            <WithTitleDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Placement 비교"
            desc="placement prop으로 top · bottom · left · right 중 선택합니다. 공간이 부족하면 Popper.js가 자동으로 반전합니다."
            code={`<Popover placement="top" ...>...</Popover>
<Popover placement="bottom" ...>...</Popover>
<Popover placement="left" ...>...</Popover>
<Popover placement="right" ...>...</Popover>`}
          >
            <PlacementsDemo />
          </Pattern>
        </Card>
      </Section>
    </DocPage>
  ),
}
