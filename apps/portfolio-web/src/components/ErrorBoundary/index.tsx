import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback: ReactNode
  onError?: (error: Error, info: ErrorInfo) => void
}

type State = { hasError: boolean }

/**
 * 3D 씬(R3F/three.js)은 드라이버·WebGL 컨텍스트 문제로 언제든 throw 할 수 있다.
 * 그 에러가 앱 전체를 백스크린으로 만들지 않도록 경계에서 잡아 fallback 으로 강등한다.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
