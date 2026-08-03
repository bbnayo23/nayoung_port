import { keyframes, style } from '@vanilla-extract/css'
import { swiss, reduceMotion as reduce } from '@/styles/swiss'
import { glassPanel } from '@/styles/glass.css'

// ── 헤더 ──────────────────────────────────────────────────────────────────────

export const head = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '12px',
  marginBottom: '8px',
})

export const title = style({
  fontFamily: swiss.font.mono,
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: swiss.color.inkSoft,
})

export const period = style({
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  letterSpacing: '0.06em',
  color: swiss.color.inkFaint,
})

export const note = style({
  fontSize: '14px',
  lineHeight: '1.7',
  color: swiss.color.inkSoft,
  marginBottom: '22px',
})

// ── 필터 ──────────────────────────────────────────────────────────────────────

export const filters = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '22px',
})

export const filterChip = style({
  appearance: 'none',
  cursor: 'pointer',
  padding: '7px 14px',
  borderRadius: '999px',
  border: `1px solid ${swiss.color.line}`,
  background: 'transparent',
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  letterSpacing: '0.04em',
  color: swiss.color.inkSoft,
  transition: 'color 0.25s ease, border-color 0.25s ease, background 0.25s ease',
  selectors: {
    '&:hover': { color: swiss.color.ink, borderColor: `${swiss.color.accent}66` },
    '&[aria-pressed="true"]': {
      color: '#fff',
      borderColor: 'transparent',
      backgroundImage: swiss.gradient,
    },
  },
})

// ── 그리드 ────────────────────────────────────────────────────────────────────

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  '@media': {
    'screen and (max-width: 900px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
    'screen and (max-width: 560px)': { gridTemplateColumns: '1fr' },
  },
})

export const cardBtn = style({
  appearance: 'none',
  cursor: 'pointer',
  display: 'block',
  padding: 0,
  border: `1px solid ${swiss.color.line}`,
  borderRadius: '14px',
  overflow: 'hidden',
  background: swiss.glass.tint,
  textAlign: 'left',
  transition: `transform 0.45s ${swiss.ease.smooth}, border-color 0.3s ease, box-shadow 0.45s ${swiss.ease.smooth}`,
  selectors: {
    '&:hover': {
      transform: 'translateY(-3px)',
      borderColor: `${swiss.color.accent}66`,
      boxShadow: '0 20px 44px rgba(78,90,212,0.16)',
    },
  },
  '@media': {
    [reduce]: { transition: 'none', selectors: { '&:hover': { transform: 'none' } } },
  },
})

export const thumbBox = style({
  display: 'block',
  position: 'relative',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  background: swiss.color.paperAlt,
})

export const thumbImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top center',
  display: 'block',
  transition: `transform 0.6s ${swiss.ease.smooth}`,
  selectors: {
    [`${cardBtn}:hover &`]: { transform: 'scale(1.04)' },
  },
  '@media': {
    [reduce]: { transition: 'none' },
  },
})

export const cardBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  padding: '14px 16px 16px',
})

export const cardTitle = style({
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '1.4',
  color: swiss.color.ink,
})

export const cardRole = style({
  fontFamily: swiss.font.mono,
  fontSize: '11px',
  letterSpacing: '0.03em',
  color: swiss.color.inkFaint,
})

export const empty = style({
  padding: '40px 0',
  fontSize: '14px',
  color: swiss.color.inkFaint,
})

// ── 상세 모달 ─────────────────────────────────────────────────────────────────

