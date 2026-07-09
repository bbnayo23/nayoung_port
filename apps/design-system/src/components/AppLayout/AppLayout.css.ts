import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

/**
 * AppLayout — 솔루션 공통 애플리케이션 셸 (GNB + LNB + Main).
 * Figma "AW · Layout Shell" 기준: 페이지 배경은 GNB 밴드가 페이드되는 밝은 톤과
 * 이어지는 대각 그라디언트, LNB·Main 은 좌상단 한쪽 라운드 + 은은한 그림자 카드.
 */

// 페이지 전체 배경 — Figma root(156:214). GNB 밴드 하단(#fdfefe)과 자연스럽게 이어진다.
const ROOT_BG =
  'linear-gradient(16.25deg, #eaf1ef 12.4%, #f2f6f5 50%, #f6f8f7 87.6%)'

// ── Root (세로: GNB → Body) ────────────────────────────────────────────────────
export const appLayout = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
  background: `var(--color-app-bg, ${ROOT_BG})`,
  color: `var(--color-text-primary, ${vars.color.text})`,
  fontFamily: vars.font.family,
})

// GNB 슬롯 — 최상단 고정
export const appLayoutGnb = style({
  position: 'relative',
  zIndex: 100,
  flexShrink: 0,
})

// ── Body (가로: LNB → Main) ────────────────────────────────────────────────────
// 배경은 지정하지 않아 루트 그라디언트가 그대로 비쳐 GNB 아래 영역이 이어진다.
export const appLayoutBody = style({
  position: 'relative',
  zIndex: 0,
  display: 'flex',
  flex: 1,
  minHeight: 0,
})

// LNB 슬롯 — Main 위로 그림자가 얹히도록 z-index 상향
globalStyle(`${appLayoutBody} > .lnb`, {
  zIndex: 2,
})

// ── Main — 흰 카드 (좌상단 한쪽 라운드 + 그림자) ─────────────────────────────────
export const appLayoutMain = style({
  position: 'relative',
  zIndex: 1,
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  background: `var(--color-app-main-bg, #ffffff)`,
  borderTopLeftRadius: 16,
  boxShadow: '0 0 3px 0 rgba(22, 30, 52, 0.23)',
})

// Main 스크롤바 — 테마 색
globalStyle(`${appLayoutMain}::-webkit-scrollbar`, { width: 10, height: 10 })
globalStyle(`${appLayoutMain}::-webkit-scrollbar-track`, { background: 'transparent' })
globalStyle(`${appLayoutMain}::-webkit-scrollbar-thumb`, {
  background: vars.color.border,
  borderRadius: vars.radius.full,
  border: '2px solid transparent',
  backgroundClip: 'padding-box',
})
globalStyle(`${appLayoutMain}::-webkit-scrollbar-thumb:hover`, {
  background: vars.color.borderHover,
})
