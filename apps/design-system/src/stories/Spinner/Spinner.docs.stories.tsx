import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Spinner from '../../components/Spinner'

const meta = {
  title: 'StyleGuide/Spinner',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Layout helpers ────────────────────────────────────────────────────────────

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

const SpinnerBox = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      width: 80,
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: t.radius,
    }}
  >
    {children}
  </div>
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
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{children}</div>
    </div>
  </div>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Spinner</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          비동기 작업 진행 중임을 나타내는 로딩 인디케이터입니다. <InlineCode>type</InlineCode>으로 외형을 선택하고,{' '}
          <InlineCode>size</InlineCode>로 크기를 조정합니다. <InlineCode>overlay</InlineCode>를 사용하면 컨텐츠 위를
          덮어 로딩 상태를 표시할 수 있습니다.
        </p>
        <CodeBlock>{`import Spinner from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'type',
                type: "'default' | 'dots' | 'outline'",
                defaultVal: "'default'",
                desc: '스피너 유형. default(테두리), dots(점), outline(그라데이션 테두리)',
              },
              {
                name: 'variant',
                type: "'solid' | 'round' | 'circle' | 'outline' | 'flow' | 'bounce' | 'fadeinout'",
                desc: 'type을 오버라이드하는 세부 variant',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '스피너 크기 — sm(24px), md(36px), lg(48px)',
              },
              {
                name: 'color',
                type: 'string',
                desc: 'CSS 색상값으로 스피너 색상을 직접 지정. 미설정 시 primary 색상 사용',
              },
              {
                name: 'overlay',
                type: 'boolean',
                defaultVal: 'false',
                desc: 'true이면 부모 영역을 반투명 레이어로 덮어 전체 로딩 상태 표시',
              },
              { name: 'className', type: 'string', desc: '루트 wrapper 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>
      </Section>

      {/* Types */}
      <Section gap={16}>
        <SectionTitle>Type</SectionTitle>
        <Card>
          <div style={{ display: 'flex', gap: 32 }}>
            {(['default', 'dots', 'outline'] as const).map((type) => (
              <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <SpinnerBox>
                  <Spinner type={type} />
                </SpinnerBox>
                <InlineCode>{`type="${type}"`}</InlineCode>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Round Variant */}
      <Section gap={16}>
        <SectionTitle>Round Variant</SectionTitle>
        <Card>
          <Pattern
            title='variant="round"'
            desc='그라데이션 링 형태의 스피너. type="default"와 함께 사용하며 conic-gradient로 부드러운 회전 효과를 표현합니다.'
            code={`<Spinner type="default" variant="round" size="sm" />
<Spinner type="default" variant="round" size="md" />
<Spinner type="default" variant="round" size="lg" />`}
          >
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <SpinnerBox>
                  <Spinner type="default" variant="round" size={size} />
                </SpinnerBox>
                <InlineCode>{size}</InlineCode>
              </div>
            ))}
          </Pattern>
        </Card>
      </Section>

      {/* Variant Matrix */}
      <Section gap={16}>
        <SectionTitle>Variant × Size 매트릭스</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 90, flexShrink: 0 }} />
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} style={{ width: 80, textAlign: 'center' }}>
                  <InlineCode>{size}</InlineCode>
                </div>
              ))}
            </div>
            {(['solid', 'round', 'circle', 'outline', 'flow', 'bounce', 'fadeinout'] as const).map((variant) => (
              <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 90, flexShrink: 0 }}>
                  <InlineCode>{variant}</InlineCode>
                </div>
                {(['sm', 'md', 'lg'] as const).map((size) => (
                  <SpinnerBox key={size}>
                    <Spinner variant={variant} size={size} />
                  </SpinnerBox>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Type × Variant */}
      <Section gap={16}>
        <SectionTitle>Type 기본값</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>variant</InlineCode>를 지정하지 않으면 <InlineCode>type</InlineCode>에 따라 기본 variant가
            결정됩니다. <InlineCode>variant</InlineCode>를 명시하면 type과 관계없이 해당 variant가 적용됩니다.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(
              [
                { type: 'default', defaultVariant: 'solid' },
                { type: 'dots', defaultVariant: 'fadeinout' },
                { type: 'outline', defaultVariant: 'outline' },
              ] as const
            ).map(({ type, defaultVariant }) => (
              <div
                key={type}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  background: t.surfaceHover,
                  borderRadius: t.radiusSm,
                }}
              >
                <SpinnerBox>
                  <Spinner type={type} />
                </SpinnerBox>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: t.text }}>
                    <InlineCode>{`type="${type}"`}</InlineCode>
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: t.textSecondary }}>
                    기본 variant: <InlineCode>{defaultVariant}</InlineCode>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Sizes */}
      <Section gap={16}>
        <SectionTitle>Size</SectionTitle>
        <Card>
          <div style={{ display: 'flex', gap: 32 }}>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <SpinnerBox>
                  <Spinner size={size} />
                </SpinnerBox>
                <InlineCode>{`size="${size}"`}</InlineCode>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="인라인 로딩"
            desc="텍스트와 함께 인라인으로 사용하는 패턴. sm 크기가 적합합니다."
            code={`<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Spinner size="sm" />
  <span>데이터를 불러오는 중입니다...</span>
</div>`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Spinner size="sm" />
              <span style={{ fontSize: 13, color: t.textSecondary }}>데이터를 불러오는 중입니다...</span>
            </div>
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="카드 / 섹션 로딩"
            desc="콘텐츠 영역 중앙에 표시하는 패턴. lg 크기와 레이블을 함께 사용합니다."
            code={`<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: 32 }}>
  <Spinner size="lg" />
  <span>보안 이벤트 분석 중</span>
