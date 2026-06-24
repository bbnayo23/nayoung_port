import type { ReactNode, MouseEvent, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export type TabsSize = 'sm' | 'md' | 'lg'

export interface TabsContextProps {
  activeValue: string | number
  onChange: (value: string | number) => void
  size?: TabsSize
  direction?: 'horizontal' | 'vertical'
  variant?: 'underline' | 'outline' | 'enclosed' | 'fill'
  tabsId: string
}

export interface TabsProps extends CommonProps {
  value?: string | number
  onChange?: (value: string | number) => void
  size?: TabsSize
  direction?: 'horizontal' | 'vertical'
  variant?: 'underline' | 'outline' | 'enclosed' | 'fill'
  children?: ReactNode
}

export interface TabsListProps extends CommonProps {
  children?: ReactNode
  direction?: 'horizontal' | 'vertical'
}

export interface TabProps extends CommonProps {
  icon?: ReactNode
  value: string
  children: ReactNode
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export interface TabContentsProps extends CommonProps {
  value: string | number
  renderMode?: 'singleRender' | 'multiRender'
  children?: ReactNode
}
