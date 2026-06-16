import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type KeyboardEvent,
  type LiHTMLAttributes,
  type ReactNode,
  type RefAttributes,
  type RefObject,
} from 'react'
import { cx } from '../../utils/cx'
import * as styles from './Select.css'
import type { SelectSize } from './Select.css'

export type { SelectSize }

interface OptionMeta {
  value: string
  label: string
  disabled: boolean
}

interface SelectContextValue {
  /** 드롭다운 열림 여부 */
  open: boolean
  /** 드롭다운 열기/닫기 */
  setOpen: (open: boolean) => void
  /** 현재 선택값 */
  value: string | undefined
  /** 값 선택 (state + onValueChange 갱신, 드롭다운 닫기) */
  selectValue: (value: string) => void
  /** 크기 */
  size: SelectSize
  /** placeholder */
  placeholder: string | undefined
  /** 비활성화 여부 */
  disabled: boolean
  /** 옵션이 자신의 라벨/비활성 상태를 등록 (Trigger 라벨 표시 + 키보드 내비게이션용) */
  registerOption: (meta: OptionMeta) => void
  /** 옵션 등록 해제 */
  unregisterOption: (value: string) => void
  /** value 로 라벨 조회 */
  getLabel: (value: string) => string | undefined
  /** 현재 키보드 하이라이트 인덱스 (등록 순서 기준) */
  highlightedIndex: number
  /** 하이라이트 인덱스 직접 지정 */
  setHighlightedIndex: (index: number) => void
  /** 활성화된 옵션 목록 (등록 순서) */
  options: OptionMeta[]
  /** id prefix */
  baseId: string
  /** Trigger 엘리먼트 ref (포커스 복귀용) */
  triggerRef: RefObject<HTMLButtonElement | null>
}

const SelectContext = createContext<SelectContextValue | null>(null)

function useSelectContext(component: string): SelectContextValue {
  const ctx = useContext(SelectContext)
  if (!ctx) {
    throw new Error(`<Select.${component}> 는 <Select> 내부에서만 사용할 수 있습니다.`)
  }
  return ctx
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 제어 모드 선택값 (제공 시 controlled) */
  value?: string
  /** 비제어 모드 초기 선택값 */
  defaultValue?: string
  /** 선택값 변경 콜백 */
  onValueChange?: (value: string) => void
  /** 미선택 시 표시할 placeholder */
  placeholder?: string
  /** 비활성화 */
  disabled?: boolean
  /** 크기 */
  size?: SelectSize
  children?: ReactNode
}

interface SelectComponent
  extends ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLDivElement>> {
  Trigger: typeof SelectTrigger
  Content: typeof SelectContent
  Option: typeof SelectOption
}

/**
 * 커스텀(비네이티브) 셀렉트 컴파운드 컴포넌트.
 *
 * React Context 로 `Select.Trigger` / `Select.Content` / `Select.Option` 이 상태를 공유한다.
 * Option 은 마운트 시 자신의 라벨을 레지스트리에 등록(slot 패턴)해 Trigger 가 선택값 라벨을
 * 표시할 수 있게 한다. `value` 를 주면 controlled, 안 주면 `defaultValue` 기반 uncontrolled.
 *
 * 접근성: Trigger 는 role="combobox"(aria-haspopup="listbox"/aria-expanded), Content 는
 * role="listbox", Option 은 role="option"(aria-selected). 키보드는 ArrowUp/Down 으로 하이라이트
 * 이동, Enter 로 선택, Escape 로 닫기를 지원한다. 바깥 클릭/Escape 시 닫힌다.
 */
