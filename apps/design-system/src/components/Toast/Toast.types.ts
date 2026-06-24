import type { ReactNode, ComponentProps, CSSProperties } from 'react'
import type { Toaster as SonnerToaster } from 'sonner'

type CommonProps = { className?: string; style?: CSSProperties }

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'

export interface ToastProps extends CommonProps {
  variant?: ToastVariant
  title?: string
  message?: string
  showCloseButton?: boolean
  duration?: number
  position?: ToastPosition
  onClose?: () => void
  icon?: ReactNode
  action?: ReactNode
  isClosing?: boolean
  children?: ReactNode
}

export interface ToastCallOptions {
  message?: string
  duration?: number
  action?: ReactNode
  icon?: ReactNode
}

export type ToasterProps = ComponentProps<typeof SonnerToaster>
