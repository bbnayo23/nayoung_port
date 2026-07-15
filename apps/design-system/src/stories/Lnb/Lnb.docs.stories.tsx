import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Lnb.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Lnb',
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
        title="Lnb"
        subtitle="XDR 테마용 좌측 사이드 네비게이션 바"
        importCode={`import Lnb from '@port/design-system'
import type { MenuItem, LnbProps } from '@port/design-system'`}
      >
        {renderExample(S.Playground)}
      </DocHero>

      <DocSection
        title="API — Lnb"
        description={
          <>
            XDR 테마에서 사용하는 좌측 사이드 네비게이션 바입니다. 접기/펼치기, 다단계 서브메뉴, hover 확장,
            배지 알림, 그룹 레이블을 지원합니다. <Code>collapsed</Code> 상태는 <Code>localStorage</Code>에 자동으로
            저장됩니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'menuGroup', type: 'MenuItem[]', required: true, desc: '메뉴 항목 배열. MenuItem 타입 참조' },
            { name: 'activeKey', type: 'string', required: true, desc: '현재 활성화된 메뉴 아이템의 key' },
            { name: 'onActiveChange', type: '(key: string) => void', desc: '활성 메뉴 변경 콜백' },
            { name: 'collapsed', type: 'boolean', default: 'true', desc: '사이드바 접힘 상태 (controlled)' },
            { name: 'onCollapse', type: '(collapsed: boolean) => void', desc: '접기/펼치기 상태 변경 콜백' },
            { name: 'header', type: 'ReactNode', desc: '헤더 영역 — 로고, 브랜드명 등' },
            { name: 'footer', type: 'ReactNode', desc: '하단 고정 영역 — 버전 정보, 프로필 등' },
            { name: 'showCollapseButton', type: 'boolean', default: 'true', desc: '헤더 접기/펼치기 버튼 표시 여부' },
            { name: 'position', type: `'left' | 'right'`, default: `'left'`, desc: '사이드바 위치' },
          ]}
        />
      </DocSection>

      <DocSection title="API — MenuItem">
        <ApiTable
          rows={[
            { name: 'key', type: 'string', required: true, desc: '메뉴 아이템의 고유 키' },
            { name: 'label', type: 'string', required: true, desc: '메뉴 텍스트' },
            {
              name: 'type',
              type: `'item' | 'group'`,
              default: `'item'`,
              desc: <><Code>'group'</Code>으로 설정하면 클릭 불가한 섹션 레이블로 렌더됩니다</>,
            },
            { name: 'icon', type: 'ReactNode', desc: '메뉴 아이콘 (@port/icon-library 사용 권장)' },
            { name: 'children', type: 'MenuItem[]', desc: '서브 메뉴 배열 — 재귀 지원' },
            { name: 'badge', type: 'number', desc: '알림 배지 숫자. 99 초과 시 "99+"로 클램핑' },
            { name: 'tooltip', type: 'string', desc: '접힌 상태에서 표시할 툴팁. 미지정 시 label 사용' },
            { name: 'url', type: 'string', desc: '링크 URL' },
            {
              name: 'target',
              type: `'_blank' | '_self' | '_parent' | '_top'`,
              desc: <><Code>'_blank'</Code>이면 외부링크 아이콘이 표시됩니다</>,
            },
            { name: 'showDivider', type: 'boolean', default: 'false', desc: '항목 아래 구분선 표시' },
            { name: 'onClick', type: '(e: MouseEvent) => void', desc: '클릭 핸들러' },
          ]}
        />
      </DocSection>

      <DocSection
        title="기본 패턴"
        description={
          <>
            <Code>collapsed</Code>와 <Code>activeKey</Code>를 상태로 관리합니다.
          </>
        }
      >
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection
        title="배지 알림"
        description={
          <>
            <Code>badge</Code> prop에 숫자를 전달합니다. 99 초과 시 "99+"로 표시되고, 0이면 배지가 숨겨집니다.
          </>
        }
      >
        <Example>{renderExample(S.WithBadge)}</Example>
      </DocSection>

      <DocSection
        title="그룹 레이블"
        description={
          <>
            <Code>type: 'group'</Code> 항목으로 메뉴를 섹션별로 구분합니다. 접힌 상태에서는 레이블이 자동으로
            숨겨집니다.
          </>
        }
      >
        <Example>{renderExample(S.WithGroupLabel)}</Example>
      </DocSection>

      <DocSection
        title="접힘 상태 (Collapsed)"
        description={
          <>
            접힌 상태(56px)로 시작합니다. 헤더 토글 버튼 또는 메뉴 본문 hover로 일시 확장되며, 마우스가 벗어나면
            다시 접힙니다. 접힘 상태는 <Code>igloo-lnb-collapsed</Code> 키로 <Code>localStorage</Code>에 자동
            저장되고, <Code>getStoredCollapsed()</Code> 헬퍼로 초기값을 읽어올 수 있습니다.
          </>
        }
      >
        <Example>{renderExample(S.Collapsed)}</Example>
      </DocSection>

      <DocSection
        title="Footer 슬롯"
        description={
          <>
            <Code>footer</Code> prop으로 버전 정보나 사용자 프로필 등 하단 고정 영역을 구성합니다.
          </>
        }
      >
        <Example>{renderExample(S.WithFooter)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="메뉴 위계와 접힘 동작, 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "collapsed 와 activeKey 를 상위 상태로 두고 onCollapse·onActiveChange 로 동기화해 controlled 로 사용합니다.",
            "메뉴를 섹션으로 나눌 때는 별도 컴포넌트 대신 type: 'group' 항목을 넣어 클릭 불가한 레이블로 구분합니다.",
            "초기 접힘 값은 getStoredCollapsed() 로 읽어 이전 세션의 localStorage(igloo-lnb-collapsed) 상태를 복원합니다.",
            "접힘 상태(56px)에서는 텍스트가 숨겨지므로 각 항목에 icon 을 지정하고, 필요하면 tooltip 으로 의미를 보완합니다.",
            "외부 링크 항목은 url 과 target: '_blank' 를 함께 지정해 외부 링크 아이콘이 표시되도록 합니다.",
          ]}
          donts={[
            "type: 'group' 항목에 onClick·url·children 을 달지 않습니다 — 비상호작용 레이블이라 무시되고 aria-hidden 처리됩니다.",
            "badge 에 100 이상의 값을 정밀 표기용으로 쓰지 않습니다 — 99 초과는 '99+' 로 클램핑됩니다.",
            "collapsed 만 prop 으로 넘기고 onCollapse 를 연결하지 않아 토글 버튼·화살표 키가 상태를 되돌리지 못하게 하지 않습니다.",
            "icon 없이 항목을 구성해 접힘 상태에서 식별이 불가능해지는 메뉴를 만들지 않습니다.",
          ]}
          a11y={[
            "본문은 role='menu', 각 항목은 role='menuitem' 이며 활성 항목에는 aria-current='page' 가 자동 부여됩니다.",
            "본문에 포커스가 있을 때 위/아래 화살표로 항목 이동, 좌/우 화살표로 접기·펼치기, Enter·Space 로 활성화가 기본 지원됩니다.",
            "접힘 상태에서는 tooltip(미지정 시 label)이 title 로 노출되고, 접기·전체화면 컨트롤 버튼에는 aria-label 과 aria-pressed 가 부여됩니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
