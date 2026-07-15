import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/* ── Pagination Bar ── */
export const paginationBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  width: '100%',
  gap: 12,
})

globalStyle(`${paginationBar}.pagination-bar-sm`, {
  fontSize: vars.font.sizeXs,
  vars: { '--pagination-radius': vars.radius.sm },
})
globalStyle(`${paginationBar}.pagination-bar-sm .pagination-page-jump input`, {
  height: 28,
  borderRadius: vars.radius.sm,
})
globalStyle(`${paginationBar}.pagination-bar-md`, {
  fontSize: vars.font.sizeSm,
  vars: { '--pagination-radius': vars.radius.md },
})
globalStyle(`${paginationBar}.pagination-bar-md .pagination-page-jump input`, {
  height: 32,
  borderRadius: vars.radius.md,
})
globalStyle(`${paginationBar}.pagination-bar-lg`, {
  fontSize: vars.font.sizeMd,
  vars: { '--dropdown-height-lg': '40px', '--pagination-radius': vars.radius.lg },
})
globalStyle(`${paginationBar}.pagination-bar-lg .pagination-page-jump input`, {
  height: 40,
  borderRadius: vars.radius.lg,
})

/* ── Page Size Dropdown ── */
export const pageSizeDropdown = style({
  vars: {
    '--dropdown-min-width-sm': '80px',
    '--dropdown-min-width-md': '80px',
    '--dropdown-min-width-lg': '80px',
  },
})

/* ── Pagination Center ── */
export const paginationCenter = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
})

/* ── Page Info ── */
export const pageInfo = style({
  color: vars.color.textSecondary,
  fontSize: 'inherit',
  whiteSpace: 'nowrap',
})

/* ── Page Jump ── */
export const pageJump = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  color: vars.color.textSecondary,
  fontSize: 'inherit',
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

globalStyle(`${pageJump} input`, {
  width: 40,
  padding: '0 4px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: `var(--pagination-radius, ${vars.radius.md})`,
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontSize: 'inherit',
  textAlign: 'center',
  outline: 'none',
})

globalStyle(`${pageJump} input:focus`, {
  borderColor: vars.color.primary,
})

/* ── Pagination List ── */
export const pagination = style({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  gap: 4,
  userSelect: 'none',
})

globalStyle(`${pagination}.pagination-sm`, { fontSize: vars.font.sizeXs })
globalStyle(`${pagination}.pagination-sm li`, { width: 28, height: 28 })
globalStyle(`${pagination}.pagination-md`, { fontSize: vars.font.sizeSm })
globalStyle(`${pagination}.pagination-md li`, { width: 32, height: 32 })
globalStyle(`${pagination}.pagination-lg`, { fontSize: vars.font.sizeMd })
globalStyle(`${pagination}.pagination-lg li`, { width: 40, height: 40 })

globalStyle(`${pagination}.disabled`, {
  pointerEvents: 'none',
  opacity: 0.4,
})

/* ── Pagination Item ── */
export const paginationItem = style({
  cursor: 'pointer',
  borderRadius: `var(--pagination-radius, ${vars.radius.md})`,
  backgroundColor: `var(--color-pagination-item-bg, ${vars.color.surface})`,
  color: vars.color.textSecondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',
})

globalStyle(`${paginationItem}.active`, {
  background: `var(--color-pagination-active-bg, ${vars.color.primary})`,
  color: vars.color.textInverse,
  fontWeight: 600,
})

globalStyle(`${paginationItem}.active svg`, {
  fill: vars.color.textInverse,
})

globalStyle(`${paginationItem}:not(.active):not(.ellipsis):hover`, {
  background: `var(--color-pagination-hover-bg, ${vars.color.surfaceHover})`,
})

globalStyle(`${paginationItem}.ellipsis`, {
  cursor: 'default',
  background: 'transparent',
  letterSpacing: '2px',
})

globalStyle(`${paginationItem}.disabled`, {
  pointerEvents: 'none',
  color: vars.color.textMuted,
  background: vars.color.background,
})

globalStyle(`${paginationItem}.disabled svg`, {
  fill: vars.color.textMuted,
})

globalStyle(`${paginationItem} svg`, {
  fill: vars.color.textSecondary,
})
