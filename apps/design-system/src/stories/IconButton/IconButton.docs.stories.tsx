import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './IconButton.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
