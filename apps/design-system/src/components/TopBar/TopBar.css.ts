import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

const userMenuIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-6px)' },
  to: { opacity: 1, transform: 'none' },
})

const langPopoverIn = keyframes({
  from: { opacity: 0, transform: 'translateX(6px)' },
  to: { opacity: 1, transform: 'none' },
})

export const topBar = style({
  display: 'flex',
  alignItems: 'center',
  height: 86,
  padding: '0 20px',
  gap: 12,
  background: 'transparent',
})

export const topBarBtnWrap = style({
  position: 'relative',
  display: 'inline-flex',
  pointerEvents: 'auto',
})

export const topBarBtn = style({
  width: 40,
  height: 40,
  borderRadius: 30,
  background: vars.color.surface,
  border: 'none',
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.10)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: vars.color.textSecondary,
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  pointerEvents: 'auto',
  selectors: {
    '&:hover, &.is-hover': {
      background: vars.color.surfaceHover,
      color: vars.color.text,
    },
    '&:active, &.is-active': {
      background: vars.color.surfaceHover,
      color: vars.color.primary,
    },
  },
})

globalStyle(`${topBarBtn} svg`, {
  width: 16,
  height: 16,
  fill: 'currentColor',
  flexShrink: 0,
})

export const topBarNotiBadge = style({
  position: 'absolute',
  top: -3,
  left: 26,
  padding: 4,
  minWidth: 18,
  borderRadius: 20,
  background: vars.color.error,
  color: vars.color.textInverse,
  fontSize: 8,
  fontWeight: 500,
  lineHeight: 1,
  textAlign: 'center',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
})

export const topBarUserDropdown = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  zIndex: 200,
  padding: 16,
  background: vars.color.surface,
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.10)',
  borderRadius: 16,
  outline: `1px solid ${vars.color.border}`,
  outlineOffset: -1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: 16,
  width: 225,
  animationName: userMenuIn,
  animationDuration: '180ms',
  animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
})

export const topBarUserProfile = style({
  padding: '12px 16px',
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  transition: `background ${vars.transition.fast}`,
  cursor: 'pointer',
  selectors: {
    '&:hover, &.is-hover': { background: vars.color.surfaceHover },
  },
})

export const topBarUserProfileText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
})

export const topBarUserName = style({
  fontSize: vars.font.sizeSm,
  fontWeight: 700,
  lineHeight: '15px',
  color: vars.color.text,
  letterSpacing: '-0.01em',
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const topBarUserEmail = style({
  fontSize: vars.font.sizeXs,
  fontWeight: 400,
  lineHeight: 1,
  color: vars.color.textMuted,
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const topBarUserAdminBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 8px',
  borderRadius: 30,
  background: `color-mix(in srgb, ${vars.color.primary} 10%, transparent)`,
  color: vars.color.primary,
  fontSize: vars.font.sizeXs,
  fontWeight: 500,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

export const topBarThemeGroup = style({
  alignSelf: 'center',
})

globalStyle(`${topBarThemeGroup} .button-group-item`, {
  width: 56,
  minWidth: 56,
  padding: '8px 0',
  height: 34,
})

export const topBarLangSection = style({
  position: 'relative',
})

export const topBarLangHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 12px',
  borderRadius: 20,
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  lineHeight: 1,
  cursor: 'pointer',
  width: '100%',
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  selectors: {
    '&:hover, &.is-hover': {
      background: vars.color.surfaceHover,
      color: vars.color.primary,
    },
  },
})

export const topBarLangFlag = style({
  fontSize: vars.font.sizeMd,
  lineHeight: 1,
  flexShrink: 0,
})

export const topBarLangLabel = style({
  flex: 1,
  textAlign: 'left',
})

export const topBarLangChevron = style({
  display: 'inline-flex',
  flexShrink: 0,
  color: vars.color.textMuted,
  transition: `transform ${vars.transition.fast}`,
})

export const topBarLangChevronOpen = style({
  transform: 'rotate(180deg)',
})

export const topBarLangPopover = style({
  position: 'absolute',
  top: 0,
  right: 'calc(100% + 24px)',
  zIndex: 201,
  padding: 8,
  background: vars.color.surface,
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.10)',
  borderRadius: 16,
  outline: `1px solid ${vars.color.border}`,
  outlineOffset: -1,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: 150,
  animationName: langPopoverIn,
  animationDuration: '150ms',
  animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
})

export const topBarLangItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '9px 12px',
  borderRadius: 20,
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  lineHeight: 1,
  cursor: 'pointer',
  width: '100%',
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  selectors: {
    '&:hover, &.is-hover': {
      background: vars.color.surfaceHover,
      color: vars.color.primary,
    },
  },
})

