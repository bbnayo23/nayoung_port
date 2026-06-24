import type { ReactNode, HTMLAttributes } from 'react'
import type { Placement, Options } from '@popperjs/core'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  portal?: boolean
  portalTarget?: HTMLElement | (() => HTMLElement)
  content: ReactNode
  children: ReactNode
  placement?: Placement
  open?: boolean
  onOpen?: () => void
  onClose?: () => void
  onChangeShow?: (show: boolean) => void
  popperOptions?: Partial<Options>
}
