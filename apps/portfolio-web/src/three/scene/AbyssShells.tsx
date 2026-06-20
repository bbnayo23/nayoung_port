import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { AdditiveBlending, type Group } from 'three'
import type { Quality } from '../../hooks/useQuality'

/** 풀-스피어 샘플링 — 위·아래·사방 모든 방향으로 점을 흩뿌려 "바닥 없는 볼륨"을 만든다 */
function sphereCloud(count: number, rMin: number, rMax: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const r = rMin + Math.random() * (rMax - rMin)
    const sinPhi = Math.sin(phi)
    arr[i * 3] = r * sinPhi * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.cos(phi)
    arr[i * 3 + 2] = r * sinPhi * Math.sin(theta)
  }
  return arr
}

type Shell = { positions: Float32Array; size: number; color: string; opacity: number }

/**
 * 코드 보이드를 감싸는 깊이 셸. 그리드 바닥/지평선을 대체한다.
 * 동심 구(球) 포인트 클라우드 3겹이 서로 다른 속도/방향으로 회전 → 모션 패럴랙스로 깊이감.
 * Sparkles 가 캐릭터 위·아래까지 미세한 데이터 입자로 볼륨을 채운다. (저티어는 중간 셸 1겹만)
 */
export function AbyssShells({ quality }: { quality: Quality }) {
  const near = useRef<Group>(null)
  const mid = useRef<Group>(null)
  const far = useRef<Group>(null)

  const high = quality === 'high'

  const shells = useMemo<{ near: Shell; mid: Shell; far: Shell }>(
    () => ({
      near: { positions: sphereCloud(250, 6, 12), size: 0.055, color: '#9fc0ff', opacity: 0.5 },
      mid: {
        positions: sphereCloud(high ? 400 : 350, 12, 24),
        size: 0.04,
        color: '#7480ff',
        opacity: 0.44,
      },
      far: { positions: sphereCloud(600, 24, 46), size: 0.022, color: '#2b2f70', opacity: 0.2 },
    }),
    [high],
  )

  useFrame((_s, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    if (near.current) near.current.rotation.y += 0.007 * dt
    if (mid.current) mid.current.rotation.y -= 0.004 * dt
    if (far.current) far.current.rotation.y += 0.002 * dt
  })

  return (
    <>
      {high && (
        <group ref={near}>
          <Points positions={shells.near.positions} stride={3}>
            <PointMaterial
              transparent
              size={shells.near.size}
              color={shells.near.color}
              opacity={shells.near.opacity}
              sizeAttenuation
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </Points>
        </group>
      )}

      <group ref={mid}>
        <Points positions={shells.mid.positions} stride={3}>
          <PointMaterial
            transparent
            size={shells.mid.size}
            color={shells.mid.color}
            opacity={shells.mid.opacity}
            sizeAttenuation
            depthWrite={false}
            blending={AdditiveBlending}
            toneMapped={false}
          />
        </Points>
      </group>

      {high && (
        <group ref={far}>
          <Points positions={shells.far.positions} stride={3}>
            <PointMaterial
              transparent
              size={shells.far.size}
              color={shells.far.color}
              opacity={shells.far.opacity}
              sizeAttenuation
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </Points>
        </group>
      )}
    </>
  )
}
