import { mergeConfig } from 'vite'
import { createBaseConfig } from './base.js'

/**
 * 독립 실행 앱(port, dashboard 등)을 위한 Vite 설정.
 */
export function createAppConfig(config = {}) {
  return mergeConfig(createBaseConfig(), config)
}
