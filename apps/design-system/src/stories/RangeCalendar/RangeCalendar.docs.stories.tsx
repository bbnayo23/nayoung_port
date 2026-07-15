import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './RangeCalendar.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
