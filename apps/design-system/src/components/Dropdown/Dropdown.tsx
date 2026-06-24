import {
  forwardRef,
  useMemo,
  useState,
  useCallback,
  type CSSProperties,
  type ReactNode,
  type MouseEvent,
  type MutableRefObject,
} from 'react'
import Select, {
  type StylesConfig,
  type GroupBase,
  type MultiValue,
  type SingleValue,
  type OptionProps,
  type MultiValueProps,
  type PlaceholderProps,
  type MenuListProps,
  type MenuProps,
  type SelectComponentsConfig,
  components as rsComponents,
} from 'react-select'
import type { DropdownProps, DropdownSingleProps, DropdownMultiProps } from './Dropdown.types'
import {
  dropdownWrapper,
  dropdownContainer,
  dropdownLabel,
  dropdownSelectAll,
  dropdownSelectAllContent,
  dropdownCountBadge,
  dropdownResetBtn,
  dropdownResetRow,
  dropdownDivider,
  multiValueBadge,
} from './Dropdown.css'
import { buildDropdownStyles } from './Dropdown.styles'
import Checkbox from '../Checkbox'
import Badge from '../Badge'

type RSOption = { value: string; label: string; isDisabled?: boolean; variant?: string; isDivider?: boolean }

// ── SelectAll MenuList (전체 선택 행 포함) ────────────────────────────────────

const SelectAllMenuList = (props: MenuListProps<RSOption, true, GroupBase<RSOption>>) => {
  const selectProps = props.selectProps as typeof props.selectProps & {
    _allSelected?: boolean
    _someSelected?: boolean
    _onToggleAll?: () => void
    _selectedCount?: number
    _onReset?: () => void
  }
  const { _allSelected = false, _someSelected = false, _onToggleAll, _selectedCount = 0, _onReset } = selectProps
  const hasSelection = _selectedCount > 0
  return (
    <rsComponents.MenuList {...props}>
      <div className={dropdownSelectAll}>
        <div className={dropdownSelectAllContent} onClick={_onToggleAll}>
          <Checkbox checked={_allSelected} indeterminate={_someSelected && !_allSelected} onChange={() => {}} />
          <span>전체</span>
          {hasSelection && <span className={dropdownCountBadge}>{_selectedCount}</span>}
        </div>
        {_onReset && hasSelection && (
          <button
            type="button"
            className={dropdownResetBtn}
            onClick={(e) => {
              e.stopPropagation()
              _onReset()
            }}
          >
            초기화
          </button>
        )}
      </div>
      {props.children}
    </rsComponents.MenuList>
  )
}

const ResetMenuList = (props: MenuListProps<RSOption, true, GroupBase<RSOption>>) => {
  const selectProps = props.selectProps as typeof props.selectProps & {
    _selectedCount?: number
    _onReset?: () => void
  }
  const { _selectedCount = 0, _onReset } = selectProps
  return (
    <rsComponents.MenuList {...props}>
      {_onReset && _selectedCount > 0 && (
        <div className={dropdownResetRow}>
          <button type="button" className={dropdownResetBtn} onClick={_onReset}>
            초기화
          </button>
        </div>
      )}
      {props.children}
    </rsComponents.MenuList>
  )
}

// ── Multi 옵션 렌더러 ────────────────────────────────────────────────────────

const CheckboxOption = (props: OptionProps<RSOption, true, GroupBase<RSOption>>) => {
  if (props.data.isDivider) return <div className={dropdownDivider} />
  return (
    <rsComponents.Option {...props}>
      <Checkbox checked={props.isSelected} onChange={() => {}} />
      <span>{props.label}</span>
    </rsComponents.Option>
  )
}

const SingleOption = (props: OptionProps<RSOption, false, GroupBase<RSOption>>) => {
  if (props.data.isDivider) return <div className={dropdownDivider} />
  return <rsComponents.Option {...props} />
}

const TagMultiValue = (props: MultiValueProps<RSOption, true, GroupBase<RSOption>>) => (
  <Badge size="sm" variant="tag" color={props.data.variant} className={multiValueBadge}>
    {props.data.label}
  </Badge>
)

const TagClosableMultiValue = (props: MultiValueProps<RSOption, true, GroupBase<RSOption>>) => (
  <Badge
    size="sm"
    variant="tag"
    color={props.data.variant}
    closable
    onRemove={() => {
      props.removeProps.onClick?.({} as MouseEvent<HTMLDivElement>)
    }}
    className={multiValueBadge}
  >
    {props.data.label}
  </Badge>
)

