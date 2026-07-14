import { forwardRef, useState, type ReactNode } from 'react'
import cn from 'classnames'
import {
  card,
  head,
  headTitle,
  count,
  action,
  filterRow,
  filterIcon,
  filterInput,
  list,
  row,
  item,
  itemTop,
  titleWrap,
  itemTitle,
  itemMeta,
  rowActions,
  actionBtn,
  query,
  qKeyword,
  qValue,
  empty,
} from './QueryListCard.css'
import type { QueryListCardProps } from './QueryListCard.types'

const KEYWORD = /^(AND|OR|NOT|IN)$/

/** 쿼리 문자열을 키워드(AND/OR/…)·따옴표 값 기준으로 색 구분해 렌더 */
function highlightQuery(q: string): ReactNode[] {
  return q.split(/(\bAND\b|\bOR\b|\bNOT\b|\bIN\b|'[^']*')/g).map((part, i) => {
    if (KEYWORD.test(part)) return <span key={i} className={qKeyword}>{part}</span>
    if (part.length > 1 && part.startsWith("'") && part.endsWith("'"))
      return <span key={i} className={qValue}>{part}</span>
    return <span key={i}>{part}</span>
  })
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

/**
 * QueryListCard — 검색기록·템플릿처럼 저장된 쿼리 목록을 담는 카드.
 *
 * 헤더(아이콘 + 타이틀 + 개수 + 액션), 카드 내 필터 검색, 스크롤 목록으로 구성된다.
 * 각 항목은 제목·요약(meta)·쿼리(문법 하이라이트) 한 줄로 표시하고, 클릭 시 실행,
 * hover 시 복사·삭제(onRemove 제공 시) 액션을 드러낸다.
 *
 * @example
 * <QueryListCard icon={<ClockIcon />} title="검색기록" items={history} onSelect={applyQuery} />
 */
const QueryListCard = forwardRef<HTMLDivElement, QueryListCardProps>((props, ref) => {
  const {
    icon,
    title,
    actionLabel,
    onAction,
    items,
    onSelect,
    onCopy,
    onRemove,
    runLabel = '실행',
    emptyText = '항목이 없습니다.',
    searchable = true,
    className,
  } = props

  const [filter, setFilter] = useState('')
  const f = filter.trim().toLowerCase()
  const filtered = f
    ? items.filter(
        (it) =>
          it.title.toLowerCase().includes(f) ||
          it.query.toLowerCase().includes(f) ||
          (it.meta?.toLowerCase().includes(f) ?? false),
      )
    : items

  const copy = (it: QueryListCardProps['items'][number]) => {
    navigator.clipboard?.writeText(it.query)
    onCopy?.(it)
  }

  return (
    <section ref={ref} className={cn(card, className)}>
      <header className={head}>
        <span className={headTitle}>
          {icon}
          {title}
          <span className={count}>{items.length}</span>
        </span>
        {actionLabel && (
          <button type="button" className={action} onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </header>

      {searchable && items.length > 0 && (
        <div className={filterRow}>
          <span className={filterIcon}>
            <SearchIcon />
          </span>
          <input
            className={filterInput}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="검색어·쿼리로 필터"
            aria-label={`${title} 필터`}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <div className={empty}>{f ? '일치하는 항목이 없습니다.' : emptyText}</div>
      ) : (
        <ul className={list}>
          {filtered.map((it) => (
            <li key={it.id} className={row}>
              <button
                type="button"
                className={item}
                onClick={() => onSelect(it)}
                aria-label={`${it.title} ${runLabel}`}
              >
                <span className={itemTop}>
                  <span className={titleWrap}>
                    <span className={itemTitle}>{it.title}</span>
                    {it.meta && <span className={itemMeta}> · {it.meta}</span>}
                  </span>
                </span>
                <span className={query}>{highlightQuery(it.query)}</span>
              </button>
              <span className={rowActions}>
                <button type="button" className={actionBtn} aria-label="쿼리 복사" title="복사" onClick={() => copy(it)}>
                  <CopyIcon />
                </button>
                {onRemove && (
                  <button type="button" className={actionBtn} aria-label="삭제" title="삭제" onClick={() => onRemove(it)}>
                    <TrashIcon />
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
})

QueryListCard.displayName = 'QueryListCard'

export default QueryListCard
