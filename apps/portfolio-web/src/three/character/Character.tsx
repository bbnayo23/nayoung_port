import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGame } from '../store'
import { dampAngle, damp, clamp } from '../utils'

/** 디자이너 토이풍 팔레트 — 파스텔 핑크 베어 후드 + 코지 원지 + 에어맥스 + 헤드셋 */
const COL = {
  skin: '#ffe2cb',
  blush: '#ff9db5',
  hood: '#ff9ec2', // 파스텔 핑크 베어 후드
  hoodLit: '#ffb9d6',
  earIn: '#ffd5e4',
  onesie: '#fff5f9', // 부드러운 크림화이트 원지
  onesieShade: '#ffe4ee',
  hair: '#f4cd86', // 이마 위로 삐져나온 금발 프린지
  cans: '#fef4f8', // 헤드셋 컵(화이트)
  cansRim: '#ff6f9c', // 헤드셋 발광 링(핑크)
  band: '#2c3148', // 헤드셋 밴드
  shoe: '#fcfcff', // 에어맥스 화이트 어퍼
  sole: '#e6ecff', // 미드솔
  swoosh: '#ff6f9c', // 스우시 액센트
  air: '#7cc8ff', // 에어 버블(블루)
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

          {/* ===== 팔: 원지 소매 + 둥근 paw ===== */}
          {([-1, 1] as const).map((sgn) => (
            <group key={sgn} ref={sgn < 0 ? armL : armR} position={[sgn * 0.24, 0.74, 0]}>
              <mesh castShadow position={[0, -0.13, 0]}>
                <capsuleGeometry args={[0.075, 0.16, 8, 16]} />
                <meshStandardMaterial color={COL.onesie} roughness={0.85} emissive={COL.onesie} emissiveIntensity={0.07} />
              </mesh>
              {/* 둥근 손(paw) */}
              <mesh castShadow position={[0, -0.26, 0]}>
                <sphereGeometry args={[0.082, 16, 14]} />
                <meshStandardMaterial color={COL.onesieShade} roughness={0.8} />
              </mesh>
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
                  <meshBasicMaterial color="#ffffff" toneMapped={false} />
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
