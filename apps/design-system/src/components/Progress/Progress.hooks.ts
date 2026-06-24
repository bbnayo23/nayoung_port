import { useEffect, useRef } from 'react'

export const useOnComplete = (value: number, onComplete?: () => void, delay = 400) => {
  const prevValue = useRef(value)

  useEffect(() => {
    if (value === 100 && prevValue.current !== 100 && onComplete) {
      const id = setTimeout(onComplete, delay)
      prevValue.current = value
      return () => clearTimeout(id)
    }
    prevValue.current = value
  }, [value, onComplete, delay])
}
