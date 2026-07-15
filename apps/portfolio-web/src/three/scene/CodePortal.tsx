import { Suspense, useMemo, useRef, useState } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { AdditiveBlending, DoubleSide, type Group, type ShaderMaterial } from 'three'
import type { RoomConfig } from './rooms'
import { CODE_COLOR } from './codeData'
import { CODE_FONT } from './FloatingCode'
import { damp } from '@/three/utils'

const R = 1.5 // 포탈 반경

/** 소프트 블루 포탈 셰이더 — 하드 서클 없이 부드러운 프레넬 림 + 깊이 웰 + 옅은 렌즈 플레어 */
const PORTAL_VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const PORTAL_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uStab;
uniform float uFlash;
uniform float uSeed;

// ---- 유니버설 블루 팔레트 (상수 — 룸별 레인보우 없음) ----
const vec3 C_DEEP   = vec3(0.106, 0.227, 0.561); // #1b3a8f  중간 반경 바디 틴트
const vec3 C_MID    = vec3(0.227, 0.435, 1.000); // #3a6fff  메인 림 바디 (오브가 이 블루로 보임)
const vec3 C_RIM    = vec3(0.561, 0.714, 1.000); // #8fb6ff  피크 림 하이라이트 / fixed 리프트
const vec3 C_FLARE  = vec3(0.812, 0.878, 1.000); // #cfe0ff  옅은 플레어 스트릭 + 플래시 코어
const vec3 C_BROKEN = vec3(0.353, 0.431, 0.612); // #5a6e9c  콜드 디새추 슬레이트블루 (broken, 빨강 없음)

// 가늘게-가로 / 길게-세로 회전 기저 애너모픽 스트릭 (진짜 렌즈 스머지)
float anamorphic(vec2 p, float ang, float along, float across, float offset){
  vec2 d = vec2(cos(ang), sin(ang));   // 스트릭 방향
  vec2 n = vec2(-d.y, d.x);            // 수직
  float u = dot(p, d) - offset;        // 길이축 (오프센터 핫스팟)
  float v = dot(p, n);                 // 가로축 (얇게 유지)
  return exp(-u*u*along) * exp(-v*v*across);
}

