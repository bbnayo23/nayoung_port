import { style } from '@vanilla-extract/css'

// 헤더는 디자인시스템 PageHeader 사용 — 여기선 콘텐츠 영역만 담당.
export const body = style({
  flex: 1,
  minHeight: 0,
})
