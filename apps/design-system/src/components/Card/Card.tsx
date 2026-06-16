import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
} from 'react'
import { cx } from '../../utils/cx'
import * as styles from './Card.css'
import type { CardPadding, CardVariant } from './Card.css'

/**
 * Card 내부 슬롯(Header/Body/Footer)이 공유하는 padding 컨텍스트.
 * 루트에서 정한 padding 토큰을 자식 슬롯이 읽어 동일한 밀도를 적용한다.
 */
const CardContext = createContext<{ padding: CardPadding }>({ padding: 'md' })

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 시각적 스타일 — elevated(그림자) · outlined(보더) · filled(연한 배경) */
  variant?: CardVariant
  /** 내부 슬롯(Header/Body/Footer)에 적용될 기본 패딩 밀도 */
  padding?: CardPadding
}

/**
 * 콘텐츠를 묶는 컨테이너 카드.
 *
 * 슬롯 패턴으로 `Card.Header` · `Card.Body` · `Card.Footer` 를 자식으로 조합한다.
 * 슬롯을 쓰지 않고 children 을 직접 넣어도 동작하며, 이때 padding 은 슬롯에서만
 * 의미를 가지므로 Body 를 사용하는 것을 권장한다.
 *
 * a11y: 의미상 그룹이 필요하면 `role`/`aria-label` 을 직접 지정한다.
 */
const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'elevated', padding = 'md', className, children, ...rest },
  ref,
) {
  return (
    <CardContext.Provider value={{ padding }}>
      <div
        ref={ref}
        className={cx(styles.root, styles.variants[variant], className)}
        {...rest}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
})

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>

/** 카드 상단 영역 — 제목/메타 정보. 아래쪽 구분선을 가진다. */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, children, ...rest },
  ref,
) {
  const { padding } = useContext(CardContext)
  return (
    <div
      ref={ref}
      className={cx(styles.header, styles.paddings[padding], className)}
      {...rest}
    >
      {children}
    </div>
  )
})

export type CardBodyProps = HTMLAttributes<HTMLDivElement>

/** 카드 본문 영역 — 메인 콘텐츠. 남는 공간을 채운다. */
const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, children, ...rest },
  ref,
) {
  const { padding } = useContext(CardContext)
  return (
    <div
      ref={ref}
      className={cx(styles.body, styles.paddings[padding], className)}
      {...rest}
    >
      {children}
    </div>
  )
})

export type CardFooterProps = HTMLAttributes<HTMLDivElement>

/** 카드 하단 영역 — 액션 버튼 등. 위쪽 구분선 + 우측 정렬. */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, children, ...rest },
  ref,
) {
  const { padding } = useContext(CardContext)
  return (
    <div
      ref={ref}
      className={cx(styles.footer, styles.paddings[padding], className)}
      {...rest}
    >
      {children}
    </div>
  )
})

CardRoot.displayName = 'Card'
CardHeader.displayName = 'Card.Header'
CardBody.displayName = 'Card.Body'
CardFooter.displayName = 'Card.Footer'

type CardComponent = typeof CardRoot & {
  Header: typeof CardHeader
  Body: typeof CardBody
  Footer: typeof CardFooter
}

/** 슬롯 서브컴포넌트가 프로퍼티로 부착된 합성 컴포넌트 */
export const Card = CardRoot as CardComponent
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
