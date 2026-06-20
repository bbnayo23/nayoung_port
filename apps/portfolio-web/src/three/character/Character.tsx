import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGame } from '../store'
import { dampAngle, damp, clamp } from '../utils'

/** 디자이너 토이풍 팔레트 — 파스텔 핑크 베어 후드 + 코지 원지 + 에어맥스 + 헤드셋 */
/** 네온 코드월드에 맞춘 우주인 팔레트 — 웜 스킨/블러시 유지(유일한 난색), 수트는 바이올렛/시안, 헤드셋·스우시는 단일 마젠타 히어로 */
const COL = {
  skin: '#ffe2cb', // 웜 페이스(유지) — 쿨 보이드에서 또렷하게 튐
  blush: '#ff9db5', // 볼/하트 포켓 난색(유지)
  hood: '#8a6bff', // 네온 바이올렛 베어 후드
  hoodLit: '#a98bff',
  earIn: '#c9b6ff',
  onesie: '#eef1ff', // 네온을 받는 쿨 루미너스 스페이스수트
  onesieShade: '#cfd6ff',
  hair: '#f0cf95', // 살짝 쿨해진 금발 프린지(난색 브레이크)
  cans: '#eef1ff', // 헤드셋 컵
  cansRim: '#ff4fd8', // 헤드셋 발광 링 — 단일 마젠타 히어로
  band: '#232a44', // 헤드셋 밴드(쿨 다크)
  graphite: '#232a44', // 도구 다크 매트 바디
  steel: '#dfe6ff', // 도구 브러시드 스틸(밝은 타격면)
  shoe: '#f4f7ff', // 에어맥스 어퍼
  sole: '#cfd6ff', // 미드솔
  swoosh: '#ff4fd8', // 스우시 — 마젠타 히어로
  air: '#37e0ff', // 에어 버블/렌치 팁/스러스터(네온 시안)
  eye: '#3b2f3a',
}

const SPEED = 3.0
const DIVE_SPEED = 11
const ARRIVE = 0.05
const HEAD_Y = 1.04 // 빅헤드(치비) 비율
const SCALE = 0.7

/**
 * 디자이너 토이풍 빅헤드 아바타.
 * - 파스텔 핑크 **베어 후드**(곰 귀) + 큰 글로시 눈 + 발그레한 볼, 코지 원지.
 * - **헤드셋**(화이트 컵 + 핑크 글로우)과 **에어맥스 스니커즈**(청키 솔 + 에어 버블 + 스우시).
 * - 비행/헤엄 리그(이동·lean·undulation·시선)는 그대로. 캐릭터 전용 림 라이트로 또렷하게.
 */
