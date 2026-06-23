import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const slideInRight = keyframes({
  from: { opacity: 0, transform: 'translateX(16px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
})

const slideInLeft = keyframes({
  from: { opacity: 0, transform: 'translateX(-16px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
})

/** 한쪽 코너에 고정되는 toast viewport — column 으로 쌓인다. */
export const viewport = style(
  {
    position: 'fixed',
    zIndex: vars.zIndex.toast,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space[3],
    width: '360px',
    maxWidth: 'calc(100vw - 2rem)',
    pointerEvents: 'none',
  },
  'ds-toast-viewport',
)

/** viewport 코너 위치 + 진입 애니메이션 방향 */
export const positions = styleVariants(
  {
    'top-right': {
      top: vars.space[4],
      right: vars.space[4],
      alignItems: 'flex-end',
    },
    'top-left': {
      top: vars.space[4],
      left: vars.space[4],
      alignItems: 'flex-start',
    },
    'bottom-right': {
      bottom: vars.space[4],
      right: vars.space[4],
      alignItems: 'flex-end',
      flexDirection: 'column-reverse',
    },
    'bottom-left': {
      bottom: vars.space[4],
      left: vars.space[4],
      alignItems: 'flex-start',
      flexDirection: 'column-reverse',
    },
  },
  'ds-toast-position',
)

/** 개별 toast 카드 */
export const card = style(
  {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    gap: vars.space[3],
    width: '100%',
    padding: '12px 20px',
    borderRadius: vars.radius.md,
    borderLeft: `4px solid transparent`,
    background: vars.color.surface,
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
    pointerEvents: 'auto',
  },
  'ds-toast-card',
)

/** 진입 애니메이션 — 좌/우 슬라이드 */
export const enterRight = style(
  { animation: `${slideInRight} ${vars.duration.normal} ease` },
  'ds-toast-enter-right',
)
export const enterLeft = style(
  { animation: `${slideInLeft} ${vars.duration.normal} ease` },
  'ds-toast-enter-left',
)

/** 좌측 accent 보더 + 아이콘 색상 = variant 색 */
export const variants = styleVariants(
  {
    info: { borderLeftColor: vars.color.info, color: vars.color.info },
    success: { borderLeftColor: vars.color.success, color: vars.color.success },
    warning: { borderLeftColor: vars.color.warning, color: vars.color.warning },
    danger: { borderLeftColor: vars.color.danger, color: vars.color.danger },
  },
  'ds-toast-variant',
)

export const icon = style(
  {
    flexShrink: 0,
    width: '1.25rem',
    height: '1.25rem',
    marginTop: '1px',
  },
  'ds-toast-icon',
)

export const body = style(
  {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space[1],
  },
  'ds-toast-body',
)

export const title = style(
  {
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.tight,
    color: vars.color.text,
  },
  'ds-toast-title',
)

export const description = style(
  {
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.normal,
    color: vars.color.textSecondary,
  },
  'ds-toast-description',
)

export const closeButton = style(
  {
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    marginTop: '-2px',
    marginRight: '-4px',
    padding: 0,
    border: 'none',
    borderRadius: vars.radius.sm,
    background: 'transparent',
    color: vars.color.textSecondary,
    cursor: 'pointer',
    transition: `background ${vars.duration.fast} ease, color ${vars.duration.fast} ease`,
    selectors: {
      '&:hover': {
        background: vars.color.gray[100],
        color: vars.color.text,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: vars.shadow.focus,
      },
    },
  },
  'ds-toast-close',
)

export type ToastVariant = keyof typeof variants
export type ToastPosition = keyof typeof positions
