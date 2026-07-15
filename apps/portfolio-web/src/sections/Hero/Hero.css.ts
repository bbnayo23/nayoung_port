import { keyframes, style } from '@vanilla-extract/css'
import { swiss, reduceMotion as reduce } from '@/styles/swiss'

const rise = keyframes({
  from: { opacity: '0', transform: 'translateY(18px)' },
  to: { opacity: '1', transform: 'translateY(0)' },
})

/* 깊이(translateZ)를 유지하는 요소용 — opacity만 페이드 */
const fadeZ = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
})

const drawX = keyframes({
  from: { transform: 'scaleX(0)' },
  to: { transform: 'scaleX(1)' },
})

/* ── stage ──────────────────────────────────────────── */
export const section = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100svh',
  padding: '128px 56px 72px',
  background: 'transparent',
  color: swiss.color.ink,
  overflow: 'hidden',
  perspective: '1400px',
  perspectiveOrigin: '50% 40%',
  '@media': {
    'screen and (max-width: 900px)': { padding: '104px 28px 56px' },
    'screen and (max-width: 560px)': { padding: '96px 20px 48px' },
  },
})

/* 미세한 컬럼 그리드 (스위스 격자) */
export const gridLines = style({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  backgroundImage: `repeating-linear-gradient(90deg, ${swiss.color.lineSoft} 0, ${swiss.color.lineSoft} 1px, transparent 1px, transparent calc(100% / 12))`,
  backgroundSize: '100% 100%',
  pointerEvents: 'none',
  opacity: '0.6',
  '@media': {
    'screen and (max-width: 560px)': { display: 'none' },
  },
})

export const content = style({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '1240px',
  marginInline: 'auto',
  transformStyle: 'preserve-3d',
  transform: 'rotateX(var(--ry, 0deg)) rotateY(var(--rx, 0deg))',
  willChange: 'transform',
})

/* ── eyebrow (상단 메타) ────────────────────────────── */
export const eyebrow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '12px',
  paddingBottom: '20px',
  marginBottom: '40px',
  borderBottom: `1px solid ${swiss.color.line}`,
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: swiss.color.inkSoft,
  animation: `${rise} 0.7s ${swiss.ease.soft} both`,
  '@media': { [reduce]: { animation: 'none' } },
})

export const eyebrowAccent = style({ color: swiss.color.accent })

/* ── 이름 (대형 타이포) ─────────────────────────────── */
export const name = style({
  fontFamily: swiss.font.sans,
  fontWeight: 800,
  fontSize: 'clamp(64px, 12vw, 168px)',
  lineHeight: '0.9',
  letterSpacing: '-0.045em',
  textTransform: 'uppercase',
  color: swiss.color.ink,
  margin: 0,
  transform: 'translateZ(70px)',
  animation: `${fadeZ} 0.8s 0.06s ${swiss.ease.soft} both`,
  '@media': {
    [reduce]: { animation: 'none', transform: 'none' },
  },
})

export const nameReg = style({
  color: swiss.color.accent,
  fontWeight: 400,
  verticalAlign: 'super',
  fontSize: '0.28em',
  marginLeft: '0.08em',
})

/* ── 룰 라인 (포인트 세그먼트) ──────────────────────── */
export const rule = style({
  position: 'relative',
  height: '2px',
  background: swiss.color.line,
  margin: '36px 0 32px',
  transformOrigin: 'left center',
  animation: `${drawX} 0.7s 0.18s ${swiss.ease.soft} both`,
  '@media': { [reduce]: { animation: 'none' } },
})

export const ruleAccent = style({
  position: 'absolute',
  left: 0,
  top: 0,
  height: '2px',
  width: '88px',
  backgroundImage: swiss.gradient,
})

/* ── 본문 그리드 (좌: 카피 / 우: 인덱스) ────────────── */
export const body = style({
  display: 'grid',
  gridTemplateColumns: '1.4fr 1fr',
  gap: '48px',
  alignItems: 'start',
  transformStyle: 'preserve-3d',
  animation: `${rise} 0.7s 0.26s ${swiss.ease.soft} both`,
  '@media': {
    'screen and (max-width: 860px)': { gridTemplateColumns: '1fr', gap: '40px' },
    [reduce]: { animation: 'none' },
  },
})

export const col = style({})

