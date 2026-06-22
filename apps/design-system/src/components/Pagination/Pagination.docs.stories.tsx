import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Pagination } from './Pagination'

const meta = {
  title: 'StyleGuide/Pagination',
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

const RequiredBadge = () => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 600,
      color: vars.color.danger,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CodeBlock>{code}</CodeBlock>
      <div>{children}</div>
    </div>
  </div>
)

const BasicDemo = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return <Pagination totalPages={10} currentPage={currentPage} onPageChange={setCurrentPage} />
}

const FirstLastDemo = () => {
  const [currentPage, setCurrentPage] = useState(5)
  return (
    <Pagination
      totalPages={10}
      currentPage={currentPage}
      showFirstLast
      onPageChange={setCurrentPage}
    />
  )
}

const DisabledDemo = () => (
  <Pagination totalPages={10} currentPage={3} disabled onPageChange={() => {}} />
)

const MaxDisplayDemo = () => {
  const [pages, setPages] = useState({ three: 5, five: 5, seven: 5 })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {([
        { key: 'three' as const, max: 3 },
        { key: 'five' as const, max: 5 },
        { key: 'seven' as const, max: 7 },
      ]).map(({ key, max }) => (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textSecondary }}>{`maxDisplay=${max}`}</span>
          <Pagination
            totalPages={20}
            currentPage={pages[key]}
            maxDisplay={max}
            onPageChange={(p) => setPages((prev) => ({ ...prev, [key]: p }))}
          />
        </div>
      ))}
    </div>
  )
}

export const Documentation: Story = {
  render: () => (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Pagination</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          테이블·목록 하단에 위치하는 페이지 탐색 컴포넌트입니다. <InlineCode>totalPages</InlineCode>·
          <InlineCode>currentPage</InlineCode>·<InlineCode>onPageChange</InlineCode> 세 props만으로 기본 동작하며,{' '}
          <InlineCode>showFirstLast</InlineCode>·<InlineCode>maxDisplay</InlineCode>·
          <InlineCode>disabled</InlineCode> 옵션으로 동작을 세부 조정할 수 있습니다.
        </p>
        <CodeBlock>{`import { Pagination } from './Pagination'`}</CodeBlock>
      </div>

      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'totalPages', type: 'number', required: true, desc: '총 페이지 수' },
              { name: 'currentPage', type: 'number', required: true, desc: '현재 활성 페이지 번호' },
              { name: 'onPageChange', type: '(page: number) => void', required: true, desc: '페이지 변경 콜백' },
              { name: 'maxDisplay', type: 'number', defaultVal: '5', desc: '가운데에 표시할 최대 페이지 버튼 수' },
              { name: 'showFirstLast', type: 'boolean', defaultVal: 'false', desc: '«·» 첫/마지막 페이지 이동 버튼 표시' },
              { name: 'showPrevNext', type: 'boolean', defaultVal: 'true', desc: '‹·› 이전/다음 페이지 버튼 표시' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '모든 버튼 비활성화 — fetching 중 사용' },
              { name: 'className', type: 'string', desc: '루트 nav 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>
      </Section>

      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 사용"
            desc="totalPages · currentPage · onPageChange 세 props만으로 동작합니다."
            code={`const [currentPage, setCurrentPage] = useState(1)

<Pagination
  totalPages={10}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>`}
          >
            <BasicDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="첫/마지막 버튼 표시"
            desc="showFirstLast를 활성화하면 «·» 버튼이 양쪽에 추가됩니다."
            code={`<Pagination
  totalPages={10}
  currentPage={currentPage}
  showFirstLast
  onPageChange={setCurrentPage}
/>`}
          >
            <FirstLastDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="maxDisplay — 표시 페이지 수 조정"
            desc="maxDisplay prop으로 가운데에 보이는 페이지 버튼 수를 조절합니다."
            code={`<Pagination totalPages={20} currentPage={p} maxDisplay={3} onPageChange={setP} />
<Pagination totalPages={20} currentPage={p} maxDisplay={5} onPageChange={setP} />
<Pagination totalPages={20} currentPage={p} maxDisplay={7} onPageChange={setP} />`}
          >
            <MaxDisplayDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="비활성화"
            desc="disabled prop을 전달하면 모든 버튼이 비활성화됩니다. 데이터 로딩 중에 활용하세요."
            code={`<Pagination totalPages={10} currentPage={3} disabled onPageChange={() => {}} />`}
          >
            <DisabledDemo />
          </Pattern>
        </Card>
      </Section>
    </DocPage>
  ),
}
