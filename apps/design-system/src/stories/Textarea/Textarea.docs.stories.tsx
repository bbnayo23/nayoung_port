import type { Meta, StoryObj } from '@storybook/react-vite'
import Textarea from '@dc/components/Textarea'
import * as S from './Textarea.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

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

      <DocSection title="사용 지침" description="여러 줄 입력의 크기 조절과 상태 표현, 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "사용자가 길이를 가늠하기 어려운 입력에는 resize=\"vertical\" 로 세로 확장을 허용합니다.",
            "예상 입력량에 맞춰 height 로 초기 높이를 지정하고, 분량이 유동적이면 height=\"auto\" 를 사용합니다.",
            "유효성 결과는 textarea-error·textarea-success 클래스로 테두리 색을 바꿔 시각적으로 알립니다.",
            "필수 입력에는 textarea-required 클래스로 왼쪽 강조선을 표시해 필수 여부를 드러냅니다.",
          ]}
          donts={[
            "레이아웃이 깨지기 쉬운 좁은 영역에서 resize=\"both\"·\"horizontal\" 로 가로 확장을 허용하지 않습니다.",
            "한 줄 입력이 목적이라면 Textarea 대신 Input 계열 컴포넌트를 사용합니다.",
            "disabled 와 read-only 를 혼동해 쓰지 않습니다. 값을 보여주되 수정만 막을 때는 readOnly 를 사용합니다.",
            "색상 변화(textarea-error 등)에만 의존해 오류를 전달하지 않고 별도 안내 문구를 함께 제공합니다.",
          ]}
          a11y={[
            "표준 textarea 요소라 별도 label 을 id·htmlFor 로 연결하거나, 보이는 라벨이 없으면 aria-label 을 제공합니다.",
            "오류 상태에서는 aria-invalid 와 aria-describedby 로 에러 메시지를 프로그램적으로 연결합니다.",
            "focus 시 focusRing 토큰 기반 포커스 링이 표시되며, disabled·read-only 상태에서는 포커스 링이 나타나지 않습니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
