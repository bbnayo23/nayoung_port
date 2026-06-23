import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { ErrorPage } from './ErrorPage'

const meta = {
  title: 'StyleGuide/ErrorPage',
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

const Frame = ({ children, height = 280 }: { children: ReactNode; height?: number }) => (
  <div
    style={{
      border: `1px solid ${t.border}`,
      borderRadius: t.radiusSm,
      background: t.bg,
      height,
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
)

const DocumentationView = () => (
  <DocPage>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>ErrorPage</h1>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
        데이터 로딩 실패 · 라우트 오류 등 예외 상황을 화면 가득 채워 안내하는 풀스크린 플레이스홀더입니다. 제목과
        선택적 설명을 세로 중앙 정렬로 보여주고, <InlineCode>onRetry</InlineCode> 가 주어지면 재시도 Button 을 함께
        렌더합니다. variant · size 축은 없으며 컨테이너의 가용 영역(<InlineCode>width: 100%; height: 100%</InlineCode>,
        최소 높이 300px)을 채웁니다.
      </p>
      <CodeBlock>{`import { ErrorPage } from '@nayoung-port/design-system/components/ErrorPage'`}</CodeBlock>
    </div>

    <Section>
      <SectionTitle>API — ErrorPage</SectionTitle>
      <DocCard>
        <PropsTable
          rows={[
            {
              name: 'title',
              type: 'string',
              defaultVal: "'문제가 발생했습니다'",
              desc: '오류 제목. h2 로 렌더되며 생략 시 기본 한국어 문구가 표시된다.',
            },
            {
              name: 'description',
              type: 'string',
              desc: '제목 아래 보조 설명. 값이 있을 때만 p 로 렌더되고, 최대 폭 480px 에서 단어 단위로 줄바꿈된다.',
            },
            {
              name: 'onRetry',
              type: '() => void',
              desc: '재시도 핸들러. 전달되면 primary Button 이 노출되고 클릭 시 호출된다. 없으면 버튼 자체가 렌더되지 않는다.',
            },
            {
              name: 'retryLabel',
              type: 'string',
              defaultVal: "'다시 시도'",
              desc: '재시도 Button 의 라벨. onRetry 가 있을 때만 의미가 있다.',
            },
          ]}
        />
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>기본 — title 만</SectionTitle>
      <CodeBlock>{`<ErrorPage />`}</CodeBlock>
      <DocCard>
        <Frame>
          <ErrorPage />
        </Frame>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>설명 포함 — description</SectionTitle>
      <CodeBlock>{`<ErrorPage
  title="문제가 발생했습니다"
  description="요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
/>`}</CodeBlock>
      <DocCard>
        <Frame>
          <ErrorPage
            title="문제가 발생했습니다"
            description="요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
          />
        </Frame>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>재시도 버튼 — onRetry</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        <InlineCode>onRetry</InlineCode> 를 넘기면 primary variant 의 재시도 Button 이 추가된다. 핸들러가 없으면 버튼은
        렌더되지 않는다.
      </p>
      <CodeBlock>{`<ErrorPage
  title="데이터를 불러오지 못했습니다"
  description="네트워크 상태를 확인한 뒤 다시 시도해 주세요."
  onRetry={() => location.reload()}
/>`}</CodeBlock>
      <DocCard>
        <Frame>
          <ErrorPage
            title="데이터를 불러오지 못했습니다"
            description="네트워크 상태를 확인한 뒤 다시 시도해 주세요."
            onRetry={() => {}}
          />
        </Frame>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>커스텀 라벨 — retryLabel</SectionTitle>
      <CodeBlock>{`<ErrorPage
  title="페이지를 찾을 수 없습니다"
  description="요청하신 페이지가 존재하지 않거나 이동되었습니다."
  onRetry={() => navigate('/')}
  retryLabel="홈으로 이동"
/>`}</CodeBlock>
      <DocCard>
        <Frame>
          <ErrorPage
            title="페이지를 찾을 수 없습니다"
            description="요청하신 페이지가 존재하지 않거나 이동되었습니다."
            onRetry={() => {}}
            retryLabel="홈으로 이동"
          />
        </Frame>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>설명 생략 — title + onRetry</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        <InlineCode>description</InlineCode> 를 비우면 제목과 버튼만 간결하게 노출된다.
      </p>
      <CodeBlock>{`<ErrorPage title="권한이 없습니다" onRetry={() => login()} retryLabel="다시 로그인" />`}</CodeBlock>
      <DocCard>
        <Frame>
          <ErrorPage title="권한이 없습니다" onRetry={() => {}} retryLabel="다시 로그인" />
        </Frame>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>긴 설명 — 줄바꿈</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        설명은 최대 폭 480px 에서 <InlineCode>word-break: break-word</InlineCode> 로 줄바꿈된다.
      </p>
      <DocCard>
        <Frame height={320}>
          <ErrorPage
            title="알 수 없는 오류가 발생했습니다"
            description="서버에서 예기치 못한 응답을 받았습니다. 문제가 지속되면 관리자에게 문의하거나 잠시 후 다시 시도해 주세요. 동일한 오류가 반복될 경우 캐시를 비우고 재접속하는 것이 도움이 될 수 있습니다."
            onRetry={() => {}}
          />
        </Frame>
      </DocCard>
    </Section>
  </DocPage>
)

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
