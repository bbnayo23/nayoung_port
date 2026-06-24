import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const wrapper = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
})

export const input = style({
  display: 'block',
  width: '100%',
  fontFamily: vars.font.family,
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: `6px 12px`,
  paddingRight: 36,
  outline: 'none',
  transition: vars.transition.fast,
  '::placeholder': {
    color: vars.color.textMuted,
  },
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

export const calendarIcon = style({
  position: 'absolute',
  right: 10,
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.color.textMuted,
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
})

export const calendarPanel = style({
  display: 'flex',
  justifyContent: 'center',
})

// is-open: 달력 팝업이 열려있을 때 focus 글로우(box-shadow) 제거
globalStyle(`${wrapper}.is-open ${input}:focus`, {
  boxShadow: 'none',
})
