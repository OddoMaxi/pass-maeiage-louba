import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './i18n'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './assets/tailwind.css'

createApp(App)
  .use(router)
  .use(i18n)
  .use(VueQueryPlugin)
  .mount('#app')
