import { Suspense, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { DoubleSide, type Group } from 'three'
import type { RoomConfig } from './rooms'
import { ROOM_W, ROOM_DEPTH, ROOM_H, ROOM_BACK_Z, ROOM_CENTER_Z } from './roomGeometry'
import { CODE_COLOR, PROJECT_SNIPPETS } from './codeData'
import { CODE_FONT } from './FloatingCode'

const HW = ROOM_W / 2

/** 차원 안을 떠다니는 프로젝트 코드 라인 */
function DriftCode({ snippets, accent }: { snippets: string[]; accent: string }) {
  const refs = useRef<(Group | null)[]>([])
  const data = useMemo(
    () =>
      snippets.map((text, i) => ({
        text,
        x: (i % 2 === 0 ? -1 : 1) * (0.8 + (i % 3) * 0.5),
        baseY: 0.8 + (i % 4) * 0.7,
        z: ROOM_BACK_Z + 1.2 + (i % 3) * 1.4,
        phase: i * 1.1,
        color: i % 2 === 0 ? accent : CODE_COLOR.text,
      })),
    [snippets, accent],
  )

  useFrame((s) => {
    const t = s.clock.elapsedTime
    for (let i = 0; i < data.length; i++) {
      const g = refs.current[i]
      if (g) g.position.y = data[i].baseY + Math.sin(t * 0.8 + data[i].phase) * 0.18
    }
  })

  return (
    <>
      {data.map((d, i) => (
        <group key={i} ref={(el) => { refs.current[i] = el }} position={[d.x, d.baseY, d.z]}>
          <Text font={CODE_FONT} fontSize={0.16} color={d.color} anchorX="center" anchorY="middle" fillOpacity={0.6} outlineWidth={0}>
            {d.text}
          </Text>
        </group>
      ))}
    </>
  )
}

/**
 * 프로젝트 코드 차원 — 게이트 진입 시에만 렌더(필요할 때만).
 * 어두운 코드 톤 인클로저 + 뒷벽 홀로 패널(프로젝트명/태그라인) + 떠다니는 코드.
 */
export function ProjectSpace({ room }: { room: RoomConfig }) {
  const [x] = room.doorPosition
  const p = room.palette
  const snippets = PROJECT_SNIPPETS[room.id] ?? []

  return (
    <group position={[x, 0, 0]}>
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, ROOM_CENTER_Z]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_DEPTH]} />
        <meshStandardMaterial color={p.floor} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* 천장 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_H, ROOM_CENTER_Z]}>
        <planeGeometry args={[ROOM_W, ROOM_DEPTH]} />
        <meshStandardMaterial color={p.wall} side={DoubleSide} />
      </mesh>
      {/* 뒷벽 */}
      <mesh position={[0, ROOM_H / 2, ROOM_BACK_Z]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_H]} />
        <meshStandardMaterial color={p.wall} />
      </mesh>
      {/* 측벽 */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * HW, ROOM_H / 2, ROOM_CENTER_Z]} rotation={[0, (-s * Math.PI) / 2, 0]} receiveShadow>
          <planeGeometry args={[ROOM_DEPTH, ROOM_H]} />
          <meshStandardMaterial color={p.wall} />
        </mesh>
      ))}

      {/* 뒷벽 홀로 패널 */}
      <mesh position={[0, 1.7, ROOM_BACK_Z + 0.05]}>
        <planeGeometry args={[ROOM_W - 0.8, 1.7]} />
        <meshBasicMaterial color={p.accent} transparent opacity={0.12} toneMapped={false} />
      </mesh>

      {/* 텍스트는 별도 Suspense 로 격리 */}
      <Suspense fallback={null}>
      <Text
        font={CODE_FONT}
        fontSize={0.36}
        color={p.accent}
        anchorX="center"
        anchorY="middle"
        position={[0, 2.1, ROOM_BACK_Z + 0.08]}
        outlineWidth={0}
      >
        {room.name}
      </Text>
      <Text
        font={CODE_FONT}
        fontSize={0.15}
        color={CODE_COLOR.text}
        anchorX="center"
        anchorY="middle"
        maxWidth={ROOM_W - 1}
        position={[0, 1.6, ROOM_BACK_Z + 0.08]}
        fillOpacity={0.85}
        outlineWidth={0}
      >
        {room.tagline}
      </Text>
      <Text
        font={CODE_FONT}
        fontSize={0.13}
        color={CODE_COLOR.comment}
        anchorX="center"
        anchorY="middle"
        position={[0, 1.18, ROOM_BACK_Z + 0.08]}
        outlineWidth={0}
      >
        {room.codeLabel}
      </Text>

        <DriftCode snippets={snippets} accent={p.accent} />
      </Suspense>

      {/* 차원 조명 */}
      <pointLight position={[0, ROOM_H - 0.5, ROOM_CENTER_Z + 0.5]} color={p.light} intensity={9} distance={13} decay={2} />
      <pointLight position={[0, 1.7, ROOM_BACK_Z + 1.5]} color={p.accent} intensity={4} distance={8} decay={2} />
    </group>
  )
}
