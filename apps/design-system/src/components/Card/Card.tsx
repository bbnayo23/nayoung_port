import { forwardRef } from 'react'
import type { PropsWithChildren, HTMLAttributes } from 'react'
import type { CardProps } from './Card.types'
import { styledCard, styledCardHeader, styledCardBody, styledCardImage, styledCardFooter } from './Card.css'
import cn from 'classnames'

const Card = forwardRef<HTMLDivElement, PropsWithChildren<CardProps>>(
  (
    {
      className,
      style,
      children,
      title,
      action,
      disabled = false,
      onClick,
      size,
      density = 'default',
      isActive,
      hoverable,
      noPadding = false,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    if (variant === 'old-exd') {
      return (
        <div ref={ref} className={cn(styledCard, 'variant-old-exd', className)} style={style} {...props}>
          {(title || action) && (
            <div className="card-header">
              <span className="card-header-star" aria-hidden="true">
                &#9733;
              </span>
              <span className="card-header-title">{title}</span>
              {action}
            </div>
          )}
          <div className="card-body">{children}</div>
        </div>
      )
    }

    if (variant === 'neo') {
      return (
        <div ref={ref} className={cn(styledCard, 'variant-neo', className)} style={style} {...props}>
          <div className="card-neo-accent" aria-hidden="true" />
          {(title || action) && (
            <div className="card-header">
              <span>{title}</span>
              {action}
            </div>
          )}
          <div className="card-body">{children}</div>
        </div>
      )
    }

    const isHoverable = hoverable ?? !!onClick
    return (
      <div
        ref={ref}
        className={cn(
          styledCard,
          'card-wrapper',
          isActive && 'is-active',
          disabled && 'is-disabled',
          density === 'compact' && 'card-compact',
          !!onClick && !disabled && 'card-clickable',
          isHoverable && !disabled && 'card-hoverable',
          noPadding && 'card-no-padding',
          variant === 'section' && 'card-section',
          size && `card-${size}`,
          className,
        )}
        style={style}
        onClick={onClick}
        {...props}
      >
        {(title || action) && (
          <div className={cn(styledCardHeader, 'card-header')}>
            <span>{title}</span>
            {action}
          </div>
        )}
        {children}
      </div>
    )
  },
)

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styledCardHeader, 'card-header', className)} {...props}>
      {children}
    </div>
  ),
)

const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styledCardBody, 'card-body', className)} {...props}>
      {children}
    </div>
  ),
)

const CardImage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styledCardImage, 'card-image', className)} {...props}>
      {children}
    </div>
  ),
)

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styledCardFooter, 'card-footer', className)} {...props}>
      {children}
    </div>
  ),
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardImage.displayName = 'CardImage'
CardFooter.displayName = 'CardFooter'

const CardWithSections = Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Image: CardImage,
  Footer: CardFooter,
})

export default CardWithSections
