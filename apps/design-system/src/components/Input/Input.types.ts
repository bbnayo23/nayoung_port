import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

/**
 * Input 컴포넌트의 기본 속성들입니다.
 * HTML input 기본 속성을 상속받고, 추가 UI 기능만 정의합니다.
 */
export interface InputInterface
  extends CommonProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className' | 'style'> {
  /**
   * 시각적 상태 변형 (UI 피드백용)
   */
  variant?: 'default' | 'ghost' | 'error' | 'success' | 'warning'

  /**
   * 입력 필드 크기
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * 입력 필드 크기 (size의 alias)
   */
  inputSize?: 'sm' | 'md' | 'lg'

  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean

  /**
   * Input 왼쪽에 표시할 요소 (최우선순위)
   * ReactNode를 받아 아이콘, 텍스트, 배지, 커스텀 컴포넌트 등 모든 요소 사용 가능
   * 이벤트 핸들러는 전달하는 요소에 직접 추가하세요
   */
  prefixIcon?: ReactNode

  /**
   * Input 오른쪽에 표시할 요소 (최우선순위)
   * ReactNode를 받아 아이콘, 텍스트, 배지, 커스텀 컴포넌트 등 모든 요소 사용 가능
   * showClearButton보다 우선순위가 높음
   * 이벤트 핸들러는 전달하는 요소에 직접 추가하세요
   */
  suffixIcon?: ReactNode

  /**
   * 클리어 버튼 표시 여부 (사용자가 직접 제어)
   * suffixIcon이 있으면 무시됨
   */
  showClearButton?: boolean

  /**
   * 클리어 버튼 클릭 시 호출되는 콜백 (showClearButton이 true일 때 필수)
   */
  onClear?: () => void

  /**
   * 도움말 텍스트 (Input 하단에 표시, variant에 따라 색상이 변경됨)
   */
  helperText?: string
}
