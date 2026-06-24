import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const checkbox = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  userSelect: 'none',
  position: 'relative',
})

globalStyle(`${checkbox}.label-left`, { flexDirection: 'row-reverse' })
globalStyle(`${checkbox}.label-right`, { flexDirection: 'row' })
globalStyle(`${checkbox}.disabled`, { opacity: 0.4, cursor: 'not-allowed' })

globalStyle(`${checkbox} input[type='checkbox']`, {
  border: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
})

globalStyle(`${checkbox} .custom-checkbox`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  minWidth: 16,
  flexShrink: 0,
  border: `2px solid var(--color-checkbox-border, ${vars.color.border})`,
  borderRadius: 3,
  background: 'transparent',
  transition: `background-color ${vars.transition.fast}, border-color ${vars.transition.fast}`,
  position: 'relative',
  boxSizing: 'border-box',
})

globalStyle(`${checkbox} .custom-checkbox .checkbox-icon`, {
  position: 'absolute',
  width: 12,
  height: 12,
  visibility: 'hidden',
  fill: vars.color.textInverse,
  color: vars.color.textInverse,
})

globalStyle(
  `${checkbox} .custom-checkbox .checkbox-icon path, ${checkbox} .custom-checkbox .checkbox-icon polyline, ${checkbox} .custom-checkbox .checkbox-icon line`,
  { fill: vars.color.textInverse, stroke: vars.color.textInverse },
)

globalStyle(`${checkbox} .custom-checkbox .checkbox-indeterminate`, {
  position: 'absolute',
  width: 8,
  height: 2,
  background: vars.color.textInverse,
  borderRadius: 1,
  visibility: 'hidden',
})

globalStyle(
  `${checkbox}.checked:not(.indeterminate):not(.danger):not(.warning):not(.success):not(.info) .custom-checkbox`,
  {
    backgroundColor: vars.color.primary,
    borderColor: vars.color.primary,
  },
)

globalStyle(`${checkbox}.checked:not(.indeterminate) .custom-checkbox .checkbox-icon`, {
  visibility: 'visible',
})

globalStyle(`${checkbox}.indeterminate .custom-checkbox`, {
  backgroundColor: vars.color.primary,
  borderColor: vars.color.primary,
})

globalStyle(`${checkbox}.indeterminate .custom-checkbox .checkbox-indeterminate`, {
  visibility: 'visible',
})

globalStyle(`${checkbox}:not(.checked):not(.indeterminate):not(.disabled):hover .custom-checkbox`, {
  borderColor: vars.color.primary,
})

globalStyle(`${checkbox}.danger .custom-checkbox`, { borderColor: vars.color.error })
globalStyle(`${checkbox}.danger.checked .custom-checkbox, ${checkbox}.danger.indeterminate .custom-checkbox`, {
  backgroundColor: vars.color.error,
  borderColor: vars.color.error,
})

globalStyle(`${checkbox}.warning .custom-checkbox`, { borderColor: vars.color.warning })
globalStyle(`${checkbox}.warning.checked .custom-checkbox, ${checkbox}.warning.indeterminate .custom-checkbox`, {
  backgroundColor: vars.color.warning,
  borderColor: vars.color.warning,
})

globalStyle(`${checkbox}.success .custom-checkbox`, { borderColor: vars.color.success })
globalStyle(`${checkbox}.success.checked .custom-checkbox, ${checkbox}.success.indeterminate .custom-checkbox`, {
  backgroundColor: vars.color.success,
  borderColor: vars.color.success,
})

globalStyle(`${checkbox}.info .custom-checkbox`, { borderColor: vars.color.info })
globalStyle(`${checkbox}.info.checked .custom-checkbox, ${checkbox}.info.indeterminate .custom-checkbox`, {
  backgroundColor: vars.color.info,
  borderColor: vars.color.info,
})

globalStyle(`${checkbox} .checkbox-label`, {
  fontSize: vars.font.sizeSm,
  color: `var(--color-checkbox-label, ${vars.color.text})`,
  userSelect: 'none',
  fontWeight: 500,
  lineHeight: '16px',
})

// ── size variants ─────────────────────────────────────────────────────────────
globalStyle(`${checkbox}.size-sm .custom-checkbox`, { width: 14, height: 14, minWidth: 14 })
globalStyle(`${checkbox}.size-sm .custom-checkbox .checkbox-icon`, { width: 10, height: 10 })
globalStyle(`${checkbox}.size-sm .custom-checkbox .checkbox-indeterminate`, { width: 6 })
globalStyle(`${checkbox}.size-sm .checkbox-label`, { fontSize: vars.font.sizeXs, lineHeight: '14px' })

globalStyle(`${checkbox}.size-lg .custom-checkbox`, { width: 20, height: 20, minWidth: 20 })
globalStyle(`${checkbox}.size-lg .custom-checkbox .checkbox-icon`, { width: 14, height: 14 })
globalStyle(`${checkbox}.size-lg .custom-checkbox .checkbox-indeterminate`, { width: 10 })
globalStyle(`${checkbox}.size-lg .checkbox-label`, { fontSize: 13, lineHeight: '20px' })

// ── error state ───────────────────────────────────────────────────────────────
globalStyle(`${checkbox}.error .custom-checkbox`, { borderColor: vars.color.error })
globalStyle(`${checkbox}.error.checked .custom-checkbox, ${checkbox}.error.indeterminate .custom-checkbox`, {
  backgroundColor: vars.color.error,
  borderColor: vars.color.error,
})
