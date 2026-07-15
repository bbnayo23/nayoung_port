import { style, styleVariants, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/* ── StatsBar 컨테이너 ── */

export const statsBar = style({
  display: 'flex',
  alignItems: 'stretch',
  overflowX: 'auto',
  flexShrink: 0,
})

/* 직접 자식 간 구분선 — Popover 래핑 여부에 관계없이 동작 */
globalStyle(`${statsBar} > *:not(:last-child)`, {
  borderRight: `1px solid ${vars.color.border}`,
})

/* ── StatItem ── */

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
    '&:hover, &.is-hover': {
      background: vars.color.surfaceHover,
    },
  },
})

/* 활성(필터 선택) 상태 — 하단 인디케이터 */
export const statItemActive = style({
  boxShadow: `inset 0 -2px 0 ${vars.color.primary}`,
})

/* All 항목 — 아이콘·레이블 primary 색상 */
export const statItemTotal = style({})

globalStyle(`${statItemTotal} .stat-icon`, {
  color: vars.color.primary,
})

globalStyle(`${statItemTotal} .stat-icon svg`, {
  fill: vars.color.primary,
})

globalStyle(`${statItemTotal} .stat-label-text`, {
  color: vars.color.primary,
})

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

/* ── StatCount ── */

export const statCountVariant = styleVariants({
  total: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1,
    color: vars.color.primary,
  },
  normal: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1,
    color: vars.color.text,
  },
})

/* ── StatLabel ── */

export const statLabel = style({
  fontSize: vars.font.sizeSm,
  lineHeight: 1,
  color: vars.color.textSecondary,
  flexShrink: 0,
})
