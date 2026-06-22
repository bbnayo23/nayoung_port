import ReactSelectBase, { components } from 'react-select'
import type { MenuProps, GroupBase, ClassNamesConfig } from 'react-select'
import { ArboristTree } from '../ArboristTree'
import type { TreeNodeData, CheckType } from '../ArboristTree'
import { reactSelectCss as selectStyles } from '../ReactSelect'
import { cx } from '../../utils'
import * as styles from './TreeSelect.css'

// TreeSelectProps — types.ts 에서 인라인으로 병합
export type TreeSelectProps = {
  treeList: TreeNodeData[]
  value?: string | number | null
  onChange?: (node: TreeNodeData) => void
  values?: (string | number)[]
  onMultiChange?: (seqs: (string | number)[], nodes: TreeNodeData[]) => void
  multiSelect?: boolean
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  checkType?: CheckType
  enableVirtualization?: boolean
  treeHeight?: number
  searchable?: boolean
  menuMinWidth?: number
}

type ReactSelectOption = {
  label: string
  value: string | number
}

type TreeMenuExtraProps = {
  treeNodes: TreeNodeData[]
  checkType: 'single' | 'multi' | 'click'
  onSelect: ((node: TreeNodeData) => void) | undefined
  onMultiChange: ((seqs: (string | number)[], nodes: TreeNodeData[]) => void) | undefined
  checkedSeqList: (string | number)[]
  enableVirtualization: boolean
  searchable: boolean
  treeHeight: number
  menuWidth?: number
}

const findLabel = (nodes: TreeNodeData[], val: string | number): string | undefined => {
  for (const node of nodes) {
    if (node.value === val) return node.label
    if (node.children) {
      const found = findLabel(node.children, val)
      if (found) return found
    }
  }
  return undefined
}

const collectNodes = (
  nodes: TreeNodeData[],
  seqs: (string | number)[],
  result: TreeNodeData[] = [],
): TreeNodeData[] => {
  for (const node of nodes) {
    if (seqs.includes(node.value)) result.push(node)
    if (node.children) collectNodes(node.children, seqs, result)
  }
  return result
}

const TreeMenu = (props: MenuProps<ReactSelectOption, false, GroupBase<ReactSelectOption>>) => {
  const { selectProps } = props
  const treeMenuProps = (selectProps as unknown as { treeMenuProps: TreeMenuExtraProps }).treeMenuProps

  const handleCheckedSeq = (newList: (string | number)[], targetNode?: TreeNodeData) => {
    if (!treeMenuProps.onMultiChange) return
    const allNodes = targetNode
      ? collectNodes(treeMenuProps.treeNodes, newList)
      : collectNodes(treeMenuProps.treeNodes, newList)
    treeMenuProps.onMultiChange(newList, allNodes)
  }

  const wrapperStyle: React.CSSProperties | undefined = treeMenuProps.menuWidth
    ? { width: treeMenuProps.menuWidth }
    : undefined

  if (treeMenuProps.checkType === 'multi') {
    return (
      <components.Menu {...props}>
        <div className={styles.treeMenuWrapper} style={wrapperStyle}>
          <ArboristTree
            nodes={treeMenuProps.treeNodes}
            checkType="multi"
            checkedSeqList={treeMenuProps.checkedSeqList}
            handleCheckedSeq={handleCheckedSeq}
            enableSearchArea={treeMenuProps.searchable}
            hideTitleArea={!treeMenuProps.searchable}
            isExpandAll={true}
            noBorder={true}
            height={treeMenuProps.treeHeight}
          />
        </div>
      </components.Menu>
    )
  }

  return (
    <components.Menu {...props}>
      <div className={styles.treeMenuWrapper} style={wrapperStyle}>
        <ArboristTree
          nodes={treeMenuProps.treeNodes}
          checkType={treeMenuProps.checkType}
          checkedSeqList={treeMenuProps.checkedSeqList}
          handleClickedNode={(node) => {
            treeMenuProps.onSelect?.(node)
            selectProps.onMenuClose()
          }}
          enableSearchArea={treeMenuProps.searchable}
          hideTitleArea={!treeMenuProps.searchable}
          isExpandAll={true}
          noBorder={true}
          height={treeMenuProps.treeHeight}
        />
      </div>
    </components.Menu>
  )
}

