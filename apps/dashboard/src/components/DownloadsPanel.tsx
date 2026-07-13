import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { toast } from '@port/design-system'
import * as s from './DownloadsPanel.css'

type Download =
  | { id: string; name: string; status: 'progress'; loaded: number; total: number; unit: string }
  | { id: string; name: string; status: 'done'; size: string; time: string }
  | { id: string; name: string; status: 'failed' }

// 데모용 다운로드 목록 (Figma igloo-design node 329:394)
const DOWNLOADS: Download[] = [
  { id: 'd1', name: 'alert_export_20260508.csv', status: 'progress', loaded: 2.4, total: 3.8, unit: 'MB' },
  { id: 'd2', name: 'log_archive_20260508.zip', status: 'progress', loaded: 156, total: 480, unit: 'MB' },
  { id: 'd3', name: 'weekly_report_2026W19.pdf', status: 'done', size: '4.2 MB', time: '12:32' },
  { id: 'd4', name: 'incident_INC-2847_detail.json', status: 'done', size: '88 KB', time: '11:58' },
  { id: 'd5', name: 'audit_log_q1.xlsx', status: 'failed' },
]

const inProgress = DOWNLOADS.filter((d) => d.status === 'progress').length

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

/**
 * 다운로드 목록 드롭다운 — GNB 다운로드 버튼으로 열린다.
 * DS Gnb 는 콜백만 노출하므로, 버튼(aria-label="다운로드") 위치를 측정해 그 아래에 앵커링한다.
 */
export default function DownloadsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // 다운로드 버튼 위치 측정 → 버튼 아래·우측 정렬
  useLayoutEffect(() => {
    if (!open) return
    const btn = document.querySelector('button[aria-label="다운로드"]')
    const next = btn
      ? { top: btn.getBoundingClientRect().bottom + 8, right: Math.max(8, window.innerWidth - btn.getBoundingClientRect().right) }
      : { top: 56, right: 120 }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPos(next)
  }, [open])

  // 바깥 클릭·Esc 로 닫기 (다운로드 버튼 클릭은 토글이므로 무시)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target)) return
      if (document.querySelector('button[aria-label="다운로드"]')?.contains(target)) return
      onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open || !pos) return null

  return (
    <div
      ref={panelRef}
      className={s.panel}
      style={{ top: pos.top, right: pos.right }}
      role="menu"
      aria-label="다운로드 목록"
    >
      <div className={s.head}>
        <span className={s.headTitle}>다운로드</span>
        <span className={s.headCount}>{inProgress}건 진행 중</span>
      </div>

      <div className={s.list}>
        {DOWNLOADS.map((d) => (
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
                  <button type="button" className={s.retry} onClick={() => toast.info('다시 시도 — 준비 중')}>
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
        <button type="button" className={s.footerBtn} onClick={() => toast.info('전체 다운로드 보기 — 준비 중')}>
          전체 보기
        </button>
      </div>
    </div>
  )
}
