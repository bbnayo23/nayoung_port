import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, DoubleSide, type Group, type Mesh } from 'three'
import type { RoomConfig } from './rooms'
import { CODE_COLOR } from './codeData'

/** 어크리션 링 한 겹 (회전 속도/색/기울기 다르게) */
function Ring({ r, w, color, speed, tilt }: { r: number; w: number; color: string; speed: number; tilt: number }) {
  const ref = useRef<Mesh>(null)
  useFrame((_s, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <ringGeometry args={[r, r + w, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} side={DoubleSide} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

/**
 * 블랙홀 다이브 포탈 — 에러 게이트 자리에 열리는 소용돌이.
 * 어두운 이벤트 호라이즌 + 회전하는 어크리션 링(에러 빨강·시안·accent)이
 * 안쪽으로 빨려드는 느낌을 준다. entered 동안 빠르게 커지고, 사라질 땐 축소.
 */
export function BlackHole({ room }: { room: RoomConfig }) {
  const [px, py, pz] = room.doorPosition
  const root = useRef<Group>(null)
  const grow = useRef(0.001)

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime
    grow.current += (1 - grow.current) * (1 - Math.exp(-6 * dt))
    if (root.current) {
      const g = grow.current
      root.current.scale.setScalar(g)
      // 미세한 호흡 + 흡입 펄스
      root.current.rotation.z = Math.sin(t * 0.5) * 0.05
    }
  })

  return (
    <group ref={root} position={[px, py, pz + 0.1]}>
      {/* 바깥 글로우 헤일로 */}
      <mesh position={[0, 0, -0.06]}>
        <circleGeometry args={[2.6, 48]} />
        <meshBasicMaterial color={room.palette.accent} transparent opacity={0.18} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      {/* 어크리션 링들 */}
      <Ring r={1.5} w={0.5} color={CODE_COLOR.error} speed={1.6} tilt={0.5} />
      <Ring r={1.05} w={0.4} color={room.palette.accent} speed={-2.4} tilt={-0.35} />
      <Ring r={0.72} w={0.3} color="#37e0ff" speed={3.4} tilt={0.2} />
      {/* 이벤트 호라이즌 (빨려드는 검은 중심) */}
      <mesh>
        <circleGeometry args={[0.62, 48]} />
        <meshBasicMaterial color="#02030a" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.66, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.85} depthWrite={false} />
      </mesh>
    </group>
  )
}
