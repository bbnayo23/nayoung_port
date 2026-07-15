import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Calendar.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

const meta = {
  title: 'StyleGuide/Calendar',
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
        title="Calendar"
        subtitle="react-day-picker 기반의 날짜 선택 컴포넌트"
        importCode={`import { Calendar } from '@port/design-system'`}
      >
        {renderExample(S.Playground)}
      </DocHero>

      <DocSection
        title="API"
        description={<>날짜 선택 컴포넌트의 주요 props. 단일 날짜 선택, 날짜 범위 제한, 비활성 날짜 등을 지원한다.</>}
      >
        <ApiTable
          rows={[
            { name: 'selected', type: `Date | undefined`, desc: '현재 선택된 날짜' },
            { name: 'onSelect', type: `(date: Date | undefined) => void`, desc: '날짜 선택 시 호출되는 콜백' },
            { name: 'disabledBefore', type: `Date`, desc: '이 날짜 이전은 선택 불가' },
            { name: 'disabledAfter', type: `Date`, desc: '이 날짜 이후는 선택 불가' },
            { name: 'className', type: `string`, desc: <>최상위 <Code>wrapper</Code>에 추가할 className</> },
          ]}
        />
      </DocSection>

      <DocSection title="기본 사용">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection title="선택된 날짜 없음">
        <Example>{renderExample(S.Default)}</Example>
      </DocSection>

      <DocSection title="날짜 범위 제한">
        <Example>{renderExample(S.WithDisabledRange)}</Example>
      </DocSection>

      <DocSection title="사전 선택된 날짜">
        <Example>{renderExample(S.PreselectedDate)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="단일 날짜 선택 캘린더를 올바르게 제어하고 접근 가능하게 쓰기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "selected 와 onSelect 를 함께 넘겨 선택 상태를 부모에서 제어하는 컴포넌트로 사용합니다.",
            "선택 가능한 기간이 정해져 있으면 disabledBefore·disabledAfter 로 범위를 제한합니다.",
            "onSelect 콜백에서 date 가 undefined 로 들어오는 선택 해제 경우도 함께 처리합니다.",
            "초기 표시 월을 원하는 위치로 두려면 selected 에 기준 날짜를 주어 해당 월이 열리도록 합니다.",
          ]}
          donts={[
            "single 모드 전용이므로 여러 날짜나 기간(range) 선택 용도로 쓰지 않습니다.",
            "disabledBefore 를 disabledAfter 보다 뒤 날짜로 지정해 선택 가능한 날이 하나도 없게 만들지 않습니다.",
            "선택 값을 내부 상태로만 두지 말고 selected prop 으로 되돌려 표시가 어긋나지 않게 합니다.",
            "레이아웃 조정이 필요할 때 내부 구조를 덮어쓰기보다 className 으로 wrapper 여백만 조정합니다.",
          ]}
          a11y={[
            "react-day-picker 가 grid role 과 날짜 버튼을 제공해 좌우 방향키로 날짜 이동, Enter·Space 로 선택이 가능합니다.",
            "이전·다음 달 이동 버튼은 아이콘만 노출되므로 aria-label 등 대체 텍스트가 유지되도록 Chevron 커스터마이징 시 주의합니다.",
            "월 캡션이 '2026년 7월' 형식의 한국어 텍스트로 노출되어 스크린리더가 현재 표시 월을 읽을 수 있습니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
