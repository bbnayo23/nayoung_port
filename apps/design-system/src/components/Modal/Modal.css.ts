import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

/* ── Keyframes ── */
const modalDropIn = keyframes({
  '0%': { opacity: 0, transform: 'translate3d(-50%, calc(-50% + 12px), 0) scale(0.98)' },
  '100%': { opacity: 1, transform: 'translate3d(-50%, -50%, 0) scale(1)' },
})

const modalDropOut = keyframes({
  '0%': { opacity: 1, transform: 'translate3d(-50%, -50%, 0) scale(1)' },
  '100%': { opacity: 0, transform: 'translate3d(-50%, calc(-50% + 12px), 0) scale(0.98)' },
})

const sidePanelSlideRight = keyframes({
  '0%': { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
  '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
})

const sidePanelSlideLeft = keyframes({
  '0%': { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
  '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
})

const sidePanelSlideOutLeft = keyframes({
  '0%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  '100%': { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
})

const sidePanelSlideOutRight = keyframes({
  '0%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  '100%': { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
})

/* ── Dimmed ── */
export const modalDimmed = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9998,
})

/* ── Wrapper ── */
export const modalWrapper = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate3d(-50%, -50%, 0)',
  background: `var(--color-modal-bg, ${vars.color.surface})`,
  color: vars.color.text,
  borderRadius: vars.radius.md,
  boxShadow: '0 0 9px 0 rgba(0, 0, 0, 0.35)',
  zIndex: 9999,
  minWidth: 290,
  maxWidth: '90vw',
  maxHeight: '90vh',
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  perspective: 1000,
})

globalStyle(`${modalWrapper}.modal-wrapper:not(.modal-sidepanel)`, { overflow: 'auto' })

globalStyle(`${modalWrapper}.modal-open`, {
  animation: `${modalDropIn} 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
})

globalStyle(`${modalWrapper}.is-closing:not(.modal-sidepanel)`, {
  animation: `${modalDropOut} 0.18s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
})

/* ── Sizes ── */
globalStyle(`${modalWrapper}.modal-size-sm`, { width: 420, minWidth: 420, maxWidth: '90vw' })
globalStyle(`${modalWrapper}.modal-size-md`, { width: 1000, minWidth: 850, maxWidth: '95vw' })
globalStyle(`${modalWrapper}.modal-size-lg`, { width: 1400, minWidth: 850, maxWidth: '98vw' })

/* ── Side Panel ── */
globalStyle(`${modalWrapper}.modal-sidepanel`, {
  position: 'fixed',
  top: 0,
  left: 'auto',
  right: 0,
  transform: 'translate3d(0, 0, 0)',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  borderRadius: vars.radius.md,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  boxShadow: '-4px 1px 9.2px 0 rgba(0, 0, 0, 0.1)',
  maxHeight: '100vh',
  background: `var(--color-modal-sidepanel-bg, ${vars.color.surface})`,
})

globalStyle(`${modalWrapper}.modal-sidepanel.modal-open:not(.is-closing)`, {
  animation: `${sidePanelSlideRight} 0.25s ease-out`,
})

globalStyle(`${modalWrapper}.modal-sidepanel.is-closing`, {
  animation: `${sidePanelSlideOutRight} 0.3s ease-out forwards`,
})

globalStyle(`${modalWrapper}.modal-sidepanel.sidepanel-left`, {
  right: 'auto',
  left: 0,
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow: '8px 0 5.9px 0 rgba(0, 0, 0, 0.05)',
  width: 290,
})

globalStyle(`${modalWrapper}.modal-sidepanel.sidepanel-left.modal-open:not(.is-closing)`, {
  animation: `${sidePanelSlideLeft} 0.25s ease-out`,
})

globalStyle(`${modalWrapper}.modal-sidepanel.sidepanel-left.is-closing`, {
  animation: `${sidePanelSlideOutLeft} 0.3s ease-out forwards`,
})

globalStyle(`${modalWrapper}.modal-sidepanel.sidepanel-left .modal-header`, {
  borderBottom: 0,
  padding: 16,
})

globalStyle(`${modalWrapper}.modal-sidepanel.sidepanel-left .modal-header-right`, {
  position: 'absolute',
  right: -13,
})

globalStyle(`${modalWrapper}.modal-sidepanel .modal-header`, {
  padding: '20px 48px 20px 30px',
  height: 'fit-content',
})

globalStyle(`${modalWrapper}.modal-sidepanel.sidepanel-left .modal-header`, {
  padding: '16px 16px 16px 48px',
})

/* ── Header ── */
export const modalHeader = style({
  padding: '20px 40px',
  fontWeight: 700,
  fontSize: vars.font.sizeLg,
  borderBottom: `1px solid var(--color-modal-border, ${vars.color.border})`,
  color: `var(--color-modal-title-text, ${vars.color.text})`,
  display: 'flex',
  alignItems: 'center',
  height: 76,
})

globalStyle(`${modalHeader} .modal-header-right`, {
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

globalStyle(`${modalHeader} .modal-header-right .btn-icon.btn-ghost svg`, {
  fill: vars.color.textSecondary,
})

/* ── Body ── */
export const modalBody = style({
  padding: '20px 30px',
  color: vars.color.textSecondary,
})

globalStyle(`${modalWrapper}.modal-sidepanel ${modalBody}`, {
  flex: 1,
  overflowY: 'auto',
  minHeight: 0,
})

/* ── Footer ── */
export const modalFooter = style({
  padding: 16,
  borderTop: `1px solid var(--color-modal-border, ${vars.color.border})`,
  textAlign: 'right',
})

/* ── Sidepanel close button ── */
export const modalSidepanelClose = style({
  position: 'absolute',
  top: 20,
  right: 16,
  zIndex: 1,
})

globalStyle(`${modalWrapper}.modal-sidepanel.sidepanel-left ${modalSidepanelClose}`, {
  right: 'auto',
  left: 12,
})

globalStyle(`${modalSidepanelClose} svg`, {
  fill: vars.color.textSecondary,
})
