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

// 밴드 배경: 하단 은은한 파란 radial glow 3겹 + 상→하 라이트 그라디언트
const BAND_BG = [
  'radial-gradient(1600px 90px at 6% 120%, rgba(40, 120, 235, 0.14), rgba(40, 120, 235, 0) 62%)',
  'radial-gradient(1200px 84px at 104% 122%, rgba(40, 120, 235, 0.09), rgba(40, 120, 235, 0) 58%)',
  'radial-gradient(1600px 128px at 120% 128%, rgba(40, 120, 235, 0.05), rgba(40, 120, 235, 0) 72%)',
  'linear-gradient(180deg, #e9f2f9 0%, #f3f8fc 50%, #fdfefe 100%)',
].join(', ')

// ── 밴드 (전체 폭 40px) ───────────────────────────────────────────────────────
export const gnb = style({
  position: 'relative',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: 40,
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

// AI 스파클 애니메이션 — 큰 별은 회전하며 팝, 작은 반짝이는 깜빡(트윙클)
const sparkleSpin = keyframes({
  '0%': { transform: 'scale(1) rotate(0deg)' },
  '50%': { transform: 'scale(1.15) rotate(12deg)' },
  '100%': { transform: 'scale(1) rotate(0deg)' },
})

const sparkleTwinkle = keyframes({
  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
  '40%': { opacity: 0.2, transform: 'scale(0.5)' },
  '70%': { opacity: 1, transform: 'scale(1.15)' },
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
// 큰 별(첫 path)은 버튼 hover 시 회전하며 반짝이고,
// 작은 반짝이(우상단 십자 2획 + 좌하단 원)는 스태거드 깜빡임으로 반짝인다.
globalStyle(`${gnbAiButton} svg`, {
  transformOrigin: 'center',
})
globalStyle(`${gnbAiButton}:hover svg`, {
  animation: `${sparkleSpin} 900ms ease-in-out infinite`,
  filter: 'drop-shadow(0 0 3px rgba(124, 92, 255, 0.55))',
})
globalStyle(
  `${gnbAiButton}:hover svg > path:nth-child(2), ${gnbAiButton}:hover svg > path:nth-child(3)`,
  {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    animation: `${sparkleTwinkle} 700ms ease-in-out infinite`,
  },
)
globalStyle(`${gnbAiButton}:hover svg > circle`, {
  transformBox: 'fill-box',
  transformOrigin: 'center',
  animation: `${sparkleTwinkle} 700ms ease-in-out 350ms infinite`,
})
// 모션 최소화 선호 시 애니메이션 비활성화
globalStyle(
  `${gnbAiButton}:hover svg, ${gnbAiButton}:hover svg > path, ${gnbAiButton}:hover svg > circle`,
  {
    '@media': {
      '(prefers-reduced-motion: reduce)': { animation: 'none' },
    },
  },
)
