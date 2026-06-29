import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

/* ── Size CSS variables ── */
globalStyle(`.searchbar-sm`, {
  vars: {
    '--sb-h': '28px',
    '--sb-font': '11px',
    '--sb-py': '4px',
    '--sb-px': '8px',
    '--sb-icon': '12px',
    '--searchbar-radius': vars.radius.sm,
  },
})
globalStyle(`.searchbar-md`, {
  vars: {
    '--sb-h': '32px',
    '--sb-font': '12px',
    '--sb-py': '6px',
    '--sb-px': '10px',
    '--sb-icon': '14px',
    '--searchbar-radius': vars.radius.md,
  },
})
globalStyle(`.searchbar-lg`, {
  vars: {
    '--sb-h': '36px',
    '--sb-font': '14px',
    '--sb-py': '8px',
    '--sb-px': '12px',
    '--sb-icon': '16px',
    '--searchbar-radius': vars.radius.lg,
  },
})

/* ── Root ── */
export const searchBarRoot = style({
  display: 'flex',
  alignItems: 'stretch',
  width: '100%',
  gap: 6,
})

globalStyle(`${searchBarRoot}.is-disabled`, { opacity: 0.4, pointerEvents: 'none' })

/* ── Wrapper — Input base style과 동일 ── */
export const searchBarWrapper = style({
  display: 'flex',
  alignItems: 'stretch',
  flex: 1,
  minWidth: 0,
  height: 'var(--sb-h, 32px)',
  border: '1px solid transparent',
  borderRadius: `var(--searchbar-radius, ${vars.radius.md})`,
  background: vars.color.surface,
  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
  transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  overflow: 'hidden',
})

globalStyle(`${searchBarWrapper}:focus-within`, {
  borderColor: vars.color.primary,
  boxShadow: 'none',
})

globalStyle(`${searchBarWrapper}.is-expanded`, {
  flexDirection: 'column',
  height: 'auto',
})

/* ── Input ── */
export const searchInput = style({
  flex: 1,
  minWidth: 0,
  padding: 'var(--sb-py, 6px) var(--sb-px, 10px)',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontSize: 'var(--sb-font, 12px)',
  fontFamily: 'inherit',
  lineHeight: 1,
  color: vars.color.text,
})

globalStyle(`${searchInput}::placeholder`, { color: vars.color.textMuted, opacity: 1 })

/* ── Clear Button ── */
export const clearButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 4,
  // 입력값 텍스트(좌)·suffix 구분선(우)과 너무 붙지 않도록 좌우 여백을 둔다.
  margin: '0 6px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: vars.color.textSecondary,
  flexShrink: 0,
  transition: `color ${vars.transition.fast}`,
})

globalStyle(`${clearButton} svg`, { width: 12, height: 12 })
globalStyle(`${clearButton}:hover`, { color: vars.color.text })

/* ── Search Button — icon only ── */
export const searchButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  padding: '0 8px',
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: 'var(--sb-font, 12px)',
  fontFamily: 'inherit',
  flexShrink: 0,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: `color ${vars.transition.fast}`,
})

globalStyle(`${searchButton} svg`, {
  width: 'var(--sb-icon, 14px)',
  height: 'var(--sb-icon, 14px)',
  flexShrink: 0,
  fill: vars.color.textSecondary,
  transition: `fill ${vars.transition.fast}`,
})

globalStyle(`${searchButton}:hover`, { color: vars.color.text })
globalStyle(`${searchButton}:hover svg`, { fill: vars.color.text })

/* ── Left Outer Actions Slot (wrapper 외부 왼쪽) ── */
export const leftOuterActionsSlot = style({
  display: 'flex',
  alignItems: 'stretch',
  flexShrink: 0,
  height: 'var(--sb-h, 32px)',
  border: `1px solid ${vars.color.border}`,
  borderRadius: `var(--searchbar-radius, ${vars.radius.md})`,
  overflow: 'hidden',
})

globalStyle(`${leftOuterActionsSlot} > button`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 32,
  padding: '0 8px',
  border: 'none',
  background: vars.color.background,
  color: vars.color.text,
  fontSize: vars.font.sizeSm,
  fontFamily: 'inherit',
  cursor: 'pointer',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: `background ${vars.transition.fast}`,
})

globalStyle(`${leftOuterActionsSlot} > button svg`, { width: 14, height: 14 })
globalStyle(`${leftOuterActionsSlot} > button + button`, { borderLeft: `1px solid ${vars.color.border}` })
globalStyle(`${leftOuterActionsSlot} > button:hover`, { background: vars.color.surfaceHover })
globalStyle(`${leftOuterActionsSlot} > button:active`, { background: vars.color.surfaceHover })

/* ── Left Actions Slot (wrapper 내부 왼쪽) ── */
export const leftActionsSlot = style({
  display: 'flex',
  alignItems: 'stretch',
  flexShrink: 0,
})

globalStyle(`${leftActionsSlot} > button`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  padding: 0,
  border: 'none',
  borderRight: `1px solid ${vars.color.border}`,
  background: vars.color.background,
  color: vars.color.text,
  cursor: 'pointer',
  flexShrink: 0,
  transition: `background ${vars.transition.fast}`,
})

