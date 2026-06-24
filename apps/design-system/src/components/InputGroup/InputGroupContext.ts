import { createContext, useContext } from 'react'

type UISizeType = 'sm' | 'md' | 'lg'

/**
 * InputGroup Context - size 값을 직접 관리
 */
export const InputGroupContext = createContext<UISizeType>('md')

/**
 * InputGroup 내부 컴포넌트에서 size를 가져오는 hook
 */
const useInputGroupSize = (): UISizeType => {
  return useContext(InputGroupContext)
}

export const useResolvedSize = (propSize?: UISizeType): UISizeType => {
  const contextSize = useInputGroupSize()
  return propSize || contextSize
}
