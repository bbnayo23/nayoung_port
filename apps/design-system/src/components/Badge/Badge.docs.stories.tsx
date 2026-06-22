import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Badge } from './Badge'

const meta = {
  title: 'StyleGuide/Badge',
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
  <div
    style={{
      height: '100vh',
      background: t.bg,
      overflowY: 'auto',
    }}
  >
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
      style={{
        display: 'inline-block',
        width: 3,
        height: 16,
        background: t.primary,
        borderRadius: 2,
        flexShrink: 0,
      }}
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
      whiteSpace: 'normal',
      wordBreak: 'break-word',
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

// ── Props table ───────────────────────────────────────────────────────────────

type PropRow = {
  name: string
  type: string
  defaultVal?: string
  required?: boolean
  desc: string
}

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

// ── Constants ─────────────────────────────────────────────────────────────────

const ALL_VARIANTS = ['neutral', 'brand', 'success', 'warning', 'danger', 'info'] as const
const ALL_APPEARANCES = ['solid', 'soft', 'outline'] as const

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Badge</h1>
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
            PRIMITIVE
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 640 }}>
          상태, 카테고리, 라벨 등을 표현하는 컴포넌트입니다.{' '}
          <InlineCode>variant</InlineCode>(색상 의미) ·{' '}
          <InlineCode>appearance</InlineCode>(시각 표현) · <InlineCode>size</InlineCode> 조합으로 다양한 스타일을
          표현하며, <InlineCode>dot</InlineCode> prop으로 선행 상태 점을 추가할 수 있습니다.
        </p>
        <CodeBlock>{`import { Badge } from '@nayoung_port/design-system/components/Badge'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'variant',
                type: "'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'",
                defaultVal: "'neutral'",
                desc: '색상 의미(semantic). 뱃지가 전달하는 상태 의미를 지정합니다.',
              },
              {
                name: 'appearance',
                type: "'solid' | 'soft' | 'outline'",
                defaultVal: "'soft'",
                desc: '시각적 표현 방식. solid=불투명 배경, soft=연한 배경, outline=테두리만.',
              },
              {
                name: 'size',
                type: "'sm' | 'md'",
                defaultVal: "'md'",
                desc: '크기. sm은 xs 폰트, md는 sm 폰트로 렌더링됩니다.',
              },
              {
                name: 'dot',
                type: 'boolean',
                defaultVal: 'false',
                desc: '라벨 앞에 상태 점(현재 텍스트 색과 동일)을 표시합니다. 점은 aria-hidden 처리됩니다.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                required: true,
                desc: '뱃지 내용 (텍스트 또는 ReactNode).',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 <span>에 추가할 CSS 클래스.',
              },
            ]}
          />
        </Card>
      </Section>

      {/* Appearance 섹션 */}
      <Section gap={24}>
        <SectionTitle>Appearance</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            SOLID
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            불투명 배경 + 흰 텍스트. 강한 강조가 필요한 레이블에 적합합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_VARIANTS.map((v) => (
              <Badge key={v} variant={v} appearance="solid">
                {v}
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            SOFT
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            연한 배경 + 의미색 텍스트 (기본값). 대부분의 상태 레이블에 권장합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_VARIANTS.map((v) => (
              <Badge key={v} variant={v} appearance="soft">
                {v}
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            OUTLINE
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            투명 배경 + 의미색 테두리. 덜 강조된 보조 레이블에 사용합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_VARIANTS.map((v) => (
              <Badge key={v} variant={v} appearance="outline">
                {v}
              </Badge>
            ))}
          </div>
        </Card>
      </Section>

      {/* Variant 섹션 */}
      <Section gap={24}>
        <SectionTitle>Variant (Semantic Color)</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            각 variant는 의미적 색상을 나타냅니다. appearance별로 배경·텍스트·테두리 색이 함께 변경됩니다.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ALL_APPEARANCES.map((app) => (
              <div key={app} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <code style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted, width: 56 }}>{app}</code>
                {ALL_VARIANTS.map((v) => (
                  <Badge key={v} variant={v} appearance={app}>
                    {v}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Dot 섹션 */}
      <Section gap={16}>
        <SectionTitle>Dot</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>dot</InlineCode> prop을 사용하면 텍스트 앞에 현재 텍스트 색과 동일한 상태 점이 표시됩니다.
            심각도 표시나 온라인 상태 레이블에 적합합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_VARIANTS.map((v) => (
              <Badge key={v} variant={v} appearance="soft" dot>
                {v}
              </Badge>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {ALL_VARIANTS.map((v) => (
              <Badge key={v} variant={v} appearance="outline" dot>
                {v}
              </Badge>
            ))}
          </div>
        </Card>
      </Section>

      {/* Size 섹션 */}
      <Section gap={16}>
        <SectionTitle>Size</SectionTitle>
        <Card>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {(['sm', 'md'] as const).map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Badge variant="brand" appearance="soft" size={s}>
                  {s}
                </Badge>
                <code style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>{`size="${s}"`}</code>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Code 예시 */}
      <Section gap={16}>
        <SectionTitle>사용 예시</SectionTitle>
        <Card>
          <CodeBlock>{`// 기본 사용 (soft appearance, neutral variant)
<Badge>기본</Badge>

// variant × appearance 조합
<Badge variant="success" appearance="soft">완료</Badge>
<Badge variant="warning" appearance="solid">주의</Badge>
<Badge variant="danger" appearance="outline">오류</Badge>
<Badge variant="info" appearance="soft">진행중</Badge>

// 상태 점 표시
<Badge variant="success" dot>온라인</Badge>
<Badge variant="danger" dot>오프라인</Badge>

// 크기 조절
<Badge variant="brand" size="sm">Small</Badge>
<Badge variant="brand" size="md">Medium</Badge>

// HTMLSpanElement 기본 속성 사용 가능
<Badge variant="neutral" appearance="soft" aria-label="상태: 정상">정상</Badge>`}</CodeBlock>
        </Card>
      </Section>
    </DocPage>
  ),
}
