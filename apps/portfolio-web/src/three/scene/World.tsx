import { Suspense, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../store'
import { Lighting } from './Lighting'
import { CodeSpace } from './CodeSpace'
import { CodePortal } from './CodePortal'
import { BlackHole } from './BlackHole'
import { ProjectSpace } from './ProjectSpace'
import { ErrorTokens } from './ErrorTokens'
import { Character } from '../character/Character'
import { FlightControls, MoveMarker, WheelZoom } from '../controls/Controls'
import { KeyboardMove } from '../controls/KeyboardMove'
import { CameraRig } from '../camera/CameraRig'
import { Effects } from '../Effects'
import { rooms, type RoomConfig } from './rooms'
import { INTERIOR_STAND_Z, DOOR_FRONT_Z, FLIGHT_Y } from './roomGeometry'
import type { Quality } from '../../hooks/useQuality'

const ENTER_RADIUS = 1.8
// 헤드리스 SwiftShader 캡처 진단용 (URL 에 ?nofx 시 포스트프로세싱 끔)
const NO_FX = typeof window !== 'undefined' && window.location.search.includes('nofx')

/** 캐릭터가 에러 게이트 락온 범위(x/z)에 들어왔는지 감지 → activeRoom 갱신 (다이브 중엔 비활성) */
function RoomProximity({
  enabled,
  onChange,
}: {
  enabled: boolean
  onChange: (room: RoomConfig | null) => void
}) {
  const game = useGame()
  const current = useRef<string | null>(null)

  useFrame(() => {
    if (!enabled) return
    let found: RoomConfig | null = null
    for (const r of rooms) {
      // 떠 있는 포탈의 x/z 근접으로 락온 (높이는 무관 — 비행 중 수평 접근)
      const dx = game.charPos.x - r.doorPosition[0]
      const dz = game.charPos.z - r.doorPosition[2]
      if (dx * dx + dz * dz < ENTER_RADIUS * ENTER_RADIUS) {
        found = r
        break
      }
    }
    const id = found?.id ?? null
    if (id !== current.current) {
      current.current = id
      onChange(found)
    }
  })

  return null
}

export function World({
  active,
  entered,
  quality,
  onRoomChange,
  onEnter,
  onExit,
  onFixError,
}: {
  active: RoomConfig | null
  entered: RoomConfig | null
  quality: Quality
  onRoomChange: (room: RoomConfig | null) => void
  onEnter: (room?: RoomConfig) => void
  onExit: () => void
  onFixError: () => void
}) {
  const game = useGame()
  const room = entered ?? active
  const mode = entered ? 'room' : active ? 'focus' : 'living'

  // 프레임 루프(컨트롤/카메라)가 읽도록 모드/게이트를 ref 에 반영
  game.mode.value = mode
  game.roomX.value = room?.doorPosition[0] ?? null
  game.tier.value = quality

  // 포탈 락온 라이징 엣지에 '뚝딱' 수리 펄스 발사 (RoomProximity 가 id 변경시에만 onChange → 머무는 동안 재발사 안 함)
  const prevActiveId = useRef<string | null>(null)
  useEffect(() => {
    if (active && active.id !== prevActiveId.current) game.fixing.value = 1
    prevActiveId.current = active?.id ?? null
  }, [active, game])

  // 블랙홀 다이브 / 퇴장 시퀀스 (흡입 → 차원 내부 도착 → 입력 해제)
  const prevEntered = useRef<RoomConfig | null>(null)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    if (entered) {
      game.diving.value = true
      game.fixing.value = 1 // 다이브 순간 두 번째 '뚝딱'
      // 1) 공중에 떠 있는 포탈(블랙홀 중심)으로 빨려듦
      const [px, py, pz] = entered.doorPosition
      game.charTarget.set(px, py, pz)
      // 2) 잠시 후 차원 안쪽으로 진입하며 입력 해제
      timer = setTimeout(() => {
        game.charTarget.set(px, 1.4, INTERIOR_STAND_Z)
        game.diving.value = false
      }, 760)
    } else if (prevEntered.current) {
      // 퇴장: 보이드의 게이트 앞으로 다시 헤엄쳐 나옴
      game.diving.value = false
      game.charTarget.set(prevEntered.current.doorPosition[0], FLIGHT_Y, DOOR_FRONT_Z)
    }
    prevEntered.current = entered
    return () => { if (timer) clearTimeout(timer) }
  }, [entered, game])

  // 락온/입장 상태가 바뀌면 휠 줌을 1로 리셋 (매 컨텍스트 중립 줌에서 시작)
  useEffect(() => {
    game.zoom.value = 1
  }, [active, entered, game])

  return (
    <>
      <color attach="background" args={['#05060f']} />
      <fog attach="fog" args={['#0a0b24', 9, 40]} />

      <Lighting />
      <CodeSpace quality={quality} />
      <Suspense fallback={null}>
        <ErrorTokens count={quality === 'high' ? 4 : 3} onFix={onFixError} />
      </Suspense>

      {rooms.map((r) => (
        <CodePortal
          key={r.id}
          room={r}
          active={active?.id === r.id}
          entered={entered?.id === r.id}
          onDive={onEnter}
        />
      ))}
      {/* 다이브 중/입장 시 블랙홀 포탈 */}
      {entered && <BlackHole room={entered} />}
      {/* 프로젝트 차원은 다가가거나 진입했을 때만 렌더 (성능) */}
      {room && <ProjectSpace room={room} />}

      <Character />

      <FlightControls />
      <MoveMarker />
      <KeyboardMove onEnter={() => onEnter()} onExit={onExit} />
      <WheelZoom onEnter={() => onEnter()} />
      <RoomProximity enabled={!entered} onChange={onRoomChange} />
      <CameraRig mode={mode} room={room} />

      {!NO_FX && quality === 'high' && <Effects />}
    </>
  )
}
