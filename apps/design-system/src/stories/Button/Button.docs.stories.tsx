import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../components/Button'
import * as S from './Button.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

/**
 * Button.docs.stories.tsx — MDX 를 대체하는 "문서 스토리".
 * DocKit 으로 트렌디한 문서 페이지를 조립하고, 예제는 Button.stories 의 스토리를
 * renderExample 로 그대로 재사용해 문서와 예제가 항상 동기화되도록 한다.
 */
const meta = {
  title: 'StyleGuide/Button',
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
        title="Button"
        subtitle="5가지 variant와 3가지 size를 지원하는 기본 버튼입니다. 로딩 스피너, 아이콘 슬롯, fullWidth를 내장합니다."
        importCode={`import { Button } from '@port/design-system'`}
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </DocHero>

      <DocSection title="API" description={<>버튼의 주요 props. 이 외 표준 <Code>button</Code> HTML 속성(onClick, type 등)을 그대로 전달할 수 있습니다.</>}>
        <ApiTable
          rows={[
            { name: 'variant', type: `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'dark'`, default: `'primary'`, desc: '버튼 스타일 변형' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '버튼 크기' },
            { name: 'disabled', type: 'boolean', desc: '비활성 상태' },
            { name: 'loading', type: 'boolean', desc: '로딩 상태 — 스피너 표시, 클릭 비활성' },
            { name: 'fullWidth', type: 'boolean', desc: '컨테이너 너비에 맞춤' },
            { name: 'leftIcon', type: 'ReactNode', desc: '텍스트 왼쪽 아이콘 슬롯' },
            { name: 'rightIcon', type: 'ReactNode', desc: '텍스트 오른쪽 아이콘 슬롯' },
            { name: 'children', type: 'ReactNode', desc: '버튼 레이블' },
          ]}
        />
      </DocSection>

      <DocSection title="Variant" description="5가지 색상 변형으로 액션의 위계를 표현합니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection title="Size" description={<><Code>sm</Code> · <Code>md</Code> · <Code>lg</Code> 세 가지 크기를 제공합니다.</>}>
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection title="State" description="기본 · hover · disabled · loading 상태를 정적으로 비교합니다.">
        <Example>{renderExample(S.States)}</Example>
      </DocSection>

      <DocSection title="With Icons" description={<><Code>leftIcon</Code> · <Code>rightIcon</Code> prop으로 아이콘 슬롯을 채웁니다.</>}>
        <Example>{renderExample(S.WithIcons)}</Example>
      </DocSection>

      <DocSection title="Full Width" description={<><Code>fullWidth</Code> 로 컨테이너 너비에 꽉 채웁니다.</>}>
        <Example>{renderExample(S.FullWidth)}</Example>
      </DocSection>
    </DocPage>
  ),
}
