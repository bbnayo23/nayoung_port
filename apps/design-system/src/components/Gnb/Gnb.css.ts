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

export const gnb = style({
  display: 'flex',
  alignItems: 'center',
  height: 86,
  padding: '0 20px',
  gap: 12,
  background: 'transparent',
})

export const gnbBtnWrap = style({
  position: 'relative',
  display: 'inline-flex',
  pointerEvents: 'auto',
})

export const gnbBtn = style({
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

globalStyle(`${gnbBtn} svg`, {
  width: 16,
  height: 16,
  fill: 'currentColor',
  flexShrink: 0,
})

export const gnbNotiBadge = style({
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

export const gnbUserDropdown = style({
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

export const gnbUserProfile = style({
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

export const gnbUserProfileText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
})

export const gnbUserName = style({
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

export const gnbUserEmail = style({
  fontSize: vars.font.sizeXs,
  fontWeight: 400,
  lineHeight: 1,
  color: vars.color.textMuted,
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const gnbUserAdminBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 8px',
  borderRadius: 30,
  background: vars.color.primarySoft,
  color: vars.color.primary,
  fontSize: vars.font.sizeXs,
  fontWeight: 500,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

export const gnbThemeGroup = style({
  alignSelf: 'center',
})

globalStyle(`${gnbThemeGroup} .button-group-item`, {
  width: 56,
  minWidth: 56,
  padding: '8px 0',
  height: 34,
})

export const gnbLangSection = style({
  position: 'relative',
})

export const gnbLangHeader = style({
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

export const gnbLangFlag = style({
  fontSize: vars.font.sizeMd,
  lineHeight: 1,
  flexShrink: 0,
})

export const gnbLangLabel = style({
  flex: 1,
  textAlign: 'left',
})

export const gnbLangChevron = style({
  display: 'inline-flex',
  flexShrink: 0,
  color: vars.color.textMuted,
  transition: `transform ${vars.transition.fast}`,
})

export const gnbLangChevronOpen = style({
  transform: 'rotate(180deg)',
})

export const gnbLangPopover = style({
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

export const gnbLangItem = style({
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

export const gnbLangItemActive = style({
  color: vars.color.primary,
  fontWeight: 700,
})

export const gnbLangCheckMark = style({
  marginLeft: 'auto',
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: vars.color.primary,
  flexShrink: 0,
})

export const gnbMenuPopover = style({
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

export const gnbMenuPopoverItem = style({
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

export const gnbMenuPopoverItemActive = style({
  background: vars.color.surfaceHover,
})

export const gnbMenuSpider = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
})

export const gnbMenuSpiderText = style({
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '-0.01em',
  color: vars.color.text,
  transition: `color ${vars.transition.fast}`,
  selectors: {
    [`.${gnbMenuPopoverItem}:hover &`]: { color: vars.color.primary },
  },
})

export const gnbMenuSuffix = style({
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '0.02em',
  transition: `color ${vars.transition.fast}`,
})

export const gnbMenuSuffixMint = style({
  color: vars.color.primary,
  selectors: {
    [`.${gnbMenuPopoverItem}:hover &`]: { color: vars.color.primary },
  },
})

export const gnbMenuUD = style({
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '-0.01em',
  display: 'inline-flex',
  gap: 2,
})

export const gnbMenuUDRed = style({
  color: vars.color.error,
  transition: `color ${vars.transition.fast}`,
  selectors: {
    [`.${gnbMenuPopoverItem}:hover &`]: { color: vars.color.primary },
  },
})

export const gnbMenuUDBlack = style({
  color: vars.color.text,
  transition: `color ${vars.transition.fast}`,
  selectors: {
    [`.${gnbMenuPopoverItem}:hover &`]: { color: vars.color.primary },
  },
})

export const gnbMenuActiveDot = style({
  marginLeft: 'auto',
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: vars.color.primary,
  flexShrink: 0,
})

export const gnbUserMenuList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

export const gnbUserDropdownItem = style({
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

export const gnbUserDropdownItemDanger = style({
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

export const gnbBtnIsOpen = style({
  background: vars.color.primarySoft,
  color: vars.color.primary,
  selectors: {
    '&:hover, &.is-hover': {
      background: vars.color.primarySoft,
      color: vars.color.primary,
    },
    '&:active, &.is-active': {
      background: vars.color.primarySoft,
      color: vars.color.primary,
    },
  },
})

export const gnbPopoverHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 16px 10px',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const gnbPopoverTitle = style({
  fontSize: 13,
  fontWeight: 700,
  color: vars.color.text,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
})

export const gnbPopoverCountBadge = style({
  padding: '2px 6px',
  borderRadius: 10,
  background: vars.color.error,
  color: vars.color.textInverse,
  fontSize: 10,
  fontWeight: 700,
  lineHeight: 1.4,
})

export const gnbPopoverEmpty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px 16px',
  gap: 8,
  color: vars.color.textMuted,
  fontSize: vars.font.sizeSm,
})

export const gnbNotiPopover = style({
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

export const gnbReadAllBtn = style({
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

export const gnbNotiList = style({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 320,
  overflowY: 'auto',
  padding: '4px 0',
})

export const gnbNotiItem = style({
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

export const gnbNotiDot = style({
  flexShrink: 0,
  marginTop: 4,
  width: 7,
  height: 7,
  borderRadius: '50%',
  background: vars.color.primary,
})

export const gnbNotiDotRead = style({
  background: 'transparent',
})

export const gnbNotiBody = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
})

export const gnbNotiItemTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: 600,
  color: vars.color.text,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const gnbNotiItemTitleRead = style({
  fontWeight: 400,
  color: vars.color.textSecondary,
})

export const gnbNotiItemMsg = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  overflow: 'hidden',
  display: '-webkit-box' as 'flex',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
  lineHeight: 1.5,
})

export const gnbNotiItemTime = style({
  fontSize: 10,
  color: vars.color.textMuted,
  marginTop: 1,
})

export const gnbDlPopover = style({
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

export const gnbDlList = style({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 320,
  overflowY: 'auto',
  padding: '4px 0',
})

export const gnbDlItem = style({
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

export const gnbDlIconWrap = style({
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

export const gnbDlInfo = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
})

export const gnbDlName = style({
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  color: vars.color.text,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const gnbDlMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 10,
  color: vars.color.textMuted,
})

export const gnbDlStatusDone = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 3,
  color: vars.color.success,
  fontWeight: 600,
})

export const gnbDlStatusError = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 3,
  color: vars.color.error,
  fontWeight: 600,
})

export const gnbDlStatusProgress = style({
  color: vars.color.primary,
  fontWeight: 600,
})

export const gnbDlProgressWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
})

export const gnbDlProgressTrack = style({
  width: '100%',
  height: 3,
  borderRadius: 2,
  background: vars.color.border,
  overflow: 'hidden',
})

export const gnbDlProgressFill = style({
  height: '100%',
  width: 'var(--dl-progress, 0%)',
  background: vars.color.primary,
  borderRadius: 2,
  transition: `width ${vars.transition.normal}`,
})
