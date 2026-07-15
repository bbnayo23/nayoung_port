import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGame } from '@/three/store'
import { damp3 } from '@/three/utils'
import type { RoomConfig } from '@/three/scene/rooms'
import { WALL_Z, ROOM_BACK_Z } from '@/three/scene/roomGeometry'

export type CameraMode = 'living' | 'focus' | 'room'

/**
 * 비행형 카메라.
 * - living : 캐릭터를 3/4 시점으로 3D 팔로우 (고도 y 포함 + 커서 패럴랙스)
 * - focus  : 에러 게이트 락온 — 글리치 비콘을 정면으로 들여다봄
 * - dive   : 블랙홀 흡입 — 게이트 중심으로 빠르게 줌인 (game.diving)
 * - room   : 차원 입장 — 캐릭터 뒤에서 프로젝트 차원 내부를 비춤
 */
export function CameraRig({ mode, room }: { mode: CameraMode; room: RoomConfig | null }) {
  const game = useGame()
  const { camera } = useThree()

  const desiredPos = useRef(new THREE.Vector3(0, 6, 11))
  const lookAt = useRef(new THREE.Vector3(0, 1.5, 0))
  const tmp = useRef(new THREE.Vector3())

  useFrame((_s, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    const c = game.charPos
    const rx = room?.doorPosition[0] ?? 0
    const py = room?.doorPosition[1] ?? 1.7 // 포탈 높이
    const pz = room?.doorPosition[2] ?? WALL_Z // 포탈 깊이
    const diving = game.diving.value
    const z = game.zoom.value // 휠 줌(작을수록 확대)

    let posLambda = 4.2
    let lookLambda = 5

    if (diving) {
      // 블랙홀 흡입: 떠 있는 포탈 중심으로 빠르게 줌인
      desiredPos.current.set(rx, py + 0.4, pz + 3.2)
      tmp.current.set(rx, py, pz)
      posLambda = 3.0
      lookLambda = 4
    } else if (mode === 'room') {
      // 차원 안: 캐릭터 뒤에서 안쪽을 바라봄 (고정 프레이밍 — 휠 줌 비활성)
      desiredPos.current.set(rx, 2.5, WALL_Z - 1.4)
      tmp.current.set(rx, 1.3, ROOM_BACK_Z + 1.6)
      posLambda = 3.2
      lookLambda = 3.2
    } else if (mode === 'focus') {
      // 포탈 락온: 떠 있는 포탈을 정면으로. 확대(z↓)하면 포탈로 다가감
      desiredPos.current.set(rx, py + 1.2 * z, pz + 6.4 * z)
      tmp.current.set(rx, py, pz)
      posLambda = 3.2
      lookLambda = 3.4
    } else {
      // 평상시 3D 비행 팔로우 + 커서 패럴랙스 (고도 추적) + 휠 줌
      const parX = (game.gaze.x - c.x) * 0.16
      const parY = (game.gaze.y - c.y) * 0.1
      desiredPos.current.set(c.x + parX, c.y + 3.0 * z + parY, c.z + 8.0 * z)
      tmp.current.set(c.x + parX * 0.5, c.y + 0.1, c.z - 1.4)
    }

    damp3(camera.position, desiredPos.current, posLambda, dt)
    damp3(lookAt.current, tmp.current, lookLambda, dt)
    camera.lookAt(lookAt.current)
  })

  return null
}
