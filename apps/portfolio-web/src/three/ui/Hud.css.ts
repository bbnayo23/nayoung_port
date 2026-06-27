import { style, keyframes } from '@vanilla-extract/css'

const FONT = "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const MONO = "'SF Mono', ui-monospace, SFMono-Regular, Menlo, 'Fira Code', monospace"

export const hudRoot = style({
  position: 'absolute',
  inset: 0,
  zIndex: 20,
  pointerEvents: 'none',
  fontFamily: FONT,
  color: '#cdd3f0',
})

/* ---- 코드 디멘션 글리치/스캔라인 오버레이 (저사양도 적용) ---- */
const flicker = keyframes({
  '0%,100%': { opacity: 0.5 },
  '48%': { opacity: 0.42 },
  '50%': { opacity: 0.7 },
  '52%': { opacity: 0.4 },
  '70%': { opacity: 0.6 },
})

export const scanlines = style({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  pointerEvents: 'none',
  mixBlendMode: 'overlay',
  backgroundImage:
    'repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0.16) 1px, transparent 1px, transparent 3px)',
  animation: `${flicker} 4.5s steps(1, end) infinite`,
})

export const vfxTint = style({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  pointerEvents: 'none',
  background:
    'radial-gradient(circle at 50% 45%, transparent 55%, rgba(7,11,20,0.55) 100%)',
})

/* ---- top bar ---- */
export const topBar = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 26px',
})

export const brandName = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '0.01em',
  color: '#dfe4ff',
})

export const brandMark = style({
  display: 'grid',
  placeItems: 'center',
  width: '30px',
  height: '30px',
  borderRadius: '9px',
  background: 'linear-gradient(135deg, #82aaff, #c792ea)',
  color: '#0a0e1a',
  fontWeight: 800,
  fontSize: '14px',
})

export const counter = style({
  marginLeft: '8px',
  padding: '4px 11px',
  borderRadius: '99px',
  background: 'rgba(130,170,255,0.12)',
  border: '1px solid rgba(130,170,255,0.3)',
  fontFamily: MONO,
  fontSize: '11.5px',
  color: '#9fb4ff',
})

export const counterNum = style({
  color: '#c3e88d',
  fontWeight: 700,
})

export const topRight = style({ display: 'flex', gap: '8px' })

// 텍스트 버전 버튼 + 보조 캡션을 세로로 묶어 우측 정렬
export const textVersionWrap = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '6px',
})

// 진입 시 주의를 끄는 펄스 링 (몇 번만 돌고 멈춤)
const attnPulse = keyframes({
  '0%': { boxShadow: '0 0 0 0 rgba(130,170,255,0.55), 0 6px 20px rgba(0,0,0,0.35)' },
  '70%': { boxShadow: '0 0 0 13px rgba(130,170,255,0), 0 6px 20px rgba(0,0,0,0.35)' },
  '100%': { boxShadow: '0 0 0 0 rgba(130,170,255,0), 0 6px 20px rgba(0,0,0,0.35)' },
})

