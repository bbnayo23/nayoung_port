import { brand, personal } from '../../data'
import type { RoomConfig } from '../scene/rooms'
import {
  hudRoot, scanlines, vfxTint, topBar, brandMark, brandName, topRight,
  textVersionWrap, textLink, textLinkIcon, textHint,
  hint, legendItem, kbd, kbdSep, legendLabel, wheelIcon, legendDivider,
  lockChip, lockText, lockName, lockSub, lockBtn,
  detailDock, detailInner, detailMain, detailSide, dockDesc,
  panelTag, panelConcept, panelName, panelLine, tagRow, tag,
  openBtn, ghostBtn,
} from './Hud.css'

/** 텍스트(읽기) 버전임을 알리는 문서 아이콘 */
function TextDocIcon() {
  return (
    <svg className={textLinkIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** 마우스 휠 아이콘 (확대/축소·진입 안내용) */
function WheelIcon() {
  return (
    <svg className={wheelIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6.5" y="2.5" width="11" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <line x1="12" y1="6" x2="12" y2="9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

/**
 * 코드 디멘션 위 2D 오버레이 — 2-state.
 * - 락온(focus, 진입 전): 하단 중앙 가벼운 lock 칩 (이름 + 진입)
 * - 진입(entered): 스크림 + 중앙 정렬 읽기 카드 (편안한 프로젝트 상세 + CTA)
 */
export function Hud({
  active,
  entered,
  onEnter,
  onExit,
  onShowText,
}: {
  active: RoomConfig | null
  entered: RoomConfig | null
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
        </div>
        <div className={topRight}>
          <div className={textVersionWrap}>
            <button type="button" className={textLink} onClick={onShowText}>
              <TextDocIcon />
              텍스트 버전 ↗
            </button>
            {/* 방 선택 전(초기)에만 — 왜·어디를 눌러야 하는지 안내 */}
            {!active && !entered && (
              <span className={textHint}>3D가 무거우면 여기서 보기</span>
            )}
          </div>
        </div>
      </header>

      {!active && !entered && (
        <div className={hint} role="group" aria-label="조작 방법">
          <span className={legendItem}>
            <kbd className={kbd}>방향키</kbd>
            <span className={legendLabel}>헤엄치기</span>
          </span>
          <span className={legendItem}>
            <kbd className={kbd}>Space</kbd>
            <span className={kbdSep}>/</span>
            <kbd className={kbd}>Shift</kbd>
            <span className={legendLabel}>위 · 아래</span>
          </span>

          <span className={legendDivider} aria-hidden />

          <span className={legendItem}>
            <WheelIcon />
            <span className={legendLabel}>휠로 확대 · 축소</span>
          </span>
          <span className={legendItem}>
            <WheelIcon />
            <span className={legendLabel}>다가가 휠 인 → 진입</span>
          </span>
          <span className={legendItem}>
            <kbd className={kbd}>Esc</kbd>
            <span className={legendLabel}>나가기</span>
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
