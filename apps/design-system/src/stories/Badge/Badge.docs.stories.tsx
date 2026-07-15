import type { Meta, StoryObj } from '@storybook/react-vite'
import Badge from '../../components/Badge'
import * as S from './Badge.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Badge',
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
        title="Badge"
        subtitle="상태 · 태그 · 라벨을 표현하는 프리미티브 컴포넌트"
        importCode={`import Badge from '@port/design-system'`}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Badge variant="fill" color="blue">
            Badge
          </Badge>
          <Badge variant="outline" color="green">
            Outline
          </Badge>
          <Badge variant="status" color="red">
            Status
          </Badge>
        </div>
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            상태, 태그, 라벨 등을 표현하는 컴포넌트입니다. <Code>type</Code>(형태) · <Code>variant</Code>(색상) ·{' '}
            <Code>size</Code> 조합으로 다양한 스타일을 표현하며, <Code>closable</Code> prop으로 닫기 버튼을 추가할 수
            있습니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'type',
              type: `'dot' | 'dot-outline' | 'status' | 'status-round' | 'status-score' | 'icon' | 'outline' | 'fill' | 'alert' | 'step' | 'circle' | 'tag' | 'detail-tag'`,
              desc: '뱃지 형태.',
            },
            {
              name: 'variant',
              type: `'red' | 'orange' | 'yellow' | 'green' | 'purple' | 'blue' | 'navy' | 'gray' | 'medium-gray' | 'light-blue' | 'pink'`,
              desc: '색상. 토큰에 연결됩니다.',
            },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '크기.' },
            { name: 'children', type: 'ReactNode', desc: '뱃지 내용.' },
            { name: 'closable', type: 'boolean', desc: '닫기 버튼 표시 여부.' },
            { name: 'onRemove', type: '(e: MouseEvent) => void', desc: '닫기 버튼 클릭 콜백.' },
            { name: 'backgroundColor', type: 'string', desc: '인라인 배경색 override.' },
            { name: 'borderColor', type: 'string', desc: '인라인 테두리색 override.' },
            { name: 'color', type: 'string', desc: '인라인 텍스트색 override.' },
            { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스.' },
          ]}
        />
      </DocSection>

      <DocSection title="Fill" description="배경을 채우는 기본 형태. 강조 레이블, 상태 표시에 적합합니다.">
        <Example>{renderExample(S.Fill)}</Example>
      </DocSection>

      <DocSection title="Outline" description="테두리만 있는 형태. 덜 강조된 상태나 보조 레이블에 사용합니다.">
        <Example>{renderExample(S.Outline)}</Example>
      </DocSection>

      <DocSection
        title="Status"
        description={
          <>
            배경+텍스트 상태 색상 조합. <Code>status</Code> 와 <Code>status-round</Code> 두 가지를 제공합니다.
          </>
        }
      >
        <Example>{renderExample(S.Status)}</Example>
      </DocSection>

      <DocSection
        title="Status Score"
        description={
          <>
            숫자 점수를 원형 테두리로 강조합니다. 내부에 <Code>&lt;span className="score"&gt;</Code> 를 사용합니다.
          </>
        }
      >
        <Example>{renderExample(S.StatusScore)}</Example>
      </DocSection>

      <DocSection
        title="Icon"
        description={
          <>
            아이콘 단독 또는 아이콘 + 텍스트 형태. SVG가 <Code>currentColor</Code> 로 자동 채색됩니다.
          </>
        }
      >
        <Example>{renderExample(S.Icon)}</Example>
      </DocSection>

      <DocSection title="Dot" description="텍스트 앞에 컬러 점을 표시합니다. 심각도 레이블에 적합합니다.">
        <Example>{renderExample(S.Dot)}</Example>
      </DocSection>

      <DocSection
        title="Tag"
        description={
          <>
            태그 형태. <Code>tag</Code> 와 <Code>detail-tag</Code> 를 제공하며 <Code>closable</Code> prop과 함께
            사용합니다.
          </>
        }
      >
        <Example>{renderExample(S.Tag)}</Example>
      </DocSection>

      <DocSection
        title="Size"
        description={
          <>
            <Code>sm</Code> · <Code>md</Code> · <Code>lg</Code> 크기를 비교합니다.
          </>
        }
      >
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection
        title="Closable"
        description={
          <>
            <Code>onRemove</Code> prop으로 닫기 버튼이 있는 태그를 시뮬레이션합니다.
          </>
        }
      >
        <Example>{renderExample(S.Closable)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="상태·태그·라벨을 명확하고 접근 가능하게 표현하기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "형태는 variant(dot·fill·outline·status·tag 등)로, 의미 색상은 color 로 역할을 나눠 조합합니다.",
            "닫을 수 있는 태그에는 onRemove 콜백을 연결하고 tag·detail-tag 형태와 함께 사용합니다.",
            "심각도·상태는 dot·status 형태에 텍스트 레이블을 함께 두어 색만으로 판단하지 않게 합니다.",
            "Badge 는 짧은 라벨·수치만 담고, 크기는 주변 텍스트 위계에 맞춰 size(sm·md·lg)로 맞춥니다.",
          ]}
          donts={[
            "backgroundColor·textColor override 로 대비를 떨어뜨리지 않고, 가급적 color 토큰 조합을 유지합니다.",
            "onRemove 없이 closable 만 켜서 눌러도 반응하지 않는 닫기 버튼을 노출하지 않습니다.",
            "긴 문장이나 본문 설명을 children 에 넣지 않습니다.",
            "성공·실패 같은 상태를 color 차이만으로 표현하지 않습니다.",
          ]}
          a11y={[
            "Badge 는 span 으로 렌더되어 기본 role·포커스가 없으므로, 클릭 동작이 필요하면 Button 등 인터랙티브 요소로 대체합니다.",
            "닫기 버튼은 role='button'·tabIndex·aria-label·Enter/Space 처리가 내장되어 키보드로 조작되며, onRemove 로 실제 동작을 제공합니다.",
            "색만으로 의미를 전달하지 않도록 텍스트 레이블을 함께 제공하고, override 색 사용 시 배경 대비를 확인합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
