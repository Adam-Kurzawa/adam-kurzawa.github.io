<script setup>
import { ref } from "vue";
import { addGtag } from "vue-gtag";
import { useCookies } from '@vueuse/integrations/useCookies'
import { useTranslation } from '@/utils/hooks'
import Modal from "./system/Modal.vue"
import Description from "./system/Description.vue"

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
    <Modal 
        v-if="open" 
        title="Cookies"
        :yes="t('cookies.accept')"
        :no="t('cookies.reject')"
        :visibility="open"
        @close="rejectOptional"
        @accept="acceptAll"
    >
        <div class="center">
    		<img src="/mr_cookie.png" />
        </div>
        <Description :value="t('cookies.p1')" />
        <Description :value="t('cookies.p2')" />
        <Description :value="t('cookies.p3')" />
    </Modal>
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

img {
    width: 20rem;
    height: auto;
}
</style>