import type { CSSProperties, TextareaHTMLAttributes } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'resize'>, CommonProps {
  resize?: CSSProperties['resize']
  height?: number | 'auto'
}
