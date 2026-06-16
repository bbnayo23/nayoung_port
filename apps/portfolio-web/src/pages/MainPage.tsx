import { Button } from '@port/design-system'
import { container, title, subtitle } from './MainPage.css'

export default function MainPage() {
  return (
    <div className={container}>
      <h1 className={title}>nayoung.dev</h1>
      <p className={subtitle}>포트폴리오 준비 중</p>
      <Button variant="primary">프로젝트 보러가기</Button>
    </div>
  )
}
