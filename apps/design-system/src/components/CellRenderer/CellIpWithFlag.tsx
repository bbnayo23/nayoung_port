import * as styles from './CellRenderer.css'

export interface CellIpWithFlagProps {
  ip: string
  /** ISO 3166-1 alpha-2 국가 코드 (예: "US", "KR") */
  country?: string
}

export const CellIpWithFlag = ({ ip, country }: CellIpWithFlagProps) => {
  const code = country ? country.slice(0, 2).toUpperCase() : ''
  return (
    <span className={styles.ipContainer}>
      {code && (
        <span className={styles.flag} title={code}>
          {code}
        </span>
      )}
      <span>{ip}</span>
    </span>
  )
}
