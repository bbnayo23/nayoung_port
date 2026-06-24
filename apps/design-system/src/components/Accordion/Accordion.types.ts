import type {
  PropsWithChildren,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
  CSSProperties,
} from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface AccordionProps extends PropsWithChildren<CommonProps> {
  iconDirection?: 'left' | 'right'
  disabled?: boolean
}

export interface AccordionItemProps extends PropsWithChildren<CommonProps> {
  active?: boolean
  onChange?: (nextActive: boolean) => void
  disabled?: boolean
}

export type AccordionHeaderProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export type AccordionContentProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export interface AccordionContextValue {
  iconDirection: 'left' | 'right'
  disabled: boolean
}

export interface AccordionItemContextValue {
  active: boolean
}

export type AccordionComponent = ForwardRefExoticComponent<AccordionProps & RefAttributes<HTMLDivElement>> & {
  Item: ForwardRefExoticComponent<AccordionItemProps & RefAttributes<HTMLDivElement>>
  Header: ForwardRefExoticComponent<AccordionHeaderProps & RefAttributes<HTMLButtonElement>>
  Content: ForwardRefExoticComponent<AccordionContentProps & RefAttributes<HTMLDivElement>>
}
