import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE } from '@admin/config'
import { useAppStore } from '@admin/stores/app'
import { messages } from './messages'

export function createAdminI18n() {
  const i18n = createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: 'en-US',
    messages,
  })

  const originalInstall = i18n.install.bind(i18n)
  i18n.install = (app) => {
    originalInstall(app)
    const appStore = useAppStore()
    i18n.global.locale.value = appStore.locale
  }

  return i18n
}
