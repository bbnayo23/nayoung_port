import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Card from '../../components/Card'
import { CardSkeleton } from '../../components/Card'

const meta = {
  title: 'StyleGuide/Card',
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
  success: vars.color.success,
  error: vars.color.error,
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

export const Documentation: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null)
    return (
      <DocPage>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Card</h1>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
            컨텐츠를 그룹화하는 컨테이너 컴포넌트입니다. Header · Body · Image · Footer 서브컴포넌트와 함께 사용하며,
            클릭·선택·밀도·비활성화 상태를 지원합니다.
          </p>
          <CodeBlock>{`import Card from '@port/design-system'
import { CardSkeleton } from '@port/design-system'`}</CodeBlock>
        </div>

        <Section>
          <SectionTitle>API — Card</SectionTitle>
          <DocCard>
            <PropsTable
              rows={[
                {
                  name: 'variant',
                  type: "'default' | 'section' | 'old-exd' | 'neo'",
                  defaultVal: "'default'",
                  desc: '카드 스타일 변형',
                },
                { name: 'title', type: 'ReactNode', desc: '카드 헤더 제목 — variant별 헤더 슬롯에 렌더링' },
                { name: 'action', type: 'ReactNode', desc: '헤더 우측 액션 영역 (버튼, 뱃지 등)' },
                { name: 'size', type: "'sm' | 'md' | 'lg'", desc: '카드 너비 고정 크기 (280 · 360 · 480px)' },
                {
                  name: 'density',
                  type: "'default' | 'compact'",
                  defaultVal: "'default'",
                  desc: '내부 밀도. compact는 패딩·폰트를 줄여 목록형 카드에 적합',
                },
                { name: 'isActive', type: 'boolean', desc: '활성 상태 — primary 보더 강조' },
                { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '비활성화 — opacity 처리, 클릭 불가' },
                { name: 'hoverable', type: 'boolean', desc: '호버 효과. onClick이 있으면 기본값 true' },
                {
                  name: 'noPadding',
                  type: 'boolean',
                  defaultVal: 'false',
                  desc: '내부 패딩 제거 — 툴바·그리드 등 자체 패딩 컨텐츠에 사용',
                },
                {
                  name: 'onClick',
                  type: '(e: MouseEvent) => void',
                  desc: '클릭 핸들러. 설정 시 hoverable 자동 활성화',
                },
              ]}
            />
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>Subcomponents</SectionTitle>
          <CodeBlock>{`<Card>
  <Card.Header>제목</Card.Header>
  <Card.Body>본문</Card.Body>
  <Card.Image><img src="..." /></Card.Image>
  <Card.Footer>푸터</Card.Footer>
</Card>`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Card style={{ width: 220 }}>
                <Card.Header>헤더</Card.Header>
                <Card.Body>바디 — 텍스트, 리스트, 폼 등을 자유롭게 조합합니다.</Card.Body>
                <Card.Footer>
                  <span style={{ fontSize: 11, color: t.textMuted }}>2024-01-15</span>
                </Card.Footer>
              </Card>
              <Card style={{ width: 220 }}>
                <Card.Image>
                  <div
                    style={{
                      height: 70,
                      background: `linear-gradient(135deg, ${t.primary}, ${t.info})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 11,
                    }}
                  >
                    Card.Image
                  </div>
                </Card.Image>
                <Card.Body>이미지 슬롯 포함</Card.Body>
              </Card>
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>Variant</SectionTitle>
          <CodeBlock>{`<Card variant="default" title="제목" action={<button>액션</button>}>본문</Card>
<Card variant="section" title="섹션">본문</Card>
<Card variant="old-exd" title="클래식 패널">본문</Card>
<Card variant="neo" title="모던 카드">본문</Card>`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200 }}>
                <InlineCode>default</InlineCode>
                <Card
                  variant="default"
                  title="Default"
                  action={<span style={{ fontSize: 10, color: t.textMuted }}>액션</span>}
                >
                  <Card.Body>bordered section 카드</Card.Body>
                </Card>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200 }}>
                <InlineCode>section</InlineCode>
                <Card variant="section" title="Section">
                  <Card.Body>섹션형 카드</Card.Body>
                </Card>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200 }}>
                <InlineCode>old-exd</InlineCode>
                <Card variant="old-exd" title="클래식 패널" action={<span style={{ fontSize: 10 }}>액션</span>}>
                  각진 모서리 · primary 보더 · 항목 구분선
                </Card>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200 }}>
                <InlineCode>neo</InlineCode>
                <Card variant="neo" title="모던 카드" action={<span style={{ fontSize: 10 }}>액션</span>}>
                  그라데이션 액센트 · 큰 radius · hover lift
                </Card>
              </div>
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>State</SectionTitle>
          <DocCard>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {(
                [
                  { label: 'Default', props: {} },
                  { label: 'isActive', props: { isActive: true } },
                  { label: 'Hoverable', props: { hoverable: true } },
                  { label: 'Disabled', props: { disabled: true } },
                ] as const
              ).map(({ label, props }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Card style={{ width: 160 }} {...props}>
                    <Card.Body>{label}</Card.Body>
                  </Card>
                  <InlineCode>{label}</InlineCode>
                </div>
              ))}
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>Density</SectionTitle>
          <CodeBlock>{`<Card density="compact">...</Card>`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {(['default', 'compact'] as const).map((d) => (
                <div key={d} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 220 }}>
                  <InlineCode>{`density="${d}"`}</InlineCode>
                  {['피싱 대응', 'DDoS 완화'].map((name) => (
                    <Card key={name} density={d}>
                      <Card.Body>{name}</Card.Body>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>Clickable (isActive + onClick)</SectionTitle>
          <CodeBlock>{`<Card isActive={selected === id} onClick={() => setSelected(id)}>...</Card>`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280 }}>
              {['피싱 대응', 'DDoS 완화', '악성코드 격리'].map((name) => (
                <Card
                  key={name}
                  isActive={selected === name}
                  onClick={() => setSelected(selected === name ? null : name)}
                >
                  <Card.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{name}</span>
                      {selected === name && (
                        <span style={{ fontSize: 10, color: t.primary, fontWeight: 600 }}>선택됨</span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </DocCard>
        </Section>

        <Section>
          <SectionTitle>CardSkeleton</SectionTitle>
          <CodeBlock>{`<CardSkeleton skeletonCount={3} timeDiff />`}</CodeBlock>
          <DocCard>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 220 }}>
                <InlineCode>skeletonCount=2</InlineCode>
                <CardSkeleton skeletonCount={2} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 220 }}>
                <InlineCode>timeDiff + count=3</InlineCode>
                <CardSkeleton timeDiff skeletonCount={3} />
              </div>
            </div>
          </DocCard>
        </Section>
      </DocPage>
    )
  },
}
