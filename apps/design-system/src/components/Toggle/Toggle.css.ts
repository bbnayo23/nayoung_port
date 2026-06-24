import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

/* ── Thumb ── */
export const thumb = style({
  display: 'block',
  flexShrink: 0,
  borderRadius: '50%',
  background: vars.color.textInverse,
  width: 'var(--toggle-thumb)',
  height: 'var(--toggle-thumb)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
  transition: `transform ${vars.transition.fast}`,
})

/* ── Track ── */
export const track = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: 2,
  border: 'none',
  borderRadius: 999,
  background: vars.color.border,
  cursor: 'pointer',
  flexShrink: 0,
  transition: `background-color ${vars.transition.fast}`,
})

globalStyle(`${track}:focus-visible, ${track}.is-focus`, {
  outline: `2px solid ${vars.color.primary}`,
  outlineOffset: '2px',
  background: vars.color.border,
})

globalStyle(`${track}:hover, ${track}.is-hover`, {
  background: vars.color.border,
})

/* ── Size ── */
globalStyle(`${track}.toggle-sm`, {
  vars: { '--toggle-thumb': '12px', '--toggle-travel': '12px' },
  width: 28,
  height: 16,
})

globalStyle(`${track}.toggle-md`, {
  vars: { '--toggle-thumb': '18px', '--toggle-travel': '18px' },
  width: 40,
  height: 22,
})

globalStyle(`${track}.toggle-lg`, {
  vars: { '--toggle-thumb': '24px', '--toggle-travel': '24px' },
  width: 52,
  height: 28,
})

/* ── ON 상태 ── */
globalStyle(`${track}.is-on`, {
  background: vars.color.primary,
})

globalStyle(`${track}.is-on:hover, ${track}.is-on.is-hover`, {
  background: vars.color.primaryHover,
})

globalStyle(`${track}.is-on:focus-visible, ${track}.is-on.is-focus`, {
  background: vars.color.primary,
})

globalStyle(`${track}.is-on .${thumb}`, {
  transform: 'translateX(var(--toggle-travel))',
})

/* ── Disabled ── */
globalStyle(`${track}:disabled, ${track}.is-disabled`, {
  opacity: 0.4,
  cursor: 'not-allowed',
})

/* ── Inner Label ── */
globalStyle(`${track}.has-inner-label`, { position: 'relative' })

globalStyle(`${track}.has-inner-label.toggle-md`, {
  vars: { '--toggle-travel': '24px' },
  width: 48,
  height: 24,
})

globalStyle(`${track}.has-inner-label.toggle-lg`, {
  vars: { '--toggle-travel': '30px' },
  width: 60,
  height: 30,
})

globalStyle(`${track}.has-inner-label.toggle-sm`, {
  vars: { '--toggle-travel': '18px' },
  width: 36,
  height: 18,
})

globalStyle(`${track}.has-inner-label.toggle-sm .inner-on, ${track}.has-inner-label.toggle-sm .inner-off`, {
  fontSize: 7,
})
globalStyle(`${track}.has-inner-label.toggle-sm .inner-on`, { left: 5 })
globalStyle(`${track}.has-inner-label.toggle-sm .inner-off`, { right: 5 })

globalStyle(`${track}.has-inner-label .inner-on, ${track}.has-inner-label .inner-off`, {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
})

globalStyle(`${track}.has-inner-label .inner-on`, {
  left: 6,
  color: vars.color.textInverse,
  opacity: 0,
})

globalStyle(`${track}.has-inner-label .inner-off`, {
  right: 6,
  color: vars.color.textMuted,
  opacity: 1,
})

globalStyle(`${track}.has-inner-label.is-on .inner-on`, { opacity: 1 })
globalStyle(`${track}.has-inner-label.is-on .inner-off`, { opacity: 0 })

/* ── InnerText ── */
export const innerText = style({
  fontSize: vars.font.sizeXs,
  fontWeight: 700,
  lineHeight: 1,
  userSelect: 'none',
  pointerEvents: 'none',
  transition: `opacity ${vars.transition.fast}`,
})

/* ── Wrapper / Label ── */
export const toggleWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
})

export const toggleLabel = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.textSecondary,
  userSelect: 'none',
  lineHeight: 1,
})
