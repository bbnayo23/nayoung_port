import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Select } from './Select'

const meta = {
  title: 'StyleGuide/Select',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const t = {
  bg: vars.color.background,
  surface: vars.color.surface,
  surfaceHover: vars.color.surfaceMuted,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textDisabled,
  primary: vars.color.brand[600],
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: '48px 32px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
      }}
    >
      {children}
    </div>
  </div>
)

const Section = ({ children, gap = 16 }: { children: ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
)

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
    <span
      style={{ display: 'inline-block', width: 3, height: 16, background: t.primary, borderRadius: 2, flexShrink: 0 }}
    />
    <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: 0.2 }}>{children}</h2>
  </div>
)

const DocCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: t.radius,
      padding: '20px 24px',
      ...style,
    }}
  >
    {children}
  </div>
)

const CodeBlock = ({ children }: { children: string }) => (
  <pre
    style={{
      margin: 0,
      padding: '14px 18px',
      background: '#1e2228',
      color: '#abb2bf',
      borderRadius: t.radiusSm,
      fontSize: 12,
      fontFamily: "'Fira Code','Consolas',monospace",
      lineHeight: 1.7,
      overflowX: 'auto',
      whiteSpace: 'pre',
    }}
  >
    <code>{children}</code>
  </pre>
)

const InlineCode = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 12,
      background: t.surfaceHover,
      border: `1px solid ${t.border}`,
      borderRadius: 3,
      padding: '1px 5px',
      color: t.text,
    }}
  >
    {children}
  </code>
)

const TypeBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: 'rgba(113,135,255,0.08)',
      color: '#5a6ee0',
      borderRadius: 3,
      padding: '2px 6px',
      wordBreak: 'break-word' as const,
    }}
  >
    {children}
  </code>
)

const DefaultBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: t.surfaceHover,
      color: t.textSecondary,
      borderRadius: 3,
      padding: '2px 6px',
    }}
  >
    {children}
  </code>
)

