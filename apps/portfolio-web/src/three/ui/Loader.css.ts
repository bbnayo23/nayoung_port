import { style, keyframes } from '@vanilla-extract/css'

const fade = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const loaderRoot = style({
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  background: 'radial-gradient(circle at 50% 40%, #0e1530 0%, #070b14 70%)',
  zIndex: 30,
  transition: 'opacity 0.6s ease',
  selectors: {
    '&[data-done="true"]': { opacity: 0, pointerEvents: 'none' },
  },
})

export const loaderInner = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  animation: `${fade} 0.5s ease`,
})

export const loaderMark = style({
  fontSize: '40px',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  background: 'linear-gradient(135deg, #82aaff, #c792ea)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  fontFamily: "'Pretendard', sans-serif",
})

export const loaderBar = style({
  width: '200px',
  height: '4px',
  borderRadius: '99px',
  background: 'rgba(130, 170, 255, 0.15)',
  overflow: 'hidden',
})

export const loaderFill = style({
  height: '100%',
  borderRadius: '99px',
  background: 'linear-gradient(90deg, #82aaff, #c792ea)',
  transition: 'width 0.3s ease',
})

export const loaderText = style({
  fontSize: '13px',
  color: '#8b93bd',
  fontFamily: "'SF Mono', ui-monospace, monospace",
  letterSpacing: '0.02em',
})
