import { CellBadge } from './CellBadge'
import * as styles from './CellRenderer.css'

export interface ArrayToStringProps {
  values: string[]
  /** 최대 표시 개수 (기본 3). 초과분은 `+N` 배지로 표시 */
  max?: number
}

export const ArrayToString = ({ values, max = 3 }: ArrayToStringProps) => {
  if (values.length === 0) return null
  const shown = values.slice(0, max)
  const overflow = values.length - shown.length
  return (
    <span className={styles.arrayContainer}>
      {shown.map((v) => (
        <CellBadge key={v} label={v} color="neutral" />
      ))}
      {overflow > 0 && <CellBadge label={`+${overflow}`} color="primary" />}
    </span>
  )
}
