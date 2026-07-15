import type { Meta, StoryObj } from '@storybook/react-vite'
import Textarea from '../../components/Textarea'
import * as S from './Textarea.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Textarea',
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
        title="Textarea"
        subtitle="여러 줄 텍스트 입력 컴포넌트"
        importCode={`import Textarea from '@port/design-system'`}
      >
        <Textarea placeholder="텍스트를 입력하세요..." style={{ maxWidth: 400 }} />
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            여러 줄 텍스트 입력 컴포넌트의 주요 props. 이 외 표준 <Code>textarea</Code> 속성 전달 가능.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'resize',
              type: `CSSProperties['resize']`,
              default: `'vertical'`,
              desc: '사용자가 textarea를 리사이즈할 수 있는 방향 — none, both, horizontal, vertical',
            },
            {
              name: 'height',
              type: `number | 'auto'`,
              desc: <>고정 높이(px) 또는 <Code>'auto'</Code>(내용에 따라 자동 조절)</>,
            },
            { name: 'placeholder', type: 'string', desc: '빈 상태에서 표시할 힌트 텍스트' },
            { name: 'disabled', type: 'boolean', desc: '입력 비활성화 상태' },
            { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="resize" description="none · both · horizontal · vertical 네 가지 resize 옵션을 비교합니다.">
        <Example>{renderExample(S.Resize)}</Example>
      </DocSection>

      <DocSection
        title="height"
        description={
          <>
            <Code>height="auto"</Code>(내용에 따라 자동 조절)와 고정 높이를 비교합니다.
          </>
        }
      >
        <Example>{renderExample(S.Height)}</Example>
      </DocSection>

      <DocSection title="상태" description="기본 · 비활성화 · 값 있음 상태를 비교합니다.">
        <Example>{renderExample(S.States)}</Example>
      </DocSection>
    </DocPage>
  ),
}
