import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const treeContainer = style({
  width: '100%',
  height: '100%',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
})

export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '4px',
  width: '100%',
})

export const titleText = style({
  color: vars.color.text,
  fontSize: '12px',
  fontWeight: 600,
  minWidth: '190px',
})

export const searchArea = style({
  display: 'block',
  width: '100%',
})

export const treeBody = style({
  width: '100%',
  padding: '5px',
  border: `1px solid ${vars.color.border}`,
  flex: 1,
  minHeight: 0,
})

export const treeBodyNoBorder = style({
  border: 'none',
})

export const loadingWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
})

export const nodeOuter = style({
  boxSizing: 'border-box',
  width: '100%',
})

export const nodeRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '24px',
  width: '100%',
  paddingRight: '4px',
  userSelect: 'none',
})

export const nodeClickable = style({
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      // alpha-color: vars.color.brand[600] 는 CSS var() 참조라 hex 리터럴 아님 — rgba 리터럴로 대체
      backgroundColor: 'rgba(113, 135, 255, 0.1)',
      color: vars.color.brand[600],
    },
  },
})

export const nodeSelected = style({
  cursor: 'pointer',
  // alpha-color: vars.color.brand[600] 는 CSS var() 참조라 hex 리터럴 아님 — rgba 리터럴로 대체
  backgroundColor: 'rgba(113, 135, 255, 0.1)',
  color: vars.color.brand[600],
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(113, 135, 255, 0.2)',
    },
  },
})

export const nodeDisabled = style({
  cursor: 'default',
  color: `${vars.color.textDisabled} !important`,
})

export const nodeLabel = style({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  lineHeight: '24px',
  flex: 1,
})

export const checkbox = style({
  appearance: 'none',
  margin: 0,
  flexShrink: 0,
  width: 14,
  height: 14,
  border: `1.5px solid ${vars.color.textDisabled}`,
  borderRadius: vars.radius.sm,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: vars.duration.fast,
  position: 'relative',
  selectors: {
    '&:checked': {
      backgroundColor: vars.color.brand[600],
      borderColor: vars.color.brand[600],
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M6.5 11.5L3 8l1-1 2.5 2.5L12 4l1 1-6.5 6.5z' fill='white'/%3E%3C/svg%3E")`,
      backgroundSize: '10px 10px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    '&:checked:hover': {
      backgroundColor: vars.color.brand[700],
      borderColor: vars.color.brand[700],
    },
  },
})

globalStyle(`${nodeSelected} ${nodeLabel}`, {
  color: vars.color.brand[600],
})

globalStyle(`${nodeClickable}:hover ${nodeLabel}`, {
  color: vars.color.brand[600],
})

export const nodeIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  flexShrink: 0,
  color: vars.color.textSecondary,
})

export const nodeCount = style({
  fontSize: '11px',
  color: vars.color.textDisabled,
  marginLeft: 'auto',
  paddingRight: '4px',
  flexShrink: 0,
})

export const toggleBtn = style({
  background: 'transparent',
  border: 'none',
  width: '18px',
  height: '20px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  color: vars.color.text,
  opacity: 0.5,
  padding: 0,
  selectors: {
    '&:hover': {
      opacity: 1,
    },
  },
})

export const toggleSpacer = style({
  width: '18px',
  height: '20px',
  flexShrink: 0,
})

export const titleRowWithTitle = style({
  marginTop: 0,
})

export const searchInput = style({
  fontSize: '12px',
  height: '28px',
  // global .input 클래스 없이 자체 필드 스타일 포함
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  padding: `0 ${vars.space[2]}`,
  width: '100%',
  background: vars.color.surface,
  color: vars.color.text,
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: vars.color.brand[600],
    },
  },
})

export const treeBodyFixedHeight = style({
  flex: 'none',
})
