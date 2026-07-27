import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { ExdCloseIcon, ExdChevronLeftIcon, ExdChevronRightIcon } from '@port/icon-library'
import * as s from './BeforeAfterModal.css'

type Anno = { n: number; x: number; y: number; title: string; before: string; after: string; why: string }
type Pair = { id: string; label: string; before: string; after: string; notes: Anno[] }

// public/ 자산은 배포 base 를 따라야 한다. 임베드 빌드(vite.embed.config.ts)는 base 가 '/dashboard/'
// 이므로 절대경로 '/exd-*.png' 는 루트를 가리켜 404 가 난다. BASE_URL(dev='/', 임베드='/dashboard/')
// 을 접두어로 붙여 어느 배포 형태에서든 올바른 경로로 해석되게 한다.
const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`

// 이전(SPiDER ExD 실제 화면) ↔ 현재(대시보드) 비교 쌍.
// 이미지는 apps/dashboard/public/ 에 배치 (없으면 이미지가 비어 보임).
const PAIRS: Pair[] = [
  {
    id: 'idle',
    label: '검색 전 화면',
    before: asset('exd-before-logsearch.png'),
    after: asset('exd-after-idle.png'),
    notes: [
      {
        n: 1,
        x: 90,
        y: 7,
        title: '전역 액션 정렬',
        before: '검색조건과 한 줄에 뒤섞임',
        after: '타이틀과 같은 선상 우측으로 분리',
        why: '페이지 전역 명령과 조회 조건은 성격이 다른 액션이라 한 줄에 섞이면 위계가 무너지고 오조작 위험이 커집니다. 타이틀 선상 우측으로 모으면 “이 화면에서 할 수 있는 일”이 즉시 읽히고, 워크스페이스 등 다른 화면과 정렬이 통일돼 화면을 옮겨도 조작 위치가 일관됩니다.',
      },
      {
        n: 2,
        x: 38,
        y: 14,
        title: '검색조건 툴바',
        before: '액션·조건 혼재',
        after: '조건만 남긴 단일 카드',
        why: '조건 컨트롤만 하나의 카드로 묶어 “무엇으로 거르는가”라는 단일 역할을 부여했습니다. 액션과 분리되면서 조건 입력 동선이 짧아지고 툴바의 목적이 명확해집니다.',
      },
      {
        n: 3,
        x: 38,
        y: 19.5,
        title: 'AI 쿼리바',
        before: '단순 입력창',
        after: 'AI 추천 쿼리 진입점',
        why: '관제 분석가가 복잡한 검색식을 처음부터 작성하는 부담이 크기 때문에, AI 추천 쿼리를 검색의 1급 진입점으로 앞세워 시작 문턱을 낮췄습니다.',
      },
      {
        n: 4,
        x: 28,
        y: 30,
        title: '검색기록·템플릿',
        before: '긴 목록 상시 노출',
        after: '검색 전 2열 카드로 압축(점진적 노출)',
        why: '검색 전 단계의 핵심 과업은 “무엇을 검색할지” 정하는 것이라 관련 자산을 전면에 두되, 결과가 나오면 결과에 집중하도록 접어(progressive disclosure) 단계별 인지부하를 관리했습니다.',
      },
      {
        n: 5,
        x: 5.5,
        y: 16,
        title: 'LNB (좌측 내비게이션)',
        before: '좌측 내비 없음(상단 드롭다운)',
        after: '상시 8메뉴·현재 위치 강조',
        why: '여러 제품을 오가며 쓰는 글로벌 통합 콘솔이므로 전체 기능 구조와 현재 위치가 항상 드러나야 합니다. 매번 펼쳐야 보이는 상단 드롭다운은 탐색 비용이 크기 때문에, 좌측 상시 LNB로 정보 위계를 고정하고 활성 상태를 강조했습니다.',
      },
      {
        n: 6,
        x: 64,
        y: 2.5,
        title: 'GNB (전역 네비게이션)',
        before: '초록 밴드에 섹션 메뉴 + 유틸 아이콘 혼재',
        after: '전역 기능 전용 밴드(솔루션 전환·AI·알림 등)',
        why: '여러 솔루션으로 구성된 글로벌 제품임을 드러내려면 상단은 “제품 전환과 전역 기능”을, 화면 이동은 좌측 LNB가 맡도록 축을 분리해야 합니다. 섹션 메뉴를 LNB로 내리고 GNB에는 솔루션 스위처·AI·알림 등 전역 기능만 남겨 두 위계를 명확히 했습니다.',
      },
    ],
  },
  {
    id: 'result',
    label: '검색 결과 화면',
    before: asset('exd-before-logsearch2.png'),
    after: asset('exd-after-result.png'),
    notes: [
      {
        n: 1,
        x: 50,
        y: 27,
        title: '히스토그램',
        before: '분포 파악 어려움',
        after: '시간대별 분포 시각화',
        why: '수천 건 로그에서 이상 급증 구간을 먼저 시각적으로 포착하고 시간대를 좁혀 들어가는 것이 관제 분석의 자연스러운 흐름이라, 결과 위에 시간대 분포를 먼저 제시했습니다.',
      },
      {
        n: 2,
        x: 88,
        y: 41,
        title: '결과 툴바',
        before: '컨트롤 흩어짐',
        after: '헤더표시·프로파일·컬럼·피벗·CSV 정리',
        why: '결과를 다루는 컨트롤(표시·프로파일·컬럼·피벗·내보내기)이 흩어져 있으면 조작 대상을 찾기 어렵기 때문에, 결과 테이블 바로 위 한 곳에 모아 맥락에 맞게 배치했습니다.',
      },
      {
        n: 3,
        x: 21,
        y: 50,
        title: '심각도 색상 체계',
        before: '3단계 솔리드 배지 · 브랜드=그린',
        after: '5단계 저채도 틴트 · 브랜드=인디고',
        why: '관제 화면에서 위험도(심각도)를 색으로 즉시 구분하는 것은 필수 기능이라 색상 축을 심각도 신호에 우선 배정했습니다. 브랜드로 쓰던 그린이 이 위험도 색(정상/낮음)과 겹쳐 의미 혼선을 주기 때문에 브랜드를 인디고로 옮기고, 심각도는 Critical~Info 5단계로 확장하되 저채도 틴트로 낮춰 다수 경보가 쌓여도 색 소음이 줄도록 했습니다.',
      },
      {
        n: 4,
        x: 71,
        y: 49,
        title: '위협 IP 강조',
        before: '일반 텍스트',
        after: '적색 볼드 + ‘위협’ 태그',
        why: '악성 출처 식별은 분석가가 가장 빨리 찾아야 하는 정보라, 일반 값과 달리 error(적색) 볼드 + “위협” 태그로 강조 레이어를 따로 두어 스캔 한 번에 잡히게 했습니다. 적색은 시맨틱 error 토큰에 예약해 위협=적색 의미가 테마 간 일관됩니다.',
      },
      {
        n: 5,
        x: 15,
        y: 46,
        title: '핵심 컬럼',
        before: '12여 컬럼 과밀',
        after: '핵심 5컬럼 + 행 펼침 상세',
        why: '한 화면에 12여 컬럼을 펼치면 정작 중요한 정보가 묻히므로, 1차 스캔에 필요한 핵심 5개만 남기고 나머지는 행을 펼쳤을 때 상세로 내려 1차/2차 정보 위계를 나눴습니다.',
      },
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
                  <p className={s.noteWhy}>{a.why}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
