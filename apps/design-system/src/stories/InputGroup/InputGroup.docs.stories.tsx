import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import InputGroup from '../../components/InputGroup'

const meta = {
  title: 'StyleGuide/InputGroup',
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
        maxWidth: 880,
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

const RequiredBadge = () => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 600,
      color: vars.color.error,
      background: 'rgba(240,62,62,0.08)',
      borderRadius: 3,
      padding: '1px 5px',
      marginLeft: 4,
    }}
  >
    required
  </span>
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
            {row.required && <RequiredBadge />}
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

// ── Demos ─────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const FormFieldDemo = () => {
  const [url, setUrl] = useState('')
  return (
    <InputGroup.FormField>
      <InputGroup.Label required>서버 주소</InputGroup.Label>
      <InputGroup size="sm">
        <InputGroup.Text>https://</InputGroup.Text>
        <InputGroup.Input placeholder="example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
        <InputGroup.Button variant="primary">확인</InputGroup.Button>
      </InputGroup>
      <InputGroup.HelperText>접속할 서버의 주소를 입력하세요.</InputGroup.HelperText>
    </InputGroup.FormField>
  )
}

const ValidationDemo = () => {
  const [ip, setIp] = useState('')
  const isValid = /^\d{1,3}(\.\d{1,3}){3}$/.test(ip)
  const variant = ip.length > 0 ? (isValid ? 'success' : 'error') : 'default'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <InputGroup variant={variant} size="sm">
        <InputGroup.Input placeholder="192.168.0.1" value={ip} onChange={(e) => setIp(e.target.value)} />
        <InputGroup.Button>조회</InputGroup.Button>
      </InputGroup>
      <InputGroup.HelperText variant={variant}>
        {ip.length > 0
          ? isValid
            ? '유효한 IP 주소입니다.'
            : '올바른 IP 형식으로 입력하세요.'
          : 'IP 주소를 입력하세요.'}
      </InputGroup.HelperText>
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
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>InputGroup</h1>
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
            COMPOUND
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 640 }}>
          입력 필드(<InlineCode>Input</InlineCode>), 텍스트 애드온(<InlineCode>Text</InlineCode>), 아이콘(
          <InlineCode>Icon</InlineCode>), 버튼(<InlineCode>Button</InlineCode>)을 가로로 결합하는 컴포넌트입니다.
          Context 기반으로 하위 컴포넌트에 <InlineCode>size</InlineCode>를 자동으로 전달하며,
          <InlineCode>FormField</InlineCode>로 라벨·도움말까지 하나의 단위로 구성할 수 있습니다.
        </p>
        <CodeBlock>{`import InputGroup from "@port/design-system"`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            INPUTGROUP
          </p>
          <PropsTable
            rows={[
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '그룹 크기 — Context로 모든 하위 컴포넌트에 자동 전달',
              },
              {
                name: 'variant',
                type: "'default' | 'error' | 'success' | 'warning'",
                defaultVal: "'default'",
                desc: '상태 variant — 테두리 색상에 반영',
              },
              { name: 'fullWidth', type: 'boolean', defaultVal: 'false', desc: '컨테이너 너비에 맞춤' },
              { name: 'className', type: 'string', desc: '루트 div에 추가할 CSS 클래스' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            서브 컴포넌트
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: t.surfaceHover }}>
                {['컴포넌트', '역할', '주요 Props'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '8px 12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: 12,
                      color: t.textSecondary,
                      borderBottom: `1px solid ${t.border}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['InputGroup.Input', '입력 필드 (flex: 1로 확장)', 'HTML input 속성 모두 지원'],
                ['InputGroup.Button', '버튼 (기본 variant: secondary)', "variant: 'primary' | 'secondary' | 'ghost'"],
                ['InputGroup.Text', '정적 텍스트/라벨 애드온', '—'],
                ['InputGroup.Icon', '아이콘 슬롯', "position: 'left' | 'right' | 'middle'"],
                ['InputGroup.Label', '폼 라벨', 'required: boolean'],
                ['InputGroup.HelperText', '도움말/오류 텍스트', "variant: 'default' | 'error' | 'success' | 'warning'"],
                [
                  'InputGroup.FormField',
                  'Label + InputGroup + HelperText 래퍼',
                  "direction: 'vertical' | 'horizontal'",
                ],
              ].map(([name, role, props]) => (
                <tr key={name} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                    <InlineCode>{name}</InlineCode>
                  </td>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top', color: t.textSecondary }}>{role}</td>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top', color: t.textMuted, fontSize: 12 }}>
                    {props}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      {/* Patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 (텍스트 + 입력 + 버튼)"
            desc="가장 일반적인 조합입니다. Text로 프로토콜/단위를 붙이고 Button으로 액션을 추가합니다."
            code={`<InputGroup>
  <InputGroup.Text>https://</InputGroup.Text>
  <InputGroup.Input placeholder="도메인 입력" />
  <InputGroup.Button>확인</InputGroup.Button>
</InputGroup>`}
          >
            <InputGroup>
              <InputGroup.Text>https://</InputGroup.Text>
              <InputGroup.Input placeholder="도메인 입력" />
              <InputGroup.Button>확인</InputGroup.Button>
            </InputGroup>
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="FormField 레이아웃"
            desc="InputGroup.FormField로 Label, InputGroup, HelperText를 하나의 폼 필드 단위로 구성합니다. required prop으로 필수 표시(*)를 추가할 수 있습니다."
            code={`<InputGroup.FormField>
  <InputGroup.Label required>서버 주소</InputGroup.Label>
  <InputGroup size="sm">
    <InputGroup.Text>https://</InputGroup.Text>
    <InputGroup.Input placeholder="example.com" />
    <InputGroup.Button variant="primary">확인</InputGroup.Button>
  </InputGroup>
  <InputGroup.HelperText>
    접속할 서버의 주소를 입력하세요.
  </InputGroup.HelperText>
</InputGroup.FormField>`}
          >
            <FormFieldDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="유효성 검사 연동"
            desc="InputGroup variant와 HelperText variant를 동시에 제어하여 실시간 입력 피드백을 구현합니다."
            code={`const isValid = /^\d{1,3}(\.\d{1,3}){3}$/.test(ip);
const variant = ip ? (isValid ? "success" : "error") : "default";

<InputGroup variant={variant} size="sm">
  <InputGroup.Input value={ip} onChange={...} />
  <InputGroup.Button>조회</InputGroup.Button>
</InputGroup>
<InputGroup.HelperText variant={variant}>
  {isValid ? "유효한 IP입니다." : "형식을 확인하세요."}
</InputGroup.HelperText>`}
          >
            <ValidationDemo />
          </Pattern>
        </Card>
      </Section>

      {/* Compositions showcase */}
      <Section gap={16}>
        <SectionTitle>조합 예시</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420 }}>
            {[
              {
                label: '아이콘 접두',
                node: (
                  <InputGroup>
                    <InputGroup.Icon position="left">
                      <SearchIcon />
                    </InputGroup.Icon>
                    <InputGroup.Input placeholder="검색..." />
                  </InputGroup>
                ),
              },
              {
                label: '좌우 텍스트 애드온',
                node: (
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <InputGroup.Input placeholder="금액 입력" />
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup>
                ),
              },
              {
                label: '접미 도메인',
                node: (
                  <InputGroup>
                    <InputGroup.Input placeholder="사용자명" />
                    <InputGroup.Text>@example.com</InputGroup.Text>
                  </InputGroup>
                ),
              },
            ].map(({ label, node }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>{label}</span>
                {node}
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Size showcase */}
      <Section gap={16}>
        <SectionTitle>Size</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420 }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>{`size="${s}"`}</span>
                <InputGroup size={s}>
                  <InputGroup.Input placeholder="검색어를 입력하세요" />
                  <InputGroup.Button variant="primary">검색</InputGroup.Button>
                </InputGroup>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
