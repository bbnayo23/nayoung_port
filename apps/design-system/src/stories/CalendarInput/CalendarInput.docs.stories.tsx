import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './CalendarInput.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

const meta = {
  title: 'StyleGuide/CalendarInput',
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
        title="CalendarInput"
        subtitle="텍스트 입력과 달력 팝업을 결합한 날짜 선택 컴포넌트"
        importCode={`import { CalendarInput } from '@port/design-system'`}
      >
        {renderExample(S.WithPreselectedDate)}
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            입력 필드를 클릭하면 달력 팝업이 열리고, 날짜 선택 시 <Code>YYYY-MM-DD HH:mm:ss</Code> 형식으로 값이 채워진다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'value', type: `string`, desc: '입력 필드에 표시되는 텍스트 값 (controlled)' },
            { name: 'selectedDate', type: `Date | null`, desc: '달력에서 하이라이트할 선택된 날짜' },
            { name: 'onDateSelect', type: `(date: Date | undefined) => void`, desc: '달력에서 날짜 클릭 시 호출. 선택 해제 시 undefined' },
            { name: 'onInputChange', type: `(text: string) => void`, desc: '입력 필드 직접 타이핑 시 호출' },
            { name: 'onInputBlur', type: `() => void`, desc: '입력 필드 blur 시 호출' },
            { name: 'disabledBefore', type: `Date`, desc: '이 날짜 이전은 달력에서 선택 불가' },
            { name: 'disabledAfter', type: `Date`, desc: '이 날짜 이후는 달력에서 선택 불가' },
            { name: 'placeholder', type: `string`, default: `'YYYY-MM-DD HH:mm:ss'`, desc: '입력 필드 placeholder' },
            { name: 'disabled', type: `boolean`, desc: '비활성화 — 입력 및 달력 팝업 불가' },
            {
              name: 'className',
              type: `string`,
              desc: '최상위 wrapper에 추가할 className. 너비 조정은 이 prop이나 부모 컨테이너로 제어합니다.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="기본 사용">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection title="초기값 설정">
        <Example>{renderExample(S.WithPreselectedDate)}</Example>
      </DocSection>

      <DocSection title="날짜 범위 제한">
        <Example>{renderExample(S.WithDisabledRange)}</Example>
      </DocSection>

      <DocSection title="Disabled">
        <Example>{renderExample(S.Disabled)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="입력과 달력 팝업을 함께 다루는 날짜 선택 컴포넌트를 일관되게 쓰기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "controlled 컴포넌트이므로 value 와 selectedDate 를 하나의 상태에서 함께 갱신해 입력 텍스트와 달력 하이라이트를 항상 일치시킵니다.",
            "예약 시작·종료처럼 유효 범위가 있는 날짜에는 disabledBefore·disabledAfter 로 선택 가능한 구간을 제한합니다.",
            "onInputChange 로 받은 직접 타이핑 값은 onInputBlur 시점에 파싱·검증해 selectedDate 로 반영합니다.",
            "너비는 className 이나 부모 컨테이너로 제어하고, 값 형식 안내가 필요하면 placeholder 기본값 'YYYY-MM-DD HH:mm:ss' 를 유지합니다.",
          ]}
          donts={[
            "onDateSelect 는 선택 해제 시 undefined 를 전달하므로, 이를 무시하고 이전 날짜를 그대로 두지 않습니다.",
            "달력만으로 값을 다루겠다며 onInputChange 를 연결하지 않아 사용자가 타이핑한 값이 사라지게 두지 않습니다.",
            "disabled 상태에서는 포커스해도 팝업이 열리지 않으므로, 비활성 상태를 임시 안내 문구 표시 용도로 쓰지 않습니다.",
            "단순 날짜 하나가 아니라 시작·종료 두 날짜가 필요한 경우 CalendarInput 하나로 처리하지 않고 두 개를 별도로 둡니다.",
          ]}
          a11y={[
            "input 에는 시각적 라벨이나 aria-label 이 자동 연결되지 않으므로, label 요소나 aria-label 로 필드 용도를 명시합니다.",
            "달력 아이콘은 aria-hidden 처리된 장식 요소라 대체 텍스트가 필요 없으며, 이를 유일한 조작 단서로 삼지 않습니다.",
            "입력에 포커스하면 팝업이 열리고 Enter 로 blur 되어 닫히며 바깥 클릭으로도 닫히므로, 이 키보드·포커스 흐름을 임의로 가로채지 않습니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
