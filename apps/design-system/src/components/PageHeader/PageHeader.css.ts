import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/* ── Root ── */
export const styledPageHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
  background: 'transparent',
  width: '100%',
})

/* ── Breadcrumbs row ── */
export const pageHeaderBreadcrumbs = style({
  display: 'flex',
  alignItems: 'center',
})

/* ── Main row ── */
export const pageHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  minHeight: 28,
})

/* ── Back button ── */
export const pageHeaderBackBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  border: 'none',
  background: 'transparent',
  borderRadius: vars.radius.sm,
  cursor: 'pointer',
  color: vars.color.textSecondary,
  flexShrink: 0,
  transition: `background-color ${vars.transition.fast}, color ${vars.transition.fast}`,
  selectors: {
    '&:hover, &.is-hover': {
      backgroundColor: vars.color.surfaceHover,
      color: vars.color.text,
    },
    '&:focus-visible, &.is-focus': {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: 2,
    },
  },
})

globalStyle(`${pageHeaderBackBtn} svg`, {
  display: 'block',
})

/* ── Title group ── */
export const pageHeaderTitleGroup = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: vars.spacing.sm,
  minWidth: 0,
})

export const pageHeaderTitle = style({
  margin: 0,
  fontSize: 18, // Figma "콘텐츠 타이틀 헤더" — 18px bold
  fontWeight: vars.font.weightBold,
  letterSpacing: '-0.18px',
  color: vars.color.text,
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
})

export const pageHeaderSubtitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightNormal,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
})

/* ── Tags slot ── */
export const pageHeaderTags = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexShrink: 0,
})

/* ── Actions slot ── */
export const pageHeaderActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  marginLeft: 'auto',
  flexShrink: 0,
})

/* ── Divider wrapper ── */
export const pageHeaderDivider = style({
  marginTop: 12,
})

/* ── Breadcrumb button reset ── */
export const breadcrumbBtn = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  fontSize: 'inherit',
  color: 'inherit',
  fontFamily: 'inherit',
})
