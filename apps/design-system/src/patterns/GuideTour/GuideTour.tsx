import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'
import * as s from './GuideTour.css'

export interface GuideStep {
  ref: RefObject<HTMLDivElement | null>
  title: string
  description: string
}

export interface GuideTourProps {
  open: boolean
  steps: GuideStep[]
  onClose: () => void
}

// 스포트라이트가 대상보다 살짝 넓게 감싸도록 여백
const PAD = 8
const CALLOUT_W = 320

/**
 * GuideTour — 온보딩 코치마크. 대상 요소를 스포트라이트로 강조하고 단계별 안내를 띄운다.
 * 강조된 대상을 클릭하거나 콜아웃의 "다음"을 누르면 다음 단계로 진행한다.
 * 대상은 `steps[].ref` 로 주입받으므로 도메인 데이터에 의존하지 않는다.
 */
export default function GuideTour({ open, steps, onClose }: GuideTourProps) {
  const [i, setI] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)

  // 열릴 때마다 첫 단계부터 — open 토글에 맞춘 의도된 리셋
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setI(0)
  }, [open])

  const step = steps[i]
  const isLast = i >= steps.length - 1

  const next = useCallback(() => {
    setI((n) => {
      if (n >= steps.length - 1) {
        onClose()
        return n
      }
      return n + 1
    })
  }, [steps.length, onClose])

  // 대상 위치 측정 (단계 변경·리사이즈·스크롤에 반응)
  useLayoutEffect(() => {
    if (!open || !step) return
    const measure = () => {
      const el = step.ref.current
      setRect(el ? el.getBoundingClientRect() : null)
    }
    measure()
    const raf = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [open, i, step])

  // 강조된 대상을 클릭하면 다음 단계로
  useEffect(() => {
    if (!open || !step) return
    const el = step.ref.current
    if (!el) return
    const handle = () => next()
    el.addEventListener('click', handle)
    return () => el.removeEventListener('click', handle)
  }, [open, i, step, next])

  // Esc 로 닫기
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || !step || !rect) return null

  const spot: CSSProperties = {
    top: rect.top - PAD,
    left: rect.left - PAD,
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  }

  // 콜아웃 — 대상 아래 공간이 넉넉하면 아래, 아니면 위. 가로는 뷰포트 안으로 클램프.
  const left = Math.max(16, Math.min(rect.left - PAD, window.innerWidth - CALLOUT_W - 16))
  const placeBelow = window.innerHeight - rect.bottom > 220
  const calloutStyle: CSSProperties = placeBelow
    ? { top: rect.bottom + PAD + 12, left }
    : { bottom: window.innerHeight - rect.top + PAD + 12, left }

  return (
    <div className={s.overlay} role="dialog" aria-modal="false" aria-label="사용 가이드">
      <div className={s.spotlight} style={spot} />
      <div className={s.callout} style={calloutStyle}>
        <div className={s.stepRow}>
          <span className={s.stepBadge}>
            {i + 1} / {steps.length}
          </span>
          <button type="button" className={s.skip} onClick={onClose}>
            건너뛰기
          </button>
        </div>
        <div className={s.title}>{step.title}</div>
        <div className={s.desc}>{step.description}</div>
        <div className={s.actions}>
          <button type="button" className={s.nextBtn} onClick={next}>
            {isLast ? '시작하기' : '다음'}
          </button>
        </div>
      </div>
    </div>
  )
}
