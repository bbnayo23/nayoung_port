import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/* ── Wrapper (toolbar 포함 시) ── */
export const tableWrap = style({
  display: 'flex',
  flexDirection: 'column',
})

export const tableToolbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '4px 8px',
  gap: 4,
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
})

export const tableEmptyCell = style({
  padding: '32px 16px',
  textAlign: 'center',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.font.sizeSm,
  border: `1px solid ${vars.color.border}`,
})

/* ── Size variants ── */
globalStyle(`${table}.table-sm`, { fontSize: vars.font.sizeXs })
globalStyle(`${table}.table-sm th, ${table}.table-sm td`, { padding: '0 8px', height: 32 })
globalStyle(`${table}.table-md`, { fontSize: vars.font.sizeSm })
globalStyle(`${table}.table-md th, ${table}.table-md td`, { padding: '0 8px', height: 32 })
globalStyle(`${table}.table-lg`, { fontSize: vars.font.sizeMd })
globalStyle(`${table}.table-lg th, ${table}.table-lg td`, { padding: '0 12px', height: 40 })

/* ── Bordered (셀 간 세로 보더 — ag-grid 동일) ── */
globalStyle(`${table} th, ${table} td`, {
  borderBottom: `1px solid ${vars.color.border}`,
  borderRight: `1px solid ${vars.color.border}`,
})

globalStyle(`${table} th:last-child, ${table} td:last-child`, {
  borderRight: 'none',
})

/* ── table-bordered 추가 보더 ── */
globalStyle(`${table}.table-bordered`, { border: `1px solid ${vars.color.border}` })
globalStyle(`${table}.table-bordered th, ${table}.table-bordered td`, {
  border: `1px solid ${vars.color.border}`,
})

/* ── Striped ── */
globalStyle(`${table}.table-striped tbody tr:nth-child(even)`, {
  backgroundColor: vars.color.surfaceHover,
})

/* ── Hoverable ── */
globalStyle(`${table}.table-hoverable tbody tr:hover`, {
  backgroundColor: vars.color.surfaceHover,
})

/* ── Head (ag-grid 통일: bgSurface, fontWeight 700) ── */
export const tableHead = style({
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontWeight: 700,
})

globalStyle(`${tableHead} th`, {
  borderBottom: `0.5px solid ${vars.color.border}`,
})

/* ── Body ── */
export const tableBody = style({})

/* ── Row ── */
export const tableRow = style({
  transition: `background-color ${vars.transition.fast}`,
})

globalStyle(`${tableRow}.table-row-active`, {
  backgroundColor: 'transparent',
})

/* expanded 콘텐츠 행: 배경 투명 + 패딩 조정 */
globalStyle(`${tableRow}.table-row-active + tr td`, {
  backgroundColor: 'transparent',
  padding: '12px 16px',
  lineHeight: 1.5,
  fontSize: vars.font.sizeSm,
  color: vars.color.textSecondary,
})

globalStyle(`${tableRow}.table-row-expandable`, { cursor: 'pointer' })

/* ── Cell ── */
export const tableCell = style({
  lineHeight: '32px',
  verticalAlign: 'middle',
})

globalStyle(`${tableCell}.align-center`, { textAlign: 'center' })
globalStyle(`${tableCell}.align-right`, { textAlign: 'right' })

/* ── Header Cell ── */
export const tableHeaderCell = style({
  lineHeight: '32px',
  verticalAlign: 'middle',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  position: 'relative',
})

globalStyle(`${tableHeaderCell}.align-center`, { textAlign: 'center' })
globalStyle(`${tableHeaderCell}.align-right`, { textAlign: 'right' })

globalStyle(`${tableHeaderCell}.sortable`, {
  cursor: 'pointer',
  userSelect: 'none',
})

/* ── Sort indicator (ag-grid 방식: 단일 아이콘만 표시) ── */
globalStyle(`${tableHeaderCell} .sort-indicator`, {
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: 4,
  verticalAlign: 'middle',
  opacity: 0,
  transition: `opacity ${vars.transition.fast}`,
})

globalStyle(`${tableHeaderCell}.sortable:hover .sort-indicator`, {
  opacity: 0.5,
})

globalStyle(`${tableHeaderCell} .sort-indicator.sort-active-asc, ${tableHeaderCell} .sort-indicator.sort-active-desc`, {
  opacity: 1,
})

/* 기본: 둘 다 숨김 */
globalStyle(`${tableHeaderCell} .sort-indicator .sort-asc, ${tableHeaderCell} .sort-indicator .sort-desc`, {
  display: 'none',
  color: vars.color.textSecondary,
})

/* hover 미정렬: asc만 미리보기 */
globalStyle(
  `${tableHeaderCell}.sortable:hover .sort-indicator:not(.sort-active-asc):not(.sort-active-desc) .sort-asc`,
  {
    display: 'inline-block',
  },
)

/* 활성 정렬: 해당 방향만 표시 */
globalStyle(`${tableHeaderCell} .sort-indicator.sort-active-asc .sort-asc`, {
  display: 'inline-block',
  color: vars.color.primary,
})

globalStyle(`${tableHeaderCell} .sort-indicator.sort-active-desc .sort-desc`, {
  display: 'inline-block',
  color: vars.color.primary,
})

globalStyle(`${tableCell}.table-expand-cell-width`, {
  width: 32,
  textAlign: 'center',
  padding: '0 !important' as '0',
  verticalAlign: 'middle',
})

/* ── Expand Icon ── */
export const expandIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  borderRadius: '50%',
  cursor: 'pointer',
  color: vars.color.textSecondary,
  transition: `transform ${vars.transition.fast}, background ${vars.transition.fast}`,
})

globalStyle(`${expandIcon}:hover`, {
  background: vars.color.surfaceHover,
})

globalStyle(`${expandIcon} svg`, {
  flexShrink: 0,
})

globalStyle(`${expandIcon}.expanded`, { transform: 'rotate(90deg)' })
