import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

/* ── Keyframes ── */
const pulseActive = keyframes({
  '0%': { boxShadow: `0 0 0 0 color-mix(in srgb, ${vars.color.primary} 70%, transparent)` },
  '70%': { boxShadow: '0 0 0 10px transparent' },
  '100%': { boxShadow: '0 0 0 0 transparent' },
})

const pulseError = keyframes({
  '0%': { boxShadow: `0 0 0 0 color-mix(in srgb, ${vars.color.error} 70%, transparent)` },
  '70%': { boxShadow: '0 0 0 10px transparent' },
  '100%': { boxShadow: '0 0 0 0 transparent' },
})

const shimmer = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(100%)' },
})

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

/* ── Stepper ── */
export const styledStepper = style({
  display: 'flex',
  width: '100%',
  position: 'relative',
  gap: 8,
  padding: 8,
})

globalStyle(`${styledStepper}.vertical`, {
  maxWidth: 400,
  flexDirection: 'column',
  alignItems: 'stretch',
  width: 'fit-content',
})

globalStyle(`${styledStepper}.horizontal`, {
  flexDirection: 'row',
  alignItems: 'center',
})

/* ── Step ── */
export const styledStep = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  transition: `all ${vars.transition.fast}`,
})

globalStyle(`${styledStep} .stepper-step-icon`, {
  background: vars.color.surfaceHover,
  border: `1.5px solid ${vars.color.border}`,
  color: vars.color.textSecondary,
})

globalStyle(`${styledStep} .stepper-step-icon:hover`, {
  background: vars.color.surfaceHover,
  borderColor: vars.color.border,
})

globalStyle(`${styledStep}.is-disabled`, {
  opacity: 0.4,
  cursor: 'not-allowed',
})

globalStyle(`${styledStep}.is-disabled:hover`, {
  opacity: 0.4,
  transform: 'none',
})

globalStyle(`${styledStep}.is-active`, {
  cursor: 'pointer',
})

globalStyle(`${styledStep}.is-active:hover`, {
  opacity: 0.8,
  transform: 'translateY(-1px)',
})

globalStyle(`${styledStep}.is-active:focus`, {
  outline: `2px solid ${vars.color.primary}`,
  borderRadius: vars.radius.sm,
})

globalStyle(`${styledStep}.is-active .stepper-step-icon`, {
  background: vars.color.primarySoft,
  border: `1.5px solid ${vars.color.primary}`,
  color: vars.color.primary,
  animation: `${pulseActive} 2s infinite`,
})

globalStyle(`${styledStep}.is-active .stepper-step-icon:hover`, {
  background: vars.color.primarySoft,
  borderColor: vars.color.primary,
})

globalStyle(`${styledStep}.is-error:focus`, {
  outline: `2px solid ${vars.color.error}`,
})

globalStyle(`${styledStep}.is-error .stepper-step-icon`, {
  background: `color-mix(in srgb, ${vars.color.error} 10%, transparent)`,
  border: `1.5px solid ${vars.color.error}`,
  color: vars.color.error,
  animation: `${pulseError} 2s infinite`,
})

globalStyle(`${styledStep}.is-error .stepper-step-icon svg`, {
  color: vars.color.error,
})

globalStyle(`${styledStep}.is-error .stepper-step-icon:hover`, {
  background: `color-mix(in srgb, ${vars.color.error} 10%, transparent)`,
  borderColor: vars.color.error,
})

globalStyle(`${styledStep}.is-completed .stepper-step-icon`, {
  background: vars.color.primary,
  border: `1.5px solid ${vars.color.primary}`,
  color: vars.color.textInverse,
})

globalStyle(`${styledStep}.is-completed .stepper-step-icon:hover`, {
  background: vars.color.primary,
  borderColor: vars.color.primary,
})

globalStyle(`${styledStep}.vertical`, {
  minHeight: 80,
  padding: '12px 0',
  width: '100%',
  flexDirection: 'column',
  flex: 1,
})

globalStyle(`${styledStep}.horizontal`, {
  minWidth: 120,
  padding: 8,
  flexDirection: 'row',
})

/* ── Step Icon ── */
export const styledStepIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  fontSize: vars.font.sizeXs,
  fontWeight: 500,
  lineHeight: 1,
  transition: `all ${vars.transition.fast}`,
  flexShrink: 0,
  width: 28,
  height: 28,
  background: vars.color.surfaceHover,
  border: `1.5px solid ${vars.color.border}`,
  color: vars.color.textSecondary,
})

globalStyle(`${styledStepIcon}:hover`, {
  background: vars.color.surfaceHover,
  borderColor: vars.color.border,
})

globalStyle(`${styledStepIcon}.stepper-step-icon svg`, {
  width: 14,
  height: 14,
})

/* ── Step Content ── */
export const styledStepContent = style({
  display: 'flex',
  flexDirection: 'column',
  transition: `all ${vars.transition.fast}`,
})

globalStyle(`${styledStepContent}.vertical`, {
  marginLeft: 0,
  marginTop: 8,
  textAlign: 'center',
})

globalStyle(`${styledStepContent}.horizontal`, {
  marginLeft: 12,
  marginTop: 0,
  textAlign: 'left',
})

/* ── Step Title ── */
export const styledStepTitle = style({
  fontWeight: 600,
  transition: `color ${vars.transition.fast}`,
  lineHeight: 1.4,
  color: vars.color.textSecondary,
})

globalStyle(`${styledStepTitle}.is-active`, {
  color: vars.color.text,
})

globalStyle(`${styledStepTitle}.is-completed`, {
  color: vars.color.primary,
})

globalStyle(`${styledStepTitle}.is-error`, {
  color: vars.color.error,
})

globalStyle(`${styledStepTitle} .optional-indicator`, {
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  fontWeight: 400,
  marginLeft: 4,
})

/* ── Step Description ── */
export const styledStepDescription = style({
  fontWeight: 400,
  lineHeight: 1.4,
  color: vars.color.textSecondary,
})

globalStyle(`${styledStepDescription}.is-error`, {
  color: vars.color.error,
})

/* ── Step Connector ── */
export const styledStepConnector = style({
  transition: `all ${vars.transition.fast}`,
  position: 'relative',
  background: vars.color.surfaceHover,
})

globalStyle(`${styledStepConnector}.vertical`, {
  width: 3,
  height: 32,
  margin: '4px auto',
  alignSelf: 'center',
})

globalStyle(`${styledStepConnector}.horizontal`, {
  height: 3,
  flex: 1,
  margin: '0 8px',
  minWidth: 20,
})

globalStyle(`${styledStepConnector}.is-completed`, {
  background: vars.color.primary,
})

globalStyle(`${styledStepConnector}.is-completed::before`, {
  content: "''",
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: vars.color.primary,
  transition: `all ${vars.transition.normal}`,
})

globalStyle(`${styledStepConnector}.is-completed::after`, {
  content: "''",
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
  animation: `${shimmer} 1.5s infinite`,
})

/* ── Step Controls ── */
export const styledStepControls = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 32,
  gap: 16,
  padding: '16px 0',
})

globalStyle(`${styledStepControls} .stepper-controls-spacer`, {
  flex: 1,
})

/* ── Step Content Panel ── */
export const styledStepContentPanel = style({
  marginTop: 32,
  padding: 24,
  background: vars.color.background,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  transition: `all ${vars.transition.fast}`,
  animation: `${fadeIn} 0.3s ease-in-out`,
})

globalStyle(`${styledStepContentPanel}:hover`, {
  opacity: 0.95,
})
