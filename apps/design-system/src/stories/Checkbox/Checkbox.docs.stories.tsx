import type { Meta, StoryObj } from '@storybook/react-vite'
import Checkbox from '../../components/Checkbox'
import * as S from './Checkbox.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
