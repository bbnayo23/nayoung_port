import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

export const breadcrumbsNav = style({
  display: 'inline-flex',
  width: '100%',
})

export const breadcrumbsWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 0,
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  listStyle: 'none',
  padding: 0,
  margin: 0,
})

globalStyle(`${breadcrumbsWrapper} .breadcrumbs-item`, {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
})

globalStyle(`${breadcrumbsWrapper} .breadcrumbs-separator`, {
  margin: '0 4px',
  color: vars.color.textSecondary,
  userSelect: 'none',
  fontSize: vars.font.sizeSm,
})

globalStyle(`${breadcrumbsWrapper} a`, {
  color: vars.color.primary,
  textDecoration: 'none',
  borderRadius: 2,
})

globalStyle(`${breadcrumbsWrapper} a:hover`, {
  textDecoration: 'underline',
})

globalStyle(`${breadcrumbsWrapper} a:focus-visible`, {
  outline: `2px solid ${vars.color.primary}`,
  outlineOffset: 2,
})

globalStyle(`${breadcrumbsWrapper} li[aria-current="page"]`, {
  color: vars.color.textSecondary,
  pointerEvents: 'none',
})

globalStyle(`${breadcrumbsWrapper} li[aria-current="page"] a`, {
  color: vars.color.textSecondary,
  textDecoration: 'none',
})

export const breadcrumbsEllipsis = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 24,
  height: 20,
  padding: '0 4px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
  cursor: 'pointer',
  lineHeight: 1,
  transition: `background-color ${vars.transition.fast}, color ${vars.transition.fast}`,
})

globalStyle(`${breadcrumbsEllipsis}:hover`, {
  background: vars.color.surfaceHover,
  color: vars.color.text,
})

globalStyle(`${breadcrumbsEllipsis}:focus-visible`, {
  outline: `2px solid ${vars.color.primary}`,
  outlineOffset: 2,
})
