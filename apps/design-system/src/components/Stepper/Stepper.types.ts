import type { CSSProperties, ReactNode } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface StepperContextType {
  position: 'horizontal' | 'vertical'
  showNumbers: boolean
}

export interface StepperProps extends CommonProps {
  position?: 'horizontal' | 'vertical'
  showNumbers?: boolean
  children: ReactNode
}

export interface StepperStepProps extends CommonProps {
  id: string | number
  title: string
  description?: string
  icon?: ReactNode
  isActive?: boolean
  isCompleted?: boolean
  isDisabled?: boolean
  isOptional?: boolean
  isError?: boolean
  isClickable?: boolean
  onClick?: () => void
  stepNumber: number
}

export interface StepperContentProps extends CommonProps {
  children?: ReactNode
}

export interface StepperControlsProps extends CommonProps {
  onPrevious?: () => void
  onNext?: () => void
  onComplete?: () => void
  nextButtonText?: string
  previousButtonText?: string
  completeButtonText?: string
  showPrevious?: boolean
  showNext?: boolean
  showComplete?: boolean
  isPreviousDisabled?: boolean
  isNextDisabled?: boolean
  isCompleteDisabled?: boolean
  children?: ReactNode
}

export interface StepperConnectorProps extends CommonProps {
  isCompleted?: boolean
}
