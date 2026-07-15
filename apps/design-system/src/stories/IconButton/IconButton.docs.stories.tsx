import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './IconButton.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

/**
 * IconButton.docs.stories.tsx — MDX 를 대체하는 "문서 스토리".
 * DocKit 으로 문서 페이지를 조립하고, 예제는 IconButton.stories 의 스토리를
 * renderExample 로 그대로 재사용해 문서와 예제가 항상 동기화되도록 한다.
 */
const meta = {
  title: 'StyleGuide/IconButton',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Docs: Story = {
  name: '📖 Docs',
  render: () => (
    <DocPage>
      <DocHero
        eyebrow="StyleGuide · Component"
        title="IconButton"
        subtitle="아이콘 전용 버튼 컴포넌트"
        importCode={`import IconButton from '@port/design-system'`}
      >
        {renderExample(S.Variants)}
      </DocHero>

      <DocSection
        title="API"
        description={<>아이콘 전용 버튼의 주요 props. 이 외 표준 <Code>button</Code> HTML 속성을 모두 그대로 전달할 수 있으며, <Code>forwardRef</Code> 를 지원합니다.</>}
      >
        <ApiTable
          rows={[
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '버튼 크기' },
            { name: 'variant', type: `'default' | 'ghost' | 'outline' | 'circle'`, default: `'ghost'`, desc: '버튼 스타일 변형' },
            { name: 'icon', type: 'ReactNode', desc: '버튼 내부에 렌더링할 아이콘. children보다 우선합니다.' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성화 상태' },
            { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="변형" description="용도에 따라 ghost, outline, circle, default 중 선택합니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection title="크기" description={<><Code>sm</Code> · <Code>md</Code> · <Code>lg</Code> 세 가지 크기를 제공합니다.</>}>
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection title="상태" description="기본 · disabled 상태를 정적으로 비교합니다.">
        <Example>{renderExample(S.States)}</Example>
      </DocSection>

      <DocSection title="아이콘 예시" description="@port/icon-library 아이콘을 icon prop에 전달하는 기본 패턴입니다.">
        <Example>{renderExample(S.IconSet)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="아이콘만으로 의미를 전달하는 버튼의 접근성과 위계를 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "아이콘을 icon prop 으로 전달하고, 그 뜻을 aria-label 에 한 단어로 요약해 함께 지정합니다.",
            "툴바·카드 헤더 등 공간이 좁아 텍스트 라벨을 둘 수 없는 아이콘 전용 액션에 사용합니다.",
            "보조·아이콘 액션에는 ghost 를, 부유하는 원형 버튼에는 circle 을 기본으로 선택합니다.",
            "삭제 등 파괴적 아이콘 액션에는 danger, 화면의 대표 아이콘 액션에는 primary 를 씁니다.",
            "터치 대상 확보가 필요하면 size 를 lg 로 올려 최소 32px 클릭 영역을 확보합니다.",
          ]}
          donts={[
            "텍스트 라벨이 함께 필요한 액션에는 IconButton 대신 icon 을 붙인 Button 을 사용합니다.",
            "aria-label 을 빈 문자열이나 'button' 같은 무의미한 값으로 채우지 않습니다.",
            "icon 과 children 을 동시에 넘겨 헷갈리게 하지 않습니다(icon 이 우선 렌더링됩니다).",
            "한 영역에 primary IconButton 을 여러 개 두어 시각적 위계를 흐리지 않습니다.",
            "sm 크기를 촘촘히 배치해 인접 아이콘 버튼의 터치 영역이 겹치게 하지 않습니다.",
          ]}
          a11y={[
            "aria-label 은 타입상 필수이므로 아이콘만 있어도 스크린리더가 읽을 대체 텍스트가 보장됩니다.",
            "네이티브 button 으로 렌더링되어 키보드 포커스와 Enter·Space 활성화가 기본 지원됩니다.",
            "base 스타일에서 outline 을 제거하므로 상위 레이아웃에서 focus-visible 링을 반드시 보완합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
