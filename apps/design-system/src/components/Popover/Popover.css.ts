import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

/* ── Root ── */
export const popoverRoot = style({
  display: 'inline-block',
  position: 'relative',
})

/* ── Trigger ── */
export const popoverTrigger = style({
  display: 'inline-block',
  cursor: 'pointer',
})

globalStyle(`${popoverTrigger}.is-disabled`, {
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
})

/* ── Content ── */
export const popoverContent = style({
  position: 'relative',
  background: vars.color.surface,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.md,
  zIndex: 9999,
  maxWidth: 300,
  minWidth: 120,
  wordBreak: 'break-word',
  color: vars.color.text,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.5,
  padding: '12px 16px',
})

globalStyle(`${popoverContent}.has-close-button`, {
  paddingRight: 36,
})

/* ── Close Button ── */
export const popoverCloseButton = style({
  position: 'absolute',
  top: 8,
  right: 8,
})

/* ── Title ── */
export const popoverTitle = style({
  fontWeight: vars.font.weightBold,
  fontSize: vars.font.sizeMd,
  marginBottom: vars.spacing.sm,
  color: vars.color.text,
  lineHeight: 1.4,
})

globalStyle(`${popoverTitle}:empty`, {
  display: 'none',
})

/* ── Body ── */
export const popoverBody = style({
  fontSize: vars.font.sizeSm,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
})

/* ── Arrow ── */
export const popoverArrow = style({
  width: 10,
  height: 10,
  position: 'absolute',
})

globalStyle(`${popoverArrow}::before`, {
  content: "''",
  position: 'absolute',
  width: 10,
  height: 10,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  transform: 'rotate(45deg)',
})

globalStyle(`${popoverArrow}.top`, {
  bottom: -5,
})

globalStyle(`${popoverArrow}.top::before`, {
  borderTop: 'none',
  borderLeft: 'none',
})

globalStyle(`${popoverArrow}.bottom`, {
  top: -5,
})

globalStyle(`${popoverArrow}.bottom::before`, {
  borderBottom: 'none',
  borderRight: 'none',
})

globalStyle(`${popoverArrow}.left`, {
  right: -5,
})

globalStyle(`${popoverArrow}.left::before`, {
  borderLeft: 'none',
  borderBottom: 'none',
})

globalStyle(`${popoverArrow}.right`, {
  left: -5,
})

globalStyle(`${popoverArrow}.right::before`, {
  borderRight: 'none',
  borderTop: 'none',
})
