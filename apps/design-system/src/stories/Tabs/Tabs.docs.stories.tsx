import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Tabs.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Tabs',
  parameters: { layout: 'fullscreen', controls: { disable: true }, docs: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Docs: Story = {
  name: '📖 Docs',
  render: () => (
    <DocPage>
      <DocHero
        eyebrow="StyleGuide · Component"
        title="Tabs"
        subtitle="4가지 variant와 3가지 size를 지원하는 컴파운드 탭 컴포넌트"
        importCode={`import Tabs from '@port/design-system'`}
      >
        {renderExample(S.Playground)}
      </DocHero>

      <DocSection
        title="API — Tabs"
        description={
          <>
            <Code>Tabs.List</Code> · <Code>Tabs.Tab</Code> · <Code>Tabs.Contents</Code> 컴파운드 패턴으로 구성되며,
            키보드 접근성(← → ↑ ↓ Home End)을 내장합니다. <Code>value</Code>와 <Code>onChange</Code>로 활성 탭을
            제어하는 controlled 컴포넌트입니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'value', type: `string | number`, desc: '현재 활성 탭 값 (controlled)' },
            { name: 'onChange', type: `(value: string | number) => void`, desc: '탭 변경 콜백' },
            {
              name: 'variant',
              type: `'underline' | 'outline' | 'enclosed' | 'fill'`,
              default: `'underline'`,
              desc: '탭 스타일 변형',
            },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '탭 크기' },
            {
              name: 'direction',
              type: `'horizontal' | 'vertical'`,
              default: `'horizontal'`,
              desc: '탭 배치 방향',
            },
          ]}
        />
      </DocSection>

      <DocSection title="API — Tabs.Tab">
        <ApiTable
          rows={[
            { name: 'value', type: 'string', desc: '탭 고유 값 — Tabs.value와 매칭됩니다.' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성 탭. 키보드 이동 시 건너뜁니다.' },
            { name: 'icon', type: 'ReactNode', desc: '탭 좌측 아이콘' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Tabs.Contents">
        <ApiTable
          rows={[
            { name: 'value', type: `string | number`, desc: '대응하는 Tabs.Tab의 value와 일치해야 합니다.' },
            {
              name: 'renderMode',
              type: `'multiRender' | 'singleRender'`,
              default: `'multiRender'`,
              desc: 'multiRender: 모두 렌더 후 CSS hidden 제어. singleRender: 활성 탭만 마운트.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Playground" description="variant · size · direction을 조합한 기본 사용 형태.">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection title="Variant" description="underline · outline · enclosed · fill 네 가지 variant를 비교합니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection
        title="콘텐츠 패널"
        description={
          <>
            <Code>Tabs.Contents</Code>를 함께 사용해 탭 패널을 전환합니다.
          </>
        }
      >
        <Example>{renderExample(S.WithContent)}</Example>
      </DocSection>

      <DocSection
        title="비활성 탭"
        description={
          <>
            <Code>disabled</Code> prop으로 특정 탭을 비활성화합니다. 키보드 화살표 이동 시 건너뜁니다.
          </>
        }
      >
        <Example>{renderExample(S.DisabledTab)}</Example>
      </DocSection>

      <DocSection
        title="세로 방향"
        description={
          <>
            <Code>direction="vertical"</Code>로 세로 탭 레이아웃을 구성합니다. 설정 패널에 적합합니다.
          </>
        }
      >
        <Example>{renderExample(S.Vertical)}</Example>
      </DocSection>
    </DocPage>
  ),
}
