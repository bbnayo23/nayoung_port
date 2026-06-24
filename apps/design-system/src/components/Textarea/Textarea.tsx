import { forwardRef, type CSSProperties } from 'react'
import { textarea } from './Textarea.css'
import type { TextareaProps } from './Textarea.types'
import cn from 'classnames'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ height = 'auto', resize = 'none', className, style, ...props }, ref) => {
    const dynamicStyle: CSSProperties = {
      ...style,
      resize,
      height: height === 'auto' ? 'auto' : `${height}px`,
    }

    return <textarea ref={ref} className={cn(textarea, 'textarea', className)} style={dynamicStyle} {...props} />
  },
)
Textarea.displayName = 'Textarea'

export default Textarea
