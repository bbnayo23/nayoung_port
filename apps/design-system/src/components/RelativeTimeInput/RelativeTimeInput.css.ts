import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const input = style({
  width: '80px',
  fontFamily: 'monospace',
  textAlign: 'center',
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: `${vars.space[1]} ${vars.space[2]}`,
  outline: 'none',
  transition: vars.duration.fast,
  '::placeholder': {
    color: vars.color.textDisabled,
  },
  ':focus': {
    borderColor: vars.color.brand[600],
    boxShadow: `0 0 0 2px rgba(113, 135, 255, 0.2)`,
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export const invalid = style({
  borderColor: vars.color.danger,
  ':focus': {
    borderColor: vars.color.danger,
    boxShadow: `0 0 0 2px rgba(250, 82, 82, 0.2)`,
  },
})
