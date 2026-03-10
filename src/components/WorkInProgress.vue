<script setup>
import { useTranslation } from '@/utils/useTranslation'
import { useStaticAsset } from '@/utils/useStaticAsset';

const t = useTranslation()
</script>

<template>
	<a-result :title="t('work-in-progress')">
		<template #icon>
			<img :src="useStaticAsset('roadblock.png')" :style="{ height: '15rem' }" />
		</template>
	</a-result>
</template>
