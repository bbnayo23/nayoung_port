import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const wrapper = style({
  display: 'inline-flex',
  position: 'relative',
  width: '100%',
})

export const input = style({
  display: 'block',
  width: '100%',
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.md,
  color: vars.color.text,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: `6px 12px`,
  paddingRight: '36px',
  outline: 'none',
  transition: `border-color ${vars.duration.fast} ease, box-shadow ${vars.duration.fast} ease`,
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

export const calendarIcon = style({
  position: 'absolute',
  right: vars.space[2],
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.color.textDisabled,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
})

export const panel = style({
  position: 'absolute',
  zIndex: vars.zIndex.dropdown,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.lg,
  overflow: 'hidden',
})
