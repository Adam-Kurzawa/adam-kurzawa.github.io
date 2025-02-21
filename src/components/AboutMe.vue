<script setup>
import { useAsset, useTranslation } from '@/utils/hooks'
import { ref } from 'vue'

const t = useTranslation()
const image = useAsset(import("@/assets/pismo.jpg"))

const storiesLinks = ref([
  {
    name: "Nowa Fantastyka",
    profile: "TheEagle",
    link: "nowafantastyka.pl/theEagle",
    icon: useAsset(import('@/assets/nf.png'))
  },
  {
    name: "Medium",
    profile: "TheEagle",
    link: "nowafantastyka.pl/theEagle",
    icon: useAsset(import('@/assets/medium.svg'))
  }
])
</script>

<template>
	<div class="bio">
		<a-image :src="image" :width="'20rem'" />
		<a-card :style="{ flex: '1' }">
			<template #title>
				<a-typography-title :level="3" class="title">Adam Kurzawa</a-typography-title>
			</template>
			<div class="content">
				<a-typography-text>Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et. adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et. Esse id ut reprehenderit in proident fugiat exercitation labore ullamco tempor. Aliquip culpa sunt ex ipsum sint do nisi ut commodo fugiat ad. Aute ad culpa consequat aliqua.</a-typography-text>
				<a-typography-text>Swoje opowiadania zawsze publikuję również na różnych portalach, forach i blogach.</a-typography-text>
				<a-space>
					<a-button v-for="link in storiesLinks" class="btn" @click="() => alert(`Redirect to ${link.link}`)" :style="{ height: '4rem' }">
						<a-image :src="link.icon" :preview="false" width="2rem" />
						<span class="labels">
							<a-typography-text>{{ link.name }}</a-typography-text>
							<a-typography-text type="secondary">@{{ link.profile }}</a-typography-text>
						</span>
					</a-button>
				</a-space>
				<a-typography-text>Nie jestem social-mediową bestią ale możesz do mnie napisać wiadomość na jednym z portali.</a-typography-text>
				<a-space>
					<a-button v-for="link in storiesLinks" class="btn" @click="() => alert(`Redirect to ${link.link}`)" :style="{ height: '4rem' }">
						<a-image :src="link.icon" :preview="false" width="2rem" />
						<span class="labels">
							<a-typography-text>{{ link.name }}</a-typography-text>
							<a-typography-text type="secondary">@{{ link.profile }}</a-typography-text>
						</span>
					</a-button>
				</a-space>
				<a-typography-text>Jeśli chcesz mnie wesprzeć i dać grosza na piwo, możesz to zrobić na dedykowanych portalach.</a-typography-text>
				<a-space>
					<a-button v-for="link in storiesLinks" class="btn" @click="() => alert(`Redirect to ${link.link}`)" :style="{ height: '4rem' }">
						<a-image :src="link.icon" :preview="false" width="2rem" />
						<span class="labels">
							<a-typography-text>{{ link.name }}</a-typography-text>
							<a-typography-text type="secondary">@{{ link.profile }}</a-typography-text>
						</span>
					</a-button>
				</a-space>
			</div>
		</a-card>
  </div>
</template>

<style scoped>
.title {
    font-family: 'Yeseva One';
    font-weight: 100;
    margin-top: 0.75rem;
}

.btn {
	height: 5rem;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
	gap: 0.5rem;
}

.labels {
	display: flex;
	flex-direction: column;
	align-items: start;
}

.icon {
	width: 2rem;
	height: auto;
}

.bio {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1rem;
}

@media screen and (max-width: 1024px) {
	.bio {
		flex-direction: column;
		align-items: center;
	}
}
</style>
