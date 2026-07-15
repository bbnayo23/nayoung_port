import { style, keyframes, createVar, globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { vars } from '@dc/theme/contract.css'
import { createButtonTokens } from './Button.tokens'

// ── 토큰 적용 ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalStyle(':root', createButtonTokens() as any)

// ── Icon slot ─────────────────────────────────────────────────────────────────

export const btnIconSizeVar = createVar()

const spin = keyframes({ to: { transform: 'rotate(360deg)' } })

export const spinner = style({
  display: 'inline-block',
  width: btnIconSizeVar,
  height: btnIconSizeVar,
  border: '2px solid currentColor',
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: `${spin} 0.7s linear infinite`,
  flexShrink: 0,
})

export const iconSlot = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontSize: btnIconSizeVar,
  width: btnIconSizeVar,
  height: btnIconSizeVar,
})

export const iconOnlyStyle = style({
  padding: 0,
  aspectRatio: '1',
  borderRadius: '50%',
})

// ── Recipe ────────────────────────────────────────────────────────────────────

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    fontWeight: 500,
    lineHeight: 1,
    borderRadius: vars.radius.md,
    cursor: 'pointer',
    transition: [
      `background-color ${vars.transition.fast}`,
      `color ${vars.transition.fast}`,
      `border-color ${vars.transition.fast}`,
      `transform ${vars.transition.fast}`,
      `filter ${vars.transition.fast}`,
      `outline-color ${vars.transition.fast}`,
    ].join(', '),
    userSelect: 'none',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    position: 'relative',
    selectors: {
      '&:disabled': {
        opacity: 0.4,
        cursor: 'not-allowed',
        pointerEvents: 'none',
        transform: 'none',
      },
      '&.is-loading': {
        opacity: 0.75,
        cursor: 'wait',
        pointerEvents: 'none',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        background: 'var(--color-button-primary-bg)',
        color: 'var(--color-button-primary-text)',
        border: '1.5px solid transparent',
        selectors: {
          '&:hover, &.is-hover': { background: 'var(--color-button-primary-bg-hover)' },
          '&:active, &.is-active': { background: 'var(--color-button-primary-bg-hover)', transform: 'scale(0.98)' },
          '&:focus-visible, &.is-focus': {
            outline: '3px solid var(--color-button-primary-focus)',
            outlineOffset: '2px',
          },
        },
      },
      secondary: {
        background: 'var(--color-button-secondary-bg)',
        color: 'var(--color-button-secondary-text)',
        border: '1.5px solid var(--color-button-secondary-border)',
        selectors: {
          '&:hover, &.is-hover': {
            background: 'var(--color-button-secondary-bg-hover)',
            color: 'var(--color-button-secondary-text-hover)',
            borderColor: 'var(--color-button-secondary-border-hover)',
          },
          '&:active, &.is-active': {
            background: 'var(--color-button-secondary-bg-hover)',
            color: 'var(--color-button-secondary-text-hover)',
            transform: 'scale(0.98)',
          },
          '&:focus-visible, &.is-focus': { outline: `3px solid ${vars.color.primary}`, outlineOffset: '2px' },
        },
      },
      outline: {
        background: 'transparent',
        color: 'var(--color-button-outline-text)',
        border: '1.5px solid var(--color-button-outline-border)',
        selectors: {
          '&:hover, &.is-hover': {
            background: 'var(--color-button-outline-bg-hover)',
            color: 'var(--color-button-outline-text-hover)',
          },
          '&:active, &.is-active': {
            background: 'var(--color-button-outline-bg-hover)',
            color: 'var(--color-button-outline-text-hover)',
            transform: 'scale(0.98)',
          },
          '&:focus-visible, &.is-focus': {
            outline: '3px solid var(--color-button-outline-focus)',
            outlineOffset: '2px',
          },
        },
      },
      ghost: {
        background: 'transparent',
        color: 'var(--color-button-ghost-text)',
        border: '1.5px solid transparent',
        selectors: {
          '&:hover, &.is-hover': {
            background: 'var(--color-button-ghost-bg-hover)',
            color: 'var(--color-button-ghost-text-hover)',
          },
          '&:active, &.is-active': { background: 'var(--color-button-ghost-bg-hover)', transform: 'scale(0.98)' },
          '&:focus-visible, &.is-focus': { outline: '3px solid var(--color-button-ghost-focus)', outlineOffset: '2px' },
        },
      },
      danger: {
        background: 'var(--color-button-danger-bg)',
        color: 'var(--color-button-danger-text)',
        border: '1.5px solid transparent',
        selectors: {
          '&:hover, &.is-hover': { filter: 'brightness(1.1)' },
          '&:active, &.is-active': { filter: 'brightness(0.9)', transform: 'scale(0.98)' },
          '&:focus-visible, &.is-focus': {
            outline: '3px solid var(--color-button-danger-focus)',
            outlineOffset: '2px',
          },
        },
      },
      // AiR Works 브랜드 다크 버튼 (Figma "dp-btn primary") — 블랙 배경 + 화이트 텍스트
      dark: {
        background: '#111827',
        color: '#ffffff',
        border: '1.5px solid transparent',
        selectors: {
          '&:hover, &.is-hover': { background: '#1f2937' },
          '&:active, &.is-active': { background: '#1f2937', transform: 'scale(0.98)' },
          '&:focus-visible, &.is-focus': { outline: '3px solid rgba(17, 24, 39, 0.3)', outlineOffset: '2px' },
        },
      },
    },
    size: {
      sm: { vars: { [btnIconSizeVar]: '12px' }, height: 28, gap: 4, padding: '4px 8px', fontSize: vars.font.sizeXs },
      md: { vars: { [btnIconSizeVar]: '14px' }, height: 32, gap: 6, padding: '8px 12px', fontSize: vars.font.sizeSm },
      lg: { vars: { [btnIconSizeVar]: '16px' }, height: 36, gap: 8, padding: '12px 16px', fontSize: vars.font.sizeLg },
    },
    fullWidth: {
      true: { width: '100%' },
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

export type ButtonRecipeVariants = RecipeVariants<typeof buttonRecipe>
