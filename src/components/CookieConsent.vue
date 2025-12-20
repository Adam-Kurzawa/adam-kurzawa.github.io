<script setup>
import { onMounted, ref } from "vue";
import { addGtag } from "vue-gtag";
import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies()

const open = ref(true)

const acceptAll = () => {
    cookies.set('cookies_consent', 'accepted_all')
    addGtag()
    open.value = false
}

const rejectOptional = () => {
    cookies.set('cookies_consent', 'rejected_optional')
    open.value = false
}

onMounted(() => {
    const consent = cookies.get('cookies_consent')
    open.value = consent === undefined || consent === null
});
</script>

<template>
    <a-modal v-if="open" v-model:open="open" title="Ciasteczka" :closable="false">
        <template #footer>
            <div class="footer">
                <a-button size="large" key="back" type="primary" @click="rejectOptional">Odrzuć opcjonalne</a-button>
                <a-button size="large" key="submit" type="primary" @click="acceptAll">Zaakceptuj wszystkie</a-button>
            </div>
        </template>
        <div class="center">
    		<img src="/mr_cookie.png" />
        </div>
        <p>Używamy plików cookie niezbędnych do prawidłowego działania serwisu (np. obsługa sesji, bezpieczeństwo, podstawowe funkcje strony).</p>
        <p>Za Twoją zgodą możemy również używać plików cookie analitycznych (Google Analytics), które pomagają nam analizować ruch na stronie i ulepszać jej działanie. Dane te są zbierane w sposób zagregowany i nie służą do bezpośredniej identyfikacji użytkownika.</p>
        <p>Możesz zaakceptować wszystkie pliki cookie lub odrzucić pliki cookie opcjonalne. Niezbędne pliki cookie są zawsze włączone, ponieważ są konieczne do działania serwisu.</p>
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