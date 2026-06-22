import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const container = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  padding: `${vars.space[2]} ${vars.space[4]}`,
  borderTop: `1px solid ${vars.color.border}`,
  flexShrink: 0,
  gap: vars.space[2],
  minHeight: 48,
})

export const left = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  fontSize: vars.font.size.sm,
  color: vars.color.textSecondary,
  justifySelf: 'start',
})

export const leftLabel = style({
  whiteSpace: 'nowrap',
})

export const center = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  justifySelf: 'center',
})

export const right = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[1],
  fontSize: vars.font.size.sm,
  color: vars.color.textSecondary,
  justifySelf: 'end',
})

export const pageInput = style({
  width: 40,
  height: 24,
  padding: `0 ${vars.space[1]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  textAlign: 'center',
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.brand[600],
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

// ---------------------------------------------------------------------------
// 인라인 Pagination 스타일 (PaginationBar 전용)
// ---------------------------------------------------------------------------

export const paginationContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[1],
})

const paginationButtonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 28,
  height: 28,
  padding: `0 ${vars.space[1]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  cursor: 'pointer',
  transition: `all ${vars.duration.fast}`,
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surfaceMuted,
      borderColor: vars.color.borderStrong,
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

export const paginationButton = style([paginationButtonBase])

export const paginationPageButton = style([
  paginationButtonBase,
  {
    selectors: {
      '&[aria-current="page"]': {
        background: vars.color.brand[600],
        borderColor: vars.color.brand[600],
        color: vars.color.textInverse,
      },
      '&[aria-current="page"]:hover': {
        background: vars.color.brand[700],
        borderColor: vars.color.brand[700],
      },
    },
  },
])

export const paginationEllipsis = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 24,
  height: 28,
  color: vars.color.textDisabled,
  fontSize: vars.font.size.sm,
  userSelect: 'none',
})
