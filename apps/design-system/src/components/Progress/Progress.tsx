import type { CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode } from 'react'
import { useOnComplete } from './Progress.hooks'
import { progressWrapper } from './Progress.css'
import type { ProgressProps, ProgressStackItemProps, ProgressStackProps, ProgressTransition } from './Progress.types'
import cn from 'classnames'

const resolveTransitionVars = (transition: ProgressTransition): Record<string, string> => {
  if (transition === false || transition === true) return {}
  return {
    ...(transition.duration ? { '--progress-duration': transition.duration } : {}),
    ...(transition.easing ? { '--progress-easing': transition.easing } : {}),
  }
}

const ProgressItem = ({
  value,
  color = 'success',
  transition = true,
  className,
  children,
}: PropsWithChildren<ProgressStackItemProps>) => {
  if (value < 0 || value > 100) return null
  const cssVars = {
    '--progress-width': `${value}%`,
    ...resolveTransitionVars(transition),
  } as CSSProperties
  return (
    <div
      className={cn(
        'progress-bar',
        {
          'no-transition': transition === false,
          [`color-${color}`]: !!color,
        },
        className,
      )}
      style={cssVars}
    >
      {children}
    </div>
  )
}

const Wrapper = ({ className, children, ...rest }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => {
  return (
    <div className={cn(progressWrapper, className)} {...rest}>
      {children}
    </div>
  )
}

const Progress = ({
  value,
  shape = 'linear-round',
  transition = true,
  color = 'success',
  shadow = true,
  onComplete,
  className,
  children,
  ...rest
}: PropsWithChildren<ProgressProps>) => {
  useOnComplete(value, onComplete, 400)
  return (
    <Wrapper
      className={cn(
        'progress',
        shape,
        { shadow, completed: value === 100, inProgress: value > 0 && value < 100 },
        className,
      )}
      {...rest}
    >
      <ProgressItem value={value} color={color} transition={transition}>
        {children}
      </ProgressItem>
    </Wrapper>
  )
}

const Stack = ({ shape, shadow = true, className, children, ...rest }: ProgressStackProps) => {
  return (
    <Wrapper className={cn('progress', shape, { shadow }, className)} {...rest}>
      {children}
    </Wrapper>
  )
}

Progress.Stack = Stack
Progress.Item = ProgressItem

export default Progress
