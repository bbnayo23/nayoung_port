import { style, globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { vars } from '../../theme/contract.css'

/* ── InputWrapper ── */
export const inputWrapper = style({
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
})

globalStyle(`.full-width.${inputWrapper}`, { width: '100%' })

/* ── InputFieldArea ── */
export const inputFieldArea = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

/* ── Input ── */
export const inputRecipe = recipe({
  base: {
    width: 'auto',
    minWidth: 140,
    height: 32,
    padding: '6px 10px',
    fontSize: vars.font.sizeSm,
    fontFamily: 'inherit',
    color: `var(--color-input-text, ${vars.color.text})`,
    background: `var(--color-input-bg, ${vars.color.surface})`,
    border: `1px solid var(--color-input-border, ${vars.color.border})`,
    borderRadius: `var(--input-radius, ${vars.radius.sm})`,
    outline: 'none',
    position: 'relative',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    selectors: {
      '&::placeholder': { color: vars.color.textMuted, opacity: 1 },
      '&:hover:not(:focus):not(:disabled), &.is-hover:not(:disabled)': {
        borderColor: `var(--color-input-border-hover, ${vars.color.borderHover})`,
      },
      '&:focus, &.is-focus': {
        borderColor: `var(--color-input-focus-border, ${vars.color.primary})`,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.primary} 24%, transparent)`,
      },
      '&.full-width': { width: '100%' },
      '&.disabled, &:disabled': {
        backgroundColor: `var(--color-input-disabled-bg, ${vars.color.surfaceHover})`,
        cursor: 'default',
        opacity: 0.4,
      },
      '&.with-prefix-icon': { paddingLeft: 36 },
      '&.with-suffix-icon': { paddingRight: 36 },
      '&.clearable': { paddingRight: 36 },
    },
  },
  variants: {
    variant: {
      default: {},
      ghost: {
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        padding: '0 4px',
        selectors: {
          '&:focus, &.is-focus': {
            borderColor: 'transparent',
            boxShadow: 'none',
            background: `var(--color-input-ghost-focus-bg, ${vars.color.surfaceHover})`,
            borderRadius: `var(--input-radius, ${vars.radius.sm})`,
          },
          '&:hover:not(:focus):not(:disabled), &.is-hover:not(:disabled)': {
            background: `var(--color-input-ghost-hover-bg, ${vars.color.surfaceHover})`,
            borderRadius: `var(--input-radius, ${vars.radius.sm})`,
          },
        },
      },
      error: {
        borderColor: vars.color.error,
        selectors: {
          '&:hover:not(:focus):not(:disabled), &.is-hover:not(:disabled)': {
            borderColor: vars.color.error,
          },
          '&:focus, &.is-focus': { borderColor: vars.color.error, boxShadow: 'none' },
        },
      },
      success: {
        borderColor: vars.color.success,
        selectors: {
          '&:hover:not(:focus):not(:disabled), &.is-hover:not(:disabled)': {
            borderColor: vars.color.success,
          },
          '&:focus, &.is-focus': { borderColor: vars.color.success, boxShadow: 'none' },
        },
      },
      warning: {
        borderColor: vars.color.warning,
        selectors: {
          '&:hover:not(:focus):not(:disabled), &.is-hover:not(:disabled)': {
            borderColor: vars.color.warning,
          },
          '&:focus, &.is-focus': { borderColor: vars.color.warning, boxShadow: 'none' },
        },
      },
    },
    size: {
      sm: {
        vars: { '--input-radius': vars.radius.sm },
        minWidth: 120,
        height: 28,
        padding: '4px 8px',
        fontSize: vars.font.sizeXs,
        selectors: {
          '&.with-prefix-icon': { paddingLeft: 32 },
          '&.with-suffix-icon': { paddingRight: 32 },
          '&.clearable': { paddingRight: 32 },
        },
      },
      md: {
        vars: { '--input-radius': vars.radius.sm },
      },
      lg: {
        vars: { '--input-radius': vars.radius.lg },
        minWidth: 160,
        height: 36,
        padding: '8px 12px',
        fontSize: vars.font.sizeMd,
        selectors: {
          '&.with-prefix-icon': { paddingLeft: 40 },
          '&.with-suffix-icon': { paddingRight: 40 },
          '&.clearable': { paddingRight: 40 },
        },
      },
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

export type InputRecipeVariants = RecipeVariants<typeof inputRecipe>

/* ── ClearButton ── */
export const clearButton = style({
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeMd,
  cursor: 'pointer',
  padding: 4,
  borderRadius: vars.radius.sm,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'color 0.15s ease-in-out',
  zIndex: 1,
})

globalStyle(`${clearButton} svg`, { fill: vars.color.textMuted })
globalStyle(`${clearButton}:hover`, { color: vars.color.textSecondary })
globalStyle(`${clearButton}:focus`, { outline: 'none', color: vars.color.textSecondary })

/* ── HelperText ── */
export const helperTextRecipe = recipe({
  base: {
    margin: '6px 0 0 10px',
    fontSize: vars.font.sizeSm,
    lineHeight: 1.4,
    color: vars.color.textMuted,
    transition: 'color 0.15s ease-in-out',
  },
  variants: {
    variant: {
      default: {},
      error: { color: vars.color.error },
      success: { color: vars.color.success },
      warning: { color: vars.color.warning },
    },
  },
  defaultVariants: { variant: 'default' },
})

/* ── PrefixIconWrapper ── */
export const prefixIconWrapper = style({
  position: 'absolute',
  left: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeMd,
  padding: 4,
  zIndex: 1,
  transition: 'color 0.15s ease-in-out',
})

globalStyle(`${prefixIconWrapper} svg`, { fill: vars.color.textSecondary })

/* ── SuffixIconWrapper ── */
export const suffixIconWrapper = style({
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeMd,
  padding: 4,
  zIndex: 1,
  transition: 'color 0.15s ease-in-out',
  width: 20,
  height: 20,
})

globalStyle(`${suffixIconWrapper} svg`, {
  fill: vars.color.textSecondary,
  width: 16,
  height: 16,
  display: 'block',
})
