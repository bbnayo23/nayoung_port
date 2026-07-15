import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

export const collapseRoot = style({})

globalStyle(`${collapseRoot}.variant-card`, {
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
})

globalStyle(`${collapseRoot}.variant-row`, {
  borderBottom: `1px solid ${vars.color.border}`,
})

globalStyle(`${collapseRoot}.variant-horizontal`, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
})

export const collapseHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  textAlign: 'left',
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  transition: `background-color ${vars.transition.fast}`,
})

globalStyle(`${collapseRoot}.variant-card ${collapseHeader}`, {
  padding: '12px 16px',
  background: vars.color.surface,
})

globalStyle(`${collapseRoot}.variant-card ${collapseHeader}:hover`, {
  background: vars.color.surfaceHover,
})

globalStyle(`${collapseRoot}.variant-row ${collapseHeader}`, { padding: '10px 8px' })

globalStyle(`${collapseRoot}.variant-row ${collapseHeader}:hover`, {
  background: vars.color.surface,
})

globalStyle(`${collapseRoot}.variant-more ${collapseHeader}`, {
  flexDirection: 'row-reverse',
  justifyContent: 'flex-end',
  gap: 4,
  padding: '8px 0',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
})

globalStyle(`${collapseRoot}.variant-more ${collapseHeader}:hover`, {
  color: vars.color.text,
})

globalStyle(`${collapseRoot}.variant-horizontal ${collapseHeader}`, {
  width: 'auto',
  flexShrink: 0,
  padding: '12px 16px',
  background: vars.color.surface,
  borderRight: `1px solid ${vars.color.border}`,
})

globalStyle(`${collapseRoot}.variant-horizontal ${collapseHeader}:hover`, {
  background: vars.color.surfaceHover,
})

globalStyle(`${collapseHeader}:focus-visible`, {
  outline: `2px solid ${vars.color.primary}`,
  outlineOffset: '-2px',
})

export const collapseChevron = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: vars.color.textSecondary,
  transition: `transform ${vars.transition.fast}`,
  transform: 'rotate(-90deg)',
})

globalStyle(`${collapseChevron}.is-open`, { transform: 'rotate(0deg)' })
globalStyle(`${collapseRoot}.variant-more ${collapseChevron}.is-open`, { transform: 'rotate(-180deg)' })
globalStyle(`${collapseRoot}.variant-horizontal ${collapseChevron}.is-open`, { transform: 'rotate(90deg)' })

export const collapseBody = style({
  display: 'grid',
  gridTemplateRows: '0fr',
  transition: `grid-template-rows ${vars.transition.normal}`,
})

globalStyle(`${collapseBody}.is-open`, { gridTemplateRows: '1fr' })

globalStyle(`${collapseRoot}.variant-horizontal ${collapseBody}`, {
  gridTemplateRows: '1fr',
  gridTemplateColumns: '0fr',
  transition: `grid-template-columns ${vars.transition.normal}`,
})

globalStyle(`${collapseRoot}.variant-horizontal ${collapseBody}.is-open`, { gridTemplateColumns: '1fr' })

export const collapseInner = style({
  overflow: 'hidden',
  fontSize: vars.font.sizeSm,
})

globalStyle(`${collapseRoot}.variant-card ${collapseInner}`, { padding: '0 16px' })
globalStyle(`${collapseRoot}.variant-card ${collapseBody}.is-open ${collapseInner}`, { padding: '12px 16px' })
globalStyle(`${collapseRoot}.variant-row ${collapseBody}.is-open ${collapseInner}`, { padding: '4px 8px 10px 28px' })
globalStyle(`${collapseRoot}.variant-more ${collapseBody}.is-open ${collapseInner}`, { paddingBottom: 8 })
globalStyle(`${collapseRoot}.variant-horizontal ${collapseInner}`, { minWidth: 0, padding: '12px 16px' })
