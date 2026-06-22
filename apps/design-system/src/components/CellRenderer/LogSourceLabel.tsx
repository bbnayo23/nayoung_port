import * as styles from './CellRenderer.css'

export interface LogSourceLabelProps {
  name: string
  color?: string
}

export const LogSourceLabel = ({ name, color }: LogSourceLabelProps) => (
  <span className={styles.logSourceLabel}>
    <span className={styles.logSourceDot} style={color ? { backgroundColor: color } : undefined} />
    <span>{name}</span>
  </span>
)
