import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/* ── PickerWrapper ── */
export const pickerWrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'stretch',
  userSelect: 'none',
})

/* ── PickerLabel ── */
export const pickerLabel = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  padding: '0 10px',
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
  border: `1px solid ${vars.color.border}`,
  borderRight: 'none',
  borderRadius: `${vars.radius.md} 0 0 ${vars.radius.md}`,
  background: vars.color.background,
})

/* ── PickerTrigger ── */
export const pickerTrigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 6,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: 'transparent',
  color: vars.color.text,
  cursor: 'pointer',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  transition: `border-color ${vars.transition.fast}, background-color ${vars.transition.fast}`,
})

/* has-label modifier: square left corners */
globalStyle(`${pickerTrigger}.has-label`, {
  borderRadius: `0 ${vars.radius.md} ${vars.radius.md} 0`,
})

globalStyle(`${pickerTrigger}.picker-sm`, {
  minWidth: 200,
  height: 28,
  padding: '4px 8px',
  fontSize: vars.font.sizeXs,
})

globalStyle(`${pickerTrigger}.picker-md`, {
  minWidth: 240,
  height: 32,
  padding: '8px 10px',
  fontSize: vars.font.sizeSm,
})

globalStyle(`${pickerTrigger}.picker-lg`, {
  minWidth: 280,
  height: 36,
  padding: '12px 12px',
  fontSize: vars.font.sizeLg,
})

globalStyle(`${pickerTrigger}:hover`, {
  borderColor: vars.color.primary,
})

globalStyle(`${pickerTrigger}.is-open`, {
  borderColor: vars.color.primary,
  background: vars.color.surface,
})

globalStyle(`${pickerTrigger}:disabled`, {
  opacity: 0.4,
  cursor: 'not-allowed',
})

/* ── TriggerText ── */
export const triggerText = style({
  flex: 1,
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

/* ── ChevronIcon ── */
export const chevronIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  color: vars.color.textSecondary,
  transition: `transform ${vars.transition.fast}`,
  transform: 'rotate(0deg)',
})

globalStyle(`${chevronIcon}.is-open`, {
  transform: 'rotate(180deg)',
})

/* ── PanelOverlay ── */
export const panelOverlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 9998,
})

/* ── Panel ── */
export const panel = style({
  position: 'fixed',
  zIndex: 9999,
  display: 'flex',
  background: 'var(--dt-panel-bg)',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.md,
  overflow: 'hidden',
  vars: {
    '--dt-panel-bg': vars.color.surface,
  },
})

/* ── PresetList ── */
export const presetList = style({
  listStyle: 'none',
  margin: 0,
  padding: '4px 0',
  minWidth: 120,
  borderRight: `1px solid ${vars.color.border}`,
  maxHeight: 360,
  overflowY: 'auto',
})

/* ── PresetItem ── */
export const presetItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '7px 14px',
  fontSize: vars.font.sizeXs,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: `background ${vars.transition.fast}`,
  color: vars.color.text,
  fontWeight: 400,
  background: 'transparent',
})

globalStyle(`${presetItem}.is-active`, {
  color: vars.color.primary,
  fontWeight: 600,
  background: vars.color.surface,
})

globalStyle(`${presetItem}:hover`, {
  background: vars.color.surface,
})

/* ── RightContent ── */
export const rightContent = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 16px',
  gap: 12,
})

/* ── DateTimeInputRow ── */
export const dateTimeInputRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

/* ── DateTimeInput ── */
export const dateTimeInput = style({
  flex: 1,
  height: 30,
  padding: '4px 8px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeXs,
  fontFamily: 'inherit',
  color: vars.color.text,
  background: vars.color.background,
  outline: 'none',
  transition: `border-color ${vars.transition.fast}`,
})

globalStyle(`${dateTimeInput}:focus`, {
  borderColor: vars.color.primary,
})

/* ── InputSeparator ── */
export const inputSeparator = style({
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
  flexShrink: 0,
})

/* ── CalendarRow ── */
export const calendarRow = style({
  display: 'flex',
  gap: 12,
})

/* ── CalendarContainer ── */
export const calendarContainer = style({
  width: 220,
})

/* ── CalendarHeader ── */
export const calendarHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '4px 0',
  marginBottom: 4,
})

/* ── CalendarTitle ── */
export const calendarTitle = style({
  fontSize: vars.font.sizeXs,
  fontWeight: 600,
  color: vars.color.text,
})

/* ── CalendarNavBtn ── */
export const calendarNavBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  border: 'none',
  borderRadius: vars.radius.sm,
  background: 'transparent',
  color: vars.color.textSecondary,
  cursor: 'pointer',
  fontSize: vars.font.sizeMd,
})

globalStyle(`${calendarNavBtn}:hover`, {
  background: vars.color.surface,
})

/* ── CalendarGrid ── */
export const calendarGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: 1,
})

/* ── CalendarDayLabel ── */
export const calendarDayLabel = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 24,
  fontSize: 10,
  fontWeight: 600,
  color: vars.color.textSecondary,
})

globalStyle(`${calendarDayLabel}.is-weekend`, {
  color: vars.color.error,
})

/* ── CalendarDay ── */
export const calendarDay = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 28,
  border: 'none',
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeXs,
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}`,
  color: vars.color.text,
  background: 'transparent',
  fontWeight: 400,
})

globalStyle(`${calendarDay}.is-other-month`, {
  color: vars.color.textMuted,
})

globalStyle(`${calendarDay}.is-weekend:not(.is-selected):not(.is-other-month)`, {
  color: vars.color.error,
})

globalStyle(`${calendarDay}.is-today`, {
  background: vars.color.surface,
  fontWeight: 700,
})

globalStyle(`${calendarDay}.is-in-range`, {
  background: vars.color.surfaceHover,
})

globalStyle(`${calendarDay}.is-selected`, {
  color: vars.color.textInverse,
  background: vars.color.primary,
  fontWeight: 700,
})

globalStyle(`${calendarDay}:hover:not(:disabled)`, {
  background: vars.color.surface,
})

globalStyle(`${calendarDay}.is-selected:hover:not(:disabled)`, {
  background: vars.color.primary,
})

/* ── Calendar nav chevron rotation ── */
export const calendarNavChevronLeft = style({
  display: 'inline-flex',
  transform: 'rotate(90deg)',
})

export const calendarNavChevronRight = style({
  display: 'inline-flex',
  transform: 'rotate(-90deg)',
})
