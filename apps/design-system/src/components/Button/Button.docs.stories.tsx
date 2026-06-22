import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Button } from './Button'
import type { ButtonVariant, ButtonSize } from './Button.css'

const meta = {
  title: 'StyleGuide/Button',
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

// ── Story ─────────────────────────────────────────────────────────────────────

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger']
const SIZES: ButtonSize[] = ['sm', 'md', 'lg']

export const Documentation: Story = {
  render: () => {
    const [count, setCount] = useState(0)
    return (
      <DocPage>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Button</h1>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
            5가지 variant와 3가지 size를 지원하는 버튼 컴포넌트입니다. 로딩 스피너, 아이콘 슬롯, fullWidth를 내장합니다.
          </p>
          <CodeBlock>{`import { Button } from '@ds/components/Button'`}</CodeBlock>
        </div>

        {/* API */}
        <Section gap={16}>
          <SectionTitle>API</SectionTitle>
          <Card>
            <PropsTable
              rows={[
                {
                  name: 'variant',
                  type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
                  defaultVal: "'primary'",
                  desc: '버튼 스타일 변형',
                },
                {
                  name: 'size',
                  type: "'sm' | 'md' | 'lg'",
                  defaultVal: "'md'",
                  desc: '버튼 크기 — sm(h32) · md(h40) · lg(h48)',
                },
                {
                  name: 'loading',
                  type: 'boolean',
                  defaultVal: 'false',
                  desc: '로딩 스피너 표시. 클릭과 포인터 이벤트를 비활성화합니다.',
                },
                { name: 'fullWidth', type: 'boolean', defaultVal: 'false', desc: '부모 컨테이너 너비에 맞춥니다.' },
                {
                  name: 'disabled',
                  type: 'boolean',
                  defaultVal: 'false',
                  desc: '비활성 상태 — opacity 0.5, cursor not-allowed',
                },
                { name: 'leftIcon', type: 'ReactNode', desc: '텍스트 왼쪽에 표시할 아이콘 슬롯' },
                { name: 'rightIcon', type: 'ReactNode', desc: '텍스트 오른쪽에 표시할 아이콘 슬롯' },
              ]}
            />
          </Card>
        </Section>

        {/* Variants */}
        <Section gap={16}>
          <SectionTitle>Variant</SectionTitle>
          <Card>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              {VARIANTS.map((v) => (
                <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Button variant={v}>{v}</Button>
                  <InlineCode>{v}</InlineCode>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Sizes */}
        <Section gap={16}>
          <SectionTitle>Size</SectionTitle>
          <Card>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
              {SIZES.map((s) => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Button size={s}>Button</Button>
                  <InlineCode>{`size="${s}"`}</InlineCode>
                  <code style={{ fontSize: 10, color: t.textMuted, fontFamily: 'monospace' }}>
                    {s === 'sm' ? 'h-32 · 12px' : s === 'md' ? 'h-40 · 14px' : 'h-48 · 16px'}
                  </code>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* States */}
        <Section gap={16}>
          <SectionTitle>State</SectionTitle>
          <Card>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              {[
                { label: 'Default', props: {} },
                { label: 'Disabled', props: { disabled: true } },
                { label: 'Loading', props: { loading: true } },
              ].map(({ label, props }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Button {...(props as object)}>{label}</Button>
                  <InlineCode>{label.toLowerCase()}</InlineCode>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* With Icons */}
        <Section gap={16}>
          <SectionTitle>Icon 사용</SectionTitle>
          <CodeBlock>{`<Button leftIcon={<span>+</span>}>추가</Button>
<Button rightIcon={<span>→</span>} variant="outline">다음</Button>`}</CodeBlock>
          <Card>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <Button leftIcon={<span style={{ fontSize: 14 }}>+</span>}>추가</Button>
              <Button rightIcon={<span style={{ fontSize: 14 }}>→</span>} variant="outline">
                다음
              </Button>
              <Button leftIcon={<span style={{ fontSize: 14 }}>↓</span>} variant="secondary">
                다운로드
              </Button>
              <Button leftIcon={<span style={{ fontSize: 14 }}>+</span>} variant="ghost" size="sm">
                ghost sm
              </Button>
            </div>
          </Card>
        </Section>

        {/* Full Width */}
        <Section gap={16}>
          <SectionTitle>Full Width</SectionTitle>
          <CodeBlock>{`<Button fullWidth>Full Width Button</Button>`}</CodeBlock>
          <Card style={{ maxWidth: 360 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button fullWidth>primary fullWidth</Button>
              <Button fullWidth variant="secondary">
                secondary fullWidth
              </Button>
            </div>
          </Card>
        </Section>

        {/* Interactive */}
        <Section gap={16}>
          <SectionTitle>인터랙티브 예제</SectionTitle>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Button onClick={() => setCount((c) => c + 1)}>클릭</Button>
              <Button variant="secondary" onClick={() => setCount(0)}>
                초기화
              </Button>
              <code style={{ fontFamily: 'monospace', fontSize: 13, color: t.textSecondary }}>클릭 횟수: {count}</code>
            </div>
          </Card>
        </Section>
      </DocPage>
    )
  },
}
