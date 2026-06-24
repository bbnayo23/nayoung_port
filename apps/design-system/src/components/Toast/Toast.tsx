import { forwardRef, useEffect, type CSSProperties } from 'react'
import { toast as sonnerToast, Toaster as SonnerToaster } from 'sonner'
import { toastWrapper, toastProgressBar, toastDurationVar } from './Toast.css'
import type { ToastProps, ToastCallOptions, ToasterProps } from './Toast.types'
import {
  ExdCloseIcon,
  ExdCircleCheckFillIcon,
  ExdErrorIcon,
  ExdInfoIcon,
  ExdExclamationTriangleIcon,
} from '@port/icon-library'
import cn from 'classnames'

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'success',
      position,
      showCloseButton = true,
      title,
      message,
      onClose,
      icon,
      action,
      isClosing,
      duration = 3000,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isSnackbar = duration === 0

    const variantIcon = (() => {
      switch (variant) {
        case 'success':
          return <ExdCircleCheckFillIcon size={20} />
        case 'error':
          return <ExdErrorIcon size={20} />
        case 'warning':
          return <ExdExclamationTriangleIcon size={20} />
        default:
          return <ExdInfoIcon size={20} />
      }
    })()

    const displayIcon = icon ?? variantIcon

    useEffect(() => {
      if (duration > 0 && onClose) {
        const timer = setTimeout(onClose, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, onClose])

    return (
      <div
        className={cn(
          toastWrapper,
          'toast-wrapper',
          `toast-${variant}`,
          position && `toast-${position}`,
          { 'is-closing': isClosing, 'is-snackbar': isSnackbar },
          className,
        )}
        style={{ ...style, [toastDurationVar]: `${duration}ms` } as CSSProperties}
        {...props}
        ref={ref}
      >
        {displayIcon && <div className="toast-icon">{displayIcon}</div>}

        <div className="toast-content">
          {title && <div className="toast-title">{title}</div>}
          {message && <div className="toast-message">{message}</div>}
          {children}
        </div>

        {action && <div className="toast-action">{action}</div>}

        {showCloseButton && onClose && (
          <button className="toast-close" onClick={onClose} type="button">
            <ExdCloseIcon size={10} />
          </button>
        )}

        {!isSnackbar && <div className={toastProgressBar} />}
      </div>
    )
  },
)

Toast.displayName = 'Toast'

export const Toaster = ({ position = 'top-right', ...props }: ToasterProps) => (
  <SonnerToaster position={position} {...props} />
)

const createToast =
  (variant: NonNullable<ToastProps['variant']>) =>
  (title: string, opts: ToastCallOptions = {}) => {
    const { message, duration = 4000, action, icon } = opts
    return sonnerToast.custom(
      (id) => (
        <Toast
          variant={variant}
          title={title}
          message={message}
          action={action}
          icon={icon}
          duration={0}
          showCloseButton
          onClose={() => sonnerToast.dismiss(id)}
        />
      ),
      { duration },
    )
  }

export const toast = {
  success: createToast('success'),
  error: createToast('error'),
  info: createToast('info'),
  warning: createToast('warning'),
}

export default Toast
