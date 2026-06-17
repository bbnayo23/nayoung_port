import { createContext, useContext, useRef, type ReactNode } from 'react'
import * as THREE from 'three'

/**
 * 게임 상태 — 매 프레임 갱신되는 값은 React state 대신 ref(mutable)로 공유해
 * 리렌더 폭주를 피한다. 컨트롤러/카메라/캐릭터가 같은 객체를 읽고 쓴다.
 *
 * Provider 는 반드시 <Canvas> 내부에 둔다 (R3F 리컨실러 경계 안에서 공유).
 */
export type GameState = {
  /** 캐릭터 현재 위치 (월드, 3D 비행 — y 포함) */
  charPos: THREE.Vector3
  /** 캐릭터 목표 위치 (click-to-fly, 3D) */
  charTarget: THREE.Vector3
  /** 커서가 가리키는 비행 평면 지점 (시선/카메라 유도) */
  gaze: THREE.Vector3
  /** 이동 중 여부 (헤엄 애니메이션 토글) */
  moving: { value: boolean }
  /** 캐릭터가 바라보는 방향(yaw, 라디안) */
  facing: { value: number }
  /** 비행 피치(상하 기울기, 라디안) — 캐릭터 헤엄 뱅킹용 */
  pitch: { value: number }
  /** 블랙홀 다이브 진행 중 — 사용자 입력 잠금 + 가속 흡입 */
  diving: { value: boolean }
  /** 휠 줌 배율 — 카메라 거리 스케일(작을수록 확대). 모드 전환 시 1로 리셋 */
  zoom: { value: number }
  /** 현재 공간 모드 — 비행 경계/카메라가 참조 (프레임 루프에서 읽음) */
  mode: { value: 'living' | 'focus' | 'room' }
  /** 현재 관련 게이트의 x 좌표 (room/focus 모드에서 경계 기준) */
  roomX: { value: number | null }
}

function createGameState(): GameState {
  return {
    charPos: new THREE.Vector3(0, 2.2, 5),
    charTarget: new THREE.Vector3(0, 2.2, 5),
    gaze: new THREE.Vector3(0, 2, -2),
    moving: { value: false },
    facing: { value: Math.PI }, // 초기에 안쪽(에러 게이트 방향)을 바라봄
    pitch: { value: 0 },
    diving: { value: false },
    zoom: { value: 1 },
    mode: { value: 'living' },
    roomX: { value: null },
  }
}

const GameContext = createContext<GameState | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const ref = useRef<GameState>(null)
  if (!ref.current) ref.current = createGameState()
  return <GameContext.Provider value={ref.current}>{children}</GameContext.Provider>
}

export function useGame(): GameState {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within <GameProvider>')
  return ctx
}
