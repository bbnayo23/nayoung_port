import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Button } from '../Button'
import { Drawer } from './Drawer'
import type { DrawerSide, DrawerSize } from './Drawer'

const meta = {
  title: 'StyleGuide/Drawer',
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

const DocumentationView = () => {
  const [basicOpen, setBasicOpen] = useState(false)
  const [side, setSide] = useState<DrawerSide | null>(null)
  const [size, setSize] = useState<DrawerSize | null>(null)
  const [noOverlayClose, setNoOverlayClose] = useState(false)
  const [composedOpen, setComposedOpen] = useState(false)

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Drawer</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          화면 모서리에 앵커링되어 슬라이드로 등장하는 패널 컴파운드 컴포넌트입니다. Header · Body · Footer 서브컴포넌트를
          합성해 구성하며, open 으로 제어합니다. 좌·우·상·하 4방향(side)과 sm · md · lg 사이즈를 지원하고, role=dialog ·
          포커스 트랩 · Escape 닫기 · body 스크롤 잠금 등 접근성 동작이 내장돼 있습니다.
        </p>
        <CodeBlock>{`import { Drawer } from '@nayoung-port/design-system/components/Drawer'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — Drawer</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'open',
                type: 'boolean',
                desc: '열림 여부 (제어 컴포넌트). false 이면 아무것도 렌더링하지 않는다.',
              },
              {
                name: 'onClose',
                type: '() => void',
                desc: '닫기 요청 콜백 — Escape · 오버레이 클릭 · Header 의 X 버튼에서 호출된다.',
              },
              {
                name: 'side',
                type: "'left' | 'right' | 'top' | 'bottom'",
                defaultVal: "'left'",
                desc: '패널이 붙는 방향. 좌/우는 폭, 상/하는 높이를 size 로 제어한다.',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '좌/우 드로어는 폭(280/360/480px), 상/하 드로어는 높이(200/320/480px)를 결정한다.',
              },
              {
                name: 'closeOnOverlayClick',
                type: 'boolean',
                defaultVal: 'true',
                desc: '오버레이(딤 영역) 클릭으로 닫기 허용 여부.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: 'Drawer.Header / Drawer.Body / Drawer.Footer 슬롯 조합을 권장한다.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — Drawer.Header</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                desc: '타이틀 내용. h2 로 렌더되며 패널의 aria-labelledby 가 이 요소를 참조한다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '헤더 루트에 병합되는 추가 클래스.',
              },
              {
                name: '...rest',
                type: 'HTMLAttributes<HTMLDivElement>',
                desc: '헤더 div 에 전달되는 나머지 HTML 속성. 닫기(X) 버튼은 내장되어 자동 제공된다.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — Drawer.Body</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                desc: '본문 콘텐츠. 스크롤 가능한 패딩 영역이다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '본문 루트에 병합되는 추가 클래스.',
              },
              {
                name: '...rest',
                type: 'HTMLAttributes<HTMLDivElement>',
                desc: '본문 div 에 전달되는 나머지 HTML 속성.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — Drawer.Footer</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                desc: '푸터 콘텐츠. 상단 보더 + 우측 정렬 액션 행으로 렌더된다 (주로 버튼).',
              },
              {
                name: 'className',
                type: 'string',
                desc: '푸터 루트에 병합되는 추가 클래스.',
              },
              {
                name: '...rest',
                type: 'HTMLAttributes<HTMLDivElement>',
                desc: '푸터 div 에 전달되는 나머지 HTML 속성.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Subcomponents — 기본 합성</SectionTitle>
        <CodeBlock>{`const [open, setOpen] = useState(false)

<Drawer open={open} onClose={() => setOpen(false)}>
  <Drawer.Header>필터</Drawer.Header>
  <Drawer.Body>여기에 필터 옵션을 배치합니다.</Drawer.Body>
  <Drawer.Footer>
    <Button variant="outline" onClick={() => setOpen(false)}>초기화</Button>
    <Button onClick={() => setOpen(false)}>적용</Button>
  </Drawer.Footer>
</Drawer>`}</CodeBlock>
        <DocCard>
          <Button onClick={() => setBasicOpen(true)}>드로어 열기</Button>
          <Drawer open={basicOpen} onClose={() => setBasicOpen(false)}>
            <Drawer.Header>필터</Drawer.Header>
            <Drawer.Body>
              <p style={{ margin: 0 }}>여기에 필터 옵션을 배치합니다.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={() => setBasicOpen(false)}>
                초기화
              </Button>
              <Button onClick={() => setBasicOpen(false)}>적용</Button>
            </Drawer.Footer>
          </Drawer>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Side — 방향 (left · right · top · bottom)</SectionTitle>
        <CodeBlock>{`<Drawer open={open} onClose={onClose} side="left" />
<Drawer open={open} onClose={onClose} side="right" />
<Drawer open={open} onClose={onClose} side="top" />
<Drawer open={open} onClose={onClose} side="bottom" />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['left', 'right', 'top', 'bottom'] as const).map((s) => (
              <Button key={s} variant="secondary" onClick={() => setSide(s)}>
                {s}
              </Button>
            ))}
          </div>
          <Drawer open={side !== null} onClose={() => setSide(null)} side={side ?? 'left'}>
            <Drawer.Header>{side} 드로어</Drawer.Header>
            <Drawer.Body>
              <p style={{ margin: 0 }}>&quot;{side}&quot; 방향에서 슬라이드합니다.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setSide(null)}>닫기</Button>
            </Drawer.Footer>
          </Drawer>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Size — sm · md · lg</SectionTitle>
        <CodeBlock>{`<Drawer open={open} onClose={onClose} side="right" size="sm" />
<Drawer open={open} onClose={onClose} side="right" size="md" />
<Drawer open={open} onClose={onClose} side="right" size="lg" />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <Button key={s} variant="secondary" onClick={() => setSize(s)}>
                {s.toUpperCase()} 드로어
              </Button>
            ))}
          </div>
          <Drawer open={size !== null} onClose={() => setSize(null)} side="right" size={size ?? 'md'}>
            <Drawer.Header>{size?.toUpperCase()} 사이즈</Drawer.Header>
            <Drawer.Body>
              <p style={{ margin: 0 }}>좌/우 드로어의 폭은 &quot;{size}&quot; 입니다 (sm 280 · md 360 · lg 480px).</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setSize(null)}>닫기</Button>
            </Drawer.Footer>
          </Drawer>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>closeOnOverlayClick — 오버레이 닫기 비활성화</SectionTitle>
        <CodeBlock>{`<Drawer open={open} onClose={onClose} closeOnOverlayClick={false}>
  ...
</Drawer>`}</CodeBlock>
        <DocCard>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.7 }}>
            <InlineCode>closeOnOverlayClick={'{false}'}</InlineCode> 이면 딤 영역을 클릭해도 닫히지 않습니다. Escape 와
            X 버튼으로만 닫을 수 있어 실수로 닫히면 안 되는 폼에 적합합니다.
          </p>
          <Button onClick={() => setNoOverlayClose(true)}>오버레이 닫기 OFF</Button>
          <Drawer
            open={noOverlayClose}
            onClose={() => setNoOverlayClose(false)}
            side="right"
            closeOnOverlayClick={false}
          >
            <Drawer.Header>오버레이 닫기 비활성</Drawer.Header>
            <Drawer.Body>
              <p style={{ margin: 0 }}>딤 영역을 클릭해도 닫히지 않습니다. Escape 또는 X 버튼을 사용하세요.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setNoOverlayClose(false)}>닫기</Button>
            </Drawer.Footer>
          </Drawer>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>접근성 & 동작</SectionTitle>
        <DocCard>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              fontSize: 13,
              color: t.textSecondary,
              lineHeight: 1.7,
            }}
          >
            <li>
              패널에 <InlineCode>role=&quot;dialog&quot;</InlineCode> +{' '}
              <InlineCode>aria-modal=&quot;true&quot;</InlineCode> 가 부여된다.
            </li>
            <li>
              <InlineCode>aria-labelledby</InlineCode> 가 <InlineCode>Drawer.Header</InlineCode> 타이틀과 연결된다.
            </li>
            <li>열려 있는 동안 포커스를 패널 안에 가두고(focus trap), 닫히면 직전 포커스로 복귀한다.</li>
            <li>
              <InlineCode>Escape</InlineCode> 로 닫히며, 열려 있는 동안 body 스크롤을 잠근다.
            </li>
            <li>Header 의 닫기(X) 버튼은 자동 제공되며 hover · focus-visible 상태 스타일을 가진다.</li>
          </ul>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Composition — 실전 예시</SectionTitle>
        <CodeBlock>{`<Drawer open={open} onClose={onClose} side="right" size="lg">
  <Drawer.Header>알림 설정</Drawer.Header>
  <Drawer.Body>{/* 폼 / 리스트 / 긴 스크롤 콘텐츠 */}</Drawer.Body>
  <Drawer.Footer>
    <Button variant="outline" onClick={onClose}>취소</Button>
    <Button onClick={onClose}>저장</Button>
  </Drawer.Footer>
</Drawer>`}</CodeBlock>
        <DocCard>
          <Button onClick={() => setComposedOpen(true)}>설정 패널 열기</Button>
          <Drawer open={composedOpen} onClose={() => setComposedOpen(false)} side="right" size="lg">
            <Drawer.Header>알림 설정</Drawer.Header>
            <Drawer.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {['이메일 알림', '푸시 알림', '주간 요약 리포트', '보안 경고'].map((label) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: 12,
                      borderBottom: `1px solid ${t.border}`,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: t.text }}>{label}</span>
                    <span style={{ fontSize: 11, color: t.textMuted }}>사용 안 함</span>
                  </div>
                ))}
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={() => setComposedOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setComposedOpen(false)}>저장</Button>
            </Drawer.Footer>
          </Drawer>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
