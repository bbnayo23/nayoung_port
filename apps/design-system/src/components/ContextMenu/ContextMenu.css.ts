import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const menu = style({
  position: 'fixed',
  zIndex: 2000,
  minWidth: 160,
  margin: 0,
  padding: `${vars.space[1]} 0`,
  listStyle: 'none',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.md,
})

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  padding: `${vars.space[1]} ${vars.space[4]}`,
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  selectors: {
    "&:hover:not([aria-disabled='true'])": {
      backgroundColor: vars.color.surfaceMuted,
    },
    '&:focus': {
      outline: 'none',
      backgroundColor: vars.color.surfaceMuted,
    },
  },
})

export const itemDisabled = style({
  opacity: 0.4,
  cursor: 'not-allowed',
})

export const itemActive = style({
  backgroundColor: vars.color.surfaceMuted,
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
  margin: `${vars.space[1]} 0`,
  height: 1,
  backgroundColor: vars.color.border,
})

export const chevron = style({
  marginLeft: 'auto',
  paddingLeft: vars.space[2],
  fontSize: vars.font.size.xs,
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
  padding: `${vars.space[1]} 0`,
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