const createMultiPlaceholder = (displayMode: 'count' | 'values') => {
  const MultiPlaceholder = (props: PlaceholderProps<RSOption, true, GroupBase<RSOption>>) => {
    const selected = (props.selectProps.value ?? []) as RSOption[]
    const allOptions = (props.selectProps.options ?? []) as RSOption[]

    let text: string
    if (selected.length === 0) text = String(props.selectProps.placeholder ?? '선택')
    else if (selected.length === allOptions.length) text = '전체'
    else if (displayMode === 'values') text = selected.map((o) => o.label).join(', ')
    else if (selected.length === 1) text = selected[0]?.label ?? ''
    else text = `${selected.length}개 선택`

    const hasValue = selected.length > 0
    return (
      <div
        {...props.innerProps}
        style={{
          ...props.innerProps?.style,
          color: hasValue
            ? 'var(--dropdown-text, var(--color-text-primary))'
            : 'var(--dropdown-placeholder-text, var(--color-text-disabled))',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          position: 'absolute',
          maxWidth: 'calc(100% - 8px)',
        }}
        title={displayMode === 'values' && hasValue ? text : undefined}
      >
        {text}
      </div>
    )
  }
  MultiPlaceholder.displayName = 'MultiPlaceholder'
  return MultiPlaceholder
}

// ── Wrapper 공통 렌더링 ──────────────────────────────────────────────────────

const DropdownShell = forwardRef<
  HTMLDivElement,
  {
    label?: string
    className?: string
    style?: CSSProperties
    children: ReactNode
    size?: 'sm' | 'md' | 'lg'
  }
>(({ label, className, style, children, size = 'md' }, ref) => {
  const cls = label ? dropdownWrapper : dropdownContainer
  return (
    <div ref={ref} className={`${cls} dropdown-${size}${className ? ` ${className}` : ''}`} style={style}>
      {label && <label className={dropdownLabel}>{label}</label>}
      {children}
    </div>
  )
})
DropdownShell.displayName = 'DropdownShell'

