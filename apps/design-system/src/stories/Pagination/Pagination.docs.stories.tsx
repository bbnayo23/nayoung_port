import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Pagination from '../../components/Pagination'

const meta = {
  title: 'StyleGuide/Pagination',
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

const WithExtrasDemo = () => {
  const [state, setState] = useState({ sm: { page: 3, ipp: 50 }, md: { page: 3, ipp: 50 }, lg: { page: 3, ipp: 50 } })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textSecondary }}>{`size="${size}"`}</span>
          <Pagination
            totalPages={20}
            currentPage={state[size].page}
            totalItems={1000}
            itemsPerPage={state[size].ipp}
            itemsPerPageOptions={[50, 100, 200]}
            showPageInfo
            showPageJump
            showItemsPerPage
            size={size}
            onPageChange={(p) => setState((prev) => ({ ...prev, [size]: { ...prev[size], page: p } }))}
            onItemsPerPageChange={(ipp) => setState((prev) => ({ ...prev, [size]: { ...prev[size], ipp } }))}
          />
        </div>
      ))}
    </div>
  )
}

const SizesDemo = () => {
  const [pages, setPages] = useState({ sm: 2, md: 2, lg: 2 })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Pagination
          key={size}
          totalPages={10}
          currentPage={pages[size]}
          size={size}
          onPageChange={(p) => setPages((prev) => ({ ...prev, [size]: p }))}
        />
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
          <InlineCode>showPageInfo</InlineCode>·<InlineCode>showPageJump</InlineCode>·
          <InlineCode>showItemsPerPage</InlineCode> 옵션으로 확장할 수 있습니다.
        </p>
        <CodeBlock>{`import Pagination from '@port/design-system'`}</CodeBlock>
      </div>

      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'totalPages', type: 'number', required: true, desc: '총 페이지 수' },
              { name: 'currentPage', type: 'number', required: true, desc: '현재 활성 페이지 번호' },
              { name: 'onPageChange', type: '(page: number) => void', required: true, desc: '페이지 변경 콜백' },
              { name: 'maxDisplay', type: 'number', defaultVal: '5', desc: '한 번에 표시할 페이지 버튼 수' },
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", desc: '크기 variant' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '전체 비활성화' },
              { name: 'showFirstLast', type: 'boolean', defaultVal: 'false', desc: '첫/마지막 페이지 이동 버튼 표시' },
              { name: 'showPrevNext', type: 'boolean', defaultVal: 'true', desc: '이전/다음 버튼 표시' },
              {
                name: 'showPageInfo',
                type: 'boolean',
                defaultVal: 'false',
                desc: '현재 페이지 / 전체 페이지 정보 텍스트 표시',
              },
              { name: 'showPageJump', type: 'boolean', defaultVal: 'false', desc: '페이지 직접 입력 input 표시' },
              {
                name: 'showItemsPerPage',
                type: 'boolean',
                defaultVal: 'false',
                desc: '페이지당 항목 수 드롭다운 표시',
              },
              { name: 'totalItems', type: 'number', desc: '전체 항목 수 — showPageInfo와 함께 사용' },
              { name: 'itemsPerPage', type: 'number', desc: '현재 페이지당 항목 수' },
              {
                name: 'itemsPerPageOptions',
                type: 'number[]',
                desc: '페이지당 항목 수 선택 목록 (예: [50, 100, 200])',
              },
              { name: 'onItemsPerPageChange', type: '(n: number) => void', desc: '페이지당 항목 수 변경 콜백' },
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
            code={`const [currentPage, setCurrentPage] = useState(1);

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
            title="확장 기능"
            desc="showPageInfo · showPageJump · showItemsPerPage를 함께 사용해 풀 기능 페이지네이션 바를 구성합니다."
            code={`<Pagination
  totalPages={20}
  currentPage={currentPage}
  totalItems={1000}
  itemsPerPage={itemsPerPage}
  itemsPerPageOptions={[50, 100, 200]}
  showPageInfo
  showPageJump
  showItemsPerPage
  onPageChange={setCurrentPage}
  onItemsPerPageChange={setItemsPerPage}
/>`}
          >
            <WithExtrasDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="크기 비교"
            desc="size prop으로 sm · md · lg를 선택합니다."
            code={`<Pagination totalPages={10} currentPage={p} size="sm" onPageChange={setP} />
<Pagination totalPages={10} currentPage={p} size="md" onPageChange={setP} />
<Pagination totalPages={10} currentPage={p} size="lg" onPageChange={setP} />`}
          >
            <SizesDemo />
          </Pattern>
        </Card>
      </Section>
    </DocPage>
  ),
}
