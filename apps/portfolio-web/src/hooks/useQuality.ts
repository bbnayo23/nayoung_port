import { useEffect, useState } from 'react'

export type Quality = 'high' | 'low'

/**
 * 렌더 품질 티어. 모바일/저사양에서 'low' → 포스트프로세싱 off, dpr/그림자 축소.
 * 판정: 터치(coarse pointer) · 작은 화면 · 적은 코어/메모리.
 */
export function useQuality(): Quality {
  const [q, setQ] = useState<Quality>('high')

  useEffect(() => {
    // 수동 강제 (?low / ?high) — 진단·저사양 강제용
    if (window.location.search.includes('low')) { setQ('low'); return }
    if (window.location.search.includes('high')) { setQ('high'); return }

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const small = window.matchMedia('(max-width: 820px)').matches
    const cores = navigator.hardwareConcurrency ?? 8
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
    const low = (coarse && small) || cores <= 4 || mem <= 4
    setQ(low ? 'low' : 'high')
  }, [])

  return q
}
