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
import VueGtag from 'vue-gtag'
import VueCookies from 'vue-cookies'
import 'ant-design-vue/dist/reset.css'

const i18n = createI18n({
    legacy: false,
    locale: 'pl',
    messages: messages
})

const pinia = createPinia()

const gtag = {
    bootstrap: false,
    enabled: true,
    config: {
        id: import.meta.env.VITE_GTAG_ID,
        params: {
            anonymize_ip: true
        }
    }
}

const cookies = {
    // expires: '365d'
}

const app = createApp(App)
app.use(i18n)
app.use(Antd)
app.use(router)
app.use(pinia)
app.use(VueGtag, gtag)
app.use(VueCookies, cookies)
app.use(VueFire, { firebaseApp })
app.mount('#app')
