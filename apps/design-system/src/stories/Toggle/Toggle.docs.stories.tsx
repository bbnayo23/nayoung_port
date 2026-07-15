import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from '@dc/components/Toggle'
import * as S from './Toggle.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

/**
 * Toggle.docs.stories.tsx — MDX 를 대체하는 "문서 스토리".
 * DocKit 으로 트렌디한 문서 페이지를 조립하고, 예제는 Toggle.stories 의 스토리를
 * renderExample 로 그대로 재사용해 문서와 예제가 항상 동기화되도록 한다.
 */
const meta = {
  title: 'StyleGuide/Toggle',
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
        title="Toggle"
        subtitle="controlled / uncontrolled 모드를 모두 지원하는 스위치 컴포넌트"
        importCode={`import { Toggle } from '@port/design-system'`}
      >
        <Toggle label="Off" />
        <Toggle label="On" defaultChecked />
      </DocHero>

      <DocSection
        title="API"
        description={<>스위치의 주요 props. <Code>label</Code>과 <Code>innerLabel</Code> 옵션으로 다양한 레이아웃을 구성할 수 있으며 키보드 접근성을 내장합니다.</>}
      >
        <ApiTable
          rows={[
            { name: 'checked', type: 'boolean', desc: 'Controlled 모드 — 외부에서 on/off 상태를 제어합니다.' },
            { name: 'defaultChecked', type: 'boolean', default: 'false', desc: 'Uncontrolled 모드 초기값' },
            { name: 'onChange', type: '(checked: boolean) => void', desc: '상태 변경 콜백' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '트랙 크기 — sm(28×16) · md(40×22) · lg(52×28)' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성화. 클릭과 키보드 조작을 막습니다.' },
            { name: 'label', type: 'ReactNode', desc: '트랙 오른쪽에 표시되는 라벨' },
            { name: 'innerLabel', type: 'boolean', default: 'false', desc: '트랙 내부에 ON/OFF 텍스트를 표시합니다.' },
          ]}
        />
      </DocSection>

      <DocSection title="States" description="Off · On · Disabled Off · Disabled On 상태 비교입니다.">
        <Example>{renderExample(S.States)}</Example>
      </DocSection>

      <DocSection title="Size" description="sm(28×16) · md(40×22) · lg(52×28) 세 가지 크기를 비교합니다.">
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection title="Inner Label" description={<><Code>innerLabel</Code>을 활성화하면 트랙 내부에 ON/OFF 텍스트가 표시됩니다.</>}>
        <Example>{renderExample(S.InnerLabel)}</Example>
      </DocSection>

      <DocSection title="설정 목록 패턴" description="여러 Toggle을 하나의 상태 객체로 제어하는 실제 사용 패턴입니다.">
        <Example>{renderExample(S.SettingsList)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="저장 없이 즉시 반영되는 on/off 설정에 맞게 상태와 라벨을 다루기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "저장 버튼 없이 즉시 적용되는 on/off 설정에 사용하고, 실행형 동작에는 Button 을 씁니다.",
            "여러 항목을 하나의 상태 객체로 묶어 제어할 때는 checked 와 onChange 로 controlled 모드로 다룹니다.",
            "무엇을 켜고 끄는지 알 수 있도록 label 로 항목 이름을 함께 제공합니다.",
            "기본은 md 를 쓰고, 조밀한 리스트나 툴바에는 sm 으로 밀도를 맞춥니다.",
            "상태가 한눈에 들어오지 않는 밀집 화면에서는 innerLabel 로 트랙 안에 ON/OFF 를 노출합니다.",
          ]}
          donts={[
            "checked 만 지정하고 onChange 를 생략해 눌러도 반응하지 않는 토글로 두지 않습니다.",
            "checked 와 defaultChecked 를 함께 지정해 controlled 와 uncontrolled 를 뒤섞지 않습니다.",
            "삭제나 결제처럼 확인이 필요한 파괴적 동작의 트리거로 쓰지 않습니다.",
            "innerLabel 의 ON/OFF 를 항목 라벨 대용으로 삼지 않습니다(상태 표시일 뿐 무엇인지 설명하지 않습니다).",
          ]}
          a11y={[
            "role='switch' 와 aria-checked 가 상태에 맞춰 자동 설정되어 스크린리더가 켜짐/꺼짐을 읽어 줍니다.",
            "표준 button 요소라 Tab 포커스와 Enter·Space 활성화가 별도 처리 없이 기본 지원됩니다.",
            "label 은 트랙 옆 텍스트로만 표시되고 aria 로 연결되지 않으므로, 스크린리더에서 항목 이름이 필요하면 설명 텍스트를 토글과 같은 문맥에 배치합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
