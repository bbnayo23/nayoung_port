import ReactSelectBase, { components } from 'react-select'
import type { SingleValue, GroupBase, ClassNamesConfig, OptionProps, FormatOptionLabelMeta } from 'react-select'
import { cx } from '../../utils'
import { vars } from '../../theme/tokens.css'
import * as styles from './ReactSelect.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ReactSelectOption<T = string> = {
  label: string
  value: T
  disabled?: boolean
  optionData?: Record<string, unknown>
}

export type ReactSelectProps<T = string> = {
  options: ReactSelectOption<T>[]
  value?: T
  onChange?: (value: T) => void
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  typeKey?: string
  typePosition?: 'left' | 'right'
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

type InternalOption<T> = {
  label: string
  value: T
  isDisabled?: boolean
  optionData?: Record<string, unknown>
}

const makeTypeOption =
  <T,>(typePosition: 'left' | 'right', typeKey?: string) =>
  (props: OptionProps<InternalOption<T>, false>) => {
    const typeFromData = typeKey ? String(props.data.optionData?.[typeKey] ?? '') : ''
    const typeEl = typeFromData ? (
      <span style={{ fontSize: 11, color: vars.color.textSecondary, flexShrink: 0 }}>{typeFromData}</span>
    ) : null
    return (
      <components.Option {...props}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {typePosition === 'left' && typeEl}
          <span
            style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {props.label}
          </span>
          {typePosition === 'right' && typeEl}
        </div>
      </components.Option>
    )
  }

const makeFormatOptionLabel =
  <T,>(_typeKey?: string) =>
  (option: InternalOption<T>, meta: FormatOptionLabelMeta<InternalOption<T>>) => {
    if (meta.context === 'value') return <span>{option.label}</span>
    return <span>{option.label}</span>
  }

const buildClassNames = <T,>(
  size: 'sm' | 'md' | 'lg',
): ClassNamesConfig<InternalOption<T>, false, GroupBase<InternalOption<T>>> => {
  const sizeStyle = size === 'sm' ? styles.sizeSm : size === 'lg' ? styles.sizeLg : styles.sizeMd
  const valueContainerStyle =
    size === 'sm' ? styles.valueContainerSm : size === 'lg' ? styles.valueContainerLg : styles.valueContainerMd

  return {
    control: ({ isFocused, isDisabled }) =>
      cx(styles.control, sizeStyle, isFocused && styles.controlFocused, isDisabled && styles.controlDisabled),
    placeholder: () => styles.placeholder,
    singleValue: () => styles.singleValue,
    multiValue: () => styles.multiValue,
    multiValueLabel: () => styles.multiValueLabel,
    multiValueRemove: () => styles.multiValueRemove,
    input: () => styles.input,
    indicatorSeparator: () => styles.indicatorSeparator,
    dropdownIndicator: () => styles.dropdownIndicator,
    clearIndicator: () => styles.clearIndicator,
    menu: () => styles.menu,
    menuList: () => styles.menuList,
    option: ({ isFocused, isSelected, isDisabled }) => {
      const classes = [styles.option]
      if (isDisabled) classes.push(styles.optionDisabled)
      else if (isSelected && isFocused) classes.push(styles.optionSelectedFocused)
      else if (isSelected) classes.push(styles.optionSelected)
      else if (isFocused) classes.push(styles.optionFocused)
      return classes.join(' ')
    },
    noOptionsMessage: () => styles.noOptionsMessage,
    groupHeading: () => styles.groupHeading,
    valueContainer: () => valueContainerStyle,
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ReactSelect = <T,>({
  options,
  value,
  onChange,
  placeholder,
  searchable = false,
  disabled = false,
  className,
  size = 'md',
  typeKey,
  typePosition = 'right',
}: ReactSelectProps<T>) => {
  const reactSelectOptions: InternalOption<T>[] = options.map((opt) => ({
    label: opt.label,
    value: opt.value,
    isDisabled: opt.disabled,
    optionData: opt.optionData,
  }))

  const selectedOption = reactSelectOptions.find((opt) => opt.value === value) ?? null

  const handleChange = (selected: SingleValue<InternalOption<T>>) => {
    if (selected !== null) {
      onChange?.(selected.value)
    }
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <ReactSelectBase<InternalOption<T>>
        options={reactSelectOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder ?? '선택하세요'}
        isSearchable={searchable}
        isDisabled={disabled}
        classNames={buildClassNames<T>(size)}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
        menuPosition="fixed"
        unstyled
        {...(typeKey && {
          components: { Option: makeTypeOption<T>(typePosition, typeKey) },
          formatOptionLabel: makeFormatOptionLabel<T>(typeKey),
        })}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          control: (base) => ({ ...base, minHeight: 'unset' }),
        }}
      />
    </div>
  )
}