const SelectRoot = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    value,
    defaultValue,
    onValueChange,
    placeholder,
    disabled = false,
    size = 'md',
    className,
    children,
    ...rest
  },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : uncontrolledValue

  const [open, setOpenState] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [registry, setRegistry] = useState<OptionMeta[]>([])
  const baseId = useId()
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const options = useMemo(() => registry.filter((o) => !o.disabled), [registry])

  const setOpen = useCallback((next: boolean) => {
    setOpenState(next)
  }, [])

  const selectValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
      setOpenState(false)
      triggerRef.current?.focus()
    },
    [isControlled, onValueChange],
  )

  const registerOption = useCallback((meta: OptionMeta) => {
    setRegistry((prev) => {
      const idx = prev.findIndex((o) => o.value === meta.value)
      if (idx >= 0) {
        if (prev[idx].label === meta.label && prev[idx].disabled === meta.disabled) return prev
        const next = prev.slice()
        next[idx] = meta
        return next
      }
      return [...prev, meta]
    })
  }, [])

  const unregisterOption = useCallback((val: string) => {
    setRegistry((prev) => prev.filter((o) => o.value !== val))
  }, [])

  const getLabel = useCallback(
    (val: string) => registry.find((o) => o.value === val)?.label,
    [registry],
  )

  // 열릴 때 현재 선택값(혹은 첫 옵션)으로 하이라이트 초기화
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHighlightedIndex(-1)
      return
    }
    const selectedIdx = options.findIndex((o) => o.value === currentValue)
    setHighlightedIndex(selectedIdx >= 0 ? selectedIdx : options.length > 0 ? 0 : -1)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const ctx = useMemo<SelectContextValue>(
    () => ({
      open,
      setOpen,
      value: currentValue,
      selectValue,
      size,
      placeholder,
      disabled,
      registerOption,
      unregisterOption,
      getLabel,
      highlightedIndex,
      setHighlightedIndex,
      options,
      baseId,
      triggerRef,
    }),
    [
      open,
      setOpen,
      currentValue,
      selectValue,
      size,
      placeholder,
      disabled,
      registerOption,
      unregisterOption,
      getLabel,
      highlightedIndex,
      options,
      baseId,
    ],
  )

  return (
    <SelectContext.Provider value={ctx}>
      <div ref={ref} className={cx(styles.root, className)} {...rest}>
        {children}
      </div>
    </SelectContext.Provider>
  )
})

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.5 8.5l3 3 6-6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** 하이라이트 인덱스를 키보드로 이동시키는 공통 핸들러 */
function useListboxKeyboard() {
  const { open, setOpen, options, highlightedIndex, setHighlightedIndex, selectValue, triggerRef } =
    useSelectContext('internal')

  return useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          if (!open) {
            setOpen(true)
            return
          }
          setHighlightedIndex(
            highlightedIndex < options.length - 1 ? highlightedIndex + 1 : 0,
          )
          break
        case 'ArrowUp':
          event.preventDefault()
          if (!open) {
            setOpen(true)
            return
          }
          setHighlightedIndex(
            highlightedIndex > 0 ? highlightedIndex - 1 : options.length - 1,
          )
          break
        case 'Home':
          if (open) {
            event.preventDefault()
            setHighlightedIndex(0)
          }
          break
        case 'End':
          if (open) {
            event.preventDefault()
            setHighlightedIndex(options.length - 1)
          }
          break
        case 'Enter':
        case ' ':
          if (open) {
            event.preventDefault()
            const opt = options[highlightedIndex]
            if (opt) selectValue(opt.value)
          } else {
            event.preventDefault()
            setOpen(true)
          }
          break
        case 'Escape':
          if (open) {
            event.preventDefault()
            setOpen(false)
            triggerRef.current?.focus()
          }
          break
      }
    },
    [open, setOpen, options, highlightedIndex, setHighlightedIndex, selectValue, triggerRef],
  )
}

export interface SelectTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  children?: ReactNode
}

/**
 * 셀렉트 트리거 (role="combobox").
 *
 * 선택된 옵션의 라벨(레지스트리 조회) 또는 placeholder(muted)를 표시한다. 우측 chevron(SVG,
 * aria-hidden)이 열림 시 회전한다.
 *
 * 접근성: `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls` 로 리스트박스와 연결되며,
 * 클릭/Space/Enter 로 토글, 화살표 키로 열기+하이라이트 이동을 한다. focus ring 제공.
 */
const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  { className, children, onClick, onKeyDown, ...rest },
  ref,
) {
  const ctx = useSelectContext('Trigger')
  const { open, setOpen, value, size, placeholder, disabled, getLabel, baseId, triggerRef } = ctx
  const onKeyboard = useListboxKeyboard()

  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref, triggerRef],
  )

  const selectedLabel = value !== undefined ? getLabel(value) : undefined
  const displayLabel = selectedLabel ?? (children as ReactNode)
  const showPlaceholder = selectedLabel === undefined && !children

  return (
    <button
      ref={setRefs}
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={`${baseId}-listbox`}
      disabled={disabled}
      className={cx(styles.trigger, styles.triggerSizes[size], className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !disabled) setOpen(!open)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (!event.defaultPrevented && !disabled) onKeyboard(event)
      }}
      {...rest}
    >
      <span className={cx(styles.value, showPlaceholder && styles.placeholder)}>
        {showPlaceholder ? placeholder : displayLabel}
      </span>
      <span className={cx(styles.chevron, open && styles.chevronOpen)}>
        <ChevronIcon />
      </span>
    </button>
  )
})

