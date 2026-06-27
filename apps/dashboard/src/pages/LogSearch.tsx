import { useEffect, useMemo, useState } from 'react'
import {
  SideMenuBar,
  TopBar,
  Filter,
  SearchBar,
  DateTimePicker,
  Button,
  IconButton,
  Table,
  Badge,
  Pagination,
  SectionCard,
  GridContainer,
  TotalCount,
  ChipContainer,
  Chip,
  StatsBar,
  StatItem,
  StatCount,
  StatLabel,
} from '@port/design-system'
import type { MenuItem, FilterGroup, ThemeMode } from '@port/design-system'
import {
  XdrNavDashboardIcon,
  XdrNavLogsearchIcon,
  XdrNavAlertIcon,
  XdrNavIncidentIcon,
  XdrNavMonitoringIcon,
  XdrNavSecurityIcon,
  XdrSettingIcon,
  XdrShieldIcon,
  XdrRefreshIcon,
  XdrDownloadIcon,
  XdrSadGhostIcon,
} from '@port/icon-library'
import {
  logs,
  severityColor,
  severityLabel,
  actionColor,
  actionLabel,
} from '../data/logs'
import type { Severity, SourceType, LogAction } from '../data/logs'
import * as s from './LogSearch.css'

const SEVERITIES: Severity[] = ['critical', 'high', 'medium', 'low', 'info']
const SOURCES: SourceType[] = ['Firewall', 'IDS/IPS', 'EDR', 'WAF', 'VPN', 'Auth']
const ACTIONS: LogAction[] = ['blocked', 'detected', 'allowed']

const countBy = <T,>(values: T[], pick: (v: (typeof logs)[number]) => T) =>
  values.map((value) => ({ value, count: logs.filter((l) => pick(l) === value).length }))

const sideMenu: MenuItem[] = [
  { key: 'dashboard', label: '대시보드', icon: <XdrNavDashboardIcon size={18} /> },
  { key: 'logsearch', label: '로그검색', icon: <XdrNavLogsearchIcon size={18} />, isActive: true },
  { key: 'alerts', label: '경보', icon: <XdrNavAlertIcon size={18} />, badge: 12 },
  { key: 'incidents', label: '인시던트', icon: <XdrNavIncidentIcon size={18} /> },
  { key: 'monitoring', label: '모니터링', icon: <XdrNavMonitoringIcon size={18} /> },
  { key: 'threat', label: '위협 인텔리전스', icon: <XdrNavSecurityIcon size={18} /> },
  { key: 'settings', label: '설정', icon: <XdrSettingIcon size={18} /> },
]

