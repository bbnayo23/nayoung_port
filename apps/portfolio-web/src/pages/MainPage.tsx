import { Suspense, lazy, useEffect, useState } from 'react'
import { useCanRender3D } from '../hooks/useCanRender3D'
import FallbackPage from './FallbackPage'

// 3D 번들은 무겁다 — 폴백 환경에선 아예 로드하지 않도록 동적 임포트
const Experience = lazy(() =>
  import('../three/Experience').then((m) => ({ default: m.Experience })),
)

type Mode = 'auto' | 'three' | 'text'

export default function MainPage() {
  const can3D = useCanRender3D()
  const [mode, setMode] = useState<Mode>('auto')

  // 사용자가 마지막으로 고른 모드를 기억
  useEffect(() => {
    const saved = localStorage.getItem('port:mode')
    if (saved === 'three' || saved === 'text') setMode(saved)
  }, [])

  const choose = (m: Mode) => {
    setMode(m)
    if (m === 'three' || m === 'text') localStorage.setItem('port:mode', m)
  }

  // 판정 전(can3D === null)에는 잠깐 빈 화면
  if (can3D === null && mode === 'auto') return null

  const show3D = mode === 'three' || (mode === 'auto' && can3D === true)

  if (show3D) {
    return (
      <Suspense fallback={null}>
        <Experience onShowText={() => choose('text')} />
      </Suspense>
    )
  }

  return <FallbackPage onShow3D={() => choose('three')} />
}
