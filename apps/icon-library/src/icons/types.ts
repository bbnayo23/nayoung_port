import type { SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** 아이콘 크기(px). width/height에 함께 적용된다. */
  size?: number
}
