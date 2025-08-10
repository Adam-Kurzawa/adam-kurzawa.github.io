<script setup>
import { ref, h } from 'vue';
import { ReadOutlined, YoutubeOutlined } from '@ant-design/icons-vue'
import { useLocale, useTranslation } from '@/utils/hooks';
import { theme } from 'ant-design-vue'

const t = useTranslation()
const locale = useLocale()

const descriptionParagraphs = ref([ 0, 1, 2, 3 ])
</script>

<template>
    <a-config-provider :theme="{ algorithm: theme.darkAlgorithm, token: { colorBgContainer: 'transparent' } }">
		<a-card class="card" :bodyStyle="{ flex: '1' }">
			<template #title>
				<a-typography-title :level="3" class="ant-btn-link title" >{{ t('bukowe-card.title') }}</a-typography-title>
			</template>
			<template #actions>
                <a-config-provider v-if="locale === 'pl'" :theme="{ token: { colorPrimary: '#FF0000' } }">
                    <a-button type="primary" :icon="h(YoutubeOutlined)">{{ t('bukowe-card.listen') }}</a-button>
                </a-config-provider>
				<a-button type="primary" :icon="h(ReadOutlined)">{{ t('bukowe-card.read') }}</a-button>
			</template>
            <p class="justify" v-for="desc in descriptionParagraphs">{{ t(`bukowe-card.description.${desc}`) }}</p>
		</a-card>
	</a-config-provider>
</template>

<style scoped>
.card {
    background: rgba(0, 0, 0, 0.25) url('@/assets/bukowe_widziadlo.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: darken;
    display: flex;
    flex-direction: column;
}

.title {
    font-family: 'Yeseva One';
    font-weight: 100;
    margin-top: 0.75rem;
    cursor: pointer;
    width: fit-content;
}
</style>