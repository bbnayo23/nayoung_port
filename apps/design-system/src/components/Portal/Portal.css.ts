import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const panel = style({
  position: 'absolute',
  zIndex: 9999,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.lg,
  overflow: 'hidden',
})
