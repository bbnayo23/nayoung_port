import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@port/design-system'

// 페이지 풀-블리드 (reset 보강)
globalStyle('html, body, #root', {
  height: '100%',
  margin: 0,
})

export const appShell = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family,
  // Firefox — 테마(vars) 기반 스크롤바. vars.color.* 가 :root.dark 에서 전환되므로 다크에도 자동 적용.
  scrollbarWidth: 'thin',
  scrollbarColor: `${vars.color.border} transparent`,
})

// WebKit 스크롤바 — appShell 하위 모든 스크롤 영역(테이블/필터 등)에 테마 색 적용 (라이트·다크 공통)
globalStyle(`${appShell} ::-webkit-scrollbar`, {
  width: 10,
  height: 10,
})

globalStyle(`${appShell} ::-webkit-scrollbar-track`, {
  background: 'transparent',
})

globalStyle(`${appShell} ::-webkit-scrollbar-thumb`, {
  background: vars.color.border,
  borderRadius: vars.radius.full,
  border: '2px solid transparent',
  backgroundClip: 'padding-box',
})

globalStyle(`${appShell} ::-webkit-scrollbar-thumb:hover`, {
  background: vars.color.borderHover,
})

// 최상단 TopBar 영역 — 전체 폭. 왼쪽 로고(BI), 오른쪽 액션 묶음.
// 페이지 배경과 구분되도록 surface 색 + 하단 보더 + 그림자로 분리한다.
export const topHeader = style({
  position: 'relative',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.md,
  height: 52,
  flexShrink: 0,
  padding: '0 16px',
  background: vars.color.surface,
  borderBottom: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.sm,
})

export const brandArea = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
})

export const bodyRow = style({
  position: 'relative',
  zIndex: 0,
  display: 'flex',
  flex: 1,
  minHeight: 0,
})

// 사이드바의 로고/헤더 영역 제거 — 헤더 높이를 0 으로 만들어 메뉴 아이템이 최상단부터 보이게 한다.
// collapse 토글 버튼은 절대 위치라 헤더 높이와 무관하게 사이드바 우측 상단 모서리에 그대로 노출된다.
globalStyle(`${bodyRow} .side-menu-bar-header`, {
  height: 0,
  minHeight: 0,
  padding: 0,
})

globalStyle(`${bodyRow} .side-menu-bar-header .header-collapse-btn`, {
  top: 8,
})

export const content = style({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  padding: '20px 24px 24px',
  background: vars.color.background,
})

// SectionCard(그리드)를 가로 레이아웃으로 — [필터 패널 | 테이블 영역]
export const gridCard = style({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  padding: 0,
})

// 그리드 우측 컬럼 (테이블 + 빈상태)
export const gridCol = style({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
})

// 그리드 카드 안에서는 필터 collapse 버튼을 숨긴다 (항상 펼침 상태)
globalStyle(`.${gridCard} .filter-collapse-button`, {
  display: 'none',
})

export const pageHead = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: vars.spacing.md,
  flexWrap: 'wrap',
})

export const pageTitle = style({
  margin: 0,
  fontSize: vars.font.sizeXl,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const pageSubtitle = style({
  margin: '4px 0 0',
  fontSize: vars.font.sizeSm,
  color: vars.color.textSecondary,
})

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexWrap: 'wrap',
})

export const queryBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
})

export const searchGrow = style({
  flex: 1,
  minWidth: 0,
})

export const chipsRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  flexWrap: 'wrap',
})

export const chipsLabel = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textMuted,
  marginRight: vars.spacing.xs,
})

// StatsBar 를 감싸는 카드 (StatsBar 자체는 배경/보더가 없음)
export const statsCard = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
})

export const tableScroll = style({
  width: '100%',
  overflowX: 'auto',
})

export const monoCell = style({
  fontFamily: "'JetBrains Mono', 'D2Coding', ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
})

export const idCell = style({
  fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: vars.font.sizeXs,
  color: vars.color.primary,
  whiteSpace: 'nowrap',
})

export const msgCell = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  maxWidth: 360,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
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

export const brandMark = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  borderRadius: vars.radius.md,
  background: vars.color.primary,
  color: vars.color.textInverse,
  flexShrink: 0,
})

export const brandName = style({
  fontWeight: vars.font.weightBold,
  fontSize: vars.font.sizeMd,
  color: vars.color.text,
  whiteSpace: 'nowrap',
})
