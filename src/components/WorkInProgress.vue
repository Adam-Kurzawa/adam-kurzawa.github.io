<script setup>
import { useAsset, useTranslation } from '@/utils/hooks'

const t = useTranslation()
const image = useAsset(import('@/assets/roadblock.png'))
</script>

<template>
	<a-result :title="t('work-in-progress')">
		<template #icon>
			<img :src="image" :style="{ height: '15rem' }" />
		</template>
	</a-result>
</template>
