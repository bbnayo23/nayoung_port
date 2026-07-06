import { Suspense, lazy, useState } from 'react'
import { useCanRender3D } from '../hooks/useCanRender3D'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Splash } from '../components/Splash'
import FallbackPage from './FallbackPage'

// 3D 번들은 무겁다 — 폴백 환경에선 아예 로드하지 않도록 동적 임포트
const Experience = lazy(() =>
  import('../three/Experience').then((m) => ({ default: m.Experience })),
)

type Mode = 'auto' | 'three' | 'text'

export default function MainPage() {
  const can3D = useCanRender3D()
  // 항상 3D 우선 — 이전 선택을 기억하지 않고, 열 때마다 auto(가능 기기면 3D)로 시작한다.
  // 텍스트 전환은 세션 내에서만 유지된다.
  const [mode, setMode] = useState<Mode>('auto')

  // 판정 전(can3D === null)에는 잠깐 빈 화면
  if (can3D === null && mode === 'auto') return null

  const show3D = mode === 'three' || (mode === 'auto' && can3D === true)

  if (show3D) {
    // 3D 씬이 렌더 중 throw 하면 텍스트 버전으로 강등한다 (백스크린 방지).
    return (
      <ErrorBoundary
        onError={() => setMode('text')}
        fallback={<FallbackPage onShow3D={() => setMode('three')} />}
      >
        <Suspense fallback={<Splash />}>
          <Experience onShowText={() => setMode('text')} />
        </Suspense>
      </ErrorBoundary>
    )
  }

  return <FallbackPage onShow3D={() => setMode('three')} />
}
