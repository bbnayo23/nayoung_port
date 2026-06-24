import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

const T = '0.25s cubic-bezier(0.4, 0, 0.2, 1)'

// ── Root ────────────────────────────────────────────────────────────────────

export const exdNav = style({
  width: 240,
  minWidth: 240,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.color.primary,
  transition: `width ${T}, min-width ${T}`,
  position: 'relative',
  overflow: 'visible',
  zIndex: 100,
  flexShrink: 0,
  vars: {
    // 내비게이션 배경은 항상 primary 색상(진한 색)이므로 텍스트·오버레이는
    // 모든 테마에서 동일하게 흰색/반투명 검정 고정값을 사용합니다. (SKILL.md 예외 1)
    '--exd-nav-text': '#fff',
    '--exd-nav-text-dim': '#eee',
    '--exd-nav-child-text': '#dcdcdc',
    '--exd-nav-hover-bg': 'rgba(0,0,0,0.15)',
    '--exd-nav-active-bg': 'rgba(0,0,0,0.22)',
    '--exd-nav-parent-active-bg': 'rgba(0,0,0,0.10)',
    '--exd-nav-indicator': '#fff',
    '--exd-nav-icon-bg': 'rgba(0,0,0,0.12)',
    '--exd-nav-icon-hover-bg': 'rgba(0,0,0,0.20)',
    '--exd-nav-icon-dim': 'rgba(255,255,255,0.65)',
    '--exd-nav-btn-bg': 'rgba(0,0,0,0.10)',
    '--exd-nav-btn-text': 'rgba(255,255,255,0.8)',
    '--exd-nav-scrollbar': 'rgba(255,255,255,0.2)',
  },
  selectors: {
    '&.collapsed': { width: 56, minWidth: 56 },
    '&.hidden': { width: 0, minWidth: 0, overflow: 'hidden' },
  },
})

// ── Header ───────────────────────────────────────────────────────────────────

export const exdNavHeader = style({
  height: 50,
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
})

// Logo icon area (56px, always visible)
export const exdNavLogoIcon = style({
  width: 56,
  minWidth: 56,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  transition: `background ${T}`,
  selectors: {
    '&:hover, &.is-hover': { background: 'var(--exd-nav-hover-bg)' },
  },
})

globalStyle(`${exdNavLogoIcon} svg`, { width: 20, height: 20 })
globalStyle(`${exdNavLogoIcon} svg, ${exdNavLogoIcon} svg *`, {
  fill: 'var(--exd-nav-text)',
  stroke: 'var(--exd-nav-text)',
  color: 'var(--exd-nav-text)',
})
globalStyle(`${exdNavLogoIcon}:hover svg`, { transform: 'scale(1.12)' })

// Logo full (hidden when collapsed)
export const exdNavLogoFull = style({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  overflow: 'hidden',
  opacity: 1,
  transition: `opacity ${T}`,
  whiteSpace: 'nowrap',
})

globalStyle(`${exdNav}.collapsed ${exdNavLogoFull}`, { opacity: 0 })
globalStyle(`${exdNavLogoFull} img`, { height: 20, objectFit: 'contain' })
globalStyle(`[data-theme*="dark"] ${exdNavLogoFull} img`, { filter: 'brightness(0) invert(1)' })

// ── Body ─────────────────────────────────────────────────────────────────────

export const exdNavBody = style({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'visible',
  padding: '4px 0',
  scrollbarWidth: 'thin',
  scrollbarColor: 'var(--exd-nav-scrollbar) transparent',
})

globalStyle(`${exdNav}.collapsed ${exdNavBody}`, { overflowY: 'visible' })
globalStyle(`${exdNavBody}::-webkit-scrollbar`, { width: 4 })
globalStyle(`${exdNavBody}::-webkit-scrollbar-thumb`, {
  backgroundColor: 'var(--exd-nav-scrollbar)',
  borderRadius: vars.radius.sm,
})
globalStyle(`${exdNavBody}::-webkit-scrollbar-track`, { backgroundColor: 'transparent' })

// ── Nav Item (root) ──────────────────────────────────────────────────────────

export const exdNavItem = style({
  position: 'relative',
})

// Root row
export const exdNavRootRow = style({
  height: 40,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  paddingLeft: 12,
  paddingRight: 12,
  cursor: 'pointer',
  color: 'var(--exd-nav-text-dim)',
  fontSize: 13,
  fontWeight: 600,
  position: 'relative',
  transition: `background ${T}, color ${T}, padding-left ${T}`,
  whiteSpace: 'nowrap',
  userSelect: 'none',
})

