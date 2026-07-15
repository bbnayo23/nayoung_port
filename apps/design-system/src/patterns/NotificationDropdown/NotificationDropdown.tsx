import GnbDropdown from '@dc/patterns/GnbDropdown'
import * as s from './NotificationDropdown.css'

export type NotificationLevel = 'critical' | 'high' | 'medium' | 'ok'

export interface NotificationItem {
  id: string
  level: NotificationLevel
  text: string
  time: string
  status: string
}

export interface NotificationDropdownProps {
  open: boolean
  onClose: () => void
  /** 알림 항목 (도메인 데이터 — 소비처 주입) */
  items: NotificationItem[]
  /** 앵커할 GNB 버튼 aria-label (기본 "알림") */
  targetLabel?: string
  /** 모두 읽음 */
  onReadAll?: () => void
  /** 전체 보기 */
  onViewAll?: () => void
}

const LEVEL_LABEL: Record<NotificationLevel, string> = {
  critical: '치명',
  high: '높음',
  medium: '중간',
  ok: '정상',
}

/** 알림 드롭다운 — GNB 알림 버튼에 앵커. 보안 경보를 심각도 도트와 함께 표시. 항목은 props 로 주입. */
export default function NotificationDropdown({
  open,
  onClose,
  items,
  targetLabel = '알림',
  onReadAll,
  onViewAll,
}: NotificationDropdownProps) {
  const newCount = items.filter((n) => n.level === 'critical' || n.level === 'high').length

  return (
    <GnbDropdown open={open} onClose={onClose} targetLabel={targetLabel} width={320} ariaLabel="알림 목록">
      <div className={s.head}>
        <span className={s.headTitle}>알림</span>
        <span className={s.headCount}>{newCount} 새 알림</span>
      </div>

      <div className={s.list}>
        {items.map((n) => (
          <div key={n.id} className={s.item} role="menuitem">
            <span className={s.dot[n.level]} aria-hidden="true" />
            <div className={s.main}>
              <span className={s.title}>
                [{LEVEL_LABEL[n.level]}] {n.text}
              </span>
              <span className={s.meta}>
                {n.time} · {n.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={s.footer}>
        <button type="button" className={s.footerBtn} onClick={onReadAll}>
          모두 읽음
        </button>
        <button type="button" className={s.footerBtn} onClick={onViewAll}>
          전체 보기
        </button>
      </div>
    </GnbDropdown>
  )
}
