import { style, styleVariants, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

// ══════════════════════════════════════════════════════════════════════════════
// 공통 페이지 레이아웃
// ══════════════════════════════════════════════════════════════════════════════

// ── 페이지 레이아웃 컨테이너 ─────────────────────────────────────────────────

export const pageLayoutContainer = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: vars.spacing.md,
})

// ── 페이지 레이아웃 헤더 ─────────────────────────────────────────────────────

export const pageLayoutHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderBottom: `1px solid ${vars.color.border}`,
})

export const pageLayoutHeaderMain = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
})

export const pageLayoutHeaderTitle = style({
  margin: 0,
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const pageLayoutHeaderDescription = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.textMuted,
})

export const pageLayoutHeaderRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
})

// ── 페이지 콘텐츠 래퍼 ──────────────────────────────────────────────────────

export const pageContent = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  overflowY: 'auto',
  padding: 0,
  background: vars.color.background,
})

// 패딩이 필요한 콘텐츠용 opt-in 모디파이어 — 순수 CSS override (런타임 var 불필요)
export const pageContentPadded = style({
  padding: '0 24px',
})

export const pageContentGap = style({
  gap: 8,
})

export const pageContentGapMd = style({
  gap: 12,
})

export const pageContentGapLg = style({
  gap: 16,
})

// ── 페이지 헤더 행 ──────────────────────────────────────────────────────────

export const pageHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '24px 24px 8px 15px',
  background: 'transparent',
  flexShrink: 0,
})

globalStyle(`${pageHeaderRow} .page-header`, {
  flexShrink: 0,
  whiteSpace: 'nowrap',
  fontSize: vars.font.sizeXl,
  fontWeight: 700,
  width: 'auto', // PageHeader의 width: 100% 오버라이드 — flex row 안에서 타이틀 너비만큼만 차지
})

globalStyle(`${pageHeaderRow} .tabs`, {
  fontSize: vars.font.sizeLg,
})

// ── 섹션 카드 ───────────────────────────────────────────────────────────────

export const sectionCard = style({
  display: 'flex',
  flexDirection: 'column',
  background: vars.color.surface,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  boxShadow: 'none',
  overflow: 'visible',
})

globalStyle(`[data-solution="xdr"] .${sectionCard}`, {
  border: 'none',
  boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.1)',
})

globalStyle(`.${sectionCard} .filter-bar`, {
  background: vars.color.surface,
})

globalStyle(`[data-solution="xdr"][data-theme="dark"] .${sectionCard}`, {
  background: vars.color.surfaceHover,
})

/* gap은 PageContent에서 제거됨 — 페이지별로 토큰화하여 적용 */

export const sectionCardFlex = style([
  sectionCard,
  {
    flexShrink: 1,
    flex: 1,
    minHeight: 0,
  },
])

// ── 그리드 컨테이너 ─────────────────────────────────────────────────────────

export const gridContainer = style({
  flex: 1,
  minHeight: 0,
  width: '100%',
  padding: 0,
  overflowY: 'auto',
})

globalStyle(`${gridContainer} table`, {
  backgroundColor: vars.color.surface,
})

globalStyle(`${gridContainer} thead`, {
  backgroundColor: vars.color.surface,
})

// ── 페이지네이션 바 ─────────────────────────────────────────────────────────

export const paginationBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  padding: '12px 16px',
})

// ── 섹션 내부 툴바 ──────────────────────────────────────────────────────────

export const sectionToolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '12px 16px',
  flexShrink: 0,
  borderBottom: `0.5px solid ${vars.color.border}`,
})

globalStyle(`${sectionToolbar}:last-child`, {
  borderBottom: 'none',
})

export const toolbarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
})

export const toolbarCenter = style({
  flex: 1,
  minWidth: 0,
})

export const toolbarRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexShrink: 0,
  marginLeft: 'auto',
})

// ── 공통 UI 요소 ────────────────────────────────────────────────────────────

export const totalCount = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
})

globalStyle(`${totalCount} strong`, {
  fontWeight: 700,
  color: vars.color.text,
})

export const iconButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  padding: 0,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.textSecondary,
  cursor: 'pointer',
  transition: 'background 150ms ease',
})

globalStyle(`${iconButton}:hover, ${iconButton}.is-hover`, {
  background: vars.color.surfaceHover,
})

globalStyle(`${iconButton}[data-active='true']`, {
  background: vars.color.primary,
  borderColor: vars.color.primary,
  color: vars.color.textInverse,
})

export const ghostIconButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  padding: 0,
  border: 'none',
  borderRadius: '50%',
  background: 'transparent',
  color: vars.color.textSecondary,
  cursor: 'pointer',
  transition: 'background 150ms ease',
})

globalStyle(`${ghostIconButton}:hover, ${ghostIconButton}.is-hover`, {
  background: vars.color.surfaceHover,
})

// ── XDR SideMenuBar 헤더 오버라이드 ─────────────────────────────────────────