globalStyle(`${exdNavRootRow}:hover, ${exdNavRootRow}.is-hover`, {
  background: 'var(--exd-nav-hover-bg)',
  color: 'var(--exd-nav-text)',
})

globalStyle(`${exdNavRootRow}.is-active`, {
  background: 'var(--exd-nav-active-bg)',
  color: 'var(--exd-nav-text)',
  fontWeight: 600,
})

globalStyle(`${exdNavRootRow}.is-active::after`, {
  content: '""',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 3,
  background: 'var(--exd-nav-indicator)',
})

globalStyle(`${exdNavRootRow}.is-parent-active`, {
  background: 'var(--exd-nav-parent-active-bg)',
  color: 'var(--exd-nav-text)',
})

globalStyle(`${exdNav}.collapsed ${exdNavRootRow}`, {
  paddingLeft: 10,
  paddingRight: 10,
})

// Icon container
export const exdNavIcon = style({
  width: 20,
  minWidth: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radius.sm,
  background: 'transparent',
  flexShrink: 0,
  transition: `width ${T}, height ${T}, min-width ${T}, background ${T}, border-radius ${T}`,
})

globalStyle(`${exdNavIcon} svg`, { width: 20, height: 20, fill: 'var(--exd-nav-text-dim)', transition: `fill ${T}` })
globalStyle(`${exdNavRootRow}:hover ${exdNavIcon} svg`, { fill: 'var(--exd-nav-text)' })
globalStyle(`${exdNavRootRow}.is-active ${exdNavIcon} svg`, { fill: 'var(--exd-nav-text)' })
globalStyle(`${exdNavRootRow}.is-parent-active ${exdNavIcon} svg`, { fill: 'var(--exd-nav-text)' })

// Collapsed icon: 36x36 with background
globalStyle(`${exdNav}.collapsed ${exdNavIcon}`, {
  width: 36,
  minWidth: 36,
  height: 36,
  borderRadius: vars.radius.sm,
  background: 'var(--exd-nav-icon-bg)',
})

globalStyle(`${exdNav}.collapsed ${exdNavRootRow}:hover ${exdNavIcon}`, {
  background: 'var(--exd-nav-icon-hover-bg)',
})

globalStyle(`${exdNav}.collapsed ${exdNavIcon} svg`, { width: 18, height: 18 })

// Label
export const exdNavLabel = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  opacity: 1,
  transition: `opacity 0.15s ease`,
})

globalStyle(`${exdNav}.collapsed ${exdNavLabel}`, { opacity: 0, pointerEvents: 'none' })

// Chevron arrow
export const exdNavChevron = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  opacity: 1,
  transition: `transform 0.2s ease, opacity 0.15s ease`,
  color: 'var(--exd-nav-icon-dim)',
  selectors: {
    '&.open': { transform: 'rotate(180deg)' },
  },
})

globalStyle(`${exdNavChevron} svg`, { width: 14, height: 14, fill: 'var(--exd-nav-icon-dim)' })
globalStyle(`${exdNavRootRow}:hover ${exdNavChevron} svg`, { fill: 'var(--exd-nav-text)' })
globalStyle(`${exdNav}.collapsed ${exdNavChevron}`, { opacity: 0, pointerEvents: 'none' })

// ── SubList ──────────────────────────────────────────────────────────────────

export const exdNavSubList = style({
  maxHeight: 600,
  overflow: 'hidden',
  transition: `max-height 0.3s ease-out`,
  selectors: {
    '&.closed': { maxHeight: 0 },
  },
})

// Child row
export const exdNavChildRow = style({
  height: 34,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 42,
  paddingRight: 12,
  color: 'var(--exd-nav-child-text)',
  fontSize: 13,
  cursor: 'pointer',
  position: 'relative',
  transition: `background ${T}, color ${T}`,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  userSelect: 'none',
})

globalStyle(`${exdNavChildRow}:hover, ${exdNavChildRow}.is-hover`, {
  background: 'var(--exd-nav-hover-bg)',
  color: 'var(--exd-nav-text)',
})

globalStyle(`${exdNavChildRow}.is-active`, {
  background: 'var(--exd-nav-active-bg)',
  color: 'var(--exd-nav-text)',
  fontWeight: 600,
})

globalStyle(`${exdNavChildRow}.is-active::after`, {
  content: '""',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 3,
  background: 'var(--exd-nav-indicator)',
})

// ── Flyout (collapsed hover) ─────────────────────────────────────────────────