</div>`}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                padding: '24px 32px',
                border: `1px solid ${t.border}`,
                borderRadius: t.radiusSm,
              }}
            >
              <Spinner size="lg" />
              <span style={{ fontSize: 13, color: t.textSecondary }}>보안 이벤트 분석 중</span>
            </div>
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="오버레이 로딩"
            desc="overlay=true 로 부모 영역을 덮어 전체 로딩 상태를 표시합니다. 부모에 position: relative 필요."
            code={`<div style={{ position: 'relative' }}>
  {/* 콘텐츠 */}
  <Spinner overlay />
</div>`}
          >
            <div
              style={{
                position: 'relative',
                width: 180,
                height: 80,
                border: `1px solid ${t.border}`,
                borderRadius: t.radiusSm,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '12px 16px' }}>
                <p style={{ margin: 0, fontSize: 12, color: t.textSecondary }}>로딩 중인 콘텐츠 영역</p>
              </div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255,255,255,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spinner />
              </div>
            </div>
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="커스텀 색상"
            desc="color prop으로 스피너 색상을 직접 지정합니다. CSS 색상값 모두 지원."
            code={`<Spinner color="#ef4444" />
<Spinner color="#f59e0b" />
<Spinner color="#22c55e" />`}
          >
            {(['#ef4444', '#f59e0b', '#22c55e', '#8b5cf6', '#0ea5e9'] as const).map((color) => (
              <SpinnerBox key={color}>
                <Spinner color={color} />
              </SpinnerBox>
            ))}
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="버튼 로딩 상태"
            desc="버튼 내부에 sm 크기 스피너를 배치해 제출·처리 중 상태를 표시합니다. color prop으로 버튼 텍스트 색상에 맞춥니다."
            code={`// 기본 버튼 로딩
<button disabled style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
  <Spinner size="sm" color="currentColor" />
  처리 중...
</button>

// Primary 버튼 로딩
<button disabled style={{ background: '#4f6ef7', color: '#fff', ... }}>
  <Spinner size="sm" color="#fff" />
  저장 중...
</button>`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                disabled
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  border: `1px solid ${t.border}`,
                  borderRadius: t.radiusSm,
                  background: t.surface,
                  color: t.textSecondary,
                  fontSize: 13,
                  cursor: 'not-allowed',
                  opacity: 0.8,
                }}
              >
                <Spinner size="sm" color={t.textSecondary} />
                처리 중...
              </button>
              <button
                disabled
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  border: 'none',
                  borderRadius: t.radiusSm,
                  background: t.primary,
                  color: '#fff',
                  fontSize: 13,
                  cursor: 'not-allowed',
                  opacity: 0.8,
                }}
              >
                <Spinner size="sm" color="#fff" />
                저장 중...
              </button>
            </div>
          </Pattern>
        </Card>
      </Section>
    </DocPage>
  ),
}
