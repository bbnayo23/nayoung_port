import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const highlight = style(
  {
    backgroundColor: vars.color.brand[600],
    color: vars.color.textInverse,
    borderRadius: vars.radius.sm,
    padding: '0 2px',
  },
  'ds-highlight',
)
