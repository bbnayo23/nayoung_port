import { Button } from '../Button'
import * as styles from './ErrorPage.css'

export interface ErrorPageProps {
  title?: string
  description?: string
  onRetry?: () => void
  retryLabel?: string
}

export const ErrorPage = ({
  title = '문제가 발생했습니다',
  description,
  onRetry,
  retryLabel = '다시 시도',
}: ErrorPageProps) => (
  <div className={styles.container}>
    <h2 className={styles.title}>{title}</h2>
    {description && <p className={styles.description}>{description}</p>}
    {onRetry && (
      <Button variant="primary" onClick={onRetry}>
        {retryLabel}
      </Button>
    )}
  </div>
)
