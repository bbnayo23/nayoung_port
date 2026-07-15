import { useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { GlassCursor } from '@/components/GlassCursor'
import { Hero } from '@/sections/Hero'
import { Career } from '@/sections/Career'
import { Projects } from '@/sections/Projects'
import { Architecture } from '@/sections/Architecture'
import { Playground } from '@/sections/Playground'
import { Contact } from '@/sections/Contact'
import { main } from './MainPage.css'

/**
 * 접근성 · 저사양 · prefers-reduced-motion 환경을 위한 스크롤형 폴백.
 * 3D 경험과 동일한 데이터(`data/index.ts`)를 공유한다.
 */
export default function FallbackPage({ onShow3D }: { onShow3D?: () => void }) {
  // 모든 유리 패널([data-glass])에 커서 추적 글레어 + 3D 틸트 배선
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-glass]'))
    const cleanups = els.map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - r.left
        const y = e.clientY - r.top
        el.style.setProperty('--gx', `${x}px`)
        el.style.setProperty('--gy', `${y}px`)
        el.style.setProperty('--tx', `${(x / r.width - 0.5) * 8}deg`)
        el.style.setProperty('--ty', `${-(y / r.height - 0.5) * 8}deg`)
      }
      const leave = () => {
        el.style.setProperty('--tx', '0deg')
        el.style.setProperty('--ty', '0deg')
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      }
    })
    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <>
      <GlassCursor />
      <Nav onShow3D={onShow3D} />
      <main className={main}>
        <Hero />
        <Career />
        <Projects />
        <Architecture />
        <Playground />
        <Contact />
      </main>
    </>
  )
}
