import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import { tooltipBox, tooltipArrow } from './Tooltip.css'
import type { TooltipProps } from './Tooltip.types'
import cn from 'classnames'

const OPEN_DELAY = 50
const CLOSE_DELAY = 100

export const Tooltip = ({
  children,
  content,
  placement = 'top',
  open,
  className,
  onOpen,
  onClose,
  onChangeShow: _onChangeShow,
  portal = false,
  portalTarget,
  popperOptions,
  ...rest
}: TooltipProps) => {
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isShow, setIsShow] = useState(false)

  // 콜백 ref — setState로 마운트 시 리렌더를 트리거해야 usePopper가 위치를 계산함
  const [referenceEl, setReferenceEl] = useState<HTMLDivElement | null>(null)
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null)
  const [arrowEl, setArrowEl] = useState<HTMLDivElement | null>(null)

  const { styles, attributes, state } = usePopper(referenceEl, popperEl, {
    placement,
    modifiers: [
      { name: 'arrow', options: { element: arrowEl } },
      { name: 'offset', options: { offset: [0, 8] } },
    ],
    ...popperOptions,
  })

  const handleShow = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
    openTimeoutRef.current = setTimeout(() => {
      if (typeof open === 'boolean') {
        onOpen?.()
        return
      }
      setIsShow(true)
    }, OPEN_DELAY)
  }

  const handleHide = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      if (typeof open === 'boolean') {
        onClose?.()
        return
      }
      setIsShow(false)
    }, CLOSE_DELAY)
  }

  const arrowClass = state?.placement?.split('-')[0] || placement

  const tooltipContent = (
    <div
      ref={setPopperEl}
      className={cn(tooltipBox, 'tooltip-box', { show: isShow || open }, className)}
      style={styles.popper}
      {...attributes.popper}
    >
      {content}
      <div ref={setArrowEl} className={cn(tooltipArrow, arrowClass)} style={styles.arrow} />
    </div>
  )

  const selectTarget = () => {
    if (portalTarget) return typeof portalTarget === 'function' ? portalTarget() : portalTarget
    return document.body
  }

  return (
    <div ref={setReferenceEl} onMouseEnter={handleShow} onMouseLeave={handleHide} {...rest} className="tooltip-wrapper">
      {children}
      {portal ? createPortal(tooltipContent, selectTarget()) : tooltipContent}
    </div>
  )
}

export default Tooltip
