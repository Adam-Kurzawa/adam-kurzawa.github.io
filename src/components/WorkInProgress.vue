<script setup>
import { useTranslation } from '@/utils/hooks'

const t = useTranslation()
</script>

<template>
	<a-result :title="t('work-in-progress')">
		<template #icon>
			<img src="/roadblock.png" :style="{ height: '15rem' }" />
		</template>
	</a-result>
</template>