export const lead = style({
  fontFamily: swiss.font.sans,
  fontSize: 'clamp(18px, 2vw, 24px)',
  fontWeight: 500,
  lineHeight: '1.3',
  letterSpacing: '-0.01em',
  color: swiss.color.ink,
  marginBottom: '20px',
})

export const leadSep = style({ color: swiss.color.accent, margin: '0 6px' })

export const bio = style({
  maxWidth: '440px',
  fontFamily: swiss.font.sans,
  fontSize: '16px',
  lineHeight: '1.65',
  color: swiss.color.inkSoft,
  whiteSpace: 'pre-line',
  marginBottom: '28px',
})

/* ny 매니페스토 (절제된 서명) */
export const manifesto = style({
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: '10px',
  fontFamily: swiss.font.mono,
  fontSize: '13px',
  letterSpacing: '0.04em',
  color: swiss.color.inkSoft,
})

export const manifestoMark = style({
  fontWeight: 700,
  color: swiss.color.accent,
  fontSize: '15px',
})

/* ── 인덱스 네비 (우측) ─────────────────────────────── */
export const index = style({
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${swiss.color.ink}`,
  transformStyle: 'preserve-3d',
  transform: 'translateZ(32px)',
  '@media': { [reduce]: { transform: 'none' } },
})

export const indexItem = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '16px',
  padding: '16px 4px',
  borderBottom: `1px solid ${swiss.color.line}`,
  color: swiss.color.ink,
  transformStyle: 'preserve-3d',
  transform: 'translateZ(0)',
  transition: `transform 0.45s ${swiss.ease.smooth}, padding-left 0.45s ${swiss.ease.smooth}, color 0.3s ease, background 0.3s ease, box-shadow 0.45s ${swiss.ease.smooth}`,
  selectors: {
    '&:hover': {
      paddingLeft: '16px',
      background: swiss.color.paperAlt,
      transform: 'translateZ(40px) rotateY(-5deg)',
      boxShadow: '-18px 18px 36px rgba(23,22,27,0.16)',
    },
  },
})

export const indexNum = style({
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  color: swiss.color.accent,
  flexShrink: 0,
  width: '24px',
})

export const indexLabel = style({
  fontFamily: swiss.font.sans,
  fontSize: '20px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  flex: 1,
})

export const indexArrow = style({
  fontFamily: swiss.font.sans,
  fontSize: '16px',
  color: swiss.color.inkFaint,
  transition: `transform 0.4s ${swiss.ease.smooth}, color 0.3s ease`,
  selectors: {
    [`${indexItem}:hover &`]: { transform: 'translate(4px, -4px)', color: swiss.color.accent },
  },
})

/* ── 액션 ───────────────────────────────────────────── */
export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '14px',
  marginTop: '40px',
  animation: `${rise} 0.7s 0.34s ${swiss.ease.soft} both`,
  '@media': { [reduce]: { animation: 'none' } },
})

const btnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  padding: '14px 26px',
  fontFamily: swiss.font.sans,
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  borderRadius: '2px',
  transform: 'translate(var(--mx, 0px), var(--my, 0px))',
  transition: `transform 0.35s ${swiss.ease.smooth}, background 0.3s ease, color 0.3s ease, border-color 0.3s ease`,
} as const

export const btnPrimary = style({
  ...btnBase,
  color: swiss.color.paper,
  background: swiss.color.ink,
  border: `1px solid ${swiss.color.ink}`,
  ':hover': { background: swiss.color.accent, borderColor: swiss.color.accent },
})

export const btnGhost = style({
  ...btnBase,
  color: swiss.color.ink,
  background: 'transparent',
  border: `1px solid ${swiss.color.line}`,
  ':hover': { borderColor: swiss.color.ink },
})

/* ── 푸터 메타 (하단 고정 라벨) ─────────────────────── */
export const footMeta = style({
  position: 'absolute',
  left: '56px',
  right: '56px',
  bottom: '28px',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: swiss.font.mono,
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: swiss.color.inkFaint,
  animation: `${rise} 0.7s 0.5s ${swiss.ease.soft} both`,
  '@media': {
    'screen and (max-width: 900px)': { left: '28px', right: '28px' },
    'screen and (max-width: 560px)': { display: 'none' },
    [reduce]: { animation: 'none' },
  },
})
