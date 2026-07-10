import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@port/design-system'

const MONO = "'JetBrains Mono', 'D2Coding', ui-monospace, SFMono-Regular, Menlo, monospace"

// 페이지 풀-블리드 (reset 보강)
globalStyle('html, body, #root', {
  height: '100%',
  margin: 0,
})

// 대시보드 셸 최소 너비 — 1200px 미만에서는 가로 스크롤 (셸/카드 스타일은 AppLayout 담당)
export const dashboardShell = style({
  minWidth: 1200,
})

// Main 콘텐츠 여백/간격 (흰 카드 자체는 AppLayout 이 담당)
export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: '18px 24px 24px',
})

// ── 검색 조건 툴바 ────────────────────────────────────────────────────────────
export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.md,
  flexWrap: 'wrap',
  flexShrink: 0,
  padding: '10px 12px',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
})

export const toolbarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexWrap: 'wrap',
})

export const toolbarRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  flexWrap: 'wrap',
})

// ── AI 쿼리 바 ────────────────────────────────────────────────────────────────
export const aiPrefix = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightBold,
  color: vars.color.primary,
})

export const queryTools = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
})

export const queryToolBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 26,
  height: 26,
  border: 'none',
  background: 'transparent',
  borderRadius: vars.radius.sm,
  color: vars.color.textMuted,
  cursor: 'pointer',
  transition: `all ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover, color: vars.color.text },
  ':disabled': { opacity: 0.4, cursor: 'not-allowed', background: 'transparent' },
})

export const queryToolActive = style({
  background: vars.color.primarySoft,
  color: vars.color.primary,
})

export const queryRunActions = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
})

// ── 적용 조건 칩 ──────────────────────────────────────────────────────────────
export const chipsRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  flexWrap: 'wrap',
  flexShrink: 0,
})

export const chipsLabel = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textMuted,
  marginRight: vars.spacing.xs,
})

// ── 검색 전: 위젯 2-열 — 남은 화면 높이를 꽉 채운다 ──────────────────────────────
export const widgetsRow = style({
  flex: 1,
  minHeight: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
  gridAutoRows: '1fr',
  alignItems: 'stretch',
  gap: vars.spacing.md,
})

export const widgetCard = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
})

export const widgetHead = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const widgetTitle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const widgetMore = style({
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeXs,
  cursor: 'pointer',
  ':hover': { color: vars.color.primary, textDecoration: 'underline' },
})

export const widgetList = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

export const widgetItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  width: '100%',
  padding: '13px 16px',
  border: 'none',
  borderBottom: `1px solid ${vars.color.border}`,
  background: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover },
})

export const widgetItemTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.text,
})

export const widgetItemMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `4px ${vars.spacing.md}`,
  lineHeight: 1.5,
  fontSize: vars.font.sizeXs,
  color: vars.color.textMuted,
})

export const metaTag = style({
  whiteSpace: 'nowrap',
})

globalStyle(`${metaTag} b`, {
  color: vars.color.textSecondary,
  fontWeight: vars.font.weightMedium,
})

export const widgetItemQuery = style({
  fontFamily: MONO,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

// ── 검색 후: 결과 영역 ────────────────────────────────────────────────────────
export const resultArea = style({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
})

export const histoCard = style({
  position: 'relative',
  flexShrink: 0,
  padding: '12px 16px 14px',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
})

export const histoPlot = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

// 좌상단 y축 최대값 표시
export const histoYmax = style({
  position: 'absolute',
  top: -2,
  left: 0,
  fontSize: 10,
  fontFamily: MONO,
  color: vars.color.textMuted,
  pointerEvents: 'none',
})

// 막대 트랙 (드래그 선택 영역)
export const histoTrack = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  gap: 6,
  height: 96,
  cursor: 'crosshair',
  userSelect: 'none',
})

// 꺾은 선 그래프 (막대 위에 겹쳐 표시)
export const histoLine = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  overflow: 'visible',
})

globalStyle(`${histoLine} polyline`, {
  fill: 'none',
  stroke: vars.color.textSecondary,
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke',
  opacity: 0.7,
})

export const histoCol = style({
  position: 'relative',
  zIndex: 1,
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: '100%',
})

export const histoBar = style({
  width: '100%',
  maxWidth: 32,
  borderRadius: '3px 3px 0 0',
  background: vars.color.primary,
  opacity: 0.55,
  transition: `height ${vars.transition.normal}, opacity ${vars.transition.fast}`,
  selectors: {
    [`${histoCol}:hover &`]: { opacity: 0.8 },
  },
})

// 드래그로 선택된 시간범위의 막대 강조
export const histoBarSel = style({
  opacity: 1,
})

export const histoAxis = style({
  display: 'flex',
  gap: 6,
})

globalStyle(`${histoAxis} > *`, {
  flex: 1,
  textAlign: 'center',
  minWidth: 0,
})

export const histoLabel = style({
  fontSize: 10,
  color: vars.color.textMuted,
  fontFamily: MONO,
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

// [^] 접기/펼치기 핸들 — 카드 하단 중앙
export const histoHandle = style({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 50%)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 16,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.full,
  background: vars.color.surface,
  color: vars.color.textSecondary,
  cursor: 'pointer',
  zIndex: 2,
  ':hover': { background: vars.color.surfaceHover, color: vars.color.text },
})

export const histoEmpty = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 96,
  color: vars.color.textMuted,
  fontSize: vars.font.sizeSm,
})

// 그리드 카드 상단 툴바 — 총 건수/경과시간(좌) + 표시 컨트롤(우)
export const resultMeta = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.md,
  flexWrap: 'wrap',
  flexShrink: 0,
  padding: '10px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const metaLeft = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: vars.spacing.sm,
  flexWrap: 'wrap',
})

export const metaCount = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.text,
})

export const metaRange = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textMuted,
  fontFamily: MONO,
})

export const metaElapsed = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

// 히스토그램 선택 시간범위 해제 칩
export const clearSel = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '2px 8px',
  border: `1px solid ${vars.color.primary}`,
  borderRadius: vars.radius.full,
  background: vars.color.primarySoft,
  color: vars.color.primary,
  fontSize: vars.font.sizeXs,
  cursor: 'pointer',
  ':hover': { background: vars.color.primarySoftStrong },
})

export const metaRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  flexWrap: 'wrap',
})

// ── 결과 테이블 카드 ──────────────────────────────────────────────────────────
export const gridCard = style({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: 0,
})

export const tableScroll = style({
  flex: 1,
  minHeight: 0,
  width: '100%',
  overflow: 'auto',
})

export const rawCell = style({
  display: 'inline-block',
  marginLeft: vars.spacing.sm,
  maxWidth: 420,
  verticalAlign: 'middle',
  fontFamily: MONO,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

// 컬럼 자동 맞춤 — 말줄임 해제하고 내용 전체를 한 줄로 표시 (가로 스크롤)
export const rawCellFit = style({
  maxWidth: 'none',
  overflow: 'visible',
  textOverflow: 'clip',
})

// 펼치기 컬럼 헤더 (전체 펼치기/접기 버튼 위치)
export const expandHeadCell = style({
  width: 36,
  padding: '0 4px !important',
})

export const expandAllBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  border: 'none',
  background: 'transparent',
  borderRadius: '50%',
  color: vars.color.textSecondary,
  cursor: 'pointer',
  transition: `transform ${vars.transition.fast}, background ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover, color: vars.color.text },
})

