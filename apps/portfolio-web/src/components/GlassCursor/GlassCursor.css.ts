import { style } from '@vanilla-extract/css'
import { swiss, reduceMotion } from '../../styles/swiss'

/** 돋보기 렌즈 — 뒤 콘텐츠(main 복제본)를 확대해 원형으로 보여준다 */
export const lens = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '50px',
  height: '50px',
  marginLeft: '-25px',
  marginTop: '-25px',
  borderRadius: '50%',
  overflow: 'hidden',
  zIndex: 9999,
  pointerEvents: 'none',
  opacity: 0,
  backgroundColor: swiss.color.paper,
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: `0 12px 32px rgba(26,28,38,0.22), 0 0 0 1px rgba(26,28,38,0.05), inset 0 0 0 1px rgba(255,255,255,0.4)`,
  transition: 'opacity 0.25s ease',
  willChange: 'transform',
  '@media': {
    [reduceMotion]: { display: 'none' },
    '(pointer: coarse)': { display: 'none' },
  },
})

/** 확대 클론 컨테이너 */
export const lensInner = style({
  position: 'absolute',
  top: 0,
  left: 0,
  transformOrigin: '0 0',
  willChange: 'transform',
})

/** 유리 돔 하이라이트 (클론 위) */
export const lensGlass = style({
  position: 'absolute',
  inset: 0,
  borderRadius: '50%',
  pointerEvents: 'none',
  backgroundImage:
    'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.5), transparent 44%)',
  boxShadow: `inset 0 -12px 26px ${swiss.color.c2}22, inset 0 2px 6px rgba(255,255,255,0.55)`,
})
