import { defineStore } from 'pinia'
import { theme } from 'ant-design-vue'

export const useThemeStore = defineStore('theme', {
    state: () => {
        return {
            theme: 'light',
            algorithm: theme.defaultAlgorithm
        }
    },
    getters: {
        themeAlgorithm: (state) => state.algorithm,
        currentTheme: (state) => state.theme,
        isLightTheme: (state) => state.theme === 'light',
        primaryBackgroundColor: (state) => `primary-background-color-${state.theme}`, // kolor tła strony
        primaryTextColor: (state) => `primary-text-color-${state.theme}`, // tekst na primaryBackgroundColor
        secondaryTextColor: (state) => `secondary-text-color-${state.theme}`, // tekst na secondaryBackgroundColor
        primaryLinkColor: (state) => `primary-link-color-${state.theme}`, // LinkButton na primaryBG
    },
    actions: {
        toggle() {
            if (this.theme == 'light') {
                this.theme = 'dark'
                this.algorithm = theme.darkAlgorithm
            } else {
                this.theme = 'light'
                this.algorithm = theme.defaultAlgorithm
            }
        }
    }
})