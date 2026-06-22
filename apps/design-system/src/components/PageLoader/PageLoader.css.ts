import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

export const overlay = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: 200,
})

export const spinner = style({
  width: 28,
  height: 28,
  borderRadius: '50%',
  border: `3px solid ${vars.color.border}`,
  borderTopColor: vars.color.brand[600],
  animation: `${spin} 0.7s linear infinite`,
})
