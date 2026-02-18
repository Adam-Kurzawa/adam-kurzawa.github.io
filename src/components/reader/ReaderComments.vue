<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTranslation, useInnerWidth } from '@/utils/hooks'
import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Altcha from '../Altcha.vue'
import { AlternataClient } from '@/utils/AlternataClient'
import Header3 from '../system/Header3.vue'
import PrimaryButton from '../system/PrimaryButton.vue'
import SendIcon from '../icons/SendIcon.vue'
import IconButton from '../system/IconButton.vue'
import CloseIcon from '../icons/CloseIcon.vue'

dayjs.extend(relativeTime);

const props = defineProps([ 'visible' ])

const route = useRoute()
const t = useTranslation()
const firestore = useFirestore()
const width = useInnerWidth()

const commentsDrawerSize = computed(() => {
	if(width.value > 1024)
		return 'large'
	else
		return 'default'
})

const commentsFirestoreCollection = collection(firestore, `${route.params.title}_${route.params.lang}_comments`)
const commentsUnsorted = useCollection(commentsFirestoreCollection)
const comments = computed(() => commentsUnsorted.value.sort((a, b) => b.createdAt - a.createdAt))

const altcha = ref(null)

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
			storyTitle: route.params.title,
			locale: 'pl'
		}

		AlternataClient.addComment(newComment, altcha.value)
			.then((success) => {
				if(success) 
					message.success(t('reader.comments.new-comment-added'))
				else
					message.warning(t('reader.comments.new-comment-moderated'))
			})
			.catch(() => message.error(t('reader.comments.new-comment-rejected')))
	} catch (e) {
		message.error(t('reader.comments.new-comment-rejected'))
	}
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
	text: [{ required: true, validator: checkString, trigger: 'change' }]
}

const onAltchaVerified = (token) => {
	altcha.value = token
}

const onSubmit = () => {
  commentFormRef.value
  	.validate()
    .then(() => {
		addComment()
		commentFormRef.value.resetFields()
    })
    .catch(err => {
      console.log('error', err);
    });
};
</script>

<template>
	<div class="fixed inset-y-0 right-0 z-[250] w-200 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-500 ease-in-out border-r border-slate-100 dark:border-slate-800 translate-x-0" v-bind:hidden="!props.visible">
		<div class="flex flex-col h-full">
			<div class="p-8 flex justify-between items-center">
				<div>
					<Header3 class="mt-2" value="Komentarze" />
					<p v-if="comments.length === 1" class="!text-xs font-bold !uppercase tracking-widest text-blue-600 mt-1">{{ `${comments.length} ${t('reader.comments.amount-singular')}` }}</p>
					<p v-else-if="comments.length > 1" class="!text-xs font-bold !uppercase tracking-widest text-blue-600 mt-1">{{ `${comments.length} ${t('reader.comments.amount-plural')}` }}</p>
				</div>
				<IconButton @click="$emit('close-comments')">
					<CloseIcon />
				</IconButton>
			</div>
			<div v-if="comments.length === 0" class="flex-1 overflow-y-auto p-8 no-scrollbar">
				<div class="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-700">
					<div class="relative mb-6">
						<div class="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full"></div>
						<div class="relative w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-[1rem] flex items-center justify-center text-blue-600">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square" aria-hidden="true">
								<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
							</svg>
						</div>
					</div>
					<p class="text-lg font-serif text-slate-900 dark:text-white mb-2">Cisza przed burzą...</p>
					<p class="text-sm text-slate-500 dark:text-slate-400 max-w-[240px] leading-relaxed font-light">{{ t('reader.comments.empty-comments') }}</p>
				</div>
			</div>
			<div v-else class="space-y-2 overflow-y-auto no-scrollbar flex-1">
				<template v-for="comment in comments">
					{{ comment }}
				</template>
			</div>
			<div class="p-8 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800">
				<div class="space-y-4">
					<div class="relative">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
							<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
							<circle cx="12" cy="7" r="4"></circle>
						</svg>
						<input placeholder="Twój pseudonim..." class="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm dark:text-white placeholder:text-slate-400" type="text" value="">
					</div>
					<div class="relative">
						<textarea placeholder="Napisz co myślisz..." rows="3" class="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm dark:text-white placeholder:text-slate-400 resize-none"></textarea>
					</div>
					<div class="relative">
						<Altcha @verified="onAltchaVerified" />
					</div>
					<PrimaryButton value="Opublikuj komentarz">
						<SendIcon />
					</PrimaryButton>
				</div>
			</div>
		</div>
	</div>
	<!--<a-drawer v-model:open="props.visible" :title="t('reader.comments.header')" placement="right" @close="$emit('close-comments')" :size="commentsDrawerSize">
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
			<a-form-item class="small-margin-bottom" has-feedback ref="name" name="name">
				<a-input v-model:value="commentForm.name" :placeholder="t('reader.comments.new-comment-name-placeholder')" />
			</a-form-item>
			<a-form-item class="small-margin-bottom" has-feedback ref="text" name="text">
				<a-textarea v-model:value="commentForm.text" :rows="2" :placeholder="t('reader.comments.new-comment-text-placeholder')" />
			</a-form-item>
			<a-form-item class="small-margin-bottom">
				<Altcha @verified="onAltchaVerified" />
			</a-form-item>
			<a-form-item class="small-margin-bottom">
				<a-button type="primary" :disabled="altcha === undefined || altcha === null" @click="onSubmit">{{ t('reader.comments.new-comment-submit') }}</a-button>
			</a-form-item>
		</a-form>
	</a-drawer>-->
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

.small-margin-bottom {
	margin-bottom: 0.5rem !important;
}

.colorful-avatar {
	background-color: darkslateblue;
}
</style>
