import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { brand, personal } from '@/data'
import {
  section, gridLines, content,
  eyebrow, eyebrowAccent,
  name, nameReg, rule, ruleAccent,
  body, col, lead, leadSep, bio, manifesto, manifestoMark,
  index, indexItem, indexNum, indexLabel, indexArrow,
  actions, btnPrimary, btnGhost, footMeta,
} from './Hero.css'

const GLYPHS = '!<>-_\\/[]{}=+*^?#§%&Ø0123456789'

function scrambled(text: string) {
  return text
    .split('')
    .map((c) => (c === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
    .join('')
}

/** 랜덤 글자로 지지직거리다 제자리를 찾아가는 디코딩 텍스트 */
function Scramble({
  text, className, playOnHover = false,
}: { text: string; className?: string; playOnHover?: boolean }) {
  const [display, setDisplay] = useState(() => (playOnHover ? text : scrambled(text)))
  const raf = useRef(0)

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      return
    }
    let tick = 0
    const step = () => {
      tick++
      const revealed = tick * 0.25
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const c = text[i]
        out += c === ' ' ? ' ' : i < revealed ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setDisplay(out)
      if (revealed < text.length) raf.current = requestAnimationFrame(step)
      else setDisplay(text)
    }
    raf.current = requestAnimationFrame(step)
  }, [text])

  useLayoutEffect(() => {
    // 마운트 시 디코딩 애니메이션 시작 (reduced-motion 분기에서만 동기 setState)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!playOnHover) run()
    return () => cancelAnimationFrame(raf.current)
  }, [run, playOnHover])

  return (
    <span className={className} onMouseEnter={playOnHover ? run : undefined}>
      {display}
    </span>
  )
}

const indexLinks = [
  { num: '01', label: 'Career', href: '#career' },
  { num: '02', label: 'Projects', href: '#projects' },
  { num: '03', label: 'Architecture', href: '#architecture' },
  { num: '04', label: 'Playground', href: '#playground' },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sec = sectionRef.current
    const stage = contentRef.current
    if (!sec || !stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // 1) 3D 패럴랙스 틸트 (rAF 보간)
    let targetRx = 0, targetRy = 0, curRx = 0, curRy = 0, raf = 0
    const onMove = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      targetRx = (x / r.width - 0.5) * 10
      targetRy = -(y / r.height - 0.5) * 10
    }
    const onLeave = () => {
      targetRx = 0
      targetRy = 0
    }
    const loop = () => {
      curRx += (targetRx - curRx) * 0.08
      curRy += (targetRy - curRy) * 0.08
      stage.style.setProperty('--rx', `${curRx.toFixed(2)}deg`)
      stage.style.setProperty('--ry', `${curRy.toFixed(2)}deg`)
      raf = requestAnimationFrame(loop)
    }
    sec.addEventListener('mousemove', onMove)
    sec.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    // 2) 마그네틱 버튼
    const btns = Array.from(sec.querySelectorAll<HTMLElement>('[data-magnetic]'))
    const btnCleanups = btns.map((btn) => {
      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect()
        const mx = (e.clientX - (r.left + r.width / 2)) * 0.3
        const my = (e.clientY - (r.top + r.height / 2)) * 0.4
        btn.style.setProperty('--mx', `${mx.toFixed(1)}px`)
        btn.style.setProperty('--my', `${my.toFixed(1)}px`)
      }
      const leave = () => {
        btn.style.setProperty('--mx', '0px')
        btn.style.setProperty('--my', '0px')
      }
      btn.addEventListener('mousemove', move)
      btn.addEventListener('mouseleave', leave)
      return () => {
        btn.removeEventListener('mousemove', move)
        btn.removeEventListener('mouseleave', leave)
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      sec.removeEventListener('mousemove', onMove)
      sec.removeEventListener('mouseleave', onLeave)
      btnCleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className={section} aria-label="Introduction">
      <div className={gridLines} aria-hidden="true" />

      <div ref={contentRef} className={content}>
        <div className={eyebrow}>
          <span>Portfolio — <Scramble text={brand.expansion} className={eyebrowAccent} /></span>
          <span>{personal.location}</span>
        </div>

        <h1 className={name}>
          <Scramble text={personal.nameEn} />
          <span className={nameReg} aria-hidden="true">®</span>
        </h1>

        <div className={rule} aria-hidden="true">
          <span className={ruleAccent} />
        </div>

        <div className={body}>
          <div className={col}>
            <p className={lead}>
              {personal.roles.map((r, i) => (
                <span key={r}>
                  {r}
                  {i < personal.roles.length - 1 && <span className={leadSep}>/</span>}
                </span>
              ))}
            </p>
            <p className={bio}>{personal.bio}</p>
            <span className={manifesto}>
              <span className={manifestoMark}>{brand.monogram}</span>
              {brand.manifesto.join(' ')}
            </span>

            <div className={actions}>
              <a href="#projects" className={btnPrimary} data-magnetic>View Work ↗</a>
              <a href={`mailto:${personal.email}`} className={btnGhost} data-magnetic>Get in touch</a>
            </div>
          </div>

          <nav className={index} aria-label="Sections">
            {indexLinks.map((l) => (
              <a key={l.href} href={l.href} className={indexItem}>
                <span className={indexNum}>{l.num}</span>
                <Scramble text={l.label} className={indexLabel} playOnHover />
                <span className={indexArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className={footMeta} aria-hidden="true">
        <span>Available for opportunities</span>
        <span>© 2026 — {personal.nameEn}</span>
      </div>
    </section>
  )
}
