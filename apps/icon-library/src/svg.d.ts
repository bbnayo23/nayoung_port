// vite-plugin-svgr 로 SVG 를 React 컴포넌트로 임포트할 때의 타입 선언.
declare module '*.svg?react' {
  import type { FC, SVGProps } from 'react'
  const SVGComponent: FC<SVGProps<SVGSVGElement>>
  export default SVGComponent
}
