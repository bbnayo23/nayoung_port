import * as THREE from 'three'

/**
 * 프레임레이트 독립 감쇠(damping). 매 프레임 현재값을 목표값으로 부드럽게 수렴시킨다.
 * lambda 가 클수록 빠르게 따라붙는다. (1 - e^(-λ·dt) 보간 계수)
 */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt))
}

/** Vector3 in-place 감쇠 */
export function damp3(current: THREE.Vector3, target: THREE.Vector3, lambda: number, dt: number) {
  const t = 1 - Math.exp(-lambda * dt)
  current.x += (target.x - current.x) * t
  current.y += (target.y - current.y) * t
  current.z += (target.z - current.z) * t
  return current
}

/** 각도 최단경로 감쇠 (라디안) */
export function dampAngle(current: number, target: number, lambda: number, dt: number) {
  let delta = (target - current) % (Math.PI * 2)
  if (delta > Math.PI) delta -= Math.PI * 2
  if (delta < -Math.PI) delta += Math.PI * 2
  return current + delta * (1 - Math.exp(-lambda * dt))
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
