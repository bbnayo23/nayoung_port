import { keyframes, style } from '@vanilla-extract/css'
import { glitch } from '../../styles/glitch'

const reduce = 'screen and (prefers-reduced-motion: reduce)'

/* ── motion ─────────────────────────────────────────── */
const drop = keyframes({
  from: { opacity: '0', transform: 'translateY(20px)' },
  to: { opacity: '1', transform: 'translateY(0)' },
})

/* 색수차 슬라이스 — red 채널 (::before) */
const sliceA = keyframes({
  '0%': { clipPath: 'inset(18% 0 62% 0)', transform: 'translateX(-4px)' },
  '15%': { clipPath: 'inset(74% 0 8% 0)', transform: 'translateX(4px)' },
  '30%': { clipPath: 'inset(43% 0 41% 0)', transform: 'translateX(-3px)' },
  '45%': { clipPath: 'inset(8% 0 84% 0)', transform: 'translateX(5px)' },
  '60%': { clipPath: 'inset(60% 0 22% 0)', transform: 'translateX(-5px)' },
  '75%': { clipPath: 'inset(32% 0 54% 0)', transform: 'translateX(3px)' },
  '100%': { clipPath: 'inset(50% 0 38% 0)', transform: 'translateX(-4px)' },
})

/* 색수차 슬라이스 — cyan 채널 (::after) */
const sliceB = keyframes({
  '0%': { clipPath: 'inset(70% 0 12% 0)', transform: 'translateX(4px)' },
  '20%': { clipPath: 'inset(12% 0 78% 0)', transform: 'translateX(-5px)' },
  '40%': { clipPath: 'inset(52% 0 32% 0)', transform: 'translateX(4px)' },
  '60%': { clipPath: 'inset(28% 0 60% 0)', transform: 'translateX(-3px)' },
  '80%': { clipPath: 'inset(82% 0 4% 0)', transform: 'translateX(5px)' },
  '100%': { clipPath: 'inset(36% 0 48% 0)', transform: 'translateX(-4px)' },
})

/* 화면 전체 지지직 흔들림 (간헐적) */
const jitter = keyframes({
  '0%, 92%, 100%': { transform: 'translate(0,0)' },
  '93%': { transform: 'translate(-2px,1px)' },
  '94%': { transform: 'translate(2px,-1px)' },
  '95%': { transform: 'translate(-1px,-1px)' },
  '96%': { transform: 'translate(1px,1px)' },
  '97%': { transform: 'translate(-2px,0)' },
})

/* static 노이즈 플리커 */
const flicker = keyframes({
  '0%, 100%': { opacity: '0.05' },
  '50%': { opacity: '0.11' },
  '93%': { opacity: '0.2' },
  '96%': { opacity: '0.03' },
})

const noiseShift = keyframes({
  '0%': { backgroundPosition: '0 0' },
  '20%': { backgroundPosition: '-30px 10px' },
  '40%': { backgroundPosition: '20px -20px' },
  '60%': { backgroundPosition: '-10px 30px' },
  '80%': { backgroundPosition: '25px 15px' },
  '100%': { backgroundPosition: '0 0' },
})

const scan = keyframes({
  '0%': { transform: 'translateY(-100%)' },
  '100%': { transform: 'translateY(100vh)' },
})

const symFlicker = keyframes({
  '0%, 100%': { opacity: '0.85' },
  '47%': { opacity: '0.85' },
  '48%': { opacity: '0.2' },
  '49%': { opacity: '0.9' },
  '92%': { opacity: '0.3' },
  '93%': { opacity: '0.85' },
})

/* ── stage ──────────────────────────────────────────── */
export const section = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100svh',
  padding: '120px 40px 96px',
  background: `radial-gradient(ellipse 90% 70% at 50% 30%, ${glitch.color.bg}, ${glitch.color.bgDeep})`,
  color: glitch.color.text,
  overflow: 'hidden',
  isolation: 'isolate',
  '@media': {
    'screen and (max-width: 768px)': { padding: '96px 20px 72px' },
  },
})

/* static 노이즈 레이어 */
export const noiseLayer = style({
  position: 'absolute',
  inset: '-50px',
  zIndex: 1,
  backgroundImage: glitch.noise,
  backgroundSize: '160px 160px',
  mixBlendMode: 'screen',
  opacity: '0.06',
  pointerEvents: 'none',
  animation: `${flicker} 3s steps(2, end) infinite, ${noiseShift} 0.6s steps(3) infinite`,
  '@media': { [reduce]: { animation: 'none', opacity: '0.04' } },
})

