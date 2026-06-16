import { forwardRef, type HTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import * as styles from './Badge.css'
import type { BadgeAppearance, BadgeSize, BadgeTone, BadgeVariant } from './Badge.css'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 색상 의미 (neutral·brand·success·warning·danger·info) */
  variant?: BadgeVariant
  /** 시각적 표현 방식 (solid·soft·outline) */
  appearance?: BadgeAppearance
  /** 크기 (sm·md) */
  size?: BadgeSize
  /** 라벨 앞 상태 점 표시 */
  dot?: boolean
}

/**
 * 상태/카테고리를 나타내는 라벨 배지.
 *
 * variant(색) × appearance(solid·soft·outline) 매트릭스로 색 조합을 구성하고
 * size(sm·md) 로 크기를 조절한다. `dot` 으로 선행 상태 점을 표시할 수 있다.
 *
 * a11y: 단순 시각 라벨이므로 `<span>` 으로 렌더링한다. 점(dot)은 장식이라
 * `aria-hidden` 처리되며, 의미는 텍스트 자식으로 전달하는 것을 권장한다.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'neutral',
    appearance = 'soft',
    size = 'md',
    dot = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const tone = `${appearance}-${variant}` as BadgeTone

  return (
    <span
      ref={ref}
      className={cx(styles.root, styles.sizes[size], styles.tones[tone], className)}
      {...rest}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  )
})
