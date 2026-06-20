import { EffectComposer, Bloom, Vignette, Scanline, Glitch } from '@react-three/postprocessing'
import { Vector2 } from 'three'

/**
 * 포스트프로세싱 폴리시 (high 티어).
 * - Bloom: 발광 머티리얼(에러 비콘·바이저·블랙홀 링)이 번진다.
 * - Scanline + Glitch: 코드 디멘션의 지지직거리는 디지털 노이즈.
 * - Vignette: 가장자리를 눌러 보이드 깊이감.
 * (저사양에선 렌더하지 않음 — 대신 HUD CSS 스캔라인 오버레이가 질감을 유지)
 */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={1.2} luminanceThreshold={0.4} luminanceSmoothing={0.3} mipmapBlur radius={0.72} />
      <Scanline opacity={0.1} density={1.3} />
      <Vignette eskil={false} offset={0.12} darkness={0.82} />
      <Glitch
        delay={new Vector2(2.8, 6.5)}
        duration={new Vector2(0.1, 0.28)}
        strength={new Vector2(0.03, 0.16)}
        ratio={0.82}
      />
    </EffectComposer>
  )
}
