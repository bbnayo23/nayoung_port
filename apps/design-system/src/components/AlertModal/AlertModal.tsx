import { forwardRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../Button'
import {
  alertModalRoot,
  alertModalDimmed,
  alertModal,
  alertModalSm,
  alertModalMd,
  alertModalLg,
  alertModalHeader,
  alertModalHeaderInfo,
  alertModalHeaderSuccess,
  alertModalHeaderWarning,
  alertModalHeaderError,
  alertModalHeaderConfirm,
  alertModalIcon,
  alertModalTitle,
  alertModalBody,
  alertModalContent,
  alertModalFooter,
  alertModalButtons,
} from './AlertModal.css'
import type {
  AlertModalProps,
  AlertModalHeaderProps,
  AlertModalBodyProps,
  AlertModalFooterProps,
  AlertModalComponent,
} from './AlertModal.types'
import cn from 'classnames'

const SIZE_CLASS = {
  sm: alertModalSm,
  md: alertModalMd,
  lg: alertModalLg,
} as const

const HEADER_VARIANT_CLASS = {
  info: alertModalHeaderInfo,
  success: alertModalHeaderSuccess,
  warning: alertModalHeaderWarning,
  error: alertModalHeaderError,
  confirm: alertModalHeaderConfirm,
} as const

const CONFIRM_VARIANT_MAP: Record<string, 'primary' | 'danger'> = {
  info: 'primary',
  success: 'primary',
  warning: 'primary',
  error: 'danger',
  confirm: 'primary',
}

const AlertModal = ({
  open = false,
  onClose,
  className,
  children,
  size = 'sm',
  portalTarget,
  closeOnOverlay = true,
}: AlertModalProps) => {
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [open])

  if (!open) return null

  let target: Element | DocumentFragment = document.body
  if (portalTarget) {
    target = typeof portalTarget === 'function' ? portalTarget() : portalTarget
  }

  return createPortal(
    <div className={alertModalRoot}>
      <div className={alertModalDimmed} onClick={closeOnOverlay ? onClose : undefined} />
      <div className={cn(alertModal, SIZE_CLASS[size], className)}>{children}</div>
    </div>,
    target,
  )
}

AlertModal.displayName = 'AlertModal'

const AlertModalHeader = forwardRef<HTMLDivElement, AlertModalHeaderProps>(
  ({ className, children, title, icon, type = 'info', ...props }, ref) => (
    <div ref={ref} className={cn(alertModalHeader, HEADER_VARIANT_CLASS[type], className)} {...props}>
      {icon && <div className={alertModalIcon}>{icon}</div>}
      {title && <h3 className={alertModalTitle}>{title}</h3>}
      {children}
    </div>
  ),
)
AlertModalHeader.displayName = 'AlertModal.Header'

const AlertModalBody = forwardRef<HTMLDivElement, AlertModalBodyProps>(
  ({ className, children, description, ...props }, ref) => (
    <div ref={ref} className={cn(alertModalBody, className)} {...props}>
      <div className={alertModalContent}>
        {description && <p>{description}</p>}
        {children}
      </div>
    </div>
  ),
)
AlertModalBody.displayName = 'AlertModal.Body'

const AlertModalFooter = forwardRef<HTMLDivElement, AlertModalFooterProps>(
  (
    {
      className,
      children,
      showCancelButton = false,
      primaryLabel = 'OK',
      secondaryLabel,
      cancelLabel = 'Cancel',
      confirmVariant = 'info',
      onPrimary,
      onSecondary,
      onCancel,
      ...props
    },
    ref,
  ) => {
    const buttonVariant = CONFIRM_VARIANT_MAP[confirmVariant] ?? 'primary'
    return (
      <div ref={ref} className={cn(alertModalFooter, className)} {...props}>
        {children ?? (
          <div className={alertModalButtons}>
            {showCancelButton && (
              <Button variant="secondary" size="md" onClick={onCancel}>
                {cancelLabel}
              </Button>
            )}
            {secondaryLabel && (
              <Button variant="secondary" size="md" onClick={onSecondary}>
                {secondaryLabel}
              </Button>
            )}
            <Button variant={buttonVariant} size="md" onClick={onPrimary}>
              {primaryLabel}
            </Button>
          </div>
        )}
      </div>
    )
  },
)
AlertModalFooter.displayName = 'AlertModal.Footer'

;(AlertModal as AlertModalComponent).Header = AlertModalHeader
;(AlertModal as AlertModalComponent).Body = AlertModalBody
;(AlertModal as AlertModalComponent).Footer = AlertModalFooter

export default AlertModal as AlertModalComponent
