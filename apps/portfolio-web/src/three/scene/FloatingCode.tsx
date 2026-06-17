import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { FLOAT_SNIPPETS } from './codeData'
import firaCodeUrl from '@fontsource/fira-code/files/fira-code-latin-400-normal.woff'

/** 코드 텍스트용 모노스페이스 폰트 — 로컬 번들(오프라인/헤드리스 안전, FOUT 없음) */
export const CODE_FONT = firaCodeUrl

const TOP = 6.5
const BOTTOM = 0.3

type Line = {
  snippet: { text: string; color: string }
  x: number
  z: number
  y: number
  speed: number
  sway: number
  phase: number
}

/**
 * 코드 디멘션을 떠다니는 코드 라인 필드.
 * 위로 천천히 흐르다 천장에 닿으면 바닥으로 되돌아오며 루프. 카메라(+z)를 향해 배치.
 */
export function FloatingCode({ count = 26 }: { count?: number }) {
  const group = useRef<THREE.Group>(null)
  const refs = useRef<(THREE.Group | null)[]>([])

  const lines = useMemo<Line[]>(() => {
    const out: Line[] = []
    for (let i = 0; i < count; i++) {
      out.push({
        snippet: FLOAT_SNIPPETS[i % FLOAT_SNIPPETS.length],
        x: (Math.random() - 0.5) * 22,
        z: -11 + Math.random() * 15,
        y: BOTTOM + Math.random() * (TOP - BOTTOM),
        speed: 0.15 + Math.random() * 0.35,
        sway: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      })
    }
    return out
  }, [count])

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    const t = state.clock.elapsedTime
    for (let i = 0; i < lines.length; i++) {
      const g = refs.current[i]
      const l = lines[i]
      if (!g) continue
      l.y += l.speed * dt
      if (l.y > TOP) l.y = BOTTOM
      g.position.set(l.x + Math.sin(t * 0.3 + l.phase) * l.sway, l.y, l.z)
    }
    // 코드 필드 전체가 간헐적으로 좌우로 튐 (지지직 글리치)
    if (group.current) {
      const burst = Math.sin(t * 31) * Math.sin(t * 7.3) > 0.9 ? 1 : 0
      group.current.position.x = burst * (Math.sin(t * 90) * 0.18)
    }
  })

  return (
    <group ref={group}>
      {lines.map((l, i) => (
        <group key={i} ref={(el) => { refs.current[i] = el }}>
          <Text
            font={CODE_FONT}
            fontSize={0.22}
            color={l.snippet.color}
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.24}
            outlineWidth={0}
          >
            {l.snippet.text}
          </Text>
        </group>
      ))}
    </group>
  )
}
