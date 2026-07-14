import { style, keyframes, globalStyle } from '@vanilla-extract/css'
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
// 두 이미지 모두 1600×1000(16:10). 컨테이너를 같은 비율로 고정하면 cover 크롭이 없어
// 번호 마커의 x/y 백분율이 이미지 좌표와 1:1로 정확히 맞는다(높이 상한 없음).
export const compare = style({
  position: 'relative',
  // 높이 기준으로 크기를 잡아(16:10 유지) 크롭 없이 이미지 전체를 보이므로 번호 마커 좌표가 1:1로 정확.
  // 아래 범례도 함께 보이도록 뷰포트 높이에 맞춘다.
  height: '52vh',
  width: 'auto',
  maxWidth: '100%',
  margin: '0 auto',
  aspectRatio: '16 / 10',
  flexShrink: 0,
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

// 뱃지: 스크린샷 상단 내비바와 겹치지 않도록 하단 모서리에 배치.
// 불투명 배경 + 흰 테두리 링 + 볼드 텍스트 + 강한 그림자로 어떤 배경 위에서도 또렷하게.
const tagBase = style({
  position: 'absolute',
  bottom: 14,
  zIndex: 6,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 14px',
  borderRadius: vars.radius.full,
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: '0.12em',
  color: '#fff',
  pointerEvents: 'none',
  border: '1.5px solid rgba(255, 255, 255, 0.92)',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.45)',
  selectors: {
    '&::before': {
      content: '""',
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'currentColor',
      opacity: 0.9,
    },
  },
})

export const tagBefore = style([tagBase, { left: 14, background: '#0f172a' }])
export const tagAfter = style([tagBase, { right: 14, background: vars.color.primary }])

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
  color: vars.color.textSecondary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.28)',
})

// 좌우 셰브론(‹ ›)을 가운데로 모아 드래그 방향을 암시
globalStyle(`${handle} svg`, {
  display: 'block',
  flexShrink: 0,
})
globalStyle(`${handle} svg:first-child`, { marginRight: -3 })

// ── 변경점 번호 마커(핀) ─────────────────────────────────────────────────────────
export const pin = style({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 4,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  padding: 0,
  borderRadius: '50%',
  border: '2px solid #fff',
  background: vars.color.primary,
  color: '#fff',
  fontSize: 12,
  fontWeight: 800,
  lineHeight: 1,
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
  transition: `transform ${vars.transition.fast}, background ${vars.transition.fast}`,
  ':hover': { transform: 'translate(-50%, -50%) scale(1.18)' },
})

export const pinActive = style({
  background: '#0f172a',
  transform: 'translate(-50%, -50%) scale(1.18)',
  zIndex: 5,
})

// 핀 위에 뜨는 라벨 툴팁
export const pinTip = style({
  position: 'absolute',
  bottom: 'calc(100% + 6px)',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '3px 8px',
  borderRadius: vars.radius.sm,
  background: '#0f172a',
  color: '#fff',
  fontSize: 11,
  fontWeight: vars.font.weightMedium,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
})

// ── 변경점 번호 범례 ───────────────────────────────────────────────────────────
export const notes = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  columnGap: 20,
  rowGap: 8,
  '@media': {
    '(max-width: 760px)': { gridTemplateColumns: '1fr' },
  },
})

export const note = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  padding: '6px 8px',
  borderRadius: vars.radius.sm,
  transition: `background ${vars.transition.fast}`,
})

export const noteActive = style({
  background: vars.color.primarySoft,
})

export const noteNum = style({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  marginTop: 1,
  borderRadius: '50%',
  background: vars.color.primary,
  color: '#fff',
  fontSize: 11,
  fontWeight: 800,
  lineHeight: 1,
})

export const noteBody = style({
  minWidth: 0,
})

export const noteTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const noteDiff = style({
  marginTop: 2,
  fontSize: vars.font.sizeXs,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
})

export const noteBefore = style({
  color: vars.color.textSecondary,
})

export const noteArrow = style({
  margin: '0 5px',
  color: vars.color.primary,
  fontWeight: vars.font.weightBold,
})

export const noteAfter = style({
  color: vars.color.text,
  fontWeight: vars.font.weightMedium,
})

// 수정 이유(UI/UX 판단 근거) — 좌측 액센트 라인으로 구분
export const noteWhy = style({
  margin: '5px 0 0',
  paddingLeft: 9,
  borderLeft: `2px solid ${vars.color.primary}`,
  fontSize: vars.font.sizeXs,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
})
