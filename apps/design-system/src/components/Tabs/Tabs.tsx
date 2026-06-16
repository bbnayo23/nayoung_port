import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type RefAttributes,
} from 'react'
import { cx } from '../../utils/cx'
import * as styles from './Tabs.css'
import type { TabsVariant } from './Tabs.css'

export type { TabsVariant }

interface TabsContextValue {
  /** 현재 활성 탭의 value */
  activeValue: string | undefined
  /** 탭 활성화 (uncontrolled 내부 state + onValueChange 동시 갱신) */
  setValue: (value: string) => void
  /** 시각 variant */
  variant: TabsVariant
  /** id 생성용 prefix (탭/패널 연결) */
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error(`<Tabs.${component}> 는 <Tabs> 내부에서만 사용할 수 있습니다.`)
  }
  return ctx
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 제어 모드 활성 value (제공 시 controlled) */
  value?: string
  /** 비제어 모드 초기 value */
  defaultValue?: string
  /** 활성 탭 변경 콜백 */
  onValueChange?: (value: string) => void
  /** 시각 variant — line(언더라인) | enclosed(박스형) */
  variant?: TabsVariant
  children?: ReactNode
}

interface TabsComponent
  extends ForwardRefExoticComponent<TabsProps & RefAttributes<HTMLDivElement>> {
  List: typeof TabsList
  Trigger: typeof TabsTrigger
  Panel: typeof TabsPanel
}

/**
 * 탭 인터페이스 컴파운드 컴포넌트.
 *
 * React Context 로 `Tabs.List` / `Tabs.Trigger` / `Tabs.Panel` 이 상태를 공유한다.
 * `value` 를 주면 controlled, 안 주면 `defaultValue` 기반 uncontrolled 로 동작한다.
 *
 * 접근성: `Tabs.List` 가 roving tabindex + 화살표/Home/End 키보드 내비게이션을 구현하며,
 * 트리거(role="tab")와 패널(role="tabpanel")이 `aria-controls`/`aria-labelledby` 로 연결된다.
 */
const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, defaultValue, onValueChange, variant = 'line', className, children, ...rest },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue)
  const isControlled = value !== undefined
  const activeValue = isControlled ? value : uncontrolledValue
  const baseId = useId()

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange],
  )

  return (
    <TabsContext.Provider value={{ activeValue, setValue, variant, baseId }}>
      <div ref={ref} className={cx(styles.root, className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  )
})

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /** 키보드 화살표 내비게이션 라벨 (스크린리더용) */
  'aria-label'?: string
  children?: ReactNode
}

/**
 * 탭 트리거 컨테이너 (role="tablist").
 *
 * 접근성: roving tabindex 를 관리한다 — ArrowLeft/ArrowRight 로 활성화 가능한 트리거 사이를
 * 순환 이동(wrap), Home/End 로 처음/끝으로 점프하며, 포커스 이동 시 해당 탭을 즉시 활성화한다.
 */
const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, children, onKeyDown, ...rest },
  ref,
) {
  const { variant } = useTabsContext('List')
  const innerRef = useRef<HTMLDivElement | null>(null)

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return

    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!keys.includes(event.key)) return

    const list = innerRef.current
    if (!list) return

    const triggers = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    )
    if (triggers.length === 0) return

    const currentIndex = triggers.findIndex((t) => t === document.activeElement)
    let nextIndex = currentIndex

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % triggers.length
        break
      case 'ArrowLeft':
        nextIndex =
          currentIndex < 0 ? triggers.length - 1 : (currentIndex - 1 + triggers.length) % triggers.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = triggers.length - 1
        break
    }

    event.preventDefault()
    triggers[nextIndex]?.focus()
  }

  return (
    <div
      ref={setRefs}
      role="tablist"
      className={cx(styles.list[variant], className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  )
})

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 이 트리거가 활성화하는 패널의 value */
  value: string
  /** 비활성화 — 키보드 내비게이션 대상에서 제외 */
  disabled?: boolean
  children?: ReactNode
}

/**
 * 개별 탭 버튼 (role="tab").
 *
 * 접근성: 활성 탭만 `tabIndex=0`(roving tabindex), 나머지는 `-1`. `aria-selected`,
 * `aria-controls` 로 패널과 연결된다. 포커스(키보드 이동) 시 자동 활성화된다.
 */
const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { value, disabled = false, className, children, onClick, onFocus, ...rest },
  ref,
) {
  const { activeValue, setValue, variant, baseId } = useTabsContext('Trigger')
  const isActive = activeValue === value

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={cx(
        styles.trigger,
        variant === 'line' && styles.triggerLine,
        variant === 'line' && isActive && styles.triggerLineActive,
        variant === 'enclosed' && styles.triggerEnclosed,
        variant === 'enclosed' && isActive && styles.triggerEnclosedActive,
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !disabled) setValue(value)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        if (!disabled) setValue(value)
      }}
      {...rest}
    >
      {children}
    </button>
  )
})

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** 이 패널을 활성화하는 트리거의 value */
  value: string
  children?: ReactNode
}

/**
 * 탭 콘텐츠 패널 (role="tabpanel").
 *
 * 접근성: `aria-labelledby` 로 트리거와 연결되고, 비활성 시 `hidden` 으로 제거된다.
 * 활성 패널은 `tabIndex=0` 으로 키보드 포커스를 받을 수 있다.
 */
const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { value, className, children, ...rest },
  ref,
) {
  const { activeValue, baseId } = useTabsContext('Panel')
  const isActive = activeValue === value

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      className={cx(styles.panel, className)}
      {...rest}
    >
      {isActive ? children : null}
    </div>
  )
})

TabsRoot.displayName = 'Tabs'
TabsList.displayName = 'Tabs.List'
TabsTrigger.displayName = 'Tabs.Trigger'
TabsPanel.displayName = 'Tabs.Panel'

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
}) as TabsComponent
