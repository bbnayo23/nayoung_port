import { useEffect, useRef } from 'react'
import { lens, lensInner, lensGlass } from './GlassCursor.css'

const SIZE = 50
const ZOOM = 1.8
// 이 요소들 위에서는 돋보기를 숨겨 정상 hover/클릭이 보이도록 한다
const INTERACTIVE = 'a, button, input, textarea, select, label, header, nav, [role="button"], [data-magnetic]'

/**
 * 돋보기 글래스 커서.
 * main을 복제해 커서 아래 지점을 확대(ZOOM)하여 원형 렌즈로 보여준다.
 * 터치/감소모션에서는 비활성.
 */
export function GlassCursor() {
  const lensRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lensRef.current
    const inner = innerRef.current
    if (!el || !inner) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let cx = 0, cy = 0, built = false, shown = false

    const build = () => {
      const main = document.querySelector('main')
      if (!main) return
      inner.replaceChildren()
      const clone = main.cloneNode(true) as HTMLElement
      clone.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))
      // 클론은 정적 스냅샷 — 애니메이션/블러/인터랙션 제거로 또렷하게
      clone.querySelectorAll<HTMLElement>('*').forEach((n) => {
        n.style.animation = 'none'
        n.style.transition = 'none'
        n.style.backdropFilter = 'none'
        ;(n.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter = 'none'
      })
      clone.style.margin = '0'
      inner.style.width = `${(main as HTMLElement).offsetWidth}px`
      inner.appendChild(clone)
      built = true
    }

    const place = () => {
      const docX = cx + window.scrollX
      const docY = cy + window.scrollY
      inner.style.transform =
        `translate(${(SIZE / 2 - docX * ZOOM).toFixed(1)}px, ${(SIZE / 2 - docY * ZOOM).toFixed(1)}px) scale(${ZOOM})`
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
    }

    const onMove = (e: PointerEvent) => {
      cx = e.clientX
      cy = e.clientY
      // 링크·버튼·Nav 위에서는 돋보기를 숨긴다 (정상 hover/클릭 노출)
      const target = e.target as Element | null
      if (target?.closest?.(INTERACTIVE)) {
        if (shown) { shown = false; el.style.opacity = '0' }
        return
      }
      if (!built) build()
      if (!shown) { shown = true; el.style.opacity = '1' }
      place()
    }
    const onScroll = () => { if (shown) place() }
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) { el.style.opacity = '0'; shown = false }
    }
    const onResize = () => { built = false; inner.replaceChildren() }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('pointerout', onOut)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('pointerout', onOut)
    }
  }, [])

  return (
    <div ref={lensRef} className={lens} aria-hidden="true">
      <div ref={innerRef} className={lensInner} />
      <div className={lensGlass} />
    </div>
  )
}