export const textLink = style({
  pointerEvents: 'auto',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  border: '1px solid rgba(130,170,255,0.6)',
  background: 'rgba(130,170,255,0.18)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  color: '#eaf0ff',
  fontFamily: FONT,
  fontSize: '13px',
  fontWeight: 700,
  padding: '9px 15px',
  borderRadius: '99px',
  boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
  // 0.6s 뒤 4회 펄스 후 정지
  animation: `${attnPulse} 1.8s ease-out 0.6s 4`,
  transition: 'background 0.2s ease, transform 0.2s ease',
  ':hover': { background: 'rgba(130,170,255,0.32)', transform: 'translateY(-1px)' },
  ':focus-visible': { outline: '3px solid #82aaff', outlineOffset: '2px' },
  '@media': {
    'screen and (prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})

export const textLinkIcon = style({
  width: '15px',
  height: '15px',
  flexShrink: 0,
})

// 버튼 아래 보조 캡션 (초기 상태에서만 노출)
export const textHint = style({
  fontSize: '11px',
  fontWeight: 500,
  color: '#aab2da',
  fontFamily: FONT,
  letterSpacing: '0.01em',
  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
  pointerEvents: 'none',
})

/* ---- bottom legend (조작 안내) ---- */
const legendIn = keyframes({
  from: { opacity: 0, transform: 'translate(-50%, 10px)' },
  to: { opacity: 1, transform: 'translate(-50%, 0)' },
})

// 항목을 키캡+라벨로 분리해 한눈에 스캔되는 범례. 좁은 화면에선 줄바꿈.
export const hint = style({
  position: 'absolute',
  bottom: '28px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '9px 14px',
  maxWidth: 'min(92vw, 780px)',
  padding: '12px 18px',
  borderRadius: '16px',
  background: 'rgba(12,18,36,0.74)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(130,170,255,0.22)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
  pointerEvents: 'none',
  animation: `${legendIn} 0.4s ease both`,
  '@media': {
    'screen and (prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})

export const legendItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  whiteSpace: 'nowrap',
})

// 키보드 키캡
export const kbd = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '22px',
  height: '22px',
  padding: '0 7px',
  borderRadius: '6px',
  border: '1px solid rgba(160,175,230,0.4)',
  borderBottomWidth: '2px',
  background: 'rgba(40,52,90,0.65)',
  fontFamily: MONO,
  fontSize: '11px',
  fontWeight: 700,
  lineHeight: 1,
  color: '#e3e8ff',
})

export const kbdSep = style({
  color: '#6b74a0',
  fontSize: '11px',
})

export const legendLabel = style({
  fontSize: '12.5px',
  fontWeight: 500,
  color: '#b3bbe0',
})

export const wheelIcon = style({
  width: '16px',
  height: '16px',
  color: '#9fb4ff',
  flexShrink: 0,
})

// 줄바꿈 시 항목 그룹을 구분하는 얇은 세로선 (넓은 화면에서만)
export const legendDivider = style({
  width: '1px',
  height: '16px',
  background: 'rgba(160,175,230,0.22)',
  '@media': {
    'screen and (max-width: 640px)': { display: 'none' },
  },
})

/* ---- 락온 칩 (focus, 진입 전) — 하단 중앙, 최소 정보 ---- */
const chipRise = keyframes({
  from: { opacity: 0, transform: 'translate(-50%, 10px)' },
  to: { opacity: 1, transform: 'translate(-50%, 0)' },
})

export const lockChip = style({
  position: 'absolute',
  bottom: '32px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '11px 12px 11px 20px',
  borderRadius: '16px',
  background: 'rgba(12,18,36,0.74)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,111,156,0.4)',
  boxShadow: '0 12px 34px rgba(0,0,0,0.5)',
  pointerEvents: 'auto',
  maxWidth: 'calc(100vw - 32px)',
  animation: `${chipRise} 0.3s ease both`,
})

export const lockText = style({ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 })

export const lockName = style({
  fontSize: '15px',
  fontWeight: 700,
  letterSpacing: '-0.01em',
  color: '#eef1ff',
  whiteSpace: 'nowrap',
})

export const lockSub = style({
  fontSize: '11.5px',
  fontFamily: MONO,
  color: '#ff9db5',
  whiteSpace: 'nowrap',
})

export const lockBtn = style({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '9px 16px',
  borderRadius: '11px',
  border: 'none',
  background: 'linear-gradient(135deg, #ff6f9c, #c792ea)',
  color: '#0a0e1a',
  fontFamily: FONT,
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'transform 0.18s ease, filter 0.18s ease',
  ':hover': { filter: 'brightness(1.08)', transform: 'translateY(-1px)' },
  ':focus-visible': { outline: '3px solid #82aaff', outlineOffset: '2px' },
})

/* ---- 진입 상세 (entered) — 하단 도크: 3D 화면을 가리지 않게 ---- */
const dockUp = keyframes({
  from: { opacity: 0, transform: 'translateY(28px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const detailDock = style({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  padding: '96px 28px 28px', // 위쪽 큰 패딩 = 그라데이션 페이드 영역(3D 가 비침)
  background:
    'linear-gradient(to top, rgba(6,9,18,0.95) 0%, rgba(6,9,18,0.78) 42%, rgba(6,9,18,0) 100%)',
  pointerEvents: 'none', // 투명 영역 클릭은 3D 로 통과
  animation: `${dockUp} 0.45s cubic-bezier(0.22,1,0.36,1) both`,
})

export const detailInner = style({
  pointerEvents: 'auto',
  width: 'min(940px, 100%)',
  display: 'flex',
  gap: '30px',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  '@media': {
    'screen and (max-width: 720px)': { flexDirection: 'column', alignItems: 'stretch', gap: '16px' },
  },
})

export const detailMain = style({ flex: 1, minWidth: 0 })

export const detailSide = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '230px',
  flexShrink: 0,
  '@media': { 'screen and (max-width: 720px)': { width: 'auto' } },
})

export const dockDesc = style({
  margin: '12px 0 0',
  fontSize: '14px',
  lineHeight: 1.7,
  color: '#aab2da',
  maxWidth: '620px',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

export const panelTag = style({
  display: 'block',
  fontSize: '11.5px',
  fontWeight: 500,
  color: '#82aaff',
  fontFamily: MONO,
  wordBreak: 'break-all',
})

export const panelConcept = style({
  display: 'block',
  marginTop: '10px',
  fontSize: '12.5px',
  color: '#8b93bd',
})

export const panelName = style({
  margin: '4px 0 0',
  fontSize: '32px',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  color: '#eef1ff',
})

export const panelLine = style({
  margin: '6px 0 0',
  fontSize: '13.5px',
  fontWeight: 600,
  color: '#aab2d8',
})

export const tagRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '7px',
  marginTop: '18px',
})

export const tag = style({
  fontFamily: MONO,
  fontSize: '11px',
  fontWeight: 500,
  padding: '4px 10px',
  borderRadius: '99px',
  background: 'rgba(199,146,234,0.14)',
  color: '#d3b3f0',
})

export const openBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '12px 18px',
  borderRadius: '12px',
  border: 'none',
  background: 'linear-gradient(135deg, #82aaff, #6f8eff)',
  color: '#08101f',
  fontFamily: FONT,
  fontSize: '14px',
  fontWeight: 700,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, filter 0.2s ease',
  ':hover': { filter: 'brightness(1.1)', transform: 'translateY(-2px)' },
  ':focus-visible': { outline: '3px solid #c792ea', outlineOffset: '2px' },
})

export const ghostBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '11px 18px',
  borderRadius: '12px',
  border: '1px solid rgba(160,175,230,0.28)',
  background: 'rgba(28,36,64,0.5)',
  color: '#cdd3f0',
  fontFamily: FONT,
  fontSize: '13.5px',
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  ':hover': { background: 'rgba(44,56,96,0.8)' },
  ':focus-visible': { outline: '3px solid #82aaff', outlineOffset: '2px' },
})
