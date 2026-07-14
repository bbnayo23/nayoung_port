import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

// ── Page ──────────────────────────────────────────────────────────────────────
export const page = style({
  boxSizing: 'border-box',
  minHeight: '100%',
  width: '100%',
  padding: '40px clamp(20px, 5vw, 56px) 72px',
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family,
})

export const inner = style({
  maxWidth: 960,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
})

// ── Hero ──────────────────────────────────────────────────────────────────────
export const hero = style({
  position: 'relative',
  overflow: 'hidden',
  padding: 'clamp(24px, 4vw, 40px)',
  borderRadius: 20,
  border: `1px solid ${vars.color.border}`,
  background: `radial-gradient(120% 140% at 100% 0%, ${vars.color.primarySoft} 0%, transparent 55%), ${vars.color.surface}`,
})

export const eyebrow = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12,
  fontWeight: vars.font.weightBold,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: vars.color.primary,
})

export const heroTitle = style({
  margin: '10px 0 0',
  fontSize: 'clamp(28px, 4vw, 40px)',
  fontWeight: vars.font.weightBold,
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  color: vars.color.text,
})

export const heroSubtitle = style({
  margin: '10px 0 0',
  fontSize: 16,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
  maxWidth: 640,
})

export const importRow = style({
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'wrap',
})

export const importChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 14px',
  borderRadius: vars.radius.full,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.background,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 13,
  color: vars.color.text,
  whiteSpace: 'pre',
})

export const heroPreview = style({
  marginTop: 24,
  paddingTop: 24,
  borderTop: `1px dashed ${vars.color.border}`,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 14,
})

// ── Section ───────────────────────────────────────────────────────────────────
export const section = style({
  display: 'flex',
  flexDirection: 'column',
})

export const sectionHead = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
})

export const sectionBar = style({
  width: 4,
  height: 18,
  borderRadius: vars.radius.full,
  background: vars.color.primary,
  flexShrink: 0,
})

export const sectionTitle = style({
  margin: 0,
  fontSize: 20,
  fontWeight: vars.font.weightBold,
  letterSpacing: '-0.01em',
  color: vars.color.text,
})

export const sectionDesc = style({
  margin: '8px 0 0',
  paddingLeft: 14,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
  maxWidth: 720,
})

// ── Example surface ─────────────────────────────────────────────────────────────
export const example = style({
  marginTop: 16,
  padding: 'clamp(20px, 3vw, 32px)',
  borderRadius: 14,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  backgroundImage: `radial-gradient(${vars.color.border} 0.8px, transparent 0.8px)`,
  backgroundSize: '18px 18px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 16,
})

// 예제 표면 안의 요소가 도트 배경 위에서 떠 보이지 않도록, 필요 시 사용하는 카드
export const exampleFlush = style({
  backgroundImage: 'none',
})

// ── API table ───────────────────────────────────────────────────────────────────
export const tableWrap = style({
  marginTop: 16,
  borderRadius: 14,
  border: `1px solid ${vars.color.border}`,
  overflow: 'hidden',
})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: vars.font.sizeSm,
})

globalStyle(`${table} th`, {
  textAlign: 'left',
  padding: '11px 16px',
  background: vars.color.surfaceHover,
  color: vars.color.textSecondary,
  fontWeight: vars.font.weightBold,
  fontSize: vars.font.sizeXs,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  borderBottom: `1px solid ${vars.color.border}`,
  whiteSpace: 'nowrap',
})

globalStyle(`${table} td`, {
  padding: '11px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
  verticalAlign: 'top',
  color: vars.color.textSecondary,
  lineHeight: 1.55,
})

globalStyle(`${table} tr:last-child td`, {
  borderBottom: 'none',
})

globalStyle(`${table} tbody tr:hover td`, {
  background: vars.color.surfaceHover,
})

export const propName = style({
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 13,
  fontWeight: vars.font.weightMedium,
  color: vars.color.primary,
  whiteSpace: 'nowrap',
})

export const typeCode = style({
  display: 'inline-block',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
  color: vars.color.text,
})

export const defaultCode = style({
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
  color: vars.color.textSecondary,
})

export const required = style({
  marginLeft: 6,
  fontSize: 10,
  fontWeight: vars.font.weightBold,
  color: vars.color.error,
})

// 본문 인라인 코드
export const code = style({
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '0.9em',
  padding: '1px 6px',
  borderRadius: vars.radius.sm,
  background: vars.color.surfaceHover,
  color: vars.color.text,
})

// 예제 항목 라벨(예: variant 이름)
export const specimen = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
})

export const specimenLabel = style({
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 11,
  color: vars.color.textSecondary,
})
