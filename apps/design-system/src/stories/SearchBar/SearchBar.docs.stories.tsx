import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import { SearchBar } from '../../components/SearchBar'

const meta = {
  title: 'StyleGuide/SearchBar',
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
      <CodeBlock>{code}</CodeBlock>
      <div>{children}</div>
    </div>
  </div>
)

const BasicDemo = () => {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<string | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SearchBar value={value} onChange={setValue} onSearch={(v) => setResult(v)} onClear={() => setResult(null)} />
      {result !== null && (
        <span style={{ fontSize: 11, color: t.textSecondary }}>
          검색: <strong>{result || '(빈 값)'}</strong>
        </span>
      )}
    </div>
  )
}

const ExpandableDemo = () => {
  const [value, setValue] = useState('')
  return <SearchBar value={value} onChange={setValue} expandable placeholder="확장 버튼을 클릭하세요" />
}

const WithSlotsDemo = () => {
  const [value, setValue] = useState('')
  return (
    <SearchBar
      value={value}
      onChange={setValue}
      searchLabel="검색"
      prefix={
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '1px 5px',
            background: 'rgba(0,183,153,0.12)',
            color: t.primary,
            borderRadius: 3,
          }}
        >
          AI
        </span>
      }
      leftOuterActions={
        <button
          type="button"
          style={{
            padding: '4px 10px',
            fontSize: 12,
            border: `1px solid ${t.border}`,
            borderRadius: 4,
            background: t.surface,
            color: t.text,
            cursor: 'pointer',
          }}
        >
          + 추가
        </button>
      }
    />
  )
}

export const Documentation: Story = {
  render: () => (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>SearchBar</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          검색 입력 컴포넌트입니다. 제어(controlled) · 비제어(uncontrolled) 모드를 모두 지원하며,{' '}
          <InlineCode>prefix</InlineCode> · <InlineCode>leftActions</InlineCode> ·{' '}
          <InlineCode>suffixActions</InlineCode> · <InlineCode>rightActions</InlineCode> 등 다양한 슬롯으로 확장
          가능합니다. <InlineCode>expandable</InlineCode> 모드에서는 textarea로 전환됩니다.
        </p>
        <CodeBlock>{`import { SearchBar } from '@port/design-system'`}</CodeBlock>
      </div>

      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'value', type: 'string', desc: '제어 모드 값. 미지정 시 uncontrolled.' },
              { name: 'defaultValue', type: 'string', defaultVal: "''", desc: '비제어 모드 초기값' },
              {
                name: 'onChange',
                type: '(value: string) => void',
                desc: '입력 변경 콜백 — 문자열 값을 직접 전달합니다.',
              },
              { name: 'onSearch', type: '(value: string) => void', desc: '검색 실행 콜백 (검색 버튼 클릭 또는 Enter)' },
              { name: 'onClear', type: '() => void', desc: 'X 버튼 클릭 시 콜백' },
              {
                name: 'placeholder',
                type: 'string',
                defaultVal: "'검색어를 입력하세요'",
                desc: '입력 필드 플레이스홀더',
              },
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", desc: '크기 variant' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '전체 비활성화' },
              { name: 'hideButton', type: 'boolean', defaultVal: 'false', desc: '검색 버튼 숨김 여부' },
              { name: 'searchLabel', type: 'string', desc: '검색 버튼 aria-label 및 아이콘 옆 표시 텍스트' },
              {
                name: 'expandable',
                type: 'boolean',
                defaultVal: 'false',
                desc: '확장 버튼 표시. 클릭 시 textarea 모드로 전환.',
              },
              { name: 'expanded', type: 'boolean', desc: '확장 상태 제어 (controlled). 미지정 시 내부 상태 사용.' },
              { name: 'onExpandChange', type: '(expanded: boolean) => void', desc: '확장 상태 변경 콜백' },
              { name: 'prefix', type: 'ReactNode', desc: '입력 앞 슬롯 (예: AI 배지)' },
              {
                name: 'onPrefixClick',
                type: '() => void',
                desc: 'prefix 클릭 콜백. 지정 시 prefix가 button으로 렌더.',
              },
              { name: 'leftOuterActions', type: 'ReactNode', desc: 'SearchBar 외부 왼쪽 슬롯 (예: + 추가 버튼)' },
              { name: 'leftActions', type: 'ReactNode', desc: '입력 내부 왼쪽 슬롯 (예: 검색 태그)' },
              { name: 'suffixActions', type: 'ReactNode', desc: '검색 버튼 앞 슬롯 (예: 정렬/필터 아이콘)' },
              { name: 'rightActions', type: 'ReactNode', desc: 'SearchBar 외부 오른쪽 슬롯 (예: 일시정지 버튼)' },
            ]}
          />
        </Card>
      </Section>

      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 검색"
            desc="value · onChange · onSearch 조합으로 동작합니다. Enter 키 또는 검색 버튼 클릭 시 onSearch가 호출됩니다."
            code={`const [value, setValue] = useState('');

<SearchBar
  value={value}
  onChange={setValue}
  onSearch={(v) => fetchResults(v)}
  onClear={() => clearResults()}
/>`}
          >
            <BasicDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="확장 모드 (Expandable)"
            desc="expandable prop을 추가하면 확장 버튼이 나타납니다. 클릭 시 textarea로 전환되어 복잡한 쿼리를 입력할 수 있습니다."
            code={`<SearchBar
  value={value}
  onChange={setValue}
  expandable
  placeholder="확장 버튼을 클릭하세요"
/>`}
          >
            <ExpandableDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="슬롯 조합"
            desc="prefix · leftOuterActions · searchLabel 등의 슬롯을 조합해 풍부한 검색 UI를 구성합니다."
            code={`<SearchBar
  value={value}
  onChange={setValue}
  searchLabel="검색"
  prefix={<AIBadge />}
  leftOuterActions={<AddButton />}
/>`}
          >
            <WithSlotsDemo />
          </Pattern>
        </Card>
      </Section>

      <Section gap={16}>
        <SectionTitle>크기 비교</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.textMuted }}>{`size="${size}"`}</span>
                <SearchBar size={size} placeholder={`${size} 검색`} />
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
