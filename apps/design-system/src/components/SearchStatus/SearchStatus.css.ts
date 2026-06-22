import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
})

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '1em',
  lineHeight: 1,
})

export const spinner = style({
  display: 'inline-block',
  width: '0.9em',
  height: '0.9em',
  border: `2px solid ${vars.color.border}`,
  borderTopColor: vars.color.brand[600],
  borderRadius: '50%',
  animation: `${spin} 0.7s linear infinite`,
  verticalAlign: 'middle',
})

export const dash = style({
  color: vars.color.textSecondary,
})

export const error = style({
  color: vars.color.danger,
})

export type LoadableState = 'loading' | 'hasValue' | 'hasError'
