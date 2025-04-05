<script setup>
import { useAsset, useLocale } from '@/utils/hooks'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { theme } from 'ant-design-vue'

const props = defineProps([ 'title', 'variant' ])

const router = useRouter()
const locale = useLocale()

const { useToken } = theme
const { token } = useToken()

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
    <a-card v-if="content" :class="[ `entry-${props.variant}` ]">
        <template #cover>
            <a-image v-if="props.variant === 'horizontal'" :width="'18rem'" :style="{ flex: '1', borderTopRightRadius: '0', borderBottomLeftRadius: `${token.borderRadiusLG}px` }" :src="imageSrc" />
            <a-image v-else :style="{ flex: '1' }" :src="imageSrc" />
        </template>
        <a-card-meta>
            <template #description>{{ description }}</template>
            <template #title>
                <a-typography-title :level="4" class="ant-btn-link title" @click="openReader">{{ title }}</a-typography-title>
            </template>
        </a-card-meta>
    </a-card>
</template>

<style scoped>
.entry-vertical {
  display: flex;
  flex-direction: column;
}

.entry-horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.title {
    font-family: 'Yeseva One';
    font-weight: 100;
    margin-top: 0.5rem;
    cursor: pointer;
    width: fit-content;
    text-wrap: wrap;
}
</style>