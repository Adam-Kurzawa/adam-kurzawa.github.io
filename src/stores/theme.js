import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => {
        return {
            theme: 'light'
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
            } else {
                this.theme = 'light'
            }
        }
    }
})