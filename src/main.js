import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { messages } from '@/assets/i18n/messages.js'
import { VueFire } from 'vuefire'
import { firebaseApp } from './firebase'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import { createGtag, configure } from 'vue-gtag'
import 'ant-design-vue/dist/reset.css'

const i18n = createI18n({
    legacy: false,
    locale: 'pl',
    messages: messages
})

const pinia = createPinia()

configure({
  tagId: import.meta.env.VITE_GTAG_ID,
  pageTracker: {
    router
  },
  initMode: 'manual'
})

const app = createApp(App)
app.use(i18n)
app.use(Antd)
app.use(router)
app.use(pinia)
app.use(VueFire, { firebaseApp })
app.mount('#app')
