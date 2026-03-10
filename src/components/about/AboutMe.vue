<script setup>
import { useTranslation } from '@/utils/useTranslation'
import ViewHeader from '../system/ViewHeader.vue'
import Description from '../system/Description.vue'
import LargeButton from '../system/LargeButton.vue'
import PenIcon from '../icons/PenIcon.vue'
import SendIcon from '../icons/SendIcon.vue'
import HeartIcon from '../icons/HeartIcon.vue'

const t = useTranslation()

const openLink = (link) => {
	window.open(link, '_blank')
}

const storiesLinks = [
	{
		name: "Nowa Fantastyka",
		profile: "@TheEagle",
		link: "https://www.fantastyka.pl/profil/294455",
		icon: '/nf.png'
	},
	{
		name: "Medium",
		profile: "@TheEagle",
		link: "medium.pl/theEagle",
		icon: '/medium.svg'
	},
	{
		name: "Substack",
		profile: "TheEagle",
		link: "ss.pl/theEagle",
		icon: '/substack.png'
	},
	{
		name: "Wattpad",
		profile: "TheEagle",
		link: "ss.pl/theEagle",
		icon: '/wattpad.png'
	}
]

const contactLinks = [
	{
		name: "LinkedIn",
		profile: "TheEagle",
		link: "lin.pl/theEagle",
		icon: '/linkedin.png'
	},
	{
		name: "Gmail",
		profile: "TheEagle",
		link: "gm.pl/theEagle",
		icon: '/gmail.png'
	}
]

const supportLinks = [
	{
		name: "BuyCoffee",
		profile: "TheEagle",
		link: "bc.pl/theEagle",
		icon: '/buycoffee.png'
	},
	{
		name: "Patronite",
		profile: "TheEagle",
		link: "p.pl/theEagle",
		icon: '/patronite.png'
	}
]
</script>

<template>
	<div class="flex flex-col lg:flex-row gap-20">
		<div class="lg:w-1/3 flex-shrink-0">
			<div class="relative group">
				<div class="absolute inset-0 bg-blue-600 rounded-[1rem] rotate-3 scale-105 opacity-10 group-hover:rotate-6 transition-transform"></div>
				<div class="absolute inset-0 bg-transparent rounded-[1rem] rotate-8 scale-120 top-[2rem] left-[2rem] border border-slate-200 group-hover:rotate-18 transition-transform"></div>
				<div
					class="relative aspect-[3/4] rounded-[1rem] overflow-hidden shadow-2xl">
					<img alt="Adam Kurzawa"
						class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&amp;fit=crop&amp;q=80&amp;w=800">
					<div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
				</div>
			</div>
		</div>
		<div class="lg:w-2/3">
			<div class="mb-12 flex flex-col gap-4">
				<ViewHeader title="Adam Kurzawa" description="Pisarz, obserwator trendów technologicznych i marzyciel eksplorujący literackie krańce rzeczywistości. Na Alternacie dzielę się tym, co we mnie najgłębsze – historiami, które rodzą się na styku nauki i wyobraźni." />
				<Description value="Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et. Esse id ut reprehenderit in proident fugiat exercitation labore ullamco tempor. Aliquip culpa sunt ex ipsum sint do nisi ut commodo fugiat ad. Aute ad culpa consequat aliqua." />
				<Description value="Swoje opowiadania zawsze publikuję również na różnych portalach, forach i blogach. Jeśli chcesz śledzić moje poczynania tam, gdzie bije serce społeczności, zapraszam poniżej." />
				<div class="mt-6">
					<h4 class="text-xs font-bold uppercase tracking-[0.4em] text-blue-600 mb-6 flex items-center gap-3">
						<PenIcon />
						Gdzie publikuję
					</h4>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<LargeButton v-for="value in storiesLinks" :key="value.profile" :title="value.name" :description="value.profile">
							<img :src="value.icon" class="w-12 group-hover:scale-110 transition-transform" />
						</LargeButton>
					</div>
				</div>
				<div class="mt-6">
					<h4 class="text-xs font-bold uppercase tracking-[0.4em] text-blue-600 mb-6 flex items-center gap-3">
						<SendIcon />
						Kontakt bezpośredni
					</h4>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<LargeButton v-for="value in contactLinks" :key="value.profile" :title="value.name" :description="value.profile">
							<img :src="value.icon" class="w-12 group-hover:scale-110 transition-transform" />
						</LargeButton>
					</div>
				</div>
				<div class="mt-6">
					<h4 class="text-xs font-bold uppercase tracking-[0.4em] text-blue-600 mb-6 flex items-center gap-3">
						<HeartIcon />
						Wesprzyj moją pracę
					</h4>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<LargeButton v-for="value in supportLinks" :key="value.profile" :title="value.name" :description="value.profile">
							<img :src="value.icon" class="w-12 group-hover:scale-110 transition-transform" />
						</LargeButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
