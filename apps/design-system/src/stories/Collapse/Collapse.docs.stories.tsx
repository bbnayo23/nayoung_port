import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapse } from '../../components/Collapse'
import * as S from './Collapse.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Collapse',
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
        title="Collapse"
        subtitle="단일 콘텐츠를 접고 펼치는 컴포넌트"
        importCode={`import { Collapse } from '@port/design-system'`}
      >
        <div style={{ maxWidth: 420 }}>
          <Collapse variant="card" header="Collapse 헤더" defaultOpen>
            펼쳐지는 콘텐츠 영역입니다.
          </Collapse>
        </div>
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            <Code>Collapse</Code>의 주요 props. card · row · more · horizontal 4가지 variant와 uncontrolled /
            controlled 두 가지 제어 방식을 지원합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'variant',
              type: `'card' | 'row' | 'more' | 'horizontal'`,
              default: `'card'`,
              desc: '스타일 변형',
            },
            { name: 'header', type: 'ReactNode', desc: '헤더 영역 (클릭 시 토글). 생략하면 외부 open 제어만 가능' },
            { name: 'defaultOpen', type: 'boolean', default: 'false', desc: '초기 열림 상태 (uncontrolled)' },
            { name: 'open', type: 'boolean', desc: '제어 모드 열림 상태. onOpenChange와 함께 사용' },
            { name: 'onOpenChange', type: '(open: boolean) => void', desc: '열림 상태 변경 콜백' },
            { name: 'children', type: 'ReactNode', desc: '펼쳐지는 콘텐츠 영역' },
          ]}
        />
      </DocSection>

      <DocSection title="Variants" description="card · row · more 세 가지 variant를 비교합니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection title="ShowMore" description='variant="more" — 목록 일부를 먼저 보여주고 클릭 시 나머지를 펼칩니다.'>
        <Example>{renderExample(S.ShowMore)}</Example>
      </DocSection>
    </DocPage>
  ),
}
