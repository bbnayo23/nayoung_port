import { useEffect, useState } from 'react'
import { brand } from '../../data'
import { header, headerScrolled, logo, logoExpand, nav, navList, navLink, contactBtn } from './Nav.css'

const links = [
  { href: '#career', label: 'Career' },
  { href: '#projects', label: 'Projects' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#playground', label: 'Playground' },
]

export function Nav({ onShow3D }: { onShow3D?: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${header} ${scrolled ? headerScrolled : ''}`} role="banner">
      <a href="#hero" className={logo} aria-label={`Home — ${brand.expansion}`}>
        {brand.monogram}.
        <span className={logoExpand} aria-hidden="true">{brand.expansion}</span>
      </a>
      <nav className={nav} aria-label="Main navigation">
        <ul className={navList}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={navLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {onShow3D && (
          <button
            type="button"
            className={navLink}
            onClick={onShow3D}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            3D 공간 ↗
          </button>
        )}
        <a href="#contact" className={contactBtn}>
          Contact
        </a>
      </nav>
    </header>
  )
}
