import * as styles from './PageLoader.css'

/** 페이지 전체 로딩 상태를 나타내는 스피너 오버레이 */
export const PageLoader = () => (
  <div className={styles.overlay}>
    <div className={styles.spinner} aria-label="로딩 중" role="status" />
  </div>
)
