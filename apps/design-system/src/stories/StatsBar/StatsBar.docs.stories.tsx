import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './StatsBar.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

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

      <DocSection title="사용 지침" description="통계 항목의 위계와 필터 상태를 명확히 전달하기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "StatItem 안에는 StatCount 와 StatLabel 을 함께 넣어 수치와 항목명을 한 쌍으로 구성합니다.",
            "합계·전체 항목에는 StatItem 과 StatCount 양쪽에 $isTotal 을 주어 primary 색상으로 위계를 맞춥니다.",
            "필터가 적용된 항목에는 $active 를 주어 하단 인디케이터로 현재 선택 상태를 표시합니다.",
            "항목 폭이 컨테이너를 넘칠 수 있으므로 StatsBar 를 폭이 정해진 영역 안에 두어 가로 스크롤로 대응합니다.",
          ]}
          donts={[
            "한 StatsBar 안에서 $isTotal 을 여러 항목에 지정해 합계 항목의 강조 의미를 흐리지 않습니다.",
            "StatCount 만 넣고 StatLabel 을 생략해 수치가 무엇을 뜻하는지 알 수 없게 두지 않습니다.",
            "$active 를 여러 항목에 동시에 지정해 단일 필터 선택의 의미를 모호하게 만들지 않습니다.",
            "필수 액션을 popoverContent 안에만 두지 않습니다 — hover 로만 열려 접근 경로가 하나로 제한됩니다.",
          ]}
          a11y={[
            "StatItem 은 div 기반이라 키보드 포커스·활성화가 기본 지원되지 않으므로, 클릭 필터로 쓸 때는 role='button' 과 tabIndex 를 부여하고 Enter/Space 핸들러를 연결합니다.",
            "$active 는 하단 인디케이터 색상으로만 선택을 나타내므로, 스크린리더에는 aria-pressed 또는 aria-current 로 선택 상태를 함께 전달합니다.",
            "popoverContent 는 onMouseEnter/Leave 즉 hover 로만 열려 키보드·스크린리더 사용자가 접근하기 어려우므로, 핵심 정보는 화면에 상시 노출하거나 포커스로도 열 수 있게 보완합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
