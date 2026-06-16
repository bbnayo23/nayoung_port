import type { ReactNode } from 'react'
import { badge } from './Badge.css'

type BadgeVariant = keyof typeof badge

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span className={badge[variant]}>{children}</span>
}
