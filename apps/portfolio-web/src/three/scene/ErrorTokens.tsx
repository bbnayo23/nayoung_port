import { useMemo, useRef, useState } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { CODE_COLOR, ERROR_SNIPPETS } from './codeData'
import { CODE_FONT } from './FloatingCode'

type Spot = { text: string; pos: [number, number, number]; phase: number }

/** 떠 있는 에러 토큰 하나 — 클릭하면 해결(초록)되고 onFix 호출 */
function ErrorToken({ spot, onFix }: { spot: Spot; onFix: () => void }) {
  const grp = useRef<THREE.Group>(null)
  const panel = useRef<THREE.Mesh>(null)
  const [fixed, setFixed] = useState(false)
  const [hover, setHover] = useState(false)
  const pop = useRef(0)

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    const t = state.clock.elapsedTime
    if (grp.current) {
      grp.current.position.y = spot.pos[1] + Math.sin(t * 1.2 + spot.phase) * 0.12
      const target = (hover && !fixed ? 1.12 : 1) + (fixed ? pop.current : 0)
      const s = grp.current.scale.x + (target - grp.current.scale.x) * (1 - Math.exp(-12 * dt))
      grp.current.scale.setScalar(s)
    }
    if (fixed && pop.current < 1) pop.current = Math.min(1, pop.current + dt * 2)
    if (panel.current && !fixed) {
      const m = panel.current.material as THREE.MeshBasicMaterial
      m.opacity = 0.12 + (Math.sin(t * 6 + spot.phase) * 0.5 + 0.5) * 0.12 // 에러 깜빡임
    }
  })

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (fixed) return
    e.stopPropagation()
    setFixed(true)
    onFix()
  }

  const color = fixed ? CODE_COLOR.fixed : CODE_COLOR.error

  return (
    <group
      ref={grp}
      position={spot.pos}
      onClick={handleClick}
      onPointerOver={() => { if (!fixed) { setHover(true); document.body.style.cursor = 'pointer' } }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto' }}
    >
      {/* 글로우 패널 (작고 은은하게 — 배경 잡음 수준) */}
      <mesh ref={panel} position={[0, 0, -0.02]}>
        <planeGeometry args={[Math.max(1.6, spot.text.length * 0.1), 0.36]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} depthWrite={false} toneMapped={false} />
      </mesh>
      {/* 에러/해결 텍스트 */}
      <Text
        font={CODE_FONT}
        fontSize={0.145}
        color={color}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.8}
        outlineWidth={0}
      >
        {fixed ? '// resolved ✓' : spot.text}
      </Text>
    </group>
  )
}

/**
 * 코드 디멘션에 흩어진 에러 토큰들. 해결할 때마다 onFix 로 카운터를 올린다.
 */
export function ErrorTokens({ count = 6, onFix }: { count?: number; onFix: () => void }) {
  const spots = useMemo<Spot[]>(() => {
    const base: [number, number, number][] = [
      [-6.5, 1.6, 1.5],
      [6.2, 2.4, -1],
      [-3, 3.0, -3],
      [3.5, 1.3, 2.5],
      [0.5, 3.4, -1.5],
      [-7, 2.2, -2.5],
      [7, 1.5, 1.8],
    ]
    return base.slice(0, count).map((pos, i) => ({
      text: ERROR_SNIPPETS[i % ERROR_SNIPPETS.length],
      pos,
      phase: i * 1.3,
    }))
  }, [count])

  return (
    <>
      {spots.map((s, i) => (
        <ErrorToken key={i} spot={s} onFix={onFix} />
      ))}
    </>
  )
}
