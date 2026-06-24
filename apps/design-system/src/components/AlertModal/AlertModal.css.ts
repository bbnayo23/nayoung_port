import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

const modalDropIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-40px)' },
  '60%': { opacity: 1, transform: 'translateY(4px)' },
  '80%': { opacity: 1, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

// ── Root / Overlay ────────────────────────────────────────────────────────────

export const alertModalRoot = style({
  position: 'fixed',
  inset: 0,
  zIndex: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const alertModalDimmed = style({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.5)',
})

export const alertModal = style({
  position: 'relative',
  background: vars.color.surface,
  borderRadius: vars.radius.md,
  boxShadow: '0 0 9px 0 rgba(0, 0, 0, 0.35)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'hidden',
  minWidth: 420,
  padding: '35px 24px',
})

globalStyle(`${alertModal}.alert-modal-open`, {
  animation: `${modalDropIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
})

// ── Header ────────────────────────────────────────────────────────────────────

export const alertModalHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 10,
})

export const alertModalIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

globalStyle(`${alertModalIcon} svg`, { width: 50, height: 50 })

export const alertModalTitle = style({
  color: vars.color.text,
  fontWeight: 700,
  fontSize: vars.font.sizeMd,
  textAlign: 'center',
  margin: '12px auto',
})

// ── Icon color variants (by type) ─────────────────────────────────────────────

export const alertModalHeaderInfo = style({})
export const alertModalHeaderSuccess = style({})
export const alertModalHeaderWarning = style({})
export const alertModalHeaderError = style({})
export const alertModalHeaderConfirm = style({})

globalStyle(`${alertModalHeaderInfo} ${alertModalIcon} svg`, { fill: vars.color.info })
globalStyle(`${alertModalHeaderSuccess} ${alertModalIcon} svg`, { fill: vars.color.success })
globalStyle(`${alertModalHeaderWarning} ${alertModalIcon} svg`, { fill: vars.color.warning })
globalStyle(`${alertModalHeaderError} ${alertModalIcon} svg`, { fill: vars.color.error })
globalStyle(`${alertModalHeaderConfirm} ${alertModalIcon} svg`, { fill: vars.color.primary })

// ── Body ──────────────────────────────────────────────────────────────────────

export const alertModalBody = style({})

export const alertModalContent = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 8,
  justifyContent: 'center',
  textAlign: 'center',
})

globalStyle(`${alertModalContent} p`, {
  fontSize: vars.font.sizeSm,
  lineHeight: 1.5,
  letterSpacing: '-0.12px',
  color: vars.color.text,
})

// ── Size variants ─────────────────────────────────────────────────────────────

export const alertModalSm = style({ minWidth: 320 })
export const alertModalMd = style({ minWidth: 480 })
export const alertModalLg = style({ minWidth: 640 })

// ── Footer ────────────────────────────────────────────────────────────────────

export const alertModalFooter = style({})

export const alertModalButtons = style({
  display: 'flex',
  gap: 8,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
})
