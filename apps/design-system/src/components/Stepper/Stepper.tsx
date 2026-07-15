import { createContext, useContext } from 'react'
import { ExdCheckIcon, ExdCloseIcon } from '@port/icon-library'
import type {
  StepperContextType,
  StepperProps,
  StepperStepProps,
  StepperContentProps,
  StepperControlsProps,
  StepperConnectorProps,
} from './Stepper.types'
import {
  styledStep,
  styledStepIcon,
  styledStepContent,
  styledStepTitle,
  styledStepDescription,
  styledStepContentPanel,
  styledStepControls,
  styledStepConnector,
  styledStepper,
} from './Stepper.css'
import { Button } from '@dc/components/Button/Button'
import cn from 'classnames'

const StepperContext = createContext<StepperContextType | null>(null)

const useStepperContext = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('Stepper 하위 컴포넌트는 Stepper 내부에서 사용되어야 합니다.')
  }
  return context
}

const StepperStep = ({
  id: _id,
  title,
  description,
  icon,
  isActive = false,
  isCompleted = false,
  isDisabled = false,
  isOptional = false,
  isError = false,
  isClickable = false,
  stepNumber,
  onClick,
  className,
  style,
  ...props
}: StepperStepProps) => {
  const { position, showNumbers } = useStepperContext()

  return (
    <div
      onClick={onClick}
      tabIndex={isClickable ? 0 : -1}
      className={cn(styledStep, 'stepper-step', className, {
        'is-active': isActive,
        'is-completed': isCompleted,
        'is-disabled': isDisabled,
        'is-optional': isOptional,
        'is-error': isError,
        'is-clickable': isClickable,
        vertical: position === 'vertical',
        horizontal: position === 'horizontal',
      })}
      style={style}
      {...props}
    >
      <div className={cn(styledStepIcon, 'stepper-step-icon')}>
        {icon ? (
          icon
        ) : isCompleted ? (
          <ExdCheckIcon size={14} />
        ) : isError ? (
          <ExdCloseIcon size={14} />
        ) : showNumbers ? (
          stepNumber + 1
        ) : null}
      </div>

      <div
        className={cn(styledStepContent, 'stepper-step-content', {
          vertical: position === 'vertical',
          horizontal: position === 'horizontal',
        })}
      >
        <div
          className={cn(styledStepTitle, 'stepper-step-title', {
            'is-active': isActive,
            'is-completed': isCompleted,
            'is-error': isError,
          })}
        >
          {title}
          {isOptional && <span className="optional-indicator">(Optional)</span>}
        </div>

        {description && (
          <div
            className={cn(styledStepDescription, 'stepper-step-description', {
              'is-error': isError,
            })}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  )
}

const StepperContent = ({ children, className, style }: StepperContentProps) => {
  return (
    <div className={cn(styledStepContentPanel, 'stepper-content', className)} style={style}>
      {children}
    </div>
  )
}

const StepperControls = ({
  onPrevious,
  onNext,
  onComplete,
  nextButtonText = 'Next',
  previousButtonText = 'Previous',
  completeButtonText = 'Complete',
  showPrevious = true,
  showNext = true,
  showComplete = true,
  isPreviousDisabled = false,
  isNextDisabled = false,
  isCompleteDisabled = false,
  className,
  style,
  children,
}: StepperControlsProps) => {
  return (
    <div className={cn(styledStepControls, 'stepper-controls', className)} style={style}>
      {showPrevious && (
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={isPreviousDisabled}
          className="stepper-button-previous"
        >
          {previousButtonText}
        </Button>
      )}

      <div className="stepper-controls-spacer">{children}</div>

      {showNext && (
        <Button variant="primary" onClick={onNext} disabled={isNextDisabled} className="stepper-button-next">
          {nextButtonText}
        </Button>
      )}

      {showComplete && (
        <Button
          variant="primary"
          onClick={onComplete}
          disabled={isCompleteDisabled}
          className="stepper-button-complete"
        >
          {completeButtonText}
        </Button>
      )}
    </div>
  )
}

const StepperConnector = ({ isCompleted = false, className, style }: StepperConnectorProps) => {
  const { position } = useStepperContext()

  return (
    <div
      className={cn(styledStepConnector, 'stepper-connector', className, {
        'is-completed': isCompleted,
        vertical: position === 'vertical',
        horizontal: position === 'horizontal',
      })}
      style={style}
    />
  )
}

const Stepper = (props: StepperProps) => {
  const { className, style, position = 'horizontal', showNumbers = true, children } = props

  const contextValue: StepperContextType = {
    position,
    showNumbers,
  }

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        className={cn(styledStepper, 'stepper-wrapper', className, {
          vertical: position === 'vertical',
          horizontal: position === 'horizontal',
        })}
        style={style}
      >
        {children}
      </div>
    </StepperContext.Provider>
  )
}

Stepper.displayName = 'Stepper'
StepperStep.displayName = 'StepperStep'
StepperContent.displayName = 'StepperContent'
StepperControls.displayName = 'StepperControls'
StepperConnector.displayName = 'StepperConnector'

const StepperWithSections = Object.assign(Stepper, {
  Step: StepperStep,
  Content: StepperContent,
  Controls: StepperControls,
  Connector: StepperConnector,
})

export default StepperWithSections
