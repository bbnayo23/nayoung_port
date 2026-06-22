import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const wrapper = style({
  width: '100%',
})

export const treeMenuWrapper = style({
  padding: vars.space[1],
  minWidth: 320,
})
