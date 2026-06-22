import * as styles from './CellRenderer.css'

export interface CellCodeProps {
  value: string
}

export const CellCode = ({ value }: CellCodeProps) => (
  <code className={styles.code}>{value}</code>
)
