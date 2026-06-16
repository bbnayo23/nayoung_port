import { Button } from '@port/design-system'
import { IconHeart } from '@port/icon-library'

export default function App() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>@port/dashboard</h1>
      <p style={{ color: '#666' }}>
        공유 패키지(@port/design-system, @port/icon-library)를 소비하는 독립 서브 앱
      </p>
      <Button icon={<IconHeart size={18} />}>Design System Button</Button>
    </main>
  )
}
