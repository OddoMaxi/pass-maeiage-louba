import { createI18n } from 'vue-i18n'
import fr from './fr.json'
import en from './en.json'

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'fr',
  fallbackLocale: 'fr',
  messages: { fr, en },
})
