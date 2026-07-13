import { Badge, toast } from '@port/design-system'
import { severityColor, severityLabel } from '../data/logs'
import type { Severity } from '../data/logs'
import GnbDropdown from './GnbDropdown'
import * as s from './NotificationsPanel.css'

type Noti = { id: string; severity: Severity; title: string; source: string; time: string; unread: boolean }

// 데모용 보안 경보 알림
const NOTIS: Noti[] = [
  { id: 'n1', severity: 'critical', title: '랜섬웨어 행위 탐지', source: 'web-prod-04', time: '방금', unread: true },
  { id: 'n2', severity: 'critical', title: 'C2 통신 탐지 · INC-2847', source: 'web-prod-04', time: '2분 전', unread: true },
  { id: 'n3', severity: 'high', title: 'SQL Injection 시도 차단', source: 'WAF', time: '15분 전', unread: true },
  { id: 'n4', severity: 'high', title: '외부 데이터 유출 의심', source: 'DLP', time: '32분 전', unread: false },
  { id: 'n5', severity: 'medium', title: '비정상 로그인 다수 실패', source: 'Auth', time: '1시간 전', unread: false },
]

const unreadCount = NOTIS.filter((n) => n.unread).length

/** 알림 드롭다운 — GNB 알림 버튼으로 열린다. 보안 경보를 심각도별로 표시. */
export default function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <GnbDropdown open={open} onClose={onClose} targetLabel="알림" width={320} ariaLabel="알림 목록">
      <div className={s.head}>
        <span className={s.headTitle}>알림</span>
        <span className={s.headCount}>읽지 않음 {unreadCount}</span>
      </div>

      <div className={s.list}>
        {NOTIS.map((n) => (
          <div key={n.id} className={n.unread ? `${s.item} ${s.itemUnread}` : s.item} role="menuitem">
            <Badge variant="status-round" color={severityColor[n.severity]} size="sm">
              {severityLabel[n.severity]}
            </Badge>
            <div className={s.main}>
              <span className={n.unread ? `${s.title} ${s.titleUnread}` : s.title}>{n.title}</span>
              <span className={s.meta}>
                {n.source} · {n.time}
              </span>
            </div>
            {n.unread && <span className={s.unreadDot} aria-label="읽지 않음" />}
          </div>
        ))}
      </div>

      <div className={s.footer}>
        <button type="button" className={s.footerBtn} onClick={() => toast.info('모두 읽음 처리 — 준비 중')}>
          모두 읽음
        </button>
        <button type="button" className={s.footerBtn} onClick={() => toast.info('전체 알림 보기 — 준비 중')}>
          전체 보기
        </button>
      </div>
    </GnbDropdown>
  )
}
