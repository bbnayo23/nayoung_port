import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { legacyFilters, legacyProjects } from '@/data/legacy'
import type { LegacyFilter, LegacyProject } from '@/data/legacy'
import {
  head, title, period, note,
  filters, filterChip,
  grid, cardBtn, thumbBox, thumbImg, cardBody, cardTitle, cardRole, empty,
  overlay, dialog, dialogClose, dialogTitle, dialogRole, dialogBody,
  viewer, stage, stageImg, navBtn, thumbs, thumbBtn, thumbBtnImg,
  info, infoLabel, metaList, metaItem, metaKey, metaLink, points, point,
} from './LegacyWork.css'

/** 상세 모달 — 이미지 뷰어 + 프로젝트 정보. */
function DetailDialog({ project, onClose }: { project: LegacyProject; onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const total = project.images.length

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + total) % total),
    [total],
  )

  // Esc 닫기 · ←/→ 이미지 이동 · 배경 스크롤 잠금
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [go, onClose])

  const meta: { key: string; value: ReactNode }[] = [
    { key: 'Client', value: project.client },
    { key: 'Date', value: project.period },
    { key: 'Role', value: project.participation },
  ]
  if (project.url) {
    meta.push({
      key: 'URL',
      value: (
        <a className={metaLink} href={project.url} target="_blank" rel="noreferrer">
          {project.url}
        </a>
      ),
    })
  }

  return createPortal(
    <div
      className={overlay}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={dialog} role="dialog" aria-modal="true" aria-label={project.title}>
        <button ref={closeRef} type="button" className={dialogClose} onClick={onClose} aria-label="닫기">
          ✕
        </button>

        <h4 className={dialogTitle}>{project.title}</h4>
        <p className={dialogRole}>{project.role}</p>

        <div className={dialogBody}>
          <div className={viewer}>
            <div className={stage}>
              <img
                className={stageImg}
                src={project.images[index]}
                alt={`${project.title} 상세 이미지 ${index + 1}`}
              />
              {total > 1 && (
                <>
                  <button
                    type="button"
                    className={navBtn}
                    data-dir="prev"
                    onClick={() => go(-1)}
                    aria-label="이전 이미지"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className={navBtn}
                    data-dir="next"
                    onClick={() => go(1)}
                    aria-label="다음 이미지"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {total > 1 && (
              <div className={thumbs}>
                {project.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className={thumbBtn}
                    aria-current={i === index}
                    aria-label={`${i + 1}번째 이미지 보기`}
                    onClick={() => setIndex(i)}
                  >
                    <img className={thumbBtnImg} src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={info}>
            <section>
              <h5 className={infoLabel}>Project Information</h5>
              <ul className={metaList}>
                {meta.map((m) => (
                  <li key={m.key} className={metaItem}>
                    <span className={metaKey}>{m.key}</span>
                    <span>{m.value}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h5 className={infoLabel}>Detail</h5>
              <ul className={points}>
                {project.points.map((p) => (
                  <li key={p} className={point}>{p}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/**
 * 이전 이력(2018 — 2022) 포트폴리오 갤러리.
 * 구버전 포트폴리오 사이트의 Portfolio 섹션만 옮겨온 것.
 */
export function LegacyWork() {
  const [active, setActive] = useState<LegacyFilter | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const list =
    active === 'all'
      ? legacyProjects
      : legacyProjects.filter((p) => p.filters.includes(active))
  const opened = legacyProjects.find((p) => p.id === openId) ?? null

  return (
    <>
      <div className={head}>
        <h3 className={title}>Earlier Work</h3>
        <span className={period}>2018 — 2022</span>
      </div>
      <p className={note}>
        인터커뮤즈 · 한국정보보안원 재직 시절의 웹디자인 · 퍼블리싱 · 프론트엔드 작업.
        카드를 누르면 상세 화면과 프로젝트 정보를 볼 수 있습니다.
      </p>

      <div className={filters} role="group" aria-label="이전 작업 분류 필터">
        {legacyFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={filterChip}
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className={empty}>해당 분류의 작업이 없습니다.</p>
      ) : (
        <div className={grid}>
          {list.map((p) => (
            <button
              key={p.id}
              type="button"
              className={cardBtn}
              onClick={() => setOpenId(p.id)}
              aria-label={`${p.title} 상세 보기`}
            >
              <span className={thumbBox}>
                <img className={thumbImg} src={p.thumb} alt="" loading="lazy" />
              </span>
              <span className={cardBody}>
                <span className={cardTitle}>{p.title}</span>
                <span className={cardRole}>{p.role}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {opened && <DetailDialog project={opened} onClose={() => setOpenId(null)} />}
    </>
  )
}
