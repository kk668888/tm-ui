export const STORAGE_KEYS = {
  token: 'tm-admin-token',
  locale: 'tm-admin-locale',
  theme: 'tm-admin-theme',
  tabs: 'tm-admin-tabs',
} as const

export const APP_NAME = 'TM Admin Template'
export const DEFAULT_THEME = 'default'
export const DEFAULT_LOCALE = 'zh-CN'

export const APP_THEMES = [
  { label: 'Default', value: 'default' },
  { label: 'Ocean', value: 'ocean' },
] as const

export type AppTheme = (typeof APP_THEMES)[number]['value']

export const IS_MOCK_ENABLED = (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true'
