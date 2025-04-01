<script setup>
import { useTranslation } from '@/utils/hooks'
import { ref } from 'vue'
import { EpubService } from '@/utils/EpubService.js'

const props = defineProps([ 'story', 'visible' ])
const emit = defineEmits([ 'hide' ])

const t = useTranslation()

const sendingToKindle = ref(false)
const showSendingConfirmation = ref(0)
const sendToKindleButtonDisabled = ref(false)
const cancelSendingButtonDisabled = ref(false)
const okText = ref(t('story-card.send'))
const cancelText = ref(t('story-card.cancel'))
const kindleAddress = ref($cookies.get('kindle-address') ?? '')

const sendToKindle = (to) => EpubService.sendAsEpub(props.story.title, props.story.chapters, t("reader.epub-chapter"), props.story.chapterTitles, to)

const handleSendingToKindle = () => {
    sendingToKindle.value = true
    cancelSendingButtonDisabled.value = true
    okText.value = t('story-card.sending')
    const address = `${kindleAddress.value}@kindle.com`
    $cookies.set('kindle-address', kindleAddress.value)

    sendToKindle(address)
		.then(x => {
			showSendingConfirmation.value = 1
			okText.value = t('story-card.send')
			cancelText.value = t('story-card.close')
			sendingToKindle.value = false
			sendToKindleButtonDisabled.value = true
			cancelSendingButtonDisabled.value = false

			setTimeout(() => {
				emit('hide')
				sendToKindleButtonDisabled.value = false
				showSendingConfirmation.value = 0
			}, 2000);
		})
		.catch(e => {
			showSendingConfirmation.value = 2
			okText.value = t('story-card.send')
			cancelText.value = t('story-card.close')
			sendingToKindle.value = false
			sendToKindleButtonDisabled.value = true
			cancelSendingButtonDisabled.value = false

			setTimeout(() => {
				emit('hide')
				sendToKindleButtonDisabled.value = false
				showSendingConfirmation.value = 0
			}, 2000);
		})
}
</script>

<template>
	<a-modal v-model:open="props.visible" :title="t('story-card.send-to-kindle')" :okText="okText" :cancelText="cancelText" :ok-button-props="{ disabled: sendToKindleButtonDisabled }" :cancel-button-props="{ disabled: cancelSendingButtonDisabled }" :confirm-loading="sendingToKindle" @ok="handleSendingToKindle">
		<div v-if="showSendingConfirmation === 1" class="success">
			<img src="/success.png" />
			<a-typography-text strong>Wysłano plik!</a-typography-text>
		</div>
		<div v-else-if="showSendingConfirmation === 2" class="success">
			<img src="/failure.png" />
			<a-typography-text strong>Wystąpił błąd!</a-typography-text>
		</div>
		<div v-else>
			<p>Aby wysłać plik na swoje urządzenie Kindle musisz:</p>
			<p>a) podać adres email swojej skrzynki Kindle,</p>
			<p>b) wpisać mój adres email (adam.kurzawa.70@gmail.com) jako zaufany adres na stronie Amazonu</p>
			<a-input v-model:value="kindleAddress" addon-after="@kindle.com" />
		</div>
	</a-modal>
</template>

<style scoped>
.success {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
}

.success > img {
    width: 5rem;
    height: auto;
}
</style>