export const topBarLangItemActive = style({
  color: vars.color.primary,
  fontWeight: 700,
})

export const topBarLangCheckMark = style({
  marginLeft: 'auto',
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: vars.color.primary,
  flexShrink: 0,
})

export const topBarMenuPopover = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  zIndex: 200,
  padding: 16,
  background: vars.color.surface,
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.10)',
  borderRadius: 20,
  outline: `1px solid ${vars.color.border}`,
  outlineOffset: -1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2,
  animationName: userMenuIn,
  animationDuration: '180ms',
  animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
})

export const topBarMenuPopoverItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 12px',
  borderRadius: 20,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  width: '100%',
  minWidth: 165,
  textAlign: 'left',
  transition: `background ${vars.transition.fast}`,
  selectors: {
    '&:hover, &.is-hover': { background: vars.color.surfaceHover },
  },
})

export const topBarMenuPopoverItemActive = style({
  background: vars.color.surfaceHover,
})

export const topBarMenuSpider = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
})

export const topBarMenuSpiderText = style({
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '-0.01em',
  color: vars.color.text,
  transition: `color ${vars.transition.fast}`,
  selectors: {
    [`.${topBarMenuPopoverItem}:hover &`]: { color: vars.color.primary },
  },
})

export const topBarMenuSuffix = style({
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '0.02em',
  transition: `color ${vars.transition.fast}`,
})

export const topBarMenuSuffixMint = style({
  color: vars.color.primary,
  selectors: {
    [`.${topBarMenuPopoverItem}:hover &`]: { color: vars.color.primary },
  },
})

export const topBarMenuUD = style({
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '-0.01em',
  display: 'inline-flex',
  gap: 2,
})

export const topBarMenuUDRed = style({
  color: vars.color.error,
  transition: `color ${vars.transition.fast}`,
  selectors: {
    [`.${topBarMenuPopoverItem}:hover &`]: { color: vars.color.primary },
  },
})

export const topBarMenuUDBlack = style({
  color: vars.color.text,
  transition: `color ${vars.transition.fast}`,
  selectors: {
    [`.${topBarMenuPopoverItem}:hover &`]: { color: vars.color.primary },
  },
})

export const topBarMenuActiveDot = style({
  marginLeft: 'auto',
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: vars.color.primary,
  flexShrink: 0,
})

export const topBarUserMenuList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

export const topBarUserDropdownItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 12px',
  borderRadius: 20,
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  lineHeight: 1,
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  selectors: {
    '&:hover, &.is-hover': {
      background: vars.color.surfaceHover,
      color: vars.color.primary,
      fontWeight: 700,
    },
  },
})

export const topBarUserDropdownItemDanger = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 12px',
  borderRadius: 20,
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  lineHeight: 1,
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  selectors: {
    '&:hover, &.is-hover': {
      background: vars.color.surfaceHover,
      color: vars.color.error,
      fontWeight: 700,
    },
  },
})

export const topBarBtnIsOpen = style({
  background: `color-mix(in srgb, ${vars.color.primary} 10%, transparent)`,
  color: vars.color.primary,
  selectors: {
    '&:hover, &.is-hover': {
      background: `color-mix(in srgb, ${vars.color.primary} 10%, transparent)`,
      color: vars.color.primary,
    },
    '&:active, &.is-active': {
      background: `color-mix(in srgb, ${vars.color.primary} 10%, transparent)`,
      color: vars.color.primary,
    },
  },
})

