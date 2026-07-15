import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useGame } from '@/three/store'
import { FLOAT_SNIPPETS } from './codeData'
import { clamp } from '@/three/utils'
import firaCodeUrl from '@fontsource/fira-code/files/fira-code-latin-400-normal.woff'

/** 코드 텍스트용 모노스페이스 폰트 — 로컬 번들(오프라인/헤드리스 안전, FOUT 없음) */
export const CODE_FONT = firaCodeUrl

// 캐릭터 위·아래로 길게 뻗는 데이터 레인 기둥 (바닥/천장 없는 무한 컬럼)
const TOP = 22
const BOTTOM = -22

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
 * 코드 디멘션을 떠다니는 코드 라인 필드 — 위에서 아래로 쏟아지는 소스 레인.
 * 캐릭터 위·아래 모든 높이([-22,22])에 분포해 "바닥이 없는" 깊은 볼륨을 만든다.
 * 캐릭터 고도에서 멀어질수록 흐려지는 깊이 그라데이션으로 입체감을 준다.
 */
export function FloatingCode({ count = 22 }: { count?: number }) {
  const game = useGame()
  const group = useRef<THREE.Group>(null)
  const refs = useRef<(THREE.Group | null)[]>([])
  // troika Text 인스턴스 — fillOpacity 를 직접 갱신(리싱크 없이 onBeforeRender 에 반영)
  const texts = useRef<({ fillOpacity: number } | null)[]>([])

  const lines = useMemo<Line[]>(() => {
    const out: Line[] = []
    for (let i = 0; i < count; i++) {
      out.push({
        snippet: FLOAT_SNIPPETS[i % FLOAT_SNIPPETS.length],
        x: (Math.random() - 0.5) * 28,
        z: -13 + Math.random() * 22,
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
    const avatarY = game.charPos.y
    for (let i = 0; i < lines.length; i++) {
      const g = refs.current[i]
      const l = lines[i]
      if (!g) continue
      // 아래로 쏟아지는 소스 레인 (소스를 위→아래로 읽는 메타포) — 바닥 아래까지 흐른다
      l.y -= l.speed * dt
      if (l.y < BOTTOM) l.y = TOP
      g.position.set(l.x + Math.sin(t * 0.3 + l.phase) * l.sway, l.y, l.z)
      // 깊이 그라데이션 — 캐릭터 고도에서 멀수록 흐려져 깊이감을 살린다
      const txt = texts.current[i]
      if (txt) txt.fillOpacity = clamp(0.3 - Math.abs(l.y - avatarY) * 0.012, 0.06, 0.3)
    }
    // 코드 필드 전체가 간헐적으로 좌우로 튐 (지지직 글리치)
    if (group.current) {
      const burst = Math.sin(t * 31) * Math.sin(t * 7.3) > 0.9 ? 1 : 0
      group.current.position.x = burst * (Math.sin(t * 90) * 0.1)
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
            ref={(el) => { texts.current[i] = el as unknown as { fillOpacity: number } | null }}
          >
            {l.snippet.text}
          </Text>
        </group>
      ))}
    </group>
  )
}
