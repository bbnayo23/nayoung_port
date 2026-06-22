import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const control = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
  minHeight: 'unset',
  backgroundColor: 'transparent',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  cursor: 'pointer',
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
  transition: `all ${vars.duration.fast} ease`,
  boxShadow: 'none',
  ':hover': {
    borderColor: vars.color.borderStrong,
  },
})

export const controlFocused = style({
  borderColor: vars.color.brand[600],
  boxShadow: `0 0 0 2px rgba(113, 135, 255, 0.2)`,
  ':hover': {
    borderColor: vars.color.brand[600],
  },
})

export const controlDisabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
  pointerEvents: 'none',
})

export const sizeSm = style({
  height: '28px',
  fontSize: vars.font.size.sm,
})

export const sizeMd = style({
  height: '32px',
  fontSize: vars.font.size.md,
})

export const sizeLg = style({
  height: '36px',
  fontSize: vars.font.size.lg,
})

export const placeholder = style({
  color: vars.color.textDisabled,
  fontFamily: vars.font.family.sans,
})

export const singleValue = style({
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
})

export const multiValue = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 22,
  backgroundColor: vars.color.brand[600],
  borderRadius: '4px',
  margin: '1px 2px',
})

export const optionSelectedText = style({
  color: vars.color.brand[600],
  fontWeight: vars.font.weight.medium,
})

export const multiValueLabel = style({
  color: '#ffffff',
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  padding: '2px 6px',
})

export const multiValueRemove = style({
  color: 'rgba(255,255,255,0.75)',
  cursor: 'pointer',
  padding: '0 4px',
  borderRadius: '0 4px 4px 0',
  ':hover': {
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: '#ffffff',
  },
})

export const input = style({
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
})

export const indicatorSeparator = style({
  backgroundColor: vars.color.border,
})

export const dropdownIndicator = style({
  color: vars.color.textDisabled,
  cursor: 'pointer',
  padding: '0 4px',
  ':hover': {
    color: vars.color.text,
  },
})

globalStyle(`${dropdownIndicator} svg`, {
  width: 14,
  height: 14,
})

export const clearIndicator = style({
  color: vars.color.textDisabled,
  cursor: 'pointer',
  padding: '0 2px',
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    color: vars.color.text,
  },
})

globalStyle(`${clearIndicator} svg`, {
  width: 14,
  height: 14,
})

export const menu = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.md,
  zIndex: 9999,
  marginTop: '4px',
})

export const menuList = style({
  padding: `${vars.space[1]} 0`,
  maxHeight: '240px',
  overflowY: 'auto',
})

export const option = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${vars.space[2]} ${vars.space[4]}`,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
  cursor: 'pointer',
  transition: `all ${vars.duration.fast} ease`,
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: vars.color.surfaceMuted,
  },
})

export const optionFocused = style({
  backgroundColor: vars.color.surfaceMuted,
})

export const optionSelected = style({
  backgroundColor: `rgba(113, 135, 255, 0.1)`,
  color: vars.color.brand[600],
  fontWeight: vars.font.weight.medium,
})

export const optionSelectedFocused = style({
  backgroundColor: `rgba(113, 135, 255, 0.165)`,
  color: vars.color.brand[600],
  fontWeight: vars.font.weight.medium,
})

export const optionDisabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
  ':hover': {
    backgroundColor: 'transparent',
  },
})

export const noOptionsMessage = style({
  padding: vars.space[4],
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  color: vars.color.textDisabled,
  textAlign: 'center',
})

export const groupHeading = style({
  padding: `${vars.space[1]} ${vars.space[4]}`,
  fontSize: vars.font.size.xs,
  fontFamily: vars.font.family.sans,
  color: vars.color.textDisabled,
  fontWeight: vars.font.weight.medium,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
})

export const valueContainerSm = style({
  padding: `0 ${vars.space[2]}`,
})

export const valueContainerMd = style({
  padding: '0 12px',
})

export const valueContainerLg = style({
  padding: `0 ${vars.space[6]}`,
})

export const wrapper = style({
  width: '100%',
})

/**
 * react-select 스타일 객체 — 다른 컴포넌트에서 `reactSelectCss`로 참조할 수 있도록 네임스페이스 내보내기용으로 보존
 */
export const reactSelectCss = {
  control,
  controlFocused,
  controlDisabled,
  sizeSm,
  sizeMd,
  sizeLg,
  placeholder,
  singleValue,
  multiValue,
  optionSelectedText,
  multiValueLabel,
  multiValueRemove,
  input,
  indicatorSeparator,
  dropdownIndicator,
  clearIndicator,
  menu,
  menuList,
  option,
  optionFocused,
  optionSelected,
  optionSelectedFocused,
  optionDisabled,
  noOptionsMessage,
  groupHeading,
  valueContainerSm,
  valueContainerMd,
  valueContainerLg,
  wrapper,
}
