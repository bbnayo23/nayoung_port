import type { ReactNode } from 'react'
import GnbDropdown from '@dc/patterns/GnbDropdown'
import * as s from './SolutionSwitcher.css'

export interface SolutionApp {
  key: string
  name: string
  sub: string
  variant: 'primary' | 'danger' | 'muted'
  icon: ReactNode
  active?: boolean
  isMore?: boolean
}

export interface SolutionSwitcherProps {
  open: boolean
  onClose: () => void
  /** 앵커할 브랜드(로고) 버튼 aria-label (기본 "SOC Console") */
  targetLabel?: string
  /** 앱 목록 (기본: spider 제품군) */
  apps?: SolutionApp[]
  /** 활성 앱이 아닌 타일 선택 시 */
  onSelect?: (app: SolutionApp) => void
}

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const DEFAULT_APPS: SolutionApp[] = [
  { key: 'exd', name: 'ExD', sub: '탐지 / 분석', variant: 'primary', icon: <ShieldIcon />, active: true },
  { key: 'iums', name: 'IUMS', sub: '계정 / 권한', variant: 'primary', icon: <LockIcon /> },
  { key: 'soar', name: 'SOAR', sub: '자동대응', variant: 'danger', icon: <CodeIcon /> },
  { key: 'more', name: '', sub: '10개 제품', variant: 'muted', icon: <PlusIcon />, isMore: true },
]

/** 솔루션(앱 전환) 스위처 — 브랜드(로고) 버튼에 앵커되는 좌측 정렬 팝오버. */
export default function SolutionSwitcher({
  open,
  onClose,
  targetLabel = 'SOC Console',
  apps = DEFAULT_APPS,
  onSelect,
}: SolutionSwitcherProps) {
  const pick = (app: SolutionApp) => {
    onClose()
    if (app.active) return
    onSelect?.(app)
  }

  return (
    <GnbDropdown open={open} onClose={onClose} targetLabel={targetLabel} width={280} align="left" ariaLabel="앱 전환">
      <div className={s.head}>
        <span className={s.headTitle}>앱 전환</span>
        <span className={s.headSub}>spider 제품군</span>
      </div>
      <div className={s.grid}>
        {apps.map((app) => (
          <button
            key={app.key}
            type="button"
            className={app.active ? `${s.tile} ${s.tileActive}` : s.tile}
            onClick={() => pick(app)}
            aria-current={app.active ? 'true' : undefined}
          >
            <span className={s.tileIcon[app.variant]}>{app.icon}</span>
            {app.isMore ? (
              <span className={`${s.tileName} ${s.tileNameBold}`}>더 보기</span>
            ) : (
              <span className={s.tileName}>
                <span className={s.tileNameSpider}>spider </span>
                <span className={s.tileNameBold}>{app.name}</span>
              </span>
            )}
            <span className={s.tileSub}>{app.sub}</span>
          </button>
        ))}
      </div>
    </GnbDropdown>
  )
}
