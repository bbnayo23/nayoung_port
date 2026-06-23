import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { HighlightText } from './HighlightText'

const meta = {
  title: 'StyleGuide/HighlightText',
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

const sampleText = 'The quick brown fox jumps over the lazy dog.'
const logText = 'User login from 192.168.1.100 at 2024-01-15T10:30:00Z with status=success'
const longText = Array.from(
  { length: 6 },
  (_, i) => `Word${i} ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor`,
).join(' ')

const DocumentationView = () => {
  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>HighlightText</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          텍스트 안에서 검색어와 일치하는 부분을 <InlineCode>{'<mark>'}</InlineCode> 태그로 강조하는 컴포넌트입니다.
          내부적으로 react-highlight-words 를 감싸는 thin wrapper 이며, 문자열 검색어와 정규식 검색어를 모두 받습니다.
          검색어가 비어 있거나 입력이 길이 임계치를 넘으면 강조 없이 plain <InlineCode>{'<span>'}</InlineCode> 으로 안전하게
          렌더링됩니다.
        </p>
        <CodeBlock>{`import { HighlightText } from '@nayoung-port/design-system/components/HighlightText'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — HighlightText</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'text',
                type: 'string',
                desc: '강조 대상이 되는 전체 원본 문자열. (필수)',
              },
              {
                name: 'searchWords',
                type: 'Array<string | RegExp>',
                desc: '강조할 검색어 배열. 문자열 또는 정규식을 혼용할 수 있다. 빈 배열이면 강조 없이 plain 렌더링된다. (필수)',
              },
              {
                name: 'caseSensitive',
                type: 'boolean',
                defaultVal: 'false',
                desc: '대소문자 구분 여부. false 면 대소문자를 무시하고 매칭한다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 엘리먼트(Highlighter 컨테이너 또는 plain span)에 전달되는 추가 클래스.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Basic — 단어 강조</SectionTitle>
        <CodeBlock>{`<HighlightText
  text="The quick brown fox jumps over the lazy dog."
  searchWords={['fox']}
/>`}</CodeBlock>
        <DocCard>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.text }}>
            <HighlightText text={sampleText} searchWords={['fox']} />
          </p>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Multiple Words — 다중 검색어</SectionTitle>
        <CodeBlock>{`<HighlightText
  text="error occurred during authentication: invalid token, please retry login"
  searchWords={['error', 'invalid', 'token', 'retry']}
/>`}</CodeBlock>
        <DocCard>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.text }}>
            <HighlightText
              text="error occurred during authentication: invalid token, please retry login with valid credentials"
              searchWords={['error', 'invalid', 'token', 'retry']}
            />
          </p>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>RegExp — 정규식 검색어</SectionTitle>
        <CodeBlock>{`<HighlightText
  text="User login from 192.168.1.100 at 2024-01-15T10:30:00Z with status=success"
  searchWords={[/\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}/, /status=\\w+/]}
/>`}</CodeBlock>
        <DocCard>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.text }}>
            <HighlightText text={logText} searchWords={[/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, /status=\w+/]} />
          </p>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>caseSensitive — 대소문자 구분</SectionTitle>
        <CodeBlock>{`// 기본(false): Fox · fox · FOX 모두 매칭
<HighlightText text="Fox fox FOX" searchWords={['fox']} caseSensitive={false} />

// true: 정확히 'fox' 만 매칭
<HighlightText text="Fox fox FOX" searchWords={['fox']} caseSensitive={true} />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>{'caseSensitive={false} (default)'}</InlineCode>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.text }}>
                <HighlightText text="Fox fox FOX" searchWords={['fox']} caseSensitive={false} />
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>{'caseSensitive={true}'}</InlineCode>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.text }}>
                <HighlightText text="Fox fox FOX" searchWords={['fox']} caseSensitive={true} />
              </p>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Plain Fallback — 강조 없이 렌더링</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>searchWords</InlineCode> 가 빈 배열이거나, <InlineCode>text</InlineCode> 길이가 20,000자를
          초과하거나, 검색어 직렬화 길이 합이 30,000자를 초과하면 강조 없이 plain <InlineCode>{'<span>'}</InlineCode> 으로
          렌더링됩니다(과도한 하이라이트 연산 방지).
        </p>
        <CodeBlock>{`// 빈 검색어 → 강조 없이 그대로 출력
<HighlightText text="The quick brown fox jumps over the lazy dog." searchWords={[]} />`}</CodeBlock>
        <DocCard>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.text }}>
            <HighlightText text={sampleText} searchWords={[]} />
          </p>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>className — 컨테이너 스타일링</SectionTitle>
        <CodeBlock>{`<HighlightText text="..." searchWords={['ipsum', 'tempor']} className="log-line" />`}</CodeBlock>
        <DocCard>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.8,
              color: t.textSecondary,
              fontFamily: "'Fira Code','Consolas',monospace",
            }}
          >
            <HighlightText text={longText} searchWords={['ipsum', 'tempor']} />
          </p>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