// ── XDR 툴바 오버라이드 ─────────────────────────────────────────────────────

globalStyle(`[data-solution="xdr"] .${sectionToolbar}`, {
  gap: 16,
  padding: '12px 16px',
  borderBottom: 'none',
})

globalStyle(`[data-solution="xdr"] .${toolbarLeft}`, {
  gap: 8,
})

globalStyle(`[data-solution="xdr"] .${iconButton}`, {
  width: 32,
  height: 32,
  borderRadius: vars.radius.md,
  borderColor: vars.color.border,
})

globalStyle(`[data-solution="xdr"] .${iconButton}:hover`, {
  background: vars.color.surfaceHover,
  color: vars.color.text,
})

globalStyle(`[data-solution="xdr"] .${totalCount}`, {
  fontSize: vars.font.sizeMd,
  fontWeight: 700,
  color: vars.color.textSecondary,
})

globalStyle(`[data-solution="xdr"] .${totalCount} strong`, {
  fontWeight: 700,
  color: vars.color.textSecondary,
})

globalStyle(`[data-solution="xdr"] .SideMenuBar_styledSideMenuBarHeader__rjun1s1`, {
  height: 65,
})

globalStyle(`[data-solution="xdr"] .SideMenuBar_styledSideMenuBarHeader__rjun1s1 .header-collapse-btn`, {
  top: 29,
})

// ══════════════════════════════════════════════════════════════════════════════
// Stats Bar
// ══════════════════════════════════════════════════════════════════════════════

export const statsBar = style({
  display: 'flex',
  alignItems: 'stretch',
  overflowX: 'auto',
  flexShrink: 0,
})

globalStyle(`${statsBar} > *:not(:last-child)`, {
  borderRight: `1px solid ${vars.color.border}`,
})

export const statItem = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  padding: '14px 20px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  minWidth: 80,
  transition: `background ${vars.transition.fast}`,
  position: 'relative',
  selectors: {
    '&:hover, &.is-hover': { background: vars.color.surfaceHover },
  },
})

export const statItemActive = style({
  boxShadow: `inset 0 -2px 0 ${vars.color.primary}`,
})

export const statItemTotal = style({})

globalStyle(`${statItemTotal} .stat-icon`, { color: vars.color.primary })
globalStyle(`${statItemTotal} .stat-icon svg`, { fill: vars.color.primary })
globalStyle(`${statItemTotal} .stat-label-text`, { color: vars.color.primary })

globalStyle(`${statItem} .stat-info`, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
})

globalStyle(`${statItem} .stat-icon`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: vars.color.textSecondary,
})

export const statCountVariant = styleVariants({
  total: { fontSize: 18, fontWeight: 700, lineHeight: 1, color: vars.color.primary },
  normal: { fontSize: 18, fontWeight: 700, lineHeight: 1, color: vars.color.text },
})

export const statLabel = style({
  fontSize: vars.font.sizeSm,
  lineHeight: 1,
  color: vars.color.textSecondary,
  flexShrink: 0,
})

// ══════════════════════════════════════════════════════════════════════════════
// Content Section
// ══════════════════════════════════════════════════════════════════════════════

export const contentSection = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  flexShrink: 1,
  minHeight: 0,
  background: vars.color.surface,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  overflow: 'visible',
})

globalStyle(`${contentSection} thead`, {
  backgroundColor: vars.color.surface,
})

globalStyle(`[data-solution="xdr"][data-theme="dark"] .${contentSection}`, {
  background: vars.color.surfaceHover,
})

// ══════════════════════════════════════════════════════════════════════════════
// Topology Container
// ══════════════════════════════════════════════════════════════════════════════

export const topologyContainer = style({
  flex: 1,
  height: 500,
  position: 'relative',
  background: vars.color.background,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
  margin: 16,
})

// ══════════════════════════════════════════════════════════════════════════════
// Inline Badge Row
// ══════════════════════════════════════════════════════════════════════════════

export const inlineBadgeRow = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
})

// ══════════════════════════════════════════════════════════════════════════════
// Chip (탭 버튼)
// ══════════════════════════════════════════════════════════════════════════════

export const chipContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexWrap: 'wrap',
})

const chipBase = style({
  padding: '4px 12px',
  borderRadius: vars.radius.md,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: `all ${vars.transition.fast}`,
  border: 'none',
})

export const chipVariant = styleVariants({
  active: [
    chipBase,
    {
      border: `1px solid ${vars.color.primary}`,
      background: vars.color.primary,
      color: vars.color.textInverse,
      selectors: {
        '&:hover, &.is-hover': { borderColor: vars.color.primaryHover, background: vars.color.primaryHover },
      },
    },
  ],
  inactive: [
    chipBase,
    {
      border: `1px solid ${vars.color.border}`,
      background: 'transparent',
      color: vars.color.text,
      selectors: {
        '&:hover, &.is-hover': { borderColor: vars.color.primary, background: vars.color.surfaceHover },
      },
    },
  ],
})
