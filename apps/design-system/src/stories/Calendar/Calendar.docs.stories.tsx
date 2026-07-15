import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Calendar.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
