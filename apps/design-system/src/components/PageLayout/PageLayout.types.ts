import type React from 'react'
import type { ReactNode } from 'react'

export type DivProps = React.HTMLAttributes<HTMLDivElement>
export type SpanProps = React.HTMLAttributes<HTMLSpanElement>
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export interface SectionCardProps extends DivProps {
  $flex?: boolean
}

export interface PageHeaderSimpleProps {
  title: ReactNode
  description?: ReactNode
  right?: ReactNode
  className?: string
}

export type StatsBarProps = DivProps

export interface StatItemProps extends DivProps {
  $isTotal?: boolean
  $active?: boolean
}

export interface StatCountProps extends SpanProps {
  $isTotal?: boolean
}

export type StatLabelProps = SpanProps

export interface ChipProps extends ButtonProps {
  $active?: boolean
}