export default function LogSearch() {
  const [activeMenu, setActiveMenu] = useState('logsearch')
  const [navCollapsed, setNavCollapsed] = useState(false)
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [facetSearch, setFacetSearch] = useState('')
  const [expandedIds, setExpandedIds] = useState<string[]>(['severity', 'source', 'action'])
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  // 다크모드 — TopBar 테마 토글에 따라 <html class="dark"> 를 켜고 끈다.
  // design-system 의 다크 테마는 `:root.dark` 에 정의돼 있어 vars.color.* 가 전부 전환된다.
  useEffect(() => {
    const root = document.documentElement
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const isDark = themeMode === 'dark' || (themeMode === 'system' && mq.matches)
      root.classList.toggle('dark', isDark)
    }
    apply()
    if (themeMode === 'system') {
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [themeMode])

  const facetGroups: FilterGroup[] = useMemo(
    () => [
      {
        id: 'severity',
        label: '심각도',
        defaultExpanded: true,
        items: countBy(SEVERITIES, (l) => l.severity).map(({ value, count }) => ({
          value,
          label: severityLabel[value],
          count,
        })),
      },
      {
        id: 'source',
        label: '로그 소스',
        defaultExpanded: true,
        items: countBy(SOURCES, (l) => l.source).map(({ value, count }) => ({
          value,
          label: value,
          count,
        })),
      },
      {
        id: 'action',
        label: '대응',
        defaultExpanded: true,
        items: countBy(ACTIONS, (l) => l.action).map(({ value, count }) => ({
          value,
          label: actionLabel[value],
          count,
        })),
      },
    ],
    [],
  )

  const filtered = useMemo(() => {
    const sev = selected.severity ?? []
    const src = selected.source ?? []
    const act = selected.action ?? []
    const q = query.trim().toLowerCase()

    const rows = logs.filter((l) => {
      if (sev.length && !sev.includes(l.severity)) return false
      if (src.length && !src.includes(l.source)) return false
      if (act.length && !act.includes(l.action)) return false
      if (q) {
        const hay = [l.id, l.sourceIp, l.destIp, l.user, l.eventType, l.message]
          .join(' ')
          .toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })

    return rows.sort((a, b) =>
      sortDir === 'desc' ? b.time.localeCompare(a.time) : a.time.localeCompare(b.time),
    )
  }, [selected, query, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  const severityCounts = useMemo(
    () => Object.fromEntries(countBy(SEVERITIES, (l) => l.severity).map((c) => [c.value, c.count])) as Record<Severity, number>,
    [],
  )

  const toggleSeverity = (sev: Severity) => {
    setPage(1)
    setSelected((prev) => {
      const cur = prev.severity ?? []
      const next = cur.includes(sev) ? cur.filter((v) => v !== sev) : [...cur, sev]
      return { ...prev, severity: next }
    })
  }

  const removeChip = (groupId: string, value: string) => {
    setPage(1)
    setSelected((prev) => ({
      ...prev,
      [groupId]: (prev[groupId] ?? []).filter((v) => v !== value),
    }))
  }

  const chipLabel = (groupId: string, value: string) => {
    if (groupId === 'severity') return `심각도: ${severityLabel[value as Severity]}`
    if (groupId === 'action') return `대응: ${actionLabel[value as LogAction]}`
    return `소스: ${value}`
  }

  const activeChips = Object.entries(selected).flatMap(([groupId, values]) =>
    (values ?? []).map((value) => ({ groupId, value })),
  )

  const resetAll = () => {
    setSelected({})
    setQuery('')
    setInput('')
    setPage(1)
  }

  return (
    <div className={s.appShell}>
      {/* 최상단 TopBar — 왼쪽 로고(BI), 오른쪽 액션 묶음 */}
      <header className={s.topHeader}>
        <div className={s.brandArea}>
          <span className={s.brandMark}>
            <XdrShieldIcon size={16} />
          </span>
          <span className={s.brandName}>SOC Console</span>
        </div>
        <TopBar
          style={{ height: 44 }}
          userName="박나영"
          userEmail="nayeong.park@igloo.co.kr"
          userRole="Security Analyst"
          notiCount={12}
          defaultTheme={themeMode}
          onThemeChange={setThemeMode}
          products={[
            { id: 'siem', label: 'SIEM' },
            { id: 'soar', label: 'SOAR' },
          ]}
          defaultActiveProduct="siem"
        />
      </header>

      {/* TopBar 아래: 사이드메뉴(접힘 가능) + 콘텐츠 */}
      <div className={s.bodyRow}>
        <SideMenuBar
          menuGroup={sideMenu}
          activeKey={activeMenu}
          onActiveChange={setActiveMenu}
          collapsed={navCollapsed}
          onCollapse={setNavCollapsed}
          style={{ height: '100%', zIndex: 2 }}
        />
        <main className={s.content}>
            <div className={s.pageHead}>
              <div>
                <h1 className={s.pageTitle}>로그검색</h1>
                <p className={s.pageSubtitle}>
                  전체 수집 로그에서 보안 이벤트를 검색하고 분석합니다.
                </p>
              </div>
              <div className={s.headerActions}>
                <DateTimePicker defaultPreset="last7d" size="sm" onChange={() => {}} />
                <IconButton
                  aria-label="새로고침"
                  icon={<XdrRefreshIcon size={16} />}
                  onClick={() => setPage(1)}
                />
                <Button variant="outline" size="sm" leftIcon={<XdrDownloadIcon size={16} />}>
                  내보내기
                </Button>
              </div>
            </div>

            <div className={s.queryBar}>
              <div className={s.searchGrow}>
                <SearchBar
                  value={input}
                  onChange={setInput}
                  onSearch={(v) => {
                    setQuery(v)
                    setPage(1)
                  }}
                  onClear={() => {
                    setInput('')
                    setQuery('')
                    setPage(1)
                  }}
                  placeholder="IP · 사용자 · 이벤트 · 메시지 검색 (예: 203.0.113.45)"
                  searchLabel="검색"
                />
              </div>
            </div>

            {activeChips.length > 0 && (
              <div className={s.chipsRow}>
                <span className={s.chipsLabel}>적용된 필터</span>
                <ChipContainer>
                  {activeChips.map(({ groupId, value }) => (
                    <Chip key={`${groupId}:${value}`} $active onClick={() => removeChip(groupId, value)}>
                      {chipLabel(groupId, value)} ✕
                    </Chip>
                  ))}
                  <Chip onClick={resetAll}>전체 초기화</Chip>
                </ChipContainer>
              </div>
            )}

            <div className={s.statsCard}>
              <StatsBar>
                <StatItem $isTotal $active={!(selected.severity?.length)} onClick={() => removeChip('severity', '')}>
                  <StatCount $isTotal>{logs.length.toLocaleString()}</StatCount>
                  <StatLabel>전체</StatLabel>
                </StatItem>
                {SEVERITIES.map((sev) => (
                  <StatItem
                    key={sev}
                    $active={(selected.severity ?? []).includes(sev)}
                    onClick={() => toggleSeverity(sev)}
                  >
                    <StatCount>{severityCounts[sev].toLocaleString()}</StatCount>
                    <StatLabel>{severityLabel[sev]}</StatLabel>
                  </StatItem>
                ))}
              </StatsBar>
            </div>

            <SectionCard className={s.gridCard} style={{ flexDirection: 'row', overflow: 'hidden' }}>
              <Filter
                title="필터"
                groups={facetGroups}
                selected={selected}
                onChange={(next) => {
                  setSelected(next)
                  setPage(1)
                }}
                searchValue={facetSearch}
                onSearchChange={setFacetSearch}
                expandedIds={expandedIds}
                onExpandedChange={setExpandedIds}
                searchPlaceholder="필터 검색"
              />
              <div className={s.gridCol}>
                <GridContainer>
                  <div className={s.tableScroll}>
                    <Table size="md" hoverable>
                    <Table.Head>
                      <Table.Row>
                        <Table.HeaderCell
                          sortable
                          sortDirection={sortDir}
                          onSort={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
                        >
                          발생시각
                        </Table.HeaderCell>
                        <Table.HeaderCell>이벤트 ID</Table.HeaderCell>
                        <Table.HeaderCell>심각도</Table.HeaderCell>
                        <Table.HeaderCell>소스</Table.HeaderCell>
                        <Table.HeaderCell>출발지 IP</Table.HeaderCell>
                        <Table.HeaderCell>목적지 IP</Table.HeaderCell>
                        <Table.HeaderCell>사용자</Table.HeaderCell>
                        <Table.HeaderCell>이벤트</Table.HeaderCell>
                        <Table.HeaderCell>대응</Table.HeaderCell>
                        <Table.HeaderCell>메시지</Table.HeaderCell>
                      </Table.Row>
                    </Table.Head>
                    <Table.Body
                      emptyContent={
                        <div className={s.emptyState}>
                          <XdrSadGhostIcon size={32} />
                          <span>조건에 맞는 로그가 없습니다.</span>
                        </div>
                      }
                    >
                      {paged.map((l) => (
                        <Table.Row key={l.id}>
                          <Table.Cell>
                            <span className={s.monoCell}>{l.time}</span>
                          </Table.Cell>
                          <Table.Cell>
                            <span className={s.idCell}>{l.id}</span>
                          </Table.Cell>
                          <Table.Cell>
                            <Badge variant="status-round" color={severityColor[l.severity]} size="sm">
                              {severityLabel[l.severity]}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>{l.source}</Table.Cell>
                          <Table.Cell>
                            <span className={s.monoCell}>{l.sourceIp}</span>
                          </Table.Cell>
                          <Table.Cell>
                            <span className={s.monoCell}>{l.destIp}</span>
                          </Table.Cell>
                          <Table.Cell>{l.user}</Table.Cell>
                          <Table.Cell>{l.eventType}</Table.Cell>
                          <Table.Cell>
                            <Badge variant="outline" color={actionColor[l.action]} size="sm">
                              {actionLabel[l.action]}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>
                            <span className={s.msgCell} title={l.message}>
                              {l.message}
                            </span>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                    </Table>
                  </div>
                </GridContainer>

                <div className={s.paginationRow}>
                  <TotalCount>전체 {filtered.length.toLocaleString()}건</TotalCount>
                  <Pagination
                    totalPages={totalPages}
                    currentPage={safePage}
                    onPageChange={setPage}
                    totalItems={filtered.length}
                    itemsPerPage={perPage}
                    itemsPerPageOptions={[10, 20, 50]}
                    onItemsPerPageChange={(n) => {
                      setPerPage(n)
                      setPage(1)
                    }}
                    showPageInfo
                    showItemsPerPage
                  />
                </div>
              </div>
            </SectionCard>
          </main>
        </div>
    </div>
  )
}
