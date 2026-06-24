import { recipe } from '@vanilla-extract/recipes'
import { vars } from '../../theme/contract.css'

export const dividerRecipe = recipe({
  base: {
    border: 'none',
    margin: 0,
    flexShrink: 0,
  },
  variants: {
    direction: {
      horizontal: {
        width: '100%',
        height: 0,
        borderTop: `1px solid ${vars.color.border}`,
      },
      vertical: {
        width: 0,
        alignSelf: 'stretch',
        borderLeft: `1px solid ${vars.color.border}`,
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})
