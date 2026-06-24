import type React from 'react'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'danger' | 'ghost' | 'outline' | 'circle'
  icon?: React.ReactNode
  /** 접근성을 위한 필수 레이블 */
  'aria-label': string
}
