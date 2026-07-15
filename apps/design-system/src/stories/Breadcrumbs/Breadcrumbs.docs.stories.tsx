import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Breadcrumbs.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

/**
 * Breadcrumbs.docs.stories.tsx — MDX 를 대체하는 "문서 스토리".
 * DocKit 으로 문서 페이지를 조립하고, 예제는 Breadcrumbs.stories 의 스토리를
 * renderExample 로 그대로 재사용해 문서와 예제가 항상 동기화되도록 한다.
 */
const meta = {
  title: 'StyleGuide/Breadcrumbs',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Docs: Story = {
  name: '📖 Docs',
  render: () => (
    <DocPage>
      <DocHero
        eyebrow="StyleGuide · Component"
        title="Breadcrumbs"
        subtitle="현재 페이지의 위치를 계층적으로 표시하는 네비게이션 컴포넌트"
        importCode={`import Breadcrumbs from '@port/design-system'`}
      >
        {renderExample(S.Playground)}
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            브레드크럼의 주요 props. 이 외 표준 <Code>nav</Code> HTML 속성을 그대로 전달할 수 있습니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'separator', type: `string | ReactNode`, default: `'›'`, desc: '항목 사이에 표시할 구분자. 문자열 또는 ReactNode 모두 가능합니다.' },
            { name: 'maxItems', type: 'number', default: '0', desc: '최대 표시 항목 수. 초과 시 중간 항목을 ⋯ 버튼으로 축약합니다. 0이면 전체를 표시합니다.' },
            { name: 'children', type: 'ReactNode', desc: <>브레드크럼 항목. 일반적으로 <Code>a</Code>, <Code>span</Code>, <Code>button</Code>을 사용합니다.</> },
            { name: 'className', type: 'string', desc: <><Code>nav</Code> 요소에 추가할 CSS 클래스</> },
            { name: 'style', type: 'CSSProperties', desc: <><Code>nav</Code> 요소에 적용할 인라인 스타일</> },
          ]}
        />
      </DocSection>

      <DocSection title="Separator" description="다양한 구분자를 비교합니다.">
        <Example>{renderExample(S.Separator)}</Example>
      </DocSection>

      <DocSection title="App Navigation" description="실제 앱 네비게이션 계층 구조 — 2·3·4단계 경로 예시입니다.">
        <Example>{renderExample(S.AppNavigation)}</Example>
      </DocSection>

      <DocSection
        title="Overflow (maxItems)"
        description={
          <>
            <Code>maxItems</Code>로 긴 경로를 ⋯ 버튼으로 축약합니다. 버튼 클릭 시 전체 경로가 펼쳐집니다.
          </>
        }
      >
        <Example>{renderExample(S.Overflow)}</Example>
      </DocSection>

      <DocSection
        title="SPA 라우터 연동 (onClick)"
        description={
          <>
            <Code>href</Code> 대신 <Code>onClick</Code>으로 SPA 라우터와 연동하는 패턴입니다.
          </>
        }
      >
        <Example>{renderExample(S.WithOnClick)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="위치 탐색의 명확성과 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "최상위 경로부터 현재 페이지까지 실제 계층 순서대로 항목을 배치합니다.",
            "이동 가능한 상위 경로는 a 요소로 두고, 마지막 항목(현재 페이지)은 링크 없는 span 으로 두어 자기 자신으로의 이동을 막습니다.",
            "경로가 길어지면 maxItems 로 중간 항목을 ... 버튼으로 축약해 한 줄 레이아웃을 유지합니다.",
            "SPA 라우터와 연동할 때는 href 대신 onClick 을 사용해 전체 새로고침 없이 이동합니다.",
          ]}
          donts={[
            "페이지 계층과 무관한 필터·탭 전환 UI를 브레드크럼으로 대체하지 않습니다.",
            "마지막 항목(현재 페이지)에 링크를 걸어 자기 자신으로 이동하게 만들지 않습니다.",
            "separator 로 방향성이 불분명한 기호를 써서 계층의 진행 방향을 헷갈리게 하지 않습니다.",
            "단계가 한두 개뿐인 얕은 경로에 굳이 maxItems 축약을 적용하지 않습니다.",
          ]}
          a11y={[
            "nav 에 aria-label='breadcrumb' 이 지정되고 마지막 항목에 aria-current='page' 가 자동 부여되어 스크린리더가 현재 위치를 안내합니다.",
            "축약 항목은 button 요소이며 aria-label '숨겨진 항목 모두 보기'를 제공해 키보드·스크린리더로 펼칠 수 있습니다.",
            "separator 는 장식 요소이므로 의미 전달에 의존하지 말고, 아이콘만으로 항목을 표현할 때는 aria-label 로 대체 텍스트를 제공합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
