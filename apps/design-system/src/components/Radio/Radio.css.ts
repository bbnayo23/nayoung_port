import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const radio = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  flexWrap: 'wrap',
  minWidth: 'fit-content',
})

/* ── Input ── */
globalStyle(`${radio} .radio-input[type='radio']`, {
  appearance: 'none',
  border: `1px solid ${vars.color.textSecondary}`,
  borderRadius: '50%',
  width: 16,
  height: 16,
  outline: 'none',
  cursor: 'pointer',
  position: 'relative',
  margin: 0,
  transition: `all ${vars.transition.fast}`,
  flexShrink: 0,
})

globalStyle(`${radio} .radio-input[type='radio']:checked`, {
  borderColor: vars.color.textSecondary,
})

globalStyle(`${radio} .radio-input[type='radio']:checked::after`, {
  content: '""',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: vars.color.textSecondary,
  transform: 'translate(-50%, -50%)',
})

globalStyle(`${radio} .radio-input[type='radio']:hover:not(:disabled):not(:checked)`, {
  background: `color-mix(in srgb, ${vars.color.textSecondary} 12%, transparent)`,
})

/* ── Label ── */
globalStyle(`${radio} .radio-label`, {
  color: vars.color.text,
  cursor: 'pointer',
  fontSize: vars.font.sizeSm,
  lineHeight: '16px',
  fontWeight: vars.font.weightMedium,
})

/* ── Disabled ── */
globalStyle(`${radio}.radio-disabled`, {
  cursor: 'not-allowed',
  opacity: 0.4,
  pointerEvents: 'none',
})

/* ── Variants ── */
globalStyle(`${radio}.radio-primary .radio-input[type='radio']`, { border: `1px solid ${vars.color.primary}` })
globalStyle(`${radio}.radio-primary .radio-input[type='radio']:checked`, { borderColor: vars.color.primary })
globalStyle(`${radio}.radio-primary .radio-input[type='radio']:checked::after`, { background: vars.color.primary })
globalStyle(`${radio}.radio-primary .radio-input[type='radio']:hover:not(:disabled):not(:checked)`, {
  background: `color-mix(in srgb, ${vars.color.primary} 15%, transparent)`,
})
globalStyle(`${radio}.radio-primary .radio-label`, { color: vars.color.primary })

/* ── Sizes ── */
globalStyle(`${radio}.radio-sm .radio-input[type='radio']`, { width: 14, height: 14 })
globalStyle(`${radio}.radio-sm .radio-input[type='radio']:checked::after`, { width: 6, height: 6 })

globalStyle(`${radio}.radio-lg .radio-input[type='radio']`, { width: 20, height: 20 })
globalStyle(`${radio}.radio-lg .radio-input[type='radio']:checked::after`, { width: 10, height: 10 })
