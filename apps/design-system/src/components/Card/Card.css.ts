import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

/** Card 루트 — variant 와 무관한 공통 스타일 ('ds-card' 디버그 네임) */
export const root = style(
  {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: vars.radius.md,
    background: vars.color.surface,
    color: vars.color.text,
    fontFamily: vars.font.family.sans,
    overflow: 'hidden',
  },
  'ds-card',
)

export const variants = styleVariants(
  {
    elevated: {
      boxShadow: vars.shadow.md,
    },
    outlined: {
      border: `1px solid ${vars.color.border}`,
    },
    filled: {
      background: vars.color.surfaceMuted,
    },
  },
  'ds-card-variant',
)

/** padding 토큰 맵 — 'none' 은 0, 나머지는 space 스케일 */
export const paddings = styleVariants(
  {
    none: { padding: vars.space[0] },
    sm: { padding: vars.space[3] },
    md: { padding: vars.space[4] },
    lg: { padding: vars.space[6] },
  },
  'ds-card-padding',
)

/** Header — 본문 위쪽 영역, 아래 1px 보더 + 살짝 굵은 텍스트 */
export const header = style(
  {
    borderBottom: `1px solid ${vars.color.border}`,
    fontWeight: vars.font.weight.semibold,
    fontSize: vars.font.size.lg,
    lineHeight: vars.font.lineHeight.tight,
    color: vars.color.text,
  },
  'ds-card-header',
)

/** Body — 메인 콘텐츠 영역 */
export const body = style(
  {
    flex: 1,
    fontSize: vars.font.size.md,
    lineHeight: vars.font.lineHeight.normal,
    color: vars.color.text,
  },
  'ds-card-body',
)

/** Footer — 본문 아래 영역, 위 1px 보더 + 우측 정렬 액션 */
export const footer = style(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: vars.space[2],
    borderTop: `1px solid ${vars.color.border}`,
  },
  'ds-card-footer',
)

export type CardVariant = keyof typeof variants
export type CardPadding = keyof typeof paddings
