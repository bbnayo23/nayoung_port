import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

/**
 * AiR Works GNB 스타일 — Figma "AW · Layout Shell (LNB+GNB · Empty)" 재현.
 * 브랜드 셸 고유 팔레트라 테마 토큰이 아닌 Figma 하드코딩 값을 그대로 사용한다.
 */
const C = {
  logoCircle: '#131313',
  brandText: '#111827',
  divider: '#e5e7eb',
  icon: '#4b5563', // gray-600 — 우측 액션 아이콘 stroke
  iconHoverBg: 'rgba(17, 24, 39, 0.05)',
  notiDot: '#dc2626',
  homeBox: '#e3edfc',
  homeBoxHover: '#d4e4fb',
  homeIcon: '#123e80', // navy — 홈 박스 안 아이콘
}

// 밴드 배경: 하단 은은한 파란 radial glow 3겹 + 대각 라이트 그라디언트 (Figma 지정값)
const BAND_BG = [
  'radial-gradient(115% 160% at -5% 120%, rgba(40, 120, 235, 0.17) 0%, rgba(40, 120, 235, 0) 62%)',
  'radial-gradient(110% 150% at 104% 122%, rgba(40, 120, 235, 0.10) 0%, rgba(40, 120, 235, 0) 58%)',
  'radial-gradient(135% 230% at 120% 128%, rgba(40, 120, 235, 0.06) 0%, rgba(40, 120, 235, 0) 72%)',
  'linear-gradient(155deg, #e9f2f9 0%, #f3f8fc 50%, #fdfefe 100%)',
].join(', ')

// ── 밴드 (전체 폭 56px, 콘텐츠는 상단 40px / 하단 16px 은 body 로 겹쳐 그라디언트 이음) ──
// Figma "GNB-band" 56px. padding-bottom 16 로 콘텐츠를 상단 40px 에 두고, margin-bottom -16 로
// 하단 16px 를 body 위로 겹쳐(z-index 20) LNB·Main 카드의 라운드 코너가 GNB 그라디언트를 드러낸다.
export const gnb = style({
  position: 'relative',
  zIndex: 20,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: 56,
  paddingBottom: 16,
  marginBottom: -16,
  flexShrink: 0,
  background: BAND_BG,
})

// 콘텐츠 행 — 좌 브랜드 / 우 액션 (밴드에 세로 중앙 정렬)
export const gnbInner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  padding: '0 14px 0 12px',
})

// ── 좌측 브랜드 ────────────────────────────────────────────────────────────────
export const gnbBrand = style({
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  flexShrink: 0,
})

export const gnbLogoCircle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  borderRadius: '50%',
  background: C.logoCircle,
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.35)',
  flexShrink: 0,
  marginRight: 9,
})

export const gnbTitle = style({
  fontFamily: vars.font.family,
  fontWeight: 900,
  fontSize: 16,
  lineHeight: '17.6px',
  letterSpacing: '-0.5px',
  color: C.brandText,
  whiteSpace: 'nowrap',
})

export const gnbBrandChevron = style({
  display: 'inline-flex',
  alignItems: 'center',
  color: C.brandText,
  marginLeft: 5,
})

// ── 우측 액션 그룹 ─────────────────────────────────────────────────────────────
export const gnbActions = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
})

// AI 스파클 hover 애니메이션 — 은은하게 반짝이는 고급 트윙클 (미세한 스케일 + 글로우 숨쉬기)
const sparkleTwinkle = keyframes({
  '0%, 100%': { transform: 'scale(1)', opacity: 0.92 },
  '50%': { transform: 'scale(1.07)', opacity: 1 },
})

// AI Assistant 버튼 (스파클 + 라벨)
export const gnbAiButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  height: 28,
  padding: '0 6px',
  border: 'none',
  borderRadius: 8,
  background: 'transparent',
  cursor: 'pointer',
  marginRight: 20,
  transition: `background ${vars.transition.fast}`,
  selectors: {
    '&:hover': { background: C.iconHoverBg },
  },
})

export const gnbAiLabel = style({
  fontFamily: vars.font.family,
  fontWeight: 700,
  fontSize: 12,
  lineHeight: 'normal',
  letterSpacing: '0.2px',
  color: C.brandText,
  whiteSpace: 'nowrap',
})

// 세로 구분선
export const gnbDivider = style({
  width: 1,
  height: 16,
  background: C.divider,
  flexShrink: 0,
  margin: '0 17px',
})

// 아이콘 버튼 그룹 (다운로드·알림·테마·언어·사용자·홈) — 8px 간격, 36px 피치
export const gnbIconGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

// 공통 아이콘 버튼 (28×28, 16px 아이콘 중앙)
export const gnbIconButton = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  padding: 0,
  border: 'none',
  borderRadius: 8,
  background: 'transparent',
  color: C.icon,
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  selectors: {
    '&:hover': { background: C.iconHoverBg },
  },
})

// 알림 빨간 점 (벨 우상단)
export const gnbNotiDot = style({
  position: 'absolute',
  top: 4,
  right: 5,
  width: 7,
  height: 7,
  borderRadius: '50%',
  background: C.notiDot,
  border: '2px solid #ffffff',
  boxSizing: 'content-box',
  pointerEvents: 'none',
})

// 홈 버튼 (강조 박스)
export const gnbHomeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  padding: 0,
  border: 'none',
  borderRadius: 8,
  background: C.homeBox,
  color: C.homeIcon,
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}`,
  selectors: {
    '&:hover': { background: C.homeBoxHover },
  },
})

// svg 크기 안정화 (flex-shrink 방지)
globalStyle(`${gnbIconButton} svg, ${gnbHomeButton} svg, ${gnbAiButton} svg, ${gnbBrandChevron} svg`, {
  flexShrink: 0,
  display: 'block',
})

// ── AI 스파클 hover 트윙클 ─────────────────────────────────────────────────────
// 버튼 hover 시 스파클이 작아졌다 커지며 반짝인다.
globalStyle(`${gnbAiButton} svg`, {
  transformOrigin: 'center',
})
globalStyle(`${gnbAiButton}:hover svg`, {
  animation: `${sparkleTwinkle} 1800ms ease-in-out infinite`,
  filter: 'drop-shadow(0 0 2px rgba(124, 92, 255, 0.35))',
})
// 모션 최소화 선호 시 애니메이션 비활성화
globalStyle(`${gnbAiButton}:hover svg`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})