// 펼침 상태 — 본문 행 아이콘과 동일하게 90도 회전
export const expandAllBtnOpen = style({
  transform: 'rotate(90deg)',
})

export const monoCell = style({
  fontFamily: MONO,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
})

export const ipCell = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontFamily: MONO,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
})

export const ipThreat = style({
  color: vars.color.error,
  fontWeight: vars.font.weightBold,
})

export const threatTag = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 5px',
  height: 16,
  borderRadius: vars.radius.sm,
  background: vars.color.error,
  color: '#fff',
  fontFamily: vars.font.family,
  fontSize: 10,
  fontWeight: vars.font.weightBold,
})

export const countryCell = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  whiteSpace: 'nowrap',
})

export const flag = style({
  fontSize: vars.font.sizeMd,
  lineHeight: 1,
})

// 펼친 상세 행
export const detailRow = style({})
globalStyle(`${detailRow}:hover`, { background: 'transparent !important' })

export const detailGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: `${vars.spacing.sm} ${vars.spacing.lg}`,
  padding: `${vars.spacing.md} ${vars.spacing.sm}`,
  background: vars.color.background,
  borderRadius: vars.radius.sm,
})

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 0,
})

export const fieldWide = style({
  gridColumn: '1 / -1',
})

export const fieldLabel = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textMuted,
})

export const fieldValue = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  wordBreak: 'break-all',
})

export const fieldMono = style({
  fontFamily: MONO,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

export const paginationRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.md,
  flexWrap: 'wrap',
  flexShrink: 0,
  padding: '10px 16px',
  borderTop: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
})

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: `${vars.spacing.xxl} 0`,
  color: vars.color.textMuted,
  fontSize: vars.font.sizeSm,
})

// ── 팝오버 패널 (검색기록/템플릿 리스트, 템플릿 저장 폼) ─────────────────────────
export const savedListPanel = style({
  width: 380,
  maxWidth: '70vw',
  maxHeight: 380,
  overflowY: 'auto',
})

export const savedListHead = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
  padding: '4px 4px 8px',
  borderBottom: `1px solid ${vars.color.border}`,
  marginBottom: 4,
})

export const savedList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

export const savedListItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: '100%',
  padding: '8px 8px',
  border: 'none',
  background: 'transparent',
  borderRadius: vars.radius.sm,
  textAlign: 'left',
  cursor: 'pointer',
  ':hover': { background: vars.color.surfaceHover },
})

export const savedListTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.text,
})

export const savedListQuery = style({
  fontFamily: MONO,
  fontSize: vars.font.sizeXs,
  color: vars.color.textMuted,
  whiteSpace: 'normal',
  wordBreak: 'break-all',
  lineHeight: 1.4,
})

export const savePanel = style({
  width: 260,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
})

export const savePanelTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const saveRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.sm,
})

export const saveLabel = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
})

export const saveInput = style({
  flex: 1,
  height: 30,
  padding: '0 8px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.font.sizeSm,
  outline: 'none',
  ':focus': { borderColor: vars.color.primary },
})

export const saveActions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.xs,
  marginTop: 2,
})
