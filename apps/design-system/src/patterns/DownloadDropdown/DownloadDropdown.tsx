import GnbDropdown from '@dc/patterns/GnbDropdown'
import * as s from './DownloadDropdown.css'

export type DownloadItem =
  | { id: string; name: string; status: 'progress'; loaded: number; total: number; unit: string }
  | { id: string; name: string; status: 'done'; size: string; time: string }
  | { id: string; name: string; status: 'failed' }

export interface DownloadDropdownProps {
  open: boolean
  onClose: () => void
  /** 다운로드 항목 (도메인 데이터 — 소비처 주입) */
  items: DownloadItem[]
  /** 앵커할 GNB 버튼 aria-label (기본 "다운로드") */
  targetLabel?: string
  /** 실패 항목 다시 시도 */
  onRetry?: (item: DownloadItem) => void
  /** 전체 보기 */
  onViewAll?: () => void
}

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

/** 다운로드 목록 드롭다운 — GNB 다운로드 버튼에 앵커. 항목은 props 로 주입. */
export default function DownloadDropdown({
  open,
  onClose,
  items,
  targetLabel = '다운로드',
  onRetry,
  onViewAll,
}: DownloadDropdownProps) {
  const inProgress = items.filter((d) => d.status === 'progress').length

  return (
    <GnbDropdown open={open} onClose={onClose} targetLabel={targetLabel} width={260} ariaLabel="다운로드 목록">
      <div className={s.head}>
        <span className={s.headTitle}>다운로드</span>
        <span className={s.headCount}>{inProgress}건 진행 중</span>
      </div>

      <div className={s.list}>
        {items.map((d) => (
          <div key={d.id} className={s.item} role="menuitem">
            <span
              className={
                d.status === 'progress' ? s.statusIcon.progress : d.status === 'done' ? s.statusIcon.done : s.statusIcon.failed
              }
            >
              {d.status === 'progress' ? <DownloadIcon /> : d.status === 'done' ? <CheckIcon /> : <XIcon />}
            </span>
            <div className={s.main}>
              <span className={s.name}>{d.name}</span>
              {d.status === 'progress' ? (
                <>
                  <span className={s.meta}>
                    {d.loaded} {d.unit} / {d.total} {d.unit} · 진행 중
                  </span>
                  <span className={s.track}>
                    <span className={s.fill} style={{ width: `${Math.round((d.loaded / d.total) * 100)}%` }} />
                  </span>
                </>
              ) : d.status === 'done' ? (
                <span className={s.meta}>
                  {d.size} · {d.time} 완료
                </span>
              ) : (
                <span className={s.meta}>
                  실패
                  <button type="button" className={s.retry} onClick={() => onRetry?.(d)}>
                    다시 시도
                  </button>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={s.footer}>
        <span className={s.footerLeft}>최근 24시간</span>
        <button type="button" className={s.footerBtn} onClick={onViewAll}>
          전체 보기
        </button>
      </div>
    </GnbDropdown>
  )
}
