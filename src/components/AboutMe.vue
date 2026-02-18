<script setup>
import { useTranslation } from '@/utils/hooks'
import LargeButton from './LargeButton.vue'
import Header1 from './system/Header1.vue'

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
				<div
					class="absolute inset-0 bg-blue-600 rounded-[1rem] rotate-3 scale-105 opacity-10 group-hover:rotate-6 transition-transform">
				</div>
				<div
					class="relative aspect-[3/4] rounded-[1rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
					<img alt="Adam Kurzawa"
						class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&amp;fit=crop&amp;q=80&amp;w=800">
					<div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
				</div>
			</div>
		</div>
		<div class="lg:w-2/3">
			<div class="mb-12">
				<Header1 value="Adam Kurzawa" />
				<p
					class="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-3xl">
					Pisarz, obserwator trendów technologicznych i marzyciel eksplorujący literackie krańce
					rzeczywistości. Na Alternacie dzielę się tym, co we mnie najgłębsze – historiami, które rodzą się na
					styku nauki i wyobraźni.</p>
				<div
					class="prose dark:prose-invert prose-slate prose-lg max-w-none text-slate-600 dark:text-slate-400 font-light leading-loose">
					<p>Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu
						Lorem ad irure et. Esse id ut reprehenderit in proident fugiat exercitation labore ullamco
						tempor. Aliquip culpa sunt ex ipsum sint do nisi ut commodo fugiat ad. Aute ad culpa consequat
						aliqua.</p>
					<p>Swoje opowiadania zawsze publikuję również na różnych portalach, forach i blogach. Jeśli chcesz
						śledzić moje poczynania tam, gdzie bije serce społeczności, zapraszam poniżej.</p>
				</div>
			</div>
			<div class="space-y-16">
				<div>
					<h4
						class="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 flex items-center gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
							class="lucide lucide-pen-tool" aria-hidden="true">
							<path
								d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z">
							</path>
							<path
								d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18">
							</path>
							<path d="m2.3 2.3 7.286 7.286"></path>
							<circle cx="11" cy="11" r="2"></circle>
						</svg> Gdzie publikuję</h4>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><a href="#"
							class="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-[1rem] border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 hover:bg-white dark:hover:bg-slate-900 transition-all group">
							<div
								class="p-3 bg-white dark:bg-slate-800 rounded-[0.5rem] shadow-sm group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" class="lucide lucide-book-open text-red-500"
									aria-hidden="true">
									<path d="M12 7v14"></path>
									<path
										d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z">
									</path>
								</svg></div>
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">Nowa Fantastyka</div>
								<div class="text-xs text-slate-400">@TheEagle</div>
							</div>
						</a><a href="#"
							class="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-[1rem] border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 hover:bg-white dark:hover:bg-slate-900 transition-all group">
							<div
								class="p-3 bg-white dark:bg-slate-800 rounded-[0.5rem] shadow-sm group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-panels-top-left text-slate-900 dark:text-white"
									aria-hidden="true">
									<rect width="18" height="18" x="3" y="3" rx="2"></rect>
									<path d="M3 9h18"></path>
									<path d="M9 21V9"></path>
								</svg></div>
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">Medium</div>
								<div class="text-xs text-slate-400">@TheEagle</div>
							</div>
						</a><a href="#"
							class="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-[1rem] border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 hover:bg-white dark:hover:bg-slate-900 transition-all group">
							<div
								class="p-3 bg-white dark:bg-slate-800 rounded-[0.5rem] shadow-sm group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" class="lucide lucide-external-link text-orange-500"
									aria-hidden="true">
									<path d="M15 3h6v6"></path>
									<path d="M10 14 21 3"></path>
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
								</svg></div>
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">Substack</div>
								<div class="text-xs text-slate-400">TheEagle</div>
							</div>
						</a><a href="#"
							class="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-[1rem] border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 hover:bg-white dark:hover:bg-slate-900 transition-all group">
							<div
								class="p-3 bg-white dark:bg-slate-800 rounded-[0.5rem] shadow-sm group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" class="lucide lucide-external-link text-orange-600"
									aria-hidden="true">
									<path d="M15 3h6v6"></path>
									<path d="M10 14 21 3"></path>
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
								</svg></div>
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">Wattpad</div>
								<div class="text-xs text-slate-400">TheEagle</div>
							</div>
						</a></div>
				</div>
				<div>
					<h4
						class="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 flex items-center gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
							class="lucide lucide-send" aria-hidden="true">
							<path
								d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z">
							</path>
							<path d="m21.854 2.147-10.94 10.939"></path>
						</svg> Kontakt bezpośredni</h4>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><a href="#"
							class="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-[1rem] border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 hover:bg-white dark:hover:bg-slate-900 transition-all group">
							<div
								class="p-3 bg-white dark:bg-slate-800 rounded-[0.5rem] shadow-sm group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" class="lucide lucide-linkedin text-blue-600"
									aria-hidden="true">
									<path
										d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
									</path>
									<rect width="4" height="12" x="2" y="9"></rect>
									<circle cx="4" cy="4" r="2"></circle>
								</svg></div>
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">LinkedIn</div>
								<div class="text-xs text-slate-400">TheEagle</div>
							</div>
						</a><a href="#"
							class="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-[1rem] border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 hover:bg-white dark:hover:bg-slate-900 transition-all group">
							<div
								class="p-3 bg-white dark:bg-slate-800 rounded-[0.5rem] shadow-sm group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" class="lucide lucide-mail text-red-400" aria-hidden="true">
									<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
									<rect x="2" y="4" width="20" height="16" rx="2"></rect>
								</svg></div>
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">Gmail</div>
								<div class="text-xs text-slate-400">TheEagle</div>
							</div>
						</a></div>
				</div>
				<div>
					<h4
						class="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 flex items-center gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
							class="lucide lucide-heart" aria-hidden="true">
							<path
								d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5">
							</path>
						</svg> Wesprzyj moją pracę</h4>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><a href="#"
							class="flex items-center gap-5 p-5 bg-blue-50/30 dark:bg-blue-900/10 rounded-[1rem] border border-blue-100 dark:border-blue-900/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
							<div
								class="p-3 bg-white dark:bg-slate-800 rounded-[0.5rem] shadow-sm group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" class="lucide lucide-coffee text-blue-500"
									aria-hidden="true">
									<path d="M10 2v2"></path>
									<path d="M14 2v2"></path>
									<path
										d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1">
									</path>
									<path d="M6 2v2"></path>
								</svg></div>
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">BuyCoffee</div>
								<div class="text-xs text-slate-400">TheEagle</div>
							</div>
						</a><a href="#"
							class="flex items-center gap-5 p-5 bg-blue-50/30 dark:bg-blue-900/10 rounded-[1rem] border border-blue-100 dark:border-blue-900/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
							<div
								class="p-3 bg-white dark:bg-slate-800 rounded-[0.5rem] shadow-sm group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" class="lucide lucide-heart text-orange-500"
									aria-hidden="true">
									<path
										d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5">
									</path>
								</svg></div>
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">Patronite</div>
								<div class="text-xs text-slate-400">TheEagle</div>
							</div>
						</a></div>
				</div>
			</div>
		</div>
	</div>
</template>
