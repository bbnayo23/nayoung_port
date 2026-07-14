import { forwardRef } from 'react'
import cn from 'classnames'
import {
  card,
  head,
  headTitle,
  action,
  list,
  item,
  itemTop,
  titleWrap,
  itemTitle,
  itemMeta,
  runBtn,
  query,
  empty,
} from './QueryListCard.css'
import type { QueryListCardProps } from './QueryListCard.types'

/**
 * QueryListCard — 검색기록·템플릿처럼 저장된 쿼리 목록을 담는 카드.
 *
 * 헤더(아이콘 + 타이틀 + 액션)와 스크롤 목록으로 구성되며, 각 항목은
 * 제목·요약(meta)·쿼리 한 줄로 표시하고 hover 시 실행 어피던스를 드러낸다.
 *
 * @example
 * <QueryListCard
 *   icon={<ClockIcon />}
 *   title="검색기록"
 *   actionLabel="전체"
 *   items={history}
 *   onSelect={applyQuery}
 * />
 */
const QueryListCard = forwardRef<HTMLDivElement, QueryListCardProps>((props, ref) => {
  const {
    icon,
    title,
    actionLabel,
    onAction,
    items,
    onSelect,
    runLabel = '실행',
    emptyText = '항목이 없습니다.',
    className,
  } = props

  return (
    <section ref={ref} className={cn(card, className)}>
      <header className={head}>
        <span className={headTitle}>
          {icon}
          {title}
        </span>
        {actionLabel && (
          <button type="button" className={action} onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </header>

      {items.length === 0 ? (
        <div className={empty}>{emptyText}</div>
      ) : (
        <ul className={list}>
          {items.map((it) => (
            <li key={it.id}>
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
                  <span className={runBtn} aria-hidden="true">
                    ▶ {runLabel}
                  </span>
                </span>
                <span className={query}>{it.query}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
})

QueryListCard.displayName = 'QueryListCard'

export default QueryListCard
