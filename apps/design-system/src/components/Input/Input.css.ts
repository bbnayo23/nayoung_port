import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

/** 최상위 래퍼 (label + field + message 를 세로로 쌓는다) */
export const root = style(
  {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: vars.space[1],
    fontFamily: vars.font.family.sans,
  },
  'ds-input',
)

/** 부모 폭을 가득 채움 */
export const fullWidth = style({ width: '100%' }, 'ds-input-full')

/** 라벨 */
export const label = style(
  {
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.medium,
    color: vars.color.text,
    lineHeight: vars.font.lineHeight.tight,
  },
  'ds-input-label',
)

/** input + slot 들을 감싸는 필드 컨테이너 (테두리·포커스 링 담당) */
export const field = style(
  {
    display: 'flex',
    alignItems: 'center',
    gap: vars.space[2],
    width: '100%',
    border: '1px solid transparent',
    borderRadius: vars.radius.md,
    background: vars.color.surface,
    color: vars.color.text,
    transition: `border-color ${vars.duration.fast} ease, background ${vars.duration.fast} ease, box-shadow ${vars.duration.fast} ease`,
    selectors: {
      '&:focus-within': {
        outline: 'none',
        boxShadow: vars.shadow.focus,
      },
    },
  },
  'ds-input-field',
)

/** variant: outline | filled */
export const variants = styleVariants(
  {
    outline: {
      background: vars.color.surface,
      borderColor: vars.color.borderStrong,
    },
    filled: {
      background: vars.color.surfaceMuted,
      borderColor: 'transparent',
    },
  },
  'ds-input-variant',
)

/** size: sm | md | lg (패딩 + 높이 + 글자 크기) */
export const sizes = styleVariants(
  {
    sm: { minHeight: '2rem', padding: `0 ${vars.space[3]}`, fontSize: vars.font.size.sm },
    md: { minHeight: '2.5rem', padding: `0 ${vars.space[3]}`, fontSize: vars.font.size.md },
    lg: { minHeight: '3rem', padding: `0 ${vars.space[4]}`, fontSize: vars.font.size.lg },
  },
  'ds-input-size',
)

/** invalid 상태 — danger 테두리, 포커스 링도 danger 톤 */
export const invalid = style(
  {
    borderColor: vars.color.danger,
    selectors: {
      '&:focus-within': {
        boxShadow: `0 0 0 3px ${vars.color.dangerSoft}`,
      },
    },
  },
  'ds-input-invalid',
)

/** disabled 상태 — 필드 디밍 */
export const disabled = style(
  {
    background: vars.color.surfaceMuted,
    borderColor: vars.color.border,
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  'ds-input-disabled',
)

/** 실제 input 요소 — 테두리/배경은 컨테이너가 담당하므로 투명 */
export const control = style(
  {
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: vars.font.lineHeight.normal,
    padding: `${vars.space[2]} 0`,
    selectors: {
      '&::placeholder': {
        color: vars.color.textDisabled,
      },
      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
  },
  'ds-input-control',
)

/** 좌/우 슬롯 (아이콘 등) */
export const slot = style(
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: vars.color.textSecondary,
  },
  'ds-input-slot',
)

/** helper / error 메시지 라인 */
export const message = style(
  {
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.normal,
    color: vars.color.textSecondary,
  },
  'ds-input-message',
)

/** error 메시지 색상 */
export const errorMessage = style(
  {
    color: vars.color.danger,
  },
  'ds-input-error',
)

export type InputVariant = keyof typeof variants
export type InputSize = keyof typeof sizes
