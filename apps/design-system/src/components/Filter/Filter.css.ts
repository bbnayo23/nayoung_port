import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'
import { accordionContainerCard } from '@dc/components/Accordion/Accordion.css'

const filterSlideInKf = keyframes({
  from: { opacity: 0, transform: 'translateX(-12px)' },
  to: { opacity: 1, transform: 'none' },
})

export const filterOuter = style({
  position: 'relative',
  height: '100%',
  flexShrink: 0,
})

const filterSlideIn = style({
  animationName: filterSlideInKf,
  animationDuration: '220ms',
  animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
})

export const filterWrapper = style([
  filterSlideIn,
  {
    display: 'flex',
    flexDirection: 'column',
    background: vars.color.surface,
    position: 'relative',
    boxShadow: '8px 0 5.9px 0 rgba(0, 0, 0, 0.05)',
    width: 287,
    minWidth: 287,
    borderRight: 'none',
    height: '100%',
    overflow: 'hidden',
    flexShrink: 0,
  },
])

globalStyle(`${filterWrapper}.is-collapsed`, {
  width: 0,
  minWidth: 0,
  borderRightWidth: 0,
})

export const filterCollapseBtn = style({
  position: 'absolute',
  top: 20,
  right: -14,
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  zIndex: 1,
  selectors: {
    '&:hover, &.is-hover': { background: vars.color.surfaceHover },
    '&:active, &.is-active': { background: vars.color.surfaceHover },
  },
})

globalStyle(`${filterWrapper}.is-collapsed ~ ${filterCollapseBtn}`, {
  display: 'none',
})

globalStyle(`[data-solution="xdr"] .${filterCollapseBtn}`, {
  border: 'none',
  boxShadow: '2px 2px 5px 0 rgba(0, 0, 0, 0.1)',
})

export const filterHeader = style({
  display: 'flex',
  alignItems: 'center',
  padding: 16,
  flexShrink: 0,
  width: 287,
})

globalStyle(`${filterHeader} .filter-title`, {
  fontSize: vars.font.sizeLg,
  fontWeight: 700,
  margin: 0,
  color: vars.color.text,
})

export const filterBody = style({
  padding: 0,
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: 287,
})

export const filterSearch = style({
  padding: '6px 16px',
  flexShrink: 0,
})

export const filterContent = style({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
})

export const filterSelectAll = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 0 18px',
  flexShrink: 0,
  fontWeight: 700,
  borderBottom: `1px solid ${vars.color.border}`,
  margin: '0 16px',
})

export const filterCategories = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: '0 16px',
})

globalStyle(`${filterCategories} .accordion-header`, {
  padding: '10px 0',
})

globalStyle(`${filterCategories} .filter-groups-list`, {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingLeft: 26,
})

globalStyle(`${filterCategories} .filter-item-row`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

globalStyle(`${filterCategories} .filter-groups-count`, {
  marginLeft: 'auto',
  fontSize: vars.font.sizeSm,
  color: vars.color.textSecondary,
  flexShrink: 0,
})

/* ── 필터 내 아코디언 hover 효과 제거 ── */
globalStyle(`${filterCategories} .accordion-header:hover`, {
  background: 'transparent',
})

/* ── 필터 내 아코디언 content-inner 패딩 초기화 ── */
globalStyle(`${filterCategories} .accordion-content-inner`, {
  paddingLeft: 0,
  paddingRight: 0,
})

/* ── 필터 내 아코디언 카드 테두리 제거 ── */
globalStyle(`${filterCategories} ${accordionContainerCard}`, {
  border: 'none',
  borderRadius: 0,
  background: 'transparent',
})

export const filterSearchInput = style({
  width: '100%',
  boxSizing: 'border-box',
  padding: '6px 10px',
  fontSize: vars.font.sizeSm,
  fontFamily: 'inherit',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.text,
  outline: 'none',
})

export const filterEmptyText = style({
  padding: '12px 0',
  fontSize: vars.font.sizeSm,
  color: vars.color.textMuted,
})
