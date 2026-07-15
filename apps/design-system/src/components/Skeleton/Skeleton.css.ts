import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

const pulse = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
})

export const skeleton = style({
  display: 'block',
  backgroundColor: `var(--color-skeleton-bg, ${vars.color.border})`,
  animation: `${pulse} 1.5s infinite`,
})
