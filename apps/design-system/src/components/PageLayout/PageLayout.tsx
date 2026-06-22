import type { ReactNode } from 'react'
import * as styles from './PageLayout.css'

export interface PageLayoutProps {
  children: ReactNode
}

export interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  right?: ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return <div className={styles.container}>{children}</div>
}

export const PageHeader = ({ title, description, right }: PageHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerMain}>
        <h2 className={styles.title}>{title}</h2>
        {description && <span className={styles.description}>{description}</span>}
      </div>
      {right && <div className={styles.headerRight}>{right}</div>}
    </header>
  )
}
