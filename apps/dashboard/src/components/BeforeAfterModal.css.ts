import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@port/design-system'

const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
const popIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10px) scale(0.98)' },
  to: { opacity: 1, transform: 'none' },
})

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 60,
  background: 'rgba(15, 23, 42, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  animation: `${fadeIn} 0.2s ease`,
})

export const modal = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 1360,
  maxHeight: '95vh',
  overflow: 'hidden',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: '0 24px 64px rgba(15, 23, 42, 0.28)',
  animation: `${popIn} 0.24s cubic-bezier(0.22, 1, 0.36, 1)`,
})

export const head = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 12,
  padding: '16px 20px',
  borderBottom: `1px solid ${vars.color.border}`,
  flexShrink: 0,
})

export const title = style({
  fontSize: '17px',
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const sub = style({
  marginTop: 3,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

export const close = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  border: 'none',
  background: 'transparent',
  borderRadius: vars.radius.sm,
  color: vars.color.textSecondary,
  cursor: 'pointer',
  flexShrink: 0,
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover, color: vars.color.text },
})

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  padding: '16px 20px 20px',
  overflowY: 'auto',
})

export const tabs = style({
  display: 'flex',
  gap: 6,
})

export const tab = style({
  padding: '6px 12px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.full,
  background: vars.color.surface,
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightMedium,
  cursor: 'pointer',
  transition: `all ${vars.transition.fast}`,
  ':hover': { color: vars.color.text },
})

export const tabActive = style({
  background: vars.color.primarySoft,
  borderColor: vars.color.primary,
  color: vars.color.primary,
})

// ── Before/After 슬라이더 ───────────────────────────────────────────────────────
// 두 이미지 모두 1600×1000(16:10). 컨테이너를 같은 비율로 고정해 정렬을 보장하고,
// 뷰포트 높이를 최대한 활용하되 상단 헤더/탭·하단 포인트가 함께 보이도록 maxHeight 로 상한.
export const compare = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 10',
  maxHeight: '72vh',
  borderRadius: vars.radius.md,
  overflow: 'hidden',
  border: `1px solid ${vars.color.border}`,
  background: vars.color.background,
  userSelect: 'none',
  touchAction: 'none',
  cursor: 'ew-resize',
  lineHeight: 0,
})

export const imgAfter = style({
  position: 'absolute',
  inset: 0,
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top left',
})

export const imgBefore = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top left',
})

const tagBase = style({
  position: 'absolute',
  top: 10,
  zIndex: 2,
  padding: '3px 8px',
  borderRadius: vars.radius.sm,
  fontSize: 10,
  fontWeight: vars.font.weightBold,
  letterSpacing: '0.06em',
  color: '#fff',
  pointerEvents: 'none',
})

export const tagBefore = style([tagBase, { left: 10, background: 'rgba(15, 23, 42, 0.6)' }])
export const tagAfter = style([tagBase, { right: 10, background: vars.color.primary }])

export const divider = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 2,
  marginLeft: -1,
  background: '#fff',
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.15)',
  pointerEvents: 'none',
  zIndex: 2,
})

export const handle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 34,
  height: 34,
  borderRadius: vars.radius.full,
  background: '#fff',
  color: vars.color.text,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.28)',
})

// ── 개선 포인트 ────────────────────────────────────────────────────────────────
export const points = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  columnGap: 24,
  rowGap: 8,
  '@media': {
    '(max-width: 720px)': { gridTemplateColumns: '1fr' },
  },
})

export const point = style({
  position: 'relative',
  paddingLeft: 18,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 9,
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: vars.color.primary,
    },
  },
})
