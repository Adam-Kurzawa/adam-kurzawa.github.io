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
	<!--<a-empty :image="image" :image-style="{ height: '10rem' }">
		<template #description>
			<a-typography-title type="warning">{{ t('work-in-progress') }}</a-typography-title>
		</template>
	</a-empty>-->
</template>
