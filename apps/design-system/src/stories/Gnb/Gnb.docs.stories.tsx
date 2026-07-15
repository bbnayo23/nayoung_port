import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Gnb.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
