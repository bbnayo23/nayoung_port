import { style, styleVariants } from '@vanilla-extract/css'
import { swiss } from '@/styles/swiss'

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  padding: '4px 9px',
  borderRadius: '2px',
  fontSize: '11px',
  fontWeight: 500,
  fontFamily: swiss.font.mono,
  lineHeight: 1,
  letterSpacing: '0.02em',
  border: `1px solid ${swiss.color.line}`,
  color: swiss.color.inkSoft,
  background: 'transparent',
  whiteSpace: 'nowrap',
  transition: `border-color 0.3s ease, color 0.3s ease`,
})

/* 스위스 미니멀 — 기본은 모두 헤어라인 모노, accent만 레드 */
export const badge = styleVariants({
  default: [base, {}],
  accent: [base, { color: swiss.color.accent, borderColor: `${swiss.color.accent}55` }],
  green: [base, {}],
  purple: [base, { color: swiss.color.ink, borderColor: swiss.color.ink }],
  amber: [base, {}],
})
