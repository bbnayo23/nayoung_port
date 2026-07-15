import { useState, useEffect, useRef, type FC } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import IconButton from '@dc/components/IconButton'
import { ExdCloseIcon } from '@port/icon-library'
import type { PopoverProps } from './Popover.types'
import {
  popoverRoot,
  popoverTrigger,
  popoverContent as popoverContentStyle,
  popoverCloseButton,
  popoverTitle,
  popoverBody,
  popoverArrow,
} from './Popover.css'
import cn from 'classnames'

export const Popover: FC<PopoverProps> = ({
  children,
  content,
  title,
  placement = 'top',
  arrow,
  visible,
  contentWrapperProps,
  disabled = false,
  offset = [0, 8],
  className,
  style,
  onVisibleChange,
  portal = true,
  portalTarget,
  popperOptions,
  closeOnOutsideClick = true,
  onClick,
  closeButton = false,
  ...rest
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)

  // portal 사용 시 fixed, 인라인 렌더 시 absolute
  const strategy = portal ? 'fixed' : 'absolute'

  const { styles, attributes, state } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      { name: 'offset', options: { offset } },
      { name: 'preventOverflow', options: { padding: 8 } },
      { name: 'flip', options: { fallbackPlacements: ['top', 'bottom', 'left', 'right'] } },
    ],
    strategy,
    ...popperOptions,
  })

  // 최신 콜백을 ref로 유지해 effect deps를 안정화 (ref 쓰기는 render 중이 아닌 effect 에서)
  const onVisibleChangeRef = useRef(onVisibleChange)
  useEffect(() => {
    onVisibleChangeRef.current = onVisibleChange
  })

  useEffect(() => {
    if (!visible || !closeOnOutsideClick) return

    const handleOutsideClick = (event: MouseEvent) => {
      if (referenceElement?.contains(event.target as Node) || popperElement?.contains(event.target as Node)) return
      onVisibleChangeRef.current?.(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [visible, closeOnOutsideClick, referenceElement, popperElement])

  const arrowPlacement = state?.placement?.split('-')[0] ?? placement

  const portalContainer = portalTarget
    ? typeof portalTarget === 'function'
      ? portalTarget()
      : portalTarget
    : ((referenceElement?.closest('[data-solution]') as HTMLElement | null) ?? document.body)

  const popoverNode = visible && (
    <div
      ref={setPopperElement}
      className={cn(popoverContentStyle, 'popover-content', { 'has-close-button': closeButton }, className)}
      style={{ ...styles.popper, ...style }}
      {...attributes.popper}
      {...contentWrapperProps}
    >
      {closeButton && (
        <div className={popoverCloseButton}>
          <IconButton
            icon={<ExdCloseIcon size={14} />}
            variant="ghost"
            size="sm"
            aria-label="닫기"
            onClick={() => onVisibleChange?.(false)}
            className="popover-close-button"
          />
        </div>
      )}
      {title && <div className={cn(popoverTitle, 'popover-title')}>{title}</div>}
      <div className={cn(popoverBody, 'popover-body')}>{content}</div>
      {arrow && (
        <div
          ref={setArrowElement}
          className={cn(popoverArrow, 'popover-arrow', arrowPlacement)}
          style={styles.arrow}
          {...attributes.arrow}
        />
      )}
    </div>
  )

  return (
    <div className={popoverRoot}>
      <div
        ref={setReferenceElement}
        className={cn(popoverTrigger, 'popover-trigger', { 'is-disabled': disabled })}
        onClick={onClick}
        {...rest}
      >
        {children}
      </div>
      {visible && !disabled && (portal ? createPortal(popoverNode, portalContainer) : popoverNode)}
    </div>
  )
}

export default Popover
