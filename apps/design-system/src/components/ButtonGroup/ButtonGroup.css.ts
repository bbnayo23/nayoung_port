import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

const primarySubtle = `color-mix(in srgb, ${vars.color.primary} 10%, transparent)`

export const styledButtonGroupWrapper = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: 'fit-content',
})

globalStyle(`${styledButtonGroupWrapper}.button-group-primary`, {
  background: primarySubtle,
  borderRadius: 20,
  height: 33,
  position: 'relative',
  zIndex: 1,
})

globalStyle(`${styledButtonGroupWrapper}.button-group-primary .button-group-item`, {
  borderRadius: 20,
  color: vars.color.primary,
  position: 'relative',
  zIndex: 1,
  background: 'transparent',
  transition: `color ${vars.transition.normal}, font-weight ${vars.transition.normal}`,
  fontWeight: 400,
  minWidth: 64,
  width: 'fit-content',
})

globalStyle(`${styledButtonGroupWrapper}.button-group-primary .button-group-item svg`, {
  fill: vars.color.primary,
})

globalStyle(`${styledButtonGroupWrapper}.button-group-primary .button-group-item.is-active`, {
  color: vars.color.primary,
  fontWeight: 700,
})

globalStyle(`${styledButtonGroupWrapper}.button-group-primary .button-group-item.is-active svg`, {
  fill: vars.color.primary,
})

globalStyle(`${styledButtonGroupWrapper}.button-group-primary .button-group-item:disabled`, {
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
})

globalStyle(
  `${styledButtonGroupWrapper}.button-group-primary .button-group-item:first-child.is-active ~ .slider-background`,
  {
    width: 'var(--item-width, 64px)',
    transform: 'translateX(0)',
  },
)

globalStyle(
  `${styledButtonGroupWrapper}.button-group-primary .button-group-item:nth-child(2).is-active ~ .slider-background`,
  {
    width: 'fit-content',
    transform: 'translateX(calc(var(--item-width, 64px)))',
  },
)

globalStyle(
  `${styledButtonGroupWrapper}.button-group-primary .button-group-item:nth-child(3).is-active ~ .slider-background`,
  {
    width: 'fit-content',
    transform: 'translateX(calc(var(--item-width, 64px) * 2))',
  },
)

globalStyle(`${styledButtonGroupWrapper}.button-group-primary .slider-background`, {
  position: 'absolute',
  top: 1,
  left: 1,
  height: 'calc(100% - 2px)',
  backgroundColor: vars.color.surface,
  borderRadius: 20,
  boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  pointerEvents: 'none',
  zIndex: 0,
  minWidth: 64,
  width: 'fit-content',
})

globalStyle(`${styledButtonGroupWrapper}.button-group-secondary`, {
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  overflow: 'hidden',
  height: 32,
})

globalStyle(`${styledButtonGroupWrapper}.button-group-secondary .button-group-item`, {
  padding: '0 8px',
  height: '100%',
  border: 'none',
  borderRadius: 0,
  background: 'transparent',
  minHeight: 'auto',
  minWidth: 'auto',
  transition: `background-color ${vars.transition.fast}, color ${vars.transition.fast}`,
  color: vars.color.textSecondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
})

globalStyle(`${styledButtonGroupWrapper}.button-group-secondary .button-group-item svg`, {
  fill: vars.color.textSecondary,
  color: vars.color.textSecondary,
  transition: `fill ${vars.transition.fast}, color ${vars.transition.fast}`,
})

globalStyle(
  `${styledButtonGroupWrapper}.button-group-secondary .button-group-item:hover:not(:disabled):not(.is-active)`,
  {
    backgroundColor: vars.color.surfaceHover,
  },
)

globalStyle(`${styledButtonGroupWrapper}.button-group-secondary .button-group-item + .button-group-item`, {
  borderLeft: `1px solid ${vars.color.border}`,
})

globalStyle(`${styledButtonGroupWrapper}.button-group-secondary .button-group-item.is-active`, {
  backgroundColor: vars.color.primary,
  color: vars.color.textInverse,
})

globalStyle(`${styledButtonGroupWrapper}.button-group-secondary .button-group-item.is-active svg`, {
  fill: vars.color.textInverse,
  color: vars.color.textInverse,
})

globalStyle(`${styledButtonGroupWrapper}.button-group-secondary .button-group-item.is-active + .button-group-item`, {
  borderLeftColor: 'transparent',
})

globalStyle(`${styledButtonGroupWrapper}.button-group-secondary .button-group-item:disabled`, {
  backgroundColor: vars.color.surfaceHover,
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
})

globalStyle(`${styledButtonGroupWrapper}.button-group-secondary .button-group-item:disabled svg`, {
  fill: vars.color.textMuted,
})

export const styledButtonGroupItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: vars.radius.md,
  position: 'relative',
  whiteSpace: 'nowrap',
  padding: '6px 12px',
  fontSize: vars.font.sizeSm,
  minHeight: 33,
  minWidth: 'fit-content',
  fontFamily: 'inherit',
  color: 'inherit',
})
