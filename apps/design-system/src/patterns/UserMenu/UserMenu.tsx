import GnbDropdown from '../GnbDropdown'
import * as s from './UserMenu.css'

export interface UserMenuUser {
  name: string
  role: string
  /** 아바타 이니셜 */
  initials: string
}

export interface UserMenuProps {
  open: boolean
  onClose: () => void
  /** 표시할 사용자 정보 (도메인 데이터 — 소비처에서 주입) */
  user: UserMenuUser
  /** 앵커할 GNB 버튼 aria-label (기본 "사용자") */
  targetLabel?: string
  /** 일반 메뉴 항목 (기본: 프로필 설정 / 계정 보안 / 내 활동 로그) */
  items?: string[]
  /** 일반 항목 선택 */
  onSelect?: (label: string) => void
  /** 로그아웃 선택 */
  onLogout?: () => void
}

const DEFAULT_ITEMS = ['프로필 설정', '계정 보안', '내 활동 로그']

/** 사용자 프로필 메뉴 — GNB 사용자 버튼에 앵커. 사용자 정보는 props 로 주입. */
export default function UserMenu({
  open,
  onClose,
  user,
  targetLabel = '사용자',
  items = DEFAULT_ITEMS,
  onSelect,
  onLogout,
}: UserMenuProps) {
  return (
    <GnbDropdown open={open} onClose={onClose} targetLabel={targetLabel} width={230} ariaLabel="사용자 메뉴">
      <div className={s.head}>
        <span className={s.avatar}>{user.initials}</span>
        <div className={s.info}>
          <span className={s.name}>{user.name}</span>
          <span className={s.role}>{user.role}</span>
        </div>
      </div>
      <div className={s.list}>
        {items.map((label) => (
          <button
            key={label}
            type="button"
            className={s.item}
            onClick={() => {
              onClose()
              onSelect?.(label)
            }}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className={`${s.item} ${s.itemDanger}`}
          onClick={() => {
            onClose()
            onLogout?.()
          }}
        >
          로그아웃
        </button>
      </div>
    </GnbDropdown>
  )
}
