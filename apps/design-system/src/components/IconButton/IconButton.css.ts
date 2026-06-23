import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const base = style(
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    borderRadius: vars.radius.full,
    transition: vars.duration.fast,
    outline: 'none',
    flexShrink: 0,
    selectors: {
      '&:disabled': {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
  },
  'ds-icon-button',
)

export const variant = styleVariants(
  {
    default: {
      backgroundColor: vars.color.surface,
      color: vars.color.text,
      border: `1px solid ${vars.color.border}`,
      selectors: {
        '&:hover:not(:disabled)': { backgroundColor: vars.color.surfaceMuted },
      },
    },
    primary: {
      backgroundColor: vars.color.brand[600],
      color: vars.color.textInverse,
      border: 'none',
      selectors: {
        '&:hover:not(:disabled)': { opacity: 0.9 },
      },
    },
    danger: {
      backgroundColor: vars.color.danger,
      color: vars.color.textInverse,
      border: 'none',
      selectors: {
        '&:hover:not(:disabled)': { opacity: 0.9 },
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: vars.color.text,
      border: 'none',
      selectors: {
        '&:hover:not(:disabled)': { backgroundColor: vars.color.surfaceMuted },
      },
    },
  },
  'ds-icon-button-variant',
)

export const size = styleVariants(
  {
    sm: { width: 24, height: 24 },
    md: { width: 28, height: 28 },
  },
  'ds-icon-button-size',
)

export type IconButtonVariant = keyof typeof variant
export type IconButtonSize = keyof typeof size
