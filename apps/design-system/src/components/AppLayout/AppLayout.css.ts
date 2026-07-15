import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/**
 * AppLayout — 솔루션 공통 애플리케이션 셸 (GNB + LNB + Main).
 * Figma "AW · Layout Shell" 기준: 페이지 배경은 GNB 밴드가 페이드되는 밝은 톤과
 * 이어지는 대각 그라디언트, LNB·Main 은 좌상단 한쪽 라운드 + 은은한 그림자 카드.
 */

// 페이지 전체 배경 (Figma "--grad-chrome") — GNB 밴드가 페이드되는 밝은 대각 그라디언트.
// GNB(56px)가 하단 16px 를 이 배경 위로 겹치며(z-index 20), LNB·Main(z-index 21)의 라운드
// 코너가 GNB 그라디언트를 드러내 GNB→body 배경이 자연스럽게 이어진다.
const ROOT_BG = 'linear-gradient(155deg, #eaf1ef 0%, #f2f6f5 50%, #f6f8f7 100%)'

// 카드 좌상단 라운드 (Figma --c5j-radius)
const CARD_RADIUS = 16

// ── Root (세로: GNB → Body) ────────────────────────────────────────────────────
export const appLayout = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
  background: `var(--color-app-bg, ${ROOT_BG})`,
  backgroundRepeat: 'no-repeat',
  color: `var(--color-text-primary, ${vars.color.text})`,
  fontFamily: vars.font.family,
})

// ── Body (가로: LNB → Main) — GNB 하단 16px 겹침 위로 올라오도록 z-index 상향 ──────
export const appLayoutBody = style({
  position: 'relative',
  zIndex: 21,
  display: 'flex',
  flex: 1,
  minHeight: 0,
  background: "linear-gradient(to right, rgba(40, 120, 235, 0), rgba(40, 120, 235, 0.03))"
})

globalStyle(`${appLayoutBody} > .lnb`, {
  zIndex: 1,
})



// LNB 우측 은은한 경계 그라디언트 (그림자 대체 — 아주 옅게)
globalStyle(`${appLayoutBody} > .lnb::before`, {
  content: '""',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 20,
  background: 'linear-gradient(to right, rgba(40, 120, 235, 0), rgba(40, 120, 235, 0.03))',
  pointerEvents: 'none',
  zIndex: 1,
})

// ── Main 래퍼 — 배경은 LNB 배경색과 동일. Main 좌상단 라운드 코너가 이 색을 드러낸다. ──
const LNB_BG = '#f9fafb'

export const appLayoutMainWrap = style({
  position: 'relative',
  zIndex: 2,
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  background: `var(--color-lnb-bg, ${LNB_BG})`,
})

// 좌상단 — LNB ::before 와 동일한 옅은 그라디언트. Main(흰 카드) 뒤에 깔려 라운드 코너에서
// 드러나며, LNB 우측 ::before 그림자와 이어져 경계를 없앤다.
globalStyle(`${appLayoutMainWrap}::before`, {
  content: '""',
  position: 'absolute',
  top: 0,
  left: 0,
  width: 20,
  height: 20,
  background: 'linear-gradient(135deg, rgba(40, 120, 235, 0.03), rgba(40, 120, 235, 0) 70%)',
  pointerEvents: 'none',
})

// ── Main — 흰 카드 (좌상단 한쪽 라운드) — 래퍼(LNB색) 위에 얹혀 코너가 LNB색을 드러낸다 ──
export const appLayoutMain = style({
  position: 'relative',
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  background: `var(--color-app-main-bg, #ffffff)`,
  borderTopLeftRadius: CARD_RADIUS,
  // 좌상단 코너가 배경 위로 살짝 떠 보이도록 미세한 그림자 (상단/좌측 방향)
  boxShadow: '-2px -1px 8px -4px rgba(22, 30, 52, 0.1)',
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

// ── 다크 테마 오버라이드 ─────────────────────────────────────────────────────────
// 셸(AppLayout·Lnb)이 참조하는 CSS 변수(--color-*)를 :root.dark 에서 다크 토큰으로 세팅한다.
// 라이트(:root)는 각 var 의 라이트 폴백값을 그대로 쓰므로 기존 모습 변화 없음.
// 계층: main(카드)=surface(밝음) / LNB·root=background(어두움) 로 라이트의 위계를 그대로 반영.
globalStyle(':root.dark', {
  vars: {
    '--color-app-bg': vars.color.background,
    '--color-app-main-bg': vars.color.surface,
    '--color-lnb-bg': vars.color.background,
    '--color-text-primary': vars.color.text,
    '--color-lnb-item-active-text': vars.color.primary,
    '--color-lnb-item-active-bg': vars.color.primarySoft,
  },
})
