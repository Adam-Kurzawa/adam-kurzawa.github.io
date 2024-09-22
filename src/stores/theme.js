import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => {
        return {
            theme: 'light'
        }
    },
    getters: {
        currentTheme: (state) => state.theme
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