import { personal } from '../../data'
import {
  section, inner, sectionTag, sectionTitle, sectionDesc,
  links, link, linkLeft, linkIcon, linkLabel, linkValue, linkArrow,
  footer, footerLeft, footerRight,
} from './Contact.css'

const contactLinks = [
  {
    icon: '✉',
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: '↗',
    label: 'GitHub',
    value: personal.github.replace('https://', ''),
    href: personal.github,
  },
]

export function Contact() {
  return (
    <section id="contact" className={section} aria-label="Contact">
      <div className={inner}>
        <span className={sectionTag}>05 — Contact</span>
        <h2 className={sectionTitle}>Get in Touch</h2>
        <p className={sectionDesc}>
          흥미로운 프로젝트나 협업 제안이 있다면 언제든지 연락주세요.
        </p>

        <nav className={links} aria-label="Contact links">
          {contactLinks.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className={link}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <div className={linkLeft}>
                <span className={linkIcon} aria-hidden="true">{c.icon}</span>
                <div>
                  <p className={linkLabel}>{c.label}</p>
                  <p className={linkValue}>{c.value}</p>
                </div>
              </div>
              <span className={linkArrow} aria-hidden="true">→</span>
            </a>
          ))}
        </nav>

        <footer className={footer}>
          <span className={footerLeft}>nayoung.dev</span>
          <span className={footerRight}>
            Built with React 19 · vanilla-extract · Turborepo
          </span>
        </footer>
      </div>
    </section>
  )
}