export const topBarPopoverHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 16px 10px',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const topBarPopoverTitle = style({
  fontSize: 13,
  fontWeight: 700,
  color: vars.color.text,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
})

export const topBarPopoverCountBadge = style({
  padding: '2px 6px',
  borderRadius: 10,
  background: vars.color.error,
  color: vars.color.textInverse,
  fontSize: 10,
  fontWeight: 700,
  lineHeight: 1.4,
})

export const topBarPopoverEmpty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px 16px',
  gap: 8,
  color: vars.color.textMuted,
  fontSize: vars.font.sizeSm,
})

export const topBarNotiPopover = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  zIndex: 200,
  background: vars.color.surface,
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.10)',
  borderRadius: 16,
  outline: `1px solid ${vars.color.border}`,
  outlineOffset: -1,
  width: 300,
  animationName: userMenuIn,
  animationDuration: '180ms',
  animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
})

export const topBarReadAllBtn = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.primary,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: '2px 4px',
  borderRadius: 4,
  selectors: {
    '&:hover, &.is-hover': { background: vars.color.surfaceHover },
  },
})

export const topBarNotiList = style({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 320,
  overflowY: 'auto',
  padding: '4px 0',
})

export const topBarNotiItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  padding: '12px 16px',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  width: '100%',
  textAlign: 'left',
  transition: `background ${vars.transition.fast}`,
  selectors: {
    '&:hover, &.is-hover': { background: vars.color.surfaceHover },
  },
})

export const topBarNotiDot = style({
  flexShrink: 0,
  marginTop: 4,
  width: 7,
  height: 7,
  borderRadius: '50%',
  background: vars.color.primary,
})

export const topBarNotiDotRead = style({
  background: 'transparent',
})

export const topBarNotiBody = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
})

export const topBarNotiItemTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: 600,
  color: vars.color.text,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const topBarNotiItemTitleRead = style({
  fontWeight: 400,
  color: vars.color.textSecondary,
})

export const topBarNotiItemMsg = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  overflow: 'hidden',
  display: '-webkit-box' as 'flex',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
  lineHeight: 1.5,
})

export const topBarNotiItemTime = style({
  fontSize: 10,
  color: vars.color.textMuted,
  marginTop: 1,
})

export const topBarDlPopover = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  zIndex: 200,
  background: vars.color.surface,
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.10)',
  borderRadius: 16,
  outline: `1px solid ${vars.color.border}`,
  outlineOffset: -1,
  width: 280,
  animationName: userMenuIn,
  animationDuration: '180ms',
  animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
})

export const topBarDlList = style({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 320,
  overflowY: 'auto',
  padding: '4px 0',
})

export const topBarDlItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  padding: '10px 16px',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  width: '100%',
  textAlign: 'left',
  transition: `background ${vars.transition.fast}`,
  selectors: {
    '&:hover, &.is-hover': { background: vars.color.surfaceHover },
  },
})

export const topBarDlIconWrap = style({
  flexShrink: 0,
  width: 32,
  height: 32,
  borderRadius: 8,
  background: vars.color.surfaceHover,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.textSecondary,
})

export const topBarDlInfo = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
})

export const topBarDlName = style({
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  color: vars.color.text,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const topBarDlMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 10,
  color: vars.color.textMuted,
})

export const topBarDlStatusDone = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 3,
  color: vars.color.success,
  fontWeight: 600,
})

export const topBarDlStatusError = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 3,
  color: vars.color.error,
  fontWeight: 600,
})

export const topBarDlStatusProgress = style({
  color: vars.color.primary,
  fontWeight: 600,
})

export const topBarDlProgressWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
})

export const topBarDlProgressTrack = style({
  width: '100%',
  height: 3,
  borderRadius: 2,
  background: vars.color.border,
  overflow: 'hidden',
})

export const topBarDlProgressFill = style({
  height: '100%',
  width: 'var(--dl-progress, 0%)',
  background: vars.color.primary,
  borderRadius: 2,
  transition: `width ${vars.transition.normal}`,
})
