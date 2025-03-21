<script setup>
import { useAsset, useTranslation } from '@/utils/hooks'
import { ref } from 'vue'
import LargeButton from './LargeButton.vue'

const t = useTranslation()
const image = useAsset(import("@/assets/pismo.jpg"))

const openLink = (link) => {
	window.open(link, '_blank')
}

const storiesLinks = ref([
	{
		name: "Nowa Fantastyka",
		profile: "@TheEagle",
		link: "https://www.fantastyka.pl/profil/294455",
		icon: useAsset(import('@/assets/nf.png'))
	},
	{
		name: "Medium",
		profile: "@TheEagle",
		link: "medium.pl/theEagle",
		icon: useAsset(import('@/assets/medium.svg'))
	},
	{
		name: "Substack",
		profile: "TheEagle",
		link: "ss.pl/theEagle",
		icon: useAsset(import('@/assets/substack.png'))
	}
])

const contactLinks = ref([
	{
		name: "LinkedIn",
		profile: "TheEagle",
		link: "lin.pl/theEagle",
		icon: useAsset(import('@/assets/linkedin.png'))
	},
	{
		name: "Gmail",
		profile: "TheEagle",
		link: "gm.pl/theEagle",
		icon: useAsset(import('@/assets/gmail.png'))
	}
])

const supportLinks = ref([
	{
		name: "BuyCoffee",
		profile: "TheEagle",
		link: "bc.pl/theEagle",
		icon: useAsset(import('@/assets/buycoffee.png'))
	},
	{
		name: "Patronite",
		profile: "TheEagle",
		link: "p.pl/theEagle",
		icon: useAsset(import('@/assets/patronite.png'))
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
					<LargeButton v-for="link in storiesLinks" :header="link.name" :text="link.profile" :icon="link.icon" @click="() => openLink(link.link)" />
				</a-space>
				<a-typography-text>Nie jestem social-mediową bestią ale możesz do mnie napisać wiadomość na jednym z portali.</a-typography-text>
				<a-space>
					<LargeButton v-for="link in contactLinks" :header="link.name" :text="link.profile" :icon="link.icon" @click="() => console.warn(`Redirect to ${link.link}`)" />
				</a-space>
				<a-typography-text>Jeśli chcesz mnie wesprzeć i dać grosza na piwo, możesz to zrobić na dedykowanych portalach.</a-typography-text>
				<a-space>
					<LargeButton v-for="link in supportLinks" :header="link.name" :text="link.profile" :icon="link.icon" @click="() => console.warn(`Redirect to ${link.link}`)" />
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
