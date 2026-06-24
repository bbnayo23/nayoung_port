import type { ReactNode, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }
export type UISizeType = 'sm' | 'md' | 'lg'

export interface ModalProps {
  /** 모달 열림 여부 */
  open?: boolean
  /** 모달 열림 여부 (open의 alias) */
  isOpen?: boolean
  onClose: () => void
  className?: string
  /** Portal 대상 element 또는 반환 함수 (기본값: undefined → document.body) */
  portalTarget?: HTMLElement | (() => HTMLElement)
  size?: UISizeType
  children?: ReactNode
  type?: 'modal' | 'sidepanel'
  position?: 'left' | 'right'
  isClosing?: boolean
  /** sidepanel 타입일 때도 dimmed 배경을 표시할지 여부 (기본값: false) */
  showDimmed?: boolean
  /** sidepanel 타입일 때 우상단 close 버튼 표시 여부 (기본값: true) */
  showCloseButton?: boolean
  /** 헤더 영역 콘텐츠 (prop 방식) */
  header?: ReactNode
  /** 푸터 영역 콘텐츠 (prop 방식) */
  footer?: ReactNode
  /** 외부(dimmed) 클릭 시 닫기 (기본: true) */
  closeOnOverlay?: boolean
  /** ESC 키로 닫기 (기본: true) */
  closeOnEsc?: boolean
  /** body 영역 className (prop 방식 사용 시 적용) */
  bodyClassName?: string
}

export interface ModalSubComponentProps extends React.HTMLAttributes<HTMLDivElement>, CommonProps {
  children: React.ReactNode
}
