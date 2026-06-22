import { styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const base = {
  width: 16,
  height: 16,
  borderRadius: 4,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const checkbox = styleVariants({
  checked: [base, { border: 'none', background: vars.color.brand[600], cursor: 'pointer' }],
  indeterminate: [base, { border: 'none', background: vars.color.brand[300], cursor: 'pointer' }],
  unchecked: [
    base,
    {
      border: `1.5px solid ${vars.color.borderStrong}`,
      background: 'transparent',
      cursor: 'pointer',
    },
  ],
  readonly: [
    base,
    {
      border: `1.5px solid ${vars.color.borderStrong}`,
      background: 'transparent',
      cursor: 'default',
    },
  ],
})

export type CorrelationCheckboxVariant = keyof typeof checkbox
