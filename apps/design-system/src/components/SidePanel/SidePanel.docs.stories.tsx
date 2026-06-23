import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { SidePanel } from './SidePanel'

const meta = {
  title: 'StyleGuide/SidePanel',
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
  success: vars.color.success,
  danger: vars.color.danger,
  info: vars.color.info,
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
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 16px',
      fontSize: 13,
      fontWeight: 600,
      color: '#ffffff',
      background: t.primary,
      border: 'none',
      borderRadius: t.radiusSm,
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

const DemoBody = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, lineHeight: 1.7 }}>
    <p style={{ margin: 0, color: t.textSecondary }}>
      패널 본문은 <InlineCode>children</InlineCode> 으로 자유롭게 채웁니다. 내용이 길어지면 본문 영역만 세로 스크롤됩니다.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['탐지 로그', '정책 설정', '대응 이력'].map((label) => (
        <div
          key={label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: t.surfaceHover,
            borderRadius: t.radiusSm,
            color: t.text,
          }}
        >
          <span>{label}</span>
          <span style={{ color: t.textMuted }}>›</span>
        </div>
      ))}
    </div>
  </div>
)

const DocumentationView = () => {
  const [openRight, setOpenRight] = useState(false)
  const [openLeft, setOpenLeft] = useState(false)
  const [openTitle, setOpenTitle] = useState(false)
  const [openWide, setOpenWide] = useState(false)
  const [openNoTitle, setOpenNoTitle] = useState(false)

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>SidePanel</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          화면 가장자리에서 슬라이드로 열리는 오버레이 패널입니다. Portal 로 렌더되며 좌·우 방향(side)과 너비(width)를
          지정할 수 있고, 어두운 오버레이 클릭 또는 ESC 키로 닫힙니다. 상세 정보·필터·설정 패널 용도에 적합합니다.
        </p>
        <CodeBlock>{`import { SidePanel } from '@nayoung-port/design-system/components/SidePanel'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — SidePanel</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'open',
                type: 'boolean',
                desc: '패널 열림 여부. false 면 아무것도 렌더되지 않는다(null 반환).',
              },
              {
                name: 'onClose',
                type: '() => void',
                desc: '오버레이 클릭 · 닫기(×) 버튼 · ESC 키 입력 시 호출된다. open 상태는 호출부가 관리한다.',
              },
              {
                name: 'side',
                type: "'right' | 'left'",
                defaultVal: "'right'",
                desc: '패널이 슬라이드되어 나타나는 방향. right 는 우측, left 는 좌측에서 진입한다.',
              },
              {
                name: 'width',
                type: 'number | string',
                defaultVal: '360',
                desc: '패널 너비. number 는 px 로 변환되고, string 은 그대로 적용된다(예: "50vw").',
              },
              {
                name: 'title',
                type: 'ReactNode',
                desc: '헤더 영역 제목. 값이 있으면 제목 + 닫기 버튼이 있는 헤더가 렌더되고, 없으면 헤더 자체가 생략된다.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: '패널 본문 콘텐츠. 본문 영역(body)에서만 세로 스크롤된다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '패널 aside 요소에 cx 로 병합되는 추가 클래스(override 가능하도록 마지막에 병합).',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>기본 사용 — open / onClose</SectionTitle>
        <CodeBlock>{`const [open, setOpen] = useState(false)

<button onClick={() => setOpen(true)}>패널 열기</button>
<SidePanel open={open} onClose={() => setOpen(false)} title="상세 정보">
  패널 내용
</SidePanel>`}</CodeBlock>
        <DocCard>
          <TriggerButton onClick={() => setOpenRight(true)}>오른쪽 패널 열기 (기본)</TriggerButton>
          <SidePanel open={openRight} onClose={() => setOpenRight(false)} title="상세 정보">
            <DemoBody />
          </SidePanel>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Side — 진입 방향</SectionTitle>
        <CodeBlock>{`<SidePanel open={open} onClose={close} side="right">...</SidePanel>
<SidePanel open={open} onClose={close} side="left">...</SidePanel>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>side=&quot;right&quot;</InlineCode>
              <TriggerButton onClick={() => setOpenRight(true)}>오른쪽에서 열기</TriggerButton>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>side=&quot;left&quot;</InlineCode>
              <TriggerButton onClick={() => setOpenLeft(true)}>왼쪽에서 열기</TriggerButton>
            </div>
          </div>
          <SidePanel open={openLeft} onClose={() => setOpenLeft(false)} side="left" title="왼쪽 패널">
            <DemoBody />
          </SidePanel>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Width — 너비 조정</SectionTitle>
        <CodeBlock>{`<SidePanel open={open} onClose={close} width={360}>...</SidePanel>   {/* 기본 px */}
<SidePanel open={open} onClose={close} width={640}>...</SidePanel>   {/* 넓은 패널 */}
<SidePanel open={open} onClose={close} width="50vw">...</SidePanel>  {/* 문자열 단위 */}`}</CodeBlock>
        <DocCard>
          <TriggerButton onClick={() => setOpenWide(true)}>넓은 패널 열기 (width=640)</TriggerButton>
          <SidePanel open={openWide} onClose={() => setOpenWide(false)} title="넓은 패널" width={640}>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
              <InlineCode>width=&#123;640&#125;</InlineCode> 로 설정된 패널입니다. number 는 px 로 변환되며, string 을
              넘기면 <InlineCode>50vw</InlineCode> 같은 단위를 그대로 쓸 수 있습니다.
            </p>
          </SidePanel>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Title — 헤더 유무</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>title</InlineCode> 이 있으면 제목과 닫기(×) 버튼이 있는 헤더가 함께 렌더되고, 생략하면 헤더 없이
          본문만 표시됩니다.
        </p>
        <CodeBlock>{`<SidePanel open={open} onClose={close} title="상세 정보">...</SidePanel>  {/* 헤더 있음 */}
<SidePanel open={open} onClose={close}>...</SidePanel>                  {/* 헤더 없음 */}`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>title 있음</InlineCode>
              <TriggerButton onClick={() => setOpenTitle(true)}>헤더 있는 패널</TriggerButton>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>title 없음</InlineCode>
              <TriggerButton onClick={() => setOpenNoTitle(true)}>헤더 없는 패널</TriggerButton>
            </div>
          </div>
          <SidePanel open={openTitle} onClose={() => setOpenTitle(false)} title="상세 정보">
            <DemoBody />
          </SidePanel>
          <SidePanel open={openNoTitle} onClose={() => setOpenNoTitle(false)}>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
              헤더가 없는 패널입니다. 닫으려면 어두운 오버레이를 클릭하거나 ESC 키를 누르세요.
            </p>
          </SidePanel>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>닫기 동작 — Overlay · ESC · Close 버튼</SectionTitle>
        <DocCard>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.9, color: t.textSecondary }}>
            <li>
              <strong style={{ color: t.text }}>오버레이 클릭</strong> — 패널 뒤 어두운 영역(<InlineCode>rgba(0,0,0,0.4)</InlineCode>)을 클릭하면{' '}
              <InlineCode>onClose</InlineCode> 가 호출됩니다.
            </li>
            <li>
              <strong style={{ color: t.text }}>ESC 키</strong> — 패널이 열려 있는 동안 ESC 를 누르면 닫힙니다(useEscClose).
            </li>
            <li>
              <strong style={{ color: t.text }}>닫기 버튼(×)</strong> — <InlineCode>title</InlineCode> 이 있을 때 헤더 우측에 표시되며, hover 시 배경이
              강조됩니다.
            </li>
          </ul>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>접근성</SectionTitle>
        <DocCard>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.9, color: t.textSecondary }}>
            <li>
              패널 <InlineCode>aside</InlineCode> 에 <InlineCode>role=&quot;dialog&quot;</InlineCode> +{' '}
              <InlineCode>aria-modal=&quot;true&quot;</InlineCode> 가 적용됩니다.
            </li>
            <li>
              닫기 버튼은 <InlineCode>aria-label=&quot;Close&quot;</InlineCode> 로 라벨링됩니다.
            </li>
            <li>오버레이는 Portal 로 body 직하에 렌더되어 다른 콘텐츠 위에 겹쳐집니다(z-index 1000/1001).</li>
          </ul>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
