import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '240px',
  minHeight: '0',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
  overflow: 'hidden',
})

export const rootCollapsed = style({
  width: '28px',
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.space[2]} ${vars.space[4]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
})

export const title = style({
  userSelect: 'none',
})

export const collapseButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  padding: 0,
  color: vars.color.textDisabled,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  borderRadius: vars.radius.sm,
  transition: vars.duration.fast,
  ':hover': {
    backgroundColor: vars.color.surfaceMuted,
    color: vars.color.text,
  },
})

export const collapsedStrip = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: `${vars.space[2]} 0`,
  height: '100%',
})

export const searchWrap = style({
  position: 'relative',
  padding: `${vars.space[2]} ${vars.space[4]}`,
  borderBottom: `1px solid ${vars.color.border}`,
})

export const searchInput = style({
  width: '100%',
  padding: `${vars.space[1]} ${vars.space[8]} ${vars.space[1]} ${vars.space[2]}`,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
  backgroundColor: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  outline: 'none',
  transition: vars.duration.fast,
  '::placeholder': {
    color: vars.color.textDisabled,
  },
  ':focus': {
    borderColor: vars.color.brand[600],
  },
})

export const searchIcon = style({
  position: 'absolute',
  right: `calc(${vars.space[4]} + ${vars.space[1]})`,
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.color.textDisabled,
  pointerEvents: 'none',
})

export const list = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: `${vars.space[1]} 0`,
})

export const allRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  padding: `${vars.space[1]} ${vars.space[4]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  cursor: 'pointer',
  userSelect: 'none',
})

export const groupRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  padding: `${vars.space[1]} ${vars.space[4]}`,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  cursor: 'pointer',
  userSelect: 'none',
  transition: vars.duration.fast,
  ':hover': {
    backgroundColor: vars.color.surfaceMuted,
  },
})

export const itemRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  padding: `${vars.space[1]} ${vars.space[4]} ${vars.space[1]} calc(${vars.space[4]} + ${vars.space[6]})`,
  fontSize: vars.font.size.sm,
  cursor: 'pointer',
  userSelect: 'none',
  transition: vars.duration.fast,
  ':hover': {
    backgroundColor: vars.color.surfaceMuted,
  },
})

export const chevron = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
  color: vars.color.textDisabled,
  transition: vars.duration.fast,
  flexShrink: 0,
})

export const chevronExpanded = style({
  transform: 'rotate(90deg)',
})

export const chevronPlaceholder = style({
  display: 'inline-block',
  width: '14px',
  height: '14px',
  flexShrink: 0,
})

export const labelText = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const count = style({
  flexShrink: 0,
  color: vars.color.textDisabled,
  fontSize: vars.font.size.xs,
  fontVariantNumeric: 'tabular-nums',
})

export const empty = style({
  padding: `${vars.space[4]}`,
  fontSize: vars.font.size.sm,
  color: vars.color.textDisabled,
  textAlign: 'center',
})
