import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  minHeight: '100vh',
  fontFamily: 'sans-serif',
})

export const title = style({
  fontSize: '3rem',
  fontWeight: 700,
  margin: 0,
})

export const subtitle = style({
  fontSize: '1.25rem',
  color: '#666',
  marginTop: '1rem',
})
