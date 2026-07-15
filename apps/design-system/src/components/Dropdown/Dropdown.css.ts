import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/* ── 테마 토큰 → Dropdown 전용 CSS 변수 바인딩 ── */
const dropdownVars = {
  /* 테마 색상 */
  '--dropdown-border': vars.color.border,
  '--dropdown-border-focus': vars.color.primary,
  '--dropdown-bg-open': vars.color.surface,
  '--dropdown-text': vars.color.text,
  '--dropdown-placeholder-text': vars.color.textMuted,
  '--dropdown-chevron-color': vars.color.textSecondary,
  '--dropdown-item-text': vars.color.text,
  '--dropdown-item-text-selected': vars.color.primary,
  '--dropdown-item-text-disabled': vars.color.textMuted,
  '--dropdown-item-bg-hover': vars.color.surfaceHover,
  '--dropdown-menu-bg': vars.color.surface,
  '--dropdown-menu-border': vars.color.border,
  '--dropdown-menu-shadow': vars.shadow.md,
  /* 사이즈: sm */
  '--dropdown-height-sm': '28px',
  '--dropdown-min-width-sm': '80px',
  '--dropdown-padding-sm': '0 6px',
  '--dropdown-gap-sm': '4px',
  '--dropdown-font-size-sm': '11px',
  /* 사이즈: md */
  '--dropdown-height-md': '32px',
  '--dropdown-min-width-md': '100px',
  '--dropdown-padding-md': '0 8px',
  '--dropdown-gap-md': '4px',
  '--dropdown-font-size-md': '12px',
  /* 사이즈: lg */
  '--dropdown-height-lg': '40px',
  '--dropdown-min-width-lg': '120px',
  '--dropdown-padding-lg': '0 10px',
  '--dropdown-gap-lg': '6px',
  '--dropdown-font-size-lg': '13px',
} as const

/* ── DropdownWrapper (라벨 있는 경우) ── */
export const dropdownWrapper = style({
  display: 'inline-flex',
  alignItems: 'stretch',
  vars: dropdownVars,
})

/* ── DropdownContainer (라벨 없는 경우) ── */
export const dropdownContainer = style({
  display: 'inline-block',
  vars: dropdownVars,
})

/* ── DropdownLabel ── */
export const dropdownLabel = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  padding: '0 10px',
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
  border: `1px solid ${vars.color.border}`,
  borderRight: 'none',
  borderRadius: `${vars.radius.md} 0 0 ${vars.radius.md}`,
  background: vars.color.background,
})

globalStyle(`.dropdown-sm .${dropdownLabel}`, {
  borderTopLeftRadius: vars.radius.sm,
  borderBottomLeftRadius: vars.radius.sm,
})

globalStyle(`.dropdown-lg .${dropdownLabel}`, {
  borderTopLeftRadius: vars.radius.lg,
  borderBottomLeftRadius: vars.radius.lg,
})

export const dropdownSelectAll = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 8px 5px 12px',
  fontSize: vars.font.sizeSm,
  borderBottom: `1px solid ${vars.color.border}`,
  selectors: {
    '&:hover, &.is-hover': { background: vars.color.surfaceHover },
  },
})

export const dropdownSelectAllContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flex: 1,
  minWidth: 0,
  cursor: 'pointer',
  padding: '2px 0',
})

export const dropdownCountBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 18,
  height: 18,
  padding: '0 5px',
  borderRadius: 8,
  fontSize: 10,
  fontWeight: 600,
  background: vars.color.primary,
  color: vars.color.textInverse,
  lineHeight: 1,
  flexShrink: 0,
})

export const dropdownResetBtn = style({
  flexShrink: 0,
  padding: '2px 8px',
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  borderRadius: vars.radius.sm,
  lineHeight: '18px',
  selectors: {
    '&:hover, &.is-hover': {
      color: vars.color.text,
      background: vars.color.surfaceHover,
    },
  },
})

export const dropdownResetRow = style({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '4px 8px',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const multiValueBadge = style({
  margin: '1px 2px',
})

export const dropdownDivider = style({
  height: 1,
  background: vars.color.border,
  margin: '4px 0',
  pointerEvents: 'none',
})
