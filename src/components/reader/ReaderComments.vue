<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTranslation } from '@/utils/hooks'
import { useFirestore, useCollection } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import { MathTcha } from '@/utils/MathTcha'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

const props = defineProps([ 'visible' ])

const route = useRoute()
const t = useTranslation()
const firestore = useFirestore()

const commentsFirestoreCollection = collection(firestore, `${route.params.title}_${route.params.lang}_comments`)
const commentsUnsorted = useCollection(commentsFirestoreCollection)
const comments = computed(() => commentsUnsorted.value.sort((a, b) => b.createdAt - a.createdAt))

const mathTcha = ref(MathTcha.generateTest())

const commentFormInitialState = {
	name: '',
	text: '',
	test: ''
}

const commentForm = reactive({ ...commentFormInitialState })
const commentFormRef = ref()

const addComment = () => { 
	const name = commentForm.name.trim()
	const text = commentForm.text.trim()

	try {
		const newComment = {
			name: name,
			text: text,
			createdAt: Date.now()
		}

		addDoc(commentsFirestoreCollection, newComment)
		message.success(t('reader.comments.new-comment-added'))
	} catch (e) {
		message.error(t('reader.comments.new-comment-rejected'))
	}
}

const checkMathTcha = async (rule, value) => {
	const response = parseInt(value)

	if(response !== mathTcha.value.result) {
		mathTcha.value = MathTcha.generateTest()
		return Promise.reject(t('reader.comments.new-comment-wrong-answer'))
	} else
		return Promise.resolve()
}

const checkString = async (rule, value) => {
	const response = value ? value.trim() : ''

	if(response.length === 0)
		return Promise.reject(t('reader.comments.new-comment-empty-content'))
	else
		return Promise.resolve()
}

const newCommentValidationRules = {
	name: [{ required: true, validator: checkString, trigger: 'change' }],
	text: [{ required: true, validator: checkString, trigger: 'change' }],
	test: [{ required: true, validator: checkMathTcha, trigger: 'blur' }],
}

const onSubmit = () => {
  commentFormRef.value
  	.validate()
    .then(() => {
		addComment()
		commentFormRef.value.resetFields()
		mathTcha.value = MathTcha.generateTest()
    })
    .catch(err => {
      console.log('error', err);
    });
};
</script>

<template>
	<a-drawer v-model:open="props.visible" class="x" :title="t('reader.comments.header')" placement="right" @close="$emit('close-comments')" size="large">
		<template #extra>
			<a-typography-text v-if="comments.length === 1" type="secondary">{{ `${comments.length} ${t('reader.comments.amount-singular')}` }}</a-typography-text>
			<a-typography-text v-if="comments.length > 1" type="secondary">{{ `${comments.length} ${t('reader.comments.amount-plural')}` }}</a-typography-text>
		</template>
		<a-empty v-if="comments.length === 0">
			<template #description>
				<span>{{ t('reader.comments.empty-comments') }}</span>
			</template>
		</a-empty>
		<a-list v-else class="comments-list" size="small" item-layout="horizontal" :data-source="comments">
			<template #renderItem="{ item }">
				<a-list-item>
					<a-comment :author="item.name">
						<template #content>
							<p>{{ item.text }}</p>
						</template>
						<template #avatar>
							<a-avatar class="colorful-avatar">{{ item.name[0].toUpperCase() }}</a-avatar>
						</template>
						<template #datetime>
							<a-tooltip :title="dayjs(item.createdAt).format('DD.MM.YYYY HH:mm')">
								<span>{{ dayjs(item.createdAt).fromNow() }}</span>
							</a-tooltip>
						</template>
					</a-comment>
				</a-list-item>
			</template>
		</a-list>
		<a-form ref="commentFormRef" :rules="newCommentValidationRules" layout="horizontal" :model="commentForm">
			<a-form-item has-feedback ref="test" name="test">
				<a-input-number v-model:value="commentForm.test" :controls="false" :addon-before="`${t('reader.comments.new-comment-math-tcha-prompt')} ${mathTcha.values.join(', ')}?`" :placeholder="t('reader.comments.new-comment-math-tcha-placeholder')" :style="{ width: '100%' }" />
			</a-form-item>
			<a-form-item has-feedback ref="name" name="name">
				<a-input v-model:value="commentForm.name" :placeholder="t('reader.comments.new-comment-name-placeholder')" />
			</a-form-item>
			<a-form-item has-feedback ref="text" name="text">
				<a-textarea v-model:value="commentForm.text" :rows="2" :placeholder="t('reader.comments.new-comment-text-placeholder')" />
			</a-form-item>
			<a-form-item>
				<a-button type="primary" @click="onSubmit">{{ t('reader.comments.new-comment-submit') }}</a-button>
			</a-form-item>
		</a-form>
	</a-drawer>
</template>

<style scoped>
.comments-list {
  display: flex;
  flex-direction: column;
  height: calc(100% - 16.5rem);
  overflow: auto;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.colorful-avatar {
	background-color: darkslateblue;
}
</style>
