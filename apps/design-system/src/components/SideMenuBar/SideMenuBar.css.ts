import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const DURATION = '280ms'

// ── Root ────────────────────────────────────────────────────────────────────

export const styledSideMenuBar = style({
  width: 240,
  position: 'relative',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: `var(--color-sidemenu-bg, ${vars.color.background})`,
  transition: `width ${DURATION} ${EASE}`,
  overflow: 'visible',
  flexShrink: 0,
})

globalStyle(`${styledSideMenuBar}.collapsed`, {
  width: 56,
})

globalStyle(`${styledSideMenuBar}.collapsed .side-menu-bar-header`, {
  gap: 0,
  paddingLeft: 0,
  justifyContent: 'center',
})

globalStyle(`${styledSideMenuBar}.collapsed .side-menu-bar-header .header-logo-full`, {
  maxWidth: 0,
  opacity: 0,
  transition: `max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledSideMenuBar}.collapsed .side-menu-bar-header .header-logo-mini`, {
  maxWidth: 40,
  opacity: 1,
  transition: `max-width ${DURATION} ${EASE}, opacity 200ms ease-in`,
})

globalStyle(`${styledSideMenuBar}.collapsed .side-menu-bar-header .header-collapse-btn`, {
  right: -22,
})

globalStyle(`${styledSideMenuBar}.collapsed .menu-item-wrapper`, {
  padding: '10px 0',
  justifyContent: 'center',
  gap: 0,
})

globalStyle(`${styledSideMenuBar}.collapsed .menu-item-text`, {
  maxWidth: 0,
  opacity: 0,
})

globalStyle(`${styledSideMenuBar}.collapsed .menu-item-arrow`, {
  maxWidth: 0,
  opacity: 0,
})

globalStyle(`${styledSideMenuBar}.collapsed .menu-item-external`, {
  maxWidth: 0,
  opacity: 0,
})

globalStyle(`${styledSideMenuBar}.collapsed .sub-menu-item`, {
  maxHeight: 0,
  opacity: 0,
  pointerEvents: 'none',
})

// ── Header ──────────────────────────────────────────────────────────────────

export const styledSideMenuBarHeader = style({
  display: 'flex',
  alignItems: 'center',
  height: 50,
  paddingLeft: 16,
  flexShrink: 0,
  gap: 8,
  overflow: 'visible',
  transition: `padding ${DURATION} ${EASE}, gap ${DURATION} ${EASE}`,
})

globalStyle(`${styledSideMenuBarHeader} .header-logo-mini`, {
  display: 'flex',
  alignItems: 'center',
  maxWidth: 0,
  opacity: 0,
  overflow: 'hidden',
  transition: `max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledSideMenuBarHeader} .header-logo-mini svg`, {
  width: 28,
  height: 16,
  flexShrink: 0,
})

globalStyle(`${styledSideMenuBarHeader} .header-logo-full`, {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: 200,
  opacity: 1,
  transition: `max-width ${DURATION} ${EASE}, opacity 200ms ease-in`,
})

globalStyle(`${styledSideMenuBarHeader} .header-logo-full svg`, {
  height: 20,
  width: 'auto',
  flexShrink: 0,
})

globalStyle(`${styledSideMenuBarHeader} .header-logo-full img`, {
  height: 20,
  width: 'auto',
  flexShrink: 0,
})

globalStyle(`${styledSideMenuBarHeader} .header-collapse-btn`, {
  position: 'absolute',
  top: 11,
  right: -14,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  border: `1px solid var(--color-sidemenu-collapse-border, ${vars.color.border})`,
  borderRadius: '50%',
  background: `var(--color-sidemenu-collapse-bg, ${vars.color.surface})`,
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  color: `var(--color-sidemenu-collapse-text, ${vars.color.text})`,
  transition: `background 0.2s ease, box-shadow 0.2s ease, right ${DURATION} ${EASE}`,
})

globalStyle(`${styledSideMenuBarHeader} .header-collapse-btn:hover`, {
  boxShadow: '0 3px 8px rgba(0, 0, 0, 0.18)',
  background: vars.color.surfaceHover,
})

globalStyle(`${styledSideMenuBarHeader} .header-collapse-btn svg`, {
  width: 14,
  height: 14,
  fill: `var(--color-sidemenu-collapse-text, ${vars.color.text})`,
})

// ── Body ─────────────────────────────────────────────────────────────────────

export const styledSideMenuBarBody = style({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '4px 0 20px',
})

globalStyle(`${styledSideMenuBarBody}::-webkit-scrollbar`, {
  width: 0,
  height: 0,
})

// ── Item ─────────────────────────────────────────────────────────────────────

export const styledSideMenuBarItem = style({
  fontSize: vars.font.sizeMd,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  position: 'relative',
})

globalStyle(`${styledSideMenuBarItem} .menu-item-wrapper`, {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 16px',
  transition: `color 180ms ease-out, background 150ms ease-out, border-left-color 180ms ease-out, padding ${DURATION} ${EASE}, gap ${DURATION} ${EASE}, justify-content ${DURATION} ${EASE}`,
  color: `var(--color-sidemenu-item-text, ${vars.color.text})`,
  borderLeft: '3px solid transparent',
  textDecoration: 'none',
})

globalStyle(`${styledSideMenuBarItem} .menu-item-wrapper svg`, {
  fill: `var(--color-sidemenu-item-text, ${vars.color.text})`,
  transition: `fill ${vars.transition.fast}`,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-wrapper:hover`, {
  color: vars.color.primary,
  borderLeftColor: vars.color.primary,
  background: `var(--color-sidemenu-item-hover-bg, ${vars.color.surfaceHover})`,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-wrapper:hover svg`, {
  fill: vars.color.primary,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-wrapper.is-active`, {
  color: `var(--color-sidemenu-item-active-text, ${vars.color.primary})`,
  borderLeftColor: `var(--color-sidemenu-item-active-border, ${vars.color.primary})`,
  fontWeight: vars.font.weightBold,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-wrapper.is-active svg`, {
  fill: `var(--color-sidemenu-item-active-text, ${vars.color.primary})`,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-icon`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: `width ${DURATION} ${EASE}, height ${DURATION} ${EASE}, background ${DURATION} ${EASE}, border-radius ${DURATION} ${EASE}`,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-icon svg`, {
  width: 18,
  height: 18,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-text`, {
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 200,
  opacity: 1,
  transition: `max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-arrow`, {
  display: 'flex',
  alignItems: 'center',
  maxWidth: 20,
  overflow: 'hidden',
  opacity: 1,
  transition: `transform 0.25s ${EASE}, max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-arrow svg`, {
  width: 14,
  height: 14,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-arrow.expanded`, {
  transform: 'rotate(90deg)',
})

globalStyle(`${styledSideMenuBarItem} .menu-item-external`, {
  display: 'flex',
  alignItems: 'center',
  maxWidth: 20,
  overflow: 'hidden',
  opacity: 1,
  transition: `max-width ${DURATION} ${EASE}, opacity 180ms ease-out`,
})

globalStyle(`${styledSideMenuBarItem} .menu-item-external svg`, {
  width: 14,
  height: 14,
})

// ── Badge ─────────────────────────────────────────────────────────────────────

globalStyle(`${styledSideMenuBarItem} .menu-item-badge`, {
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

globalStyle(`${styledSideMenuBar}.collapsed .menu-item-badge`, {
  maxWidth: 0,
  minWidth: 0,
  overflow: 'hidden',
  padding: 0,
  opacity: 0,
  transition: `max-width ${`0.25s cubic-bezier(0.4, 0, 0.2, 1)`}, opacity ${`0.25s cubic-bezier(0.4, 0, 0.2, 1)`}`,
})

// ── Group label ───────────────────────────────────────────────────────────────

export const styledSideMenuBarGroupLabel = style({
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

globalStyle(`${styledSideMenuBar}.collapsed ${styledSideMenuBarGroupLabel}`, {
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
  color: `var(--color-sidemenu-submenu-text, ${vars.color.textSecondary})`,
  paddingLeft: 44,
})

globalStyle(`${styledSubMenuItem} li .menu-item-wrapper svg`, {
  fill: `var(--color-sidemenu-submenu-text, ${vars.color.textSecondary})`,
})

// ── Divider ──────────────────────────────────────────────────────────────────

export const styledDivider = style({
  border: 'none',
  borderTop: `1px solid var(--color-sidemenu-border, ${vars.color.border})`,
  margin: '8px 16px',
})

// ── Footer ───────────────────────────────────────────────────────────────────

export const styledSideMenuBarFooter = style({
  padding: 16,
  flexShrink: 0,
  borderTop: `1px solid var(--color-sidemenu-border, ${vars.color.border})`,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

// ────────────────────────────────────────────────────────────────────────────
// EXD 테마 구조 오버라이드 (컬러는 SideMenuBar.tokens.ts + theme-tokens.ts 로 처리)
// ────────────────────────────────────────────────────────────────────────────

// 헤더 로고 이미지 높이
globalStyle(`[data-solution="exd"] ${styledSideMenuBarHeader} .header-logo-full img`, {
  height: 24,
})

globalStyle(`[data-solution="exd"] ${styledSideMenuBarHeader} .header-logo-mini img`, {
  height: 24,
})

// 접힘 버튼 — hover 배경 (나머지는 --color-sidemenu-collapse-* 토큰 처리)
globalStyle(`[data-solution="exd"] ${styledSideMenuBarHeader} .header-collapse-btn:hover`, {
  background: 'rgba(0,0,0,0.25)',
  boxShadow: 'none',
})

// depth 1 (root) 메뉴 아이템 — 패딩 (컬러는 토큰 처리)
globalStyle(`[data-solution="exd"] ${styledSideMenuBarItem} .menu-item-wrapper`, {
  padding: '10px 12px',
  borderLeft: '3px solid transparent',
})

// depth 2+ (자식) 메뉴 아이템 — 패딩 (컬러는 토큰 처리)
globalStyle(`[data-solution="exd"] ${styledSubMenuItem} li .menu-item-wrapper`, {
  padding: '7px 12px 7px 42px',
})

// 아이콘 크기 — 20px
globalStyle(`[data-solution="exd"] ${styledSideMenuBarItem} .menu-item-icon svg`, {
  width: 20,
  height: 20,
})

// 접힌 상태 아이콘 컨테이너 — 36×36
globalStyle(`[data-solution="exd"] ${styledSideMenuBar}.collapsed ${styledSideMenuBarItem} .menu-item-icon`, {
  width: 36,
  height: 36,
  borderRadius: vars.radius.sm,
  backgroundColor: 'rgba(0,0,0,0.12)',
})

globalStyle(`[data-solution="exd"] ${styledSideMenuBar}.collapsed ${styledSideMenuBarItem} .menu-item-wrapper`, {
  padding: '10px',
})

// Hover — 텍스트/테두리 색 (배경은 --color-sidemenu-item-hover-bg 토큰 처리)
globalStyle(`[data-solution="exd"] ${styledSideMenuBarItem} .menu-item-wrapper:hover`, {
  color: vars.color.textInverse,
  borderLeftColor: vars.color.textInverse,
})

globalStyle(`[data-solution="exd"] ${styledSideMenuBarItem} .menu-item-wrapper:hover svg`, {
  fill: vars.color.textInverse,
})

// Active — 배경 (색상/테두리는 --color-sidemenu-item-active-* 토큰 처리)
globalStyle(`[data-solution="exd"] ${styledSideMenuBarItem} .menu-item-wrapper.is-active`, {
  background: 'rgba(0,0,0,0.22)',
})

// 푸터 — 텍스트 색 (테두리는 --color-sidemenu-border 토큰 처리)
globalStyle(`[data-solution="exd"] ${styledSideMenuBarFooter}`, {
  color: 'rgba(255,255,255,0.7)',
})

// ── XDR 헤더 로고 위치 ────────────────────────────────────────────────────────
globalStyle(`[data-solution="xdr"] ${styledSideMenuBarHeader}`, {
  height: 60,
  alignItems: 'flex-end',
  paddingBottom: 11,
})

globalStyle(`[data-solution="xdr"] ${styledSideMenuBarHeader} .header-collapse-btn`, {
  top: 24,
})

globalStyle(`[data-solution="xdr"] ${styledSideMenuBar}.collapsed .header-collapse-btn`, {
  right: -28,
})

// 스크롤바 — EXD 브랜드 배경 위 반투명 흰색
globalStyle(`[data-solution="exd"] ${styledSideMenuBarBody}::-webkit-scrollbar`, {
  width: 4,
  height: 4,
})

globalStyle(`[data-solution="exd"] ${styledSideMenuBarBody}::-webkit-scrollbar-thumb`, {
  backgroundColor: 'rgba(255,255,255,0.25)',
  borderRadius: vars.radius.sm,
})

globalStyle(`[data-solution="exd"] ${styledSideMenuBarBody}::-webkit-scrollbar-track`, {
  backgroundColor: 'transparent',
})
