import { style, globalStyle, keyframes, createVar } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

export const toastDurationVar = createVar()

const toastProgress = keyframes({
  from: { transform: 'scaleX(1)' },
  to: { transform: 'scaleX(0)' },
})

const slideInRight = keyframes({
  from: { opacity: 0, transform: 'translateX(100%)' },
  to: { opacity: 1, transform: 'translateX(0)' },
})
const slideInLeft = keyframes({
  from: { opacity: 0, transform: 'translateX(-100%)' },
  to: { opacity: 1, transform: 'translateX(0)' },
})
const slideInDown = keyframes({
  from: { opacity: 0, transform: 'translateY(-100%)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})
const slideInUp = keyframes({
  from: { opacity: 0, transform: 'translateY(100%)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})
const slideOutRight = keyframes({
  from: { opacity: 1, transform: 'translateX(0)' },
  to: { opacity: 0, transform: 'translateX(100%)' },
})
const slideOutLeft = keyframes({
  from: { opacity: 1, transform: 'translateX(0)' },
  to: { opacity: 0, transform: 'translateX(-100%)' },
})
const slideOutUp = keyframes({
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(-100%)' },
})
const slideOutDown = keyframes({
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(100%)' },
})

export const toastWrapper = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  padding: '12px 20px',
  borderRadius: vars.radius.md,
  boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
  minWidth: 320,
  maxWidth: 500,
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: `var(--color-toast-bg, ${vars.color.surface})`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
})

/* ── Content ── */
globalStyle(`${toastWrapper} .toast-content`, { flex: 1, minWidth: 0 })

globalStyle(`${toastWrapper} .toast-content .toast-title`, {
  fontWeight: 500,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.2,
  marginBottom: 6,
  wordBreak: 'break-word',
  color: `var(--color-toast-title, ${vars.color.text})`,
})

globalStyle(`${toastWrapper} .toast-content .toast-message`, {
  color: `var(--color-toast-message, ${vars.color.textSecondary})`,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.5,
  wordBreak: 'break-word',
})

globalStyle(`${toastWrapper} .toast-action`, { position: 'absolute', top: 10, right: 45 })

/* ── Close ── */
globalStyle(`${toastWrapper} .toast-close`, {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 18,
  height: 18,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  borderRadius: vars.radius.sm,
  color: 'currentColor',
  opacity: 0.7,
  transition: `all ${vars.transition.fast}`,
  marginLeft: 'auto',
})

globalStyle(`${toastWrapper} .toast-close:hover`, {
  opacity: 1,
  backgroundColor: vars.color.surfaceHover,
  transform: 'scale(1.1)',
})

globalStyle(`${toastWrapper} .toast-close:active`, { transform: 'scale(0.95)' })

globalStyle(`${toastWrapper} .toast-close svg`, {
  fill: vars.color.textSecondary,
})

/* ── Variant icons ── */
globalStyle(`${toastWrapper}.toast-success .toast-icon svg, ${toastWrapper}.toast-success .toast-icon svg path`, {
  fill: vars.color.success,
})
globalStyle(`${toastWrapper}.toast-error .toast-icon svg, ${toastWrapper}.toast-error .toast-icon svg path`, {
  fill: vars.color.error,
})
globalStyle(`${toastWrapper}.toast-warning .toast-icon svg, ${toastWrapper}.toast-warning .toast-icon svg path`, {
  fill: vars.color.warning,
})
globalStyle(`${toastWrapper}.toast-info .toast-icon svg, ${toastWrapper}.toast-info .toast-icon svg path`, {
  fill: vars.color.info,
})

/* ── Position animations ── */
globalStyle(`${toastWrapper}.toast-top-right, ${toastWrapper}.toast-bottom-right`, {
  animation: `${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
})
globalStyle(`${toastWrapper}.toast-top-right.is-closing, ${toastWrapper}.toast-bottom-right.is-closing`, {
  animation: `${slideOutRight} 0.3s ease forwards`,
})

globalStyle(`${toastWrapper}.toast-top-left, ${toastWrapper}.toast-bottom-left`, {
  animation: `${slideInLeft} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
})
globalStyle(`${toastWrapper}.toast-top-left.is-closing, ${toastWrapper}.toast-bottom-left.is-closing`, {
  animation: `${slideOutLeft} 0.3s ease forwards`,
})

globalStyle(`${toastWrapper}.toast-top-center`, {
  animation: `${slideInDown} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
})
globalStyle(`${toastWrapper}.toast-top-center.is-closing`, {
  animation: `${slideOutUp} 0.3s ease forwards`,
})

globalStyle(`${toastWrapper}.toast-bottom-center`, {
  animation: `${slideInUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
})
globalStyle(`${toastWrapper}.toast-bottom-center.is-closing`, {
  animation: `${slideOutDown} 0.3s ease forwards`,
})

/* ── Auto-dismiss progress bar ── */
export const toastProgressBar = style({
  position: 'absolute',
  left: 0,
  bottom: 0,
  height: 2,
  width: '100%',
  transformOrigin: 'left',
  animation: `${toastProgress} ${toastDurationVar} linear forwards`,
})

globalStyle(`${toastWrapper}.toast-success ${toastProgressBar}`, { background: vars.color.success })
globalStyle(`${toastWrapper}.toast-error   ${toastProgressBar}`, { background: vars.color.error })
globalStyle(`${toastWrapper}.toast-warning ${toastProgressBar}`, { background: vars.color.warning })
globalStyle(`${toastWrapper}.toast-info    ${toastProgressBar}`, { background: vars.color.info })
