import type { UserConfig } from 'vite'

export interface LibraryConfigOptions {
  entry: string
  name: string
  external?: string[]
}

export function createLibraryConfig(options: LibraryConfigOptions): UserConfig
