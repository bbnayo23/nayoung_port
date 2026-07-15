import type { StylesConfig, GroupBase } from 'react-select'
import { vars } from '@dc/theme/contract.css'

type RSOption = { value: string; label: string; isDisabled?: boolean; variant?: string }

const sizeVar = (size: string, prop: string) => `var(--dropdown-${prop}-${size})`

const radiusMap = { sm: vars.radius.sm, md: vars.radius.md, lg: vars.radius.lg } as const

export function buildDropdownStyles(
  size: 'sm' | 'md' | 'lg',
  hasLabel: boolean,
  isMulti: boolean,
  isTagsMode: boolean,
): StylesConfig<RSOption, boolean, GroupBase<RSOption>> {
  const h = sizeVar(size, 'height')
  const fs = sizeVar(size, 'font-size')
  const radius = radiusMap[size]

  return {
    container: (base) => ({
      ...base,
      display: 'inline-block',
      minWidth: sizeVar(size, 'min-width'),
      width: '100%',
    }),
    control: (base, state) => ({
      ...base,
      minHeight: h,
      height: isTagsMode ? 'auto' : h,
      padding: sizeVar(size, 'padding'),
      gap: sizeVar(size, 'gap'),
      fontSize: fs,
      fontFamily: 'inherit',
      // 라벨이 있는 경우 선택영역을 surface(흰색)로 채워, 회색 라벨 애드온과 색을 구분한다.
      background: state.menuIsOpen || hasLabel ? vars.color.surface : 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: state.menuIsOpen || state.isFocused ? vars.color.primary : vars.color.border,
      borderRadius: hasLabel ? `0 ${radius} ${radius} 0` : radius,
      boxShadow: 'none',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      opacity: state.isDisabled ? 0.4 : 1,
      transition: 'border-color 0.15s, background-color 0.15s',
      flexWrap: isTagsMode ? 'wrap' : 'nowrap',
      '&:hover': { borderColor: vars.color.primary },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: isTagsMode ? '2px 0' : 0,
      gap: isTagsMode ? '2px' : 0,
      flexWrap: isTagsMode ? 'wrap' : 'nowrap',
      overflow: 'hidden',
    }),
    singleValue: (base) => ({
      ...base,
      margin: 0,
      color: vars.color.text,
      fontSize: fs,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    placeholder: (base) => ({
      ...base,
      margin: 0,
      color: vars.color.textMuted,
      fontSize: fs,
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base, state) => ({
      ...base,
      padding: 0,
      color: vars.color.textSecondary,
      transition: 'transform 0.15s',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
      svg: { width: 12, height: 12 },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
      marginTop: 4,
      padding: '4px 0',
      background: vars.color.surface,
      border: `1px solid ${vars.color.border}`,
      borderRadius: radius,
      boxShadow: vars.shadow.md,
      overflow: 'hidden',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      maxHeight: 240,
    }),
    option: (base, state) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      gap: isMulti ? '6px' : undefined,
      padding: '7px 12px',
      fontSize: 12,
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      transition: 'background 0.15s',
      color: state.isDisabled
        ? vars.color.textMuted
        : !isMulti && state.isSelected
          ? vars.color.primary
          : vars.color.text,
      fontWeight: !isMulti && state.isSelected ? 600 : 400,
      background: (!isMulti && state.isSelected) || state.isFocused ? vars.color.surfaceHover : 'transparent',
      '&:active': { background: vars.color.surfaceHover },
    }),
    multiValue: () => ({ display: 'none' }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: vars.color.text,
    }),
    noOptionsMessage: (base) => ({
      ...base,
      fontSize: 11,
      color: vars.color.textSecondary,
    }),
  }
}
