import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

const MONO = "'JetBrains Mono', 'D2Coding', ui-monospace, SFMono-Regular, Menlo, monospace"

// ── Card ─────────────────────────────────────────────────────────────────────
export const card = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  height: '100%',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
})

export const head = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  padding: '12px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
  flexShrink: 0,
})

export const headTitle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const action = style({
  border: 'none',
  background: 'transparent',
  padding: 0,
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeXs,
  cursor: 'pointer',
  transition: `color ${vars.transition.fast}`,
  ':hover': { color: vars.color.primary, textDecoration: 'underline' },
})

// ── List ─────────────────────────────────────────────────────────────────────
export const list = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  width: '100%',
  padding: '12px 16px',
  border: 'none',
  borderBottom: `1px solid ${vars.color.border}`,
  background: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover },
})

export const itemTop = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: 8,
})

export const titleWrap = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const itemTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.text,
})

export const itemMeta = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

// hover 시 노출되는 실행 어피던스
export const runBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 3,
  flexShrink: 0,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightMedium,
  color: vars.color.primary,
  opacity: 0,
  transform: 'translateX(4px)',
  transition: `opacity ${vars.transition.fast}, transform ${vars.transition.fast}`,
  selectors: {
    [`${item}:hover &`]: { opacity: 1, transform: 'translateX(0)' },
    [`${item}:focus-visible &`]: { opacity: 1, transform: 'translateX(0)' },
  },
})

export const query = style({
  fontFamily: MONO,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const empty = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  minHeight: 0,
  padding: '24px 0',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
})
