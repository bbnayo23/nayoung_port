import type { Meta, StoryObj } from '@storybook/react-vite'
import Skeleton from '../../components/Skeleton'
import * as S from './Skeleton.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Skeleton',
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
        title="Skeleton"
        subtitle="데이터 로딩 중 콘텐츠 자리를 채워주는 플레이스홀더"
        importCode={`import Skeleton from '@port/design-system'`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
          <Skeleton variant="rounded" width="50%" height={20} />
          <Skeleton variant="rounded" width="100%" height={13} />
          <Skeleton variant="rounded" width="80%" height={13} />
        </div>
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            데이터 로딩 중 콘텐츠 자리를 채워주는 플레이스홀더입니다. <Code>variant</Code>로 모양을 선택하고{' '}
            <Code>width</Code> · <Code>height</Code>로 크기를 지정합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'variant',
              type: `'rectangular' | 'rounded' | 'circle'`,
              default: `'rectangular'`,
              desc: '스켈레톤 모양 — rectangular(직사각형), rounded(둥근 모서리), circle(원형)',
            },
            {
              name: 'width',
              type: `string | number`,
              desc: "너비. 숫자는 px로 처리, 문자열은 CSS 값 그대로 적용 (예: '100%', '240px')",
            },
            {
              name: 'height',
              type: `string | number`,
              desc: '높이. 미설정 시 variant에 따른 기본값 적용',
            },
            {
              name: 'className',
              type: `string`,
              desc: '루트 요소에 추가할 CSS 클래스',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Variant" description="rectangular · rounded · circle 세 가지 variant 비교">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection title="텍스트 라인" description="텍스트 단락을 모방한 여러 줄 스켈레톤">
        <Example>{renderExample(S.TextLines)}</Example>
      </DocSection>

      <DocSection title="CardSkeleton" description="CardSkeleton 컴포넌트 — Card 로딩 상태 placeholder">
        <Example>{renderExample(S.CardSkeletonStory)}</Example>
      </DocSection>

      <DocSection title="대시보드 플레이스홀더" description="대시보드 KPI 카드 형태의 skeleton">
        <Example>{renderExample(S.DashboardPlaceholder)}</Example>
      </DocSection>
    </DocPage>
  ),
}
