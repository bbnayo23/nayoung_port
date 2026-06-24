import type { ReactNode, RefObject, Ref } from 'react'

export interface PortalProps {
  children: ReactNode
  triggerRef: RefObject<HTMLElement | null>
  panelRef?: Ref<HTMLDivElement>
  isOpen: boolean
  onClose?: () => void
  placement?: 'bottom' | 'top'
}
