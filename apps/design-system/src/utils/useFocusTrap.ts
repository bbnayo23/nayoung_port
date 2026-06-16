import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * 컨테이너 안에 포커스를 가둔다 (Modal / Drawer 용).
 * - 활성화 시 첫 포커서블 요소로 포커스 이동
 * - Tab / Shift+Tab 순환
 * - Escape 시 onClose 호출
 * - 비활성화 시 직전 포커스 요소로 복귀
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean, onClose?: () => void) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!active) return
    const node = ref.current
    if (!node) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const focusables = () => Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE))

    focusables()[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose?.()
        return
      }
      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [active, onClose])

  return ref
}
