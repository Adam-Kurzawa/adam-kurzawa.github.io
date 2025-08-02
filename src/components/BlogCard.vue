<script setup>
import { useAsset, useLocale } from '@/utils/hooks'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en'
import 'dayjs/locale/pl'

dayjs.extend(relativeTime);

const props = defineProps([ 'title' ])

const router = useRouter()
const locale = useLocale()

const imageSrc = useAsset(import(`@/assets/blog/covers/${props.title}.jpg`))
const content = useAsset(import(`@/assets/blog/${props.title}_${locale.value}.json`))

const title = computed(() => content.value.title)
const description = computed(() => content.value.description)
const publicationDate = computed(() => content.value.publicationDate)

const openReader = () => {
  router.push({
    name: "reader",
    params: { lang: locale.value, title: props.title },
    query: { type: 'blog' }
  });
};
</script>

<template>
    <a-card v-if="content">
        <template #cover>
            <a-image :style="{ flex: '1' }" :src="imageSrc" />
        </template>
        <a-card-meta>
            <template #description>{{ description }}</template>
            <template #title>
              <a-typography-text type="secondary">{{ dayjs(publicationDate, "DD.MM.YYYY").locale(locale).format('DD MMMM YYYY') }}</a-typography-text>
                <a-typography-title :level="4" class="ant-btn-link title" @click="openReader">{{ title }}</a-typography-title>
            </template>
        </a-card-meta>
    </a-card>
</template>

<style scoped>
.title {
	font-family: 'Yeseva One';
	font-weight: 100;
	margin-top: 0.5rem !important;
	margin-bottom: 0.5rem !important;
	cursor: pointer;
	width: fit-content;
	text-wrap: wrap;
}
</style>