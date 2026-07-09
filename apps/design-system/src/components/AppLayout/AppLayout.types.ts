import type { HTMLAttributes, ReactNode } from 'react'

/**
 * AppLayout — 솔루션 공통 애플리케이션 셸.
 * 상단 GNB · 좌측 LNB · 우측 Main 을 조합하는 프리젠테이션 셸이며,
 * 각 슬롯에는 임의의 컴포넌트(솔루션별 Gnb/Lnb 등)를 넣을 수 있다.
 */
export interface AppLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** 최상단 GNB 슬롯 */
  gnb?: ReactNode
  /** 좌측 LNB 슬롯 */
  lnb?: ReactNode
  /** 우측 Main 영역 콘텐츠 */
  children?: ReactNode
  /** data-solution 값 — 솔루션별 테마 토큰 스코프 (xdr · exd · soar 등) */
  solution?: string
  /** Main 영역에 적용할 추가 className */
  mainClassName?: string
}
