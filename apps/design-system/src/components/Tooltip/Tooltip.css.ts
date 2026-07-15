import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/* ── Tooltip Box ── */
export const tooltipBox = style({
  position: 'absolute',
  zIndex: 9999,
  minWidth: 40,
  maxWidth: '100%',
  padding: '8px 12px',
  background: vars.color.text,
  color: vars.color.textInverse,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeXs,
  lineHeight: 1.5,
  opacity: 0,
  pointerEvents: 'none',
  transition: `opacity ${vars.transition.fast}`,
})

globalStyle(`${tooltipBox}.show`, {
  opacity: 1,
  pointerEvents: 'auto',
})

/* ── Arrow ── */
export const tooltipArrow = style({
  position: 'absolute',
  width: 8,
  height: 8,
  background: 'transparent',
})

globalStyle(`${tooltipArrow}::after`, {
  content: "''",
  position: 'absolute',
  width: 8,
  height: 8,
  background: vars.color.text,
  transform: 'rotate(45deg)',
})

globalStyle(`${tooltipArrow}.top`, {
  bottom: -4,
  left: '50%',
  transform: 'translateX(-50%)',
})

globalStyle(`${tooltipArrow}.top::after`, { top: 0, left: 0 })

globalStyle(`${tooltipArrow}.bottom`, {
  top: -4,
  left: '50%',
  transform: 'translateX(-50%)',
})

globalStyle(`${tooltipArrow}.bottom::after`, { top: 0, left: 0 })

globalStyle(`${tooltipArrow}.left`, {
  right: -4,
  top: '50%',
  transform: 'translateY(-50%)',
})

globalStyle(`${tooltipArrow}.left::after`, { top: 0, left: 0 })

globalStyle(`${tooltipArrow}.right`, {
  left: -4,
  top: '50%',
  transform: 'translateY(-50%)',
})

globalStyle(`${tooltipArrow}.right::after`, { top: 0, left: 0 })
