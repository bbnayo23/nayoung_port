import { forwardRef, createContext, useContext } from 'react'
import { ExdChevronDownIcon } from '@port/icon-library'
import {
  accordionContainer,
  accordionContainerCard,
  accordionItemWrapper,
  accordionHeader,
  accordionIcon,
  accordionContent,
  accordionOverflowWrapper,
  accordionContentInner,
} from './Accordion.css'
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionContentProps,
  AccordionComponent,
  AccordionContextValue,
  AccordionItemContextValue,
} from './Accordion.types'
import cn from 'classnames'

const AccordionContext = createContext<AccordionContextValue>({ iconDirection: 'right', disabled: false })
const useAccordionContext = () => useContext(AccordionContext)
const AccordionItemContext = createContext<AccordionItemContextValue>({ active: false })
const useAccordionItemContext = () => useContext(AccordionItemContext)

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, iconDirection = 'right', disabled = false, ...props }, ref) => {
    return (
      <AccordionContext.Provider value={{ iconDirection, disabled }}>
        <div ref={ref} className={cn(accordionContainer, accordionContainerCard, className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)

Accordion.displayName = 'Accordion'

const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const { iconDirection } = useAccordionContext()
    const { active } = useAccordionItemContext()
    return (
      <button
        ref={ref}
        className={cn(accordionHeader, 'accordion-header', className)}
        aria-expanded={active}
        {...props}
      >
        {iconDirection === 'left' && (
          <span className={accordionIcon}>
            <ExdChevronDownIcon size={16} />
          </span>
        )}
        {children}
        {iconDirection === 'right' && (
          <span className={accordionIcon}>
            <ExdChevronDownIcon size={16} />
          </span>
        )}
      </button>
    )
  },
)
AccordionHeader.displayName = 'Accordion.Header'

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn(accordionContent, className)} {...props}>
    <div className={accordionOverflowWrapper}>
      <div className={cn(accordionContentInner, 'accordion-content-inner')}>{children}</div>
    </div>
  </div>
))
AccordionContent.displayName = 'Accordion.Content'

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, children, onChange, disabled: itemDisabled = false, active = false, ...props }, ref) => {
    const { disabled: contextDisabled, iconDirection } = useAccordionContext()
    const disabled = contextDisabled || itemDisabled
    return (
      <AccordionItemContext.Provider value={{ active }}>
        <div
          ref={ref}
          className={cn(accordionItemWrapper, className, active && 'active', disabled && 'disabled')}
          data-icon-direction={iconDirection}
          data-disabled={disabled}
          onClick={(e) => {
            const button = (e.target as HTMLElement).closest(`button.${accordionHeader}`)
            if (button && !disabled) {
              onChange?.(!active)
            }
          }}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  },
)
AccordionItem.displayName = 'Accordion.Item'

;(Accordion as AccordionComponent).Item = AccordionItem
;(Accordion as AccordionComponent).Header = AccordionHeader
;(Accordion as AccordionComponent).Content = AccordionContent

export default Accordion as AccordionComponent
