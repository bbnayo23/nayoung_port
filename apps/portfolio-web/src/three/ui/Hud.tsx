import { brand, personal } from '../../data'
import type { RoomConfig } from '../scene/rooms'
import {
  hudRoot, scanlines, vfxTint, topBar, brandMark, brandName, topRight, textLink, counter, counterNum,
  hint, hintKey,
  lockChip, lockText, lockName, lockSub, lockBtn,
  detailDock, detailInner, detailMain, detailSide, dockDesc,
  panelTag, panelConcept, panelName, panelLine, tagRow, tag,
  openBtn, ghostBtn,
} from './Hud.css'

/**
 * 코드 디멘션 위 2D 오버레이 — 2-state.
 * - 락온(focus, 진입 전): 하단 중앙 가벼운 lock 칩 (이름 + 진입)
 * - 진입(entered): 스크림 + 중앙 정렬 읽기 카드 (편안한 프로젝트 상세 + CTA)
 */
export function Hud({
  active,
  entered,
  fixed = 0,
  onEnter,
  onExit,
  onShowText,
}: {
  active: RoomConfig | null
  entered: RoomConfig | null
  fixed?: number
  onEnter?: () => void
  onExit?: () => void
  onShowText?: () => void
}) {
  return (
    <div className={hudRoot}>
      {/* 코드 디멘션 디지털 질감 (지지직) */}
      <div className={scanlines} aria-hidden />
      <div className={vfxTint} aria-hidden />

      <header className={topBar}>
        <div className={brandName}>
          <span className={brandMark}>{brand.monogram}</span>
          {personal.nameEn}
          <span className={counter}>
            <span className={counterNum}>{fixed}</span> errors fixed
          </span>
        </div>
        <div className={topRight}>
          <button type="button" className={textLink} onClick={onShowText}>
            텍스트 버전 ↗
          </button>
        </div>
      </header>

      {!active && !entered && (
        <div className={hint}>
          <span>
            <span className={hintKey}>클릭</span>·<span className={hintKey}>방향키</span> 헤엄 ·
            <span className={hintKey}>Space/Shift</span> 상승·하강 ·
            <span className={hintKey}>스크롤</span> 확대/축소 ·
            에러에 다가가 <span className={hintKey}>스크롤 인</span> 다이브
          </span>
        </div>
      )}

      {/* 락온(진입 전) — 최소 정보 칩 */}
      {active && !entered && (
        <div className={lockChip}>
          <div className={lockText}>
            <span className={lockName}>{active.name}</span>
            <span className={lockSub}>스크롤 인 · 클릭으로 진입</span>
          </div>
          <button type="button" className={lockBtn} onClick={onEnter}>
            진입 ↵
          </button>
        </div>
      )}

      {/* 진입(상세) — 하단 도크. 3D 차원/애니메이션이 화면 대부분을 차지하고
          상세는 하단에만 얹혀 가리지 않는다. 투명 영역 클릭은 3D 로 통과 */}
      {entered && (
        <div className={detailDock}>
          <div className={detailInner} role="region" aria-label={`${entered.name} 상세`}>
            <div className={detailMain}>
              <span className={panelTag}>{entered.codeLabel}</span>
              <span className={panelConcept}>{entered.concept}</span>
              <h2 className={panelName}>{entered.name}</h2>
              <p className={panelLine}>{entered.tagline}</p>
              <p className={dockDesc}>{entered.description}</p>
              <div className={tagRow}>
                {entered.tags.map((t) => (
                  <span key={t} className={tag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className={detailSide}>
              {entered.href && (
                <a className={openBtn} href={entered.href} target="_blank" rel="noreferrer">
                  프로젝트 열기 ↗
                </a>
              )}
              <button type="button" className={ghostBtn} onClick={onExit}>
                나가기 (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
