import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from '../../components/Toggle'
import * as S from './Toggle.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
