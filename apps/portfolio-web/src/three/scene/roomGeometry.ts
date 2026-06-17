import { clamp } from '../utils'

/** 코드 차원 공용 치수 — World · Controls · CameraRig · ProjectSpace 가 공유 */
export const WALL_Z = -7 // 보이드 안쪽 경계(에러 게이트 면)

export const ROOM_W = 4.5 // 방 내부 폭 (문 3개가 겹치지 않는 범위)
export const ROOM_DEPTH = 7 // 방 깊이 (벽 뒤로)
export const ROOM_H = 3.2 // 방 높이
export const ROOM_BACK_Z = WALL_Z - ROOM_DEPTH // -14
export const ROOM_CENTER_Z = WALL_Z - ROOM_DEPTH / 2 // -10.5

/** 캐릭터가 차원 안에 진입해 머무는 지점 z (다이브 도착 목표) */
export const INTERIOR_STAND_Z = WALL_Z - ROOM_DEPTH * 0.55 // ≈ -10.85
/** 보이드에서 게이트 앞 대기 지점 z (퇴장 시 목표) */
export const DOOR_FRONT_Z = -3.9

/** 코드 보이드 비행 경계 — 공중(y) 포함 자유 비행 */
export const FLIGHT_BOUND = { x: 9, yMin: 0.7, yMax: 7, zNear: 7, zFar: -6.3 }
/** 캐릭터 비행 기본 고도(스폰/대기) */
export const FLIGHT_Y = 2.2

/**
 * 현재 모드에 맞게 3D 목표 좌표를 비행 가능 영역으로 제한한다.
 * - room: 해당 프로젝트 차원 내부 / - 그 외: 코드 보이드(공중 비행)
 */
export function clampFlight(
  x: number,
  y: number,
  z: number,
  mode: 'living' | 'focus' | 'room',
  roomX: number | null,
): [number, number, number] {
  if (mode === 'room' && roomX != null) {
    const m = ROOM_W / 2 - 0.5
    return [
      clamp(x, roomX - m, roomX + m),
      clamp(y, 0.7, ROOM_H - 0.5),
      clamp(z, ROOM_BACK_Z + 0.6, WALL_Z - 0.4),
    ]
  }
  return [
    clamp(x, -FLIGHT_BOUND.x, FLIGHT_BOUND.x),
    clamp(y, FLIGHT_BOUND.yMin, FLIGHT_BOUND.yMax),
    clamp(z, FLIGHT_BOUND.zFar, FLIGHT_BOUND.zNear),
  ]
}
