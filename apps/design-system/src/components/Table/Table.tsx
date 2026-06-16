import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react'
import { cx } from '../../utils/cx'
import * as styles from './Table.css'
import type { TableAlign, TableSize, TableVariant } from './Table.css'

/**
 * 셀(HeaderCell/Cell)이 부모 Table 의 밀도/스타일을 읽기 위한 컨텍스트.
 * 셀은 자신의 size 토큰을 컨텍스트에서 가져오고, 헤더는 stickyHeader 여부도 읽는다.
 */
const TableContext = createContext<{
  variant: TableVariant
  size: TableSize
  stickyHeader: boolean
}>({ variant: 'simple', size: 'md', stickyHeader: false })

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** simple(기본) · striped(짝수 행 배경) */
  variant?: TableVariant
  /** 셀 밀도 — sm · md(기본) */
  size?: TableSize
  /** thead 를 스크롤 시 상단 고정 (스크롤되는 높이 제한이 필요) */
  stickyHeader?: boolean
  /** 부모 폭을 가득 채움 (기본 true) */
  fullWidth?: boolean
  /** 가로 스크롤 래퍼에 전달할 속성 (예: 높이 제한 style) */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

/**
 * 시맨틱 `<table>` 기반 데이터 테이블.
 *
 * 가로 스크롤 래퍼 div + `<table>` 를 렌더하며, 합성 서브컴포넌트
 * `Table.Head` · `Table.Body` · `Table.Row` · `Table.HeaderCell` · `Table.Cell`
 * 로 구성한다. variant/size 는 컨텍스트로 내려가 셀 밀도와 줄무늬에 반영된다.
 *
 * a11y: 시맨틱 테이블 요소를 사용하고 헤더 셀에 `scope="col"` 을 부여한다.
 */
const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    variant = 'simple',
    size = 'md',
    stickyHeader = false,
    fullWidth = true,
    wrapperProps,
    className,
    children,
    ...rest
  },
  ref,
) {
  const { className: wrapperClassName, ...wrapperRest } = wrapperProps ?? {}
  return (
    <TableContext.Provider value={{ variant, size, stickyHeader }}>
      <div
        className={cx(
          styles.wrapper,
          stickyHeader && styles.wrapperSticky,
          wrapperClassName,
        )}
        {...wrapperRest}
      >
        <table
          ref={ref}
          className={cx(styles.root, fullWidth && styles.fullWidth, className)}
          {...rest}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  )
})

export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>

/** `<thead>` 래퍼 */
const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  function TableHead({ className, children, ...rest }, ref) {
    return (
      <thead ref={ref} className={className} {...rest}>
        {children}
      </thead>
    )
  },
)

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

/** `<tbody>` 래퍼 — striped 일 때 짝수 행 배경 적용 */
const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, children, ...rest }, ref) {
    const { variant } = useContext(TableContext)
    return (
      <tbody
        ref={ref}
        className={cx(variant === 'striped' && styles.stripedBody, className)}
        {...rest}
      >
        {children}
      </tbody>
    )
  },
)

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>

/** `<tr>` — 하단 보더를 가진 행 */
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, children, ...rest },
  ref,
) {
  return (
    <tr ref={ref} className={cx(styles.row, className)} {...rest}>
      {children}
    </tr>
  )
})

export interface TableHeaderCellProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  /** 텍스트 정렬 */
  align?: TableAlign
}

/** `<th scope="col">` — 컨텍스트의 size 밀도와 stickyHeader 고정을 반영 */
const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  function TableHeaderCell({ align = 'left', className, children, ...rest }, ref) {
    const { size, stickyHeader } = useContext(TableContext)
    return (
      <th
        ref={ref}
        scope="col"
        className={cx(
          styles.cellBase,
          styles.headerCell,
          styles.sizes[size],
          styles.aligns[align],
          stickyHeader && styles.stickyHeaderCell,
          className,
        )}
        {...rest}
      >
        {children}
      </th>
    )
  },
)

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** 텍스트 정렬 */
  align?: TableAlign
}

/** `<td>` — 컨텍스트의 size 밀도를 반영 */
const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ align = 'left', className, children, ...rest }, ref) {
    const { size } = useContext(TableContext)
    return (
      <td
        ref={ref}
        className={cx(
          styles.cellBase,
          styles.sizes[size],
          styles.aligns[align],
          className,
        )}
        {...rest}
      >
        {children}
      </td>
    )
  },
)

TableRoot.displayName = 'Table'
TableHead.displayName = 'Table.Head'
TableBody.displayName = 'Table.Body'
TableRow.displayName = 'Table.Row'
TableHeaderCell.displayName = 'Table.HeaderCell'
TableCell.displayName = 'Table.Cell'

type TableComponent = typeof TableRoot & {
  Head: typeof TableHead
  Body: typeof TableBody
  Row: typeof TableRow
  HeaderCell: typeof TableHeaderCell
  Cell: typeof TableCell
}

/** 시맨틱 서브컴포넌트가 프로퍼티로 부착된 합성 컴포넌트 */
export const Table = TableRoot as TableComponent
Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.HeaderCell = TableHeaderCell
Table.Cell = TableCell
