import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { PageLoader } from './PageLoader'

const meta = {
  title: 'StyleGuide/PageLoader',
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

const DocumentationView = () => {
  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>PageLoader</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          페이지 또는 영역 전체의 로딩 상태를 나타내는 스피너 오버레이입니다. 부모 컨테이너를 가득 채우고(width·height
          100%, 최소 높이 200px) 중앙에 회전 스피너를 표시합니다. props 가 없는 무설정 컴포넌트로, 로딩 여부 분기는
          호출부에서 조건부 렌더링으로 제어합니다.
        </p>
        <CodeBlock>{`import { PageLoader } from '@nayoung-port/design-system/components/PageLoader'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — PageLoader</SectionTitle>
        <DocCard>
          <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
            PageLoader 는 props 를 받지 않습니다. <InlineCode>{'<PageLoader />'}</InlineCode> 형태로만 사용하며, 표시
            여부·크기·색상은 토큰과 부모 레이아웃으로 결정됩니다.
          </p>
          <PropsTable
            rows={[
              {
                name: '—',
                type: '없음',
                desc: 'PageLoader 는 어떤 prop 도 받지 않습니다. className · style · 자식도 전달하지 않습니다.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>기본 사용</SectionTitle>
        <CodeBlock>{`<PageLoader />`}</CodeBlock>
        <DocCard style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ height: 240, position: 'relative' }}>
            <PageLoader />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>오버레이 동작 — 부모를 가득 채움</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          오버레이는 <InlineCode>width: 100%</InlineCode> · <InlineCode>height: 100%</InlineCode> ·{' '}
          <InlineCode>minHeight: 200px</InlineCode> 로 부모 영역을 채우고 스피너를 정중앙(flex center)에 배치합니다. 부모
          박스 크기를 바꾸면 스피너 위치만 따라 이동합니다.
        </p>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
              <InlineCode>240 × 200 (좁은 카드)</InlineCode>
              <div
                style={{
                  width: 240,
                  height: 200,
                  border: `1px solid ${t.border}`,
                  borderRadius: t.radiusSm,
                  position: 'relative',
                }}
              >
                <PageLoader />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 360 }}>
              <InlineCode>360 × 280 (넓은 패널)</InlineCode>
              <div
                style={{
                  width: 360,
                  height: 280,
                  border: `1px solid ${t.border}`,
                  borderRadius: t.radiusSm,
                  position: 'relative',
                }}
              >
                <PageLoader />
              </div>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>조건부 렌더링 패턴</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          로딩 상태 분기는 컴포넌트 내부가 아니라 호출부에서 처리합니다. 데이터 패칭 중에는 PageLoader 를, 완료 후에는
          실제 콘텐츠를 렌더링하는 것이 표준 패턴입니다.
        </p>
        <CodeBlock>{`function Page() {
  const { data, isLoading } = useQuery(...)
  if (isLoading) return <PageLoader />
  return <Content data={data} />
}`}</CodeBlock>
        <CodeBlock>{`// 영역 단위 로딩 — relative 부모 안에서 채움
<div style={{ position: 'relative', minHeight: 320 }}>
  {isFetching ? <PageLoader /> : <Table rows={rows} />}
</div>`}</CodeBlock>
      </Section>

      <Section>
        <SectionTitle>스타일 토큰</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          스피너는 28×28 원형 테두리(3px)로 그려지며, 트랙 색은 <InlineCode>vars.color.border</InlineCode>, 상단 강조
          색(회전 인디케이터)은 <InlineCode>vars.color.brand[600]</InlineCode> 입니다. 애니메이션은 0.7s linear 무한
          회전(keyframes spin)입니다.
        </p>
        <DocCard>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <tbody>
              {[
                ['트랙 색 (border)', 'vars.color.border', t.border],
                ['상단 강조 (borderTopColor)', 'vars.color.brand[600]', t.primary],
              ].map(([label, token, color]) => (
                <tr key={token} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: '10px 12px', color: t.textSecondary }}>{label}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <InlineCode>{token}</InlineCode>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        background: color,
                        border: `1px solid ${t.border}`,
                        verticalAlign: 'middle',
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>접근성</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          스피너 element 에는 <InlineCode>role=&quot;status&quot;</InlineCode> 와{' '}
          <InlineCode>aria-label=&quot;로딩 중&quot;</InlineCode> 이 부여되어 보조기술이 진행 상태로 인식합니다.
        </p>
        <CodeBlock>{`<div role="status" aria-label="로딩 중" />`}</CodeBlock>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
