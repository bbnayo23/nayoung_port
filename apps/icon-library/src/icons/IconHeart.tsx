import type { IconProps } from '../lib/types'

export function IconHeart({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 21s-7.5-4.6-10-9.3C.6 8.9 2 5.5 5.2 5.5c1.9 0 3.2 1 3.8 2.2C9.6 6.5 10.9 5.5 12.8 5.5 16 5.5 17.4 8.9 16 11.7 13.5 16.4 12 21 12 21z" />
    </svg>
  )
}
