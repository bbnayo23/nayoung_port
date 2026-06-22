import ReactSelectBase, { components } from 'react-select'
import type { MultiValue, GroupBase, ClassNamesConfig, OptionProps, FormatOptionLabelMeta } from 'react-select'
import { cx } from '../../utils'
import { vars } from '../../theme/tokens.css'
import * as styles from './ReactSelect.css'
import type { ReactSelectOption } from './ReactSelect'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ReactMultiSelectProps<T = string> = {
  options: ReactSelectOption<T>[]
  value?: T[]
  onChange?: (value: T[]) => void
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  typePosition?: 'left' | 'right'
  typeKey?: string
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

type InternalOption<T> = {
  label: string
  value: T
  isDisabled?: boolean
  optionData?: Record<string, unknown>
}

const buildClassNames = <T,>(
  size: 'sm' | 'md' | 'lg',
): ClassNamesConfig<InternalOption<T>, true, GroupBase<InternalOption<T>>> => {
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
      else {
        if (isSelected) classes.push(styles.optionSelectedText)
        if (isFocused) classes.push(styles.optionFocused)
      }
      return classes.join(' ')
    },
    noOptionsMessage: () => styles.noOptionsMessage,
    groupHeading: () => styles.groupHeading,
    valueContainer: () => valueContainerStyle,
  }
}

const parseLabel = (label: string) => {
  const match = label.match(/^(.+?)\s*\((.+)\)$/)
  return match ? { name: match[1], type: match[2] } : { name: label, type: '' }
}

const makeCheckboxOption =
  <T,>(typePosition: 'left' | 'right', typeKey?: string) =>
  (props: OptionProps<InternalOption<T>, true>) => {
    const typeFromData = typeKey ? String(props.data.optionData?.[typeKey] ?? '') : ''
    const { name, type: typeFromLabel } = parseLabel(props.label)
    const type = typeFromData || typeFromLabel
    const typeEl = type ? (
      <span style={{ fontSize: 11, color: vars.color.textSecondary, flexShrink: 0 }}>{type}</span>
    ) : null

    return (
      <components.Option {...props}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: 6,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              flexShrink: 0,
              border: props.isSelected ? 'none' : `1.5px solid ${vars.color.gray[300]}`,
              background: props.isSelected ? vars.color.brand[500] : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {props.isSelected && (
              <svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </div>
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
            {name}
          </span>
          {typePosition === 'right' && typeEl}
        </div>
      </components.Option>
    )
  }

const formatOptionLabel = <T,>(option: InternalOption<T>, meta: FormatOptionLabelMeta<InternalOption<T>>) => {
  if (meta.context === 'value') {
    const { name } = parseLabel(option.label)
    return <span>{name}</span>
  }
  return <span>{option.label}</span>
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ReactMultiSelect = <T = string,>({
  options,
  value,
  onChange,
  placeholder,
  searchable = true,
  disabled = false,
  className,
  size = 'md',
  typePosition = 'right',
  typeKey,
}: ReactMultiSelectProps<T>) => {
  const reactSelectOptions: InternalOption<T>[] = options.map((opt) => ({
    label: opt.label,
    value: opt.value,
    isDisabled: opt.disabled,
    optionData: opt.optionData,
  }))

  const selectedOptions = reactSelectOptions.filter((opt) => value?.includes(opt.value)) ?? []

  const handleChange = (selected: MultiValue<InternalOption<T>>) => {
    onChange?.(selected.map((opt) => opt.value))
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <ReactSelectBase<InternalOption<T>, true>
        isMulti
        options={reactSelectOptions}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={placeholder ?? '선택하세요'}
        isSearchable={searchable}
        isDisabled={disabled}
        classNames={buildClassNames<T>(size)}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
        menuPosition="fixed"
        unstyled
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        formatOptionLabel={formatOptionLabel}
        components={{ Option: makeCheckboxOption<T>(typePosition, typeKey) }}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          control: (base) => ({
            ...base,
            height: 'auto',
            minHeight: size === 'sm' ? 28 : size === 'lg' ? 36 : 32,
          }),
          valueContainer: (base) => ({
            ...base,
            maxHeight: size === 'sm' ? 76 : 80,
            overflowY: 'auto',
            alignContent: 'flex-start',
            flexWrap: 'wrap',
            padding: size === 'sm' ? '2px 8px' : '4px 12px',
          }),
        }}
      />
    </div>
  )
}
