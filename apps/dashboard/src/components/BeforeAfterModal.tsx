import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { ExdCloseIcon } from '@port/icon-library'
import * as s from './BeforeAfterModal.css'

type Pair = { id: string; label: string; before: string; after: string }

// 이전(SPiDER ExD 실제 화면) ↔ 현재(대시보드) 비교 쌍.
// 이미지는 apps/dashboard/public/ 에 배치 (없으면 이미지가 비어 보임).
const PAIRS: Pair[] = [
  {
    id: 'idle',
    label: '검색 전 화면',
    before: '/exd-before-logsearch.png',
    after: '/exd-after-idle.png',
  },
  {
    id: 'result',
    label: '검색 결과 화면',
    before: '/exd-before-logsearch2.png',
    after: '/exd-after-result.png',
  },
]

const IMPROVEMENTS = [
  '고밀도·과밀 정보 → 여백과 명확한 정보 계층으로 인지 부하 완화',
  '진한 그린 브랜드 → 장시간 관제에 편한 차분한 뉴트럴 + 액센트',
  '화면 단위 하드코딩 → 디자인 시스템 컴포넌트 기반으로 재구성(재사용)',
  '플레이스홀더 데이터 → 실제 시나리오 기반 데이터로 현실감 확보',
  '다크모드 · 접근성 · 상태(로딩/에러/빈 값) 처리 보강',
]

/**
 * BeforeAfterModal — 이전 제품 화면과 현재 대시보드를 드래그 슬라이더로 비교하는
 * 포트폴리오-메타 모달. (제품 컴포넌트가 아니라 개선 사례 소개용)
 */
export default function BeforeAfterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState(0)
  const [pos, setPos] = useState(50)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  useEffect(() => {
    if (!open) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTab(0)
    setPos(50)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const pair = PAIRS[tab]

  const moveTo = (clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }
  const onPointerDown = (e: ReactPointerEvent) => {
    dragging.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    moveTo(e.clientX)
  }
  const onPointerMove = (e: ReactPointerEvent) => {
    if (dragging.current) moveTo(e.clientX)
  }
  const stop = () => {
    dragging.current = false
  }

  return (
    <div
      className={s.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="UI/UX 개선 전후 비교"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={s.modal}>
        <header className={s.head}>
          <div>
            <div className={s.title}>UI/UX 개선 — Before / After</div>
            <div className={s.sub}>SPiDER ExD 실제 화면을 디자인 시스템 기반으로 재설계했습니다 · 핸들을 드래그해 비교하세요</div>
          </div>
          <button type="button" className={s.close} onClick={onClose} aria-label="닫기">
            <ExdCloseIcon size={18} />
          </button>
        </header>

        <div className={s.body}>
          {PAIRS.length > 1 && (
            <div className={s.tabs}>
              {PAIRS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={i === tab ? `${s.tab} ${s.tabActive}` : s.tab}
                  onClick={() => {
                    setTab(i)
                    setPos(50)
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          <div
            ref={trackRef}
            className={s.compare}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stop}
            onPointerCancel={stop}
          >
            <img className={s.imgAfter} src={pair.after} alt="개선 후 — 현재 대시보드" draggable={false} />
            <img
              className={s.imgBefore}
              src={pair.before}
              alt="개선 전 — 이전 SPiDER ExD 화면"
              draggable={false}
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            />
            <span className={s.tagBefore}>BEFORE</span>
            <span className={s.tagAfter}>AFTER</span>
            <div className={s.divider} style={{ left: `${pos}%` }}>
              <span className={s.handle} aria-hidden="true">
                ⟨⟩
              </span>
            </div>
          </div>

          <ul className={s.points}>
            {IMPROVEMENTS.map((t, i) => (
              <li key={i} className={s.point}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
