import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

export const progressWrapper = style({
  height: 8,
})

globalStyle(`${progressWrapper}.progress`, {
  width: '100%',
  display: 'flex',
  background: 'transparent',
  position: 'relative',
  overflow: 'hidden',
})

globalStyle(`${progressWrapper}.progress.shadow`, {
  background: vars.color.surfaceHover,
})

globalStyle(`${progressWrapper}.linear-round`, { borderRadius: 999 })

globalStyle(`${progressWrapper} .progress-bar`, {
  height: '100%',
  width: 'var(--progress-width, 0%)',
  transition: 'width var(--progress-duration, 0.4s) var(--progress-easing, ease)',
})

globalStyle(`${progressWrapper} .progress-bar.no-transition`, { transition: 'none' })
globalStyle(`${progressWrapper} .progress-bar.color-success`, { backgroundColor: vars.color.success })
globalStyle(`${progressWrapper} .progress-bar.color-warning`, { backgroundColor: vars.color.warning })
globalStyle(`${progressWrapper} .progress-bar.color-danger`, { backgroundColor: vars.color.error })
globalStyle(`${progressWrapper} .progress-bar.color-info`, { backgroundColor: vars.color.primary })
