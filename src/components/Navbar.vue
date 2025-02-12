<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale, useTranslation } from '@/utils/hooks'
import ThemeButton from './ThemeButton.vue'
import { useThemeStore } from '@/stores/theme'
import LanguageButton from './LanguageButton.vue'
import { MenuOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const t = useTranslation()
const locale = useLocale()
const themeStore = useThemeStore()

const { useToken } = theme
const { token } = useToken()

const scrollThreshold = 30
const isScrolled = ref(false)

const makeBackgroundSolid = (event) => {
  isScrolled.value = window.scrollY > scrollThreshold
}

window.addEventListener('scroll', makeBackgroundSolid)

const readerLink = (title) => computed(() => {
  return { name: 'reader', params: { lang: locale.value, title: title } }
})

const localizedLink = (view) => computed(() => {
  return { name: view, params: { lang: locale.value } }
})
</script>

<template>
	<nav class="navbar" :class="[ isScrolled ? 'navbar-solid' : '', themeStore.primaryBackgroundColor ]" :style="{ borderBottomColor: token.colorBorderSecondary }">
		<span class="navbar-full">
			<span class="navbar-section">
				<RouterLink :to="readerLink('powstanie_na_brillar')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.powstanie_na_brillar") }}</RouterLink>
				<RouterLink :to="readerLink('klatwa_imetheru')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.klątwa_imetheru") }}</RouterLink>
				<RouterLink :to="readerLink('projekt_eclipse')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.projekt_eclipse") }}</RouterLink>
				<RouterLink :to="localizedLink('stories')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.stories") }}</RouterLink>
			</span>
			<RouterLink to="/" class="logo" :class="themeStore.primaryTextColor">Alternata</RouterLink>
			<span class="navbar-section">
				<RouterLink :to="localizedLink('books')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.books") }}</RouterLink>
				<RouterLink :to="localizedLink('blog')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.blog") }}</RouterLink>
				<RouterLink :to="localizedLink('about')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.about") }}</RouterLink>
				<ThemeButton class="theme-toggle" />
				<LanguageButton />
			</span>
		</span>
		<span class="navbar-medium">
			<RouterLink to="/" class="logo" :class="themeStore.primaryTextColor">Alternata</RouterLink>
			<RouterLink :to="localizedLink('stories')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.stories") }}</RouterLink>
			<RouterLink :to="localizedLink('books')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.books") }}</RouterLink>
			<RouterLink :to="localizedLink('blog')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.blog") }}</RouterLink>
			<RouterLink :to="localizedLink('about')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.about") }}</RouterLink>
			<ThemeButton class="theme-toggle" />
			<LanguageButton />
		</span>
		<span class="navbar-minimal">
			<a-dropdown>
				<template #overlay>
					<a-menu>
						<a-menu-item key="1">
							<RouterLink :to="localizedLink('stories')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.stories") }}</RouterLink>
						</a-menu-item>
						<a-menu-item key="2">
							<RouterLink :to="localizedLink('books')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.books") }}</RouterLink>
						</a-menu-item>
						<a-menu-item key="3">
							<RouterLink :to="localizedLink('blog')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.blog") }}</RouterLink>
						</a-menu-item>
						<a-menu-item key="4">
							<RouterLink :to="localizedLink('about')" class="navlink" :class="themeStore.primaryTextColor">{{ t("navbar.about") }}</RouterLink>
						</a-menu-item>
					</a-menu>
				</template>
				<a-button :style="{ marginTop: '0.25rem' }">
					<template #icon>
						<MenuOutlined />
					</template>
				</a-button>
			</a-dropdown>
			<RouterLink to="/" class="logo" :class="themeStore.primaryTextColor">Alternata</RouterLink>
			<ThemeButton class="theme-toggle" />
			<LanguageButton />
		</span>
	</nav>
</template>

<style scoped>
.navbar-solid {
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.theme-toggle {
  margin-top: 0.25rem;
}

.navbar {
  transition: background-color 0.5s ease;
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  z-index: 100;
}

.navbar-section {
  transition: gap 1s ease;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 0.35rem;
}

.logo {
  transition: color 0.5s ease;
  text-decoration: none;
  font-family: 'Yeseva One' !important;
  font-weight: 300 !important;
  font-style: normal !important;
  font-size: 2rem;
  margin-top: 0.25rem;
}

.logo:hover {
  color: #3c89e8;
}

.collapsed-link {
  margin-top: 1rem;
}

/* Sizing */
/* Full size */
.navbar-full {
  display: grid;
  grid-template-columns: 45% 10% 45%;
  justify-items: center;
}

.navbar-medium {
  display: none;
}

.navbar-minimal {
  display: none;
}

/* Medium size */
@media screen and (max-width: 1440px) {
  .navbar-full {
    display: none;
  }

  .navbar-medium {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 3rem;
    grid-template-columns: 25% 75%;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .logo {
    flex: 1;
  }

  .navbar-minimal {
    display: none;
  }
}

/* Minimal size */
@media screen and (max-width: 1024px) {
  .navbar-full {
    display: none;
  }

  .navbar-medium {
    display: none;
  }

  .navbar-minimal {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .logo {
    flex: 1;
  }
}
</style>