import { useEffect, useRef } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useGame } from '../store'
import { clamp } from '../utils'
import { clampFlight } from '../scene/roomGeometry'

/** 한 번 클릭 시 커서 방향으로 헤엄쳐 나아가는 거리(스트로크) */
const STROKE = 3.4

const _dir = new THREE.Vector3()
const _origin = new THREE.Vector3()
const _pt = new THREE.Vector3()

/**
 * 코드 보이드 전체를 감싸는 거대한 투명 구(球)가 포인터 이벤트를 받는다.
 * 바닥 평면이 아니라 카메라 레이를 사용해 **3D 비행**을 구동한다.
 * - move  → 캐릭터 깊이의 커서 지점을 gaze 로 (시선/카메라 패럴랙스)
 * - click → 커서 방향으로 STROKE 만큼 앞선 3D 지점을 charTarget 으로 (헤엄 스트로크)
 */
export function FlightControls() {
  const game = useGame()

  const aim = (e: ThreeEvent<PointerEvent | MouseEvent>) => {
    _origin.copy(e.ray.origin) // = 카메라 위치
    _dir.copy(e.ray.direction).normalize()
    // 카메라→캐릭터 거리만큼 레이를 따라가면 "캐릭터 깊이의 커서 지점"이 나온다
    const depth = _origin.distanceTo(game.charPos)
    return { depth }
  }

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    const { depth } = aim(e)
    _pt.copy(_origin).addScaledVector(_dir, depth)
    game.gaze.set(_pt.x, _pt.y, _pt.z)
  }

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (game.diving.value) return // 다이브 중엔 입력 잠금
    e.stopPropagation()
    game.fixing.value = 1 // 이동 클릭마다 양손 수리 제스처(망치·드라이버) 발화
    const { depth } = aim(e)
    // 커서 깊이보다 살짝 앞으로(스트로크) → 클릭할수록 그 방향으로 헤엄쳐 나아감
    _pt.copy(_origin).addScaledVector(_dir, depth + STROKE)
    const [x, y, z] = clampFlight(_pt.x, _pt.y, _pt.z, game.mode.value, game.roomX.value)
    game.charTarget.set(x, y, z)
  }

  return (
    <mesh onPointerMove={onMove} onClick={onClick}>
      <sphereGeometry args={[42, 16, 12]} />
      {/* 보이지 않지만 안쪽 면에서 레이캐스트를 받는 구 */}
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} side={THREE.BackSide} />
    </mesh>
  )
}

// 휠 줌 한계 + 진입 임계
const ZOOM_MIN = 0.55
const ZOOM_MAX = 1.6
const ENTER_ZOOM = 0.62 // 게이트 락온 중 이만큼 확대하면 다이브

/**
 * 마우스 휠 줌 — 보이드/락온에서 카메라 거리(game.zoom)를 조절한다(작을수록 확대).
 * - focus(에러 게이트 락온): 스크롤 인으로 끝까지 확대 → 다이브 진입(onEnter)
 * - room(차원 안): 휠 비활성 — 3D 화면을 가리거나 의도치 않게 줌아웃되지 않도록.
 *   (퇴장은 Esc / "나가기" 버튼으로)
 * 모드 전환 시 zoom 은 World 에서 1로 리셋된다.
 */
export function WheelZoom({ onEnter }: { onEnter: () => void }) {
  const game = useGame()

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (game.diving.value) { e.preventDefault(); return }
      // 진입(차원 안)에서는 휠 줌/줌아웃을 적용하지 않는다
      if (game.mode.value === 'room') return
      e.preventDefault() // 페이지 스크롤 방지
      const dir = e.deltaY > 0 ? 1 : -1 // 아래로(축소) / 위로(확대)
      const z = clamp(game.zoom.value + dir * 0.1, ZOOM_MIN, ZOOM_MAX)
      game.zoom.value = z
      if (game.mode.value === 'focus' && z <= ENTER_ZOOM) onEnter()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [game, onEnter])

  return null
}

/** charTarget 위치에서 펄스로 번지는 3D 클릭 마커 (카메라를 향하는 빌보드 링) */
export function MoveMarker() {
  const game = useGame()
  const { camera } = useThree()
  const ring = useRef<THREE.Mesh>(null)
  const prevTarget = useRef(new THREE.Vector3().copy(game.charTarget))
  const t = useRef(1) // 1 = 완료(숨김), 0 에서 시작해 1 로 진행

  useFrame((_s, dt) => {
    const m = ring.current
    if (!m) return
    // 목표가 바뀌면 펄스 리셋
    if (prevTarget.current.distanceToSquared(game.charTarget) > 0.0004) {
      prevTarget.current.copy(game.charTarget)
      t.current = 0
      m.position.copy(game.charTarget)
    }
    m.quaternion.copy(camera.quaternion) // 빌보드: 항상 카메라를 향함
    if (t.current < 1) {
      t.current = Math.min(1, t.current + dt * 2.2)
      const e = t.current
      const scale = 0.2 + e * 0.9
      m.scale.set(scale, scale, scale)
      const mat = m.material as THREE.MeshBasicMaterial
      mat.opacity = (1 - e) * 0.6
      m.visible = true
    } else {
      m.visible = false
    }
  })

  return (
    <mesh ref={ring} visible={false}>
      <ringGeometry args={[0.34, 0.46, 32]} />
      <meshBasicMaterial color="#82aaff" transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}
