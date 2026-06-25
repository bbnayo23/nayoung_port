import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@port/design-system'

// 페이지 풀-블리드 (reset 보강)
globalStyle('html, body, #root', {
  height: '100%',
  margin: 0,
})

export const appShell = style({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family,
})

export const mainCol = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
})

// 우측 상단 헤더 스트립 — TopBar 액션 묶음을 오른쪽에 배치
export const topStrip = style({
  position: 'relative',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: 56,
  flexShrink: 0,
  padding: '0 12px 0 24px',
  background: vars.color.surface,
  borderBottom: `1px solid ${vars.color.border}`,
})

export const bodyRow = style({
  position: 'relative',
  zIndex: 0,
  display: 'flex',
  flex: 1,
  minHeight: 0,
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

export const brandRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  fontWeight: vars.font.weightBold,
  fontSize: vars.font.sizeMd,
  color: vars.color.text,
  whiteSpace: 'nowrap',
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
