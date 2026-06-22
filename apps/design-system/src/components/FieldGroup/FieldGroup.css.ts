import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  overflow: 'hidden',
  backgroundColor: vars.color.surface,
  transition: vars.duration.fast,
  ':focus-within': {
    borderColor: vars.color.brand[600],
    boxShadow: `0 0 0 2px rgba(113, 135, 255, 0.2)`,
  },
})

export const label = style({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  fontFamily: vars.font.family.sans,
  fontWeight: vars.font.weight.medium,
  color: vars.color.textSecondary,
  borderRight: `1px solid ${vars.color.border}`,
  whiteSpace: 'nowrap',
})

export const labelSize = styleVariants({
  sm: {
    padding: `${vars.space[1]} ${vars.space[2]}`,
    fontSize: vars.font.size.sm,
  },
  md: {
    padding: `${vars.space[2]} ${vars.space[4]}`,
    fontSize: vars.font.size.sm,
  },
  lg: {
    padding: `${vars.space[4]} ${vars.space[6]}`,
    fontSize: vars.font.size.md,
  },
})

export const content = style({
  display: 'inline-flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
})

export type FieldGroupSize = keyof typeof labelSize
