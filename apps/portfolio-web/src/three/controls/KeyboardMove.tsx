import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../store'
import { clampFlight } from '../scene/roomGeometry'

const FORWARD = ['ArrowUp', 'KeyW']
const BACK = ['ArrowDown', 'KeyS']
const LEFT = ['ArrowLeft', 'KeyA']
const RIGHT = ['ArrowRight', 'KeyD']
const UP = ['Space', 'KeyE']
const DOWN = ['ShiftLeft', 'ShiftRight', 'KeyQ']
const ALL = [...FORWARD, ...BACK, ...LEFT, ...RIGHT, ...UP, ...DOWN]

/**
 * 키보드 접근성 — 방향키/WASD 로 비행, Space/E 상승·Shift/Q 하강, Enter 입장, Esc 퇴장.
 * 누르는 동안 charTarget 을 진행 방향 앞쪽으로 갱신해 캐릭터가 그쪽으로 헤엄치게 한다.
 * 마우스 클릭 이동과 충돌하지 않도록, 키를 뗀 직후 한 번만 정지시킨다.
 */
export function KeyboardMove({ onEnter, onExit }: { onEnter: () => void; onExit: () => void }) {
  const game = useGame()
  const keys = useRef<Set<string>>(new Set())
  const wasPressing = useRef(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Enter') { onEnter(); return }
      if (e.code === 'Escape') { onExit(); return }
      if (ALL.includes(e.code)) {
        keys.current.add(e.code)
        e.preventDefault()
      }
    }
    const up = (e: KeyboardEvent) => keys.current.delete(e.code)
    const blur = () => keys.current.clear()
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', blur)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', blur)
    }
  }, [onEnter, onExit])

  useFrame(() => {
    if (game.diving.value) return // 다이브 중엔 입력 잠금
    const k = keys.current
    let dx = 0
    let dy = 0
    let dz = 0
    if (FORWARD.some((c) => k.has(c))) dz -= 1
    if (BACK.some((c) => k.has(c))) dz += 1
    if (LEFT.some((c) => k.has(c))) dx -= 1
    if (RIGHT.some((c) => k.has(c))) dx += 1
    if (UP.some((c) => k.has(c))) dy += 1
    if (DOWN.some((c) => k.has(c))) dy -= 1

    const pressing = dx !== 0 || dy !== 0 || dz !== 0
    if (pressing) {
      const len = Math.hypot(dx, dy, dz)
      const lead = 1.8
      const [cx, cy, cz] = clampFlight(
        game.charPos.x + (dx / len) * lead,
        game.charPos.y + (dy / len) * lead,
        game.charPos.z + (dz / len) * lead,
        game.mode.value,
        game.roomX.value,
      )
      game.charTarget.set(cx, cy, cz)
    } else if (wasPressing.current) {
      // 키를 뗀 순간 한 번만 정지 (클릭 이동을 덮어쓰지 않도록)
      game.charTarget.copy(game.charPos)
    }
    wasPressing.current = pressing
  })

  return null
}
