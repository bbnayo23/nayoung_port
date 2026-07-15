import type { Meta, StoryObj } from '@storybook/react-vite'
import Spinner from '../../components/Spinner'
import * as S from './Spinner.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Spinner',
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
        title="Spinner"
        subtitle="비동기 작업 진행 중임을 나타내는 로딩 인디케이터"
        importCode={`import Spinner from '@port/design-system'`}
      >
        <Spinner />
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            비동기 작업 진행 중임을 나타내는 로딩 인디케이터입니다. <Code>type</Code>으로 외형을 선택하고, <Code>size</Code>로 크기를
            조정합니다. <Code>overlay</Code>를 사용하면 컨텐츠 위를 덮어 로딩 상태를 표시할 수 있습니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'type',
              type: `'default' | 'dots' | 'outline'`,
              default: `'default'`,
              desc: '스피너 유형. default(테두리), dots(점), outline(그라데이션 테두리)',
            },
            {
              name: 'variant',
              type: `'solid' | 'round' | 'circle' | 'outline' | 'flow' | 'bounce' | 'fadeinout'`,
              desc: 'type을 오버라이드하는 세부 variant',
            },
            {
              name: 'size',
              type: `'sm' | 'md' | 'lg'`,
              default: `'md'`,
              desc: '스피너 크기 — sm(24px), md(36px), lg(48px)',
            },
            {
              name: 'color',
              type: 'string',
              desc: 'CSS 색상값으로 스피너 색상을 직접 지정. 미설정 시 primary 색상 사용',
            },
            {
              name: 'overlay',
              type: 'boolean',
              default: 'false',
              desc: 'true이면 부모 영역을 반투명 레이어로 덮어 전체 로딩 상태 표시',
            },
            {
              name: 'className',
              type: 'string',
              desc: '루트 wrapper 요소에 추가할 CSS 클래스',
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="Type"
        description={
          <>
            <Code>variant</Code>를 지정하지 않으면 <Code>type</Code>에 따라 기본 variant가 결정됩니다. 모든 type과 size의 조합을
            매트릭스로 확인합니다.
          </>
        }
      >
        <Example>{renderExample(S.TypeSizeMatrix)}</Example>
      </DocSection>

      <DocSection
        title="Variant × Size 매트릭스"
        description={
          <>
            <Code>variant</Code> prop으로 외형을 직접 지정합니다. 모든 variant와 size의 조합 매트릭스입니다.
          </>
        }
      >
        <Example>{renderExample(S.VariantMatrix)}</Example>
      </DocSection>

      <DocSection
        title="Overlay"
        description={
          <>
            <Code>overlay=true</Code>로 부모 영역을 반투명 레이어로 덮어 전체 로딩 상태를 표시합니다. 부모에{' '}
            <Code>position: relative</Code>가 필요합니다.
          </>
        }
      >
        <Example>{renderExample(S.Overlay)}</Example>
      </DocSection>

      <DocSection
        title="커스텀 색상"
        description={
          <>
            <Code>color</Code> prop으로 스피너 색상을 직접 지정합니다. CSS 색상값을 모두 지원합니다.
          </>
        }
      >
        <Example>{renderExample(S.CustomColor)}</Example>
      </DocSection>

      <DocSection
        title="사용 패턴"
        description="버튼, 카드, 페이지 로딩 등 실제 사용 맥락에서의 Spinner 예시입니다. 인라인 로딩에는 sm 크기가, 카드/섹션 로딩에는 lg 크기와 레이블이 적합합니다."
      >
        <Example>{renderExample(S.InContext)}</Example>
      </DocSection>
    </DocPage>
  ),
}
