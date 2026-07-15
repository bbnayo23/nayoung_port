import type { Meta, StoryObj } from '@storybook/react-vite'
import Checkbox from '../../components/Checkbox'
import * as S from './Checkbox.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Checkbox',
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
        title="Checkbox"
        subtitle="checked · indeterminate · disabled 상태와 color variant를 지원하는 체크박스"
        importCode={`import Checkbox from '@port/design-system'`}
      >
        <Checkbox label="Checkbox" checked onChange={() => {}} />
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            체크박스의 주요 props. 이 외 표준 <Code>input</Code> 속성 전달 가능.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'checked', type: 'boolean', default: 'false', desc: '체크 상태' },
            {
              name: 'indeterminate',
              type: 'boolean',
              default: 'false',
              desc: '중간(mixed) 상태 — checked와 독립적으로 동작',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              desc: '비활성화 — opacity 0.5, cursor not-allowed',
            },
            { name: 'label', type: `string | ReactNode`, desc: '체크박스 옆에 표시할 라벨' },
            { name: 'labelDirection', type: `'left' | 'right'`, default: `'right'`, desc: '라벨 위치' },
            { name: 'color', type: `'danger' | 'warning' | 'success' | 'info'`, desc: '체크 색상 variant' },
            { name: 'onChange', type: `(e: ChangeEvent) => void`, desc: '상태 변경 핸들러' },
            { name: 'id', type: 'string', desc: 'label htmlFor 연결용 id' },
          ]}
        />
      </DocSection>

      <DocSection title="Playground" description="Controls 패널에서 모든 props를 실시간으로 조정합니다.">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection title="State" description="checked · indeterminate · disabled 조합 상태 비교.">
        <Example>{renderExample(S.States)}</Example>
      </DocSection>

      <DocSection title="Color" description="color prop으로 상태 색상을 변경합니다.">
        <Example>{renderExample(S.Colors)}</Example>
      </DocSection>

      <DocSection title="LabelDirection" description="labelDirection으로 라벨 위치를 변경합니다.">
        <Example>{renderExample(S.LabelDirection)}</Example>
      </DocSection>

      <DocSection title="인터랙티브 예제 — 전체 동의" description="실제 체크/해제가 동작하는 인터랙티브 예제.">
        <Example>{renderExample(S.Interactive)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="상태 조합과 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "checked 를 상태값과 함께 제어할 때는 onChange 로 변경을 반영해 controlled 로 다룹니다.",
            "여러 하위 항목이 부분 선택된 부모 체크박스에는 indeterminate 를 사용해 mixed 상태를 표현합니다.",
            "label prop 을 넘기거나 id 를 지정해 클릭 가능한 라벨과 input 을 연결합니다.",
            "삭제·경고처럼 의미가 있는 선택에만 color 로 danger·warning 등 상태색을 제한적으로 사용합니다.",
          ]}
          donts={[
            "onChange 없이 checked 만 고정해 토글이 되지 않는 읽기 전용처럼 쓰지 않습니다.",
            "indeterminate 를 checked 의 중간 단계로 오해해 두 값을 동시에 토글하지 않습니다.",
            "단순 강조 목적으로 color 를 남발해 상태색의 의미를 흐리지 않습니다.",
            "disabled 로 조작을 막는 대신 안내가 필요한 경우 별도 설명 텍스트로 이유를 제공합니다.",
          ]}
          a11y={[
            "indeterminate 일 때 aria-checked 가 'mixed' 로 설정되어 스크린리더에 부분 선택이 전달됩니다.",
            "label·id 로 연결된 label 요소 덕분에 라벨 텍스트를 눌러도 포커스와 토글이 동작합니다.",
            "네이티브 input[type=checkbox] 라 Tab 포커스와 Space 키 토글이 기본 지원됩니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
