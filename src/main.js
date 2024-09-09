import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag'
import VueCookies from 'vue-cookies'
import { createI18n } from 'vue-i18n'
import{ messages } from '@/assets/i18n/messages.js'

const i18n = createI18n({
    legacy: false,
    locale: 'pl',
    messages: messages
})

const gtag = {
    bootstrap: false,
    // enabled: false
    config: {
        id: 'G-6Z9LBMVFVMc',
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
app.use(router)
app.use(VueGtag, gtag)
app.use(VueCookies, cookies)
app.mount('#app')
