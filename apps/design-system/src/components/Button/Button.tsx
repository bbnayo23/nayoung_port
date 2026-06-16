import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { button, type ButtonVariant } from './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  /** 텍스트 앞에 표시할 아이콘 (예: @port/icon-library) */
  icon?: ReactNode
}

export function Button({ variant = 'primary', icon, children, ...props }: ButtonProps) {
  return (
    <button className={button[variant]} {...props}>
      {icon}
      {children}
    </button>
  )
}
