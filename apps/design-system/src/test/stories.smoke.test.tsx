import type { ComponentType } from 'react'
import { composeStories } from '@storybook/react-vite'
import { render, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

// 모든 컴포넌트 스토리를 실제로 렌더해 throw 하지 않는지 확인하는 스모크 스위트.
// 스토리가 컴포넌트마다 존재하므로(각 StyleGuide/*), 이 한 파일이 전 컴포넌트를 커버한다.
type StoryModule = Record<string, unknown>
const modules = import.meta.glob<StoryModule>('../stories/**/*.stories.tsx', { eager: true })

afterEach(cleanup)

describe('design-system stories render smoke', () => {
  for (const [path, mod] of Object.entries(modules)) {
    const composed = composeStories(mod as unknown as Parameters<typeof composeStories>[0])
    const comp = path.split('/').slice(-1)[0].replace('.stories.tsx', '')
    const stories = Object.entries(composed) as [string, ComponentType][]
    for (const [storyName, Story] of stories) {
      it(`${comp} › ${storyName}`, () => {
        expect(() => render(<Story />)).not.toThrow()
      })
    }
  }
})
