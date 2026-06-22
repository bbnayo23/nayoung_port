import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space[2],
  width: '100%',
  padding: `${vars.space[2]} ${vars.space[4]}`,
  fontSize: vars.font.size.md,
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  cursor: 'pointer',
  outline: 'none',
  transition: vars.duration.fast,
  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: vars.color.borderStrong,
    },
    '&:focus-visible': {
      borderColor: vars.color.brand[600],
      boxShadow: `0 0 0 2px rgba(113, 135, 255, 0.2)`,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const triggerOpen = style({
  borderColor: vars.color.brand[600],
  boxShadow: `0 0 0 2px rgba(113, 135, 255, 0.2)`,
})

export const triggerLabel = style({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'left',
})

export const placeholder = style({
  color: vars.color.textDisabled,
})

export const arrow = style({
  fontSize: '10px',
  transition: vars.duration.fast,
  color: vars.color.textDisabled,
})

export const arrowOpen = style({
  transform: 'rotate(180deg)',
})

/** 패널 공통 — Portal 컨테이너에 position:absolute 로 렌더됨 */
export const panel = style({
  position: 'absolute',
  zIndex: vars.zIndex.dropdown,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.lg,
  overflow: 'hidden',
})

export const searchInput = style({
  display: 'block',
  width: '100%',
  padding: `${vars.space[2]} ${vars.space[4]}`,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
  backgroundColor: vars.color.background,
  border: 'none',
  borderBottom: `1px solid ${vars.color.border}`,
  outline: 'none',
  selectors: {
    '&::placeholder': {
      color: vars.color.textDisabled,
    },
  },
})

export const list = style({
  maxHeight: '240px',
  overflowY: 'auto',
  padding: `${vars.space[1]} 0`,
})

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  padding: `${vars.space[2]} ${vars.space[4]}`,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
  cursor: 'pointer',
  transition: vars.duration.fast,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.surfaceMuted,
    },
  },
})

export const itemLabel = style({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const itemDescription = style({
  flex: '0 0 auto',
  color: vars.color.textDisabled,
  fontSize: vars.font.size.xs,
  marginLeft: vars.space[4],
})

export const itemSelected = style({
  color: vars.color.brand[600],
  fontWeight: vars.font.weight.medium,
})

export const itemDisabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
  selectors: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})

export const empty = style({
  padding: vars.space[4],
  fontSize: vars.font.size.sm,
  color: vars.color.textDisabled,
  textAlign: 'center',
})

export const checkmark = style({
  fontSize: '12px',
  color: vars.color.brand[600],
})

export const divider = style({
  height: '1px',
  margin: `${vars.space[1]} 0`,
  backgroundColor: vars.color.border,
})
