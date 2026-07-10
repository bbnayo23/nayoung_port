import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { vars } from '@port/design-system'

// ── Keyframes ───────────────────────────────────────────────────────────────
const overlayIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })

const panelIn = keyframes({
  from: { opacity: 0, transform: 'perspective(900px) translateY(16px) scale(0.96)' },
  to: { opacity: 1, transform: 'perspective(900px) translateY(0) scale(1)' },
})

const ringSpin = keyframes({ to: { transform: 'rotate(360deg)' } })

const badgePop = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.4) rotate(-18deg)' },
  '70%': { opacity: 1, transform: 'scale(1.12) rotate(5deg)' },
  '100%': { opacity: 1, transform: 'scale(1) rotate(0deg)' },
})

// 벨 흔들림(링) — 주기적으로 딸랑
const bellRing = keyframes({
  '0%, 60%, 100%': { transform: 'rotate(0deg)' },
  '10%': { transform: 'rotate(13deg)' },
  '20%': { transform: 'rotate(-11deg)' },
  '30%': { transform: 'rotate(8deg)' },
  '40%': { transform: 'rotate(-5deg)' },
  '50%': { transform: 'rotate(2deg)' },
})

const contentUp = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

const shine = keyframes({
  '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
  '100%': { transform: 'translateX(280%) skewX(-20deg)' },
})

// ── Overlay ───────────────────────────────────────────────────────────────────
export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  perspective: '1000px',
  background: 'rgba(17, 24, 39, 0.5)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  animation: `${overlayIn} 180ms ease-out`,
})

// ── Panel — 프로스티드 글라스 + 커서 3D 틸트 ────────────────────────────────────
export const panel = style({
  position: 'relative',
  overflow: 'hidden',
  width: 'min(430px, 92vw)',
  borderRadius: 22,
  padding: '34px 30px 26px',
  background: 'linear-gradient(155deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.85)',
  boxShadow:
    '0 28px 64px -16px rgba(17, 24, 39, 0.45), 0 0 46px -12px rgba(124, 92, 255, 0.28), inset 0 1px 0 rgba(255,255,255,0.9)',
  transform: 'perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
  transformStyle: 'preserve-3d',
  transition: 'transform 160ms ease-out',
  animation: `${panelIn} 340ms cubic-bezier(0.22, 1, 0.36, 1)`,
})

globalStyle(`html.dark ${panel}`, {
  background: 'linear-gradient(155deg, rgba(30,41,59,0.95) 0%, rgba(30,41,59,0.9) 100%)',
  border: '1px solid rgba(255,255,255,0.14)',
  boxShadow: '0 28px 64px -16px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.14)',
})

// ── Content ─────────────────────────────────────────────────────────────────
export const content = style({ position: 'relative', zIndex: 2 })

export const closeBtn = style({
  position: 'absolute',
  top: 14,
  right: 14,
  zIndex: 3,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  borderRadius: '50%',
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  color: vars.color.textSecondary,
  cursor: 'pointer',
  boxShadow: '0 2px 6px -2px rgba(17,24,39,0.25)',
  transition: 'background 0.15s ease, color 0.15s ease, transform 0.12s ease',
  selectors: {
    '&:hover': { background: vars.color.surfaceHover, color: vars.color.text, transform: 'rotate(90deg)' },
  },
})
globalStyle(`${closeBtn} svg`, { width: 15, height: 15, fill: 'currentColor' })

// ── 스파클 배지 (회전 그라디언트 헤일로 + 팝) ───────────────────────────────────
export const badge = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: 16,
  margin: '0 auto 16px',
  background: 'rgba(255,255,255,0.5)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  border: '1px solid rgba(255,255,255,0.75)',
  animation: `${badgePop} 480ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms both`,
})
// 회전하는 컬러 헤일로
globalStyle(`${badge}::before`, {
  content: '""',
  position: 'absolute',
  inset: -4,
  borderRadius: 20,
  zIndex: -1,
  background: 'conic-gradient(from 0deg, #5b8def, #7c5cff, #ff7ab6, #38d6c4, #5b8def)',
  filter: 'blur(6px)',
  opacity: 0.75,
  animation: `${ringSpin} 5s linear infinite`,
})
export const bell = style({
  width: 26,
  height: 26,
  transformOrigin: 'top center',
  animation: `${bellRing} 3s ease-in-out 600ms infinite`,
})

export const title = style({
  margin: '0 0 14px',
  fontSize: 20,
  fontWeight: 800,
  letterSpacing: '-0.3px',
  textAlign: 'center',
  color: vars.color.text,
  animation: `${contentUp} 360ms ease-out 180ms both`,
})

export const paragraphs = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 13,
  animation: `${contentUp} 360ms ease-out 260ms both`,
})
globalStyle(`${paragraphs} p`, {
  margin: 0,
  fontSize: 13.5,
  lineHeight: 1.75,
  color: vars.color.textSecondary,
  wordBreak: 'keep-all', // 한글 자연 줄바꿈 (단어 중간 끊김 방지)
})
// 리드 문장 — 더 진하고 크게 강조
globalStyle(`${paragraphs} p:first-child`, {
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.text,
})
globalStyle(`${paragraphs} strong`, { color: vars.color.primary, fontWeight: 700 })

// ── Footer / 버튼 (호버 스윕) ───────────────────────────────────────────────────
export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 24,
  animation: `${contentUp} 360ms ease-out 340ms both`,
})

export const confirmBtn = style({
  position: 'relative',
  overflow: 'hidden',
  height: 40,
  padding: '0 22px',
  border: 'none',
  borderRadius: 12,
  background: 'linear-gradient(135deg, #5b8def 0%, #7c5cff 100%)',
  color: '#fff',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 10px 22px -8px rgba(124, 92, 255, 0.7)',
  transition: 'transform 0.12s ease, filter 0.12s ease, box-shadow 0.12s ease',
  selectors: {
    '&:hover': {
      filter: 'brightness(1.06)',
      transform: 'translateY(-1px)',
      boxShadow: '0 14px 26px -8px rgba(124, 92, 255, 0.8)',
    },
    '&:active': { transform: 'translateY(0)' },
  },
})
globalStyle(`${confirmBtn}::before`, {
  content: '""',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '45%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
  transform: 'translateX(-150%) skewX(-20deg)',
})
globalStyle(`${confirmBtn}:hover::before`, {
  animation: `${shine} 700ms ease`,
})

// ── 모션 최소화 선호 ──────────────────────────────────────────────────────────
const REDUCE = '(prefers-reduced-motion: reduce)';
[overlay, panel, badge, title, paragraphs, footer, bell].forEach((sty) => {
  globalStyle(`${sty}`, { '@media': { [REDUCE]: { animation: 'none' } } })
})
globalStyle(`${badge}::before`, { '@media': { [REDUCE]: { animation: 'none' } } })
globalStyle(`${confirmBtn}:hover::before`, { '@media': { [REDUCE]: { animation: 'none' } } })
