import { useEffect, useState } from 'react'

/**
 * 3D 경험을 렌더할 수 있는 환경인지 판정한다.
 * - WebGL 미지원 → 폴백
 * - prefers-reduced-motion → 폴백 (접근성)
 * - 매우 저사양(논리코어 2 이하 + 모바일 추정) → 폴백
 *
 * 판정 전에는 null 을 반환하므로 호출부에서 로딩/SSR 안전 처리 가능.
 */
export function useCanRender3D(): boolean | null {
  const [can, setCan] = useState<boolean | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let webgl = false
    try {
      const canvas = document.createElement('canvas')
      webgl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
      )
    } catch {
      webgl = false
    }

    const cores = navigator.hardwareConcurrency ?? 4
    const lowEnd = cores <= 2

    setCan(webgl && !reduced && !lowEnd)
  }, [])

  return can
}
