import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './RangeCalendar.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/RangeCalendar',
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
        title="RangeCalendar"
        subtitle="시작·종료 날짜 범위를 선택하는 컴포넌트"
        importCode={`import { RangeCalendar } from '@port/design-system'
import type { RangePreset } from '@port/design-system'`}
      >
        {renderExample(S.AbsoluteMode)}
      </DocHero>

      <DocSection
        title="API — RangeCalendarProps"
        description="시작·종료 날짜 범위를 선택하는 컴포넌트입니다. 절대 모드(날짜 직접 입력·캘린더 선택)와 상대 모드(최근 1시간 등 preset, 직접입력 표현식)를 relativeValue로 전환합니다."
      >
        <ApiTable
          rows={[
            { name: 'start', type: `Date | null`, default: `null`, desc: '선택된 시작 날짜 (controlled)' },
            { name: 'end', type: `Date | null`, default: `null`, desc: '선택된 종료 날짜 (controlled)' },
            { name: 'onStartChange', type: `(date: Date) => void`, desc: '시작 날짜 변경 핸들러' },
            { name: 'onEndChange', type: `(date: Date) => void`, desc: '종료 날짜 변경 핸들러' },
            {
              name: 'relativeValue',
              type: `string | null`,
              default: `null`,
              desc: "null → absolute 모드 / '' → 직접입력 선택 / preset label → 해당 preset 활성 / 기타 문자열 → 커밋된 표현식 (예: '-7d')",
            },
            { name: 'onRelativeValueChange', type: `(value: string | null) => void`, desc: 'relativeValue 변경 핸들러' },
            {
              name: 'presets',
              type: `RangePreset[]`,
              required: true,
              desc: '사이드바에 표시할 preset 목록. preset과 custom 타입을 혼합해 구성합니다.',
            },
            {
              name: 'formatDate',
              type: `(date: Date) => string`,
              required: true,
              desc: 'Date → 텍스트 변환 함수. input 표시와 동기화에 사용합니다.',
            },
            {
              name: 'parseDate',
              type: `(text: string) => Date | null`,
              required: true,
              desc: '텍스트 → Date 파싱 함수. 파싱 실패 시 null 반환.',
            },
            { name: 'placeholder', type: `string`, desc: 'relative 모드 input의 placeholder 텍스트' },
            { name: 'disabled', type: `boolean`, desc: '컴포넌트 전체 비활성화' },
            { name: 'disabledBefore', type: `Date`, desc: '이 날짜 이전은 캘린더에서 선택 불가' },
            { name: 'disabledAfter', type: `Date`, desc: '이 날짜 이후는 캘린더에서 선택 불가' },
            { name: 'className', type: `string`, desc: '루트 wrapper 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="API — RangePreset" description="presets 배열의 각 항목 타입.">
        <ApiTable
          rows={[
            { name: 'label', type: `string`, desc: '사이드바에 표시할 이름. relativeValue의 식별자로도 사용됩니다.' },
            {
              name: 'type',
              type: `'preset' | 'custom'`,
              desc: 'preset: 클릭 시 getValue()로 범위 적용 / custom: 직접입력 모드 진입',
            },
            {
              name: 'getValue',
              type: `(now?: Date) => { start, end }`,
              desc: "type='preset'일 때 필수. 클릭 시 날짜 범위를 반환합니다.",
            },
            {
              name: 'editValue',
              type: `string`,
              desc: "type='preset'일 때 선택. focus 시 input에 prefill할 표현식 (예: '-6h')",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="절대 모드 (relativeValue=null)"
        description="relativeValue를 null로 유지하면 절대 모드입니다. 시작·종료 날짜 input을 직접 타이핑하거나 달력에서 선택합니다."
      >
        <Example>{renderExample(S.AbsoluteMode)}</Example>
      </DocSection>

      <DocSection
        title="상대 모드 (relativeValue 사용)"
        description="relativeValue에 preset label이나 표현식을 전달하면 상대 모드로 전환됩니다. 사이드바에서 preset을 클릭하거나 직접입력 모드에서 -6h, -7d 형식으로 입력합니다."
      >
        <Example>{renderExample(S.RelativeMode)}</Example>
      </DocSection>

      <DocSection
        title="Presets 구성"
        description={
          <>
            <Code>presets</Code>는 <Code>type: 'preset'</Code> 항목과 <Code>type: 'custom'</Code> 항목(직접입력)으로
            구성합니다. custom은 사이드바 하단에 고정됩니다.
          </>
        }
      >
        <Example>{renderExample(S.WithPresets)}</Example>
      </DocSection>

      <DocSection title="Disabled" description={<><Code>disabled</Code>로 컴포넌트 전체를 비활성화합니다.</>}>
        <Example>{renderExample(S.Disabled)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="절대·상대 모드 전환과 controlled 연동을 올바르게 쓰기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "start·end 와 onStartChange·onEndChange 를 함께 넘겨 controlled 컴포넌트로 사용합니다.",
            "formatDate 와 parseDate 를 서로 역함수 관계로 구현해 input 표시와 파싱이 일관되게 합니다.",
            "presets 에는 type: 'preset' 항목과 함께 type: 'custom' 항목을 하나 두어 '-7d' 같은 직접입력을 지원합니다.",
            "선택 가능한 기간 경계가 있으면 disabledBefore·disabledAfter 로 캘린더에서 미리 차단합니다.",
            "상대 모드에서는 placeholder 로 '-6h', '-7d' 같은 입력 형식 예시를 안내합니다.",
          ]}
          donts={[
            "relativeValue 를 로컬 상태로만 두고 onRelativeValueChange 를 무시해 절대·상대 모드 전환이 끊기게 하지 않습니다.",
            "parseDate 에서 파싱 실패 시 예외를 던지지 않고 null 을 반환합니다. 실패하면 내부에서 직전 값으로 되돌립니다.",
            "type: 'custom' preset 에 getValue 를 넣지 않습니다. custom 은 직접입력 진입 전용이라 무시됩니다.",
            "직접입력은 maxLength 6 으로 제한되므로 6자를 넘는 긴 표현식을 기대하지 않습니다.",
            "단일 날짜만 고르는 화면에는 RangeCalendar 대신 Calendar 컴포넌트를 사용합니다.",
          ]}
          a11y={[
            "패널 내 시작·종료 날짜 input 에는 aria-label('시작 날짜'·'종료 날짜')이 연결되어 있고 Enter 키로 입력값을 커밋합니다.",
            "트리거 input 에는 자체 label 이 없으므로, 한 화면에 여러 개를 둘 때는 className 으로 감싼 요소에 설명 텍스트나 label 을 연결해 구분합니다.",
            "disabled 를 지정하면 트리거 input 과 캘린더 아이콘 버튼이 모두 비활성화되어 키보드 포커스에서 제외됩니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
