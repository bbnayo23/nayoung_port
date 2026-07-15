import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/* ── Group wrapper — Input visual style 베이스 ── */
export const styledInputGroup = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'stretch',
  border: '1px solid transparent',
  borderRadius: `var(--input-radius, ${vars.radius.md})`,
  background: `var(--color-input-bg, ${vars.color.surface})`,
  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
  transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  overflow: 'hidden',
})

globalStyle(`${styledInputGroup}:focus-within`, {
  borderColor: vars.color.primary,
  boxShadow: 'none',
})

/* ── Size variants (Input 컴포넌트와 동일: sm=28/md=32/lg=36) ── */
globalStyle(`${styledInputGroup}.input-group-sm`, {
  vars: { '--ig-py': '4px', '--ig-px': '8px', '--input-radius': vars.radius.sm },
  height: 28,
  fontSize: vars.font.sizeXs,
})

globalStyle(`${styledInputGroup}.input-group-md`, {
  vars: { '--ig-py': '6px', '--ig-px': '10px', '--input-radius': vars.radius.md },
  height: 32,
  fontSize: vars.font.sizeSm,
})

globalStyle(`${styledInputGroup}.input-group-lg`, {
  vars: { '--ig-py': '8px', '--ig-px': '12px', '--input-radius': vars.radius.lg },
  height: 36,
  fontSize: vars.font.sizeMd,
})

globalStyle(`${styledInputGroup}.full-width`, { width: '100%' })

/* ── Variant border colors ── */
globalStyle(`${styledInputGroup}.variant-error`, {
  borderColor: vars.color.error,
  boxShadow: 'none',
})

globalStyle(`${styledInputGroup}.variant-success`, {
  borderColor: vars.color.success,
  boxShadow: 'none',
})

globalStyle(`${styledInputGroup}.variant-warning`, {
  borderColor: vars.color.warning,
  boxShadow: 'none',
})

/* ── Separator between children ── */
globalStyle(`${styledInputGroup} > *:not(:first-child)`, {
  borderLeft: `1px solid ${vars.color.border}`,
})

/* ── Input wrapper ── */
export const styledInputGroupInput = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'stretch',
})

globalStyle(`${styledInputGroupInput} input`, {
  flex: 1,
  minWidth: 0,
  height: '100%',
  padding: 'var(--ig-py, 6px) var(--ig-px, 10px)',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  lineHeight: 1,
  color: `var(--color-input-text, ${vars.color.text})`,
})

globalStyle(`${styledInputGroupInput} input::placeholder`, {
  color: vars.color.textMuted,
  opacity: 1,
})

globalStyle(`${styledInputGroupInput} input:disabled`, {
  background: vars.color.surfaceHover,
  color: vars.color.textMuted,
  cursor: 'not-allowed',
})

globalStyle(`${styledInputGroupInput} input:disabled::placeholder`, {
  color: vars.color.textMuted,
  opacity: 1,
})

/* ── Text addon ── */
export const styledInputGroupText = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  padding: 'var(--ig-py, 6px) var(--ig-px, 10px)',
  background: vars.color.surfaceHover,
  color: vars.color.textSecondary,
  fontSize: 'inherit',
  lineHeight: 1,
})

globalStyle(`${styledInputGroupText} svg`, {
  width: '1em',
  height: '1em',
  fill: vars.color.textSecondary,
})

/* ── Icon addon ── */
export const styledInputGroupIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  padding: '0 var(--ig-px, 10px)',
  background: vars.color.surfaceHover,
  color: vars.color.textSecondary,
})

globalStyle(`${styledInputGroupIcon} svg`, {
  fill: 'currentColor',
})

/* ── Button addon ── */
export const styledInputGroupButton = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'stretch',
})

/* Button recipe specificity 문제를 해결하기 위해 조상 클래스를 포함한 선택자 사용 */
globalStyle(`${styledInputGroup} ${styledInputGroupButton} button`, {
  height: '100%',
  margin: 0,
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  paddingTop: 0,
  paddingBottom: 0,
  fontSize: 'inherit',
  alignSelf: 'stretch',
})

globalStyle(
  `${styledInputGroup} ${styledInputGroupButton} button:hover, ${styledInputGroup} ${styledInputGroupButton} button:focus, ${styledInputGroup} ${styledInputGroupButton} button:active`,
  {
    boxShadow: 'none',
    transform: 'none',
  },
)

/* ── HelperText ── */
export const styledInputGroupHelperText = style({
  margin: '6px 0 0 10px',
  fontSize: vars.font.sizeSm,
  lineHeight: 1.4,
  color: vars.color.textSecondary,
  transition: `color ${vars.transition.fast}`,
})

globalStyle(`${styledInputGroupHelperText}.variant-error`, { color: vars.color.error })
globalStyle(`${styledInputGroupHelperText}.variant-success`, { color: vars.color.success })
globalStyle(`${styledInputGroupHelperText}.variant-warning`, { color: vars.color.warning })

/* ── Label ── */
export const styledInputGroupLabel = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  color: vars.color.text,
  marginBottom: 6,
  whiteSpace: 'nowrap',
})

globalStyle(`${styledInputGroupLabel} .required-mark`, {
  color: vars.color.error,
  fontWeight: 700,
})

/* ── FormField ── */
export const styledInputGroupFormField = style({
  display: 'flex',
  flexDirection: 'column',
})

globalStyle(`${styledInputGroupFormField}.form-field-horizontal`, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
})

globalStyle(`${styledInputGroupFormField}.form-field-horizontal .input-group-label`, {
  marginBottom: 0,
  minWidth: 'fit-content',
})

globalStyle(`${styledInputGroupFormField}.form-field-full-width`, { width: '100%' })
