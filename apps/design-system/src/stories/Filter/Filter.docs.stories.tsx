import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Filter from '../../components/Filter'
import Checkbox from '../../components/Checkbox'
import Input from '../../components/Input'

const meta = {
  title: 'StyleGuide/Filter',
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
      <div style={{ minHeight: 300 }}>{children}</div>
    </div>
  </div>
)

// ── Demo data ─────────────────────────────────────────────────────────────────

const DEMO_GROUPS = [
  {
    id: 'status',
    label: '상태',
    items: [
      { value: 'active', label: '활성', count: 150 },
      { value: 'inactive', label: '비활성', count: 100 },
      { value: 'maintenance', label: '점검중', count: 50 },
    ],
  },
  {
    id: 'type',
    label: '데이터 유형',
    items: [
      { value: 'server', label: '서버', count: 120 },
      { value: 'network', label: '네트워크', count: 100 },
      { value: 'security', label: '보안', count: 80 },
    ],
  },
]

const SimpleFilterDemo = () => {
  const [checked, setChecked] = useState<Record<string, Set<string>>>({})
  const [collapsed, setCollapsed] = useState(false)

  const toggle = (gid: string, value: string) =>
    setChecked((prev) => {
      const s = new Set(prev[gid] ?? [])
      s.has(value) ? s.delete(value) : s.add(value)
      return { ...prev, [gid]: s }
    })

  return (
    <div style={{ display: 'flex', height: 320 }}>
      <Filter collapsed={collapsed} onCollapse={() => setCollapsed(true)} title="필터">
        <Filter.Content>
          <Filter.Categories>
            {DEMO_GROUPS.map((g) => (
              <div key={g.id} style={{ padding: '6px 0', borderBottom: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, marginBottom: 4 }}>{g.label}</div>
                {g.items.map((item) => (
                  <div key={item.value} style={{ display: 'flex', alignItems: 'center', padding: '2px 0' }}>
                    <Checkbox
                      label={item.label}
                      checked={(checked[g.id] ?? new Set()).has(item.value)}
                      onChange={() => toggle(g.id, item.value)}
                    />
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: t.textMuted }}>{item.count}</span>
                  </div>
                ))}
              </div>
            ))}
          </Filter.Categories>
        </Filter.Content>
      </Filter>
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={{
            margin: 8,
            padding: '4px 8px',
            fontSize: 12,
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: t.radiusSm,
            color: t.text,
            cursor: 'pointer',
          }}
        >
          열기
        </button>
      )}
    </div>
  )
}

const SearchFilterDemo = () => {
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState<Record<string, Set<string>>>({})

  const toggle = (gid: string, value: string) =>
    setChecked((prev) => {
      const s = new Set(prev[gid] ?? [])
      s.has(value) ? s.delete(value) : s.add(value)
      return { ...prev, [gid]: s }
    })

  return (
    <div style={{ display: 'flex', height: 340 }}>
      <Filter collapsed={false} onCollapse={() => {}} title="필터">
        <Filter.Search>
          <Input
            placeholder="항목 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            showClearButton={!!search}
            onClear={() => setSearch('')}
          />
        </Filter.Search>
        <Filter.Content>
          <Filter.Categories>
            {DEMO_GROUPS.map((g) => {
              const filtered = search
                ? g.items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
                : g.items
              if (filtered.length === 0) return null
              return (
                <div key={g.id} style={{ padding: '6px 0', borderBottom: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, marginBottom: 4 }}>
                    {g.label}
                  </div>
                  {filtered.map((item) => (
                    <Checkbox
                      key={item.value}
                      label={item.label}
                      checked={(checked[g.id] ?? new Set()).has(item.value)}
                      onChange={() => toggle(g.id, item.value)}
                    />
                  ))}
                </div>
              )
            })}
          </Filter.Categories>
        </Filter.Content>
      </Filter>
    </div>
  )
}

