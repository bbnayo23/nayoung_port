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

// ── Guidelines (Do / Don't) ─────────────────────────────────────────────────────
export const guideGrid = style({
  marginTop: 16,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 16,
  '@media': {
    '(max-width: 720px)': { gridTemplateColumns: '1fr' },
  },
})

export const guideCard = style({
  borderRadius: 14,
  border: `1px solid ${vars.color.border}`,
  overflow: 'hidden',
  background: vars.color.surface,
})

const guideHeadBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '11px 16px',
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  borderBottom: `1px solid ${vars.color.border}`,
})

export const guideHeadDo = style([
  guideHeadBase,
  { color: '#15803d', background: 'rgba(34, 197, 94, 0.10)' },
])

export const guideHeadDont = style([
  guideHeadBase,
  { color: '#b91c1c', background: 'rgba(239, 68, 68, 0.10)' },
])

export const guideList = style({
  listStyle: 'none',
  margin: 0,
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
})

export const guideItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.55,
  color: vars.color.textSecondary,
})

const guideMarkBase = style({
  flexShrink: 0,
  marginTop: 2,
  fontWeight: vars.font.weightBold,
  lineHeight: 1,
})

export const guideMarkDo = style([guideMarkBase, { color: '#16a34a' }])
export const guideMarkDont = style([guideMarkBase, { color: '#dc2626' }])

// 접근성 콜아웃
export const a11yCard = style({
  marginTop: 16,
  display: 'flex',
  gap: 12,
  padding: '14px 16px',
  borderRadius: 14,
  border: `1px solid ${vars.color.border}`,
  borderLeft: `3px solid ${vars.color.primary}`,
  background: vars.color.primarySoft,
})

export const a11yBadge = style({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 26,
  height: 26,
  borderRadius: vars.radius.full,
  background: vars.color.primary,
  color: '#fff',
  fontSize: 13,
  fontWeight: vars.font.weightBold,
})

export const a11yBody = style({
  minWidth: 0,
})

export const a11yTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
  marginBottom: 4,
})

export const a11yList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.55,
  color: vars.color.textSecondary,
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
