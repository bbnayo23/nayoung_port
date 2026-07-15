import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './StatsBar.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/StatsBar',
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
        title="StatsBar"
        subtitle="집계 수치를 가로로 나열하는 통계 바"
        importCode={`import { StatsBar, StatItem, StatCount, StatLabel } from '@port/design-system'`}
      >
        {renderExample(S.Playground)}
      </DocHero>

      <DocSection
        title="API — StatsBar"
        description="StatItem 컴포넌트들을 children으로 전달하는 통계 바 루트."
      >
        <ApiTable
          rows={[
            { name: 'children', type: 'ReactNode', desc: 'StatItem 컴포넌트들을 children으로 전달합니다.' },
          ]}
        />
      </DocSection>

      <DocSection title="API — StatItem" description="개별 통계 항목.">
        <ApiTable
          rows={[
            { name: '$isTotal', type: 'boolean', desc: '합계 항목임을 나타냅니다. 시각적으로 강조 표시됩니다.' },
            { name: '$active', type: 'boolean', desc: '선택된 항목 상태. 배경색으로 활성 상태를 표시합니다.' },
            { name: 'popoverContent', type: 'ReactNode', desc: 'hover 시 표시할 Popover 콘텐츠. 미설정 시 Popover 비활성.' },
            { name: 'children', type: 'ReactNode', desc: 'StatCount + StatLabel 조합을 children으로 전달합니다.' },
          ]}
        />
      </DocSection>

      <DocSection title="API — StatCount" description="항목의 수치 표시.">
        <ApiTable
          rows={[
            { name: '$isTotal', type: 'boolean', desc: '합계 항목의 카운트. 일반 항목보다 큰 폰트로 표시됩니다.' },
            { name: 'children', type: 'ReactNode', desc: '표시할 숫자 또는 텍스트.' },
          ]}
        />
      </DocSection>

      <DocSection title="API — StatLabel" description="항목 이름 레이블.">
        <ApiTable
          rows={[
            { name: 'children', type: 'ReactNode', desc: '항목 이름 레이블.' },
          ]}
        />
      </DocSection>

      <DocSection title="기본 사용">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection
        title="$active — 선택 상태"
        description={<><Code>$active</Code> prop으로 현재 선택(필터 적용) 상태를 시각적으로 표시합니다.</>}
      >
        <Example>{renderExample(S.ActiveState)}</Example>
      </DocSection>

      <DocSection
        title="popoverContent — hover 상세 정보"
        description="StatItem을 Popover로 감싸 hover 시 상세 정보를 표시합니다."
      >
        <Example>{renderExample(S.WithPopover)}</Example>
      </DocSection>

      <DocSection
        title="그리드 필터 연동"
        description="StatItem 클릭으로 하단 그리드를 필터링하는 패턴입니다."
      >
        <Example>{renderExample(S.WithGridFilter)}</Example>
      </DocSection>
    </DocPage>
  ),
}
