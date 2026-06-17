import { useProgress } from '@react-three/drei'
import { loaderRoot, loaderInner, loaderBar, loaderFill, loaderText, loaderMark } from './Loader.css'

/** 씬 로딩 오버레이 — drei useProgress 글로벌 스토어를 구독 (Canvas 밖에서 동작) */
export function Loader() {
  const { active, progress } = useProgress()
  // 로딩할 비동기 애셋이 있을 때만 노출 (프리미티브 전용 씬은 즉시 표시)
  if (!active) return null

  return (
    <div className={loaderRoot} data-done={!active}>
      <div className={loaderInner}>
        <span className={loaderMark}>ny</span>
        <div className={loaderBar}>
          <div className={loaderFill} style={{ width: `${progress}%` }} />
        </div>
        <span className={loaderText}>compiling dimension… {Math.round(progress)}%</span>
      </div>
    </div>
  )
}
