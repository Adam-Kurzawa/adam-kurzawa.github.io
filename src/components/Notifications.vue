<script setup>
import { useNotificationStore } from '@/stores/notification';
import SuccessNotification from './system/SuccessNotification.vue';
import InfoNotification from './system/InfoNotification.vue';
import WarningNotification from './system/WarningNotification.vue';
import ErrorNotification from './system/ErrorNotification.vue';

const notificationStore = useNotificationStore()
</script>

<template>
	<div class="fixed top-3 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 transform translate-y-0 opacity-100 space-y-3">
		<template v-for="notification in notificationStore.getNotifications">
			<WarningNotification v-if="notification.type === 'warning'" :value="notification.value" />
			<SuccessNotification v-else-if="notification.type === 'success'" :value="notification.value" />
			<ErrorNotification v-else-if="notification.type === 'error'" :value="notification.value" />
			<InfoNotification v-else :value="notification.value" />
		</template>
	</div>
</template>