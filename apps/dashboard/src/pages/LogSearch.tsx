import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AppLayout,
  Lnb,
  Gnb,
  Dropdown,
  Toggle,
  SearchBar,
  Button,
  Table,
  Badge,
  Pagination,
  SectionCard,
  ChipContainer,
  Chip,
  PageHeader,
  Popover,
  ContextMenu,
  Tooltip,
  HighlightText,
  Progress,
  Toaster,
  toast,
} from '@port/design-system'
import type { MenuItem, ContextMenuItem } from '@port/design-system'
import {
  XdrNavDashboardIcon,
  XdrNavLogsearchIcon,
  XdrNavAlertIcon,
  XdrNavIncidentIcon,
  XdrNavMonitoringIcon,
  XdrNavIntelligenceIcon,
  XdrNavAppIcon,
  XdrSettingIcon,
  XdrSadGhostIcon,
  ExdAiAssistantLogoIcon,
  ExdUppercaseIcon,
  ExdTxtAlignIcon,
  ExdHelpIcon,
  ExdPauseIcon,
  ExdPlayIcon,
  ExdStopIcon,
  ExdClockIcon,
  ExdListUlIcon,
  ExdFloppyFillIcon,
  ExdAlarmIcon,
  ExdPivotIcon,
  ExdCsvIcon,
  ExdColSettingIcon,
  ExdChevronUpIcon,
  ExdChevronDownIcon,
  ExdCloseIcon,
} from '@port/icon-library'
import {
  logs,
  toRawLog,
  severityColor,
  severityLabel,
  logTypeLabel,
} from '../data/logs'
import type { Severity, SourceType, LogType } from '../data/logs'
import PortfolioNotice from '../components/PortfolioNotice'
import GuideTour, { type GuideStep } from '../components/GuideTour'
import AiAssistantPanel from '../components/AiAssistantPanel'
import Workspace from './Workspace'
import * as s from './LogSearch.css'

// 다크모드 토글 상태 타입 (Gnb 테마 버튼으로 제어)
type ThemeMode = 'light' | 'dark' | 'system'

// ── 검색 조건 옵션 ──────────────────────────────────────────────────────────────
const LOG_TYPES: LogType[] = ['weblog', 'system', 'dbms', 'fw', 'ips', 'tms', 'waf']
const SOURCES: SourceType[] = ['Firewall', 'IDS/IPS', 'EDR', 'WAF', 'VPN', 'Auth']

const logTypeOptions = LOG_TYPES.map((t) => ({ value: t, label: logTypeLabel[t] }))
const sourceOptions = SOURCES.map((v) => ({ value: v, label: v }))
const timeOptions = [
  { value: 'today', label: '오늘' },
  { value: '1h', label: '최근 1시간' },
  { value: '24h', label: '최근 24시간' },
  { value: '7d', label: '최근 7일' },
  { value: '30d', label: '최근 30일' },
]
const sortOptions = [
  { value: 'desc', label: '내림차순' },
  { value: 'asc', label: '오름차순' },
]
const headerDisplayOptions = [
  { value: 'name-field', label: '이름(필드)' },
  { value: 'name', label: '이름' },
  { value: 'field', label: '필드' },
]
const profileOptions = [
  { value: 'default', label: '기본' },
  { value: 'web', label: '웹 표준' },
  { value: 'full', label: '전체 필드' },
]

// 출력 건수 옵션 (화면 설계서 ExD_logsearch_002_S002 #5) — 기본값 100건
const PER_PAGE_OPTIONS = [20, 50, 100, 200, 500, 1000]

// 결과 테이블 컬럼 키 (컬럼 자동 맞춤 컨텍스트 메뉴 대상)
const COLUMN_KEYS = ['raw', 'mgr_time', 's_ip', 's_country', 'd_port'] as const
type ColumnKey = (typeof COLUMN_KEYS)[number]

