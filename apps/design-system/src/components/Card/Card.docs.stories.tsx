import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Card } from './Card'

const meta = {
  title: 'StyleGuide/Card',
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

const DocumentationView = () => {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Card</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          컨텐츠를 그룹화하는 컨테이너 컴포넌트입니다. Header · Body · Footer 서브컴포넌트와 함께 사용하며, elevated ·
          outlined · filled 세 가지 variant 와 패딩 밀도 조정을 지원합니다.
        </p>
        <CodeBlock>{`import { Card } from '@nayoung-port/design-system/components/Card'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — Card</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'variant',
                type: "'elevated' | 'outlined' | 'filled'",
                defaultVal: "'elevated'",
                desc: '카드 시각 스타일 — elevated(그림자) · outlined(보더) · filled(연한 배경)',
              },
              {
                name: 'padding',
                type: "'none' | 'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '내부 슬롯(Header/Body/Footer)에 적용될 패딩 밀도. Context로 자식 슬롯에 전달된다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 div 에 병합되는 추가 클래스',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: '카드 내부 콘텐츠. Card.Header / Card.Body / Card.Footer 슬롯 조합을 권장한다.',
              },
              {
                name: '...rest',
                type: 'HTMLAttributes<HTMLDivElement>',
                desc: 'div 에 전달되는 나머지 HTML 속성 (onClick, style, aria-* 등)',
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
  <Card.Footer>푸터 (액션 버튼 등)</Card.Footer>
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
            <Card variant="outlined" style={{ width: 220 }}>
              <Card.Header>Header</Card.Header>
              <Card.Body>Header · Body · Footer 슬롯 조합</Card.Body>
              <Card.Footer>
                <span style={{ fontSize: 11, color: t.textMuted }}>Footer 영역</span>
              </Card.Footer>
            </Card>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Variant</SectionTitle>
        <CodeBlock>{`<Card variant="elevated">그림자 카드</Card>
<Card variant="outlined">보더 카드</Card>
<Card variant="filled">연한 배경 카드</Card>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(['elevated', 'outlined', 'filled'] as const).map((v) => (
              <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200 }}>
                <InlineCode>{v}</InlineCode>
                <Card variant={v}>
                  <Card.Header>{v.charAt(0).toUpperCase() + v.slice(1)}</Card.Header>
                  <Card.Body>
                    {v === 'elevated' && '그림자로 부상감 표현'}
                    {v === 'outlined' && '얇은 보더로 구분'}
                    {v === 'filled' && '연한 배경색으로 강조'}
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Padding</SectionTitle>
        <CodeBlock>{`<Card padding="none">...</Card>
<Card padding="sm">...</Card>
<Card padding="md">...</Card>
<Card padding="lg">...</Card>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(['none', 'sm', 'md', 'lg'] as const).map((p) => (
              <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 180 }}>
                <InlineCode>{`padding="${p}"`}</InlineCode>
                <Card variant="outlined" padding={p}>
                  <Card.Body>
                    {p === 'none' && '패딩 없음'}
                    {p === 'sm' && '작은 패딩 (0.75rem)'}
                    {p === 'md' && '기본 패딩 (1rem)'}
                    {p === 'lg' && '넓은 패딩 (1.5rem)'}
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Clickable (onClick)</SectionTitle>
        <CodeBlock>{`<Card onClick={() => setSelected(id)} style={{ cursor: 'pointer' }}>...</Card>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280 }}>
            {['피싱 대응', 'DDoS 완화', '악성코드 격리'].map((name) => (
              <Card
                key={name}
                variant={selected === name ? 'filled' : 'outlined'}
                onClick={() => setSelected(selected === name ? null : name)}
                style={{ cursor: 'pointer', transition: 'box-shadow 0.12s' }}
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
        <SectionTitle>Composition — 실전 예시</SectionTitle>
        <DocCard>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Card style={{ width: 260 }}>
              <Card.Header>보안 이벤트 요약</Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: t.textSecondary }}>탐지 건수</span>
                    <span style={{ fontWeight: 600, color: t.danger }}>24</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: t.textSecondary }}>차단 건수</span>
                    <span style={{ fontWeight: 600, color: t.success }}>18</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: t.textSecondary }}>검토 대기</span>
                    <span style={{ fontWeight: 600, color: t.text }}>6</span>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <span style={{ fontSize: 11, color: t.textMuted }}>2024-01-15 업데이트</span>
              </Card.Footer>
            </Card>

            <Card variant="outlined" padding="lg" style={{ width: 260 }}>
              <Card.Header>시스템 상태</Card.Header>
              <Card.Body>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: t.textSecondary,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: t.success,
                      flexShrink: 0,
                    }}
                  />
                  모든 시스템 정상
                </div>
              </Card.Body>
              <Card.Footer>
                <span style={{ fontSize: 11, color: t.textMuted }}>마지막 확인 3분 전</span>
              </Card.Footer>
            </Card>
          </div>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
