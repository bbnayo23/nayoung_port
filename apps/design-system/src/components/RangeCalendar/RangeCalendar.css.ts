import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const triggerWrapper = style({
  display: 'inline-flex',
  position: 'relative',
})

export const relativeTrigger = style({
  width: 140,
  padding: `6px 12px`,
  paddingRight: 36,
  fontFamily: vars.font.family,
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  outline: 'none',
  transition: vars.transition.fast,
  textAlign: 'center',
  ':hover': {
    borderColor: vars.color.borderHover,
  },
  ':focus': {
    borderColor: vars.color.primary,
    boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.primary} 20%, transparent)`,
  },
  ':disabled': {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
})

export const absoluteTrigger = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surface,
  padding: `0 36px 0 8px`,
  transition: vars.transition.fast,
  ':hover': {
    borderColor: vars.color.borderHover,
  },
  selectors: {
    '&:focus-within': {
      borderColor: vars.color.primary,
      boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.primary} 20%, transparent)`,
    },
  },
})

export const absoluteInput = style({
  width: 160,
  padding: `6px 4px`,
  fontFamily: 'monospace',
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  textAlign: 'center',
  '::placeholder': {
    color: vars.color.textMuted,
  },
})

export const separator = style({
  color: vars.color.textMuted,
  fontSize: vars.font.sizeSm,
  flexShrink: 0,
  userSelect: 'none',
})

export const triggerOpen = style({
  borderColor: vars.color.primary,
  boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.primary} 20%, transparent)`,
})

export const calendarIcon = style({
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  color: vars.color.textMuted,
  cursor: 'pointer',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  transition: vars.transition.fast,
  ':hover': {
    color: vars.color.text,
  },
  ':disabled': {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
})

export const panel = style({
  display: 'flex',
  flexDirection: 'row',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.md,
  overflow: 'hidden',
  fontFamily: vars.font.family,
})

export const sidebar = style({
  display: 'flex',
  flexDirection: 'column',
  width: 110,
  flexShrink: 0,
  borderRight: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.background,
  padding: '4px 0',
})

export const presetButton = style({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '6px 12px',
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.text,
  fontSize: vars.font.sizeSm,
  fontFamily: vars.font.family,
  cursor: 'pointer',
  transition: vars.transition.fast,
  outline: 'none',
  borderRadius: vars.radius.sm,
  ':hover': {
    backgroundColor: vars.color.surfaceHover,
  },
})

export const presetButtonActive = style({
  backgroundColor: `color-mix(in srgb, ${vars.color.primary} 10%, transparent)`,
  color: vars.color.primary,
  fontWeight: vars.font.weightMedium,
  ':hover': {
    backgroundColor: `color-mix(in srgb, ${vars.color.primary} 15%, transparent)`,
  },
})

export const sidebarSpacer = style({
  flex: 1,
})

export const calendarsWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
})

export const calendarPanel = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  selectors: {
    '&:first-child': {
      borderRight: `1px solid ${vars.color.border}`,
    },
  },
})

export const dateInput = style({
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  padding: '6px 12px',
  border: 'none',
  borderBottom: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.font.sizeSm,
  fontFamily: 'monospace',
  outline: 'none',
  transition: vars.transition.fast,
  '::placeholder': {
    color: vars.color.textMuted,
  },
  ':focus': {
    borderBottomColor: vars.color.primary,
    boxShadow: `0 2px 0 0 color-mix(in srgb, ${vars.color.primary} 20%, transparent)`,
  },
})

export const dateInputInvalid = style({
  borderBottomColor: vars.color.error,
  color: vars.color.error,
  ':focus': {
    borderBottomColor: vars.color.error,
    boxShadow: `0 2px 0 0 color-mix(in srgb, ${vars.color.error} 20%, transparent)`,
  },
})

export const calendarInner = style({
  flex: 1,
  padding: 12,
})