const buildClassNames = (
  size: 'sm' | 'md' | 'lg',
): ClassNamesConfig<ReactSelectOption, false, GroupBase<ReactSelectOption>> => {
  const sizeStyle = size === 'sm' ? selectStyles.sizeSm : size === 'lg' ? selectStyles.sizeLg : selectStyles.sizeMd
  const valueContainerStyle =
    size === 'sm'
      ? selectStyles.valueContainerSm
      : size === 'lg'
        ? selectStyles.valueContainerLg
        : selectStyles.valueContainerMd

  return {
    control: ({ isFocused, isDisabled }) => {
      return cx(selectStyles.control, sizeStyle, isFocused && selectStyles.controlFocused, isDisabled && selectStyles.controlDisabled)
    },
    placeholder: () => selectStyles.placeholder,
    singleValue: () => selectStyles.singleValue,
    input: () => selectStyles.input,
    indicatorSeparator: () => selectStyles.indicatorSeparator,
    dropdownIndicator: () => selectStyles.dropdownIndicator,
    clearIndicator: () => selectStyles.dropdownIndicator,
    menu: () => selectStyles.menu,
    menuList: () => selectStyles.menuList,
    valueContainer: () => valueContainerStyle,
  }
}

export const TreeSelect = ({
  treeList,
  value,
  onChange,
  values,
  onMultiChange,
  multiSelect = false,
  placeholder = '선택하세요',
  disabled = false,
  size = 'md',
  className,
  checkType = 'click',
  enableVirtualization = true,
  treeHeight = 300,
  searchable = true,
  menuMinWidth,
}: TreeSelectProps) => {
  const resolvedCheckType: 'single' | 'multi' | 'click' = multiSelect ? 'multi' : checkType

  const multiLabel = values?.length ? `${values.length}건 선택` : undefined

  const selectedLabel = !multiSelect && value !== null && value !== undefined ? findLabel(treeList, value) : undefined
  const selectedOption: ReactSelectOption | null =
    !multiSelect && value !== null && value !== undefined && selectedLabel !== undefined
      ? { label: selectedLabel, value }
      : multiLabel !== undefined
        ? { label: multiLabel, value: '__multi__' }
        : null

  return (
    <div className={cx(styles.wrapper, className)}>
      <ReactSelectBase<ReactSelectOption>
        value={selectedOption}
        options={[]}
        components={{ Menu: TreeMenu }}
        {...({
          treeMenuProps: {
            treeNodes: treeList,
            checkType: resolvedCheckType,
            onSelect: onChange,
            onMultiChange,
            checkedSeqList: multiSelect ? (values ?? []) : value !== null ? [value] : [],
            enableVirtualization,
            searchable,
            treeHeight,
            menuWidth: menuMinWidth,
          },
        } as object)}
        classNames={buildClassNames(size)}
        unstyled
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          control: (base) => ({ ...base, minHeight: 'unset' }),
          menu: (base) => ({
            ...base,
            ...(menuMinWidth ? { width: menuMinWidth } : {}),
          }),
          singleValue: (base) => ({
            ...base,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }),
        }}
        placeholder={placeholder}
        isDisabled={disabled}
        isSearchable={false}
        isClearable={multiSelect && !!values?.length}
        onChange={(_, meta) => {
          if (meta.action === 'clear') {
            onMultiChange?.([], [])
          }
        }}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
        menuPosition="fixed"
        closeMenuOnSelect={!multiSelect}
      />
    </div>
  )
}