const SelectAllDemo = () => {
  const allItems = DEMO_GROUPS.flatMap((g) => g.items.map((i) => ({ gid: g.id, value: i.value })))
  const [checked, setChecked] = useState<Record<string, Set<string>>>({})

  const totalSelected = Object.values(checked).reduce((s, v) => s + v.size, 0)
  const isAll = totalSelected === allItems.length && allItems.length > 0
  const isSome = totalSelected > 0 && !isAll

  const toggleAll = () => {
    if (totalSelected > 0) {
      setChecked({})
    } else {
      const all: Record<string, Set<string>> = {}
      DEMO_GROUPS.forEach((g) => {
        all[g.id] = new Set(g.items.map((i) => i.value))
      })
      setChecked(all)
    }
  }

  const toggle = (gid: string, value: string) =>
    setChecked((prev) => {
      const s = new Set(prev[gid] ?? [])
      s.has(value) ? s.delete(value) : s.add(value)
      return { ...prev, [gid]: s }
    })

  return (
    <div style={{ display: 'flex', height: 340 }}>
      <Filter collapsed={false} onCollapse={() => {}} title="필터">
        <Filter.Content>
          <Filter.SelectAll>
            <Checkbox
              label={`전체 (${totalSelected}/${allItems.length})`}
              checked={isAll}
              indeterminate={isSome}
              onChange={toggleAll}
            />
          </Filter.SelectAll>
          <Filter.Categories>
            {DEMO_GROUPS.map((g) => (
              <div key={g.id} style={{ padding: '6px 0', borderBottom: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, marginBottom: 4 }}>{g.label}</div>
                {g.items.map((item) => (
                  <Checkbox
                    key={item.value}
                    label={item.label}
                    checked={(checked[g.id] ?? new Set()).has(item.value)}
                    onChange={() => toggle(g.id, item.value)}
                  />
                ))}
              </div>
            ))}
          </Filter.Categories>
        </Filter.Content>
      </Filter>
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
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Filter</h1>
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
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          카테고리별 다중 선택을 지원하는 사이드 필터 패널입니다. <InlineCode>Filter.Search</InlineCode> ·{' '}
          <InlineCode>Filter.Content</InlineCode> · <InlineCode>Filter.SelectAll</InlineCode> ·{' '}
          <InlineCode>Filter.Categories</InlineCode> 컴파운드 패턴으로 구성하며 접기/펼치기가 가능합니다.
        </p>
        <CodeBlock>{`import Filter from "@port/design-system"`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            FILTER
          </p>
          <PropsTable
            rows={[
              { name: 'title', type: 'string', defaultVal: "'필터'", desc: '필터 패널 상단 타이틀' },
              { name: 'collapsed', type: 'boolean', defaultVal: 'false', desc: '접힌 상태 여부 (controlled)' },
              { name: 'onCollapse', type: '() => void', required: true, desc: '접기 버튼 클릭 시 호출되는 콜백' },
              { name: 'children', type: 'ReactNode', desc: 'Filter.Search · Filter.Content 등 서브 컴포넌트' },
              { name: 'className', type: 'string', desc: '루트 래퍼에 추가할 CSS 클래스' },
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
                {['컴포넌트', '역할'].map((h) => (
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
                ['Filter.Search', '검색 입력 영역 (SearchBar 등 배치)'],
                ['Filter.Content', '필터 본문 래퍼 — SelectAll · Categories를 감쌉니다'],
                ['Filter.SelectAll', '전체 선택 체크박스 영역'],
                ['Filter.Categories', '카테고리 목록 스크롤 영역'],
              ].map(([name, desc]) => (
                <tr key={name} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: '10px 12px' }}>
                    <InlineCode>{name}</InlineCode>
                  </td>
                  <td style={{ padding: '10px 12px', color: t.textSecondary }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      {/* Usage patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="기본 (카테고리 체크박스)"
            desc="Filter.Content > Filter.Categories 안에 카테고리 목록을 배치합니다. 접기 버튼으로 collapsed 상태를 제어합니다."
            code={`const [collapsed, setCollapsed] = useState(false);

<Filter
  collapsed={collapsed}
  onCollapse={() => setCollapsed(true)}
  title="필터"
>
  <Filter.Content>
    <Filter.Categories>
      {/* 카테고리 목록 */}
    </Filter.Categories>
  </Filter.Content>
</Filter>`}
          >
            <SimpleFilterDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="검색 포함"
            desc="Filter.Search 안에 검색 입력을 배치하면 필터 상단에 검색 영역이 추가됩니다. 검색 상태는 호출자가 관리합니다."
            code={`const [search, setSearch] = useState("");

<Filter collapsed={false} onCollapse={() => {}} title="필터">
  <Filter.Search>
    <Input
      placeholder="항목 검색..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      showClearButton={!!search}
      onClear={() => setSearch("")}
    />
  </Filter.Search>
  <Filter.Content>
    <Filter.Categories>
      {filteredGroups.map(...)}
    </Filter.Categories>
  </Filter.Content>
</Filter>`}
          >
            <SearchFilterDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="전체 선택 포함"
            desc="Filter.SelectAll로 전체 선택/해제를 구현합니다. indeterminate(중간) 상태는 ref로 직접 설정합니다."
            code={`const isAll = totalSelected === allItems.length;
const isSome = totalSelected > 0 && !isAll;

<Filter.SelectAll>
  <Checkbox
    label="전체"
    checked={isAll}
    indeterminate={isSome}
    onChange={toggleAll}
  />
</Filter.SelectAll>`}
          >
            <SelectAllDemo />
          </Pattern>
        </Card>
      </Section>
    </DocPage>
  ),
}
