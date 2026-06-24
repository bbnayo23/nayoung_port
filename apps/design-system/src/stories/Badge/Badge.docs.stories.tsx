import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Badge from '../../components/Badge'
import { XdrPropertyUserIcon } from '@port/icon-library'

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

const ALL_COLORS = ['red', 'orange', 'yellow', 'green', 'purple', 'blue', 'navy', 'gray', 'pink'] as const

// ── Demo components ───────────────────────────────────────────────────────────

const ClosableDemo = () => {
  const initial = ['보안', '네트워크', '위협', '인시던트']
  const [tags, setTags] = useState<string[]>(initial)
  const remove = (label: string) => setTags((prev) => prev.filter((tag) => tag !== label))
  const VARIANTS = ['blue', 'green', 'purple', 'orange'] as const
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {tags.map((label, i) => (
        <Badge key={label} variant="tag" color={VARIANTS[i % VARIANTS.length]} closable onRemove={() => remove(label)}>
          {label}
        </Badge>
      ))}
      {tags.length === 0 && (
        <span style={{ fontSize: 12, color: t.textMuted, fontStyle: 'italic' }}>모든 태그가 제거되었습니다.</span>
      )}
    </div>
  )
}

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
              background: 'rgba(0,183,153,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            PRIMITIVE
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 640 }}>
          상태, 태그, 라벨 등을 표현하는 컴포넌트입니다. <InlineCode>type</InlineCode>(형태) ·{' '}
          <InlineCode>variant</InlineCode>(색상) · <InlineCode>size</InlineCode> 조합으로 다양한 스타일을 표현하며,{' '}
          <InlineCode>closable</InlineCode> prop으로 닫기 버튼을 추가할 수 있습니다.
        </p>
        <CodeBlock>{`import Badge from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              {
                name: 'type',
                type: "'dot' | 'dot-outline' | 'status' | 'status-round' | 'status-score' | 'icon' | 'outline' | 'fill' | 'alert' | 'step' | 'circle' | 'tag' | 'detail-tag'",
                desc: '뱃지 형태.',
              },
              {
                name: 'variant',
                type: "'red' | 'orange' | 'yellow' | 'green' | 'purple' | 'blue' | 'navy' | 'gray' | 'medium-gray' | 'light-blue' | 'pink'",
                desc: '색상. 토큰에 연결됩니다.',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '크기.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                required: true,
                desc: '뱃지 내용.',
              },
              {
                name: 'closable',
                type: 'boolean',
                desc: '닫기 버튼 표시 여부.',
              },
              {
                name: 'onRemove',
                type: '(e: MouseEvent) => void',
                desc: '닫기 버튼 클릭 콜백.',
              },
              {
                name: 'backgroundColor',
                type: 'string',
                desc: '인라인 배경색 override.',
              },
              {
                name: 'borderColor',
                type: 'string',
                desc: '인라인 테두리색 override.',
              },
              {
                name: 'color',
                type: 'string',
                desc: '인라인 텍스트색 override.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 요소에 추가할 CSS 클래스.',
              },
            ]}
          />
        </Card>
      </Section>

      {/* Type 섹션 */}
      <Section gap={24}>
        <SectionTitle>Type</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            FILL
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            배경을 채우는 기본 형태. 강조 레이블, 상태 표시에 적합합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="fill" color={c}>
                {c}
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            OUTLINE
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            테두리만 있는 형태. 덜 강조된 상태나 보조 레이블에 사용합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="outline" color={c}>
                {c}
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            STATUS / STATUS-ROUND
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            배경+텍스트 상태 색상 조합. 상태 레이블에 적합합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="status" color={c}>
                {c}
              </Badge>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="status-round" color={c}>
                {c}
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            STATUS-SCORE
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            숫자 점수를 원형 테두리로 강조합니다. 내부에 <InlineCode>{`<span className="score">`}</InlineCode>를
            사용합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="status-score" color={c}>
                <span className="score">77</span>
                Label
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            DOT / DOT-OUTLINE
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            텍스트 앞에 컬러 점을 표시합니다. 심각도 레이블에 적합합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="dot" color={c}>
                {c}
              </Badge>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="dot-outline" color={c}>
                {c}
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            TAG / DETAIL-TAG
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            태그 형태. <InlineCode>closable</InlineCode> prop과 함께 사용합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="tag" color={c}>
                {c}
              </Badge>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {(['red', 'orange', 'yellow', 'green', 'purple', 'blue', 'navy', 'gray'] as const).map((c) => (
              <Badge key={c} variant="detail-tag" color={c}>
                {c}
              </Badge>
            ))}
          </div>
          <p style={{ margin: '8px 0', fontSize: 12, color: t.textSecondary }}>closable 데모 — 클릭하여 제거:</p>
          <ClosableDemo />
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            ICON
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            아이콘 단독 또는 아이콘 + 텍스트 형태. SVG가 <InlineCode>currentColor</InlineCode>로 자동 채색됩니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="icon" color={c}>
                <XdrPropertyUserIcon />
                Label
              </Badge>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="icon" color={c}>
                <XdrPropertyUserIcon />
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            CIRCLE / STEP / ALERT
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            {ALL_COLORS.map((c) => (
              <Badge key={c} variant="circle" color={c}>
                {c.charAt(0).toUpperCase()}
              </Badge>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginTop: 12 }}>
            <Badge variant="step">Step 1</Badge>
            <Badge variant="alert">3</Badge>
            <Badge variant="alert" size="sm">
              9
            </Badge>
          </div>
        </Card>
      </Section>

      {/* Size 섹션 */}
      <Section gap={16}>
        <SectionTitle>Size</SectionTitle>
        <Card>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Badge variant="fill" color="blue" size={s}>
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
          <CodeBlock>{`// 기본 사용
<Badge variant="fill" color="green">완료</Badge>
<Badge variant="outline" color="orange">주의</Badge>
<Badge variant="status" color="red">오류</Badge>
<Badge variant="dot" color="blue">진행중</Badge>

// 닫기 가능한 태그
<Badge variant="tag" color="blue" closable onRemove={() => handleRemove(id)}>
  태그명
</Badge>

// 인라인 색상 override
<Badge variant="fill" backgroundColor="#7c3aed" color="#fff">커스텀</Badge>`}</CodeBlock>
        </Card>
      </Section>
    </DocPage>
  ),
}
