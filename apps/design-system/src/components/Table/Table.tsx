import { forwardRef, Children } from 'react'
import {
  table,
  tableWrap,
  tableToolbar,
  tableHead,
  tableBody,
  tableEmptyCell,
  tableRow,
  tableCell,
  tableHeaderCell,
  expandIcon,
} from './Table.css'
import type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableHeaderCellProps,
} from './Table.types'
import cn from 'classnames'

const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    { className, children, size = 'md', striped = false, hoverable = true, bordered = false, toolbarExtra, ...props },
    ref,
  ) => {
    const tableEl = (
      <table
        ref={ref}
        className={cn(table, 'table', `table-${size}`, className, {
          'table-striped': striped,
          'table-hoverable': hoverable,
          'table-bordered': bordered,
        })}
        {...props}
      >
        {children}
      </table>
    )

    if (!toolbarExtra) return tableEl

    return (
      <div className={tableWrap}>
        <div className={tableToolbar}>{toolbarExtra}</div>
        {tableEl}
      </div>
    )
  },
)
Table.displayName = 'Table'

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(({ className, children, ...props }, ref) => (
  <thead ref={ref} className={cn(tableHead, 'table-head', className)} {...props}>
    {children}
  </thead>
))
TableHead.displayName = 'Table.Head'

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, emptyContent, ...props }, ref) => (
    <tbody ref={ref} className={cn(tableBody, 'table-body', className)} {...props}>
      {emptyContent && Children.count(children) === 0 ? (
        <tr>
          <td colSpan={100} className={tableEmptyCell}>
            {emptyContent}
          </td>
        </tr>
      ) : (
        children
      )}
    </tbody>
  ),
)
TableBody.displayName = 'Table.Body'

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, expandable, expanded, onExpandToggle, active, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRow, 'table-row', className, {
        'table-row-expandable': expandable,
        'table-row-active': active,
      })}
      onClick={expandable ? () => onExpandToggle?.(!expanded) : undefined}
      {...props}
    >
      {expandable && (
        <td className={cn(tableCell, 'table-expand-cell', 'table-expand-cell-width')}>
          <span className={cn(expandIcon, { expanded })}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3.5 2 7 5 3.5 8" />
            </svg>
          </span>
        </td>
      )}
      {children}
    </tr>
  ),
)
TableRow.displayName = 'Table.Row'

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, align = 'left', ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCell, 'table-cell', className, { [`align-${align}`]: align !== 'left' })}
      {...props}
    >
      {children}
    </td>
  ),
)
TableCell.displayName = 'Table.Cell'

const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, children, sortable, sortDirection, onSort, align = 'left', ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tableHeaderCell, 'table-header-cell', className, {
        sortable,
        [`align-${align}`]: align !== 'left',
      })}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      {children}
      {sortable && (
        <span
          className={cn('sort-indicator', {
            'sort-active-asc': sortDirection === 'asc',
            'sort-active-desc': sortDirection === 'desc',
          })}
        >
          <svg className="sort-asc" width="8" height="5" viewBox="0 0 8 5" fill="currentColor">
            <path d="M4 0L8 5H0L4 0Z" />
          </svg>
          <svg className="sort-desc" width="8" height="5" viewBox="0 0 8 5" fill="currentColor">
            <path d="M4 5L0 0H8L4 5Z" />
          </svg>
        </span>
      )}
    </th>
  ),
)
TableHeaderCell.displayName = 'Table.HeaderCell'

export default Object.assign(Table, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeaderCell: TableHeaderCell,
})