type PropRow = { name: string; type: string; defaultVal?: string; desc: string }
const PropsTable = ({ rows }: { rows: PropRow[] }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
    <thead>
      <tr style={{ background: t.surfaceHover }}>
        {['Prop', 'Type', 'Default', '설명'].map((h) => (
          <th
            key={h}
            style={{
              padding: '8px 12px',
              textAlign: 'left',
              fontWeight: 600,
              fontSize: 12,
              color: t.textSecondary,
              borderBottom: `1px solid ${t.border}`,
              letterSpacing: 0.3,
            }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.name} style={{ borderBottom: `1px solid ${t.border}` }}>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            <InlineCode>{row.name}</InlineCode>
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            <TypeBadge>{row.type}</TypeBadge>
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            {row.defaultVal ? (
              <DefaultBadge>{row.defaultVal}</DefaultBadge>
            ) : (
              <span style={{ color: t.textMuted }}>—</span>
            )}
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top', color: t.textSecondary, lineHeight: 1.6 }}>
            {row.desc}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

const fruitOptions = (
  <>
    <Select.Option value="apple">사과</Select.Option>
    <Select.Option value="banana">바나나</Select.Option>
    <Select.Option value="cherry">체리</Select.Option>
    <Select.Option value="grape">포도</Select.Option>
    <Select.Option value="melon">멜론</Select.Option>
  </>
)

const DocumentationView = () => {
  const [controlled, setControlled] = useState('cherry')
  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Select</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          React Context 기반의 커스텀(비네이티브) 셀렉트 컴파운드 컴포넌트입니다. Select.Trigger ·
          Select.Content · Select.Option 서브컴포넌트를 조합해 사용하며, sm · md · lg 세 가지 크기와
          controlled / uncontrolled 모드를 지원합니다. 키보드 내비게이션(ArrowUp/Down · Home/End · Enter ·
          Escape)과 바깥 클릭 닫기, role=combobox/listbox/option 접근성을 갖춥니다.
        </p>
        <CodeBlock>{`import { Select } from '@nayoung-port/design-system/components/Select'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>기본 사용법</SectionTitle>
        <CodeBlock>{`<Select placeholder="과일을 선택하세요">
  <Select.Trigger />
  <Select.Content>
    <Select.Option value="apple">사과</Select.Option>
    <Select.Option value="banana">바나나</Select.Option>
    <Select.Option value="cherry">체리</Select.Option>
  </Select.Content>
</Select>`}</CodeBlock>
        <DocCard>
          <Select placeholder="과일을 선택하세요">
            <Select.Trigger />
            <Select.Content>{fruitOptions}</Select.Content>
          </Select>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — Select (Root)</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'value',
                type: 'string',
                desc: '제어(controlled) 모드 선택값. 제공 시 내부 상태 대신 이 값을 사용한다.',
              },
              {
                name: 'defaultValue',
                type: 'string',
                desc: '비제어(uncontrolled) 모드의 초기 선택값.',
              },
              {
                name: 'onValueChange',
                type: '(value: string) => void',
                desc: '값이 선택되어 변경될 때 호출되는 콜백.',
              },
              {
                name: 'placeholder',
                type: 'string',
                desc: '미선택 상태에서 Trigger 에 표시되는 안내 텍스트(muted 색).',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '전체 비활성화. Trigger 가 disabled 되고 열기/선택이 막힌다.',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: 'Trigger 크기(높이 · 폰트 · 패딩). SelectSize 타입.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: 'Select.Trigger 와 Select.Content 조합을 넣는다.',
              },
              {
                name: '...rest',
                type: "Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>",
                desc: '루트 div 에 전달되는 나머지 HTML 속성(className, style, aria-* 등).',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — Select.Trigger</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          role=&quot;combobox&quot; 버튼. 선택된 옵션의 라벨 또는 placeholder 를 표시하고 우측 chevron 이 열림
          시 회전한다. children 을 주면 선택값 라벨 대신 커스텀 표시 노드로 사용한다.
        </p>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                desc: '선택값 라벨 대신 표시할 커스텀 노드(선택적). 없으면 선택 라벨/placeholder 가 표시된다.',
              },
              {
                name: '...rest',
                type: "Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'>",
                desc: 'button 에 전달되는 나머지 속성(className, onClick, onKeyDown 등). 핸들러는 내부 토글/키보드 동작과 병합된다.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — Select.Content</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          role=&quot;listbox&quot; 드롭다운. Trigger 바로 아래에 절대 위치로 띄우며 열려 있을 때만 렌더링된다.
          바깥 mousedown 또는 Escape 로 닫힌다.
        </p>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                desc: 'Select.Option 목록.',
              },
              {
                name: '...rest',
                type: 'HTMLAttributes<HTMLUListElement>',
                desc: 'ul 에 전달되는 나머지 속성(className, onKeyDown 등).',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — Select.Option</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          role=&quot;option&quot;. 마운트 시 children 텍스트를 라벨로 레지스트리에 등록(slot 패턴)해 Trigger 가
          선택값을 표시할 수 있게 한다. 선택 상태면 체크마크를 표시한다.
        </p>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'value',
                type: 'string',
                desc: '이 옵션의 값. 선택 시 onValueChange 로 전달된다. (필수)',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '비활성화 — 선택/하이라이트 대상에서 제외되고 aria-disabled 가 붙는다.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: '옵션 라벨. 문자열이면 그대로 레지스트리 라벨로 등록된다.',
              },
              {
                name: '...rest',
                type: "Omit<LiHTMLAttributes<HTMLLIElement>, 'value'>",
                desc: 'li 에 전달되는 나머지 속성(className, onMouseEnter, onClick 등).',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Size — sm · md · lg</SectionTitle>
        <CodeBlock>{`<Select size="sm">…</Select>
<Select size="md">…</Select>
<Select size="lg">…</Select>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <InlineCode>{`size="${size}"`}</InlineCode>
                <Select size={size} placeholder={`size: ${size}`}>
                  <Select.Trigger />
                  <Select.Content>{fruitOptions}</Select.Content>
                </Select>
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>선택값 표시 (selected)</SectionTitle>
        <CodeBlock>{`<Select defaultValue="banana" placeholder="과일을 선택하세요">
  <Select.Trigger />
  <Select.Content>…</Select.Content>
</Select>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>미선택 (placeholder)</InlineCode>
              <Select placeholder="과일을 선택하세요">
                <Select.Trigger />
                <Select.Content>{fruitOptions}</Select.Content>
              </Select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>defaultValue=&quot;banana&quot;</InlineCode>
              <Select defaultValue="banana" placeholder="과일을 선택하세요">
                <Select.Trigger />
                <Select.Content>{fruitOptions}</Select.Content>
              </Select>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>열림 상태 (open)</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          Trigger 를 클릭하거나 포커스 후 화살표 키를 누르면 Content 가 열립니다. 열리면 chevron 이 180°
          회전하고, 선택값(또는 첫 옵션)이 하이라이트됩니다. 아래 셀렉트를 직접 열어 보세요. 드롭다운이 카드
          바깥으로 넘치도록 여백을 둡니다.
        </p>
        <DocCard style={{ paddingBottom: 200 }}>
          <Select defaultValue="cherry" placeholder="과일을 선택하세요">
            <Select.Trigger />
            <Select.Content>{fruitOptions}</Select.Content>
          </Select>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>비활성화 (disabled)</SectionTitle>
        <CodeBlock>{`{/* 전체 Select 비활성화 */}
<Select disabled placeholder="비활성화됨">
  <Select.Trigger />
  <Select.Content>…</Select.Content>
</Select>

{/* 개별 Option 비활성화 */}
<Select.Option value="banana" disabled>바나나 (품절)</Select.Option>`}</CodeBlock>
        <DocCard style={{ paddingBottom: 160 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>전체 disabled</InlineCode>
              <Select disabled placeholder="비활성화됨">
                <Select.Trigger />
                <Select.Content>{fruitOptions}</Select.Content>
              </Select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>개별 Option disabled</InlineCode>
              <Select defaultValue="apple" placeholder="과일을 선택하세요">
                <Select.Trigger />
                <Select.Content>
                  <Select.Option value="apple">사과</Select.Option>
                  <Select.Option value="banana" disabled>
                    바나나 (품절)
                  </Select.Option>
                  <Select.Option value="cherry">체리</Select.Option>
                </Select.Content>
              </Select>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>제어 모드 (controlled — value · onValueChange)</SectionTitle>
        <CodeBlock>{`const [value, setValue] = useState('cherry')

<Select value={value} onValueChange={setValue} placeholder="과일을 선택하세요">
  <Select.Trigger />
  <Select.Content>…</Select.Content>
</Select>`}</CodeBlock>
        <DocCard style={{ paddingBottom: 160 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setControlled('apple')}
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: t.radiusSm,
                  border: `1px solid ${t.border}`,
                  background: t.surface,
                  color: t.text,
                  cursor: 'pointer',
                }}
              >
                사과로 설정
              </button>
              <button
                type="button"
                onClick={() => setControlled('grape')}
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: t.radiusSm,
                  border: `1px solid ${t.border}`,
                  background: t.surface,
                  color: t.text,
                  cursor: 'pointer',
                }}
              >
                포도로 설정
              </button>
            </div>
            <Select value={controlled} onValueChange={setControlled} placeholder="과일을 선택하세요">
              <Select.Trigger />
              <Select.Content>{fruitOptions}</Select.Content>
            </Select>
            <p style={{ margin: 0, fontSize: 13, color: t.textSecondary }}>
              현재 값: <InlineCode>{controlled}</InlineCode>
            </p>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>키보드 · 접근성</SectionTitle>
        <DocCard>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.9, color: t.textSecondary }}>
            <li>
              Trigger 는 <InlineCode>role=&quot;combobox&quot;</InlineCode> +{' '}
              <InlineCode>aria-haspopup=&quot;listbox&quot;</InlineCode> +{' '}
              <InlineCode>aria-expanded</InlineCode> + <InlineCode>aria-controls</InlineCode>
            </li>
            <li>
              Content 는 <InlineCode>role=&quot;listbox&quot;</InlineCode>, Option 은{' '}
              <InlineCode>role=&quot;option&quot;</InlineCode> + <InlineCode>aria-selected</InlineCode>
            </li>
            <li>
              <InlineCode>ArrowUp</InlineCode> / <InlineCode>ArrowDown</InlineCode> 하이라이트 이동(끝에서 순환),{' '}
              <InlineCode>Home</InlineCode> / <InlineCode>End</InlineCode> 처음·끝으로 이동
            </li>
            <li>
              <InlineCode>Enter</InlineCode> / <InlineCode>Space</InlineCode> 선택,{' '}
              <InlineCode>Escape</InlineCode> 닫고 Trigger 로 포커스 복귀
            </li>
            <li>바깥 영역 클릭 시 닫히며, Trigger 는 focus-visible 링을 제공한다.</li>
          </ul>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
