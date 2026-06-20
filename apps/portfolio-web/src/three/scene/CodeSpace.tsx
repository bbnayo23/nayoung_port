import { Suspense } from 'react'
import { FloatingCode } from './FloatingCode'
import { AbyssShells } from './AbyssShells'
import type { Quality } from '../../hooks/useQuality'

/**
 * 코드 디멘션 허브 — 바닥/지평선이 없는 미지의 코드 보이드.
 * 사방을 감싸는 깊이 셸(AbyssShells) + 위아래로 쏟아지는 코드 레인(FloatingCode)만으로
 * "무한 볼륨 안에 떠 있는" 느낌을 만든다. 클릭용 투명 구(FlightControls)는 World 가 담당.
 */
export function CodeSpace({ quality }: { quality: Quality }) {
  return (
    <>
      {/* 깊이 셸 — 가장 먼저 렌더(깊은 배경) */}
      <AbyssShells quality={quality} />

      {/* 위아래로 쏟아지는 코드 레인 (텍스트 SDF 로딩이 씬 전체를 막지 않도록 격리) */}
      <Suspense fallback={null}>
        <FloatingCode count={quality === 'high' ? 22 : 8} />
      </Suspense>
    </>
  )
}
