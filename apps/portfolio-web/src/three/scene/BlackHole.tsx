import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import { Color, NormalBlending, type Group, type Mesh } from 'three'
import type { RoomConfig } from './rooms'
import { useGame } from '@/three/store'

/** 안으로 빨려드는 연기 — 그리드 없는 가우시안 헤이즈가 소용돌이치며 어두운 중심으로 흘러든다 */
const SMOKE_VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const SMOKE_FRAG = /* glsl */ `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform float uGrow;
uniform float uSharp;
uniform float uCoreSharp;
uniform float uCoreOpacity;
uniform float uSwirl;
uniform float uInflow;
uniform float uBrightness;
uniform float uUseNoise;
uniform float uSeed;
uniform vec3  uColorCore;
uniform vec3  uColorMid;
uniform vec3  uColorHaze;
uniform vec3  uColorLow;
uniform vec3  uAccent;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i + vec2(0.0, 0.0));
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 3; i++){
    v += amp * vnoise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

void main(){
  // 폴라 셋업 (쿼드 중심) — 디스크/링 테스트 없음
  vec2 p = vUv - 0.5;
  float r = length(p) * 2.0;            // 중심 0 .. 가장자리 ~1
  float ang = atan(p.y, p.x);

  // 안으로 도는 소용돌이: grow 게이트(초반엔 거의 안 돎 → 안 어지러움), 중심으로 갈수록 빨라짐
  float swirl = (uSwirl / (r + 0.14)) * uGrow - uTime * uSwirl * 0.6;
  ang += swirl + uSeed;

  // 유입: log-방사 스크롤 → 크레스트가 중심으로 갈수록 가속하며 빨려듦
  float inflowSpeed = uInflow * (0.5 + uGrow * 1.2);
  float rScroll = log(r + 0.08) * 1.6 - uTime * inflowSpeed - uGrow * 0.15;

  // atan ±pi 심(seam) 제거: 카르테시안 재구성으로 fbm 샘플
  vec2 q = vec2(cos(ang), sin(ang)) * rScroll;
  float n = mix(0.6, 0.5 + 0.5 * fbm(q + uSeed), uUseNoise); // low 티어 ~평탄

  // 엣지 없는 헤이즈 엔벨로프 (낮은 sharp 가우시안, 가장자리 전에 0)
  float env = exp(-r * r * uSharp) * n;

  // 어두운 흡수 코어 (가우시안 싱크, grow 와 함께 깊어짐)
  float core = exp(-r * r * uCoreSharp);

  // 뮤트 색: 어두운 눈 → 더스티 미드 → 슬레이트 헤이즈, 얇은 곳은 딥 로우
  vec3 col = mix(uColorCore, uColorMid, smoothstep(0.0, 0.45, r));
  col = mix(col, uColorHaze, smoothstep(0.45, 1.0, r));
  col = mix(uColorLow, col, clamp(env, 0.0, 1.0));
  col = mix(col, uAccent, uGrow * uGrow * 0.12); // 후반에만 목적지 색 아주 살짝
  col *= uBrightness;
  col = min(col, vec3(0.38)); // 하드 Bloom-세이프 캡 (<0.4)

  // 알파: 반투명 헤이즈 + 어둡게 가리는 코어
  float hazeA = env * (0.10 + uGrow * 0.26);
  float coreA = core * uCoreOpacity * (0.2 + uGrow * 0.55);
  float alpha = max(hazeA, coreA);

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0)); // NormalBlending (코어가 어둡게 가능)
}`

type LayerDef = { sharp: number; coreSharp: number; coreOpacity: number; size: number; bright: number; z: number; seed: number }

// 렌더 순서 = 배열 순서. 어두운 코어가 마지막(맨 위)이어야 NormalBlending 에서 헤이즈를 덮어 '눈'이 됨
const HIGH_LAYERS: LayerDef[] = [
  { sharp: 0.9, coreSharp: 0, coreOpacity: 0, size: 5.5, bright: 0.16, z: -0.06, seed: 2.0 }, // 외곽 헤이즈
  { sharp: 1.1, coreSharp: 0, coreOpacity: 0, size: 4.2, bright: 0.22, z: -0.03, seed: 1.0 }, // 미드
  { sharp: 1.6, coreSharp: 8, coreOpacity: 0.7, size: 3.0, bright: 0.3, z: 0, seed: 0.0 }, // 코어(어두운 눈)
]
const LOW_LAYERS: LayerDef[] = [HIGH_LAYERS[0], HIGH_LAYERS[2]]

/**
 * 차원 진입 — 밝은 링/플래시가 아니라 **연기에 빨려드는 오묘한 블랙홀**.
 * 가장자리 없는 뮤트 슬레이트-인디고 헤이즈가 천천히 소용돌이치며 부드러운 어두운 중심으로 흘러들고,
 * grow 0→1 에 따라 소용돌이가 감기고 유입이 가속하며 어두운 목구멍이 깊어진다. 밝기는 Bloom 임계 아래로
 * 캡, 소용돌이는 grow 게이트라 초반에 안 어지럽다. grow/이징/타이밍/카메라는 그대로.
 */
export function BlackHole({ room }: { room: RoomConfig }) {
  const [px, py, pz] = room.doorPosition
  const high = useGame().tier.value === 'high'
  const root = useRef<Group>(null)
  const meshes = useRef<Mesh[]>([])
  const grow = useRef(0.001)

  const layers = useMemo(() => {
    const defs = high ? HIGH_LAYERS : LOW_LAYERS
    const accent = new Color(room.palette.accent)
    return defs.map((d) => ({
      ...d,
      uniforms: {
        uTime: { value: 0 },
        uGrow: { value: 0 },
        uSharp: { value: d.sharp },
        uCoreSharp: { value: d.coreSharp },
        uCoreOpacity: { value: d.coreOpacity },
        uSwirl: { value: 0.15 },
        uInflow: { value: 0.22 },
        uBrightness: { value: d.bright },
        uUseNoise: { value: high ? 1 : 0 },
        uSeed: { value: d.seed },
        uColorCore: { value: new Color('#0a0c18') },
        uColorMid: { value: new Color('#3a4366') },
        uColorHaze: { value: new Color('#4a5578') },
        uColorLow: { value: new Color('#1b2335') },
        uAccent: { value: accent },
      },
    }))
  }, [high, room.palette.accent])

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime
    grow.current += (1 - grow.current) * (1 - Math.exp(-6 * dt))
    const g = grow.current
    if (root.current) {
      root.current.scale.setScalar(g)
      root.current.rotation.z = Math.sin(t * 0.5) * 0.025 // 잔잔한 호흡(절반)
    }
    for (let i = 0; i < layers.length; i++) {
      layers[i].uniforms.uTime.value = t
      layers[i].uniforms.uGrow.value = g
      const m = meshes.current[i]
      // 바깥으로 펴지는 게 아니라 안으로 수축 — 빨려드는 느낌 강화
      if (m) m.scale.setScalar(Math.max(0.6, 1.15 - g * (0.18 + i * 0.1)))
    }
  })

  return (
    <group ref={root} position={[px, py, pz + 0.1]}>
      {layers.map((L, i) => (
        <Billboard key={i} position={[0, 0, L.z]}>
          <mesh ref={(el) => { if (el) meshes.current[i] = el }}>
            <planeGeometry args={[L.size, L.size]} />
            <shaderMaterial
              uniforms={L.uniforms}
              vertexShader={SMOKE_VERT}
              fragmentShader={SMOKE_FRAG}
              transparent
              depthWrite={false}
              blending={NormalBlending}
            />
          </mesh>
        </Billboard>
      ))}
    </group>
  )
}
