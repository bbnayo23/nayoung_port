import { style, styleVariants } from '@vanilla-extract/css'
import { swiss } from '@/styles/swiss'
import { glassPanel } from '@/styles/glass.css'

export const section = style({
  paddingBlock: '104px',
  paddingInline: '56px',
  background: swiss.glass.tint,
  borderTop: `1px solid ${swiss.color.line}`,
  '@media': {
    'screen and (max-width: 900px)': { paddingBlock: '72px', paddingInline: '28px' },
    'screen and (max-width: 560px)': { paddingInline: '20px' },
  },
})

export const inner = style({
  maxWidth: '1240px',
  margin: '0 auto',
})

export const sectionTag = style({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: swiss.color.inkSoft,
  marginBottom: '20px',
  selectors: {
    '&::before': {
      content: '""',
      display: 'inline-block',
      width: '8px',
      height: '8px',
      marginRight: '10px',
      backgroundImage: swiss.gradient,
    },
  },
})

export const sectionTitle = style({
  fontFamily: swiss.font.sans,
  fontWeight: 800,
  fontSize: 'clamp(36px, 6vw, 76px)',
  lineHeight: '0.95',
  letterSpacing: '-0.035em',
  textTransform: 'uppercase',
  color: swiss.color.ink,
  marginBottom: '56px',
  '@media': {
    'screen and (max-width: 640px)': { marginBottom: '40px' },
  },
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  '@media': {
    'screen and (max-width: 700px)': { gridTemplateColumns: '1fr' },
  },
})

export const card = style([glassPanel, {
  display: 'flex',
  flexDirection: 'column',
  padding: '28px',
  borderRadius: '16px',
  color: 'inherit',
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      borderColor: `${swiss.color.accent}66`,
      boxShadow: '0 24px 54px rgba(13,148,136,0.16), inset 0 1px 0 rgba(255,255,255,0.75)',
    },
  },
}])

// 링크형 카드 — 카드 전체가 클릭 가능
export const cardClickable = style({
  cursor: 'pointer',
})

export const cardHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '12px',
  marginBottom: '14px',
})

export const cardName = style({
  fontFamily: swiss.font.sans,
  fontSize: '22px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: swiss.color.ink,
})

const statusBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  padding: '4px 9px',
  borderRadius: '2px',
  fontSize: '11px',
  fontFamily: swiss.font.mono,
  fontWeight: 500,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  border: '1px solid',
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

export const statusBadge = styleVariants({
  shipped: [statusBase, { color: swiss.color.ink, borderColor: swiss.color.ink }],
  'in-progress': [statusBase, { color: swiss.color.accent, borderColor: `${swiss.color.accent}66` }],
  experiment: [statusBase, { color: swiss.color.inkSoft, borderColor: swiss.color.line, borderStyle: 'dashed' }],
})

export const cardTagline = style({
  fontSize: '13px',
  fontFamily: swiss.font.mono,
  color: swiss.color.inkFaint,
  marginBottom: '14px',
})

export const cardDesc = style({
  fontSize: '14px',
  color: swiss.color.inkSoft,
  lineHeight: '1.7',
  flexGrow: 1,
  marginBottom: '24px',
})

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  marginTop: 'auto',
})

export const cardTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

export const cardLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  fontFamily: swiss.font.sans,
  fontSize: '14px',
  fontWeight: 600,
  color: swiss.color.ink,
  whiteSpace: 'nowrap',
  transition: `color 0.3s ease, transform 0.4s ${swiss.ease.smooth}`,
  ':hover': { color: swiss.color.accent, transform: 'translateX(3px)' },
})

// ── Case study ────────────────────────────────────────────────────────────────

export const caseList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '64px',
})

export const caseCard = style([glassPanel, {
  display: 'flex',
  flexDirection: 'column',
  gap: '26px',
  padding: '40px',
  borderRadius: '20px',
  '@media': {
    'screen and (max-width: 640px)': { padding: '26px' },
  },
}])

export const caseHead = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '16px',
})

export const caseHeadText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

export const caseRole = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: '10px',
  fontSize: '14px',
  lineHeight: '1.6',
  color: swiss.color.inkSoft,
})

export const caseRoleLabel = style({
  fontFamily: swiss.font.mono,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: swiss.color.accent,
  border: `1px solid ${swiss.color.accent}55`,
  borderRadius: '2px',
  padding: '3px 8px',
  whiteSpace: 'nowrap',
})

export const caseBody = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '28px',
  '@media': {
    'screen and (max-width: 780px)': { gridTemplateColumns: '1fr', gap: '24px' },
  },
})

export const caseBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

export const caseBlockLabel = style({
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: swiss.color.accent,
  paddingBottom: '10px',
  borderBottom: `1px solid ${swiss.color.line}`,
})

export const casePoints = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

export const casePoint = style({
  position: 'relative',
  paddingLeft: '16px',
  fontSize: '14px',
  lineHeight: '1.65',
  color: swiss.color.inkSoft,
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '9px',
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      background: swiss.color.accent,
    },
  },
})

// Before / After 미디어 — 스크린샷이 없으면 링크 카드로 렌더된다.
export const mediaRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '14px',
  '@media': {
    'screen and (max-width: 640px)': { gridTemplateColumns: '1fr' },
  },
})

export const mediaItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '18px',
  borderRadius: '12px',
  border: `1px solid ${swiss.color.line}`,
  background: swiss.glass.tint,
  color: 'inherit',
  textDecoration: 'none',
  transition: `border-color 0.3s ease, transform 0.4s ${swiss.ease.smooth}`,
  selectors: {
    '&:hover': {
      borderColor: `${swiss.color.accent}66`,
      transform: 'translateY(-2px)',
    },
  },
})

export const mediaKind = style({
  alignSelf: 'flex-start',
  fontFamily: swiss.font.mono,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '3px 8px',
  borderRadius: '2px',
  border: '1px solid',
  selectors: {
    '&[data-kind="before"]': { color: swiss.color.inkSoft, borderColor: swiss.color.line },
    '&[data-kind="after"]': { color: swiss.color.accent, borderColor: `${swiss.color.accent}66` },
  },
})

export const mediaCaption = style({
  fontSize: '13px',
  lineHeight: '1.5',
  color: swiss.color.inkSoft,
})

export const caseLinks = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '18px',
})

/** 이전 이력(Earlier Work) 블록 — More 그리드 아래에 구분선을 두고 이어 붙인다. */
export const legacyBlock = style({
  marginTop: '64px',
  paddingTop: '56px',
  borderTop: `1px solid ${swiss.color.line}`,
  '@media': {
    'screen and (max-width: 640px)': { marginTop: '44px', paddingTop: '40px' },
  },
})

export const moreTitle = style({
  fontFamily: swiss.font.mono,
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: swiss.color.inkSoft,
  marginBottom: '20px',
})
