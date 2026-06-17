import { Suspense, useRef, useState } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { AdditiveBlending, DoubleSide, type Group, type Mesh, type MeshBasicMaterial } from 'three'
import type { RoomConfig } from './rooms'
import { CODE_COLOR } from './codeData'
import { CODE_FONT } from './FloatingCode'

const R = 1.5 // 포탈 반경

/**
 * 프로젝트 **포탈** — 코드/에러 잡음과 확연히 구분되는, 공중에 떠 있는 발광 게이트웨이.
 * 프로젝트 accent 컬러의 발광 링(토러스) + 회전 에너지 링 + 어두운 아퍼처(차원 입구)로
 * "포탈"임을 명확히 한다. 진입 경로인 에러는 작은 빨간 서브라벨로 유지(컨셉 보존).
 * 다가가면(active) 더 밝아지고, 클릭/Enter/스크롤-인 하면 블랙홀로 다이브(onDive).
 */
export function CodePortal({
  room,
  active,
  entered,
  onDive,
}: {
  room: RoomConfig
  active: boolean
  entered: boolean
  onDive: (room: RoomConfig) => void
}) {
  const [px, py, pz] = room.doorPosition
  const accent = room.palette.accent
  const group = useRef<Group>(null)
  const spin = useRef<Mesh>(null)
  const frame = useRef<Mesh>(null)
  const errg = useRef<Group>(null)
  const [hover, setHover] = useState(false)
  const on = active || entered

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime
    if (group.current) group.current.position.y = py + Math.sin(t * 0.7 + px) * 0.12 // 부유
    if (spin.current) spin.current.rotation.z += dt * (on ? 0.9 : 0.4)
    if (frame.current) {
      const m = frame.current.material as MeshBasicMaterial
      m.opacity = (on || hover ? 1 : 0.72) + Math.sin(t * 2.2 + px) * 0.1
    }
    // 에러 서브라벨에만 미세 글리치
    if (errg.current) {
      const burst = Math.sin(t * 47 + px) > 0.9 ? 1 : 0
      errg.current.position.x = burst * Math.sin(t * 80) * 0.05
    }
  })

  // 비대칭 기울기 — 포탈마다 다른 yaw/roll 로 비정형성 부여
  const yaw = -px * 0.05
  const roll = px > 0 ? -0.07 : 0.07

  return (
    <group
      ref={group}
      position={[px, py, pz]}
      rotation={[-0.04, yaw, roll]}
      onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onDive(room) }}
      onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto' }}
    >
      {/* 외곽 글로우 헤일로 (accent) — 포탈 식별 핵심 */}
      <mesh position={[0, 0, -0.12]}>
        <circleGeometry args={[R * 1.7, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={on ? 0.22 : 0.12} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      {/* 회전 에너지 링 (육각, 테크 포탈 느낌) */}
      <mesh ref={spin} position={[0, 0, -0.02]}>
        <ringGeometry args={[R + 0.16, R + 0.28, 6, 1]} />
        <meshBasicMaterial color={accent} transparent opacity={0.5} side={DoubleSide} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      {/* 포탈 프레임 (accent 발광 토러스) */}
      <mesh ref={frame}>
        <torusGeometry args={[R, 0.085, 16, 64]} />
        <meshBasicMaterial color={accent} toneMapped={false} transparent opacity={0.8} />
      </mesh>
      {/* 아퍼처 — 어두운 차원 입구 + accent 라디얼 */}
      <mesh position={[0, 0, -0.06]}>
        <circleGeometry args={[R, 48]} />
        <meshBasicMaterial color="#070b16" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[R - 0.15, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0.14} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* 텍스트(개별 Suspense 격리) */}
      <Suspense fallback={null}>
        {/* 프로젝트 이름 (accent, 큼) — 포탈 정체성 */}
        <Text font={CODE_FONT} fontSize={0.26} color={accent} anchorX="center" anchorY="middle" maxWidth={R * 1.7} position={[0, 0.42, 0.05]} outlineWidth={0} material-toneMapped={false}>
          {room.name}
        </Text>
        {/* 진입 에러 서브라벨 (작은 빨강) — "에러=진입로" 컨셉 유지 */}
        <group ref={errg} position={[0, 0.02, 0.05]}>
          <Text font={CODE_FONT} fontSize={0.115} color={CODE_COLOR.error} anchorX="center" anchorY="middle" maxWidth={R * 1.6} fillOpacity={0.9} outlineWidth={0}>
            {room.errorLabel}
          </Text>
        </group>
        {/* codeLabel */}
        <Text font={CODE_FONT} fontSize={0.1} color={CODE_COLOR.comment} anchorX="center" anchorY="middle" maxWidth={R * 1.6} position={[0, -0.3, 0.05]} outlineWidth={0}>
          {room.codeLabel}
        </Text>
        {/* 힌트 */}
        <Text font={CODE_FONT} fontSize={0.12} color={on || hover ? accent : CODE_COLOR.comment} anchorX="center" anchorY="middle" position={[0, -0.66, 0.05]} outlineWidth={0} material-toneMapped={false}>
          {entered ? '> debugging... ( Esc to exit )' : on ? '> scroll-in / click to enter portal' : '> approach to lock on'}
        </Text>
      </Suspense>
    </group>
  )
}
