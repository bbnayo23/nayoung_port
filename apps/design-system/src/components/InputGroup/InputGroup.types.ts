import type { CSSProperties, ReactNode } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }
type UISizeType = 'sm' | 'md' | 'lg'

/**
 * InputGroup 컴포넌트용 variant 타입
 */
export type InputGroupVariant = 'default' | 'error' | 'success' | 'warning'

/**
 * Button 컴포넌트용 variant 타입
 */
export type InputGroupButtonVariant = 'primary' | 'secondary' | 'ghost'

/**
 * 위치 타입
 */
export type InputGroupIconPosition = 'left' | 'right' | 'middle'

/**
 * 크기 관련 공통 props
 */
export interface InputGroupSizeProps {
  /** 컴포넌트 크기 */
  size?: UISizeType
}

/**
 * InputGroup variant 관련 공통 props
 */
export interface InputGroupVariantProps {
  /** 시각적 상태 변형 */
  variant?: InputGroupVariant
}

/**
 * 레이아웃 관련 공통 props
 */
export interface InputGroupLayoutProps {
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean
}

/**
 * 위치 관련 공통 props
 */
export interface InputGroupIconPositionProps {
  /** 컴포넌트 위치 */
  position?: InputGroupIconPosition
}

/**
 * InputGroup 컴포넌트의 props 타입
 */
export interface InputGroupProps
  extends
    CommonProps,
    InputGroupSizeProps,
    InputGroupVariantProps,
    InputGroupLayoutProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** 필드 레이블 (FieldGroup 호환) */
  label?: ReactNode
}

/**
 * InputGroup.Input 컴포넌트의 props 타입
 */
export interface InputGroupInputProps
  extends CommonProps, InputGroupSizeProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {}

/**
 * InputGroup.Button 컴포넌트의 props 타입
 */
export interface InputGroupButtonProps
  extends CommonProps, InputGroupSizeProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 변형 */
  variant?: InputGroupButtonVariant
}

/**
 * InputGroup.Text 컴포넌트의 props 타입
 */
export interface InputGroupTextProps extends CommonProps, InputGroupSizeProps, React.HTMLAttributes<HTMLSpanElement> {}

/**
 * InputGroup.Icon 컴포넌트의 props 타입
 */
export interface InputGroupIconProps
  extends CommonProps, InputGroupSizeProps, InputGroupIconPositionProps, React.HTMLAttributes<HTMLSpanElement> {}

/**
 * InputGroup.HelperText 컴포넌트의 props 타입
 */
export interface InputGroupHelperTextProps
  extends CommonProps, InputGroupVariantProps, React.HTMLAttributes<HTMLDivElement> {}

/**
 * InputGroup.Label 컴포넌트의 props 타입
 */
export interface InputGroupLabelProps extends CommonProps, React.LabelHTMLAttributes<HTMLLabelElement> {
  /** 필수 항목 표시 */
  required?: boolean
}
