<script setup>
import { useTranslation } from '@/utils/hooks'
import { h, ref } from 'vue'
import { ReadOutlined, GlobalOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const t = useTranslation()

const descriptionParagraphs = ref([ 0, 1 ])
</script>

<template>
	<a-config-provider :theme="{ algorithm: theme.darkAlgorithm, token: { colorBgContainer: 'rgb(41, 16, 37)' } }">
		<a-card>
			<template #title>
				<a-typography-title :level="3" class="ant-btn-link title" >{{ t('egzorcyzmy-card.story-title') }}</a-typography-title>
			</template>
			<template #extra>
				<a-button :icon="h(GlobalOutlined)" href="https://fantazmaty.pl/czytaj/antologie/#fantazmaty-3">{{ t('egzorcyzmy-card.publisher') }}</a-button>
			</template>
			<div class="content">
				<div class="paragraphs">
					<p>{{ t(`egzorcyzmy-card.description.0`) }}</p>
					<p>{{ t(`egzorcyzmy-card.description.1`) }}</p>
				</div>
				<img src="https://fantazmaty.pl/wp-content/uploads/2024/12/okladka_f4_v2-600x851-optimized.png" class="cover cover-with-borders" />
			</div>
			<template #actions>
				<a-button type="text" :icon="h(ReadOutlined)">{{ t('egzorcyzmy-card.read') }}</a-button>
			</template>
		</a-card>
	</a-config-provider>
</template>

<style scoped>
.title {
    font-family: 'Yeseva One';
    font-weight: 100;
    margin-top: 0.75rem;
    cursor: pointer;
    width: fit-content;
}

.paragraphs {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	text-align: justify;
}

.content {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	gap: 2rem;
}

.cover {
	height: 22rem;
	width: auto;
}
</style>
