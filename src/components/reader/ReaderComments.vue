<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTranslation } from '@/utils/hooks'
import { useThemeStore } from '@/stores/theme'
import H3 from '@/components/headers/H3.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import { useFirestore, useCollection } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import { MathTcha } from '@/utils/MathTcha'
import { useToast } from 'vue-toast-notification';

const props = defineProps([ 'visible' ])

const route = useRoute()
const t = useTranslation()
const themeStore = useThemeStore()
const firestore = useFirestore()
const toast = useToast()

const commentsFirestoreCollection = collection(firestore, `${route.params.title}_${route.params.lang}_comments`)
const comments = useCollection(commentsFirestoreCollection)

const commentInputName = ref('')
const commentInputText = ref('')
const mathTcha = ref(MathTcha.generateTest())
const mathTchaResponse = ref('')

const addComment = () => { 
  const name = commentInputName.value.trim()
  const text = commentInputText.value.trim()
  const testResponse = parseInt(mathTchaResponse.value)

  if(name.length === 0) 
    toast.warning("Wprowadzono pusty pseudonim", { position: 'top' })
  else if(text.length === 0)
    toast.warning("Wprowadzono pusty tekst", { position: 'top' })
  else if(testResponse !== mathTcha.value.result) {
    toast.error("Zła odpowiedź na pytanie testowe", { position: 'top' })
    mathTcha.value = MathTcha.generateTest()
  } else {
    try {
      const newComment = {
        name: name,
        text: text
      }

      addDoc(commentsFirestoreCollection, newComment)
      toast.success("Dodano komentarz", { position: 'top' })
      mathTcha.value = MathTcha.generateTest()
      mathTchaResponse.value = ''
      commentInputName.value = ''
      commentInputText.value = ''
    } catch (e) {
      toast.error('Wystąpił błąd', { position: 'top' });
    }
  }
}

const commentsOverlayBackground = computed(() => `comments-overlay-${themeStore.currentTheme}`)
const commentInputMathTchaPlaceholderColor = computed(() => `comment-input-math-tcha-${themeStore.currentTheme}`)
const commentInputNamePlaceholderColor = computed(() => `comment-input-name-${themeStore.currentTheme}`)
const commentInputTextPlaceholderColor = computed(() => `comment-input-text-${themeStore.currentTheme}`)
</script>

<template>
  <div class="comments-overlay" :class="[ props.visible ? 'comments-visible' : 'comments-hidden', commentsOverlayBackground ]">
    <div></div>
    <div class="comments" :class="[ themeStore.borderColor, themeStore.primaryBackgroundColor ]">
      <div class="comments-title-bar">
        <button class="close-comments" @click="$emit('close-comments')">x</button>
        <H3 class="comments-title" text="Komentarze" />
        <div></div>
      </div>
      <div class="comments-list" v-if="comments.length !== 0">
        <div class="comment font-segoe" :class="[ themeStore.secondaryBackgroundColor, themeStore.primaryTextColor ]" v-for="comment in comments">
          <div class="comment-name">{{ comment.name }}</div>
          <div class="font-segoe">{{ comment.text }}</div>
        </div>
      </div>
      <div class="font-segoe" :class="themeStore.primaryTextColor" v-if="comments.length === 0">
        Brak komentarzy
      </div>
      <div class="comment-input" :class="themeStore.secondaryBackgroundColor">
        <div class="comment-input-math-tcha-section">
          <div class="comment-input-math-tcha-question font-segoe" :class="[ themeStore.primaryTextColor ]">Ile wynosi suma liczb {{ mathTcha.values.join(', ') }}?</div>
          <input class="comment-input-math-tcha font-segoe" v-model="mathTchaResponse" placeholder="Odpowiedź..." :class="[ themeStore.primaryTextColor, commentInputMathTchaPlaceholderColor ]" type="number" />
        </div>
        <input class="comment-input-name font-segoe" v-model="commentInputName" placeholder="Pseudonim komentującego..." :class="[ themeStore.primaryTextColor, commentInputNamePlaceholderColor ]" type="text" />
        <div class="comment-input-bottom-line">
          <textarea class="comment-input-text font-segoe" v-model="commentInputText" placeholder="Tekst komentarza..." :class="[ themeStore.primaryTextColor, commentInputTextPlaceholderColor ]" />
          <TextButton text="Dodaj" :action="addComment" :disabled="commentInputName.trim().length === 0 || commentInputText.trim().length === 0" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comments-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  display: grid;
  grid-template-columns: 50% 50%;
  z-index: 200;
}

.comments-overlay-light {
  background-color: rgba(256, 256, 256, 0.65);
}

.comments-overlay-sepia {
  background-color: rgba(236, 228, 202, 0.65);
}

.comments-overlay-dark {
  background-color: rgba(0, 0, 0, 0.65);
}

.comments-visible {
  visibility: visible;
} 

.comments-hidden {
  visibility: hidden;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border-width: 1px;
  border-style: solid;
  height: calc(100vh - 4.1rem);
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 0.5rem;
}

.comment {
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
}

.comment-name {
  font-weight: bold;
  margin-bottom: 0.15rem;
}

.comments-title-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.close-comments {
  font-size: 2rem;
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
}

.comments-title {
  justify-self: center;
  margin-top: 0.65rem;
}

.comment-input {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 0.5rem;
}

.comment-input-bottom-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0;
}

.comment-input-math-tcha-section {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.comment-input-math-tcha-question {
  padding: 0.5rem;
  border: none;
  font-size: 0.85rem;
  outline: none;
  background-color: transparent;
}

.comment-input-math-tcha::-webkit-inner-spin-button {
  appearance: none;
}

.comment-input-math-tcha {
  padding: 0.5rem;
  border: none;
  font-size: 0.85rem;
  outline: none;
  background-color: transparent;
  flex: 1;
}

.comment-input-name {
  padding: 0.5rem;
  border: none;
  font-weight: bold;
  font-size: 0.85rem;
  outline: none;
  background-color: transparent;
}

.comment-input-math-tcha-light::placeholder,
.comment-input-text-light::placeholder,
.comment-input-name-light::placeholder {
  color: slategray;
}

.comment-input-math-tcha-sepia::placeholder,
.comment-input-text-sepia::placeholder,
.comment-input-name-sepia::placeholder {
  color: darkslategray;
}

.comment-input-math-tcha-dark::placeholder,
.comment-input-text-dark::placeholder,
.comment-input-name-dark::placeholder {
  color: lightgray;
}

.comment-input-text {
  padding: 0.5rem;
  flex: 1;
  min-height: 3rem;
  height: 3rem;
  max-height: 3rem;
  font-size: 0.85rem;
  outline: none;
  border: none;
  background-color: transparent;
  resize: none;
}

@media screen and (max-width: 1600px) {
  .comments-overlay {
    grid-template-columns: 45% 55%;
  }
}

@media screen and (max-width: 1440px) {
  .comments-overlay {
    grid-template-columns: 40% 60%;
  }
}

@media screen and (max-width: 1280px) {
  .comments-overlay {
    grid-template-columns: 30% 70%;
  }
}

@media screen and (max-width: 1024px) {
  .comments-overlay {
    grid-template-columns: 0% 100%;
  }

  .comments {
    padding: 2rem;
    border: none;
    border-radius: 0;
  }
}
</style>
