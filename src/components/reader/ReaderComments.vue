<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTranslation } from '@/utils/useTranslation'
import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import Altcha from '../Altcha.vue'
import { AlternataClient } from '@/utils/AlternataClient'
import Header3 from '../system/Header3.vue'
import PrimaryButton from '../system/PrimaryButton.vue'
import SendIcon from '../icons/SendIcon.vue'
import IconButton from '../system/IconButton.vue'
import CloseIcon from '../icons/CloseIcon.vue'
import Comment from '../system/Comment.vue'
import { useNotificationStore } from '@/stores/notification'
import PersonIcon from '../icons/PersonIcon.vue'
import Input from '../system/Input.vue'

const props = defineProps([ 'visible' ])

const route = useRoute()
const t = useTranslation()
const firestore = useFirestore()
const notificationStore = useNotificationStore()

const commentsFirestoreCollection = collection(firestore, `${route.params.title}_pl_comments`)
const commentsUnsorted = useCollection(commentsFirestoreCollection)
const comments = computed(() => commentsUnsorted.value.sort((a, b) => b.createdAt - a.createdAt))

const altcha = ref(null)

const commentAuthor = ref()
const commentText = ref()

const addComment = () => { 
	try {
		const name = commentAuthor.value.trim()
		const text = commentText.value.trim()
		
		const newComment = {
			name: name,
			text: text,
			storyTitle: route.params.title,
			locale: 'pl'
		}

		AlternataClient
			.addComment(newComment, altcha.value)
			.then((success) => {
				if(success) 
					notificationStore.success(t('reader.comments.new-comment-added'))
				else
					notificationStore.warning(t('reader.comments.new-comment-moderated'))
			})
			.catch(() => notificationStore.error(t('reader.comments.new-comment-rejected')))
	} catch (e) {
		notificationStore.error(t('reader.comments.new-comment-rejected'))
	}
}

const onAltchaVerified = (token) => {
	altcha.value = token
}

const isEmpty = (rf) => {
	return rf === undefined || rf === null || rf.length === 0
}

const onSubmit = () => {
	try {
		addComment()
		commentAuthor.value = null
		commentText.value = null
	} catch (e) {
		notificationStore.error(t('reader.comments.new-comment-rejected'))
	}
};
</script>

<template>
	<div class="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300" v-bind:hidden="!props.visible">
		<div class="fixed inset-y-0 right-0 z-[250] w-200 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-500 ease-in-out border-r border-slate-100 dark:border-slate-800 translate-x-0">
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
				<div v-else class="space-y-6 overflow-y-auto no-scrollbar flex-1 px-8 pb-8">
					<Comment v-for="comment in comments" :key="comment.id" :name="comment.name" :timestamp="comment.createdAt" :value="comment.text" />
				</div>
				<div class="p-8 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800">
					<div class="space-y-2">
						<Input placeholder="Twój pseudonim..." v-model="commentAuthor" type="text" required>
							<template v-slot:prefix>
								<PersonIcon class="text-slate-400 mx-4" />
							</template>
						</Input>
						<Input placeholder="Napisz co myślisz..." v-model="commentText" type="textarea" required />
						<Altcha @verified="onAltchaVerified" />
						<PrimaryButton value="Opublikuj komentarz" @click="onSubmit" class="!mt-2" :disabled="isEmpty(commentAuthor) || isEmpty(commentText)" >
							<SendIcon />
						</PrimaryButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
