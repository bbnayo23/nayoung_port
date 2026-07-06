import '@testing-library/jest-dom/vitest'
import { setProjectAnnotations } from '@storybook/react-vite'
import preview from '../../.storybook/preview'

// jsdom 에 없는 브라우저 API 폴리필 — popper·react-select·calendar 등이 참조한다.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
window.ResizeObserver ||= ObserverStub as unknown as typeof ResizeObserver
window.IntersectionObserver ||= ObserverStub as unknown as typeof IntersectionObserver
// jsdom 의 scrollIntoView 는 "Not implemented" 를 던지므로 무해한 스텁으로 덮는다.
Element.prototype.scrollIntoView = () => {}

// 스토리북 preview(테마 데코레이터 등)를 composeStories 에 적용한다.
setProjectAnnotations([preview])