globalStyle(`${leftActionsSlot} > button svg`, { width: 14, height: 14 })
globalStyle(`${leftActionsSlot} > button:first-child`, {
  borderRadius: `var(--searchbar-radius, ${vars.radius.md}) 0 0 var(--searchbar-radius, ${vars.radius.md})`,
})
globalStyle(`${leftActionsSlot} > button:hover`, { background: vars.color.surfaceHover })
globalStyle(`${leftActionsSlot} > button:active`, { background: vars.color.surfaceHover })

/* ── Query Tag (결과 내 재검색용) ── */
globalStyle(`${leftActionsSlot} > .searchbar-query-tag`, {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '0 10px',
  borderRight: `1px solid ${vars.color.border}`,
  background: vars.color.background,
  color: vars.color.text,
  fontSize: 'var(--sb-font, 12px)',
  maxWidth: 480,
  overflow: 'hidden',
  cursor: 'default',
})

globalStyle(`${leftActionsSlot} > .searchbar-query-tag .query-indicator`, {
  width: 8,
  height: 8,
  borderRadius: '50%',
  border: `1.5px solid ${vars.color.textSecondary}`,
  flexShrink: 0,
})

globalStyle(`${leftActionsSlot} > .searchbar-query-tag .query-text`, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

/* ── Prefix Slot ── */
export const prefixSlot = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0 var(--sb-px, 10px)',
  margin: 0,
  border: 'none',
  borderRight: `1px solid ${vars.color.border}`,
  background: 'transparent',
  cursor: 'default',
  flexShrink: 0,
  gap: 4,
})

globalStyle(`${prefixSlot}.is-interactive`, { cursor: 'pointer', transition: `background ${vars.transition.fast}` })
globalStyle(`${prefixSlot}.is-interactive:hover`, {
  background: vars.color.surfaceHover,
  borderRadius: `var(--searchbar-radius, ${vars.radius.md}) 0 0 var(--searchbar-radius, ${vars.radius.md})`,
})

/* ── Suffix Actions Slot ── */
export const suffixActionsSlot = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0 4px',
  flexShrink: 0,
  gap: 2,
  borderLeft: `1px solid ${vars.color.border}`,
})

globalStyle(`${suffixActionsSlot} > button`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  padding: 4,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: vars.color.textSecondary,
  fontSize: 'var(--sb-font, 12px)',
  fontFamily: 'inherit',
  transition: `color ${vars.transition.fast}`,
})

globalStyle(`${suffixActionsSlot} > button svg`, { width: 14, height: 14 })
globalStyle(`${suffixActionsSlot} > button:hover`, { color: vars.color.text })

/* ── Right Actions Slot (wrapper 외부 오른쪽) ── */
export const rightActionsSlot = style({
  display: 'flex',
  alignItems: 'stretch',
  flexShrink: 0,
  height: 'var(--sb-h, 32px)',
  border: `1px solid ${vars.color.border}`,
  borderRadius: `var(--searchbar-radius, ${vars.radius.md})`,
  overflow: 'hidden',
})

globalStyle(`${rightActionsSlot} > button`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  padding: 0,
  border: 'none',
  background: vars.color.background,
  color: vars.color.text,
  cursor: 'pointer',
  flexShrink: 0,
  transition: `background ${vars.transition.fast}`,
})

globalStyle(`${rightActionsSlot} > button svg`, { width: 14, height: 14 })
globalStyle(`${rightActionsSlot} > button + button`, { borderLeft: `1px solid ${vars.color.border}` })
globalStyle(`${rightActionsSlot} > button:hover`, { background: vars.color.surfaceHover })
globalStyle(`${rightActionsSlot} > button:active`, { background: vars.color.surfaceHover })

/* ── Expand Button ── */
export const expandButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  border: 'none',
  borderLeft: `1px solid ${vars.color.border}`,
  background: 'transparent',
  cursor: 'pointer',
  color: vars.color.textSecondary,
  flexShrink: 0,
  transition: `color ${vars.transition.fast}`,
})

globalStyle(`${expandButton}:hover`, { color: vars.color.text })
globalStyle(`${expandButton} svg`, { width: 14, height: 14 })

/* ── Expanded Top Row (확장 시 상단 컨트롤 바) ── */
export const expandedTopRow = style({
  display: 'flex',
  alignItems: 'stretch',
  height: 'var(--sb-h, 32px)',
  flexShrink: 0,
  borderBottom: `1px solid ${vars.color.border}`,
})

/* ── Search Textarea (확장 모드) ── */
export const searchTextarea = style({
  flex: 1,
  minWidth: 0,
  minHeight: 80,
  padding: 'var(--sb-py, 6px) var(--sb-px, 10px)',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontSize: 'var(--sb-font, 12px)',
  lineHeight: 1.6,
  color: vars.color.text,
  resize: 'none',
  fontFamily: 'inherit',
})

globalStyle(`${searchTextarea}::placeholder`, { color: vars.color.textMuted, opacity: 1 })

/* ── XDR 오버라이드 ── */
globalStyle(`[data-solution="xdr"] .${searchBarWrapper}`, {
  border: 'none',
  boxShadow: '0 0 3px rgba(0, 0, 0, 0.20)',
  borderRadius: `var(--searchbar-radius, ${vars.radius.md})`,
})

globalStyle(`[data-solution="xdr"] .${searchBarWrapper}:focus-within`, {
  boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.primary} 30%, transparent)`,
})