// ── Dropdown Component ───────────────────────────────────────────────────────

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const {
    options,
    placeholder = '선택',
    label,
    size = 'md',
    disabled = false,
    className,
    style,
    width,
    forceOpen = false,
    searchable,
    placement,
    maxWidth,
    renderPanel,
  } = props

  const mergedStyle = useMemo(() => {
    const base = { ...style } as CSSProperties
    if (width) {
      const w = typeof width === 'number' ? `${width}px` : width
      ;(base as Record<string, unknown>)['--dropdown-width'] = w
      base.width = w
    }
    if (maxWidth) {
      base.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth
    }
    return Object.keys(base).length === 0 ? style : base
  }, [style, width, maxWidth])

  const [panelOpen, setPanelOpen] = useState(false)

  const isMulti = !!props.multiSelect

  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)
  const wrapperRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        setPortalTarget((node.closest('[data-solution]') as HTMLElement) || document.body)
      }
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node
    },
    [ref],
  )

  const rsOptions: RSOption[] = useMemo(
    () =>
      options.map((o) => ({
        value: o.value,
        label: o.label,
        isDisabled: o.disabled || o.isDivider,
        variant: o.variant,
        isDivider: o.isDivider,
      })),
    [options],
  )

  const selectableRsOptions = useMemo(() => rsOptions.filter((o) => !o.isDivider), [rsOptions])
  const isTagsMode =
    isMulti &&
    'multiDisplayMode' in props &&
    (props.multiDisplayMode === 'tags' || props.multiDisplayMode === 'tags-closable')
  const styles = useMemo(
    () => buildDropdownStyles(size, !!label, isMulti, isTagsMode),
    [size, label, isMulti, isTagsMode],
  )

  const renderPanelMenuComponent = useMemo(() => {
    if (!renderPanel) return undefined
    const RenderPanelMenu = (menuProps: MenuProps<RSOption, boolean, GroupBase<RSOption>>) => (
      <rsComponents.Menu {...menuProps}>{renderPanel(() => setPanelOpen(false))}</rsComponents.Menu>
    )
    RenderPanelMenu.displayName = 'RenderPanelMenu'
    return RenderPanelMenu
  }, [renderPanel])

  const commonSelectProps = {
    options: rsOptions,
    placeholder,
    isDisabled: disabled,
    isSearchable: searchable ?? false,
    menuIsOpen: forceOpen ? true : renderPanel ? panelOpen : undefined,
    onMenuOpen: renderPanel ? () => setPanelOpen(true) : undefined,
    onMenuClose: renderPanel ? () => setPanelOpen(false) : undefined,
    menuPortalTarget: portalTarget,
    menuPlacement: (placement ?? 'auto') as 'bottom' | 'top' | 'auto',
  }

  if (!isMulti) {
    const singleProps = props as DropdownSingleProps
    const selectedOption = rsOptions.find((o) => o.value === (singleProps.value ?? singleProps.defaultValue)) ?? null

    return (
      <DropdownShell ref={wrapperRefCallback} label={label} className={className} style={mergedStyle} size={size}>
        <Select<RSOption, false>
          {...commonSelectProps}
          value={selectedOption}
          defaultValue={
            singleProps.defaultValue ? rsOptions.find((o) => o.value === singleProps.defaultValue) : undefined
          }
          onChange={(opt: SingleValue<RSOption>) => {
            if (opt) singleProps.onChange?.(opt.value, { value: opt.value, label: opt.label, disabled: opt.isDisabled })
          }}
          styles={styles as StylesConfig<RSOption, false>}
          components={{
            IndicatorSeparator: () => null,
            Option: SingleOption,
            ...(renderPanelMenuComponent ? { Menu: renderPanelMenuComponent } : {}),
          }}
        />
      </DropdownShell>
    )
  }

  const multiProps = props as DropdownMultiProps
  const displayMode = multiProps.multiDisplayMode ?? 'count'
  const resolvedValues = multiProps.values ?? multiProps.value
  const selectedOptions = rsOptions.filter((o) => resolvedValues?.includes(o.value))
  const isTagDisplay = displayMode === 'tags' || displayMode === 'tags-closable'
  const placeholderMode = isTagDisplay ? ('count' as const) : (displayMode as 'count' | 'values')
  const PlaceholderComp = useMemo(() => createMultiPlaceholder(placeholderMode), [placeholderMode])

  const showSelectAll = multiProps.hideSelectAll === false
  const allSelected = showSelectAll && selectedOptions.length === selectableRsOptions.length
  const someSelected = showSelectAll && selectedOptions.length > 0 && !allSelected
  const handleToggleAll = useCallback(() => {
    if (allSelected) {
      multiProps.onChange?.([], [])
    } else {
      multiProps.onChange?.(
        selectableRsOptions.map((o) => o.value),
        selectableRsOptions.map((o) => ({ value: o.value, label: o.label, disabled: o.isDisabled })),
      )
    }
  }, [allSelected, selectableRsOptions, multiProps])

  const multiComponents: Partial<SelectComponentsConfig<RSOption, true, GroupBase<RSOption>>> = {
    IndicatorSeparator: () => null,
    Option: CheckboxOption,
    ...(isTagDisplay
      ? { MultiValue: displayMode === 'tags-closable' ? TagClosableMultiValue : TagMultiValue }
      : { Placeholder: PlaceholderComp }),
    ...(showSelectAll ? { MenuList: SelectAllMenuList } : multiProps.onReset ? { MenuList: ResetMenuList } : {}),
    ...(renderPanelMenuComponent ? { Menu: renderPanelMenuComponent } : {}),
  }

  return (
    <DropdownShell ref={wrapperRefCallback} label={label} className={className} style={mergedStyle} size={size}>
      <Select<RSOption, true>
        {...commonSelectProps}
        isMulti
        value={selectedOptions}
        defaultValue={
          multiProps.defaultValue ? rsOptions.filter((o) => multiProps.defaultValue!.includes(o.value)) : undefined
        }
        onChange={(opts: MultiValue<RSOption>) => {
          multiProps.onChange?.(
            opts.map((o) => o.value),
            opts.map((o) => ({ value: o.value, label: o.label, disabled: o.isDisabled })),
          )
        }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        controlShouldRenderValue={isTagDisplay}
        styles={styles as StylesConfig<RSOption, true>}
        components={multiComponents}
        {...(showSelectAll || multiProps.onReset
          ? ({
              ...(showSelectAll && {
                _allSelected: allSelected,
                _someSelected: someSelected,
                _onToggleAll: handleToggleAll,
              }),
              _selectedCount: selectedOptions.length,
              _onReset: multiProps.onReset,
            } as Record<string, unknown>)
          : {})}
      />
    </DropdownShell>
  )
})

Dropdown.displayName = 'Dropdown'
