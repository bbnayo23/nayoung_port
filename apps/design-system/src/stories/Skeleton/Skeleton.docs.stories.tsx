import type { Meta, StoryObj } from '@storybook/react-vite'
import Skeleton from '../../components/Skeleton'
import * as S from './Skeleton.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

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

      <DocSection title="사용 지침" description="로딩 상태를 자연스럽게 표현하고 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "실제로 로드될 콘텐츠의 크기·모양에 맞춰 width·height·variant 를 지정해 레이아웃 밀림을 막습니다.",
            "프로필 이미지·아바타 자리에는 variant='circle' 을, 카드·이미지 자리에는 variant='rounded' 를 사용합니다.",
            "텍스트 단락은 height 를 작게(예: 13px) 준 rounded 스켈레톤을 여러 줄 쌓고 마지막 줄 width 를 줄여 실제 문단처럼 보이게 합니다.",
            "카드 전체의 로딩 자리에는 개별 Skeleton 을 조합하는 대신 제공되는 CardSkeleton 을 사용합니다.",
          ]}
          donts={[
            "데이터가 준비된 뒤에도 Skeleton 을 남겨 두지 않고 실제 콘텐츠로 즉시 교체합니다.",
            "0.3초 이내로 끝나는 짧은 로딩에까지 스켈레톤을 띄워 화면이 깜빡이게 만들지 않습니다.",
            "width 에 숫자를 넣으면 px 로 고정되므로, 가변 폭 영역에는 숫자 대신 '100%' 같은 문자열 값을 사용합니다.",
            "스피너·프로그레스 바 등 다른 로딩 표시와 한 영역에 중복해서 함께 쓰지 않습니다.",
          ]}
          a11y={[
            "Skeleton 은 role·aria 속성이 없는 순수 장식 요소이므로, 감싸는 로딩 영역에 aria-busy='true' 를 지정해 진행 상태를 알립니다.",
            "펄스 애니메이션이 opacity 만 변화시키므로, prefers-reduced-motion 사용자를 위해 상위에서 모션 감소 처리를 고려합니다.",
            "로딩이 끝나면 실제 콘텐츠를 aria-live 영역이나 포커스 이동으로 알려 스크린리더 사용자가 변화를 인지하도록 합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
