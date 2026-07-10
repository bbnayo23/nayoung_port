import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { ExdCloseIcon } from '@port/icon-library'
import * as s from './PortfolioNotice.css'

/** 알림(벨) 아이콘 — 브랜드 그라디언트 스트로크 */
const BellIcon = () => (
  <svg
    className={s.bell}
    viewBox="0 0 24 24"
    fill="none"
    stroke="url(#pnBell)"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="pnBell" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5b8def" />
        <stop offset="0.5" stopColor="#7c5cff" />
        <stop offset="1" stopColor="#b14fe6" />
      </linearGradient>
    </defs>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

interface PortfolioNoticeProps {
  open: boolean
  onClose: () => void
}

/**
 * 포트폴리오 안내 모달 — 대시보드 진입 시 노출.
 * 글래스모피즘 + 앰비언트 글로우 + 커서 3D 틸트 + 벨 헤일로.
 */
export default function PortfolioNotice({ open, onClose }: PortfolioNoticeProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  // 커서 추적 3D 틸트 + 하이라이트
  const handleTilt = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = panelRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(px - 0.5) * 9}deg`)
    el.style.setProperty('--rx', `${-(py - 0.5) * 9}deg`)
  }, [])

  const resetTilt = useCallback(() => {
    const el = panelRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])

  if (!open) return null

  return createPortal(
    <div className={s.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="안내">
      <div
        ref={panelRef}
        className={s.panel}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
      >
        <button type="button" className={s.closeBtn} onClick={onClose} aria-label="닫기">
          <ExdCloseIcon size={16} />
        </button>

        <div className={s.content}>
          <span className={s.badge}>
            <BellIcon />
          </span>

          <h2 className={s.title}>안내</h2>

          <div className={s.paragraphs}>
            <p>
              본 대시보드는 실제 운영 중인 서비스 화면이 아닌, <strong>포트폴리오 목적</strong>으로 제작한 예시
              디자인입니다.
            </p>
            <p>
              화면은 <strong>Design System의 공통 컴포넌트</strong>를 기반으로 구성되었으며, 컴포넌트의 재사용성과
              일관된 UI 구성을 확인할 수 있도록 제작되었습니다.
            </p>
            <p>
              현재 <strong>UI/UX 리팩터링</strong>을 지속적으로 진행하고 있으며, 디자인과 사용자 경험 개선에 따라
              화면 구성 및 인터랙션은 계속 업데이트될 예정입니다.
            </p>
          </div>

          <div className={s.footer}>
            <button type="button" className={s.confirmBtn} onClick={onClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
