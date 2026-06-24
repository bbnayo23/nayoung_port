import type { ReactNode, HTMLAttributes, MouseEventHandler, CSSProperties } from 'react'
import type { Options } from '@popperjs/core'

type CommonProps = { className?: string; style?: CSSProperties }

export interface PopoverProps extends CommonProps {
  children: ReactNode
  content: ReactNode
  title?: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  arrow?: boolean
  visible?: boolean
  disabled?: boolean
  offset?: [number, number]
  onVisibleChange?: (visible: boolean) => void
  portal?: boolean
  portalTarget?: HTMLElement | (() => HTMLElement)
  popperOptions?: Partial<Options>
  closeOnOutsideClick?: boolean
  onClick?: () => void
  onMouseEnter?: MouseEventHandler<HTMLDivElement>
  onMouseLeave?: MouseEventHandler<HTMLDivElement>
  closeButton?: boolean
  contentWrapperProps?: Omit<HTMLAttributes<HTMLDivElement>, 'className'>
}
