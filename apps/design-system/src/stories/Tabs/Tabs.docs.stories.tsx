import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Tabs.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

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

      <DocSection title="사용 지침" description="controlled 상태와 컴파운드 구조, 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "controlled 컴포넌트이므로 value 와 onChange 를 항상 함께 연결해 활성 탭 상태를 직접 관리합니다.",
            "Tabs.Tab 의 value 와 Tabs.Contents 의 value 를 동일하게 맞춰 탭과 패널을 정확히 대응시킵니다.",
            "무거운 콘텐츠나 초기 로딩 비용이 큰 패널은 Tabs.Contents 의 renderMode='singleRender' 로 활성 탭만 마운트합니다.",
            "입력값 등 전환 후에도 상태를 유지해야 하는 패널은 renderMode='multiRender' 로 두어 언마운트를 막습니다.",
            "설정 화면처럼 항목이 많은 세로 목록에는 direction='vertical' 을 사용합니다.",
          ]}
          donts={[
            "onChange 없이 value 만 넘겨 클릭·키보드로 탭이 전환되지 않는 상태로 방치하지 않습니다.",
            "한 Tabs 안에서 variant(underline·outline·enclosed·fill)를 섞어 쓰지 않고 하나로 통일합니다.",
            "사용자가 반드시 접근해야 하는 콘텐츠를 disabled 탭 뒤에 두지 않습니다.",
            "탭 개수가 지나치게 많아질 때는 Tabs 대신 별도 내비게이션이나 Select 로 대체합니다.",
          ]}
          a11y={[
            "role='tablist'·'tab'·'tabpanel' 과 aria-selected·aria-controls·aria-labelledby 가 자동 연결되므로 일반 button 으로 대체하지 않습니다.",
            "← → ↑ ↓ Home End 키 이동과 roving tabIndex(활성 탭만 tabIndex 0)가 내장되어 있고 disabled 탭은 이동 시 자동으로 건너뜁니다.",
            "icon 만 넣은 탭이라도 children 에 텍스트 라벨을 함께 제공해 스크린리더가 탭을 식별하게 합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
