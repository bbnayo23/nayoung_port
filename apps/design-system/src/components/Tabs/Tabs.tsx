import { createContext, useContext, forwardRef, useId, type KeyboardEvent, type MouseEvent } from 'react'
import { tabs, tabsList, tabButtonRecipe, tabContents } from './Tabs.css'
import type { TabsContextProps, TabsProps, TabsListProps, TabProps, TabContentsProps } from './Tabs.types'
import cn from 'classnames'

const TabsContext = createContext<TabsContextProps | null>(null)

export const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component')
  }
  return context
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      onChange,
      size = 'md',
      children,
      style,
      className,
      direction = 'horizontal',
      variant = 'underline',
      ...props
    },
    ref,
  ) => {
    const tabsId = useId().replace(/:/g, '')

    const contextValue: TabsContextProps = {
      activeValue: value ?? '',
      onChange: onChange || (() => {}),
      size,
      direction,
      variant,
      tabsId,
    }

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          style={style}
          className={cn(tabs, 'tabs-wrapper', `tabs-${direction}`, `tabs-${variant}`, className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    )
  },
)
Tabs.displayName = 'Tabs'

const TabsList = ({ children, className, style, ...props }: TabsListProps) => {
  const { size, direction, variant, onChange } = useTabsContext()

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'))
    const idx = buttons.indexOf(document.activeElement as HTMLButtonElement)
    const isHoriz = direction !== 'vertical'

    let next: number
    if (e.key === (isHoriz ? 'ArrowRight' : 'ArrowDown')) next = (idx + 1) % buttons.length
    else if (e.key === (isHoriz ? 'ArrowLeft' : 'ArrowUp')) next = (idx - 1 + buttons.length) % buttons.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = buttons.length - 1
    else return

    e.preventDefault()
    buttons[next]?.focus()
    const nextValue = buttons[next]?.getAttribute('data-value')
    if (nextValue !== null && nextValue !== undefined) onChange(nextValue)
  }

  return (
    <div
      role="tablist"
      aria-orientation={direction}
      className={cn(tabsList, 'tabs-list', `tabs-list-${size}`, `tabs-${direction}`, `tabs-${variant}`, className)}
      style={style}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  )
}
TabsList.displayName = 'TabsList'

export const TabButton = ({
  icon,
  value,
  disabled = false,
  children,
  onClick,
  className,
  style,
  ...props
}: TabProps) => {
  const { activeValue, onChange, variant, tabsId } = useTabsContext()
  const isActive = activeValue === value

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onChange(value)
      onClick?.(e)
    }
  }

  return (
    <button
      type="button"
      id={`tabs-${tabsId}-tab-${value}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabs-${tabsId}-panel-${value}`}
      data-value={value}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      style={style}
      className={cn(tabButtonRecipe({ variant }), 'tab-button', className, {
        'is-active': isActive,
      })}
      {...props}
    >
      {icon && <span className="tab-button-icon">{icon}</span>}
      {children}
    </button>
  )
}
TabButton.displayName = 'TabButton'

const TabContents = forwardRef<HTMLDivElement, TabContentsProps>(
  ({ value, renderMode = 'multiRender', children, className, style, ...props }, ref) => {
    const { activeValue, tabsId } = useTabsContext()
    const isActive = activeValue === value

    if (renderMode === 'singleRender' && !isActive) return null

    return (
      <div
        ref={ref}
        id={`tabs-${tabsId}-panel-${String(value)}`}
        role="tabpanel"
        aria-labelledby={`tabs-${tabsId}-tab-${String(value)}`}
        tabIndex={0}
        className={cn(tabContents, 'tab-contents', className, { 'is-active': isActive })}
        style={style}
        {...props}
      >
        {children}
      </div>
    )
  },
)
TabContents.displayName = 'TabContents'

export default Object.assign(Tabs, {
  List: TabsList,
  Tab: TabButton,
  TabButton: TabButton,
  Contents: TabContents,
})
