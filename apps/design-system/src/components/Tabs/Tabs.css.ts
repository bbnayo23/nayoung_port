import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { vars } from '../../theme/contract.css'

export const tabs = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

globalStyle(`${tabs}.tabs-vertical`, { flexDirection: 'row' })

/* ── List ── */
export const tabsList = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  gap: 12,
  overflowX: 'auto',
  scrollbarWidth: 'none',
})

globalStyle(`${tabsList}::-webkit-scrollbar`, { display: 'none' })

globalStyle(`${tabsList}.tabs-vertical`, {
  borderBottom: 0,
  flexDirection: 'column',
  minWidth: 'fit-content',
  alignItems: 'flex-start',
})

/* enclosed variant: tablist 자체에 배경 컨테이너 */
globalStyle(`${tabsList}.tabs-enclosed`, {
  backgroundColor: `var(--color-tab-enclosed-bg, ${vars.color.surfaceHover})`,
  borderRadius: vars.radius.md,
  padding: 4,
  gap: 2,
})

/* ── Tab Button base ── */
const tabButtonBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  border: 'none',
  background: 'transparent',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  position: 'relative',
  transition: `all ${vars.transition.fast}`,
  outline: 'none',
  flexShrink: 0,
  selectors: {
    '&:disabled': { color: vars.color.textMuted, cursor: 'default' },
    '&:focus-visible, &.is-focus': {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: 2,
      borderRadius: vars.radius.sm,
    },
  },
})

globalStyle(`${tabButtonBase} .tab-button-icon`, { display: 'flex', alignItems: 'center' })
globalStyle(`${tabButtonBase}:disabled .tab-button-icon`, { opacity: 0.4 })

/* ── outline variant ── */
const tabButtonOutline = style({
  fontSize: vars.font.sizeSm,
  color: `var(--color-tab-text, ${vars.color.text})`,
  padding: '6px 20px',
  borderRadius: 20,
  border: '1px solid transparent',
  selectors: {
    '&.is-active': {
      border: `1px solid ${vars.color.primary}`,
      color: vars.color.primary,
    },
    '&:hover:not(:disabled):not(.is-active), &.is-hover:not(:disabled):not(.is-active)': {
      color: vars.color.primary,
      borderColor: vars.color.primary,
    },
  },
})

globalStyle(`${tabButtonOutline} .tab-button-icon svg`, { fill: `var(--color-tab-text, ${vars.color.text})` })
globalStyle(`${tabButtonOutline}.is-active .tab-button-icon svg`, { fill: vars.color.primary })
globalStyle(`${tabButtonOutline}:hover:not(:disabled):not(.is-active) .tab-button-icon svg`, {
  fill: vars.color.primary,
})

/* ── underline variant ── */
const tabButtonUnderline = style({
  fontSize: vars.font.sizeMd,
  fontWeight: 500,
  padding: '6px 8px',
  color: `var(--color-tab-text, ${vars.color.textSecondary})`,
  letterSpacing: '-0.16px',
  width: 'fit-content',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: 'transparent',
      transition: `background-color ${vars.transition.fast}`,
    },
    '&:hover:not(:disabled):not(.is-active), &.is-hover:not(:disabled):not(.is-active)': { color: vars.color.primary },
    '&:hover:not(:disabled):not(.is-active)::after, &.is-hover:not(:disabled):not(.is-active)::after': {
      backgroundColor: vars.color.primary,
    },
    '&.is-active': { color: vars.color.primary, backgroundColor: 'transparent', fontWeight: 700 },
    '&.is-active::after': { backgroundColor: vars.color.primary },
  },
})

globalStyle(`${tabButtonUnderline} .tab-button-icon svg`, {
  fill: `var(--color-tab-text, ${vars.color.textSecondary})`,
})
globalStyle(`${tabButtonUnderline}.is-active .tab-button-icon svg`, { fill: vars.color.primary })
globalStyle(`${tabButtonUnderline}:hover:not(:disabled):not(.is-active) .tab-button-icon svg`, {
  fill: vars.color.primary,
})

/* ── enclosed variant (구 fill) ── */
const tabButtonEnclosed = style({
  fontSize: vars.font.sizeSm,
  color: `var(--color-tab-text, ${vars.color.textSecondary})`,
  padding: '6px 16px',
  borderRadius: vars.radius.sm,
  selectors: {
    '&.is-active': {
      backgroundColor: `var(--color-tab-item-active-bg, ${vars.color.surface})`,
      color: vars.color.text,
      fontWeight: 600,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    },
    '&:hover:not(:disabled):not(.is-active), &.is-hover:not(:disabled):not(.is-active)': {
      color: vars.color.text,
      backgroundColor: vars.color.surfaceHover,
    },
  },
})

globalStyle(`${tabButtonEnclosed} .tab-button-icon svg`, {
  fill: `var(--color-tab-text, ${vars.color.textSecondary})`,
})
globalStyle(`${tabButtonEnclosed}.is-active .tab-button-icon svg`, { fill: vars.color.text })
globalStyle(`${tabButtonEnclosed}:hover:not(:disabled):not(.is-active) .tab-button-icon svg`, {
  fill: vars.color.text,
})

/* ── fill variant ── */
const tabButtonFill = style({
  fontSize: vars.font.sizeSm,
  color: `var(--color-tab-text, ${vars.color.textSecondary})`,
  padding: '6px 16px',
  borderRadius: 20,
  selectors: {
    '&.is-active': {
      backgroundColor: vars.color.primary,
      color: vars.color.textInverse,
      fontWeight: 500,
    },
    '&:hover:not(:disabled):not(.is-active), &.is-hover:not(:disabled):not(.is-active)': {
      color: vars.color.primary,
      backgroundColor: vars.color.surfaceHover,
    },
  },
})

globalStyle(`${tabButtonFill} .tab-button-icon svg`, { fill: `var(--color-tab-text, ${vars.color.textSecondary})` })
globalStyle(`${tabButtonFill}.is-active .tab-button-icon svg`, { fill: vars.color.textInverse })
globalStyle(`${tabButtonFill}:hover:not(:disabled):not(.is-active) .tab-button-icon svg`, { fill: vars.color.primary })

/* ── Tab Button Recipe ── */
export const tabButtonRecipe = recipe({
  base: tabButtonBase,
  variants: {
    variant: {
      outline: tabButtonOutline,
      underline: tabButtonUnderline,
      enclosed: tabButtonEnclosed,
      fill: tabButtonFill,
    },
  },
  defaultVariants: { variant: 'underline' },
})

export type TabButtonVariants = RecipeVariants<typeof tabButtonRecipe>

/* ── Contents ── */
const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const tabContents = style({
  position: 'relative',
  width: '100%',
  boxSizing: 'border-box',
  display: 'none',
  animation: `${fadeIn} 0.2s ease-in-out`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
})

globalStyle(`${tabContents}.is-active`, {
  display: 'block',
  height: '100%',
})
