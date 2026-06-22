import type { CellBadgeColor } from './CellRenderer.css'
import * as styles from './CellRenderer.css'

export interface CellBadgeProps {
  label: string
  color?: CellBadgeColor
}

export const CellBadge = ({ label, color = 'neutral' }: CellBadgeProps) => (
  <span className={styles.badge[color]}>{label}</span>
)