void main(){
  // 중심 정렬 좌표 [-1,1]; 쿼드 R*3.2 라 오브는 r < ~0.95 안에
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);

  // ---- 소프트 프레넬 림: 단조 상승 후 넓게 페이드. 밴드/라인 없음. ----
  float rEdge = 0.92;
  float rise  = pow(clamp(r / rEdge, 0.0, 1.0), 2.6);              // 중심 0 -> rEdge 근처 1
  float fade  = 1.0 - smoothstep(rEdge * 0.78, rEdge * 1.18, r);   // 아주 넓은 숄더
  float rim   = rise * fade;                                       // 넓고 흐릿한 험프, 피크가 날카롭지 않음
  rim *= 0.86 + 0.14 * uStab;                                      // fixed 일 때 림 밝아짐

  // ---- 깊이 웰: 중심에서 바깥으로 어두워지는 옅은 자발광 — 링이 아니라 목구멍 ----
  float well      = pow(clamp(r, 0.0, 1.0), 2.2);                  // 중심 0 -> 가장자리 1
  float coreLight = (1.0 - well) * (0.09 + 0.16 * uStab);          // fixed 일 때 입구가 '켜짐'

  // ---- 옅은 반투명 바디 필 (연속, 점근) ----
  float body = (1.0 - smoothstep(0.0, rEdge * 1.05, r)) * 0.09;

  // ---- 두 개의 애너모픽 렌즈 플레어 스트릭: 오프센터, 드리프트, 어두운 내부에 한정 ----
  float fl1 = anamorphic(p,  0.70, 0.9, 1100.0, 0.02 * sin(uTime * 0.30 + uSeed));
  float fl2 = anamorphic(p, -0.50, 0.7,  620.0, 0.03 * sin(uTime * 0.23 + uSeed + 1.7)) * 0.6;
  float flare = (fl1 + fl2) * (1.0 - well) * 0.11;                 // 오브 안에서만, 소프트 엣지에서 페이드
  flare *= 0.7 + 0.3 * sin(uTime * 0.5 + uSeed);                   // 느린 호흡, 트윙클 없음

  // ---- 고정 해시 그레인 (닷 텍스처, uTime 없음 -> 반짝임/에일리어스 트윙클 없음) ----
  float g = fract(sin(dot(floor(p * 46.0), vec2(12.99, 78.23)) + uSeed) * 43758.5);
  float grain = (g - 0.5) * 0.045 * (1.0 - well);

  // ---- broken 불안정: uStab<1 동안만 옅은 느린 깜빡임 (샤드/고주파 스트로브 없음) ----
  float flick = 1.0 - (1.0 - uStab) * (0.16 + 0.16 * sin(uTime * 3.0 + uSeed));
  // 거의 없는 전체 오브 호흡
  float pulse = 0.96 + 0.04 * sin(uTime * 1.1 + uSeed);

  // ---- 락온: 부드러운 중심 가우시안 블룸 (스웰, 하드 팝/링 아님) ----
  float flashGlow = uFlash * exp(-r * r * 2.2) * 0.85;

  // ---- 색: 콜드 슬레이트블루(broken) -> 클리어 애저(fixed); 림/플레어는 블루 유지 ----
  vec3 bodyCol = mix(C_BROKEN, mix(C_DEEP, C_MID, 0.5), uStab);
  vec3 rimCol  = mix(C_BROKEN, C_RIM, uStab);

  // 조립 — 전 항목 로우키 & 가산; broken 시 흐림, fixed 시 차분-선명
  float gain = (0.62 + 0.38 * uStab) * flick * pulse;
  vec3 col =
      bodyCol * (coreLight + body) * gain
    + rimCol  * rim * 0.22 * gain                                   // 림 피크 ~0.22 라 블룸이 번지되 윤곽을 새기지 않음
    + C_FLARE * flare * gain
    + C_FLARE * flashGlow
    + vec3(grain) * gain;

  // 알파는 같은 페이딩 루미넌스를 따르고 하드캡 -> 가산 블룸이 흰색으로 못 날아감
  float lum = rim * 0.22 + coreLight + body + flare + grain * 0.5;
  float alpha = clamp(lum * 1.35 + flashGlow, 0.0, 0.62) * (0.45 + 0.4 * uStab);
  gl_FragColor = vec4(col, alpha);
}`

/**
 * 프로젝트 포탈 — 어둡고 부드러운 **블루 분위기 오브**(하드 서클 없음).
 * 단일 가산 셰이더 쿼드가 넓은 프레넬 림(라인 없이 페이드) + 중심 깊이 웰 + 옅은 렌즈 플레어 스트릭 +
 * 고정 그레인으로, 그려진 원이 아니라 희미한 에너지 장(場)처럼 보인다. 색은 유니버설 블루(레인보우 제거).
 * 평소엔 콜드 슬레이트블루로 흐릿하게(에러=상처) 깜빡이다가, 우주인이 고치면(stab→1) 클리어 애저로
 * 차분·선명해진다. 락온 시 중심이 부드럽게 부풀고(flash), 클릭/Enter/스크롤-인 시 차원이 열린다(onDive).
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
  const accent = room.palette.accent // 룸 정체성 — 이제 포탈 이름 라벨에만 사용

  const group = useRef<Group>(null)
  const portalMat = useRef<ShaderMaterial>(null)
  const errg = useRef<Group>(null)
  const [hover, setHover] = useState(false)

  // 봉합 진행도(broken 0 → fixed 1)와 락온 라이징 엣지의 코어 스웰
  const stab = useRef(0)
  const flash = useRef(0)
  const wasActive = useRef(false)

  // 포탈별 유니폼 — 색은 셰이더 상수(유니버설 블루), uSeed=px 로 플레어/깜빡임 위상만 분리(색조 아님)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStab: { value: 0 },
      uFlash: { value: 0 },
      uSeed: { value: px },
    }),
    [px],
  )

  useFrame((s, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    const t = s.clock.elapsedTime
    stab.current = damp(stab.current, active || entered ? 1 : 0, 5, dt)
    const st = stab.current

    // 락온 라이징 엣지 → 중심 스웰 1회
    if (active && !wasActive.current) flash.current = 1
    wasActive.current = active
    flash.current = Math.max(0, flash.current - dt * 3)

    if (group.current) group.current.position.y = py + Math.sin(t * 0.7 + px) * 0.12 // 부유

    if (portalMat.current) {
      const u = portalMat.current.uniforms
      u.uTime.value = t
      u.uStab.value = st
      u.uFlash.value = flash.current
    }
    // 에러 서브라벨 미세 글리치 (broken 동안)
    if (errg.current) {
      const b = Math.sin(t * 47 + px) > 0.9 ? 1 : 0
      errg.current.position.x = b * Math.sin(t * 80) * 0.05
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
      {/* 소프트 블루 포탈 본체 (셰이더 쿼드) — 클릭은 별도 히트 디스크가 받음 */}
      <mesh position={[0, 0, -0.04]} raycast={() => null}>
        <planeGeometry args={[R * 3.2, R * 3.2]} />
        <shaderMaterial
          ref={portalMat}
          uniforms={uniforms}
          vertexShader={PORTAL_VERT}
          fragmentShader={PORTAL_FRAG}
          transparent
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          side={DoubleSide}
        />
      </mesh>

      {/* 클릭/호버 히트 디스크 (투명, 반경 R) */}
      <mesh>
        <circleGeometry args={[R, 40]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>

      {/* 텍스트(개별 Suspense 격리) */}
      <Suspense fallback={null}>
        {/* 프로젝트 이름 (accent, 큼) — 포탈 정체성 */}
        <Text font={CODE_FONT} fontSize={0.26} color={accent} anchorX="center" anchorY="middle" maxWidth={R * 1.7} position={[0, 0.42, 0.05]} outlineWidth={0} material-toneMapped={false}>
          {room.name}
        </Text>
        {/* 진단명 = 치명적 에러 (히어로 빨강 리드아웃) */}
        <group ref={errg} position={[0, 0.02, 0.05]}>
          <Text font={CODE_FONT} fontSize={0.13} color={CODE_COLOR.error} anchorX="center" anchorY="middle" maxWidth={R * 1.6} fillOpacity={0.95} outlineWidth={0}>
            {room.errorLabel}
          </Text>
        </group>
        {/* codeLabel */}
        <Text font={CODE_FONT} fontSize={0.1} color={CODE_COLOR.comment} anchorX="center" anchorY="middle" maxWidth={R * 1.6} position={[0, -0.3, 0.05]} outlineWidth={0}>
          {room.codeLabel}
        </Text>
        {/* 힌트 — 수리 픽션 */}
        <Text font={CODE_FONT} fontSize={0.12} color={active || entered || hover ? accent : CODE_COLOR.error} anchorX="center" anchorY="middle" position={[0, -0.66, 0.05]} outlineWidth={0} material-toneMapped={false}>
          {entered
            ? '> debugging... ( Esc to exit )'
            : active
              ? '> seal & dive // click to repair'
              : '> breach detected — approach to repair'}
        </Text>
      </Suspense>
    </group>
  )
}
