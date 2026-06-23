import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

// === Trigger ===

export const triggerWrapper = style({
  display: 'inline-flex',
  position: 'relative',
})

export const relativeTriggerWrapper = style({
  position: 'relative',
  display: 'inline-flex',
})

// 상대시간 트리거 (단일 input) — 기본 너비 140px, triggerWidth prop으로 오버라이드 가능
export const relativeTrigger = style({
  width: '140px',
  padding: `${vars.space[2]} ${vars.space[4]}`,
  paddingRight: vars.space[12],
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  outline: 'none',
  transition: `all ${vars.duration.fast} ease`,
  textAlign: 'center',
  ':hover': {
    borderColor: vars.color.borderStrong,
  },
  ':focus': {
    borderColor: vars.color.brand[600],
    boxShadow: `0 0 0 2px rgba(113, 135, 255, 0.2)`,
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

// 절대시간 트리거 (두 개 input + ~)
export const absoluteTrigger = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[2],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surface,
  padding: `0 36px 0 8px`,
  transition: `all ${vars.duration.fast} ease`,
  ':hover': {
    borderColor: vars.color.borderStrong,
  },
  selectors: {
    '&:focus-within': {
      borderColor: vars.color.brand[600],
      boxShadow: `0 0 0 2px rgba(113, 135, 255, 0.2)`,
    },
  },
})

export const absoluteInput = style({
  width: '160px',
  padding: `${vars.space[2]} ${vars.space[1]}`,
  fontFamily: 'monospace',
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  textAlign: 'center',
  '::placeholder': {
    color: vars.color.textDisabled,
  },
})

export const separator = style({
  color: vars.color.textDisabled,
  fontSize: vars.font.size.sm,
  flexShrink: 0,
  userSelect: 'none',
})

export const triggerOpen = style({
  borderColor: vars.color.brand[600],
  boxShadow: `0 0 0 2px rgba(113, 135, 255, 0.2)`,
})

export const calendarIcon = style({
  position: 'absolute',
  right: vars.space[2],
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  color: vars.color.textDisabled,
  cursor: 'pointer',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  transition: `all ${vars.duration.fast} ease`,
  ':hover': {
    color: vars.color.text,
  },
})

// === Panel ===

export const panel = style({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  overflow: 'hidden',
  fontFamily: vars.font.family.sans,
  boxShadow: vars.shadow.md,
  zIndex: vars.zIndex.dropdown,
})

export const sidebar = style({
  display: 'flex',
  flexDirection: 'column',
  width: '110px',
  flexShrink: 0,
  borderRight: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.background,
  padding: `${vars.space[2]} 0`,
})

export const presetButton = style({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: `${vars.space[2]} ${vars.space[4]}`,
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  cursor: 'pointer',
  transition: `all ${vars.duration.fast} ease`,
  outline: 'none',
  ':hover': {
    backgroundColor: vars.color.surfaceMuted,
  },
})

export const presetButtonActive = style({
  backgroundColor: vars.color.brand[600],
  color: vars.color.textInverse,
  fontWeight: vars.font.weight.medium,
  ':hover': {
    backgroundColor: vars.color.brand[700],
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
  padding: `${vars.space[2]} ${vars.space[4]}`,
  border: 'none',
  borderBottom: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  fontFamily: 'monospace',
  outline: 'none',
  transition: `all ${vars.duration.fast} ease`,
  '::placeholder': {
    color: vars.color.textDisabled,
  },
  ':focus': {
    borderBottomColor: vars.color.brand[600],
    boxShadow: `0 2px 0 0 rgba(113, 135, 255, 0.2)`,
  },
})

export const dateInputInvalid = style({
  borderBottomColor: vars.color.danger,
  color: vars.color.danger,
  ':focus': {
    borderBottomColor: vars.color.danger,
    boxShadow: `0 2px 0 0 rgba(250, 82, 82, 0.2)`,
  },
})

export const calendarInner = style({
  flex: 1,
  padding: '12px',
})
