import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import { ExdSearchIcon, ExdCalendarIcon, XdrEyeIcon, XdrEyeSlashIcon, XdrLockIcon } from '@port/icon-library'
import Input from '@dc/components/Input'
import type { InputInterface } from '@dc/components/Input'

const meta = {
  title: 'StyleGuide/Input',
  component: Input,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'error', 'success', 'warning'] satisfies InputInterface['variant'][],
      description: '시각적 상태 변형',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies InputInterface['size'][],
      description: '입력 필드 크기',
      table: { category: 'Appearance' },
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용',
      table: { category: 'Layout' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { category: 'State' },
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용',
      table: { category: 'State' },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: '입력 하단 도움말 텍스트',
      table: { category: 'Content' },
    },
    showClearButton: {
      control: 'boolean',
      description: '클리어 버튼 표시 (suffixIcon 있으면 무시됨)',
      table: { category: 'Feature' },
    },
    prefixIcon: { table: { disable: true } },
    suffixIcon: { table: { disable: true } },
    onClear: { table: { disable: true } },
    inputSize: { table: { disable: true } },
  },
  args: {
    placeholder: '텍스트를 입력하세요',
    variant: 'default',
    size: 'md',
    fullWidth: false,
    disabled: false,
    helperText: '도움말 텍스트입니다',
    showClearButton: true,
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

const Col = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <div style={{ maxWidth: 320 }}>
        <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')} />
      </div>
    )
  },
}

// ── Variants ──────────────────────────────────────────────────────────────────

/** 5가지 variant와 helperText 색상 변화를 확인합니다. */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      {(['default', 'ghost', 'error', 'success', 'warning'] as const).map((v) => (
        <Col key={v}>
          <Label>{`variant="${v}"`}</Label>
          <Input variant={v} placeholder={v} helperText={`${v} 상태의 도움말 텍스트`} />
        </Col>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

/** sm · md · lg 세 가지 크기를 비교합니다. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Col key={s}>
          <Label>{`size="${s}"`}</Label>
          <Input size={s} placeholder={`size="${s}"`} />
        </Col>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── WithPrefixIcon ────────────────────────────────────────────────────────────

/** prefixIcon으로 입력 필드 좌측에 아이콘을 배치합니다. */
export const WithPrefixIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Col>
        <Label>검색</Label>
        <Input prefixIcon={<ExdSearchIcon size={14} />} placeholder="검색어를 입력하세요" />
      </Col>
      <Col>
        <Label>날짜</Label>
        <Input prefixIcon={<ExdCalendarIcon size={14} />} placeholder="날짜를 선택하세요" />
      </Col>
      <Col>
        <Label>잠금</Label>
        <Input prefixIcon={<XdrLockIcon size={14} />} type="password" placeholder="비밀번호" />
      </Col>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── WithSuffixIcon ────────────────────────────────────────────────────────────

/** suffixIcon으로 입력 필드 우측에 아이콘을 배치합니다. suffixIcon은 showClearButton보다 우선합니다. */
export const WithSuffixIcon: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
        <Col>
          <Label>단순 suffix</Label>
          <Input suffixIcon={<ExdSearchIcon size={14} />} placeholder="검색" />
        </Col>
        <Col>
          <Label>비밀번호 표시 토글</Label>
          <Input
            type={visible ? 'text' : 'password'}
            placeholder="비밀번호"
            suffixIcon={
              <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
              >
                {visible ? <XdrEyeSlashIcon size={14} /> : <XdrEyeIcon size={14} />}
              </button>
            }
          />
        </Col>
        <Col>
          <Label>prefix + suffix 조합</Label>
          <Input
            prefixIcon={<ExdSearchIcon size={14} />}
            suffixIcon={<ExdCalendarIcon size={14} />}
            placeholder="조합 예시"
          />
        </Col>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithClearButton ───────────────────────────────────────────────────────────

/** 값을 입력하면 X(리셋) 버튼이 나타나고, 클릭하면 초기화됩니다. */
export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
        <Col>
          <Label>입력 시 리셋 버튼 표시</Label>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            showClearButton={value.length > 0}
            onClear={() => setValue('')}
            placeholder="타이핑하면 X 버튼이 나타납니다"
          />
        </Col>
        <Col>
          <Label>prefix + 리셋 버튼 조합</Label>
          <Input
            prefixIcon={<ExdSearchIcon size={14} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            showClearButton={searchValue.length > 0}
            onClear={() => setSearchValue('')}
            placeholder="검색어 입력 후 X로 초기화"
          />
        </Col>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── HelperText ────────────────────────────────────────────────────────────────

/** helperText는 variant에 따라 색상이 변경됩니다. */
export const HelperText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Col>
        <Label>default</Label>
        <Input placeholder="기본" helperText="기본 도움말 텍스트입니다" />
      </Col>
      <Col>
        <Label>error</Label>
        <Input variant="error" placeholder="오류" helperText="필수 항목을 입력해주세요" />
      </Col>
      <Col>
        <Label>success</Label>
        <Input variant="success" placeholder="성공" helperText="사용 가능한 아이디입니다" />
      </Col>
      <Col>
        <Label>warning</Label>
        <Input variant="warning" placeholder="경고" helperText="8자 이상 입력을 권장합니다" />
      </Col>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── States ────────────────────────────────────────────────────────────────────

/** disabled · readOnly · fullWidth 상태를 확인합니다. */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Col>
        <Label>disabled</Label>
        <Input disabled placeholder="비활성화 상태" />
      </Col>
      <Col>
        <Label>disabled + value</Label>
        <Input disabled value="수정 불가 값" readOnly />
      </Col>
      <Col>
        <Label>readOnly</Label>
        <Input readOnly value="읽기 전용 값" />
      </Col>
      <Col>
        <Label>fullWidth</Label>
        <Input fullWidth placeholder="전체 너비로 확장" />
      </Col>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
