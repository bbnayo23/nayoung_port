import { useEffect } from 'react'
import type { RefObject } from 'react'

/** 지정한 ref 들의 바깥을 mousedown 하면 handler 를 호출한다 (드롭다운/팝오버 닫기용). */
export function useClickOutside(refs: RefObject<HTMLElement | null>[], handler: () => void) {
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node
      const isOutside = refs.every((ref) => ref.current && !ref.current.contains(target))
      if (isOutside) handler()
    }

    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [refs, handler])
}
