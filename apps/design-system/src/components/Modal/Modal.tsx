import { createPortal } from 'react-dom'
import { forwardRef, useEffect } from 'react'
import type { ModalProps, ModalSubComponentProps } from './Modal.types'
import { modalDimmed, modalWrapper, modalHeader, modalBody, modalFooter, modalSidepanelClose } from './Modal.css'
import IconButton from '../IconButton'
import { ExdCloseIcon } from '@port/icon-library'
import cn from 'classnames'

const Modal = ({
  open,
  isOpen,
  onClose,
  className,
  children,
  size = 'md',
  type = 'modal',
  position,
  isClosing,
  portalTarget,
  showDimmed = false,
  showCloseButton = true,
  header,
  footer,
  closeOnOverlay = true,
  closeOnEsc = true,
  bodyClassName,
  ...rest
}: ModalProps) => {
  const resolvedOpen = isOpen ?? open ?? false
  const isSidePanel = type === 'sidepanel'
  const shouldShowDimmed = !isSidePanel || showDimmed
  const shouldShowCloseButton = isSidePanel && showCloseButton
  const isPropMode = header !== undefined || footer !== undefined

  useEffect(() => {
    if (!closeOnEsc || !resolvedOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeOnEsc, resolvedOpen, onClose])

  if (!resolvedOpen && !isClosing) return null

  let target: Element | DocumentFragment = document.querySelector('[data-solution]') || document.body
  if (portalTarget) {
    target = typeof portalTarget === 'function' ? portalTarget() : portalTarget
  }

  return createPortal(
    <>
      {shouldShowDimmed && (
        <div className={cn(modalDimmed, 'modal-dimmed')} onClick={closeOnOverlay ? onClose : undefined} />
      )}
      <div
        className={cn(modalWrapper, 'modal-wrapper', className, `modal-size-${size}`, {
          'modal-open': resolvedOpen && !isClosing,
          'modal-sidepanel': isSidePanel,
          [`sidepanel-${position}`]: isSidePanel && !!position,
          'is-closing': isClosing,
        })}
        {...rest}
      >
        {shouldShowCloseButton && (
          <IconButton
            className={cn(modalSidepanelClose, 'modal-sidepanel-close')}
            variant="ghost"
            size="sm"
            aria-label="닫기"
            icon={<ExdCloseIcon size={16} />}
            onClick={onClose}
          />
        )}
        {isPropMode ? (
          <>
            {header !== undefined && <Modal.Header>{header}</Modal.Header>}
            <Modal.Body className={bodyClassName}>{children}</Modal.Body>
            {footer !== undefined && <Modal.Footer>{footer}</Modal.Footer>}
          </>
        ) : (
          children
        )}
      </div>
    </>,
    target,
  )
}

Modal.Header = forwardRef<HTMLDivElement, ModalSubComponentProps>(({ className, children, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn(modalHeader, 'modal-header', className)} {...rest}>
      {children}
    </div>
  )
})
Modal.Body = forwardRef<HTMLDivElement, ModalSubComponentProps>(({ className, children, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn(modalBody, className)} {...rest}>
      {children}
    </div>
  )
})
Modal.Footer = forwardRef<HTMLDivElement, ModalSubComponentProps>(({ className, children, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn(modalFooter, className)} {...rest}>
      {children}
    </div>
  )
})

Modal.displayName = 'Modal'
Modal.Header.displayName = 'Modal.Header'
Modal.Body.displayName = 'Modal.Body'
Modal.Footer.displayName = 'Modal.Footer'

export default Modal
