<script setup>
import { ref } from "vue";
import { addGtag } from "vue-gtag";
import { useCookies } from '@vueuse/integrations/useCookies'
import { useTranslation } from '@/utils/hooks';

const cookies = useCookies()
const t = useTranslation()

const consent = cookies.get('cookies_consent')
const open = ref(consent === undefined || consent === null)

const acceptAll = () => {
    cookies.set('cookies_consent', 'accepted_all')
    addGtag()
    open.value = false
}

const rejectOptional = () => {
    cookies.set('cookies_consent', 'rejected_optional')
    open.value = false
}
</script>

<template>
    <a-modal v-if="open" v-model:open="open" title="Ciasteczka" :closable="false" :maskClosable="false">
        <template #footer>
            <div class="footer">
                <a-button size="large" key="back" type="primary" @click="rejectOptional">{{ t('cookies.reject') }}</a-button>
                <a-button size="large" key="submit" type="primary" @click="acceptAll">{{ t('cookies.accept') }}</a-button>
            </div>
        </template>
        <div class="center">
    		<img src="/mr_cookie.png" />
        </div>
        <p>{{ t('cookies.p1') }}</p>
        <p>{{ t('cookies.p2') }}</p>
        <p>{{ t('cookies.p3') }}</p>
    </a-modal>
</template>

<style scoped>
p {
    text-align: justify;
}

.center {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;
}

.footer {
    display: grid;
    grid-template-columns: 50% 50%;
}

img {
    width: 20rem;
    height: auto;
}
</style>