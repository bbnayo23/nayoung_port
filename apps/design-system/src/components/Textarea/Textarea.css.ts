import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const textarea = style({
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  borderRadius: vars.radius.md,
  outline: 'none',
  padding: '8px 10px',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
})

globalStyle(`${textarea}:focus:not(:disabled):not(:read-only)`, {
  borderColor: vars.color.primary,
  boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.primary} 20%, transparent)`,
})

globalStyle(`${textarea}:disabled`, {
  backgroundColor: vars.color.surfaceHover,
  color: vars.color.textMuted,
  cursor: 'not-allowed',
  resize: 'none',
})

globalStyle(`${textarea}:disabled::placeholder`, {
  color: vars.color.textMuted,
})

globalStyle(`${textarea}:disabled:hover`, {
  borderColor: vars.color.border,
})

globalStyle(`${textarea}:read-only`, {
  backgroundColor: vars.color.surface,
  cursor: 'default',
  resize: 'none',
})

globalStyle(`${textarea}:read-only:focus`, {
  borderColor: vars.color.border,
  boxShadow: 'none',
})

globalStyle(`${textarea}.textarea-required:not(:disabled):not(:read-only)`, {
  borderLeft: `3px solid ${vars.color.warning}`,
})

globalStyle(`${textarea}.textarea-error`, {
  borderColor: vars.color.error,
})

globalStyle(`${textarea}.textarea-error:focus`, {
  borderColor: vars.color.error,
  boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.error} 20%, transparent)`,
})

globalStyle(`${textarea}.textarea-success`, {
  borderColor: vars.color.success,
})

globalStyle(`${textarea}.textarea-success:focus`, {
  borderColor: vars.color.success,
  boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.success} 20%, transparent)`,
})

/* ── wrap 속성 ── */
globalStyle(`${textarea}[wrap='soft']`, {
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
})

globalStyle(`${textarea}[wrap='hard']`, {
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  position: 'relative',
})

globalStyle(`${textarea}[wrap='off']`, {
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
  overflowWrap: 'normal',
  overflowX: 'auto',
})

globalStyle(`${textarea}::placeholder`, {
  fontSize: vars.font.sizeSm,
  color: vars.color.textMuted,
})
