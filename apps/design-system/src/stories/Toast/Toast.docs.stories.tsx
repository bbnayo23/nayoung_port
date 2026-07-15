import type { Meta, StoryObj } from '@storybook/react-vite'
import Toast from '../../components/Toast'
import * as S from './Toast.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Toast',
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
        title="Toast"
        subtitle="4가지 variant 를 지원하는 알림 컴포넌트"
        importCode={`import Toast, { Toaster, toast } from '@port/design-system'`}
      >
        <Toast variant="success" title="저장 완료" message="변경사항이 저장되었습니다." duration={0} />
      </DocHero>

      <DocSection
        title="API — Toast"
        description={
          <>
            <Code>Toast</Code> 는 단독 렌더 또는 <Code>Toaster</Code> + <Code>toast()</Code> 조합으로 스태킹 알림을 구현할 수 있는
            알림 컴포넌트입니다. <Code>success</Code> · <Code>error</Code> · <Code>info</Code> · <Code>warning</Code> 네 가지
            variant 가 아이콘과 프로그레스바 색상을 결정합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'variant',
              type: `'success' | 'error' | 'info' | 'warning'`,
              default: `'success'`,
              desc: '아이콘과 프로그레스바 색상을 결정합니다.',
            },
            { name: 'title', type: 'string', desc: '토스트 제목' },
            { name: 'message', type: 'string', desc: '토스트 본문 메시지' },
            { name: 'duration', type: 'number', default: '3000', desc: '자동 닫힘 시간(ms). 0이면 자동으로 닫히지 않습니다.' },
            { name: 'showCloseButton', type: 'boolean', default: 'true', desc: '우측 닫기(×) 버튼 표시 여부' },
            { name: 'onClose', type: '() => void', desc: '닫기 버튼 클릭 및 duration 만료 시 콜백' },
            { name: 'action', type: 'ReactNode', desc: '우측 액션 버튼 슬롯' },
            { name: 'icon', type: 'ReactNode', desc: '커스텀 아이콘 — 지정 시 variant 기본 아이콘을 대체합니다.' },
            {
              name: 'position',
              type: 'ToastPosition',
              desc: '단독 사용 시 위치 진입 애니메이션 클래스 적용 (Toaster 사용 시 생략)',
            },
            { name: 'isClosing', type: 'boolean', desc: '퇴장 애니메이션 상태 (토스트 매니저 연동 시 사용)' },
          ]}
        />
      </DocSection>

      <DocSection
        title="API — Toaster"
        description={
          <>
            앱 루트에 한 번 배치합니다. sonner 의 <Code>Toaster</Code> props 를 모두 전달할 수 있습니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'position', type: 'ToastPosition', default: `'top-right'`, desc: '스택 위치' },
            { name: '...rest', type: 'SonnerToasterProps', desc: 'sonner Toaster 의 모든 props 전달 가능' },
          ]}
        />
      </DocSection>

      <DocSection
        title="API — toast() helper"
        description={
          <>
            <Code>toast.success(title, opts?)</Code>, <Code>toast.error(title, opts?)</Code>,{' '}
            <Code>toast.info(title, opts?)</Code>, <Code>toast.warning(title, opts?)</Code> 형태로 호출합니다.{' '}
            <Code>opts</Code> 는 <Code>{`{ message?, duration?, action?, icon? }`}</Code> 입니다.
          </>
        }
      />

      <DocSection title="Variant" description="success · error · info · warning 네 가지 variant 를 비교합니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection
        title="액션 버튼 (Snackbar 패턴)"
        description={
          <>
            <Code>duration=0</Code> 으로 자동 닫힘을 비활성화하고 <Code>action</Code> prop 으로 버튼을 추가합니다.
          </>
        }
      >
        <Example>{renderExample(S.WithAction)}</Example>
      </DocSection>

      <DocSection
        title="스태킹 토스트"
        description={
          <>
            앱 루트에 <Code>{`<Toaster />`}</Code> 를 배치하고 <Code>toast()</Code> 헬퍼로 호출합니다. 자동 스태킹·위치·타이머를
            sonner 가 관리합니다.
          </>
        }
      >
        <Example>{renderExample(S.Stacked)}</Example>
      </DocSection>
    </DocPage>
  ),
}
