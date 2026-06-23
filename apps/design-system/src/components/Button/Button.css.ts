import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
})

/** 모든 variant 가 공유하는 기본 스타일 ('ds-button' 디버그 네임으로 클래스에 노출) */
export const root = style(
  {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space[2],
    border: '1px solid transparent',
    borderRadius: vars.radius.md,
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.tight,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: `background ${vars.duration.fast} ease, border-color ${vars.duration.fast} ease, color ${vars.duration.fast} ease`,
    selectors: {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: vars.shadow.focus,
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  'ds-button',
)

export const variants = styleVariants(
  {
    primary: {
      background: vars.color.brand[600],
      color: vars.color.textInverse,
      selectors: { '&:hover:not(:disabled)': { background: vars.color.brand[700] } },
    },
    secondary: {
      background: vars.color.gray[100],
      color: vars.color.text,
      selectors: { '&:hover:not(:disabled)': { background: vars.color.gray[200] } },
    },
    outline: {
      background: 'transparent',
      borderColor: vars.color.borderStrong,
      color: vars.color.text,
      selectors: { '&:hover:not(:disabled)': { background: vars.color.surfaceMuted } },
    },
    ghost: {
      background: 'transparent',
      color: vars.color.text,
      selectors: { '&:hover:not(:disabled)': { background: vars.color.gray[100] } },
    },
    danger: {
      background: vars.color.danger,
      color: vars.color.textInverse,
      selectors: { '&:hover:not(:disabled)': { background: '#e03131' } },
    },
  },
  'ds-button-variant',
)

export const sizes = styleVariants(
  {
    sm: { fontSize: vars.font.size.sm, padding: '4px 8px', height: '28px' },
    md: { fontSize: vars.font.size.md, padding: '8px 12px', height: '32px' },
    lg: { fontSize: vars.font.size.lg, padding: '12px 16px', height: '36px' },
  },
  'ds-button-size',
)

export const fullWidth = style({ width: '100%' }, 'ds-button-full')

/** 로딩 중 라벨을 숨기되 버튼 폭은 유지 */
export const hiddenLabel = style({ visibility: 'hidden' }, 'ds-button-hidden-label')

export const spinner = style(
  {
    position: 'absolute',
    width: '1em',
    height: '1em',
    border: '2px solid currentColor',
    borderTopColor: 'transparent',
    borderRadius: vars.radius.full,
    animation: `${spin} 0.6s linear infinite`,
  },
  'ds-button-spinner',
)

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes
