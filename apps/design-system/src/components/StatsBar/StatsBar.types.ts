import type { HTMLAttributes, ReactNode } from 'react'

export interface StatsBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface StatItemProps extends HTMLAttributes<HTMLDivElement> {
  $isTotal?: boolean
  $active?: boolean
  popoverContent?: ReactNode
  children: ReactNode
}

export interface StatCountProps extends HTMLAttributes<HTMLSpanElement> {
  $isTotal?: boolean
  children: ReactNode
}

export interface StatLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}
