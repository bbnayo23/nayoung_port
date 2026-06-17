import { Suspense } from 'react'
import { Grid } from '@react-three/drei'
import { DoubleSide } from 'three'
import { FloatingCode } from './FloatingCode'
import { CODE_COLOR } from './codeData'
import type { Quality } from '../../hooks/useQuality'

/**
 * 코드 디멘션 허브 — 어두운 디지털 보이드 + 그리드 바닥 + 떠다니는 코드 필드.
 * 클릭용 투명 바닥(GroundControls)과 별개로, 여긴 비주얼만 담당한다.
 */
export function CodeSpace({ quality }: { quality: Quality }) {
  return (
    <>
      {/* 그리드 바닥 */}
      <Grid
        position={[0, 0.01, 0]}
        args={[60, 60]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={0.6}
        cellColor="#1b2747"
        sectionSize={3}
        sectionThickness={1.1}
        sectionColor="#33508f"
        fadeDistance={34}
        fadeStrength={2}
      />

      {/* 캐릭터 발밑 스폰 플랫폼 (은은한 글로우 링) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 3.2]}>
        <ringGeometry args={[1.2, 1.45, 48]} />
        <meshBasicMaterial color="#3a4f8a" transparent opacity={0.5} side={DoubleSide} toneMapped={false} />
      </mesh>

      {/* 떠다니는 코드 (텍스트 SDF 로딩이 씬 전체를 막지 않도록 격리) */}
      <Suspense fallback={null}>
        <FloatingCode count={quality === 'high' ? 16 : 7} />
      </Suspense>

      {/* 먼 배경 글로우 (지평선 느낌) */}
      <mesh position={[0, 4, -16]}>
        <planeGeometry args={[60, 24]} />
        <meshBasicMaterial color={CODE_COLOR.bg} transparent opacity={0.6} depthWrite={false} />
      </mesh>
    </>
  )
}