export function Character() {
  const game = useGame()
  const root = useRef<THREE.Group>(null)
  const flyer = useRef<THREE.Group>(null)
  const body = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const legL = useRef<THREE.Group>(null)
  const legR = useRef<THREE.Group>(null)
  const armL = useRef<THREE.Group>(null)
  const armR = useRef<THREE.Group>(null)
  const hammerEdge = useRef<THREE.Mesh>(null) // 망치 머리 네온 엣지 (타격 시 발광)
  const toolLight = useRef<THREE.PointLight>(null)
  const screwGroup = useRef<THREE.Group>(null) // 드라이버 그룹 (샤프트 +Y 축으로 트위스트)
  const screwTip = useRef<THREE.Mesh>(null) // 드라이버 플랫헤드 팁 (트위스트 시 발광)

  const phase = useRef(0)
  const stride = useRef(0)

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    const g = game
    if (!root.current) return
    const t = state.clock.elapsedTime

    // 1) 3D 비행 이동 -------------------------------------------------
    const dx = g.charTarget.x - g.charPos.x
    const dy = g.charTarget.y - g.charPos.y
    const dz = g.charTarget.z - g.charPos.z
    const dist = Math.hypot(dx, dy, dz)
    const speed = g.diving.value ? DIVE_SPEED : SPEED

    if (dist > ARRIVE) {
      g.moving.value = true
      const step = Math.min(dist, speed * dt)
      g.charPos.x += (dx / dist) * step
      g.charPos.y += (dy / dist) * step
      g.charPos.z += (dz / dist) * step
      const horiz = Math.hypot(dx, dz)
      if (horiz > 0.02) g.facing.value = Math.atan2(dx, dz)
      g.pitch.value = clamp(Math.atan2(dy, Math.max(0.05, horiz)), -0.6, 0.6)
    } else {
      g.moving.value = false
      g.pitch.value *= 0.9
    }

    root.current.position.copy(g.charPos)
    root.current.rotation.y = dampAngle(root.current.rotation.y, g.facing.value, 8, dt)

    // 2) 헤엄 애니메이션 ----------------------------------------------
    const targetStride = g.moving.value ? 1 : 0
    stride.current += (targetStride - stride.current) * (1 - Math.exp(-8 * dt))
    const s = stride.current
    phase.current += dt * (g.moving.value ? 6 : 1.6)
    const ph = phase.current

    if (flyer.current) {
      const undulate = Math.sin(ph) * 0.14 * s
      const leanX = s * 0.55 - g.pitch.value * 0.5 + undulate
      const bankZ = Math.sin(ph * 0.5) * 0.1 * s + Math.sin(t * 0.6) * 0.04 * (1 - s)
      flyer.current.rotation.x = damp(flyer.current.rotation.x, leanX, 6, dt)
      flyer.current.rotation.z = damp(flyer.current.rotation.z, bankZ, 6, dt)
    }
    if (body.current) {
      body.current.position.y = Math.sin(t * 1.4) * 0.09 * (1 - s) + Math.sin(ph) * 0.06 * s
    }

    // 팔 — 앞으로 뻗어 젓는 스트로크, 멈추면 양옆 스컬링
    const reachX = -1.35 * s - 0.15 * (1 - s)
    const sweep = Math.cos(ph) * 0.3 * s
    const scull = Math.sin(t * 1.6) * 0.14 * (1 - s)
    const outZ = 0.5 * (1 - s) + 0.16 * s
    if (armL.current) {
      armL.current.rotation.x = reachX + sweep + scull
      armL.current.rotation.z = outZ
    }
    if (armR.current) {
      armR.current.rotation.x = reachX - sweep + scull
      armR.current.rotation.z = -outZ
    }

    // 수리 '뚝딱뚝딱' 펄스 — fx 동안 빠르게 내려치는 망치질(반복 타격), fx 로 감쇠
    const fx = g.fixing.value
    if (fx > 0) g.fixing.value = Math.max(0, fx - dt * 2.2) // ~0.45s
    const strike = fx > 0 ? Math.abs(Math.sin(t * 38)) * fx : 0 // 반복 다운스트로크
    if (armR.current) {
      armR.current.rotation.x += strike * 0.85 // 내려치는 스윙
      armR.current.position.z = -strike * 0.03 // 살짝 반동
    }
    if (hammerEdge.current) {
      // 타격 피크에 네온 시안 → 흰빛 번쩍
      ;(hammerEdge.current.material as THREE.MeshBasicMaterial).color.setRGB(0.22 + strike * 0.78, 0.78 + strike * 0.22, 1)
    }
    if (toolLight.current) toolLight.current.intensity = strike * 5

    // 좌수 드라이버 — 자기 샤프트(+Y)축으로 좌우 트위스트(나사 조이기), fx 로 자동 복귀 (망치 38 vs 30 교차 위상)
    const twist = fx > 0 ? Math.sin(t * 30) * fx : 0
    if (screwGroup.current) {
      screwGroup.current.rotation.y = twist * 1.4 // ±~80° 비틀기, fx→0 이면 0
      screwGroup.current.position.y = -0.5 - Math.abs(twist) * 0.012 // 회전마다 살짝 눌러박는 보브
    }
    if (screwTip.current) {
      const heat = Math.abs(twist)
      ;(screwTip.current.material as THREE.MeshBasicMaterial).color.setRGB(0.22 + heat * 0.78, 0.78 + heat * 0.22, 1) // 시안→흰빛
    }

    // 다리 — 뒤로 뻗어 물장구
    const legBase = s * 0.5
    const flutter = Math.sin(ph * 1.5) * (0.4 * s) + Math.sin(t * 1.2) * 0.05 * (1 - s)
    if (legL.current) legL.current.rotation.x = legBase + flutter
    if (legR.current) legR.current.rotation.x = legBase - flutter

    // 3) 시선 ---------------------------------------------------------
    if (head.current) {
      const yawToGaze = Math.atan2(g.gaze.x - g.charPos.x, g.gaze.z - g.charPos.z)
      let localYaw = yawToGaze - root.current.rotation.y
      localYaw = Math.atan2(Math.sin(localYaw), Math.cos(localYaw))
      const horiz = Math.max(0.6, Math.hypot(g.gaze.x - g.charPos.x, g.gaze.z - g.charPos.z))
      const pitch = clamp(-(g.gaze.y - g.charPos.y) / horiz, -0.3, 0.36)
      head.current.rotation.y = dampAngle(head.current.rotation.y, clamp(localYaw, -0.7, 0.7), 8, dt)
      head.current.rotation.x = damp(head.current.rotation.x, pitch + Math.sin(t * 1.1) * 0.03, 8, dt)
      head.current.rotation.z = Math.sin(t * 0.7) * 0.04 * (1 - s)
    }
  })

  return (
    <group ref={root} scale={SCALE} dispose={null}>
      {/* 캐릭터 전용 림 라이트 — 어두운 보이드에서도 또렷이 */}
      <pointLight position={[0.2, 1.0, 0.9]} color="#fff0ea" intensity={7} distance={7} decay={2} />
      <pointLight position={[-0.6, 0.8, -0.4]} color={COL.hood} intensity={3} distance={5} decay={2} />

      <group ref={flyer}>
        <group ref={body}>
          {/* ===== 하체: 코지 원지 + 에어맥스 ===== */}
          <mesh castShadow position={[0, 0.42, 0]}>
            <capsuleGeometry args={[0.2, 0.06, 8, 16]} />
            <meshStandardMaterial color={COL.onesie} roughness={0.85} emissive={COL.onesie} emissiveIntensity={0.06} />
          </mesh>
          {([-1, 1] as const).map((sgn) => (
            <group key={sgn} ref={sgn < 0 ? legL : legR} position={[sgn * 0.1, 0.4, 0]}>
              {/* 통통한 원지 다리 */}
              <mesh castShadow position={[0, -0.16, 0]}>
                <capsuleGeometry args={[0.095, 0.16, 8, 16]} />
                <meshStandardMaterial color={COL.onesie} roughness={0.85} emissive={COL.onesie} emissiveIntensity={0.06} />
              </mesh>
              {/* ===== Air Max 스니커즈 ===== */}
              <group position={[0, -0.34, 0.03]}>
                {/* 어퍼(화이트) */}
                <mesh castShadow position={[0, 0.01, 0.0]} scale={[1, 0.85, 1.35]}>
                  <sphereGeometry args={[0.1, 18, 16]} />
                  <meshStandardMaterial color={COL.shoe} roughness={0.4} metalness={0.05} />
                </mesh>
                {/* 청키 미드솔 */}
                <mesh position={[0, -0.06, 0.03]}>
                  <boxGeometry args={[0.2, 0.07, 0.32]} />
                  <meshStandardMaterial color={COL.sole} roughness={0.5} />
                </mesh>
                {/* 에어 버블(힐, 발광 블루) */}
                <mesh position={[0, -0.06, -0.085]}>
                  <sphereGeometry args={[0.045, 14, 12]} />
                  <meshStandardMaterial color={COL.air} roughness={0.2} metalness={0.2} emissive={COL.air} emissiveIntensity={0.5} transparent opacity={0.9} />
                </mesh>
                {/* 스우시 액센트(양 측면) */}
                {([-1, 1] as const).map((ss) => (
                  <mesh key={ss} position={[ss * 0.092, 0.02, 0.02]} rotation={[0, 0, ss * 0.3]}>
                    <boxGeometry args={[0.016, 0.05, 0.16]} />
                    <meshStandardMaterial color={COL.swoosh} roughness={0.5} emissive={COL.swoosh} emissiveIntensity={0.15} />
                  </mesh>
                ))}
              </group>
            </group>
          ))}

          {/* ===== 상체: 통통한 코지 원지 ===== */}
          <mesh castShadow position={[0, 0.64, 0]}>
            <capsuleGeometry args={[0.23, 0.18, 12, 24]} />
            <meshStandardMaterial color={COL.onesie} roughness={0.85} emissive={COL.onesie} emissiveIntensity={0.07} />
          </mesh>
          {/* 배 위 하트 포켓(코랄) */}
          <mesh position={[0, 0.6, 0.21]}>
            <circleGeometry args={[0.05, 18]} />
            <meshBasicMaterial color={COL.blush} toneMapped={false} />
          </mesh>
          {/* 우주 정비사 수트 LED — 그린/앰버 상태등 */}
          <mesh position={[-0.1, 0.6, 0.205]}>
            <circleGeometry args={[0.016, 12]} />
            <meshBasicMaterial color="#5ef0c0" toneMapped={false} />
          </mesh>
          <mesh position={[0.1, 0.6, 0.205]}>
            <circleGeometry args={[0.016, 12]} />
            <meshBasicMaterial color="#ff9d52" toneMapped={false} />
          </mesh>
          {/* 등 뒤 백팩 스러스터 */}
          <group position={[0, 0.66, -0.18]}>
            <mesh castShadow>
              <capsuleGeometry args={[0.06, 0.12, 6, 12]} />
              <meshStandardMaterial color={COL.onesieShade} roughness={0.8} />
            </mesh>
            <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.03, 14]} />
              <meshBasicMaterial color={COL.air} toneMapped={false} />
            </mesh>
          </group>

          {/* ===== 팔: 원지 소매 + 둥근 paw ===== */}
          {([-1, 1] as const).map((sgn) => (
            <group key={sgn} ref={sgn < 0 ? armL : armR} position={[sgn * 0.24, 0.74, 0]}>
              {/* 길어진 팔 — 손에 든 도구가 몸에 가리지 않고 보이도록 */}
              <mesh castShadow position={[0, -0.22, 0]}>
                <capsuleGeometry args={[0.072, 0.32, 8, 16]} />
                <meshStandardMaterial color={COL.onesie} roughness={0.85} emissive={COL.onesie} emissiveIntensity={0.07} />
              </mesh>
              {/* 둥근 손(paw) */}
              <mesh castShadow position={[0, -0.46, 0]}>
                <sphereGeometry args={[0.082, 16, 14]} />
                <meshStandardMaterial color={COL.onesieShade} roughness={0.8} />
              </mesh>
              {/* ===== 수리 망치 (오른손에만) — 뚝딱뚝딱, 굵은 클로해머 실루엣 ===== */}
              {sgn > 0 && (
                <group position={[0, -0.5, 0.04]} rotation={[Math.PI * 0.12, 0, 0]}>
                  {/* 손잡이 — 그래파이트 매트, 더 길게 */}
                  <mesh castShadow>
                    <capsuleGeometry args={[0.026, 0.26, 6, 12]} />
                    <meshStandardMaterial color={COL.graphite} roughness={0.55} metalness={0.45} />
                  </mesh>
                  {/* 망치 머리 — 굵은 브러시드 스틸 블록 */}
                  <mesh castShadow position={[0, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[0.095, 0.22, 0.095]} />
                    <meshStandardMaterial color={COL.steel} roughness={0.22} metalness={0.85} />
                  </mesh>
                  {/* 뒤쪽 클로(노루발) — 망치임이 분명해지도록 */}
                  <mesh castShadow position={[0, 0.16, -0.07]} rotation={[-0.5, 0, 0]}>
                    <boxGeometry args={[0.05, 0.07, 0.06]} />
                    <meshStandardMaterial color={COL.steel} roughness={0.25} metalness={0.85} />
                  </mesh>
                  {/* 앞면 네온 타격 엣지 — 타격 시 흰빛 번쩍 */}
                  <mesh ref={hammerEdge} position={[0, 0.16, 0.058]}>
                    <boxGeometry args={[0.2, 0.06, 0.014]} />
                    <meshBasicMaterial color={COL.air} toneMapped={false} />
                  </mesh>
                  <pointLight ref={toolLight} position={[0, 0.16, 0.08]} color="#37e0ff" intensity={0} distance={2.2} decay={2} />
                </group>
              )}
              {/* ===== 수리 드라이버 (왼손에만) — 나사 조이기 ===== */}
              {sgn < 0 && (
                <group ref={screwGroup} position={[0, -0.5, 0.04]} rotation={[Math.PI * 0.12, 0, 0]}>
                  {/* 그립 — 굵은 그래파이트 */}
                  <mesh castShadow>
                    <capsuleGeometry args={[0.032, 0.14, 6, 12]} />
                    <meshStandardMaterial color={COL.graphite} roughness={0.5} metalness={0.4} />
                  </mesh>
                  {/* 그립 시안 링 (정적 정체성 액센트) */}
                  <mesh position={[0, 0.055, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.034, 0.006, 8, 16]} />
                    <meshBasicMaterial color={COL.air} toneMapped={false} />
                  </mesh>
                  {/* 스틸 그립 리브 2줄 (프리미엄 머신드 디테일) */}
                  {[0.02, -0.02].map((gy) => (
                    <mesh key={gy} position={[0, gy, 0]} rotation={[Math.PI / 2, 0, 0]}>
                      <torusGeometry args={[0.033, 0.004, 6, 14]} />
                      <meshStandardMaterial color={COL.steel} roughness={0.3} metalness={0.85} />
                    </mesh>
                  ))}
                  {/* 메탈 샤프트 (+Y = 트위스트 축), 더 길고 굵은 브러시드 스틸 */}
                  <mesh castShadow position={[0, 0.14, 0]}>
                    <cylinderGeometry args={[0.013, 0.016, 0.15, 12]} />
                    <meshStandardMaterial color={COL.steel} roughness={0.2} metalness={0.9} />
                  </mesh>
                  {/* 플랫헤드 팁 — 발광 시안, 트위스트 시 흰빛 */}
                  <mesh ref={screwTip} position={[0, 0.225, 0]}>
                    <boxGeometry args={[0.032, 0.026, 0.008]} />
                    <meshBasicMaterial color={COL.air} toneMapped={false} />
                  </mesh>
                </group>
              )}
            </group>
          ))}

          {/* ===== 빅헤드: 베어 후드 + 큰 눈 + 헤드셋 ===== */}
          <group ref={head} position={[0, HEAD_Y, 0]}>
            {/* 얼굴 */}
            <mesh castShadow>
              <sphereGeometry args={[0.32, 36, 30]} />
              <meshStandardMaterial color={COL.skin} roughness={0.5} />
            </mesh>

            {/* 핑크 베어 후드 — 얼굴을 감싸는 셸 */}
            <mesh castShadow position={[0, 0.02, -0.04]} scale={[1.32, 1.3, 1.32]}>
              <sphereGeometry args={[0.32, 36, 26, 0, Math.PI * 2, 0, Math.PI * 0.74]} />
              <meshStandardMaterial color={COL.hood} roughness={0.7} />
            </mesh>
            {/* 후드 입구 림(둥글게 프레이밍) */}
            <mesh position={[0, 0.0, 0.05]} rotation={[0.18, 0, 0]}>
              <torusGeometry args={[0.345, 0.055, 14, 32]} />
              <meshStandardMaterial color={COL.hoodLit} roughness={0.7} />
            </mesh>
            {/* 곰 귀 */}
            {([-1, 1] as const).map((sgn) => (
              <group key={sgn} position={[sgn * 0.22, 0.36, -0.02]}>
                <mesh castShadow>
                  <sphereGeometry args={[0.11, 20, 18]} />
                  <meshStandardMaterial color={COL.hood} roughness={0.7} />
                </mesh>
                <mesh position={[0, 0, 0.08]}>
                  <circleGeometry args={[0.055, 18]} />
                  <meshBasicMaterial color={COL.earIn} toneMapped={false} />
                </mesh>
              </group>
            ))}
            {/* 이마 위 금발 프린지(살짝 삐져나옴) */}
            <mesh castShadow position={[0, 0.17, 0.21]} rotation={[0.42, 0, 0]} scale={[1.25, 0.45, 0.85]}>
              <sphereGeometry args={[0.2, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
              <meshStandardMaterial color={COL.hair} roughness={0.6} />
            </mesh>

            {/* 큰 글로시 눈 + 캐치라이트 (블라이드풍) */}
            {([-1, 1] as const).map((sgn) => (
              <group key={sgn} position={[sgn * 0.125, -0.015, 0.27]}>
                <mesh>
                  <sphereGeometry args={[0.078, 22, 20]} />
                  <meshStandardMaterial color={COL.eye} roughness={0.12} metalness={0.15} />
                </mesh>
                {/* 큰 하이라이트 */}
                <mesh position={[sgn * 0.022, 0.03, 0.058]}>
                  <sphereGeometry args={[0.03, 14, 14]} />
                  <meshBasicMaterial color="#f4f8ff" toneMapped={false} />
                </mesh>
                {/* 작은 보조 하이라이트 */}
                <mesh position={[-sgn * 0.018, -0.028, 0.055]}>
                  <sphereGeometry args={[0.014, 10, 10]} />
                  <meshBasicMaterial color="#ffeef6" toneMapped={false} />
                </mesh>
              </group>
            ))}
            {/* 발그레한 볼 */}
            {([-1, 1] as const).map((sgn) => (
              <mesh key={sgn} position={[sgn * 0.2, -0.1, 0.21]}>
                <circleGeometry args={[0.05, 18]} />
                <meshBasicMaterial color={COL.blush} transparent opacity={0.6} toneMapped={false} />
              </mesh>
            ))}
            {/* 작은 입 */}
            <mesh position={[0, -0.17, 0.285]} rotation={[Math.PI / 2, 0, 0]}>
              <capsuleGeometry args={[0.012, 0.04, 4, 8]} />
              <meshStandardMaterial color="#d96a7e" roughness={0.5} />
            </mesh>

            {/* ===== 헤드셋 (후드 위로) ===== */}
            <mesh position={[0, 0.26, 0]}>
              <torusGeometry args={[0.4, 0.03, 10, 28, Math.PI]} />
              <meshStandardMaterial color={COL.band} roughness={0.4} metalness={0.5} />
            </mesh>
            {([-1, 1] as const).map((sgn) => (
              <group key={sgn} position={[sgn * 0.42, 0.05, 0]}>
                <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.095, 0.095, 0.07, 22]} />
                  <meshStandardMaterial color={COL.cans} roughness={0.45} metalness={0.2} />
                </mesh>
                {/* 발광 핑크 링 */}
                <mesh position={[sgn * 0.04, 0, 0]} rotation={[0, (sgn * Math.PI) / 2, 0]}>
                  <ringGeometry args={[0.05, 0.078, 24]} />
                  <meshBasicMaterial color={COL.cansRim} toneMapped={false} side={THREE.DoubleSide} />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      </group>
    </group>
  )
}
