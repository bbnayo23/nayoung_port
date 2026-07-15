import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './PageHeader.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/PageHeader',
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
        title="PageHeader"
        subtitle="페이지 최상단에 위치하는 헤더 컴포넌트"
        importCode={`import PageHeader from '@port/design-system'`}
      >
        {renderExample(S.WithBreadcrumbs)}
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            페이지 최상단에 위치하는 헤더 컴포넌트입니다. <Code>title</Code> · <Code>subtitle</Code> · <Code>breadcrumbs</Code> ·{' '}
            <Code>tags</Code> · <Code>actions</Code> 슬롯으로 구성되며, <Code>onBack</Code> 핸들러를 지정하면 뒤로가기 버튼이
            자동으로 렌더됩니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'title', type: 'string', required: true, desc: '페이지 타이틀 — h1 태그로 자동 렌더됩니다.' },
            { name: 'subtitle', type: 'string', desc: '타이틀 옆에 표시되는 보조 텍스트' },
            {
              name: 'breadcrumbs',
              type: 'BreadcrumbItem[]',
              desc: '브레드크럼 경로 배열. 배열 전달 시 Breadcrumbs 컴포넌트로 자동 렌더.',
            },
            { name: 'tags', type: 'ReactNode', desc: '타이틀 행 가운데 슬롯. 상태 칩(ACTIVE · DRAFT · ARCHIVED) 등에 사용.' },
            { name: 'actions', type: 'ReactNode', desc: '타이틀 행 우측 슬롯. 버튼, 드롭다운 등 액션 영역.' },
            { name: 'backButton', type: 'ReactNode', desc: '커스텀 뒤로가기 버튼 슬롯. 지정 시 onBack보다 우선합니다.' },
            { name: 'onBack', type: '() => void', desc: '지정 시 기본 뒤로가기 아이콘 버튼이 자동 렌더됩니다.' },
            { name: 'divider', type: 'boolean', default: 'false', desc: '헤더 하단 구분선 표시 여부' },
            { name: 'className', type: 'string', desc: '루트 header 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="API — BreadcrumbItem">
        <ApiTable
          rows={[
            { name: 'key', type: 'string', required: true, desc: 'React key — 고유한 식별자' },
            { name: 'label', type: 'string', required: true, desc: '표시 텍스트' },
            { name: 'href', type: 'string', desc: '링크 URL. 지정 시 a 태그로 렌더.' },
            { name: 'onClick', type: '() => void', desc: '클릭 핸들러. href 없이 지정 시 button으로 렌더.' },
          ]}
        />
      </DocSection>

      <DocSection title="브레드크럼">
        <Example>{renderExample(S.WithBreadcrumbs)}</Example>
      </DocSection>

      <DocSection title="액션 버튼 슬롯" description="actions prop에 ReactNode를 전달하면 헤더 우측에 렌더됩니다.">
        <Example>{renderExample(S.WithActions)}</Example>
      </DocSection>

      <DocSection title="뒤로가기 버튼" description="onBack 핸들러를 전달하면 좌측에 화살표 아이콘 버튼이 자동 렌더됩니다.">
        <Example>{renderExample(S.WithBackButton)}</Example>
      </DocSection>

      <DocSection title="상태 태그 슬롯" description="tags prop으로 타이틀 옆에 상태 칩을 렌더합니다.">
        <Example>{renderExample(S.WithTags)}</Example>
      </DocSection>
    </DocPage>
  ),
}
