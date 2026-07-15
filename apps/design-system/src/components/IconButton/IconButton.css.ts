import { recipe } from '@vanilla-extract/recipes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { vars } from '@dc/theme/contract.css'

export const iconButtonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '50%',
    color: vars.color.text,
    transition: `background ${vars.transition.fast}`,
    flexShrink: 0,
    outline: 'none',
    selectors: {
      '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
    },
  },
  variants: {
    size: {
      sm: { padding: 4, minWidth: 24, minHeight: 24 },
      md: { padding: 6, minWidth: 28, minHeight: 28 },
      lg: { padding: 8, minWidth: 32, minHeight: 32 },
    },
    variant: {
      default: {
        backgroundColor: vars.color.surface,
        border: `1px solid ${vars.color.border}`,
        selectors: {
          '&:hover:not(:disabled), &.is-hover:not(:disabled)': { backgroundColor: vars.color.surfaceHover },
        },
      },
      primary: {
        backgroundColor: vars.color.primary,
        color: vars.color.textInverse,
        selectors: {
          '&:hover:not(:disabled), &.is-hover:not(:disabled)': { opacity: 0.9 },
        },
      },
      danger: {
        backgroundColor: vars.color.error,
        color: vars.color.textInverse,
        selectors: {
          '&:hover:not(:disabled), &.is-hover:not(:disabled)': { opacity: 0.9 },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled), &.is-hover:not(:disabled)': { backgroundColor: vars.color.surfaceHover },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        border: `1px solid ${vars.color.border}`,
        selectors: {
          '&:hover:not(:disabled), &.is-hover:not(:disabled)': { backgroundColor: vars.color.surfaceHover },
        },
      },
      circle: {
        backgroundColor: vars.color.surface,
        border: `1px solid ${vars.color.border}`,
        selectors: {
          '&:hover:not(:disabled), &.is-hover:not(:disabled)': { backgroundColor: vars.color.surfaceHover },
        },
      },
    },
  },
  defaultVariants: { size: 'md' },
})

export type IconButtonVariants = RecipeVariants<typeof iconButtonRecipe>
