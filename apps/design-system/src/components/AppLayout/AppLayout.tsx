import { forwardRef } from 'react'
import cn from 'classnames'
import { appLayout, appLayoutBody, appLayoutMainWrap, appLayoutMain } from './AppLayout.css'
import type { AppLayoutProps } from './AppLayout.types'

/**
 * AppLayout — 어떤 솔루션이든 공통으로 쓰는 애플리케이션 셸.
 *
 * 세로: GNB → Body / Body 가로: LNB → Main.
 * - GNB 아래 영역은 루트 그라디언트가 비쳐 GNB 배경과 이어진다.
 * - LNB · Main 은 좌상단 한쪽 라운드 + 그림자 카드로 표현된다.
 *
 * @example
 * <AppLayout solution="xdr" gnb={<Gnb .../>} lnb={<Lnb .../>}>
 *   <PageHeaderRow>…</PageHeaderRow>
 *   <PageContent>…</PageContent>
 * </AppLayout>
 */
const AppLayout = forwardRef<HTMLDivElement, AppLayoutProps>((props, ref) => {
  const { gnb, lnb, children, solution, mainClassName, className, ...rest } = props

  return (
    <div
      ref={ref}
      className={cn(appLayout, 'app-layout', className)}
      data-solution={solution}
      {...rest}
    >
      {gnb}
      <div className={cn(appLayoutBody, 'app-layout-body')}>
        {lnb}
        {/* Main 래퍼 — 배경은 LNB 배경색과 동일. Main 라운드 코너가 이 색을 드러낸다. */}
        <div className={cn(appLayoutMainWrap, 'app-layout-main-wrap')}>
          <main className={cn(appLayoutMain, 'app-layout-main', mainClassName)}>{children}</main>
        </div>
      </div>
    </div>
  )
})

AppLayout.displayName = 'AppLayout'

export default AppLayout
