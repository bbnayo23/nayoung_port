import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

/** position: relative 래퍼 — Content 를 절대 위치로 띄우는 기준 */
export const root = style(
  {
    position: 'relative',
    display: 'inline-block',
    fontFamily: vars.font.family.sans,
  },
  'ds-select',
)

/** 트리거 버튼 공통 (role="combobox") */
export const trigger = style(
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.space[2],
    width: '100%',
    minWidth: '12rem',
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radius.md,
    background: vars.color.surface,
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.tight,
    color: vars.color.text,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textAlign: 'left',
    transition: `border-color ${vars.duration.fast} ease, box-shadow ${vars.duration.fast} ease`,
    selectors: {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: vars.shadow.focus,
        borderColor: vars.color.brand[500],
      },
      '&:hover:not(:disabled)': {
        borderColor: vars.color.borderStrong,
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        background: vars.color.surfaceMuted,
      },
    },
  },
  'ds-select-trigger',
)

export const triggerSizes = styleVariants(
  {
    sm: { fontSize: vars.font.size.sm, padding: `0 ${vars.space[3]}`, height: '2rem' },
    md: { fontSize: vars.font.size.md, padding: `0 ${vars.space[4]}`, height: '2.5rem' },
    lg: { fontSize: vars.font.size.lg, padding: `0 ${vars.space[5]}`, height: '3rem' },
  },
  'ds-select-trigger-size',
)

/** placeholder(미선택) 텍스트 — muted */
export const placeholder = style(
  {
    color: vars.color.textSecondary,
  },
  'ds-select-placeholder',
)

/** 선택값 라벨 텍스트 — overflow 처리 */
export const value = style(
  {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  'ds-select-value',
)

/** 우측 chevron 아이콘 래퍼 */
export const chevron = style(
  {
    flexShrink: 0,
    display: 'inline-flex',
    color: vars.color.textSecondary,
    transition: `transform ${vars.duration.fast} ease`,
  },
  'ds-select-chevron',
)

export const chevronOpen = style(
  {
    transform: 'rotate(180deg)',
  },
  'ds-select-chevron-open',
)

/** 드롭다운 리스트박스 (role="listbox") */
export const content = style(
  {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    minWidth: '100%',
    maxHeight: '16rem',
    overflowY: 'auto',
    zIndex: vars.zIndex.dropdown,
    background: vars.color.surface,
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radius.md,
    boxShadow: vars.shadow.md,
    padding: vars.space[1],
    listStyle: 'none',
    margin: 0,
  },
  'ds-select-content',
)

/** 옵션 (role="option") 공통 */
export const option = style(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.space[2],
    borderRadius: vars.radius.sm,
    padding: `${vars.space[2]} ${vars.space[3]}`,
    fontSize: vars.font.size.md,
    color: vars.color.text,
    cursor: 'pointer',
    userSelect: 'none',
    selectors: {
      '&[aria-disabled="true"]': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  'ds-select-option',
)

/** 키보드/마우스 하이라이트 상태 */
export const optionHighlighted = style(
  {
    background: vars.color.brand[50],
    color: vars.color.brand[700],
  },
  'ds-select-option-highlighted',
)

/** 선택된 옵션 라벨 강조 */
export const optionSelected = style(
  {
    fontWeight: vars.font.weight.semibold,
  },
  'ds-select-option-selected',
)

/** 체크마크 아이콘 */
export const check = style(
  {
    flexShrink: 0,
    display: 'inline-flex',
    color: vars.color.brand[600],
  },
  'ds-select-check',
)

export type SelectSize = keyof typeof triggerSizes
