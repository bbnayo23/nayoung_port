import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './CalendarInput.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