export interface SelectContentProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode
}

/**
 * 드롭다운 리스트박스 (role="listbox").
 *
 * 트리거 바로 아래에 절대 위치로 띄운다. 열려 있을 때만 렌더링되며, 바깥 영역 mousedown 또는
 * Escape 키로 닫힌다.
 */
const SelectContent = forwardRef<HTMLUListElement, SelectContentProps>(function SelectContent(
  { className, children, onKeyDown, ...rest },
  ref,
) {
  const ctx = useSelectContext('Content')
  const { open, setOpen, baseId, triggerRef } = ctx
  const onKeyboard = useListboxKeyboard()
  const innerRef = useRef<HTMLUListElement | null>(null)

  const setRefs = useCallback(
    (node: HTMLUListElement | null) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  // 바깥 클릭 시 닫기 (트리거 클릭은 토글이 처리하므로 제외)
  useEffect(() => {
    if (!open) return
    const handlePointer = (event: MouseEvent) => {
      const target = event.target as Node
      if (innerRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handlePointer)
    return () => document.removeEventListener('mousedown', handlePointer)
  }, [open, setOpen, triggerRef])

  if (!open) return null

  return (
    <ul
      ref={setRefs}
      id={`${baseId}-listbox`}
      role="listbox"
      tabIndex={-1}
      className={cx(styles.content, className)}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (!event.defaultPrevented) onKeyboard(event)
      }}
      {...rest}
    >
      {children}
    </ul>
  )
})

export interface SelectOptionProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'value'> {
  /** 이 옵션의 값 */
  value: string
  /** 비활성화 — 선택/하이라이트 대상에서 제외 */
  disabled?: boolean
  children?: ReactNode
}

/**
 * 셀렉트 옵션 (role="option").
 *
 * 마운트 시 children 텍스트를 라벨로 레지스트리에 등록(slot 패턴)해 Trigger 가 선택값을 표시할 수
 * 있게 한다. 클릭 시 선택 + 닫기. 선택 상태면 체크마크(SVG)를 표시하고, hover/키보드 하이라이트 시
 * 배경이 강조된다.
 *
 * 접근성: `aria-selected`, 비활성 시 `aria-disabled`. 키보드 하이라이트는 Content/Trigger 가 관리한다.
 */
const SelectOption = forwardRef<HTMLLIElement, SelectOptionProps>(function SelectOption(
  { value, disabled = false, className, children, onMouseEnter, onClick, ...rest },
  ref,
) {
  const ctx = useSelectContext('Option')
  const {
    value: selectedValue,
    selectValue,
    registerOption,
    unregisterOption,
    options,
    highlightedIndex,
    setHighlightedIndex,
    baseId,
  } = ctx

  const isSelected = selectedValue === value
  const label = typeof children === 'string' ? children : String(children ?? value)

  useEffect(() => {
    registerOption({ value, label, disabled })
    return () => unregisterOption(value)
  }, [value, label, disabled, registerOption, unregisterOption])

  // 활성 옵션 목록에서의 위치 (하이라이트 비교용)
  const optionIndex = options.findIndex((o) => o.value === value)
  const isHighlighted = !disabled && optionIndex >= 0 && optionIndex === highlightedIndex

  return (
    <li
      ref={ref}
      id={`${baseId}-option-${value}`}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      className={cx(
        styles.option,
        isHighlighted && styles.optionHighlighted,
        isSelected && styles.optionSelected,
        className,
      )}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
        if (!disabled && optionIndex >= 0) setHighlightedIndex(optionIndex)
      }}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !disabled) selectValue(value)
      }}
      {...rest}
    >
      <span>{children}</span>
      {isSelected ? (
        <span className={styles.check}>
          <CheckIcon />
        </span>
      ) : null}
    </li>
  )
})

SelectRoot.displayName = 'Select'
SelectTrigger.displayName = 'Select.Trigger'
SelectContent.displayName = 'Select.Content'
SelectOption.displayName = 'Select.Option'

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Option: SelectOption,
}) as SelectComponent
