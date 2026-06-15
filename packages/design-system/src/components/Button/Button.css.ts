import { style, styleVariants } from '@vanilla-extract/css'

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  border: 'none',
  borderRadius: 8,
  fontSize: '0.95rem',
  fontWeight: 600,
  padding: '0.625rem 1.1rem',
  cursor: 'pointer',
  transition: 'opacity 0.15s ease',
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export const button = styleVariants({
  primary: [base, { background: '#4f46e5', color: '#fff' }],
  secondary: [base, { background: '#e5e7eb', color: '#111827' }],
})

export type ButtonVariant = keyof typeof button
