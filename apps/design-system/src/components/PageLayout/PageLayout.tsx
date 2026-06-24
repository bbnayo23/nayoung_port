/**
 * PageLayout — 공통 페이지 레이아웃 컴포넌트 모음
 *
 * LogSearch, SecurityVisibility 등 페이지에서 공통으로 사용하는
 * 레이아웃 컴포넌트를 제공합니다.
 *
 * @example
 * import { PageContent, PageHeaderRow, GridContainer, PaginationBar } from '@components/PageLayout';
 */
import { forwardRef } from 'react'
import {
  pageContent,
  pageHeaderRow,
  sectionCard,
  sectionCardFlex,
  gridContainer,
  paginationBar,
  sectionToolbar,
  toolbarLeft,
  toolbarCenter,
  toolbarRight,
  totalCount,
  iconButton,
  ghostIconButton,
  statsBar,
  statItem,
  statItemActive,
  statItemTotal,
  statCountVariant,
  statLabel,
  contentSection,
  topologyContainer,
  inlineBadgeRow,
  chipContainer,
  chipVariant,
} from './PageLayout.css'
import type {
  DivProps,
  SpanProps,
  ButtonProps,
  SectionCardProps,
  StatsBarProps,
  StatItemProps,
  StatCountProps,
  StatLabelProps,
  ChipProps,
} from './PageLayout.types'
import cn from 'classnames'

export const PageContent = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(pageContent, className)} {...rest} />
))
PageContent.displayName = 'PageContent'

export const PageHeaderRow = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(pageHeaderRow, className)} {...rest} />
))
PageHeaderRow.displayName = 'PageHeaderRow'

export const SectionCard = forwardRef<HTMLDivElement, SectionCardProps>(({ className, $flex, ...rest }, ref) => (
  <div ref={ref} className={cn($flex ? sectionCardFlex : sectionCard, className)} {...rest} />
))
SectionCard.displayName = 'SectionCard'

export const GridContainer = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(gridContainer, className)} {...rest} />
))
GridContainer.displayName = 'GridContainer'

export const PaginationBar = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(paginationBar, className)} {...rest} />
))
PaginationBar.displayName = 'PaginationBar'

export const SectionToolbar = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(sectionToolbar, className)} {...rest} />
))
SectionToolbar.displayName = 'SectionToolbar'

export const ToolbarLeft = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(toolbarLeft, className)} {...rest} />
))
ToolbarLeft.displayName = 'ToolbarLeft'

export const ToolbarCenter = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(toolbarCenter, className)} {...rest} />
))
ToolbarCenter.displayName = 'ToolbarCenter'

export const ToolbarRight = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(toolbarRight, className)} {...rest} />
))
ToolbarRight.displayName = 'ToolbarRight'

export const TotalCount = forwardRef<HTMLSpanElement, SpanProps>(({ className, ...rest }, ref) => (
  <span ref={ref} className={cn(totalCount, className)} {...rest} />
))
TotalCount.displayName = 'TotalCount'

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...rest }, ref) => (
  <button ref={ref} className={cn(iconButton, className)} {...rest} />
))
IconButton.displayName = 'IconButton'

export const GhostIconButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...rest }, ref) => (
  <button ref={ref} className={cn(ghostIconButton, className)} {...rest} />
))
GhostIconButton.displayName = 'GhostIconButton'

export const StatsBar = forwardRef<HTMLDivElement, StatsBarProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(statsBar, className)} {...rest} />
))
StatsBar.displayName = 'StatsBar'

export const StatItem = forwardRef<HTMLDivElement, StatItemProps>(({ className, $isTotal, $active, ...rest }, ref) => (
  <div ref={ref} className={cn(statItem, $isTotal && statItemTotal, $active && statItemActive, className)} {...rest} />
))
StatItem.displayName = 'StatItem'

export const StatCount = forwardRef<HTMLSpanElement, StatCountProps>(({ className, $isTotal, ...rest }, ref) => (
  <span ref={ref} className={cn($isTotal ? statCountVariant.total : statCountVariant.normal, className)} {...rest} />
))
StatCount.displayName = 'StatCount'

export const StatLabel = forwardRef<HTMLSpanElement, StatLabelProps>(({ className, ...rest }, ref) => (
  <span ref={ref} className={cn(statLabel, 'stat-label-text', className)} {...rest} />
))
StatLabel.displayName = 'StatLabel'

export const ContentSection = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(contentSection, className)} {...rest} />
))
ContentSection.displayName = 'ContentSection'

export const TopologyContainer = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(topologyContainer, className)} {...rest} />
))
TopologyContainer.displayName = 'TopologyContainer'

export const InlineBadgeRow = forwardRef<HTMLSpanElement, SpanProps>(({ className, ...rest }, ref) => (
  <span ref={ref} className={cn(inlineBadgeRow, className)} {...rest} />
))
InlineBadgeRow.displayName = 'InlineBadgeRow'

export const ChipContainer = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(chipContainer, className)} {...rest} />
))
ChipContainer.displayName = 'ChipContainer'

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(({ className, $active, ...rest }, ref) => (
  <button ref={ref} className={cn($active ? chipVariant.active : chipVariant.inactive, className)} {...rest} />
))
Chip.displayName = 'Chip'