const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
const riseIn = keyframes({
  from: { opacity: 0, transform: 'translateY(14px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px',
  background: 'rgba(16, 18, 30, 0.55)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  animation: `${fadeIn} 0.25s ease`,
  '@media': {
    'screen and (max-width: 640px)': { padding: '16px' },
    [reduce]: { animation: 'none' },
  },
})

export const dialog = style([glassPanel, {
  position: 'relative',
  width: 'min(1100px, 100%)',
  maxHeight: '100%',
  overflowY: 'auto',
  borderRadius: '20px',
  padding: '32px',
  // 패널 기울기 효과는 모달에서 방해되므로 해제
  transform: 'none',
  animation: `${riseIn} 0.35s ${swiss.ease.smooth}`,
  backgroundColor: 'rgba(255,255,255,0.9)',
  '@media': {
    'screen and (max-width: 640px)': { padding: '20px' },
    [reduce]: { animation: 'none' },
  },
}])

export const dialogClose = style({
  position: 'absolute',
  top: '16px',
  right: '16px',
  appearance: 'none',
  cursor: 'pointer',
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  border: `1px solid ${swiss.color.line}`,
  background: 'rgba(255,255,255,0.7)',
  fontSize: '16px',
  lineHeight: 1,
  color: swiss.color.inkSoft,
  transition: 'color 0.25s ease, border-color 0.25s ease',
  selectors: {
    '&:hover': { color: swiss.color.ink, borderColor: `${swiss.color.accent}66` },
  },
})

export const dialogTitle = style({
  fontFamily: swiss.font.sans,
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: swiss.color.ink,
  paddingRight: '44px',
  marginBottom: '4px',
})

export const dialogRole = style({
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  letterSpacing: '0.04em',
  color: swiss.color.accent,
  marginBottom: '24px',
})

export const dialogBody = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1fr)',
  gap: '28px',
  '@media': {
    'screen and (max-width: 860px)': { gridTemplateColumns: '1fr', gap: '24px' },
  },
})

// 이미지 뷰어

export const viewer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  minWidth: 0,
})

export const stage = style({
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  border: `1px solid ${swiss.color.line}`,
  background: swiss.color.paperAlt,
})

export const stageImg = style({
  display: 'block',
  width: '100%',
  maxHeight: '58vh',
  objectFit: 'contain',
  background: '#fff',
})

export const navBtn = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  appearance: 'none',
  cursor: 'pointer',
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  border: `1px solid ${swiss.color.line}`,
  background: 'rgba(255,255,255,0.86)',
  color: swiss.color.ink,
  fontSize: '16px',
  lineHeight: 1,
  transition: 'background 0.25s ease, border-color 0.25s ease',
  selectors: {
    '&:hover': { background: '#fff', borderColor: `${swiss.color.accent}66` },
    '&[data-dir="prev"]': { left: '12px' },
    '&[data-dir="next"]': { right: '12px' },
  },
})

export const thumbs = style({
  display: 'flex',
  gap: '8px',
})

export const thumbBtn = style({
  appearance: 'none',
  cursor: 'pointer',
  flex: 1,
  padding: 0,
  height: '58px',
  borderRadius: '8px',
  overflow: 'hidden',
  border: `1px solid ${swiss.color.line}`,
  background: swiss.color.paperAlt,
  opacity: 0.55,
  transition: 'opacity 0.25s ease, border-color 0.25s ease',
  selectors: {
    '&:hover': { opacity: 0.85 },
    '&[aria-current="true"]': { opacity: 1, borderColor: swiss.color.accent },
  },
})

export const thumbBtnImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top center',
  display: 'block',
})

// 프로젝트 정보

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  minWidth: 0,
})

export const infoLabel = style({
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: swiss.color.accent,
  paddingBottom: '10px',
  borderBottom: `1px solid ${swiss.color.line}`,
  marginBottom: '14px',
})

export const metaList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

export const metaItem = style({
  display: 'grid',
  gridTemplateColumns: '92px minmax(0, 1fr)',
  gap: '10px',
  fontSize: '13.5px',
  lineHeight: '1.6',
  color: swiss.color.inkSoft,
})

export const metaKey = style({
  fontFamily: swiss.font.mono,
  fontSize: '11px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: swiss.color.inkFaint,
  paddingTop: '3px',
})

export const metaLink = style({
  color: swiss.color.accent,
  textDecoration: 'none',
  wordBreak: 'break-all',
  ':hover': { textDecoration: 'underline' },
})

export const points = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

export const point = style({
  position: 'relative',
  paddingLeft: '16px',
  fontSize: '13.5px',
  lineHeight: '1.7',
  color: swiss.color.inkSoft,
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '9px',
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      background: swiss.color.accent,
    },
  },
})
