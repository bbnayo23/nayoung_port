import { Suspense, useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PCFShadowMap } from 'three'
import { GameProvider } from './store'
import { World } from './scene/World'
import { Hud } from './ui/Hud'
import { Loader } from './ui/Loader'
import { useQuality } from '../hooks/useQuality'
import { rooms, type RoomConfig } from './scene/rooms'
import { stage, canvas } from './Experience.css'

/**
 * 3D 경험 루트. <Canvas> 안에 GameProvider(상태)와 World(씬),
 * DOM HUD 는 Canvas 밖에서 active(문 앞 미리보기)/entered(입장) 상태를 받아 표시한다.
 */
export function Experience({ onShowText }: { onShowText?: () => void }) {
  const quality = useQuality()
  const [active, setActive] = useState<RoomConfig | null>(null)
  const [entered, setEntered] = useState<RoomConfig | null>(null)

  // 게이트(에러) 클릭 시 그 방으로 바로 다이브 — 인자가 없으면 현재 락온된 방
  const handleEnter = useCallback(
    (room?: RoomConfig) => {
      const r = room ?? active
      if (!r) return
      setActive(r)
      setEntered(r)
    },
    [active],
  )
  const handleExit = useCallback(() => setEntered(null), [])

  // 딥링크: ?room=<id> 로 특정 방에 바로 입장 (공유 가능한 링크)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('room')
    if (!id) return
    const r = rooms.find((x) => x.id === id || x.app === id)
    if (r) {
      setActive(r)
      setEntered(r)
    }
  }, [])

  return (
    <div className={stage}>
      <Canvas
        className={canvas}
        shadows={quality === 'high' ? { type: PCFShadowMap } : false}
        dpr={quality === 'high' ? [1, 1.75] : [1, 1.25]}
        gl={{ antialias: quality === 'high', powerPreference: 'high-performance' }}
        camera={{ position: [0, 6, 11], fov: 42, near: 0.1, far: 100 }}
      >
        <Suspense fallback={null}>
          <GameProvider>
            <World
              active={active}
              entered={entered}
              quality={quality}
              onRoomChange={setActive}
              onEnter={handleEnter}
              onExit={handleExit}
              onFixError={() => {}}
            />
          </GameProvider>
        </Suspense>
      </Canvas>

      <Loader />
      <Hud
        active={active}
        entered={entered}
        onEnter={handleEnter}
        onExit={handleExit}
        onShowText={onShowText}
      />
    </div>
  )
}
