import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const DURATION = '280ms'

// ── Root ────────────────────────────────────────────────────────────────────

export const styledLnb = style({
  width: 240,
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  // 라이트는 폴백(#F9FAFB), 다크는 AppLayout 의 :root.dark 에서 --color-lnb-bg 를 세팅해 전환된다.
  background: 'var(--color-lnb-bg, #F9FAFB)',
  borderTopLeftRadius: 16,
  isolation: 'isolate',
  transition: `width ${DURATION} ${EASE}`,
  overflow: 'visible',
  flexShrink: 0,
})

globalStyle(`${styledLnb}.collapsed`, {
  width: 56,
})

globalStyle(`${styledLnb}.collapsed .lnb-header`, {
  gap: 0,
  paddingLeft: 0,
  justifyContent: 'center',
})

globalStyle(`${styledLnb}.collapsed .lnb-header .header-logo-full`, {
  maxWidth: 0,
  opacity: 0,
  transition: `max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledLnb}.collapsed .lnb-header .header-logo-mini`, {
  maxWidth: 40,
  opacity: 1,
  transition: `max-width ${DURATION} ${EASE}, opacity 200ms ease-in`,
})

globalStyle(`${styledLnb}.collapsed .menu-item-wrapper`, {
  padding: '10px 0',
  justifyContent: 'center',
  gap: 0,
})

globalStyle(`${styledLnb}.collapsed .menu-item-text`, {
  maxWidth: 0,
  opacity: 0,
})

globalStyle(`${styledLnb}.collapsed .menu-item-arrow`, {
  maxWidth: 0,
  opacity: 0,
})

globalStyle(`${styledLnb}.collapsed .menu-item-external`, {
  maxWidth: 0,
  opacity: 0,
})

globalStyle(`${styledLnb}.collapsed .sub-menu-item`, {
  maxHeight: 0,
  opacity: 0,
  pointerEvents: 'none',
})

// ── Header ──────────────────────────────────────────────────────────────────

export const styledLnbHeader = style({
  display: 'flex',
  alignItems: 'center',
  height: 50,
  paddingLeft: 16,
  flexShrink: 0,
  gap: 8,
  overflow: 'visible',
  transition: `padding ${DURATION} ${EASE}, gap ${DURATION} ${EASE}`,
})

globalStyle(`${styledLnbHeader} .header-logo-mini`, {
  display: 'flex',
  alignItems: 'center',
  maxWidth: 0,
  opacity: 0,
  overflow: 'hidden',
  transition: `max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledLnbHeader} .header-logo-mini svg`, {
  width: 28,
  height: 16,
  flexShrink: 0,
})

globalStyle(`${styledLnbHeader} .header-logo-full`, {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: 200,
  opacity: 1,
  transition: `max-width ${DURATION} ${EASE}, opacity 200ms ease-in`,
})

globalStyle(`${styledLnbHeader} .header-logo-full svg`, {
  height: 20,
  width: 'auto',
  flexShrink: 0,
})

globalStyle(`${styledLnbHeader} .header-logo-full img`, {
  height: 20,
  width: 'auto',
  flexShrink: 0,
})

// ── Body ─────────────────────────────────────────────────────────────────────

export const styledLnbBody = style({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '0',
})

globalStyle(`${styledLnbBody}::-webkit-scrollbar`, {
  width: 0,
  height: 0,
})

// ── Item ─────────────────────────────────────────────────────────────────────

export const styledLnbItem = style({
  fontSize: 12,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  position: 'relative',
})

globalStyle(`${styledLnbItem} .menu-item-wrapper`, {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  margin: '1px 8px',
  padding: '8px 8px',
  borderRadius: 6,
  transition: `color 180ms ease-out, background 150ms ease-out, padding ${DURATION} ${EASE}, gap ${DURATION} ${EASE}, justify-content ${DURATION} ${EASE}`,
  color: `var(--color-lnb-item-text, ${vars.color.text})`,
  textDecoration: 'none',
})

// 아이콘 색은 wrapper 의 color(=currentColor)로만 제어한다.
// - XDR 아이콘: fill="currentColor" (면 아이콘) → color 를 따라감
// - lucide 라인 아이콘: stroke="currentColor" · fill="none" → 라인 유지
// fill 을 직접 지정하면 라인 아이콘 내부까지 칠해져 검은 덩어리로 보이므로 지정하지 않는다.
globalStyle(`${styledLnbItem} .menu-item-wrapper svg`, {
  transition: `color ${vars.transition.fast}`,
})

globalStyle(`${styledLnbItem} .menu-item-wrapper:hover`, {
  color: vars.color.primary,
  background: `var(--color-lnb-item-hover-bg, ${vars.color.surfaceHover})`,
})

globalStyle(`${styledLnbItem} .menu-item-wrapper.is-active`, {
  color: `var(--color-lnb-item-active-text, #123E80)`,
  background: `var(--color-lnb-item-active-bg, color-mix(in srgb, #2878EB 13%, #ffffff))`,
  fontWeight: vars.font.weightBold,
})

globalStyle(`${styledLnbItem} .menu-item-icon`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: `width ${DURATION} ${EASE}, height ${DURATION} ${EASE}, background ${DURATION} ${EASE}, border-radius ${DURATION} ${EASE}`,
})

globalStyle(`${styledLnbItem} .menu-item-icon svg`, {
  width: 14,
  height: 14,
})

globalStyle(`${styledLnbItem} .menu-item-text`, {
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 200,
  opacity: 1,
  transition: `max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledLnbItem} .menu-item-arrow`, {
  display: 'flex',
  alignItems: 'center',
  maxWidth: 20,
  overflow: 'hidden',
  opacity: 1,
  transition: `transform 0.25s ${EASE}, max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledLnbItem} .menu-item-arrow svg`, {
  width: 14,
  height: 14,
})

globalStyle(`${styledLnbItem} .menu-item-arrow.expanded`, {
  transform: 'rotate(90deg)',
})

globalStyle(`${styledLnbItem} .menu-item-external`, {
  display: 'flex',
  alignItems: 'center',
  maxWidth: 20,
  overflow: 'hidden',
  opacity: 1,
  transition: `max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledLnbItem} .menu-item-external svg`, {
  width: 14,
  height: 14,
})

// ── Badge ─────────────────────────────────────────────────────────────────────

globalStyle(`${styledLnbItem} .menu-item-badge`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 16,
  height: 16,
  padding: '0 4px',
  borderRadius: vars.radius.md,
  background: vars.color.error,
  color: vars.color.textInverse,
  fontSize: 10,
  fontWeight: 700,
  lineHeight: 1,
  flexShrink: 0,
})

globalStyle(`${styledLnb}.collapsed .menu-item-badge`, {
  maxWidth: 0,
  minWidth: 0,
  overflow: 'hidden',
  padding: 0,
  opacity: 0,
  transition: `max-width ${`0.25s cubic-bezier(0.4, 0, 0.2, 1)`}, opacity ${`0.25s cubic-bezier(0.4, 0, 0.2, 1)`}`,
})

// ── Group label ───────────────────────────────────────────────────────────────

export const styledLnbGroupLabel = style({
  padding: '14px 16px 4px',
  fontSize: vars.font.sizeXs,
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: vars.color.textSecondary,
  userSelect: 'none',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  opacity: 1,
  transition: `opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)`,
})

globalStyle(`${styledLnb}.collapsed ${styledLnbGroupLabel}`, {
  opacity: 0,
  height: 0,
  padding: 0,
})

// ── Sub Menu ─────────────────────────────────────────────────────────────────

export const styledSubMenuItem = style({
  position: 'relative',
  maxHeight: 800,
  overflow: 'hidden',
  opacity: 1,
  transition: `max-height 0.4s ${EASE}`,
})

globalStyle(`${styledSubMenuItem} li .menu-item-wrapper`, {
  color: `var(--color-lnb-submenu-text, ${vars.color.textSecondary})`,
  // 상위 라벨선(마진8+패딩8+아이콘14+gap10 ≈ 40px)에 맞춰 들여쓰기 (기존 44 → 과다 방지)
  paddingLeft: 32,
})

// ── Divider ──────────────────────────────────────────────────────────────────

export const styledDivider = style({
  border: 'none',
  borderTop: `1px solid var(--color-lnb-border, ${vars.color.border})`,
  margin: '8px 16px',
})

// ── Footer ───────────────────────────────────────────────────────────────────

export const styledLnbFooter = style({
  padding: 16,
  flexShrink: 0,
  borderTop: `1px solid var(--color-lnb-border, ${vars.color.border})`,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

// ── Controls (하단 접기/펼치기 · 전체화면) ─────────────────────────────────────
// Figma "AW" — 펼침: 우측 정렬 가로 배치 / 접힘: 세로 스택
export const styledLnbControls = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 4,
  height: 37,
  padding: '0 10px',
  flexShrink: 0,
  borderTop: `1px solid var(--color-lnb-border, ${vars.color.border})`,
  transition: `height ${DURATION} ${EASE}, padding ${DURATION} ${EASE}`,
})

globalStyle(`${styledLnbControls} .lnb-control-btn`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  padding: 0,
  border: 'none',
  borderRadius: 8,
  background: 'transparent',
  color: `var(--color-lnb-item-text, #4b5563)`,
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
})

globalStyle(`${styledLnbControls} .lnb-control-btn:hover`, {
  background: `var(--color-lnb-item-hover-bg, ${vars.color.surfaceHover})`,
  color: `var(--color-lnb-item-active-text, ${vars.color.primary})`,
})

globalStyle(`${styledLnbControls} .lnb-control-btn svg`, {
  width: 16,
  height: 16,
  display: 'block',
  flexShrink: 0,
})

// 접힘 상태 — 컨트롤 버튼 세로 스택 (접기 위 / 전체화면 아래 = Figma 순서)
globalStyle(`${styledLnb}.collapsed .lnb-controls`, {
  flexDirection: 'column-reverse',
  justifyContent: 'center',
  height: 'auto',
  padding: '10px 0',
  gap: 6,
})

// ── XDR 헤더 (로고 슬롯 사용 시 하단 정렬) ──────────────────────────────────────
globalStyle(`[data-solution="xdr"] ${styledLnbHeader}`, {
  height: 60,
  alignItems: 'flex-end',
  paddingBottom: 11,
})
