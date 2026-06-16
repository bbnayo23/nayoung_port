import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children: ReactNode
  /** 마운트 대상. 기본값은 document.body */
  container?: HTMLElement | null
}

/**
 * 자식을 DOM 트리 바깥(기본 document.body)으로 렌더링한다.
 * Modal / Drawer / Tooltip / Toast 처럼 부모의 overflow·z-index 에서 자유로워야 하는
 * 레이어 컴포넌트가 공유한다. SSR 안전(마운트 전엔 null).
 */
export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // SSR 안전: 클라이언트 마운트 이후에만 portal 렌더 (React 공식 패턴)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null
  return createPortal(children, container ?? document.body)
}
