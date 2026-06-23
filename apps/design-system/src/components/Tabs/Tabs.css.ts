import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

/** 루트 컨테이너 */
export const root = style(
  {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space[4],
    fontFamily: vars.font.family.sans,
  },
  'ds-tabs',
)

/** 트리거를 담는 탭 리스트 (role="tablist") — variant 별 하단 보더 처리 */
export const list = styleVariants(
  {
    line: {
      display: 'flex',
      gap: vars.space[1],
      borderBottom: `1px solid ${vars.color.border}`,
    },
    enclosed: {
      display: 'flex',
      gap: vars.space[1],
      borderBottom: `1px solid ${vars.color.border}`,
    },
  },
  'ds-tabs-list',
)

/** 개별 탭 버튼 공통 스타일 */
export const trigger = style(
  {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space[2],
    border: '1px solid transparent',
    background: 'transparent',
    padding: '6px 20px',
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.md,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.tight,
    color: vars.color.textSecondary,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: `background ${vars.duration.fast} ease, border-color ${vars.duration.fast} ease, color ${vars.duration.fast} ease`,
    selectors: {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: vars.shadow.focus,
        borderRadius: vars.radius.sm,
      },
      '&:hover:not(:disabled)': {
        color: vars.color.text,
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  'ds-tabs-trigger',
)

/** line variant 트리거 — 하단 인디케이터(언더라인) */
export const triggerLine = style(
  {
    marginBottom: '-1px',
    borderBottom: '2px solid transparent',
  },
  'ds-tabs-trigger-line',
)

/** line variant 활성 트리거 */
export const triggerLineActive = style(
  {
    color: vars.color.brand[600],
    borderBottomColor: vars.color.brand[600],
    fontWeight: vars.font.weight.semibold,
  },
  'ds-tabs-trigger-line-active',
)

/** enclosed variant 트리거 — 박스형 탭 */
export const triggerEnclosed = style(
  {
    marginBottom: '-1px',
    borderTopLeftRadius: vars.radius.md,
    borderTopRightRadius: vars.radius.md,
    borderColor: 'transparent',
  },
  'ds-tabs-trigger-enclosed',
)

/** enclosed variant 활성 트리거 */
export const triggerEnclosedActive = style(
  {
    color: vars.color.text,
    background: vars.color.surface,
    borderColor: vars.color.border,
    borderBottomColor: vars.color.surface,
    fontWeight: vars.font.weight.semibold,
  },
  'ds-tabs-trigger-enclosed-active',
)

/** 탭 패널 (role="tabpanel") */
export const panel = style(
  {
    color: vars.color.text,
    fontSize: vars.font.size.md,
    lineHeight: vars.font.lineHeight.normal,
    selectors: {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: vars.shadow.focus,
        borderRadius: vars.radius.sm,
      },
    },
  },
  'ds-tabs-panel',
)

export type TabsVariant = keyof typeof list
