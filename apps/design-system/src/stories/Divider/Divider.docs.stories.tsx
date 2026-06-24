import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Divider from '../../components/Divider'

const meta = {
  title: 'StyleGuide/Divider',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Design tokens ─────────────────────────────────────────────────────────────

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

// ── Layout helpers ────────────────────────────────────────────────────────────

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
      fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace",
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
      <div>{children}</div>
    </div>
  </div>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Divider</h1>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.primary,
              background: 'rgba(0,183,153,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            PRIMITIVE
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          수평 또는 수직 방향의 구분선 컴포넌트입니다. 두께(<InlineCode>size</InlineCode>), 여백(
          <InlineCode>margin</InlineCode>), 투명도(<InlineCode>opacity</InlineCode>), 색상(
          <InlineCode>color</InlineCode>)을 조절할 수 있습니다.
        </p>
        <CodeBlock>{`import Divider from "@port/design-system"`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'direction', type: "'horizontal' | 'vertical'", defaultVal: "'horizontal'", desc: '구분선 방향' },
              {
                name: 'size',
                type: 'number',
                defaultVal: '1',
                desc: '선 두께 (px). horizontal이면 borderTopWidth, vertical이면 borderLeftWidth에 적용',
              },
              {
                name: 'margin',
                type: 'number',
                defaultVal: '0',
                desc: '상하(horizontal) 또는 좌우(vertical) 여백 (px)',
              },
              {
                name: 'opacity',
                type: 'number',
                defaultVal: '1',
                desc: '투명도 (0–1). 미지정 시 요소의 기본 opacity 사용',
              },
              { name: 'color', type: 'string', desc: '선 색상 (CSS color 값). 미지정 시 토큰 색상 사용' },
              { name: 'className', type: 'string', desc: '루트 hr 요소에 추가할 CSS 클래스' },
              { name: 'style', type: 'CSSProperties', desc: '루트 hr 요소 인라인 스타일 (토큰 외 동적 값에만 사용)' },
            ]}
          />
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="수평 구분선 (기본)"
            desc="콘텐츠 섹션 사이 수평 구분선입니다. direction 미지정 시 horizontal이 기본값입니다."
            code={`<Divider />
// 또는
<Divider direction="horizontal" size={1} />`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: t.text }}>
              <span>위 콘텐츠</span>
              <Divider />
              <span>아래 콘텐츠</span>
            </div>
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="수직 구분선"
            desc="버튼 그룹, 툴바 등에서 항목을 가로로 구분할 때 사용합니다."
            code={`<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <span>복사</span>
  <Divider direction="vertical" />
  <span>편집</span>
  <Divider direction="vertical" />
  <span>삭제</span>
</div>`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32, fontSize: 13, color: t.text }}>
              <span>복사</span>
              <Divider direction="vertical" />
              <span>편집</span>
              <Divider direction="vertical" />
              <span>삭제</span>
            </div>
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="margin · opacity 조합"
            desc="섹션 간격을 margin으로, 강조도를 opacity로 조절합니다. 서브 섹션은 낮은 opacity로 위계를 표현할 수 있습니다."
            code={`<p>기본 정보</p>
<Divider margin={12} />
<p>보안 설정</p>
<Divider margin={8} opacity={0.4} />`}
          >
            <div style={{ fontSize: 13, color: t.text }}>
              <p style={{ margin: 0, fontWeight: 600 }}>기본 정보</p>
              <Divider margin={12} />
              <p style={{ margin: 0, fontWeight: 600 }}>보안 설정</p>
              <Divider margin={8} opacity={0.4} />
              <p style={{ margin: 0, color: t.textSecondary, fontSize: 12 }}>서브 항목</p>
            </div>
          </Pattern>
        </Card>
      </Section>

      {/* Direction showcase */}
      <Section gap={16}>
        <SectionTitle>방향</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {(['horizontal', 'vertical'] as const).map((dir) => (
            <Card key={dir}>
              <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
                {`direction="${dir}"`}
              </p>
              {dir === 'horizontal' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: t.text }}>
                  <span>위</span>
                  <Divider direction="horizontal" />
                  <span>아래</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 28, fontSize: 13, color: t.text }}>
                  <span>왼쪽</span>
                  <Divider direction="vertical" />
                  <span>오른쪽</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* Thickness showcase */}
      <Section gap={16}>
        <SectionTitle>두께 (size)</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {([1, 2, 4, 8] as const).map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>{`size={${s}}`}</span>
                <Divider size={s} />
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Color showcase */}
      <Section gap={16}>
        <SectionTitle>색상 (color)</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: '기본값 (토큰)', color: undefined },
              { label: 'primary', color: vars.color.primary },
              { label: 'error', color: vars.color.error },
              { label: 'warning', color: vars.color.warning },
              { label: 'success', color: vars.color.success },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
                  {color ? `color="${label}"` : 'color 미지정'}
                </span>
                <Divider color={color} size={2} />
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
