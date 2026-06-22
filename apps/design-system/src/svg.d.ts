// @port/icon-library(스토리에서 소비)가 소스로 소비되며 svg?react 임포트를
// 포함하므로, 이 패키지의 타입 컴파일에도 동일한 모듈 선언이 필요하다.
declare module '*.svg?react' {
  import type { FC, SVGProps } from 'react'
  const SVGComponent: FC<SVGProps<SVGSVGElement>>
  export default SVGComponent
}
