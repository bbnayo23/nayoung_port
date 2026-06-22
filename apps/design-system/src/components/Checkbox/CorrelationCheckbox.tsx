import * as css from './CorrelationCheckbox.css'

export interface CorrelationCheckboxProps {
  checked: boolean
  indeterminate?: boolean
  onChange?: () => void
}

// CorrelationRule 페이지군에서 사용하는 4-state 체크박스 (checked / unchecked /
// indeterminate / readonly). 클릭 시 stopPropagation. row click 같은 외부 핸들러와
// 분리되어야 하는 grid · tree 셀에 적합. 기존 native `<Checkbox>` 와는 디자인/state
// 시스템이 달라 별도 named export 로 공존.
export const CorrelationCheckbox = ({ checked, indeterminate, onChange }: CorrelationCheckboxProps) => {
  const variant = indeterminate ? 'indeterminate' : checked ? 'checked' : onChange ? 'unchecked' : 'readonly'
  return (
    <div
      className={css.checkbox[variant]}
      onClick={(e) => {
        e.stopPropagation()
        onChange?.()
      }}
    >
      {indeterminate ? (
        <svg width={10} height={2} viewBox="0 0 10 2" fill="none">
          <rect x="0" y="0" width="10" height="2" rx="1" fill="white" />
        </svg>
      ) : checked ? (
        <svg
          width={10}
          height={10}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : null}
    </div>
  )
}
