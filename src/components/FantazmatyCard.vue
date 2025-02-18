<script setup>
import { useTranslation } from '@/utils/hooks'
import { h, ref } from 'vue';
import { ReadOutlined, GlobalOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const t = useTranslation()

const { useToken } = theme
const { token } = useToken()

const title = ref(t('fantazmaty-card.title'))
const storyTitle = ref(t('fantazmaty-card.story-title'))
const descriptionParagraphs = ref([ 0, 1 ])
</script>

<template>
	<a-config-provider :theme="{ algorithm: theme.darkAlgorithm, token: { colorBgContainer: 'rgb(41, 16, 37)' } }">
		<a-card>
			<template #title>
				<a-typography-title :level="3" class="ant-btn-link title" >{{ title }}</a-typography-title>
			</template>
			<template #extra>
				<a-button :icon="h(GlobalOutlined)" href="https://fantazmaty.pl/czytaj/antologie/#fantazmaty-3">{{ t('fantazmaty-card.publisher') }}</a-button>
			</template>
			<div class="content">
				<a-card :title="storyTitle" :style="{ height: '22rem', width: '100%', borderBottomRightRadius: '0', borderTopRightRadius: '0' }" :bodyStyle="{ height: 'calc(22rem - 106px)' }">
					<p v-for="desc in descriptionParagraphs">{{ t(`fantazmaty-card.description.${desc}`) }}</p>
					<template #actions>
						<a-button type="text" size="small" :icon="h(ReadOutlined)">{{ t('fantazmaty-card.read') }}</a-button>
					</template>
				</a-card>
				<img src="https://fantazmaty.pl/wp-content/uploads/2023/04/Fantazmaty-3-optimized.jpg" class="cover" :style="{ borderBottomRightRadius: `${token.borderRadiusLG}px`, borderTopRightRadius: `${token.borderRadiusLG}px` }" />
			</div>
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

.content {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
}

.cover {
	height: 22rem;
	width: auto;
	border-right: 1px solid #303030;
	border-top: 1px solid #303030;
	border-bottom: 1px solid #303030;
}
</style>
