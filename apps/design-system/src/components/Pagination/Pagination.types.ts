type UISizeType = 'sm' | 'md' | 'lg'

export interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  /** 한 번에 보여줄 페이지 수 (기본값 5) */
  maxDisplay?: number
  /** << >> 첫/마지막 페이지 버튼 표시 여부 (기본값 false) */
  showFirstLast?: boolean
  /** < > 이전/다음 페이지 버튼 표시 여부 (기본값 true) */
  showPrevNext?: boolean
  disabled?: boolean
  size?: UISizeType
  className?: string

  /**
   * 전체 항목 수. 페이지 정보 표시에 사용됩니다.
   */
  totalItems?: number

  /**
   * 페이지당 표시할 항목 수.
   */
  itemsPerPage?: number

  /**
   * 페이지당 항목 수 옵션 목록. (예: [50, 100, 200])
   */
  itemsPerPageOptions?: number[]

  /**
   * 페이지당 항목 수 변경 시 콜백.
   */
  onItemsPerPageChange?: (itemsPerPage: number) => void

  /**
   * 페이지 정보 텍스트 표시 여부.
   * 예: "전체 8페이지 중 1 페이지 (1,000 항목)"
   */
  showPageInfo?: boolean

  /**
   * 페이지 점프 input 표시 여부.
   */
  showPageJump?: boolean

  /**
   * 페이지당 항목 수 선택기 표시 여부.
   */
  showItemsPerPage?: boolean
}
