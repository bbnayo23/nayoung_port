import { style } from '@vanilla-extract/css'
import { swiss, reduceMotion as reduce } from './swiss'

/**
 * 반투명 유리 패널. 커서 위치(--gx/--gy)를 따라 틸 글레어가 번지고,
 * 커서 방향(--tx/--ty)으로 미세하게 3D 기울어진다. (MainPage가 [data-glass]에 배선)
 */
export const glassPanel = style({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: swiss.glass.bg,
  backgroundImage: `radial-gradient(260px circle at var(--gx, 50%) var(--gy, -20%), ${swiss.color.accentSoft}30, transparent 62%)`,
  backdropFilter: swiss.glass.blur,
  WebkitBackdropFilter: swiss.glass.blur,
  border: `1px solid ${swiss.glass.border}`,
  boxShadow: '0 10px 34px rgba(23,22,27,0.07), inset 0 1px 0 rgba(255,255,255,0.65)',
  transform: 'perspective(900px) rotateX(var(--ty, 0deg)) rotateY(var(--tx, 0deg))',
  transition: `transform 0.3s ${swiss.ease.smooth}, border-color 0.3s ease, box-shadow 0.4s ${swiss.ease.smooth}`,
  willChange: 'transform',
  '@media': {
    [reduce]: { transform: 'none' },
  },
})
