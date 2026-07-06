import { style, keyframes } from '@vanilla-extract/css'
import { reduceMotion } from '../../styles/swiss'

const fade = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const pulse = keyframes({
  '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
  '50%': { opacity: 1, transform: 'scale(1.04)' },
})

// 3D 청크 다운로드 대기 동안 보이는 스플래시.
// 뒤이어 뜨는 R3F 로더(다크)와 씬으로 매끄럽게 이어지도록 같은 다크 톤을 쓴다.
export const splashRoot = style({
  position: 'fixed',
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  background: 'radial-gradient(circle at 50% 40%, #0e1530 0%, #070b14 70%)',
  zIndex: 20,
  animation: `${fade} 0.4s ease`,
})

export const splashMark = style({
  fontSize: '52px',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  background: 'linear-gradient(135deg, #82aaff, #c792ea)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  animation: `${pulse} 1.6s ease-in-out infinite`,
  '@media': {
    [reduceMotion]: { animation: 'none', opacity: 0.85 },
  },
})
