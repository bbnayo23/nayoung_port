import { toast } from '@port/design-system'
import GnbDropdown from './GnbDropdown'
import * as s from './NotificationsPanel.css'

type Level = 'critical' | 'high' | 'medium' | 'ok'
type Noti = { id: string; level: Level; text: string; time: string; status: string }

const LEVEL_LABEL: Record<Level, string> = { critical: '치명', high: '높음', medium: '중간', ok: '정상' }

// 데모용 보안 경보 알림 (Figma igloo-design node 329:237)
const NOTIS: Noti[] = [
  { id: 'n1', level: 'critical', text: 'INC-2847 악성코드 감지 · web-prod-04', time: '12:47:08', status: '나에게 배정됨' },
  { id: 'n2', level: 'high', text: 'api-gateway-02 이상 외부 트래픽', time: '12:24:30', status: '미배정' },
  { id: 'n3', level: 'high', text: 'finance-db DLP 규칙 위반', time: '12:06:11', status: '결재 대기' },
  { id: 'n4', level: 'medium', text: 'PCI DSS 재스캔 완료 · 92%', time: '11:38:04', status: '8건 실패 항목' },
  { id: 'n5', level: 'ok', text: 'hr-share-02 격리 완료', time: '10:21:09', status: '자동 플레이북' },
]

// 신규(치명·높음) 개수
const newCount = NOTIS.filter((n) => n.level === 'critical' || n.level === 'high').length

/** 알림 드롭다운 — GNB 알림 버튼으로 열린다. 보안 경보를 심각도 도트와 함께 표시. */
export default function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <GnbDropdown open={open} onClose={onClose} targetLabel="알림" width={320} ariaLabel="알림 목록">
      <div className={s.head}>
        <span className={s.headTitle}>알림</span>
        <span className={s.headCount}>{newCount} 새 알림</span>
      </div>

      <div className={s.list}>
        {NOTIS.map((n) => (
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
