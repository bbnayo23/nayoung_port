import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Filter from '@dc/components/Filter'
import type { FilterGroup, FilterItem } from '@dc/components/Filter'
import Input from '@dc/components/Input'
import Accordion from '@dc/components/Accordion'
import Checkbox from '@dc/components/Checkbox'
import IconButton from '@dc/components/IconButton'
import { XdrChevronRightIcon } from '@port/icon-library'

const meta = {
  title: 'StyleGuide/Filter',
  component: Filter,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: '필터 패널 타이틀', table: { category: 'Content' } },
    collapsed: { control: 'boolean', description: '접힌 상태', table: { category: 'State' } },
    onCollapse: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: { title: '필터', collapsed: false, onCollapse: () => {} },
} satisfies Meta<typeof Filter>

export default meta
type Story = StoryObj<typeof meta>

// ── 공통 데이터 ───────────────────────────────────────────────────────────────

const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'status',
    label: '상태',
    count: 300,
    items: [
      { value: 'active', label: '활성', count: 150 },
      { value: 'inactive', label: '비활성', count: 100 },
      { value: 'maintenance', label: '점검중', count: 50 },
    ],
  },
  {
    id: 'dataType',
    label: '데이터 유형',
    count: 600,
    defaultExpanded: true,
    items: [
      { value: 'server', label: '서버', count: 120 },
      { value: 'network', label: '네트워크', count: 100 },
      { value: 'database', label: '데이터베이스', count: 90 },
      { value: 'application', label: '애플리케이션', count: 130 },
      { value: 'security', label: '보안', count: 80 },
      { value: 'storage', label: '스토리지', count: 80 },
    ],
  },
  {
    id: 'integration',
    label: '연동방식',
    count: 400,
    items: [
      { value: 'api', label: 'API', count: 150 },
      { value: 'agent', label: 'Agent', count: 100 },
      { value: 'syslog', label: 'Syslog', count: 80 },
      { value: 'snmp', label: 'SNMP', count: 70 },
    ],
  },
  {
    id: 'vendor',
    label: '제조사',
    count: 500,
    items: [
      { value: 'cisco', label: 'Cisco', count: 200 },
      { value: 'palo-alto', label: 'Palo Alto', count: 150 },
      { value: 'fortinet', label: 'Fortinet', count: 150 },
    ],
  },
  {
    id: 'env',
    label: '환경',
    count: 400,
    items: [
      { value: 'on-premise', label: 'On-premise', count: 200 },
      { value: 'cloud', label: 'Cloud', count: 200 },
    ],
  },
]

// ── 공통 훅 ───────────────────────────────────────────────────────────────────

const useFilterState = () => {
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState<Record<string, Set<string>>>({})
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(['dataType']))

  const toggleGroup = (id: string, open: boolean) =>
    setOpenGroups((prev) => {
      const s = new Set(prev)
      if (open) s.add(id)
      else s.delete(id)
      return s
    })

  const toggleItem = (groupId: string, value: string) => {
    setChecked((prev) => {
      const set = new Set(prev[groupId] ?? [])
      if (set.has(value)) set.delete(value)
      else set.add(value)
      return { ...prev, [groupId]: set }
    })
  }

  const toggleGroupAll = (group: FilterGroup, filtered: FilterItem[]) => {
    const groupChecked = checked[group.id] ?? new Set<string>()
    const allChecked = filtered.every((i) => groupChecked.has(i.value))
    setChecked((prev) => ({
      ...prev,
      [group.id]: allChecked ? new Set() : new Set(filtered.map((i) => i.value)),
    }))
  }

  const totalItems = FILTER_GROUPS.reduce((sum, g) => sum + g.items.length, 0)
  const totalSelected = Object.values(checked).reduce((sum, s) => sum + s.size, 0)
  const isAllSelected = totalSelected === totalItems && totalItems > 0
  const isSomeSelected = totalSelected > 0 && !isAllSelected

  const toggleAll = () => {
    if (Object.values(checked).some((s) => s.size > 0)) {
      setChecked({})
    } else {
      const all: Record<string, Set<string>> = {}
      FILTER_GROUPS.forEach((g) => {
        all[g.id] = new Set(g.items.map((i) => i.value))
      })
      setChecked(all)
    }
  }

  return {
    search,
    setSearch,
    checked,
    openGroups,
    toggleGroup,
    toggleItem,
    toggleGroupAll,
    isAllSelected,
    isSomeSelected,
    toggleAll,
  }
}

// ── Default ───────────────────────────────────────────────────────────────────

