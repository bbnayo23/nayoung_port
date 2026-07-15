import { style } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

export const menu = style({
  position: 'fixed',
  zIndex: 2000,
  minWidth: 160,
  margin: 0,
  padding: '4px 0',
  listStyle: 'none',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.md,
})

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 12px',
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  selectors: {
    "&:hover:not([aria-disabled='true']), &.is-hover:not([aria-disabled='true'])": {
      backgroundColor: vars.color.surfaceHover,
    },
    '&:focus, &.is-focus': {
      outline: 'none',
      backgroundColor: vars.color.surfaceHover,
    },
  },
})

export const itemDisabled = style({
  opacity: 0.4,
  cursor: 'not-allowed',
})

export const itemActive = style({
  backgroundColor: vars.color.surfaceHover,
})

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  flexShrink: 0,
  color: vars.color.textSecondary,
})

export const divider = style({
  margin: '4px 0',
  height: 1,
  backgroundColor: vars.color.border,
})

export const chevron = style({
  marginLeft: 'auto',
  paddingLeft: 8,
  display: 'inline-flex',
  alignItems: 'center',
  color: vars.color.textSecondary,
  flexShrink: 0,
})

export const subMenu = style({
  position: 'absolute',
  top: 0,
  left: '100%',
  zIndex: 2001,
  minWidth: 160,
  margin: 0,
  padding: '4px 0',
  listStyle: 'none',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.md,
})

export const subMenuLeft = style({
  left: 'auto',
  right: '100%',
})
