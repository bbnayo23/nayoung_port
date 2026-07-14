import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { ExdCloseIcon, ExdChevronLeftIcon, ExdChevronRightIcon } from '@port/icon-library'
import * as s from './BeforeAfterModal.css'

// 화면 위에 얹는 번호 주석(화면설계서 스타일). x/y 는 이미지(1600×1000) 기준 백분율 위치.
type Anno = { n: number; x: number; y: number; title: string; before: string; after: string }
type Pair = { id: string; label: string; before: string; after: string; notes: Anno[] }

// 이전(SPiDER ExD 실제 화면) ↔ 현재(대시보드) 비교 쌍.
// 이미지는 apps/dashboard/public/ 에 배치 (없으면 이미지가 비어 보임).
const PAIRS: Pair[] = [
  {
    id: 'idle',
    label: '검색 전 화면',
    before: '/exd-before-logsearch.png',
    after: '/exd-after-idle.png',
    notes: [
      { n: 1, x: 90, y: 7, title: '전역 액션 정렬', before: '검색조건과 한 줄에 뒤섞임', after: '타이틀과 같은 선상 우측으로 분리' },
      { n: 2, x: 40, y: 14, title: '검색조건 툴바', before: '액션·조건 혼재', after: '조건만 남긴 단일 카드' },
      { n: 3, x: 40, y: 19.5, title: 'AI 쿼리바', before: '단순 입력창', after: 'AI 추천 쿼리 진입점' },
      { n: 4, x: 30, y: 30, title: '검색기록·템플릿', before: '긴 목록 상시 노출', after: '검색 전 2열 카드로 압축(점진적 노출)' },
      { n: 5, x: 6, y: 14, title: 'LNB', before: '좌측 내비 없음(상단 드롭다운)', after: '상시 8메뉴·현재 위치 강조' },
    ],
  },
  {
    id: 'result',
    label: '검색 결과 화면',
    before: '/exd-before-logsearch2.png',
    after: '/exd-after-result.png',
    notes: [
      { n: 1, x: 50, y: 27, title: '히스토그램', before: '분포 파악 어려움', after: '시간대별 분포 시각화' },
      { n: 2, x: 88, y: 41, title: '결과 툴바', before: '컨트롤 흩어짐', after: '헤더표시·프로파일·컬럼·피벗·CSV 정리' },
      { n: 3, x: 21, y: 50, title: '심각도 배지', before: '3단계 솔리드', after: '5단계 status 소프트 틴트' },
      { n: 4, x: 71, y: 49, title: '위협 IP 강조', before: '일반 텍스트', after: '적색 볼드 + ‘위협’ 태그' },
      { n: 5, x: 15, y: 46, title: '핵심 컬럼', before: '12여 컬럼 과밀', after: '핵심 5컬럼 + 행 펼침 상세' },
    ],
  },
]

/**
 * BeforeAfterModal — 이전 제품 화면과 현재 대시보드를 드래그 슬라이더로 비교하는
 * 포트폴리오-메타 모달. (제품 컴포넌트가 아니라 개선 사례 소개용)
 */
export default function BeforeAfterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState(0)
  const [pos, setPos] = useState(50)
  const [activeAnno, setActiveAnno] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  useEffect(() => {
    if (!open) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTab(0)
    setPos(50)
    setActiveAnno(null)
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
            <div className={s.sub}>SPiDER ExD 실제 화면을 디자인 시스템 기반으로 재설계했습니다 · 핸들을 드래그해 비교하고, 번호를 짚어 변경점을 확인하세요</div>
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
                    setActiveAnno(null)
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
                <ExdChevronLeftIcon size={12} />
                <ExdChevronRightIcon size={12} />
              </span>
            </div>

            {/* 변경점 번호 마커 (화면설계서 스타일) */}
            {pair.notes.map((a) => (
              <button
                key={a.n}
                type="button"
                className={activeAnno === a.n ? `${s.pin} ${s.pinActive}` : s.pin}
                style={{ left: `${a.x}%`, top: `${a.y}%` }}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseEnter={() => setActiveAnno(a.n)}
                onMouseLeave={() => setActiveAnno(null)}
                onFocus={() => setActiveAnno(a.n)}
                onBlur={() => setActiveAnno(null)}
                aria-label={`${a.n}. ${a.title}`}
              >
                {a.n}
                {activeAnno === a.n && <span className={s.pinTip}>{a.title}</span>}
              </button>
            ))}
          </div>

          <ol className={s.notes}>
            {pair.notes.map((a) => (
              <li
                key={a.n}
                className={activeAnno === a.n ? `${s.note} ${s.noteActive}` : s.note}
                onMouseEnter={() => setActiveAnno(a.n)}
                onMouseLeave={() => setActiveAnno(null)}
              >
                <span className={s.noteNum}>{a.n}</span>
                <div className={s.noteBody}>
                  <div className={s.noteTitle}>{a.title}</div>
                  <div className={s.noteDiff}>
                    <span className={s.noteBefore}>{a.before}</span>
                    <span className={s.noteArrow}>→</span>
                    <span className={s.noteAfter}>{a.after}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
