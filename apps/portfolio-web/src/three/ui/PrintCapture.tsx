import { useEffect, useRef } from 'react'

/**
 * 인쇄(브라우저 Print → "PDF로 저장") 대응.
 *
 * WebGL 캔버스는 합성 후 drawing buffer 가 비워지므로 인쇄 시 흰 화면으로 나온다.
 * beforeprint 시점에 캔버스를 PNG 로 스냅샷해 이미지로 얹어, 렌더된 3D 화면이
 * 그대로 PDF 에 담기도록 한다. (Experience 의 Canvas 는 preserveDrawingBuffer: true 필요)
 *
 * 화면/인쇄 전환과 이미지 표시는 styles/print.css 가 담당한다(.print-snapshot).
 */
export function PrintCapture() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // 이 컴포넌트는 3D 모드에서만 마운트된다. 인쇄 격리(styles/print.css)가
    // 텍스트 폴백 인쇄까지 지우지 않도록, 3D 일 때만 body 에 표식을 단다.
    document.body.classList.add('has-3d-print')

    const snapshot = () => {
      const canvas = document.querySelector('canvas')
      const img = imgRef.current
      if (!canvas || !img) return
      try {
        img.src = canvas.toDataURL('image/png')
      } catch {
        // toDataURL 실패(컨텍스트 로스트 등) 시 조용히 무시 — 기존 동작으로 폴백
      }
    }

    window.addEventListener('beforeprint', snapshot)
    // Safari 등 beforeprint 미지원 브라우저 대비
    const mql = window.matchMedia('print')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) snapshot()
    }
    mql.addEventListener('change', onChange)

    return () => {
      window.removeEventListener('beforeprint', snapshot)
      mql.removeEventListener('change', onChange)
      document.body.classList.remove('has-3d-print')
    }
  }, [])

  return <img ref={imgRef} className="print-snapshot" alt="" aria-hidden="true" decoding="sync" />
}
