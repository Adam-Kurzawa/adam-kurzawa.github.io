import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => {
        return {
            theme: 'light'
        }
    },
    getters: {
        currentTheme: (state) => state.theme,
        primaryBackgroundColor: (state) => `primary-background-color-${state.theme}`, // kolor tła strony
        secondaryBackgroundColor: (state) => `secondary-background-color-${state.theme}`, // kolor tła wyróżnionych elementów
        shadowColor: (state) => `shadow-color-${state.theme}`, // kolor padających cieni
        borderColor: (state) => `border-color-${state.theme}`, // kolor obwódek navbara/bottom-bara
        primaryColor: (state) => `primary-color-${state.theme}`, // H1
        secondaryColor: (state) => `secondary-color-${state.theme}`, // H2
        trinaryColor: (state) => `trinary-color-${state.theme}`, // H3
        primaryTextColor: (state) => `primary-text-color-${state.theme}`, // tekst na primaryBackgroundColor
        secondaryTextColor: (state) => `secondary-text-color-${state.theme}`, // tekst na secondaryBackgroundColor
        primaryLinkColor: (state) => `primary-link-color-${state.theme}`, // LinkButton na primaryBG
        secondaryLinkColor: (state) => `secondary-link-color-${state.theme}`, // LinkButton na secondaryBG
        buttonFillColor: (state) => `button-fill-color-${state.theme}`, // wypełnienie/obwódka TextButtona
        buttonTextColor: (state) => `button-text-color-${state.theme}` // kolor tekstu w TextButtonie
    },
    actions: {
        toggle() {
            if (this.theme == 'light')
                this.theme = 'sepia'
            else if (this.theme == 'sepia')
                this.theme = 'dark'
            else
                this.theme = 'light'
        }
    }
})