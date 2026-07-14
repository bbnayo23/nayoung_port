import { toast } from '@port/design-system'
import GnbDropdown from './GnbDropdown'
import * as s from './UserMenuPanel.css'

const ITEMS = ['프로필 설정', '계정 보안', '내 활동 로그']

/** 사용자 프로필 메뉴 — GNB 사용자 버튼으로 열린다. */
export default function UserMenuPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pick = (label: string) => {
    onClose()
    toast.info(`${label} — 준비 중`)
  }

  return (
    <GnbDropdown open={open} onClose={onClose} targetLabel="사용자" width={230} ariaLabel="사용자 메뉴">
      <div className={s.head}>
        <span className={s.avatar}>SK</span>
        <div className={s.info}>
          <span className={s.name}>Sarah Kim</span>
          <span className={s.role}>SOC Analyst L2</span>
        </div>
      </div>
      <div className={s.list}>
        {ITEMS.map((label) => (
          <button key={label} type="button" className={s.item} onClick={() => pick(label)}>
            {label}
          </button>
        ))}
        <button type="button" className={`${s.item} ${s.itemDanger}`} onClick={() => pick('로그아웃')}>
          로그아웃
        </button>
      </div>
    </GnbDropdown>
  )
}
