import { style } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

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

// 항목 수 배지
export const count = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 18,
  height: 18,
  marginLeft: 2,
  padding: '0 6px',
  borderRadius: vars.radius.full,
  background: vars.color.background,
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightMedium,
})

// ── 필터 검색 ──────────────────────────────────────────────────────────────────
export const filterRow = style({
  position: 'relative',
  flexShrink: 0,
  padding: '8px 12px',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const filterIcon = style({
  position: 'absolute',
  left: 22,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'inline-flex',
  color: vars.color.textSecondary,
  pointerEvents: 'none',
})

export const filterInput = style({
  width: '100%',
  height: 30,
  padding: '0 10px 0 30px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.font.sizeSm,
  fontFamily: vars.font.family,
  outline: 'none',
  ':focus': { borderColor: vars.color.primary },
  '::placeholder': { color: vars.color.textMuted },
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

// 항목 행 — hover 액션(복사·삭제)을 얹기 위한 relative 컨테이너
export const row = style({
  position: 'relative',
})

// hover 시 노출되는 액션(복사·삭제) 그룹 — 항목 우상단
export const rowActions = style({
  position: 'absolute',
  top: 8,
  right: 10,
  display: 'inline-flex',
  gap: 2,
  opacity: 0,
  transition: `opacity ${vars.transition.fast}`,
  selectors: {
    [`${row}:hover &`]: { opacity: 1 },
    [`${row}:focus-within &`]: { opacity: 1 },
  },
})

export const actionBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  border: 'none',
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.textSecondary,
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover, color: vars.color.text },
})

export const query = style({
  fontFamily: MONO,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

// 쿼리 문법 하이라이트
export const qKeyword = style({
  color: vars.color.primary,
  fontWeight: vars.font.weightBold,
})

export const qValue = style({
  color: vars.color.success,
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