/* 스캔라인 */
export const scanlines = style({
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.28) 3px)`,
  pointerEvents: 'none',
  mixBlendMode: 'multiply',
})

/* 지나가는 밝은 스캔 바 */
export const scanBar = style({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  height: '120px',
  zIndex: 2,
  background: `linear-gradient(180deg, transparent, ${glitch.color.cyan}14, transparent)`,
  pointerEvents: 'none',
  animation: `${scan} 6s linear infinite`,
  '@media': { [reduce]: { display: 'none' } },
})

export const content = style({
  position: 'relative',
  zIndex: 3,
  width: '100%',
  maxWidth: '1080px',
  marginInline: 'auto',
  animation: `${jitter} 7s steps(1, end) infinite`,
  '@media': { [reduce]: { animation: 'none' } },
})

/* ── 상태 라벨 ──────────────────────────────────────── */
export const sticker = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 12px',
  marginBottom: '28px',
  fontFamily: glitch.font.mono,
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: glitch.color.text,
  border: `1px solid ${glitch.color.line}`,
  background: 'rgba(255,255,255,0.02)',
  animation: `${drop} 0.5s ease both`,
  '@media': { [reduce]: { animation: 'none' } },
})

const blink = keyframes({ '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.2' } })

export const stickerDot = style({
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  background: glitch.color.red,
  boxShadow: `0 0 8px ${glitch.color.red}`,
  animation: `${blink} 1.2s steps(2, end) infinite`,
  '@media': { [reduce]: { animation: 'none' } },
})

/* ── 글리치 텍스트 (색수차) ─────────────────────────── */
const glitchFx = style({
  position: 'relative',
  display: 'inline-block',
  // 상시 미세 색수차
  textShadow: `-2px 0 ${glitch.color.red}66, 2px 0 ${glitch.color.cyan}66`,
  selectors: {
    '&::before, &::after': {
      content: 'attr(data-text)',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: glitch.color.bg,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    '&::before': {
      color: glitch.color.text,
      textShadow: `-3px 0 ${glitch.color.red}`,
      animation: `${sliceA} 2.6s steps(8, end) infinite alternate-reverse`,
    },
    '&::after': {
      color: glitch.color.text,
      textShadow: `3px 0 ${glitch.color.cyan}`,
      animation: `${sliceB} 3.4s steps(8, end) infinite alternate-reverse`,
    },
  },
  '@media': {
    [reduce]: {
      selectors: {
        '&::before, &::after': { animation: 'none', opacity: '0' },
      },
    },
  },
})

export const nameWrap = style({
  marginBottom: '12px',
  animation: `${drop} 0.5s 0.06s ease both`,
  '@media': { [reduce]: { animation: 'none' } },
})

export const name = style([glitchFx, {
  fontFamily: glitch.font.display,
  fontWeight: 400,
  fontSize: 'clamp(72px, 13vw, 184px)',
  lineHeight: '0.86',
  letterSpacing: '0.01em',
  textTransform: 'uppercase',
}])

/* ── 매니페스토 ─────────────────────────────────────── */
export const manifesto = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '12px 24px',
  margin: '20px 0 32px',
  animation: `${drop} 0.5s 0.14s ease both`,
  '@media': { [reduce]: { animation: 'none' } },
})

export const manifestoBig = style([glitchFx, {
  fontFamily: glitch.font.display,
  fontWeight: 400,
  fontSize: 'clamp(36px, 6vw, 84px)',
  lineHeight: '0.92',
  textTransform: 'uppercase',
}])

export const initialN = style({ color: glitch.color.red })
export const initialY = style({ color: glitch.color.cyan })

export const manifestoSub = style({
  fontFamily: glitch.font.mono,
  fontSize: 'clamp(12px, 1.6vw, 15px)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: glitch.color.textDim,
})

/* ny 도장 박스 */
export const stamp = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  flexShrink: 0,
  fontFamily: glitch.font.display,
  fontSize: '24px',
  textTransform: 'lowercase',
  color: glitch.color.text,
  border: `1px solid ${glitch.color.line}`,
  textShadow: `-1.5px 0 ${glitch.color.red}, 1.5px 0 ${glitch.color.cyan}`,
  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  ':hover': {
    transform: 'skewX(-6deg)',
    borderColor: glitch.color.cyan,
    boxShadow: `0 0 18px ${glitch.color.cyan}55`,
  },
})

/* ── 소개 ───────────────────────────────────────────── */
export const bio = style({
  maxWidth: '460px',
  fontFamily: glitch.font.sans,
  fontSize: '16px',
  lineHeight: '1.7',
  color: glitch.color.textDim,
  whiteSpace: 'pre-line',
  marginBottom: '32px',
  paddingLeft: '16px',
  borderLeft: `2px solid ${glitch.color.red}`,
  animation: `${drop} 0.5s 0.22s ease both`,
  '@media': { [reduce]: { animation: 'none' } },
})

/* ── 역할 태그 ──────────────────────────────────────── */
export const roles = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '26px',
  animation: `${drop} 0.5s 0.3s ease both`,
  '@media': { [reduce]: { animation: 'none' } },
})

export const roleTag = style({
  padding: '6px 12px',
  fontFamily: glitch.font.mono,
  fontSize: '12px',
  letterSpacing: '0.04em',
  color: glitch.color.text,
  border: `1px solid ${glitch.color.line}`,
  background: 'rgba(255,255,255,0.02)',
  transition: 'transform 0.16s ease, color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease',
  ':hover': {
    color: glitch.color.cyan,
    borderColor: glitch.color.cyan,
    transform: 'skewX(-8deg)',
    boxShadow: `-2px 0 ${glitch.color.red}, 2px 0 ${glitch.color.cyan}`,
  },
})

/* ── 기술 스택 칩 ───────────────────────────────────── */
export const stack = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '40px',
  animation: `${drop} 0.5s 0.38s ease both`,
  '@media': { [reduce]: { animation: 'none' } },
})

export const chip = style({
  padding: '6px 12px',
  fontFamily: glitch.font.mono,
  fontSize: '12px',
  color: glitch.color.textDim,
  border: `1px solid ${glitch.color.line}`,
  transition: 'transform 0.16s ease, color 0.16s ease, border-color 0.16s ease',
  ':hover': {
    transform: 'translateY(-2px)',
    color: glitch.color.text,
    borderColor: glitch.color.text,
  },
})

export const chipAccent = style({ color: glitch.color.cyan, borderColor: `${glitch.color.cyan}55` })
export const chipPurple = style({ color: glitch.color.magenta, borderColor: `${glitch.color.magenta}55` })

/* ── 액션 ───────────────────────────────────────────── */
export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '16px',
  animation: `${drop} 0.5s 0.46s ease both`,
  '@media': { [reduce]: { animation: 'none' } },
})

const btnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '13px 22px',
  fontFamily: glitch.font.mono,
  fontSize: '14px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  transition: 'transform 0.16s ease, box-shadow 0.16s ease, background 0.16s ease, color 0.16s ease',
} as const

export const btnPrimary = style({
  ...btnBase,
  color: glitch.color.bg,
  background: glitch.color.text,
  border: `1px solid ${glitch.color.text}`,
  ':hover': {
    color: glitch.color.text,
    background: 'transparent',
    boxShadow: `-3px 0 ${glitch.color.red}, 3px 0 ${glitch.color.cyan}`,
    transform: 'skewX(-5deg)',
  },
})

export const btnGhost = style({
  ...btnBase,
  color: glitch.color.text,
  background: 'transparent',
  border: `1px solid ${glitch.color.line}`,
  ':hover': {
    borderColor: glitch.color.cyan,
    color: glitch.color.cyan,
    boxShadow: `0 0 16px ${glitch.color.cyan}33`,
  },
})

/* ── 도형 심볼 (우측 스택) ──────────────────────────── */
export const symbols = style({
  position: 'absolute',
  top: '50%',
  right: '36px',
  transform: 'translateY(-50%)',
  zIndex: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  color: glitch.color.text,
  pointerEvents: 'none',
  '@media': {
    'screen and (max-width: 900px)': { display: 'none' },
  },
})

export const symbol = style({
  width: '34px',
  height: '34px',
  animation: `${symFlicker} 4s steps(1, end) infinite`,
  selectors: {
    '&:nth-child(2n)': { animationDelay: '1.3s', color: glitch.color.cyan },
    '&:nth-child(3n)': { animationDelay: '2.1s', color: glitch.color.red },
  },
  '@media': { [reduce]: { animation: 'none' } },
})

/* ── 스크롤 힌트 ────────────────────────────────────── */
export const scrollHint = style({
  position: 'absolute',
  bottom: '32px',
  left: '40px',
  zIndex: 3,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontFamily: glitch.font.mono,
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: glitch.color.textDim,
  animation: `${drop} 0.5s 0.6s ease both`,
  '@media': {
    'screen and (max-width: 768px)': { left: '20px' },
    'screen and (max-width: 480px)': { display: 'none' },
    [reduce]: { animation: 'none' },
  },
})

export const scrollArrow = style({
  fontSize: '16px',
  animation: `${blink} 1.6s steps(2, end) infinite`,
  '@media': { [reduce]: { animation: 'none' } },
})
