import type { StorybookConfig } from '@storybook/react-vite'
import { createBaseConfig } from '@port/vite-config/base'
import { mergeConfig } from 'vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/** 모노레포에서 애드온 절대경로를 해석하기 위한 헬퍼 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
  framework: getAbsolutePath('@storybook/react-vite'),
  viteFinal: (storybookConfig) => mergeConfig(storybookConfig, createBaseConfig()),
}

export default config
