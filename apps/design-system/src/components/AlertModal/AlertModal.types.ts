import type {
  ReactNode,
  ReactElement,
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
  CSSProperties,
} from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'confirm'

export interface AlertModalProps extends CommonProps {
  open?: boolean
  onClose?: () => void
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  portalTarget?: Element | DocumentFragment | (() => Element | DocumentFragment)
  closeOnOverlay?: boolean
}

export interface AlertModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  icon?: ReactNode
  type?: AlertType
}

export interface AlertModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode
}

export interface AlertModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  showCancelButton?: boolean
  primaryLabel?: string
  secondaryLabel?: string
  cancelLabel?: string
  confirmVariant?: AlertType
  onPrimary?: () => void
  onSecondary?: () => void
  onCancel?: () => void
}

export type AlertModalComponent = {
  (props: AlertModalProps): ReactElement | null
  displayName?: string
  Header: ForwardRefExoticComponent<AlertModalHeaderProps & RefAttributes<HTMLDivElement>>
  Body: ForwardRefExoticComponent<AlertModalBodyProps & RefAttributes<HTMLDivElement>>
  Footer: ForwardRefExoticComponent<AlertModalFooterProps & RefAttributes<HTMLDivElement>>
}