/** 검색 · 전체선택 · Accordion 카테고리 체크박스가 모두 연동되는 인터랙티브 예제입니다. */
export const Default: Story = {
  render: () => {
    const {
      search,
      setSearch,
      checked,
      openGroups,
      toggleGroup,
      toggleItem,
      toggleGroupAll,
      isAllSelected,
      isSomeSelected,
      toggleAll,
    } = useFilterState()

    return (
      <div style={{ height: 560, display: 'flex' }}>
        <Filter title="필터" onCollapse={() => {}}>
          <Filter.Search>
            <Input
              placeholder="검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              showClearButton={!!search}
              onClear={() => setSearch('')}
            />
          </Filter.Search>
          <Filter.Content>
            <Filter.SelectAll>
              <Checkbox label="전체" checked={isAllSelected} indeterminate={isSomeSelected} onChange={toggleAll} />
            </Filter.SelectAll>
            <Filter.Categories>
              {FILTER_GROUPS.map((group) => {
                const filtered = search
                  ? group.items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
                  : group.items
                if (filtered.length === 0) return null
                const groupChecked = checked[group.id] ?? new Set<string>()
                const groupAllChecked = filtered.every((i) => groupChecked.has(i.value))
                const groupSomeChecked = filtered.some((i) => groupChecked.has(i.value)) && !groupAllChecked

                return (
                  <Accordion key={group.id} iconDirection="left">
                    <Accordion.Item active={openGroups.has(group.id)} onChange={(open) => toggleGroup(group.id, open)}>
                      <Accordion.Header>
                        <span onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={groupAllChecked}
                            indeterminate={groupSomeChecked}
                            onChange={() => toggleGroupAll(group, filtered)}
                          />
                        </span>
                        <span>{group.label}</span>
                        {group.count !== undefined && <span className="filter-groups-count">{group.count}</span>}
                      </Accordion.Header>
                      <Accordion.Content>
                        <div className="filter-groups-list">
                          {filtered.map((item) => (
                            <div key={item.value} className="filter-item-row">
                              <Checkbox
                                label={item.label}
                                checked={groupChecked.has(item.value)}
                                onChange={() => toggleItem(group.id, item.value)}
                              />
                              {item.count !== undefined && <span className="filter-groups-count">{item.count}</span>}
                            </div>
                          ))}
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion>
                )
              })}
            </Filter.Categories>
          </Filter.Content>
        </Filter>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── DataDriven ────────────────────────────────────────────────────────────────

/** groups prop을 전달하면 Filter가 내부에서 Accordion·Checkbox를 자동 렌더링합니다. */
export const DataDriven: Story = {
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({})
    const [search, setSearch] = useState('')
    const [expanded, setExpanded] = useState<string[]>(['dataType'])

    return (
      <div style={{ height: 560, display: 'flex' }}>
        <Filter
          title="필터"
          onCollapse={() => {}}
          groups={FILTER_GROUPS}
          selected={selected}
          onChange={setSelected}
          searchValue={search}
          onSearchChange={setSearch}
          expandedIds={expanded}
          onExpandedChange={setExpanded}
          showAll
          searchPlaceholder="검색"
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── States ────────────────────────────────────────────────────────────────────

/** 펼친 상태와 접힌 상태를 나란히 확인합니다. */
export const States: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    const {
      search,
      setSearch,
      checked,
      openGroups,
      toggleGroup,
      toggleItem,
      toggleGroupAll,
      isAllSelected,
      isSomeSelected,
      toggleAll,
    } = useFilterState()

    return (
      <div style={{ height: 560, display: 'flex', gap: 24 }}>
        <Filter collapsed={collapsed} onCollapse={() => setCollapsed(true)} title="필터">
          <Filter.Search>
            <Input
              placeholder="검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              showClearButton={!!search}
              onClear={() => setSearch('')}
            />
          </Filter.Search>
          <Filter.Content>
            <Filter.SelectAll>
              <Checkbox label="전체" checked={isAllSelected} indeterminate={isSomeSelected} onChange={toggleAll} />
            </Filter.SelectAll>
            <Filter.Categories>
              {FILTER_GROUPS.map((group) => {
                const filtered = search
                  ? group.items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
                  : group.items
                if (filtered.length === 0) return null
                const groupChecked = checked[group.id] ?? new Set<string>()
                const groupAllChecked = filtered.every((i) => groupChecked.has(i.value))
                const groupSomeChecked = filtered.some((i) => groupChecked.has(i.value)) && !groupAllChecked

                return (
                  <Accordion key={group.id} iconDirection="left">
                    <Accordion.Item active={openGroups.has(group.id)} onChange={(open) => toggleGroup(group.id, open)}>
                      <Accordion.Header>
                        <span onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={groupAllChecked}
                            indeterminate={groupSomeChecked}
                            onChange={() => toggleGroupAll(group, filtered)}
                          />
                        </span>
                        <span>{group.label}</span>
                        {group.count !== undefined && <span className="filter-groups-count">{group.count}</span>}
                      </Accordion.Header>
                      <Accordion.Content>
                        <div className="filter-groups-list">
                          {filtered.map((item) => (
                            <div key={item.value} className="filter-item-row">
                              <Checkbox
                                label={item.label}
                                checked={groupChecked.has(item.value)}
                                onChange={() => toggleItem(group.id, item.value)}
                              />
                              {item.count !== undefined && <span className="filter-groups-count">{item.count}</span>}
                            </div>
                          ))}
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion>
                )
              })}
            </Filter.Categories>
          </Filter.Content>
        </Filter>
        {collapsed && (
          <div style={{ padding: '12px 8px' }}>
            <IconButton
              aria-label="필터 열기"
              icon={<XdrChevronRightIcon size={16} />}
              size="sm"
              title="필터 열기"
              onClick={() => setCollapsed(false)}
            />
          </div>
        )}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
