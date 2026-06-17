import { style } from '@vanilla-extract/css'

export const stage = style({
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100dvh',
  overflow: 'hidden',
  background: 'radial-gradient(circle at 50% 40%, #0e1530 0%, #070b14 70%)',
})

export const canvas = style({
  position: 'absolute',
  inset: 0,
  touchAction: 'none',
})
