<script setup>
import { useTranslation } from '@/utils/hooks'
import { computed, ref, watch } from 'vue'
import { EpubService } from '@/utils/EpubService.js'
import Altcha from './Altcha.vue'

const props = defineProps([ 'story', 'visible' ])
const emit = defineEmits([ 'hide' ])

const t = useTranslation()

const sendingToKindle = ref(false)
const showSendingConfirmation = ref(0)
const cancelSendingButtonDisabled = ref(false)
const okText = ref(t('story-card.send'))
const cancelText = ref(t('story-card.cancel'))
const kindleAddress = ref($cookies.get('kindle-address') ?? '')
const altcha = ref(null)
const sendToKindleButtonDisabled = ref(false)
const domain = computed(() => import.meta.env.VITE_SEND_TO_KINDLE_DOMAIN)

const disableSendToKindleButton = computed(() => {
	const primaryDisabler = sendToKindleButtonDisabled.value

	if(primaryDisabler)
		return true
	else {
		const kindle = kindleAddress.value
		const token = altcha.value
		
		return kindle === undefined || kindle === null || kindle === '' || token === undefined || token === null
	}
})

const sendToKindle = (to) => EpubService.sendAsEpub(props.story.title, props.story.chapters, t("reader.epub-chapter"), props.story.chapterTitles, to, altcha.value)

const onAltchaVerified = (token) => {
	altcha.value = token
}

const handleSendingToKindle = () => {
    sendingToKindle.value = true
    cancelSendingButtonDisabled.value = true
    okText.value = t('story-card.sending')
    const address = `${kindleAddress.value}@${domain.value}`
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
	<a-modal v-model:open="props.visible" :title="t('send-to-kindle.button')" :okText="okText" :cancelText="cancelText" :ok-button-props="{ disabled: disableSendToKindleButton }" :cancel-button-props="{ disabled: cancelSendingButtonDisabled }" :confirm-loading="sendingToKindle" @ok="handleSendingToKindle" @cancel="() => emit('hide')">
		<div v-if="showSendingConfirmation === 1" class="success">
			<img src="/success.png" />
			<a-typography-text strong>Wysłano plik!</a-typography-text>
		</div>
		<div v-else-if="showSendingConfirmation === 2" class="success">
			<img src="/failure.png" />
			<a-typography-text strong>Wystąpił błąd!</a-typography-text>
		</div>
		<div v-else class="inputs">
			<div class="info">
				<p>{{t('send-to-kindle.info.top')}}</p>
				<p>{{t('send-to-kindle.info.a')}}</p>
				<p>{{t('send-to-kindle.info.b')}}</p>
				<p>{{t('send-to-kindle.info.bottom')}}</p>
			</div>
			<a-input v-model:value="kindleAddress" :addon-after="`@${domain}`" />
			<Altcha @verified="onAltchaVerified" />
		</div>
	</a-modal>
</template>

<style scoped>
.inputs {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	gap: 1rem;
}

.info {
	padding-top: 0.25rem;
}

.info > p {
	margin-bottom: 0.25rem;
}

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