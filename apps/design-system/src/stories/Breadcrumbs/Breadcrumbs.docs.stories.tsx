import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Breadcrumbs.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
