import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[1],
})

const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 28,
  height: 28,
  padding: `0 ${vars.space[1]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  cursor: 'pointer',
  transition: `all ${vars.duration.fast}`,
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surfaceMuted,
      borderColor: vars.color.borderStrong,
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

export const button = style([buttonBase])

export const pageButton = style([
  buttonBase,
  {
    selectors: {
      '&[aria-current="page"]': {
        background: vars.color.brand[600],
        borderColor: vars.color.brand[600],
        color: vars.color.textInverse,
      },
      '&[aria-current="page"]:hover': {
        background: vars.color.brand[700],
        borderColor: vars.color.brand[700],
      },
    },
  },
])

export const ellipsis = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 24,
  height: 28,
  color: vars.color.textDisabled,
  fontSize: vars.font.size.sm,
  userSelect: 'none',
})
