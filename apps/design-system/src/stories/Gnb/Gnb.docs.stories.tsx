import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Gnb.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Gnb',
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
        title="Gnb"
        subtitle="AiR Works 레이아웃 셸 상단 글로벌 내비게이션 바"
        importCode={`import Gnb from '@port/design-system'\nimport type { GnbProps } from '@port/design-system'`}
      />

      <DocSection
        title="개요"
        description={
          <>
            전체 폭 상단 바입니다. 좌측 브랜드(로고 + 타이틀 + 드롭다운)와 우측 액션(AI Assistant · 다운로드 · 알림 · 테마 ·
            언어 · 사용자 · 홈)으로 구성됩니다. Figma <Code>AW · Layout Shell (LNB+GNB · Empty)</Code> 프레임을 재현한
            프리젠테이션 컴포넌트로, 각 액션은 <Code>onClick</Code> 콜백만 노출합니다.
          </>
        }
      />

      <DocSection title="API — 좌측 브랜드">
        <ApiTable
          rows={[
            { name: 'logo', type: 'ReactNode', default: 'AiR Works 로고', desc: '좌측 로고 마크' },
            { name: 'title', type: 'string', default: `'AiR Works'`, desc: '브랜드 타이틀' },
            { name: 'showBrandDropdown', type: 'boolean', default: 'true', desc: '드롭다운 셰브론 표시' },
            { name: 'onBrandClick', type: '() => void', desc: '브랜드 영역 클릭 콜백' },
          ]}
        />
      </DocSection>

      <DocSection title="API — AI Assistant">
        <ApiTable
          rows={[
            { name: 'showAiAssistant', type: 'boolean', default: 'true', desc: 'AI Assistant 버튼 표시' },
            { name: 'aiAssistantLabel', type: 'string', default: `'AI Assistant'`, desc: '버튼 라벨' },
            { name: 'onAiAssistantClick', type: '() => void', desc: '클릭 콜백' },
          ]}
        />
      </DocSection>

      <DocSection title="API — 우측 액션">
        <ApiTable
          rows={[
            { name: 'showDownload', type: 'boolean', default: 'true', desc: '다운로드 버튼' },
            { name: 'onDownloadClick', type: '() => void', desc: '다운로드 클릭' },
            { name: 'showNotification', type: 'boolean', default: 'true', desc: '알림 버튼' },
            { name: 'notiCount', type: 'number', default: '0', desc: '1 이상이면 빨간 점 표시' },
            { name: 'onNotificationClick', type: '() => void', desc: '알림 클릭' },
            { name: 'showTheme', type: 'boolean', default: 'true', desc: '테마 버튼' },
            { name: 'onThemeClick', type: '() => void', desc: '테마 클릭' },
            { name: 'showLanguage', type: 'boolean', default: 'true', desc: '언어 버튼' },
            { name: 'onLanguageClick', type: '() => void', desc: '언어 클릭' },
            { name: 'showUser', type: 'boolean', default: 'true', desc: '사용자 버튼' },
            { name: 'onUserClick', type: '() => void', desc: '사용자 클릭' },
            { name: 'showHome', type: 'boolean', default: 'true', desc: '홈 버튼(강조 박스)' },
            { name: 'onHomeClick', type: '() => void', desc: '홈 클릭' },
          ]}
        />
      </DocSection>

      <DocSection title="이벤트 콜백" description="각 버튼을 클릭하면 대응하는 콜백이 발생합니다(이벤트 로그로 확인).">
        <Example>{renderExample(S.WithCallbacks)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="레이아웃 셸 상단 바로서 액션 노출과 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "showDownload·showNotification 등 show* 불리언으로 필요 없는 액션을 숨겨 화면 맥락에 맞는 액션만 노출합니다.",
            "드롭다운·팝오버 열림 상태는 이 컴포넌트가 관리하지 않으므로 onBrandClick·onUserClick 등 콜백을 받아 소비처에서 직접 제어합니다.",
            "읽지 않은 알림이 있을 때 notiCount 를 1 이상으로 전달해 알림 버튼에 상태 점이 표시되도록 합니다.",
            "브랜드 로고를 바꿀 때 logo prop 에는 마크만 전달하고 브랜드명은 title 로 지정합니다.",
          ]}
          donts={[
            "notiCount 는 빨간 점만 표시하므로 정확한 개수를 전달하는 용도로 쓰지 않고, 개수 노출이 필요하면 별도 배지 텍스트를 함께 제공합니다.",
            "한 화면에 Gnb 를 여러 개 배치해 header 랜드마크가 중복되지 않도록 합니다.",
            "버튼에 내비게이션 로직을 직접 심지 않고 onDownloadClick·onHomeClick 등 콜백으로 소비처에 위임합니다.",
            "showBrandDropdown 을 켜둔 채 onBrandClick 을 연결하지 않아 셰브론이 눌러도 반응하지 않는 상태로 두지 않습니다.",
          ]}
          a11y={[
            "루트가 header 요소라 banner 랜드마크로 노출되므로, 한 화면에 Gnb 를 하나만 두어 랜드마크 중복을 피합니다.",
            "아이콘만 있는 우측 액션 버튼에는 다운로드·알림·테마·언어·사용자·홈 aria-label 이 지정되어 있고, 모두 표준 button 요소라 키보드 포커스와 Enter/Space 활성화가 기본 지원됩니다.",
            "브랜드 버튼은 title 값을 aria-label 로 사용하고 드롭다운 셰브론은 aria-hidden 처리되므로, title 을 의미 있는 브랜드명으로 지정합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
