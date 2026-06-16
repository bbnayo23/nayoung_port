import { brand, personal, techStack } from '../../data'
import {
  section, noiseLayer, scanlines, scanBar, content,
  sticker, stickerDot,
  nameWrap, name,
  manifesto, manifestoBig, initialN, initialY, manifestoSub, stamp,
  bio, roles, roleTag, stack, chip, chipAccent, chipPurple,
  actions, btnPrimary, btnGhost,
  symbols, symbol, scrollHint, scrollArrow,
} from './Hero.css'

export function Hero() {
  return (
    <section id="hero" className={section} aria-label="Introduction">
      <div className={noiseLayer} aria-hidden="true" />
      <div className={scanlines} aria-hidden="true" />
      <div className={scanBar} aria-hidden="true" />

      {/* 도형 심볼 — 글리치 포스터의 기하 기호 */}
      <div className={symbols} aria-hidden="true">
        <svg className={symbol} viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="14" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className={symbol} viewBox="0 0 34 34" fill="none">
          <rect x="4" y="4" width="26" height="26" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="17" r="4" fill="currentColor" />
        </svg>
        <svg className={symbol} viewBox="0 0 34 34" fill="none">
          <path d="M17 4 L31 30 H3 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <svg className={symbol} viewBox="0 0 34 34" fill="none">
          <path d="M6 6 L28 28 M28 6 L6 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className={symbol} viewBox="0 0 34 34" fill="none">
          <rect x="5" y="5" width="24" height="24" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className={content}>
        <span className={sticker}>
          <span className={stickerDot} aria-hidden="true" />
          REC · Available for opportunities
        </span>

        <div className={nameWrap}>
          <h1 className={name} data-text={personal.nameEn}>
            {personal.nameEn}
          </h1>
        </div>

        <div className={manifesto}>
          <p className={manifestoBig} data-text="Next Yourself.">
            <span className={initialN}>N</span>ext{' '}
            <span className={initialY}>Y</span>ourself.
          </p>
          <span className={stamp} aria-hidden="true">{brand.monogram}</span>
          <span className={manifestoSub}>{brand.manifesto[1]} {brand.manifesto[2]}</span>
        </div>

        <p className={bio}>{personal.bio}</p>

        <div className={roles} aria-label="Roles">
          {personal.roles.map((r) => (
            <span key={r} className={roleTag}>{r}</span>
          ))}
        </div>

        <div className={stack} aria-label="Tech stack">
          {techStack.map((tech) => (
            <span
              key={tech.name}
              className={`${chip} ${tech.type === 'ai' ? chipPurple : tech.type === 'lang' ? chipAccent : ''}`}
            >
              {tech.name}
            </span>
          ))}
        </div>

        <div className={actions}>
          <a href="#projects" className={btnPrimary}>View Projects →</a>
          <a href={`mailto:${personal.email}`} className={btnGhost}>Get in touch</a>
        </div>
      </div>

      <span className={scrollHint} aria-hidden="true">
        <span className={scrollArrow}>↓</span>
        scroll
      </span>
    </section>
  )
}
