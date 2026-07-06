import { brand } from '../../data'
import { splashRoot, splashMark } from './Splash.css'

// 3D 번들(무거운 lazy 청크)을 내려받는 동안 보이는 가벼운 스플래시.
// 여기엔 어떤 3D 의존성도 두지 않는다 — 그래야 청크 밖에서 즉시 그려진다.
export function Splash() {
  return (
    <div className={splashRoot} role="status" aria-label="Loading">
      <span className={splashMark}>{brand.monogram}</span>
    </div>
  )
}
