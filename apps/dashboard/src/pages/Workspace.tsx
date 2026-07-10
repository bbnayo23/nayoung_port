import { Button, PageHeader } from '@port/design-system'
import * as s from './Workspace.css'

/** 그룹(Users) 아이콘 — 버튼 leftIcon 용 (stroke, currentColor) */
const UsersIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

/**
 * 워크스페이스 화면 — Figma "AW_ver0.1 — 콘텐츠 타이틀 헤더".
 * 콘텐츠 타이틀 헤더(타이틀 + 다크 액션 버튼) + 구분선, 그 아래 콘텐츠 영역.
 * 셸(GNB/LNB/Main 카드)은 AppLayout 이 제공하며 이 컴포넌트는 Main 콘텐츠만 담당한다.
 */
export default function Workspace() {
  return (
    <>
      <PageHeader
        title="워크스페이스"
        divider
        actions={
          <Button variant="dark" size="sm" leftIcon={<UsersIcon />}>
            그룹 설정
          </Button>
        }
      />
      <div className={s.body}>{/* 콘텐츠 영역 */}</div>
    </>
  )
}
