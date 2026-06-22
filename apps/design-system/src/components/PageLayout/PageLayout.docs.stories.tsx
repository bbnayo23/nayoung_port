import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { PageLayout, PageHeader } from './PageLayout'

const meta = {
  title: 'StyleGuide/PageLayout',
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
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

// ── Layout helpers ────────────────────────────────────────────────────────────

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 900,
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
            {row.required && (
              <span style={{ marginLeft: 4, fontSize: 10, color: vars.color.danger, fontWeight: 600 }}>*</span>
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

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>PageLayout</h1>
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
            LAYOUT
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 640 }}>
          페이지 공통 레이아웃 컴포넌트 모음입니다. <InlineCode>PageLayout</InlineCode>을 최상위 컨테이너로 사용하고,{' '}
          <InlineCode>PageHeader</InlineCode>로 제목·설명·우측 액션 영역을 구성합니다.
        </p>
        <CodeBlock>{`import { PageLayout, PageHeader } from '@ds/components/PageLayout'`}</CodeBlock>
      </div>

      {/* PageLayout Props */}
      <Section gap={24}>
        <SectionTitle>PageLayout Props</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                required: true,
                desc: '레이아웃 내부에 렌더링될 콘텐츠. 보통 PageHeader와 본문 섹션을 포함합니다.',
              },
            ]}
          />
        </Card>
      </Section>

      {/* PageHeader Props */}
      <Section gap={24}>
        <SectionTitle>PageHeader Props</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'title',
                type: 'ReactNode',
                required: true,
                desc: '헤더 제목. 텍스트 또는 JSX 노드를 받습니다.',
              },
              {
                name: 'description',
                type: 'ReactNode',
                defaultVal: 'undefined',
                desc: '제목 아래에 표시되는 보조 설명 텍스트입니다.',
              },
              {
                name: 'right',
                type: 'ReactNode',
                defaultVal: 'undefined',
                desc: '헤더 오른쪽에 배치할 액션 영역. 버튼·아이콘 등을 넣습니다.',
              },
            ]}
          />
        </Card>
      </Section>

      {/* 사용 패턴 */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: t.text }}>기본 페이지 구조</p>
          <CodeBlock>{`<PageLayout>
  <PageHeader
    title="보안 이벤트"
    description="최근 7일간의 보안 이벤트 목록입니다."
    right={
      <button>내보내기</button>
    }
  />
  {/* 본문 콘텐츠 */}
</PageLayout>`}</CodeBlock>
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: t.text }}>헤더 없이 콘텐츠만</p>
          <CodeBlock>{`<PageLayout>
  <section>페이지 본문</section>
</PageLayout>`}</CodeBlock>
        </Card>
      </Section>

      {/* 라이브 데모 */}
      <Section gap={16}>
        <SectionTitle>라이브 데모</SectionTitle>

        {/* 기본 — title만 */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', background: t.surfaceHover, borderBottom: `1px solid ${t.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.4 }}>
              기본 (title만)
            </span>
          </div>
          <div style={{ padding: 24 }}>
            <PageLayout>
              <PageHeader title="보안 이벤트" />
              <div
                style={{
                  height: 80,
                  background: t.surfaceHover,
                  borderRadius: t.radiusSm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: t.textMuted,
                  fontSize: 13,
                }}
              >
                페이지 콘텐츠
              </div>
            </PageLayout>
          </div>
        </Card>

        {/* title + description */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', background: t.surfaceHover, borderBottom: `1px solid ${t.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.4 }}>
              title + description
            </span>
          </div>
          <div style={{ padding: 24 }}>
            <PageLayout>
              <PageHeader
                title="보안 이벤트"
                description="최근 7일간의 보안 이벤트 목록입니다."
              />
              <div
                style={{
                  height: 80,
                  background: t.surfaceHover,
                  borderRadius: t.radiusSm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: t.textMuted,
                  fontSize: 13,
                }}
              >
                페이지 콘텐츠
              </div>
            </PageLayout>
          </div>
        </Card>

        {/* title + description + right */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', background: t.surfaceHover, borderBottom: `1px solid ${t.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.4 }}>
              title + description + right 액션
            </span>
          </div>
          <div style={{ padding: 24 }}>
            <PageLayout>
              <PageHeader
                title="보안 이벤트"
                description="최근 7일간의 보안 이벤트 목록입니다."
                right={
                  <button
                    style={{
                      padding: '6px 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      background: vars.color.brand[600],
                      color: vars.color.textInverse,
                      border: 'none',
                      borderRadius: vars.radius.sm,
                      cursor: 'pointer',
                    }}
                  >
                    내보내기
                  </button>
                }
              />
              <div
                style={{
                  height: 120,
                  background: t.surfaceHover,
                  borderRadius: t.radiusSm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: t.textMuted,
                  fontSize: 13,
                }}
              >
                페이지 콘텐츠
              </div>
            </PageLayout>
          </div>
        </Card>
      </Section>

      {/* 스타일 구조 */}
      <Section gap={24}>
        <SectionTitle>스타일 구조</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.7 }}>
            <InlineCode>PageLayout</InlineCode>은 <InlineCode>display: flex; flex-direction: column</InlineCode>으로
            구성되어 높이 100%를 채웁니다. <InlineCode>PageHeader</InlineCode>는 하단 경계선이 있는 헤더 영역으로,
            왼쪽에는 title/description, 오른쪽에는 <InlineCode>right</InlineCode> 슬롯이 위치합니다.
          </p>
          <CodeBlock>{`// PageLayout — container
display: flex
flex-direction: column
height: 100%
gap: vars.space[4]       // 1rem

// PageHeader — header
display: flex
align-items: center
justify-content: space-between
padding: vars.space[2] vars.space[4]   // 0.5rem 1rem
border-bottom: 1px solid vars.color.border

// PageHeader — title
font-size: vars.font.size.lg           // 16px
font-weight: vars.font.weight.bold     // 700
color: vars.color.text

// PageHeader — description
font-size: vars.font.size.sm           // 12px
color: vars.color.textDisabled`}</CodeBlock>
        </Card>
      </Section>
    </DocPage>
  ),
}