/** 시각 문자열("YYYY-MM-DD HH:MM:SS") → 10분 단위 버킷 키("HH:MM") */
const bucketKey = (time: string) => {
  const [h, m] = time.slice(11, 16).split(':')
  return `${h}:${String(Math.floor(Number(m) / 10) * 10).padStart(2, '0')}`
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** 구조화 쿼리의 기초 문법 검증 — 따옴표·괄호 짝을 확인해 오류 메시지를 반환(정상은 null). */
const validateQuery = (q: string): string | null => {
  if (!q) return null
  if (((q.match(/'/g)?.length ?? 0) % 2) !== 0) return "작은따옴표(')의 짝이 맞지 않습니다."
  let depth = 0
  for (const c of q) {
    if (c === '(') depth++
    else if (c === ')' && --depth < 0) return '괄호가 올바르게 닫히지 않았습니다.'
  }
  if (depth !== 0) return '괄호가 올바르게 닫히지 않았습니다.'
  return null
}

/** 검색 쿼리에서 하이라이트할 필드값(따옴표 값·전체 IP)을 추출 (S006 키워드 하이라이트) */
const extractHighlightTerms = (query: string): string[] => {
  const terms = new Set<string>()
  for (const q of query.match(/'([^']*)'/g) ?? []) terms.add(q.replace(/'/g, ''))
  for (const ip of query.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g) ?? []) terms.add(ip)
  // 짧은 숫자 조각(예: '113')이 무관한 IP 내부에 매칭되는 노이즈를 막기 위해 단독 숫자는 제외한다.
  return [...terms].filter((t) => t.trim().length > 1).map(escapeRegex)
}

const sideMenu: MenuItem[] = [
  { key: 'dashboard', label: '대시보드', icon: <XdrNavDashboardIcon size={18} /> },
  { key: 'workspace', label: '워크스페이스', icon: <XdrNavAppIcon size={18} /> },
  { key: 'logsearch', label: '로그검색', icon: <XdrNavLogsearchIcon size={18} />, isActive: true },
  { key: 'alerts', label: '경보', icon: <XdrNavAlertIcon size={18} /> },
  { key: 'incidents', label: '인시던트', icon: <XdrNavIncidentIcon size={18} /> },
  { key: 'monitoring', label: '모니터링', icon: <XdrNavMonitoringIcon size={18} /> },
  { key: 'threat', label: '위협 인텔리전스', icon: <XdrNavIntelligenceIcon size={18} /> },
  { key: 'settings', label: '설정', icon: <XdrSettingIcon size={18} /> },
]

// ── 검색기록 / 템플릿 목 데이터 (화면 설계서 ExD_logsearch_001_S002) ──────────────
interface SavedQuery {
  id: string
  /** 검색기록: 상대 시각 / 템플릿: 템플릿명 */
  title: string
  logType: string
  source: string
  range: string
  sort: string
  query: string
}

const SAMPLE_RANGE = '2026.06.26 00:00:00 ~ 2026.06.26 15:00:00'
const SAMPLE_QUERY = "d_port:80 AND d_ip:1.1.1.1 OR s_ip: 2.2.2.2 OR s_ip: 3.3.3.3"

const SAMPLE_QUERIES = [
  SAMPLE_QUERY,
  "s_country = 'CN' AND severity >= high",
  "user = 'root' AND action = 'blocked'",
  "eventType = 'C2 Communication'",
  "s_country = 'CN' AND severity = 'critical'",
  "d_port IN (80, 443) AND action = 'blocked'",
]

const HISTORY_TIMES = ['1분 전', '2분 전', '3분 전', '12분 전', '30분 전', '1시간 전', '2시간 전', '5시간 전', '1일 전', '3일 전', '1주 전', '1개월 전']

const searchHistory: SavedQuery[] = HISTORY_TIMES.map((title, i) => ({
  id: `h${i}`,
  title,
  logType: i % 3 === 0 ? '전체' : LOG_TYPES[i % LOG_TYPES.length],
  source: i % 2 === 0 ? '없음' : '로그소스1',
  range: SAMPLE_RANGE,
  sort: i % 2 === 0 ? '내림차순' : '오름차순',
  query: SAMPLE_QUERIES[i % SAMPLE_QUERIES.length],
}))

const TEMPLATE_NAMES = ['웹 공격 탐지', '내부망 이상 트래픽', '권한 상승 시도', 'C2 비콘 탐지', '랜섬웨어 행위 탐지', 'SQL Injection 탐지', '포트스캔 탐지', '관리자 로그인 추적', '외부 데이터 유출', '브루트포스 탐지', '지오 이상 접속', 'DDoS 트래픽']

const templates: SavedQuery[] = TEMPLATE_NAMES.map((title, i) => ({
  id: `t${i}`,
  title,
  logType: i % 3 === 0 ? '전체' : LOG_TYPES[i % LOG_TYPES.length],
  source: i % 2 === 0 ? '없음' : '로그소스1',
  range: SAMPLE_RANGE,
  sort: i % 2 === 0 ? '내림차순' : '오름차순',
  query: SAMPLE_QUERIES[i % SAMPLE_QUERIES.length],
}))

type SearchPhase = 'idle' | 'running' | 'paused' | 'done' | 'error'
type OpenPanel = null | 'history' | 'template' | 'save'

export default function LogSearch() {
  const [activeMenu, setActiveMenu] = useState('logsearch')
  const [navCollapsed, setNavCollapsed] = useState(false)
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  // 대시보드 진입 시 포트폴리오 안내 모달을 띄운다.
  const [noticeOpen, setNoticeOpen] = useState(true)
  // 안내 모달을 닫으면 단계별 온보딩 가이드를 노출한다.
  const [guideOpen, setGuideOpen] = useState(false)
  // GNB의 AI Assistant 버튼으로 여는 우측 사이드 패널
  const [aiOpen, setAiOpen] = useState(false)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const widgetsRef = useRef<HTMLDivElement>(null)

  // 검색 조건
  const [logTypes, setLogTypes] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([])
  const [timeRange, setTimeRange] = useState('today')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [histogram, setHistogram] = useState(true)

  // 쿼리 / AI 바
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [expandedQuery, setExpandedQuery] = useState(false)

  // 검색 상태 — 진행에 따라 결과가 순차 출력된다 (S003)
  const [phase, setPhase] = useState<SearchPhase>('idle')
  const [searchError, setSearchError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(0) // 지금까지 스트리밍된 결과 수
  const [elapsed, setElapsed] = useState(0) // 경과시간(초)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // 결과 표시
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(100)
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [headerDisplay, setHeaderDisplay] = useState('name-field')
  const [profile, setProfile] = useState('default')

  // 히스토그램 — 접기/펼치기 + 드래그 시간범위 선택 (S005)
  const [histoCollapsed, setHistoCollapsed] = useState(false)
  const [histoSel, setHistoSel] = useState<{ a: number; b: number } | null>(null)
  const dragRef = useRef<number | null>(null)

  // 컬럼 자동 맞춤 (S002 #7)
  const [fittedCols, setFittedCols] = useState<Set<ColumnKey>>(new Set())
  const [ctxCol, setCtxCol] = useState<ColumnKey>('raw')

  // 팝오버 / 컨텍스트 메뉴
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null)
  const [tplName, setTplName] = useState('')
  const [tplShared, setTplShared] = useState(false)
  const [ctxMenu, setCtxMenu] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 })

  // 다크모드 — Gnb 테마 토글에 따라 <html class="dark"> 를 켜고 끈다.
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

  useEffect(() => () => clearTimer(), [])

  // ── 검색 실행 / 일시정지 / 중지 ─────────────────────────────────────────────
  // 데모에서 아직 연결되지 않은 기능 — 토스트로 상태를 알린다.
  const notReady = (label: string) =>
    toast.info(`${label} — 준비 중`, {
      message: '포트폴리오 데모 화면으로, 이 기능은 아직 연결되지 않았습니다.',
    })

  const runSearch = (raw?: string) => {
    const q = (raw ?? input).trim()
    clearTimer()
    const err = validateQuery(q)
    if (err) {
      setQuery(q)
      setSearchError(err)
      setPhase('error')
      toast.error('검색 오류', { message: err })
      return
    }
    setSearchError(null)
    setQuery(q)
    setPage(1)
    setExpandedRows([])
    setHistoSel(null)
    setLoaded(0)
    setElapsed(0)
    setPhase('running')
  }

  // 일시정지 ↔ 재생 (S001) / 중지 = 현재까지 결과 유지하고 종료 (S003 ①)
  const togglePause = () => {
    if (phase === 'running') setPhase('paused')
    else if (phase === 'paused') setPhase('running')
  }

  const stopSearch = () => {
    if (phase === 'running' || phase === 'paused') {
      clearTimer()
      setPhase('done')
    }
  }

  const hasResults = phase === 'done' || phase === 'paused' || phase === 'running'
  const running = phase === 'running'

  // ── 필터링 / 정렬 ───────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const raw = query.trim()
    // 필드 연산자(`s_ip:`, `=`, `IN`, `AND` 등)가 포함된 구조화 쿼리는 검색엔진이
    // 해석하는 것으로 간주해 전체 결과를 반환하고, 평문은 부분일치로 거른다.
    const structured = /[:=<>()]|\b(AND|OR|NOT|IN)\b/i.test(raw)
    const q = caseSensitive ? raw : raw.toLowerCase()
    const rows = logs.filter((l) => {
      if (logTypes.length && !logTypes.includes(l.logType)) return false
      if (sources.length && !sources.includes(l.source)) return false
      if (q && !structured) {
        const hayParts = [l.id, l.sourceIp, l.destIp, l.user, l.eventType, l.message, l.country.code, l.country.label, toRawLog(l)]
        const hay = caseSensitive ? hayParts.join(' ') : hayParts.join(' ').toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
    return rows.sort((a, b) =>
      sortDir === 'desc' ? b.time.localeCompare(a.time) : a.time.localeCompare(b.time),
    )
  }, [logTypes, sources, query, sortDir, caseSensitive])

  // 진행 중에는 loaded 개수만큼만 출력된다 (S003 ⑤ 결과 순차적 출력)
  const visible = useMemo(() => filtered.slice(0, loaded), [filtered, loaded])

  // 히스토그램 버킷 — 출력된 결과(visible) 기준
  const histoData = useMemo(() => {
    const buckets = new Map<string, number>()
    for (const l of visible) buckets.set(bucketKey(l.time), (buckets.get(bucketKey(l.time)) ?? 0) + 1)
    const arr = [...buckets.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    const max = Math.max(1, ...arr.map(([, c]) => c))
    return { bars: arr.map(([label, count]) => ({ label, count })), max }
  }, [visible])

  // 히스토그램 드래그로 선택된 시간범위 → 결과 필터링 (S005)
  const selectedLabels = useMemo(() => {
    if (!histoSel) return null
    const lo = Math.min(histoSel.a, histoSel.b)
    const hi = Math.max(histoSel.a, histoSel.b)
    return new Set(histoData.bars.slice(lo, hi + 1).map((b) => b.label))
  }, [histoSel, histoData])

  // 테이블에 출력되는 행 — 선택 시간범위 필터 반영
  const tableRows = useMemo(
    () => (selectedLabels ? visible.filter((r) => selectedLabels.has(bucketKey(r.time))) : visible),
    [visible, selectedLabels],
  )

  const totalPages = Math.max(1, Math.ceil(tableRows.length / perPage))
  const safePage = Math.min(page, totalPages)
  const paged = tableRows.slice((safePage - 1) * perPage, safePage * perPage)

  const timeRangeText = useMemo(() => {
    if (!tableRows.length) return '-'
    const times = tableRows.map((l) => l.time)
    const min = times.reduce((a, b) => (a < b ? a : b))
    const max = times.reduce((a, b) => (a > b ? a : b))
    return `${min} ~ ${max}`
  }, [tableRows])

  // 검색 키워드 하이라이트 단어 (S006)
  const highlightWords = useMemo(() => extractHighlightTerms(query), [query])

  // 진행 중 스트리밍 — 결과/총건수/경과시간/히스토그램/페이지가 함께 증가하고,
  // 모든 결과가 출력되면 검색 완료 (S003, S004)
  useEffect(() => {
    if (phase !== 'running') return
    const target = filtered.length
    // 결과가 없으면 다음 틱에 완료 처리 (effect 본문에서 동기 setState 회피)
    if (target === 0) {
      const id = setTimeout(() => setPhase('done'), 0)
      return () => clearTimeout(id)
    }
    intervalRef.current = setInterval(() => {
      setElapsed((e) => Math.round((e + 0.1) * 10) / 10)
      setLoaded((prev) => {
        const next = Math.min(prev + Math.max(1, Math.ceil(target / 14)), target)
        if (next >= target) {
          clearTimer()
          setPhase('done')
        }
        return next
      })
    }, 90)
    return () => clearTimer()
  }, [phase, filtered])

  // ── 적용된 검색 조건 칩 ──────────────────────────────────────────────────────
  const activeChips = [
    ...logTypes.map((v) => ({ group: 'logType' as const, value: v, label: `로그유형: ${logTypeLabel[v as LogType] ?? v}` })),
    ...sources.map((v) => ({ group: 'source' as const, value: v, label: `로그소스: ${v}` })),
  ]

  const removeChip = (group: 'logType' | 'source', value: string) => {
    setPage(1)
    if (group === 'logType') setLogTypes((p) => p.filter((v) => v !== value))
    else setSources((p) => p.filter((v) => v !== value))
  }

  const resetAll = () => {
    setLogTypes([])
    setSources([])
    setInput('')
    setQuery('')
    setPhase('idle')
    setPage(1)
  }

  const applySaved = (sq: SavedQuery) => {
    setInput(sq.query)
    setOpenPanel(null)
    runSearch(sq.query)
  }

  // 컬럼 헤더 우클릭 → 자동 맞춤 컨텍스트 메뉴 (S002 #7)
  const openColumnMenu = (e: React.MouseEvent, col: ColumnKey) => {
    e.preventDefault()
    setCtxCol(col)
    setCtxMenu({ open: true, x: e.clientX, y: e.clientY })
  }

  const columnMenuItems: ContextMenuItem[] = [
    {
      key: 'fit-one',
      label: '이 컬럼 자동 맞춤',
      icon: <ExdColSettingIcon size={14} />,
      onSelect: () => setFittedCols((prev) => new Set(prev).add(ctxCol)),
    },
    {
      key: 'fit-all',
      label: '모든 컬럼 자동 맞춤',
      icon: <ExdTxtAlignIcon size={14} />,
      onSelect: () => setFittedCols(new Set(COLUMN_KEYS)),
    },
  ]

  // 히스토그램 막대 드래그로 시간범위 선택 (S005)
  const startDrag = (i: number) => {
    dragRef.current = i
    setHistoSel({ a: i, b: i })
  }
  const dragOver = (i: number) => {
    if (dragRef.current != null) setHistoSel({ a: dragRef.current, b: i })
  }
  useEffect(() => {
    const end = () => {
      dragRef.current = null
    }
    window.addEventListener('mouseup', end)
    return () => window.removeEventListener('mouseup', end)
  }, [])

  // 원본 로그 전체 펼치기/접기 (S006) — 현재 페이지 기준
  const pageIds = paged.map((l) => l.id)
  const allExpanded = pageIds.length > 0 && pageIds.every((id) => expandedRows.includes(id))
  const toggleExpandAll = () => setExpandedRows(allExpanded ? [] : pageIds)

  // 온보딩 가이드 단계 — 조건 선택 → 검색어 입력 → 기록/템플릿 순서
  const guideSteps: GuideStep[] = [
    {
      ref: toolbarRef,
      title: '1. 검색 조건 선택',
      description: '로그유형·로그소스·검색시간 등 조회할 로그의 조건을 먼저 지정하세요.',
    },
    {
      ref: searchRef,
      title: '2. 검색어 입력',
      description: '쿼리를 입력하거나 비워둔 채로 Enter·검색 버튼을 누르면 결과가 순차적으로 출력됩니다.',
    },
    {
      ref: widgetsRef,
      title: '3. 검색기록 · 템플릿',
      description: '자주 쓰는 검색은 검색기록과 템플릿에서 바로 불러올 수 있어요.',
    },
  ]

  return (
    <>
      <AppLayout
        solution="xdr"
        className={s.dashboardShell}
        mainClassName={s.content}
        gnb={
          <Gnb
            title="SOC Console"
            notiCount={12}
            onThemeClick={() => setThemeMode((m) => (m === 'dark' ? 'light' : 'dark'))}
            onAiAssistantClick={() => setAiOpen((v) => !v)}
          />
        }
        lnb={
          <Lnb
            menuGroup={sideMenu}
            activeKey={activeMenu}
            onActiveChange={setActiveMenu}
            collapsed={navCollapsed}
            onCollapse={setNavCollapsed}
            expandOnHover={false}
          />
        }
      >
        {activeMenu === 'workspace' ? (
          <Workspace />
        ) : activeMenu !== 'logsearch' ? (
          <ComingSoon label={sideMenu.find((m) => m.key === activeMenu)?.label ?? ''} />
        ) : (
          <>
          {/* 페이지 헤더 — 저장/내보내기는 각각 툴바(템플릿 저장)·결과 툴바(CSV)에서 맥락에 맞게 제공 */}
          <PageHeader title="로그 검색" divider />

          {/* 검색 조건 툴바 */}
          <div className={s.toolbar} ref={toolbarRef}>
            <div className={s.toolbarLeft}>
              <Dropdown
                label="로그유형"
                size="sm"
                width={188}
                multiSelect
                multiDisplayMode="count"
                hideSelectAll={false}
                options={logTypeOptions}
                value={logTypes}
                placeholder="전체"
                onChange={(vals) => { setLogTypes(vals); setPage(1) }}
              />
              <Dropdown
                label="로그소스"
                size="sm"
                width={188}
                multiSelect
                multiDisplayMode="count"
                hideSelectAll={false}
                options={sourceOptions}
                value={sources}
                placeholder="전체"
                onChange={(vals) => { setSources(vals); setPage(1) }}
              />
              <Dropdown
                label="검색시간"
                size="sm"
                width={196}
                options={timeOptions}
                value={timeRange}
                onChange={(v) => setTimeRange(v)}
              />
              <Dropdown
                label="정렬기준"
                size="sm"
                width={188}
                options={sortOptions}
                value={sortDir}
                onChange={(v) => setSortDir(v as 'asc' | 'desc')}
              />
              <Toggle
                label="히스토그램"
                size="sm"
                checked={histogram}
                onChange={setHistogram}
              />
            </div>

            <div className={s.toolbarRight}>
              {/* 검색기록·템플릿 — 결과가 있을 때만 툴바에 노출 (검색 전에는 아래 위젯이 담당) */}
              {hasResults && (
                <>
              <Popover
                placement="bottom"
                style={{ maxWidth: 'none' }}
                visible={openPanel === 'history'}
                onVisibleChange={(v) => !v && setOpenPanel(null)}
                onClick={() => setOpenPanel((p) => (p === 'history' ? null : 'history'))}
                content={<SavedList title="검색기록" items={searchHistory} onPick={applySaved} />}
              >
                <Button variant="ghost" size="sm" leftIcon={<ExdClockIcon size={14} />}>검색기록</Button>
              </Popover>

              <Popover
                placement="bottom"
                style={{ maxWidth: 'none' }}
                visible={openPanel === 'template'}
                onVisibleChange={(v) => !v && setOpenPanel(null)}
                onClick={() => setOpenPanel((p) => (p === 'template' ? null : 'template'))}
                content={<SavedList title="템플릿" items={templates} onPick={applySaved} />}
              >
                <Button variant="ghost" size="sm" leftIcon={<ExdListUlIcon size={14} />}>템플릿</Button>
              </Popover>
                </>
              )}

              <Popover
                placement="bottom"
                visible={openPanel === 'save'}
                onVisibleChange={(v) => !v && setOpenPanel(null)}
                onClick={() => setOpenPanel((p) => (p === 'save' ? null : 'save'))}
                content={
                  <div className={s.savePanel}>
                    <div className={s.savePanelTitle}>템플릿 저장</div>
                    <label className={s.saveRow}>
                      <span className={s.saveLabel}>템플릿 이름</span>
                      <input
                        className={s.saveInput}
                        value={tplName}
                        onChange={(e) => setTplName(e.target.value)}
                        placeholder="이름 입력"
                      />
                    </label>
                    <div className={s.saveRow}>
                      <span className={s.saveLabel}>공유 설정</span>
                      <Toggle size="sm" checked={tplShared} onChange={setTplShared} innerLabel />
                    </div>
                    <div className={s.saveActions}>
                      <Button variant="ghost" size="sm" onClick={() => setOpenPanel(null)}>취소</Button>
                      <Button variant="primary" size="sm" onClick={() => { setOpenPanel(null); setTplName('') }}>저장</Button>
                    </div>
                  </div>
                }
              >
                <Button variant="ghost" size="sm" leftIcon={<ExdFloppyFillIcon size={14} />} disabled={!hasResults}>템플릿 저장</Button>
              </Popover>

              <Button variant="ghost" size="sm" leftIcon={<ExdAlarmIcon size={14} />} onClick={() => notReady('경보조건 추가')}>경보조건 추가</Button>
            </div>
          </div>

          {/* AI 검색 쿼리 바 */}
          <div ref={searchRef}>
          <SearchBar
            value={input}
            onChange={setInput}
            onSearch={(v) => runSearch(v)}
            onClear={() => { setInput(''); setQuery(''); setPhase('idle') }}
            placeholder="검색 쿼리 입력 — 예: s_ip IN ('1.1.1.1', '2.2.2.2') AND s_country = 'KR' AND d_port <= 1000"
            searchLabel="검색"
            expandable
            expanded={expandedQuery}
            onExpandChange={setExpandedQuery}
            prefix={
              <Tooltip content="AI 추천 쿼리 넣기">
                <button
                  type="button"
                  className={s.aiPrefix}
                  aria-label="AI 추천 쿼리 넣기"
                  onClick={() => {
                    setInput(SAMPLE_QUERIES[0])
                    toast.info('AI 추천 쿼리', {
                      message: '예시 쿼리를 입력창에 넣었어요. Enter 또는 검색 버튼으로 실행하세요.',
                    })
                  }}
                >
                  <ExdAiAssistantLogoIcon size={18} />
                </button>
              </Tooltip>
            }
            suffixActions={
              <span className={s.queryTools}>
                <Tooltip content="대소문자 구분">
                  <button
                    type="button"
                    className={caseSensitive ? `${s.queryToolBtn} ${s.queryToolActive}` : s.queryToolBtn}
                    onClick={() => setCaseSensitive((v) => !v)}
                    aria-label="대소문자 구분"
                  >
                    <ExdUppercaseIcon size={15} />
                  </button>
                </Tooltip>
                <Tooltip content="검색 문법 도움말">
                  <button
                    type="button"
                    className={s.queryToolBtn}
                    aria-label="검색 문법 도움말"
                    onClick={() =>
                      toast.info('검색 문법 도움말', {
                        message:
                          "예) s_ip IN ('1.1.1.1', '2.2.2.2') AND s_country = 'KR' AND d_port <= 1000",
                        duration: 8000,
                      })
                    }
                  >
                    <ExdHelpIcon size={15} />
                  </button>
                </Tooltip>
              </span>
            }
            rightActions={
              <span className={s.queryRunActions}>
                <button
                  type="button"
                  className={phase === 'paused' ? `${s.queryToolBtn} ${s.queryToolActive}` : s.queryToolBtn}
                  aria-label={phase === 'paused' ? '재생' : '일시정지'}
                  disabled={phase !== 'running' && phase !== 'paused'}
                  onClick={togglePause}
                >
                  {phase === 'paused' ? <ExdPlayIcon size={13} /> : <ExdPauseIcon size={13} />}
                </button>
                <button
                  type="button"
                  className={s.queryToolBtn}
                  aria-label="중지"
                  disabled={phase !== 'running' && phase !== 'paused'}
                  onClick={stopSearch}
                >
                  <ExdStopIcon size={13} />
                </button>
              </span>
            }
          />
          </div>

          {/* 적용된 검색 조건 칩 */}
          {activeChips.length > 0 && (
            <div className={s.chipsRow}>
              <span className={s.chipsLabel}>적용된 조건</span>
              <ChipContainer>
                {activeChips.map(({ group, value, label }) => (
                  <Chip key={`${group}:${value}`} $active onClick={() => removeChip(group, value)} aria-label={`${label} 조건 제거`}>
                    {label}
                    <ExdCloseIcon size={10} />
                  </Chip>
                ))}
                <Chip onClick={resetAll}>전체 초기화</Chip>
              </ChipContainer>
            </div>
          )}

          {/* 검색 전: 위젯 | 오류: 에러 패널 | 검색 후: 결과 */}
          {phase === 'error' ? (
            <div className={s.errorPanel}>
              <XdrSadGhostIcon size={40} />
              <div className={s.errorTitle}>검색을 실행할 수 없습니다</div>
              <div className={s.errorMsg}>{searchError}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPhase('idle')
                  setSearchError(null)
                }}
              >
                다시 입력
              </Button>
            </div>
          ) : !hasResults ? (
            <div className={s.widgetsRow} ref={widgetsRef}>
              <WidgetCard icon={<ExdClockIcon size={15} />} title="검색기록" items={searchHistory} onPick={applySaved} onMore={() => notReady('검색기록 더보기')} />
              <WidgetCard icon={<ExdListUlIcon size={15} />} title="템플릿" items={templates} onPick={applySaved} onMore={() => notReady('템플릿 더보기')} />
            </div>
          ) : (
            <div className={s.resultArea}>
              {histogram && (
                <div className={s.histoCard}>
                  {!histoCollapsed &&
                    (histoData.bars.length === 0 ? (
                      <div className={s.histoEmpty}>표시할 데이터가 없습니다.</div>
                    ) : (
                      <div className={s.histoPlot}>
                        <span className={s.histoYmax}>{histoData.max}</span>
                        <span className={s.histoHint}>드래그하여 시간범위 선택</span>
                        <div className={s.histoTrack}>
                          {/* 하단 꺾은 선 그래프 (S005) */}
                          <svg className={s.histoLine} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                            <polyline
                              points={histoData.bars
                                .map((b, i) => `${((i + 0.5) / histoData.bars.length) * 100},${100 - (b.count / histoData.max) * 100}`)
                                .join(' ')}
                            />
                          </svg>
                          {/* 상단 막대 그래프 — 드래그하여 시간범위 선택 (S005) */}
                          {histoData.bars.map((b, i) => {
                            const sel = selectedLabels?.has(b.label)
                            return (
                              <div
                                key={b.label}
                                className={s.histoCol}
                                title={`${b.label} · ${b.count}건`}
                                onMouseDown={() => startDrag(i)}
                                onMouseEnter={() => dragOver(i)}
                              >
                                <span
                                  className={sel ? `${s.histoBar} ${s.histoBarSel}` : s.histoBar}
                                  style={{ height: `${Math.max(4, (b.count / histoData.max) * 100)}%` }}
                                />
                              </div>
                            )
                          })}
                        </div>
                        <div className={s.histoAxis}>
                          {histoData.bars.map((b) => (
                            <span key={b.label} className={s.histoLabel}>{b.label}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  {/* [^] 히스토그램 접기/펼치기 (S005) */}
                  <button
                    type="button"
                    className={s.histoHandle}
                    onClick={() => setHistoCollapsed((v) => !v)}
                    aria-label={histoCollapsed ? '히스토그램 펼치기' : '히스토그램 접기'}
                  >
                    {histoCollapsed ? <ExdChevronDownIcon size={14} /> : <ExdChevronUpIcon size={14} />}
                  </button>
                </div>
              )}

              <SectionCard className={s.gridCard}>
                {/* 결과 메타 행 — 총 건수 / 범위 / 경과시간 + 우측 표시 컨트롤 (카드 상단 툴바) */}
                <div className={s.resultMeta}>
                  <div className={s.metaLeft}>
                    <strong className={s.metaCount}>총 {tableRows.length.toLocaleString()}건</strong>
                    <span className={s.metaRange}>({timeRangeText})</span>
                    <span className={s.metaElapsed}>
                      {running ? `검색 중… ${elapsed.toFixed(1)}s` : `경과시간 ${elapsed.toFixed(1)}s`}
                    </span>
                    {histoSel && (
                      <button type="button" className={s.clearSel} onClick={() => setHistoSel(null)}>
                        선택 시간범위
                        <ExdCloseIcon size={10} />
                      </button>
                    )}
                  </div>
                  <div className={s.metaRight}>
                    <Dropdown label="헤더 표시" size="sm" options={headerDisplayOptions} value={headerDisplay} onChange={setHeaderDisplay} />
                    <Dropdown label="프로파일" size="sm" options={profileOptions} value={profile} onChange={setProfile} />
                    <Tooltip content="컬럼 자동 맞춤">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<ExdColSettingIcon size={14} />}
                        onClick={(e) => { setCtxCol('raw'); setCtxMenu({ open: true, x: e.clientX, y: e.clientY }) }}
                      >
                        컬럼
                      </Button>
                    </Tooltip>
                    <Button variant="outline" size="sm" leftIcon={<ExdPivotIcon size={14} />} onClick={() => notReady('피벗')}>피벗</Button>
                    <Button variant="outline" size="sm" leftIcon={<ExdCsvIcon size={14} />} onClick={() => notReady('CSV 다운로드')}>CSV</Button>
                  </div>
                </div>

                {(running || phase === 'paused') && loaded < filtered.length && (
                  <div className={s.searchProgress}>
                    <Progress
                      value={filtered.length ? Math.round((loaded / filtered.length) * 100) : 0}
                      shape="linear"
                      color="info"
                    />
                  </div>
                )}

                <div className={s.tableScroll}>
                  <Table size="md" hoverable>
                    <Table.Head>
                      <Table.Row>
                        <Table.HeaderCell className={s.expandHeadCell}>
                          {/* 필드명 영역 [>]/[v] — 전체 펼치기/접기 (S006) */}
                          <button
                            type="button"
                            className={allExpanded ? `${s.expandAllBtn} ${s.expandAllBtnOpen}` : s.expandAllBtn}
                            onClick={toggleExpandAll}
                            aria-label={allExpanded ? '전체 접기' : '전체 펼치기'}
                          >
                            {/* 본문 행의 펼치기 아이콘과 동일한 셰브론 (디자인시스템 Table 기준) */}
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3.5 2 7 5 3.5 8" />
                            </svg>
                          </button>
                        </Table.HeaderCell>
                        <Table.HeaderCell onContextMenu={(e) => openColumnMenu(e, 'raw')}>원본 로그(raw)</Table.HeaderCell>
                        <Table.HeaderCell
                          sortable
                          sortDirection={sortDir}
                          onSort={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
                          onContextMenu={(e) => openColumnMenu(e, 'mgr_time')}
                        >
                          수집시간(mgr_time)
                        </Table.HeaderCell>
                        <Table.HeaderCell onContextMenu={(e) => openColumnMenu(e, 's_ip')}>출발지 IP(s_ip)</Table.HeaderCell>
                        <Table.HeaderCell onContextMenu={(e) => openColumnMenu(e, 's_country')}>출발지 국가(s_country)</Table.HeaderCell>
                        <Table.HeaderCell align="right" onContextMenu={(e) => openColumnMenu(e, 'd_port')}>도착지 포트(d_port)</Table.HeaderCell>
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
                      {paged.flatMap((l) => {
                        const open = expandedRows.includes(l.id)
                        const toggle = () =>
                          setExpandedRows((prev) =>
                            prev.includes(l.id) ? prev.filter((id) => id !== l.id) : [...prev, l.id],
                          )
                        const rows = [
                          <Table.Row key={l.id} expandable expanded={open} onExpandToggle={toggle} active={open}>
                            <Table.Cell>
                              <Badge variant="status-round" color={severityColor[l.severity]} size="sm">
                                {severityLabel[l.severity as Severity]}
                              </Badge>
                              <span className={fittedCols.has('raw') ? `${s.rawCell} ${s.rawCellFit}` : s.rawCell}>
                                <HighlightText text={toRawLog(l)} searchWords={highlightWords} caseSensitive={caseSensitive} />
                              </span>
                            </Table.Cell>
                            <Table.Cell>
                              <span className={s.monoCell}>{l.time}</span>
                            </Table.Cell>
                            <Table.Cell>
                              <span className={l.threatIp ? `${s.ipCell} ${s.ipThreat}` : s.ipCell}>
                                <HighlightText text={l.sourceIp} searchWords={highlightWords} caseSensitive={caseSensitive} />
                                {l.threatIp && <span className={s.threatTag}>위협</span>}
                              </span>
                            </Table.Cell>
                            <Table.Cell>
                              <span className={s.countryCell}>
                                <span className={s.flag}>{l.country.flag}</span>
                                <HighlightText text={`${l.country.code} - ${l.country.label}`} searchWords={highlightWords} caseSensitive={caseSensitive} />
                              </span>
                            </Table.Cell>
                            <Table.Cell align="right">
                              <span className={s.monoCell}>{l.destPort || '-'}</span>
                            </Table.Cell>
                          </Table.Row>,
                        ]
                        if (open) {
                          rows.push(
                            <Table.Row key={`${l.id}-detail`} className={s.detailRow}>
                              <Table.Cell colSpan={6}>
                                <div className={s.detailGrid}>
                                  <Field label="이벤트 ID" value={l.id} />
                                  <Field label="이벤트" value={l.eventType} />
                                  <Field label="로그유형" value={logTypeLabel[l.logType]} />
                                  <Field label="로그소스" value={l.source} />
                                  <Field label="도착지 IP" value={l.destIp} />
                                  <Field label="사용자" value={l.user} />
                                  <Field label="메시지" value={l.message} wide highlight={highlightWords} />
                                  <Field label="원본 로그(raw)" value={toRawLog(l)} wide mono highlight={highlightWords} />
                                </div>
                              </Table.Cell>
                            </Table.Row>,
                          )
                        }
                        return rows
                      })}
                    </Table.Body>
                  </Table>
                </div>

                <div className={s.paginationRow}>
                  <Pagination
                    totalPages={totalPages}
                    currentPage={safePage}
                    onPageChange={setPage}
                    totalItems={tableRows.length}
                    itemsPerPage={perPage}
                    itemsPerPageOptions={PER_PAGE_OPTIONS}
                    onItemsPerPageChange={(n) => { setPerPage(n); setPage(1) }}
                    showPageInfo
                    showItemsPerPage
                  />
                </div>
              </SectionCard>
            </div>
          )}
          </>
        )}
      </AppLayout>

      <ContextMenu
        open={ctxMenu.open}
        x={ctxMenu.x}
        y={ctxMenu.y}
        items={columnMenuItems}
        onClose={() => setCtxMenu((c) => ({ ...c, open: false }))}
      />

      {/* 포트폴리오 안내 모달 — 대시보드 진입 시 노출, 닫으면 가이드 시작 */}
      <PortfolioNotice open={noticeOpen} onClose={() => { setNoticeOpen(false); setGuideOpen(true) }} />

      {/* 온보딩 가이드 — 단계별 코치마크 */}
      <GuideTour
        open={guideOpen && activeMenu === 'logsearch' && !hasResults && phase !== 'error'}
        steps={guideSteps}
        onClose={() => setGuideOpen(false)}
      />

      {/* AI Assistant 사이드 패널 — GNB AI Assistant 버튼으로 토글 */}
      <AiAssistantPanel open={aiOpen} onClose={() => setAiOpen(false)} />

      {/* 토스트 알림 (검색 오류 · 준비 중 기능 안내) */}
      <Toaster position="top-right" />
    </>
  )
}

// ── 미구현 메뉴 플레이스홀더 ─────────────────────────────────────────────────
function ComingSoon({ label }: { label: string }) {
  return (
    <>
      <PageHeader title={label} divider />
      <div className={s.errorPanel}>
        <XdrSadGhostIcon size={40} />
        <div className={s.errorTitle}>준비 중입니다</div>
        <div className={s.errorMsg}>이 메뉴는 포트폴리오 데모에 포함되지 않았습니다. 로그검색 화면을 확인해 주세요.</div>
      </div>
    </>
  )
}

// ── 검색기록 / 템플릿 위젯 카드 (검색 전 화면) ──────────────────────────────────
function WidgetCard({
  icon,
  title,
  items,
  onPick,
  onMore,
}: {
  icon: React.ReactNode
  title: string
  items: SavedQuery[]
  onPick: (sq: SavedQuery) => void
  onMore?: () => void
}) {
  return (
    <section className={s.widgetCard}>
      <header className={s.widgetHead}>
        <span className={s.widgetTitle}>
          {icon}
          {title}
        </span>
        <button type="button" className={s.widgetMore} onClick={onMore}>더보기</button>
      </header>
      <ul className={s.widgetList}>
        {items.slice(0, 10).map((it) => (
          <li key={it.id}>
            <button type="button" className={s.widgetItem} onClick={() => onPick(it)}>
              <span className={s.widgetItemTitle}>{it.title}</span>
              <span className={s.widgetItemMeta}>
                <span className={s.metaTag}>로그유형 <b>{it.logType}</b></span>
                <span className={s.metaTag}>로그소스 <b>{it.source}</b></span>
                <span className={s.metaTag}>검색시간 {it.range}</span>
                <span className={s.metaTag}>정렬기준 {it.sort}</span>
              </span>
              <span className={s.widgetItemQuery}>{it.query}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ── 팝오버 내부 리스트 (검색기록 / 템플릿 버튼) ─────────────────────────────────
function SavedList({
  title,
  items,
  onPick,
}: {
  title: string
  items: SavedQuery[]
  onPick: (sq: SavedQuery) => void
}) {
  return (
    <div className={s.savedListPanel}>
      <div className={s.savedListHead}>{title}</div>
      <ul className={s.savedList}>
        {items.map((it) => (
          <li key={it.id}>
            <button type="button" className={s.savedListItem} onClick={() => onPick(it)}>
              <span className={s.savedListTitle}>{it.title}</span>
              <span className={s.savedListQuery}>{it.query}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Field({
  label,
  value,
  wide,
  mono,
  highlight,
}: {
  label: string
  value: string
  wide?: boolean
  mono?: boolean
  highlight?: string[]
}) {
  return (
    <div className={wide ? `${s.field} ${s.fieldWide}` : s.field}>
      <span className={s.fieldLabel}>{label}</span>
      <span className={mono ? `${s.fieldValue} ${s.fieldMono}` : s.fieldValue}>
        {highlight && highlight.length ? <HighlightText text={value} searchWords={highlight} /> : value}
      </span>
    </div>
  )
}
