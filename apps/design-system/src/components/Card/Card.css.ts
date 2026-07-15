import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

export const styledCard = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  width: '100%',
  height: 'fit-content',
  zIndex: 1,
  boxSizing: 'border-box',
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  cursor: 'default',
  transition:
    'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
})

globalStyle(`${styledCard}.card-sm`, { width: '280px', height: 'auto' })
globalStyle(`${styledCard}.card-md`, { width: '360px', height: 'auto' })
globalStyle(`${styledCard}.card-lg`, { width: '480px', height: 'auto' })
globalStyle(`${styledCard}.card-clickable`, { cursor: 'pointer' })

globalStyle(`${styledCard}.card-hoverable:hover`, {
  backgroundColor: vars.color.surfaceHover,
  transform: 'translateY(-1px)',
  boxShadow: vars.shadow.md,
})

globalStyle(`${styledCard}.is-active`, {
  backgroundColor: vars.color.surface,
  borderColor: vars.color.primary,
  color: vars.color.text,
  boxShadow: `0 0 0 1px ${vars.color.primary}`,
})

globalStyle(`${styledCard}.is-active.card-hoverable:hover`, {
  backgroundColor: vars.color.surfaceHover,
  borderColor: vars.color.primary,
})

globalStyle(`${styledCard}.is-disabled`, {
  color: vars.color.textMuted,
  backgroundColor: vars.color.surfaceHover,
})

globalStyle(`${styledCard}.card-no-padding .card-header`, { padding: 0 })
globalStyle(`${styledCard}.card-no-padding .card-body`, { padding: 0 })
globalStyle(`${styledCard}.card-no-padding .card-footer`, { padding: 0 })

globalStyle(`${styledCard}.card-section`, {
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.md,
  overflow: 'visible',
})

globalStyle(`${styledCard}.card-compact .card-header`, {
  padding: '10px 14px 0',
  fontSize: vars.font.sizeXs,
  fontWeight: 600,
})

globalStyle(`${styledCard}.card-compact .card-body`, {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: '6px 14px 10px',
})

globalStyle(`${styledCard}.card-compact .card-footer`, { padding: '6px 14px 10px' })

export const styledCardHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  fontSize: vars.font.sizeLg,
  fontWeight: 600,
  padding: 16,
  zIndex: 0,
})

export const styledCardBody = style({ padding: 16, zIndex: 0 })

export const styledCardImage = style({})

globalStyle(`${styledCardImage} img`, { width: '100%' })

export const styledCardFooter = style({
  display: 'flex',
  padding: 16,
  alignItems: 'center',
  gap: 5,
  marginTop: 'auto',
})

export const styledCardSkeleton = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  gap: 8,
  cursor: 'default',
})

// ── old-exd variant ──────────────────────────────────────────────────────────
globalStyle(`${styledCard}.variant-old-exd`, {
  border: `2px solid ${vars.color.primary}`,
  borderRadius: 0,
  boxShadow: `inset 0 0 0 1px ${vars.color.surface}`,
})

globalStyle(`${styledCard}.variant-old-exd .card-header`, {
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderBottom: `1px solid ${vars.color.primary}`,
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  color: vars.color.primary,
  backgroundColor: vars.color.surface,
  letterSpacing: '-0.01em',
})

globalStyle(`${styledCard}.variant-old-exd .card-header-star`, {
  color: vars.color.primary,
  fontSize: vars.font.sizeLg,
})

globalStyle(`${styledCard}.variant-old-exd .card-header-title`, { flex: 1 })

globalStyle(`${styledCard}.variant-old-exd .card-body`, {
  padding: vars.spacing.md,
  fontSize: vars.font.sizeSm,
})

globalStyle(`${styledCard}.variant-old-exd .card-body > * > * + *`, {
  marginTop: vars.spacing.xs,
  paddingTop: vars.spacing.xs,
  borderTop: `1px dashed ${vars.color.border}`,
})

// ── neo variant ───────────────────────────────────────────────────────────────
globalStyle(`${styledCard}.variant-neo`, {
  border: 'none',
  borderRadius: 20,
  boxShadow: `0 10px 40px -12px color-mix(in srgb, ${vars.color.primary} 25%, transparent), 0 4px 12px -4px rgba(0,0,0,0.08)`,
  transition: `transform ${vars.transition.normal}, box-shadow ${vars.transition.normal}`,
})

globalStyle(`${styledCard}.variant-neo:hover`, {
  transform: 'translateY(-3px)',
  boxShadow: `0 20px 50px -12px color-mix(in srgb, ${vars.color.primary} 35%, transparent), 0 8px 20px -4px rgba(0,0,0,0.12)`,
})

globalStyle(`${styledCard}.variant-neo .card-neo-accent`, {
  height: 4,
  backgroundImage: `linear-gradient(90deg, ${vars.color.primary}, ${vars.color.secondary}, ${vars.color.info})`,
})

globalStyle(`${styledCard}.variant-neo .card-header`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.spacing.lg} ${vars.spacing.xl} ${vars.spacing.sm}`,
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  letterSpacing: '-0.02em',
  color: vars.color.text,
})

globalStyle(`${styledCard}.variant-neo .card-body`, {
  padding: `${vars.spacing.sm} ${vars.spacing.xl} ${vars.spacing.xl}`,
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeMd,
  lineHeight: 1.7,
})

// ── skeleton ──────────────────────────────────────────────────────────────────
globalStyle(`${styledCardSkeleton} .card-skeleton-time-diff`, {
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  height: 10,
})
