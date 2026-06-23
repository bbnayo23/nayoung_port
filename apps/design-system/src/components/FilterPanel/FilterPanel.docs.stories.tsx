import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { FilterPanel } from './FilterPanel'
import type { FilterPanelGroup } from './FilterPanel'

const meta = {
  title: 'StyleGuide/FilterPanel',
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
  success: vars.color.success,
  danger: vars.color.danger,
  info: vars.color.info,
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

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

const DocCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
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
      fontFamily: "'Fira Code','Consolas',monospace",
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
      wordBreak: 'break-word' as const,
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

const sampleGroups: FilterPanelGroup[] = [
  {
    id: 'assetGroup',
    label: '자산 그룹',
    count: 1000,
    defaultExpanded: true,
    items: [
      { value: 'user', label: 'User', count: 100 },
      { value: 'device', label: 'Device', count: 100 },
      { value: 'network', label: 'Network', count: 100 },
      { value: 'system', label: 'System', count: 200 },
    ],
  },
  {
    id: 'assetType',
    label: '자산 타입',
    count: 9999,
    items: [
      { value: 'server', label: 'Server', count: 4000 },
      { value: 'endpoint', label: 'Endpoint', count: 3000 },
      { value: 'cloud', label: 'Cloud', count: 2999 },
    ],
  },
  {
    id: 'assetName',
    label: '자산명',
    count: 9999,
    items: [
      { value: 'a1', label: 'asset-a1' },
      { value: 'a2', label: 'asset-a2' },
    ],
  },
  { id: 'assetId', label: '자산 ID', count: 9999, items: [] },
  { id: 'cso', label: '보안등급(CSO)', count: 9999, items: [] },
]

const groupsNoCount: FilterPanelGroup[] = sampleGroups.map((g) => ({
  ...g,
  count: undefined,
  items: g.items.map((i) => ({ ...i, count: undefined })),
}))

const DocumentationView = () => {
  // Controlled selection 데모
  const [selected, setSelected] = useState<Record<string, string[]>>({
    assetGroup: ['user', 'device'],
  })
  // Collapse 데모
  const [collapsed, setCollapsed] = useState(false)
  // Controlled search 데모
  const [searchValue, setSearchValue] = useState('')
  // Controlled expanded 데모
  const [expandedIds, setExpandedIds] = useState<string[]>(['assetType'])

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>FilterPanel</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          그룹 → 아이템 2단 계층을 체크박스로 다중 선택하는 사이드 필터 패널입니다. 그룹/전체 체크박스는 none · some ·
          all 3-state(부분 선택 시 indeterminate)로 동작하며, 내부 레이블 검색, 그룹 펼침/접힘, 패널 자체 collapse 를
          지원합니다. selected · searchValue · expandedIds · collapsed 는 모두 controlled/uncontrolled 양쪽으로 쓸 수
          있습니다.
        </p>
        <CodeBlock>{`import { FilterPanel } from '@nayoung-port/design-system/components/FilterPanel'
import type { FilterPanelGroup, FilterPanelItem } from '@nayoung-port/design-system/components/FilterPanel'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — FilterPanel</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'groups',
                type: 'FilterPanelGroup[]',
                desc: '필수. 렌더할 그룹 목록. 각 그룹은 id · label · items 와 선택적 count · defaultExpanded 를 가진다.',
              },
              {
                name: 'selected',
                type: 'Record<string, string[]>',
                desc: 'groupId → 선택된 item value 목록. 제공 시 controlled 모드(미제공 시 내부 state).',
              },
              {
                name: 'onChange',
                type: '(next: Record<string, string[]>) => void',
                desc: '선택이 바뀔 때 다음 전체 선택 맵을 전달한다.',
              },
              {
                name: 'searchValue',
                type: 'string',
                desc: '패널 내부 레이블 검색어. 제공 시 controlled 검색 모드.',
              },
              {
                name: 'onSearchChange',
                type: '(value: string) => void',
                desc: '검색 입력이 바뀔 때 호출된다.',
              },
              {
                name: 'collapsed',
                type: 'boolean',
                desc: 'true 면 패널을 좁은 strip(28px)으로 접고 열기 버튼만 노출한다.',
              },
              {
                name: 'onToggleCollapse',
                type: '() => void',
                desc: 'collapse 토글 버튼 클릭 시 호출. 미제공 시 헤더의 접기 버튼이 렌더되지 않는다.',
              },
              {
                name: 'expandedIds',
                type: 'string[]',
                desc: '펼쳐진 그룹 id 목록. 제공 시 controlled expanded 모드(미제공 시 defaultExpanded 기준 내부 state).',
              },
              {
                name: 'onExpandedChange',
                type: '(ids: string[]) => void',
                desc: '그룹 펼침/접힘이 바뀔 때 다음 id 목록을 전달한다.',
              },
              {
                name: 'title',
                type: 'string',
                defaultVal: "'필터'",
                desc: '헤더 제목. region aria-label 로도 사용된다.',
              },
              {
                name: 'showAll',
                type: 'boolean',
                defaultVal: 'true',
                desc: '목록 최상단 "전체" 3-state 행 노출 여부.',
              },
              {
                name: 'allLabel',
                type: 'string',
                defaultVal: "'전체'",
                desc: '전체 선택 행의 레이블.',
              },
              {
                name: 'searchPlaceholder',
                type: 'string',
                defaultVal: "'검색'",
                desc: '검색 입력 placeholder.',
              },
              {
                name: 'emptyText',
                type: 'string',
                defaultVal: "'결과가 없습니다'",
                desc: '검색 결과가 없을 때 표시할 텍스트.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 div 에 cx 로 병합되는 추가 클래스.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Type — FilterPanelGroup</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              { name: 'id', type: 'string', desc: '그룹 식별자. selected / expandedIds 맵의 키로 쓰인다.' },
              { name: 'label', type: 'string', desc: '그룹 표시 이름. 검색 대상이기도 하다.' },
              { name: 'count', type: 'number', desc: '그룹 우측에 표시할 카운트(천 단위 콤마 포맷). 미제공 시 숨김.' },
              { name: 'items', type: 'FilterPanelItem[]', desc: '그룹에 속한 선택 아이템들. 빈 배열이면 펼쳐도 행이 없다.' },
              {
                name: 'defaultExpanded',
                type: 'boolean',
                desc: 'uncontrolled 모드의 초기 펼침 여부.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Type — FilterPanelItem</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              { name: 'value', type: 'string', desc: '아이템 값. 그룹 내에서 고유하며 선택 목록에 담긴다.' },
              { name: 'label', type: 'string', desc: '아이템 표시 이름. 검색 대상이다.' },
              { name: 'count', type: 'number', desc: '아이템 우측 카운트(천 단위 콤마). 미제공 시 숨김.' },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>기본 사용 (uncontrolled)</SectionTitle>
        <CodeBlock>{`<FilterPanel groups={groups} />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', height: 380 }}>
            <FilterPanel groups={sampleGroups} />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>3-state 체크박스 (none · some · all)</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary, maxWidth: 600 }}>
          그룹/전체 체크박스는 자식 선택 상태를 집계해 3-state 로 표시됩니다. 일부만 선택되면 indeterminate(혼합),
          전부 선택되면 체크, 없으면 비움. 아래 패널은 "자산 그룹"의 User · Device 가 선택되어 그룹과 전체가 모두
          some 상태입니다.
        </p>
        <CodeBlock>{`<FilterPanel
  groups={groups}
  selected={{ assetGroup: ['user', 'device'] }}
  onChange={setSelected}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, height: 380 }}>
            <FilterPanel groups={sampleGroups} selected={selected} onChange={setSelected} />
            <pre
              style={{
                margin: 0,
                fontSize: 12,
                fontFamily: 'monospace',
                color: t.textSecondary,
                whiteSpace: 'pre-wrap',
              }}
            >
              {JSON.stringify(selected, null, 2)}
            </pre>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Controlled 검색 (searchValue · onSearchChange)</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary, maxWidth: 600 }}>
          검색어는 그룹 label 과 아이템 label 모두를 대소문자 무시로 매칭합니다. 매칭이 없으면 emptyText 행이
          나타납니다. 아래 입력은 패널 밖에서 검색 상태를 제어합니다.
        </p>
        <CodeBlock>{`<FilterPanel
  groups={groups}
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  searchPlaceholder="자산 검색"
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="외부에서 검색어 입력 (예: cloud)"
              style={{
                width: 280,
                padding: '6px 10px',
                fontSize: 13,
                color: t.text,
                background: t.bg,
                border: `1px solid ${t.border}`,
                borderRadius: t.radiusSm,
                outline: 'none',
              }}
            />
            <div style={{ display: 'flex', height: 380 }}>
              <FilterPanel
                groups={sampleGroups}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                searchPlaceholder="자산 검색"
              />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Controlled 펼침 (expandedIds · onExpandedChange)</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary, maxWidth: 600 }}>
          그룹 행 클릭(또는 Enter/Space)으로 펼침을 토글합니다. expandedIds 를 제공하면 펼침 상태를 외부에서
          제어할 수 있습니다.
        </p>
        <CodeBlock>{`<FilterPanel
  groups={groups}
  expandedIds={expandedIds}
  onExpandedChange={setExpandedIds}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, height: 380 }}>
            <FilterPanel groups={sampleGroups} expandedIds={expandedIds} onExpandedChange={setExpandedIds} />
            <div style={{ fontSize: 12, color: t.textSecondary }}>
              펼쳐진 그룹: <InlineCode>{JSON.stringify(expandedIds)}</InlineCode>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Collapse strip (collapsed · onToggleCollapse)</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary, maxWidth: 600 }}>
          collapsed 가 true 면 패널이 28px 좁은 strip 으로 접히고 열기 버튼(▶)만 남습니다. onToggleCollapse 를
          제공해야 헤더에 접기 버튼(◀)이 나타납니다.
        </p>
        <CodeBlock>{`<FilterPanel
  groups={groups}
  collapsed={collapsed}
  onToggleCollapse={() => setCollapsed((v) => !v)}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, height: 380, alignItems: 'flex-start' }}>
            <FilterPanel
              groups={sampleGroups}
              collapsed={collapsed}
              onToggleCollapse={() => setCollapsed((v) => !v)}
            />
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              style={{
                padding: '6px 12px',
                fontSize: 12,
                color: t.text,
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: t.radiusSm,
                cursor: 'pointer',
              }}
            >
              {collapsed ? '패널 펼치기' : '패널 접기'}
            </button>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>카운트 표시 / 미표시</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary, maxWidth: 600 }}>
          group.count · item.count 가 있으면 우측에 천 단위 콤마로 표시됩니다(왼쪽). count 를 모두 비우면 카운트가
          숨겨집니다(오른쪽).
        </p>
        <CodeBlock>{`// 카운트 있음
{ id: 'assetType', label: '자산 타입', count: 9999, items: [{ value: 'server', label: 'Server', count: 4000 }] }
// 카운트 없음
{ id: 'assetType', label: '자산 타입', items: [{ value: 'server', label: 'Server' }] }`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, height: 380 }}>
            <FilterPanel groups={sampleGroups} title="카운트 있음" />
            <FilterPanel groups={groupsNoCount} title="카운트 없음" />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>빈 결과 (emptyText)</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary, maxWidth: 600 }}>
          매칭되는 그룹/아이템이 없으면 emptyText 가 가운데 표시됩니다(검색어가 어떤 것과도 일치하지 않을 때).
        </p>
        <CodeBlock>{`<FilterPanel
  groups={groups}
  searchValue="존재하지않는검색어"
  emptyText="조건에 맞는 자산이 없습니다"
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', height: 200 }}>
            <FilterPanel
              groups={sampleGroups}
              searchValue="존재하지않는검색어"
              emptyText="조건에 맞는 자산이 없습니다"
            />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>커스텀 라벨 (title · allLabel · showAll)</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary, maxWidth: 600 }}>
          헤더 title, 전체 행 allLabel 을 바꾸거나 showAll=false 로 전체 행을 숨길 수 있습니다.
        </p>
        <CodeBlock>{`<FilterPanel groups={groups} title="자산 필터" allLabel="모두 선택" />
<FilterPanel groups={groups} showAll={false} />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, height: 380 }}>
            <FilterPanel groups={sampleGroups} title="자산 필터" allLabel="모두 선택" />
            <FilterPanel groups={sampleGroups} title="전체 행 없음" showAll={false} />
          </div>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
