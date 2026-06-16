import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

/** 모든 badge 가 공유하는 기본 스타일 */
export const root = style(
  {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space[1],
    border: '1px solid transparent',
    borderRadius: vars.radius.full,
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.tight,
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  'ds-badge',
)

/** size: sm | md */
export const sizes = styleVariants(
  {
    sm: { fontSize: vars.font.size.xs, padding: `${vars.space[0]} ${vars.space[2]}`, minHeight: '1.25rem' },
    md: { fontSize: vars.font.size.sm, padding: `${vars.space[1]} ${vars.space[3]}`, minHeight: '1.5rem' },
  },
  'ds-badge-size',
)

/**
 * variant(color) × appearance(solid·soft·outline) 매트릭스.
 * 키는 `${appearance}-${variant}` 형식 (예: 'solid-success').
 */
export const tones = styleVariants(
  {
    // solid — base 색 배경 + 흰/inverse 텍스트
    'solid-neutral': { background: vars.color.gray[700], color: vars.color.textInverse },
    'solid-brand': { background: vars.color.brand[600], color: vars.color.textInverse },
    'solid-success': { background: vars.color.success, color: vars.color.textInverse },
    'solid-warning': { background: vars.color.warning, color: vars.color.textInverse },
    'solid-danger': { background: vars.color.danger, color: vars.color.textInverse },
    'solid-info': { background: vars.color.info, color: vars.color.textInverse },

    // soft — *Soft 배경 + base 색 텍스트
    'soft-neutral': { background: vars.color.gray[100], color: vars.color.gray[700] },
    'soft-brand': { background: vars.color.brand[50], color: vars.color.brand[600] },
    'soft-success': { background: vars.color.successSoft, color: vars.color.success },
    'soft-warning': { background: vars.color.warningSoft, color: vars.color.warning },
    'soft-danger': { background: vars.color.dangerSoft, color: vars.color.danger },
    'soft-info': { background: vars.color.infoSoft, color: vars.color.info },

    // outline — 투명 배경 + base 색 1px 테두리 + base 색 텍스트
    'outline-neutral': { background: 'transparent', borderColor: vars.color.gray[300], color: vars.color.gray[700] },
    'outline-brand': { background: 'transparent', borderColor: vars.color.brand[600], color: vars.color.brand[600] },
    'outline-success': { background: 'transparent', borderColor: vars.color.success, color: vars.color.success },
    'outline-warning': { background: 'transparent', borderColor: vars.color.warning, color: vars.color.warning },
    'outline-danger': { background: 'transparent', borderColor: vars.color.danger, color: vars.color.danger },
    'outline-info': { background: 'transparent', borderColor: vars.color.info, color: vars.color.info },
  },
  'ds-badge-tone',
)

/** 선행 상태 점 — currentColor 를 따라가므로 텍스트 색과 일치 */
export const dot = style(
  {
    display: 'inline-block',
    width: '0.5em',
    height: '0.5em',
    borderRadius: vars.radius.full,
    background: 'currentColor',
    flexShrink: 0,
  },
  'ds-badge-dot',
)

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeAppearance = 'solid' | 'soft' | 'outline'
export type BadgeSize = keyof typeof sizes
export type BadgeTone = keyof typeof tones