export const exdNavFlyout = style({
  position: 'absolute',
  left: '100%',
  top: 0,
  marginLeft: 4,
  minWidth: 200,
  maxWidth: 280,
  padding: '6px 0',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
  visibility: 'hidden',
  opacity: 0,
  transform: 'translateX(-4px)',
  transition: `visibility ${vars.transition.fast}, opacity ${vars.transition.fast}, transform ${vars.transition.fast}`,
  zIndex: 900,
  pointerEvents: 'none',
  // hover bridge — prevents flyout from closing when mouse crosses the 4px gap
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: -8,
      top: 0,
      width: 8,
      height: '100%',
    },
  },
})

globalStyle(`${exdNavItem}:hover ${exdNavFlyout}`, {
  visibility: 'visible',
  opacity: 1,
  transform: 'translateX(0)',
  pointerEvents: 'auto',
})

globalStyle(`${exdNavFlyout} .flyout-title`, {
  padding: '6px 14px 8px',
  fontSize: vars.font.sizeSm,
  fontWeight: 600,
  color: vars.color.textSecondary,
  borderBottom: `1px solid ${vars.color.border}`,
  marginBottom: 2,
})

globalStyle(`${exdNavFlyout} .flyout-item`, {
  display: 'block',
  padding: '7px 14px',
  fontSize: 13,
  color: vars.color.text,
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}`,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

globalStyle(`${exdNavFlyout} .flyout-item:hover`, {
  background: vars.color.surfaceHover,
})

globalStyle(`${exdNavFlyout} .flyout-item.is-active`, {
  background: vars.color.surfaceHover,
  color: vars.color.primary,
  fontWeight: 600,
})

// ── Bottom Controls ───────────────────────────────────────────────────────────

export const exdNavBottom = style({
  padding: '4px 8px 8px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
  flexShrink: 0,
  transition: `padding ${T}, gap ${T}`,
  selectors: {
    '&.collapsed': {
      padding: '4px 10px 8px',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 2,
    },
  },
})

// Small button (28x28) — collapse/hide
export const exdNavBtn = style({
  width: 28,
  height: 28,
  minWidth: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: vars.radius.sm,
  background: 'var(--exd-nav-btn-bg)',
  color: 'var(--exd-nav-btn-text)',
  cursor: 'pointer',
  flexShrink: 0,
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
})

globalStyle(`${exdNavBtn}:hover, ${exdNavBtn}.is-hover`, {
  background: 'var(--exd-nav-active-bg)',
  color: 'var(--exd-nav-text)',
})
globalStyle(`${exdNavBtn} svg`, { width: 16, height: 16, fill: 'currentColor', flexShrink: 0 })

export const exdNavBtnIconLeft = style({ display: 'flex', transform: 'rotate(90deg)' })
export const exdNavBtnIconRight = style({ display: 'flex', transform: 'rotate(-90deg)' })
export const exdNavBtnIconSm = style({ display: 'flex' })
globalStyle(`${exdNavBtnIconSm} svg`, { width: 12, height: 12 })

// Large button (36x36) — bell/settings
export const exdNavBtnLg = style({
  width: 36,
  height: 36,
  minWidth: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: vars.radius.sm,
  background: 'var(--exd-nav-btn-bg)',
  color: 'var(--exd-nav-btn-text)',
  cursor: 'pointer',
  flexShrink: 0,
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
})

globalStyle(`${exdNavBtnLg}:hover, ${exdNavBtnLg}.is-hover`, {
  background: 'var(--exd-nav-active-bg)',
  color: 'var(--exd-nav-text)',
})
globalStyle(`${exdNavBtnLg} svg`, { width: 16, height: 16, fill: 'currentColor', flexShrink: 0 })

export const exdNavBtnGroup = style({
  display: 'flex',
  gap: 2,
  flexShrink: 0,
})

export const exdNavBtnSpacer = style({ flex: 1, minWidth: 0 })

export const exdNavBtnSmSpacer = style({ height: 8, flexShrink: 0 })

// ── Show Nav Button (when hidden) ─────────────────────────────────────────────

export const exdShowNavBtn = style({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  width: 24,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '0 8px 8px 0',
  backgroundColor: vars.color.primary,
  color: 'var(--exd-nav-text)',
  cursor: 'pointer',
  zIndex: 101,
  boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
  transition: `width ${vars.transition.fast}`,
})

globalStyle(`${exdShowNavBtn}:hover, ${exdShowNavBtn}.is-hover`, { width: 28 })
globalStyle(`${exdShowNavBtn} svg`, { width: 12, height: 12, fill: 'var(--exd-nav-text)' })
